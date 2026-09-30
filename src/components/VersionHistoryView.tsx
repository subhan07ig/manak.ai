import React, { useState } from 'react';
import {
  AlertTriangle,
  History,
  Calendar,
  CheckCircle2,
  ArrowRight,
  GitCompare,
  FileCheck,
  Send,
  ExternalLink,
  ShieldAlert,
  X
} from 'lucide-react';
import { VERSION_HISTORY_ITEMS } from '../data/standardsData';
import { VersionHistoryItem } from '../types';

interface VersionHistoryViewProps {
  onReplaceInSpecification: () => void;
  onRequestReview: () => void;
}

export const VersionHistoryView: React.FC<VersionHistoryViewProps> = ({
  onReplaceInSpecification,
  onRequestReview,
}) => {
  const [timeline, setTimeline] = useState<VersionHistoryItem[]>(VERSION_HISTORY_ITEMS);
  const [showDiffModal, setShowDiffModal] = useState(false);
  const [replaced, setReplaced] = useState(false);

  const handleReplace = () => {
    setReplaced(true);
    onReplaceInSpecification();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-[#0B2447]">
          Standard Lifecycle and Version History
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Chronological audit trail of editions, reaffirmations, gazette amendments, and tender obsolescence risks.
        </p>
      </div>

      {/* Prominent Warning Callout as required by PDF */}
      {!replaced ? (
        <div className="bg-rose-50 border-2 border-rose-300 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <div className="text-sm font-extrabold text-rose-900 uppercase tracking-tight">
                  Outdated Reference Detected
                </div>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                  “The tender refers to <span className="font-bold underline">IS 7098 (Part 1):2018</span>. <span className="font-bold underline text-emerald-800">IS 7098 (Part 1):2025</span> is currently listed as the latest applicable edition.”
                </p>
                <div className="text-[11px] text-rose-700 mt-1">
                  Procuring under the 2018 edition risks delivery of cables without mandatory 2025 halogen emission safeguards, leading to audit objections under GFR 2017 Rule 144.
                </div>
              </div>
            </div>

            <span className="text-[11px] uppercase font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded shrink-0">
              High Risk
            </span>
          </div>

          <div className="pt-2 border-t border-rose-200 flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleReplace}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Replace in Draft Specification</span>
            </button>

            <button
              onClick={() => setShowDiffModal(true)}
              className="px-3.5 py-2 bg-white border border-rose-300 hover:bg-rose-50 text-rose-900 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <GitCompare className="w-3.5 h-3.5 text-rose-700" />
              <span>View Differences (2018 vs 2025)</span>
            </button>

            <button
              onClick={() => alert('Retained historical version with cautionary audit note logged.')}
              className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors"
            >
              Retain Historical Version
            </button>

            <button
              onClick={onRequestReview}
              className="px-3.5 py-2 text-xs font-semibold text-[#123B63] hover:underline flex items-center gap-1 ml-auto"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request Expert Review</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="font-bold">
              Successfully updated draft specification to IS 7098 (Part 1):2025 (Fourth Revision).
            </span>
          </div>
          <button
            onClick={() => setReplaced(false)}
            className="text-emerald-800 underline hover:text-emerald-950 font-medium"
          >
            Undo
          </button>
        </div>
      )}

      {/* Visual Timeline Section */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm p-6">
        <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-6 flex items-center gap-2">
          <History className="w-4 h-4 text-[#123B63]" />
          <span>Timeline Evolution of Indian Standard</span>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-4 pl-6 space-y-8">
          {timeline.map((item, idx) => {
            const isCurrent = item.status.includes('Current');
            const isSuperseded = item.status.includes('Superseded');

            return (
              <div key={item.id} className="relative group">
                {/* Node circle on timeline line */}
                <div
                  className={`absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 transition-all ${
                    isCurrent
                      ? 'bg-emerald-600 border-white ring-4 ring-emerald-100 scale-125'
                      : isSuperseded
                      ? 'bg-rose-500 border-white ring-4 ring-rose-100'
                      : 'bg-[#123B63] border-white'
                  }`}
                />

                <div className="bg-[#F8FAFC] border border-[#D9E1EA] rounded-xl p-4.5 space-y-2 hover:border-[#123B63] transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-[#0B2447]">
                        {item.editionLabel}
                      </span>
                      <span className="text-xs text-slate-500 font-mono-numbers font-medium">
                        ({item.year})
                      </span>
                    </div>

                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                        isCurrent
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isSuperseded
                          ? 'bg-rose-100 text-rose-800 border border-rose-300'
                          : 'bg-blue-100 text-[#123B63]'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Publication Date
                      </span>
                      <span className="font-medium font-mono-numbers">{item.publicationDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Effective / Mandatory Date
                      </span>
                      <span className="font-medium font-mono-numbers">{item.effectiveDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">
                        Authority & Relationship
                      </span>
                      <span className="font-medium text-[#0B2447]">{item.relationship}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <div className="font-bold text-slate-800 mb-0.5">Tender Impact:</div>
                    <p className="text-slate-600 leading-normal">{item.tenderImpact}</p>
                    {item.changesSummary && (
                      <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">Consolidated Changes:</span> {item.changesSummary}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span className="flex items-center gap-1 font-mono">
                      <FileCheck className="w-3 h-3 text-[#123B63]" />
                      {item.source}
                    </span>
                    <button
                      onClick={() => alert(`Direct link to Gazette entry: ${item.source}`)}
                      className="text-[#123B63] hover:underline flex items-center gap-0.5"
                    >
                      View circular <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Difference Modal (Side-by-Side 2018 vs 2025) */}
      {showDiffModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-[#D9E1EA] rounded-2xl max-w-3xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Technical Clause Comparison
                </span>
                <h3 className="text-lg font-bold text-[#0B2447] mt-0.5">
                  IS 7098 (Part 1):2018 vs IS 7098 (Part 1):2025
                </h3>
              </div>
              <button
                onClick={() => setShowDiffModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* 2018 Box */}
              <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                <span className="font-extrabold text-rose-900 block text-sm">
                  IS 7098 (Part 1):2018 (Superseded)
                </span>
                <div className="space-y-2 text-rose-950">
                  <p>
                    <span className="font-bold">Sheath Material:</span> Standard PVC Type ST2. Permits heavy chlorine plasticizers.
                  </p>
                  <p>
                    <span className="font-bold">Acid Gas Emission:</span> No ceiling stipulated. Generates toxic HCl gas upon burning.
                  </p>
                  <p>
                    <span className="font-bold">Fire Integrity:</span> 750°C continuity optional or non-standardized.
                  </p>
                  <p>
                    <span className="font-bold">Tender Rejection Risk:</span> Very High under current CPWD fire-safety mandates.
                  </p>
                </div>
              </div>

              {/* 2025 Box */}
              <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                <span className="font-extrabold text-emerald-900 block text-sm">
                  IS 7098 (Part 1):2025 (Current Revised)
                </span>
                <div className="space-y-2 text-emerald-950">
                  <p>
                    <span className="font-bold">Sheath Material:</span> Thermoplastic FRLS-H or Zero-Halogen HFFR compound.
                  </p>
                  <p>
                    <span className="font-bold">Acid Gas Emission:</span> Strictly capped at &lt; 0.5% (Non-corrosive / life-safety).
                  </p>
                  <p>
                    <span className="font-bold">Fire Integrity:</span> Mandatory 180 min at 750°C as per IS 10810 (Part 62).
                  </p>
                  <p>
                    <span className="font-bold">Tender Compliance:</span> 100% compliant with Ministry QCO 2024.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  handleReplace();
                  setShowDiffModal(false);
                }}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Adopt 2025 Edition in Tender</span>
              </button>

              <button
                onClick={() => setShowDiffModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
