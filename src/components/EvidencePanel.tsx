import React, { useState } from 'react';
import {
  FileCheck2,
  ExternalLink,
  Copy,
  Check,
  History,
  AlertCircle,
  ShieldCheck,
  Info,
  Clock,
  UserCheck
} from 'lucide-react';
import { EVIDENCE_RECORDS } from '../data/standardsData';
import { EvidenceRecord } from '../types';

export const EvidencePanel: React.FC = () => {
  const [evidenceList] = useState<EvidenceRecord[]>(EVIDENCE_RECORDS);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [reportedId, setReportedId] = useState<string | null>(null);

  const handleCopyCitation = (item: EvidenceRecord) => {
    const citation = `Standard: ${item.isNumber} | Source: ${item.sourceName} (${item.clause}) | Verified: ${item.verifiedDate} | Retrieved via MANAK.AI GovTech Portal`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleReport = (id: string) => {
    setReportedId(id);
    alert('Citation feedback logged into BIS Data Validation Pipeline for analyst review.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-[#0B2447]">
          Evidence and Source Verification
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Full traceability and verbatim grounding of AI recommendations to official Bureau of Indian Standards and Gazette clauses.
        </p>
      </div>

      {/* Mandatory Disclaimer Note as per PDF */}
      <div className="p-4 bg-blue-50/70 border border-blue-200 rounded-xl flex items-start gap-3">
        <Info className="w-4 h-4 text-[#123B63] shrink-0 mt-0.5" />
        <div className="text-xs text-[#123B63] leading-relaxed">
          <span className="font-bold">Official Evidence Disclaimer:</span> “Recommendations are generated from retrieved evidence. MANAK.AI does not replace official BIS notifications or expert legal interpretation.”
        </div>
      </div>

      {/* Evidence Cards */}
      <div className="space-y-4">
        {evidenceList.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden p-5 space-y-4 hover:border-[#123B63] transition-colors"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-[#0B2447]">{item.isNumber}</span>
                <span className="text-slate-400">·</span>
                <span className="text-xs font-semibold text-[#123B63] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {item.sourceName}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-600" />
                  {item.humanVerificationStatus}
                </span>

                <span className="text-[11px] font-mono-numbers text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {item.evidenceConfidence}
                </span>
              </div>
            </div>

            {/* Verbatim Snippet */}
            <div className="bg-[#F8FAFC] border-l-4 border-[#123B63] p-4 rounded-r-lg">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                {item.clause}
              </div>
              <p className="text-xs font-medium text-slate-800 leading-relaxed italic">
                {item.evidenceSnippet}
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 bg-[#F5F7FA] p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Source Type
                </span>
                <span className="font-medium text-slate-800">{item.sourceType}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Data Version
                </span>
                <span className="font-mono text-slate-800">{item.dataVersion}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Retrieved Date
                </span>
                <span className="font-mono-numbers text-slate-800">{item.retrievedDate}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Verified Date
                </span>
                <span className="font-mono-numbers text-emerald-700 font-semibold">
                  {item.verifiedDate}
                </span>
              </div>
            </div>

            {/* Action Buttons as per PDF */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Opening official verified source URL: ${item.sourceUrl}`)}
                  className="px-3 py-1.5 bg-[#123B63] hover:bg-[#0B2447] text-white rounded-md font-semibold transition-colors flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Official Source</span>
                </button>

                <button
                  onClick={() => handleCopyCitation(item)}
                  className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-md font-semibold transition-colors flex items-center gap-1.5"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Citation Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => alert(`Source History: First indexed Jan 2025, Re-verified Sep 2026 under BIS API Node ETD-09.`)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-900 flex items-center gap-1"
                >
                  <History className="w-3.5 h-3.5 text-slate-400" />
                  <span>View Source History</span>
                </button>
              </div>

              <button
                onClick={() => handleReport(item.id)}
                className="text-xs text-slate-500 hover:text-rose-700 flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5 text-slate-400 hover:text-rose-600" />
                <span>Report Incorrect Information</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
