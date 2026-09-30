import { DocumentMetadata } from '../types';

/**
 * Format bytes into human-readable string (e.g., 2.45 MB, 412 KB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const val = parseFloat((bytes / Math.pow(k, i)).toFixed(2));
  return `${val} ${sizes[i]}`;
}

/**
 * Format standard PDF date string format: D:YYYYMMDDHHmmSS[+|-]HH'mm'
 * Example: D:20260924113500+05'30' -> 24 Sep 2026, 11:35 AM (+05:30)
 */
export function parsePdfDate(pdfDateStr: string): string {
  if (!pdfDateStr) return '';

  // Clean wrapper like (D:...) or D:...
  const cleaned = pdfDateStr.replace(/[()]/g, '').trim();
  const match = cleaned.match(/^D?:?(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?([+\-Z])?(\d{2})?'?(\d{2})?'?/);

  if (!match) {
    // Try standard ISO or string date
    const d = new Date(cleaned);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
    return cleaned;
  }

  const [, year, month, day, hours = '00', mins = '00', , tzSign, tzHours, tzMins] = match;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month, 10) - 1;
  const monthStr = monthNames[monthIndex] || month;

  let hourNum = parseInt(hours, 10);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  hourNum = hourNum % 12 || 12;
  const hourStr = hourNum.toString().padStart(2, '0');

  let formatted = `${parseInt(day, 10)} ${monthStr} ${year}, ${hourStr}:${mins} ${ampm}`;
  if (tzSign && tzSign !== 'Z' && tzHours) {
    formatted += ` (UTC${tzSign}${tzHours}${tzMins ? ':' + tzMins : ''})`;
  } else if (tzSign === 'Z') {
    formatted += ' UTC';
  }

  return formatted;
}

/**
 * Clean raw PDF literal string / hex string
 */
function cleanPdfString(val: string): string {
  if (!val) return '';
  let str = val.trim();

  // If hex string like <FEFF004100750074...>
  if (str.startsWith('<') && str.endsWith('>')) {
    const hex = str.slice(1, -1).replace(/\s/g, '');
    let result = '';
    // Check UTF-16 BE BOM
    if (hex.toUpperCase().startsWith('FEFF')) {
      for (let i = 4; i < hex.length; i += 4) {
        const code = parseInt(hex.substr(i, 4), 16);
        if (!isNaN(code)) result += String.fromCharCode(code);
      }
      return result.trim();
    } else {
      for (let i = 0; i < hex.length; i += 2) {
        const code = parseInt(hex.substr(i, 2), 16);
        if (!isNaN(code)) result += String.fromCharCode(code);
      }
      return result.trim();
    }
  }

  // Remove parenthesis if wrapped
  if (str.startsWith('(') && str.endsWith(')')) {
    str = str.slice(1, -1);
  }

  // Unescape standard PDF escapes
  return str
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
    .trim();
}

/**
 * Extract PDF metadata and document properties directly from a browser File object
 */
export async function extractPdfMetadata(file: File): Promise<DocumentMetadata> {
  const fileSizeFormatted = formatFileSize(file.size);
  const fileLastModifiedFormatted = new Date(file.lastModified).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const rawProperties: Record<string, string> = {
    'MIME Type': file.type || 'application/pdf',
    'File Size (Bytes)': `${file.size.toLocaleString()} bytes`,
    'Last System Modified': fileLastModifiedFormatted,
  };

  // If not a PDF or 0 bytes, return basic file attributes
  if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
    return {
      fileName: file.name,
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size,
      dateCreated: fileLastModifiedFormatted,
      dateModified: fileLastModifiedFormatted,
      author: 'Not specified in document',
      title: file.name.replace(/\.[^/.]+$/, ''),
      pdfVersion: 'N/A (Non-PDF)',
      sourceType: 'uploaded',
      rawProperties,
    };
  }

  try {
    // Read up to 256KB from the start and 128KB from the end of the file
    // Where PDF headers, trailer, Info dictionary and XMP metadata reside
    const bufferSize = Math.min(file.size, 256 * 1024);
    const startSlice = file.slice(0, bufferSize);
    const startText = await startSlice.text();

    let endText = '';
    if (file.size > bufferSize) {
      const endSlice = file.slice(Math.max(0, file.size - 128 * 1024), file.size);
      endText = await endSlice.text();
    }

    const combinedText = startText + '\n' + endText;

    // 1. PDF Version: %PDF-1.x or %PDF-2.x
    let pdfVersion = 'PDF 1.7';
    const versionMatch = startText.match(/%PDF-([0-9.]+)/);
    if (versionMatch) {
      pdfVersion = `PDF ${versionMatch[1]}`;
      rawProperties['PDF Version'] = pdfVersion;
    }

    // 2. Extract Author
    let author = '';
    // Check /Author (value)
    const authorMatch = combinedText.match(/\/Author\s*(\([^)]+\)|<[^>]+>)/);
    if (authorMatch) {
      author = cleanPdfString(authorMatch[1]);
    }
    // Check XMP dc:creator
    if (!author) {
      const xmpCreatorMatch = combinedText.match(/<dc:creator[^>]*>[\s\S]*?<rdf:li[^>]*>([\s\S]*?)<\/rdf:li>/i);
      if (xmpCreatorMatch) {
        author = xmpCreatorMatch[1].trim();
      }
    }

    // 3. Extract Creation Date
    let dateCreated = '';
    const creationDateMatch = combinedText.match(/\/CreationDate\s*(\([^)]+\)|<[^>]+>)/);
    if (creationDateMatch) {
      const rawDate = cleanPdfString(creationDateMatch[1]);
      dateCreated = parsePdfDate(rawDate);
      rawProperties['PDF Creation Date (Raw)'] = rawDate;
    }
    if (!dateCreated) {
      const xmpCreateDateMatch = combinedText.match(/<xmp:CreateDate>([\s\S]*?)<\/xmp:CreateDate>/i);
      if (xmpCreateDateMatch) {
        dateCreated = parsePdfDate(xmpCreateDateMatch[1].trim());
      }
    }
    // Fallback to file system modified date if not specified in internal PDF structure
    if (!dateCreated) {
      dateCreated = fileLastModifiedFormatted;
    }

    // 4. Extract ModDate
    let dateModified = '';
    const modDateMatch = combinedText.match(/\/ModDate\s*(\([^)]+\)|<[^>]+>)/);
    if (modDateMatch) {
      const rawMod = cleanPdfString(modDateMatch[1]);
      dateModified = parsePdfDate(rawMod);
      rawProperties['PDF Mod Date (Raw)'] = rawMod;
    }
    if (!dateModified) {
      dateModified = fileLastModifiedFormatted;
    }

    // 5. Extract Title
    let title = '';
    const titleMatch = combinedText.match(/\/Title\s*(\([^)]+\)|<[^>]+>)/);
    if (titleMatch) {
      title = cleanPdfString(titleMatch[1]);
    }
    if (!title) {
      const xmpTitleMatch = combinedText.match(/<dc:title[^>]*>[\s\S]*?<rdf:li[^>]*>([\s\S]*?)<\/rdf:li>/i);
      if (xmpTitleMatch) {
        title = xmpTitleMatch[1].trim();
      }
    }
    if (!title) {
      title = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    }

    // 6. Extract Subject / Description
    let subject = '';
    const subjectMatch = combinedText.match(/\/Subject\s*(\([^)]+\)|<[^>]+>)/);
    if (subjectMatch) {
      subject = cleanPdfString(subjectMatch[1]);
    }

    // 7. Extract Creator & Producer
    let creator = '';
    const creatorMatch = combinedText.match(/\/Creator\s*(\([^)]+\)|<[^>]+>)/);
    if (creatorMatch) {
      creator = cleanPdfString(creatorMatch[1]);
      rawProperties['Application Creator'] = creator;
    }

    let producer = '';
    const producerMatch = combinedText.match(/\/Producer\s*(\([^)]+\)|<[^>]+>)/);
    if (producerMatch) {
      producer = cleanPdfString(producerMatch[1]);
      rawProperties['PDF Producer'] = producer;
    }

    // 8. Estimate Page Count
    let pageCount: number | undefined;
    const pageCountMatch = combinedText.match(/\/Type\s*\/Pages[\s\S]*?\/Count\s+(\d+)/);
    if (pageCountMatch) {
      pageCount = parseInt(pageCountMatch[1], 10);
    } else {
      // Secondary check: count /Type /Page occurrences in the sample
      const pageMatches = combinedText.match(/\/Type\s*\/Page\b/g);
      if (pageMatches && pageMatches.length > 0) {
        pageCount = pageMatches.length;
      }
    }

    if (author) rawProperties['Author (Extracted)'] = author;
    if (title) rawProperties['Title (Extracted)'] = title;
    if (pageCount) rawProperties['Estimated Pages'] = `${pageCount} pages`;

    return {
      fileName: file.name,
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size,
      dateCreated,
      dateModified,
      author: author || 'Not specified in PDF metadata',
      title,
      subject: subject || undefined,
      pageCount,
      pdfVersion,
      creator: creator || undefined,
      producer: producer || undefined,
      sourceType: 'uploaded',
      rawProperties,
    };
  } catch (err) {
    console.warn('PDF metadata parsing error, returning file-level properties:', err);
    return {
      fileName: file.name,
      fileSize: fileSizeFormatted,
      fileSizeBytes: file.size,
      dateCreated: fileLastModifiedFormatted,
      dateModified: fileLastModifiedFormatted,
      author: 'Not specified in PDF metadata',
      title: file.name.replace(/\.[^/.]+$/, ''),
      pdfVersion: 'PDF (Standard)',
      sourceType: 'uploaded',
      rawProperties,
    };
  }
}

/**
 * Returns authentic default document metadata for the fire-resistant cable tender case study
 */
export function getDefaultDocumentMetadata(fileName?: string): DocumentMetadata {
  return {
    fileName: fileName || 'Tender_Schedule_Fire_Resistant_Cables_PWD_2026.pdf',
    fileSize: '2.45 MB',
    fileSizeBytes: 2569011,
    dateCreated: '24 Sep 2026, 11:35 AM IST',
    dateModified: '25 Sep 2026, 04:12 PM IST',
    author: 'Chief Engineer (Electrical), CPWD - Life-Safety & Hospital Infrastructure Directorate',
    title: 'Technical Schedule of Requirements: Fire-Survival Low-Voltage Power Cables (1.1 kV XLPE)',
    subject: 'Emergency power & critical life-safety circuit infrastructure for Super Speciality Hospital Block',
    pageCount: 24,
    pdfVersion: 'PDF 1.7 (ISO 32000-1)',
    creator: 'AutoCAD MEP & National Informatics Centre (NIC) Tender Portal',
    producer: 'Adobe PDF Library 18.0.2 / Government of India e-Procurement Engine',
    sourceType: 'sample',
    rawProperties: {
      'PDF Standard': 'ISO 32000-1 (PDF 1.7)',
      'Security / Encryption': 'None (Public Domain Tender Document)',
      'Fast Web View (Linearized)': 'Yes',
      'Tagged PDF': 'Yes (Accessible Section 508)',
      'Digital Signature': 'Verified (NIC e-Mudhra Class 3 DSC)',
      'Page Dimensions': 'A4 (210 x 297 mm)',
    },
  };
}
