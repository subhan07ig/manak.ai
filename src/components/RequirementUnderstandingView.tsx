import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Edit3,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  Flame,
  Building,
  Briefcase,
  Layers,
  Sparkles,
  Info,
  FileText,
  HardDrive,
  Calendar,
  User,
  UserCheck,
  FileCheck,
  UploadCloud,
  ChevronDown,
  ChevronUp,
  FileCode,
  Shield,
  Clock,
  Paperclip,
  Check
} from 'lucide-react';
import { ExtractedRequirement, ConfidenceLevel, DocumentMetadata } from '../types';
import { extractPdfMetadata, getDefaultDocumentMetadata } from '../utils/pdfMetadata';

interface RequirementUnderstandingViewProps {
  extracted: ExtractedRequirement;
  onConfirm: () => void;
  onEdit: (updated: ExtractedRequirement) => void;
  onBack: () => void;
}

export const RequirementUnderstandingView: React.FC<RequirementUnderstandingViewProps> = ({
  extracted,
  onConfirm,
  onEdit,
  onBack,
}) => {
  const [data, setData] = useState<ExtractedRequirement>(extracted);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [voltageAdded, setVoltageAdded] = useState(false);

  // PDF Document Metadata state
  const [docMeta, setDocMeta] = useState<DocumentMetadata>(
    extracted.documentMetadata || getDefaultDocumentMetadata()
  );
  const [showRawProperties, setShowRawProperties] = useState(false);
  const [isExtractingNewPdf, setIsExtractingNewPdf] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState<string | null>(null);

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsExtractingNewPdf(true);
    setUploadSuccessMessage(null);
    try {
      const parsedMetadata = await extractPdfMetadata(file);
      setDocMeta(parsedMetadata);
      const updated: ExtractedRequirement = {
        ...data,
        documentMetadata: parsedMetadata,
      };
      setData(updated);
      onEdit(updated);
      setUploadSuccessMessage(`Successfully parsed metadata from "${file.name}"`);
      setTimeout(() => setUploadSuccessMessage(null), 4000);
    } catch (err) {
      console.error('Failed to extract PDF metadata:', err);
    } finally {
      setIsExtractingNewPdf(false);
    }
  };

  const isAuthorAvailable = Boolean(
    docMeta.author &&
    !docMeta.author.toLowerCase().includes('not specified') &&
    !docMeta.author.toLowerCase().includes('unknown')
  );

  const getConfidenceBadge = (level: ConfidenceLevel) => {
    switch (level) {
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            High confidence
          </span>
        );
      case 'Medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Medium confidence
          </span>
        );
      case 'Needs Clarification':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <HelpCircle className="w-3 h-3 text-rose-600" />
            Needs clarification
          </span>
        );
    }
  };

  const handleStartEdit = (field: string, val: string) => {
    setEditingField(field);
    setTempValue(val);
  };

  const handleSaveEdit = (field: string) => {
    const updated = { ...data, [field]: tempValue };
    setData(updated);
    setEditingField(null);
    onEdit(updated);
  };

  const handleAddVoltage = () => {
    const updatedLikely = [...data.likelyRequirements, 'Voltage rating 1100 V (1.1 kV) specified'];
    const updated = {
      ...data,
      productType: 'Low-voltage cable (Up to 1100 V / 1.1 kV rated)',
      likelyRequirements: updatedLikely,
      missingWarnings: data.missingWarnings.filter(w => !w.toLowerCase().includes('voltage')),
    };
    setData(updated);
    setVoltageAdded(true);
    onEdit(updated);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Progress tracker: Step 2 active */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, name: '1. Input', completed: true },
            { step: 2, name: '2. Understand', active: true, completed: false },
            { step: 3, name: '3. Recommend', completed: false },
            { step: 4, name: '4. Validate', completed: false },
            { step: 5, name: '5. Export', completed: false },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono-numbers transition-colors ${
                    item.active
                      ? 'bg-[#123B63] text-white ring-4 ring-blue-100'
                      : item.completed
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.completed ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                </div>
                <span
                  className={`text-[11px] mt-1 font-medium ${
                    item.active ? 'text-[#0B2447] font-bold' : 'text-slate-500'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              {index < 4 && <div className="flex-1 h-0.5 mx-3 bg-slate-200" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Requirement Understanding Card */}
      <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-blue-50 text-[#123B63] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            Natural Language Requirement Parsing
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
            We understood your requirement as follows
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            MANAK.AI extracted core technical entities from your procurement input. Review or edit them before searching the Indian Standards catalogue.
          </p>
        </div>

        {/* Warning Panel: Missing Voltage Specification */}
        {data.missingWarnings.length > 0 && !voltageAdded && (
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">
                  Specification Clarification Advisory
                </div>
                <p className="text-xs text-amber-800 mt-0.5">
                  “Voltage range was not specified in the tender input. Adding it may improve recommendation accuracy between 650V (IS 694) and 1100V (IS 7098).”
                </p>
              </div>
            </div>
            <button
              onClick={handleAddVoltage}
              className="px-3 py-1.5 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-semibold rounded-md shadow-sm shrink-0 whitespace-nowrap transition-colors"
            >
              + Set 1100 V (1.1 kV)
            </button>
          </div>
        )}

        {/* Document Properties & PDF Metadata Preview Section */}
        <div className="bg-[#F8FAFC] border border-[#D9E1EA] rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#123B63] text-white flex items-center justify-center shrink-0 shadow-xs">
                <FileText className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#0B2447]">
                    Document Metadata & PDF Properties
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#123B63] uppercase tracking-wide">
                    {docMeta.pdfVersion || 'PDF Document'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Extracted document properties and catalogue metadata from the tender specification PDF.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Author Detection Status Pill */}
              {isAuthorAvailable ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Author Available in PDF
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 shadow-2xs">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Author Not Specified in PDF
                </span>
              )}

              {/* Upload another PDF to test extraction live */}
              <label className="cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-[#D9E1EA] hover:bg-slate-50 text-[#123B63] shadow-2xs transition-colors">
                <UploadCloud className="w-3.5 h-3.5 text-[#123B63]" />
                <span>Upload Another PDF</span>
                <input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.xlsx,.png,.jpg"
                  onChange={handlePdfUpload}
                />
              </label>
            </div>
          </div>

          {/* Loading Indicator when parsing new PDF */}
          {isExtractingNewPdf && (
            <div className="flex items-center gap-2 text-xs font-semibold text-[#123B63] bg-blue-50 border border-blue-200 p-3 rounded-lg animate-pulse">
              <div className="w-4 h-4 border-2 border-[#123B63] border-t-transparent rounded-full animate-spin shrink-0" />
              <span>Analyzing PDF binary stream, reading /Info dictionary and XMP metadata…</span>
            </div>
          )}

          {/* Success Toast */}
          {uploadSuccessMessage && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{uploadSuccessMessage}</span>
            </div>
          )}

          {/* Key Metadata Properties Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. File Size */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-600">
                  <HardDrive className="w-3.5 h-3.5 text-[#123B63]" /> File Size
                </span>
                <span className="text-[10px] font-medium bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                  Extracted
                </span>
              </div>
              <div>
                <div className="text-base font-extrabold text-[#0B2447] tracking-tight">
                  {docMeta.fileSize}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  {docMeta.fileSizeBytes ? `${docMeta.fileSizeBytes.toLocaleString()} bytes` : 'PDF binary stream'}
                </div>
              </div>
            </div>

            {/* 2. Date Created */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-600">
                  <Calendar className="w-3.5 h-3.5 text-[#123B63]" /> Date Created
                </span>
                <span className="text-[10px] font-medium bg-blue-50 text-[#123B63] px-1.5 py-0.5 rounded">
                  Creation Date
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2447] leading-snug">
                  {docMeta.dateCreated}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  From PDF /CreationDate metadata
                </div>
              </div>
            </div>

            {/* 3. Author if available in the PDF */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-between shadow-2xs sm:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-600">
                  <User className="w-3.5 h-3.5 text-[#123B63]" /> Author
                </span>
                {isAuthorAvailable ? (
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Available in PDF
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Not in PDF
                  </span>
                )}
              </div>
              <div>
                <div
                  className={`text-xs font-bold leading-snug ${
                    isAuthorAvailable ? 'text-[#0B2447]' : 'text-slate-500 italic'
                  }`}
                  title={docMeta.author}
                >
                  {docMeta.author}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  {isAuthorAvailable
                    ? 'Extracted from PDF /Author & XMP'
                    : 'No author metadata tag declared in file'}
                </div>
              </div>
            </div>

            {/* 4. Format & Page Count */}
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 flex flex-col justify-between shadow-2xs">
              <div className="flex items-center justify-between text-slate-500 mb-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 text-slate-600">
                  <Layers className="w-3.5 h-3.5 text-[#123B63]" /> Format & Pages
                </span>
                <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                  ISO 32000
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-[#0B2447] leading-snug">
                  {docMeta.pdfVersion || 'PDF 1.7'} • {docMeta.pageCount ? `${docMeta.pageCount} Pages` : 'Multi-page'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 truncate">
                  File: <span className="font-mono text-slate-700 font-medium">{docMeta.fileName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Document Title & Subject Display if present */}
          {(docMeta.title || docMeta.subject) && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 text-xs space-y-1 shadow-2xs">
              {docMeta.title && (
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-500 min-w-[70px] uppercase text-[10px] mt-0.5">
                    Doc Title:
                  </span>
                  <span className="font-semibold text-[#0B2447]">{docMeta.title}</span>
                </div>
              )}
              {docMeta.subject && (
                <div className="flex items-start gap-2">
                  <span className="font-bold text-slate-500 min-w-[70px] uppercase text-[10px] mt-0.5">
                    Subject:
                  </span>
                  <span className="text-slate-700">{docMeta.subject}</span>
                </div>
              )}
            </div>
          )}

          {/* Toggle Raw Technical PDF Dictionary Properties */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowRawProperties(!showRawProperties)}
              className="text-xs font-semibold text-[#123B63] hover:text-[#0B2447] flex items-center gap-1.5 py-1 transition-colors"
            >
              <span>
                {showRawProperties
                  ? 'Hide Raw PDF Dictionaries & Catalog Properties'
                  : 'View Detailed PDF Catalog, Creation Tags & Audit Properties'}
              </span>
              {showRawProperties ? (
                <ChevronUp className="w-3.5 h-3.5 text-[#123B63]" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-[#123B63]" />
              )}
            </button>

            {showRawProperties && (
              <div className="mt-3 bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-3 shadow-inner">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 border-b border-slate-100 pb-2">
                  <span className="flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-[#123B63]" />
                    PDF Catalog & XMP Metadata Dictionary Attributes
                  </span>
                  <span className="text-slate-500 font-normal">Parsed via RFC 3778 Byte-Stream Reader</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-slate-700">
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">File Name:</span>
                    <span className="font-mono font-medium text-slate-900">{docMeta.fileName}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Exact Size:</span>
                    <span className="font-mono font-medium text-slate-900">
                      {docMeta.fileSizeBytes?.toLocaleString()} bytes ({docMeta.fileSize})
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Date Created:</span>
                    <span className="font-medium text-slate-900">{docMeta.dateCreated}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Last Modified:</span>
                    <span className="font-medium text-slate-900">{docMeta.dateModified || docMeta.dateCreated}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Author (/Author):</span>
                    <span className="font-medium text-slate-900">{docMeta.author}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">Creator Application:</span>
                    <span className="font-medium text-slate-900">{docMeta.creator || 'AutoCAD MEP 2025'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">PDF Producer:</span>
                    <span className="font-medium text-slate-900">{docMeta.producer || 'Adobe PDF Library 18.0.2'}</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-500">PDF Specification:</span>
                    <span className="font-medium text-slate-900">{docMeta.pdfVersion || 'PDF 1.7'}</span>
                  </div>

                  {docMeta.rawProperties &&
                    Object.entries(docMeta.rawProperties).map(([key, val]) => (
                      <div key={key} className="flex items-center justify-between py-1 border-b border-slate-50">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-medium text-slate-900 truncate max-w-[200px]" title={val}>
                          {val}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg flex items-start gap-2.5 text-[11px] text-[#123B63] mt-2">
                  <Shield className="w-4 h-4 text-[#123B63] shrink-0 mt-0.5" />
                  <p>
                    <strong>GFR 2017 & CVC Compliance Audit Note:</strong> Technical schedules submitted for public procurement must preserve author identity and creation timestamps to ensure bid validity and prevent post-facto specification alteration under General Financial Rules (Rule 144).
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Extracted Entities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Entity: Product */}
          <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#123B63]" /> Product
              </span>
              {getConfidenceBadge(data.confidence.product)}
            </div>
            {editingField === 'product' ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="text-xs bg-white border border-[#123B63] rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleSaveEdit('product')}
                  className="text-xs bg-[#123B63] text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B2447]">{data.product}</span>
                <button
                  onClick={() => handleStartEdit('product', data.product)}
                  className="text-slate-400 hover:text-[#123B63]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Entity: Product Type */}
          <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#123B63]" /> Product Type
              </span>
              {getConfidenceBadge(data.confidence.productType)}
            </div>
            {editingField === 'productType' ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="text-xs bg-white border border-[#123B63] rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleSaveEdit('productType')}
                  className="text-xs bg-[#123B63] text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B2447]">{data.productType}</span>
                <button
                  onClick={() => handleStartEdit('productType', data.productType)}
                  className="text-slate-400 hover:text-[#123B63]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Entity: Performance */}
          <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-600" /> Performance
              </span>
              {getConfidenceBadge(data.confidence.performance)}
            </div>
            {editingField === 'performance' ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="text-xs bg-white border border-[#123B63] rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleSaveEdit('performance')}
                  className="text-xs bg-[#123B63] text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B2447]">{data.performance}</span>
                <button
                  onClick={() => handleStartEdit('performance', data.performance)}
                  className="text-slate-400 hover:text-[#123B63]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Entity: Application */}
          <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#123B63]" /> Application
              </span>
              {getConfidenceBadge(data.confidence.application)}
            </div>
            {editingField === 'application' ? (
              <div className="flex items-center gap-2 mt-1">
                <input
                  type="text"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="text-xs bg-white border border-[#123B63] rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleSaveEdit('application')}
                  className="text-xs bg-[#123B63] text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B2447]">{data.application}</span>
                <button
                  onClick={() => handleStartEdit('application', data.application)}
                  className="text-slate-400 hover:text-[#123B63]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Entity: Procurement Context */}
          <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl md:col-span-2 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-[#123B63]" /> Procurement Context
              </span>
              {getConfidenceBadge(data.confidence.procurementContext)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#0B2447]">{data.procurementContext}</span>
              <span className="text-xs text-slate-500">Public works GFR 2017 compliant tender</span>
            </div>
          </div>
        </div>

        {/* Likely Requirements Section */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Inferred Technical Requirements & Testing Norms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {data.likelyRequirements.map((req, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-lg p-2.5 flex items-center gap-2 shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-xs font-medium text-slate-800">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
          >
            ← Edit Input Description
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAddVoltage}
              className="px-3.5 py-2 border border-[#123B63] text-[#123B63] text-xs font-semibold rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Missing Information</span>
            </button>

            <button
              onClick={onConfirm}
              className="px-6 py-2.5 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-2"
            >
              <span>Confirm & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
