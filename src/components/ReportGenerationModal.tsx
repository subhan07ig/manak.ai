import React, { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  CheckCircle2,
  X,
  Printer,
  Sparkles,
  FileCheck2,
  Send,
  Eye
} from 'lucide-react';

interface ReportGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShareWithReviewer: () => void;
}

export const ReportGenerationModal: React.FC<ReportGenerationModalProps> = ({
  isOpen,
  onClose,
  onShareWithReviewer,
}) => {
  const [reportType, setReportType] = useState('Complete procurement package');
  const [format, setFormat] = useState('PDF');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const [includes, setIncludes] = useState({
    sourceLinks: true,
    evidenceSnippets: true,
    relatedStandards: true,
    certificationStatus: true,
    missingRequirements: true,
    confidenceScores: true,
    versionHistory: true,
    expertReviewComments: true,
  });

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 700);
  };

  const handleDownload = () => {
    const content = `MANAK.AI TENDER SPECIFICATION REPORT
Procurement: Procurement of fire-resistant low-voltage electrical cables for a government hospital
Governing Indian Standard: IS 7098 (Part 1):2025
Normative Test Method: IS 10810 (Part 62):2024
Quality Control Order: Mandatory BIS Scheme-I (ISI Mark) under Gazette S.O. 312(E)
Completeness Score: 100% Verified
Generated: 26 September 2026 IST
Verified against Bureau of Indian Standards (BIS) Public Specifications Catalogue
--------------------------------------------------------------------------------`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MANAK-AI-Procurement-Report-Cables-${format.toLowerCase()}.${format === 'JSON' ? 'json' : 'txt'}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
      <div className="bg-white border border-[#D9E1EA] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-50 text-[#123B63] text-[10px] font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-[#F59E0B]" />
              Official Tender Output Engine
            </div>
            <h2 className="text-xl font-bold text-[#0B2447]">
              {isGenerated ? 'Report Ready' : 'Generate Procurement Report'}
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Compile standards, testing annexures, and statutory citations into a tender-ready document.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 font-bold"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isGenerated ? (
          <div className="space-y-5">
            {/* Report Type Options */}
            <div>
              <label className="block text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-2">
                Select Report Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Standards recommendation report',
                  'Tender specification checklist',
                  'Compliance summary',
                  'Version and amendment report',
                  'Expert review report',
                  'Complete procurement package',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setReportType(item)}
                    className={`p-2.5 rounded-lg border text-left font-medium transition-colors ${
                      reportType === item
                        ? 'border-[#123B63] bg-blue-50/70 text-[#0B2447] font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Format Options */}
            <div>
              <label className="block text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-2">
                Export Format
              </label>
              <div className="flex flex-wrap gap-2 text-xs">
                {['PDF', 'DOCX', 'XLSX', 'JSON', 'API response'].map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setFormat(fmt)}
                    className={`px-3 py-1.5 rounded-lg border font-semibold transition-colors ${
                      format === fmt
                        ? 'bg-[#123B63] text-white border-[#123B63]'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Inclusion Checkboxes as per PDF */}
            <div>
              <label className="block text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-2">
                Report Sections & Evidence Attachments
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {[
                  { key: 'sourceLinks', label: 'Include official source links' },
                  { key: 'evidenceSnippets', label: 'Include evidence snippets' },
                  { key: 'relatedStandards', label: 'Include related standards' },
                  { key: 'certificationStatus', label: 'Include certification status' },
                  { key: 'missingRequirements', label: 'Include missing requirements checklist' },
                  { key: 'confidenceScores', label: 'Include confidence scores' },
                  { key: 'versionHistory', label: 'Include version history' },
                  { key: 'expertReviewComments', label: 'Include expert review comments' },
                ].map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={includes[key as keyof typeof includes]}
                      onChange={(e) =>
                        setIncludes({ ...includes, [key]: e.target.checked })
                      }
                      className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                    />
                    <span className="text-slate-800 font-medium">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-6 py-2.5 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-2"
              >
                {isGenerating ? (
                  <span>Compiling report...</span>
                ) : (
                  <>
                    <FileText className="w-4 h-4" />
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          /* Report Ready State as per Screen 12 in PDF */
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="text-sm font-bold text-emerald-950">
                  Procurement Report Successfully Generated
                </div>
                <div className="text-xs text-emerald-800 mt-0.5">
                  Package: <span className="font-semibold">{reportType}</span> ({format} format · 4 pages)
                </div>
              </div>
            </div>

            {/* Preview Box */}
            <div className="border border-slate-200 rounded-xl p-4 bg-[#F8FAFC] space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-bold text-[#0B2447]">
                  Document Preview: Tender Technical Annexure
                </span>
                <span className="text-slate-400 font-mono text-[10px]">
                  ID: MANAK-REP-2026-0926
                </span>
              </div>
              <div className="space-y-1.5 text-slate-700 leading-relaxed font-serif">
                <p className="font-bold text-[#0B2447] font-sans">
                  Section A: Technical Specification of Cables
                </p>
                <p>
                  1. The cables shall strictly comply with <span className="font-bold font-sans">IS 7098 (Part 1):2025</span> (Fourth Revision) with enhanced circuit integrity under active fire conditions.
                </p>
                <p>
                  2. Testing protocols for circuit continuity shall conform to <span className="font-bold font-sans">IS 10810 (Part 62):2024</span> (180 minutes at 750°C).
                </p>
                <p>
                  3. Bidders must produce a valid Bureau of Indian Standards (BIS) CM/L licence mark under Gazette Notification S.O. 312(E).
                </p>
              </div>
            </div>

            {/* Buttons: Preview report, Download report, Share with reviewer, Return to analysis */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              <button
                onClick={() => setShowPreview(true)}
                className="py-2.5 px-4 bg-white border border-[#123B63] hover:bg-blue-50 text-[#123B63] text-xs font-bold rounded-lg flex items-center justify-center gap-1.5"
              >
                <Eye className="w-4 h-4" />
                <span>Preview Full Report</span>
              </button>

              <button
                onClick={handleDownload}
                className="py-2.5 px-4 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Report ({format})</span>
              </button>

              <button
                onClick={() => {
                  onShareWithReviewer();
                  onClose();
                }}
                className="py-2.5 px-4 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4 text-slate-500" />
                <span>Share with Reviewer</span>
              </button>

              <button
                onClick={onClose}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5"
              >
                <span>Return to Analysis</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
