import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileCheck2,
  Info,
  Scale
} from 'lucide-react';
import { COMPLIANCE_ITEMS } from '../data/standardsData';
import { ComplianceItem } from '../types';

export const CertificationComplianceView: React.FC = () => {
  const [items, setItems] = useState<ComplianceItem[]>(COMPLIANCE_ITEMS);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);

  const getStatusBadge = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'Mandatory under identified notification':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-300">
            <Scale className="w-3 h-3 text-rose-600" />
            Mandatory under QCO Notification
          </span>
        );
      case 'Applicable — verify scope':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Applicable — verify scope
          </span>
        );
      case 'Potentially applicable':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Potentially applicable
          </span>
        );
      case 'Manual verification required':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
            <HelpCircle className="w-3 h-3 text-amber-600" />
            Manual verification required
          </span>
        );
      case 'Not identified':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Not identified
          </span>
        );
      case 'Not applicable':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            <XCircle className="w-3 h-3 text-slate-400" />
            Not applicable
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-[#0B2447]">
          Certification and Compliance Check
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Verification of statutory Quality Control Orders (QCO), BIS licensing schemes, and mandatory e-procurement compliances.
        </p>
      </div>

      {/* Warning Panel: Technical Relevance vs Legal Compulsion (as mandated in PDF) */}
      <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl shadow-xs">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold text-amber-900">
              Regulatory Boundary Warning
            </div>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              “MANAK.AI distinguishes technical relevance from legal compulsion. Confirm legal applicability against the latest official notification before publishing the tender.”
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Certification applicable</div>
          <div className="text-2xl font-bold text-[#0B2447] font-mono-numbers mt-1">
            BIS Scheme-I
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-1">
            ISI Mark Licence Required
          </div>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Mandatory status verified</div>
          <div className="text-2xl font-bold text-rose-700 font-mono-numbers mt-1">
            Yes (Statutory)
          </div>
          <div className="text-[11px] text-rose-700 font-semibold mt-1">
            Quality Control Order Enforced
          </div>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Notification found</div>
          <div className="text-2xl font-bold text-[#0B2447] font-mono-numbers mt-1">
            S.O. 312(E)
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Ministry of Heavy Industries
          </div>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Manual confirmation required</div>
          <div className="text-2xl font-bold text-amber-600 font-mono-numbers mt-1">
            1 Item
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            RoHS hospital guideline scope
          </div>
        </div>
      </div>

      {/* Compliance Table */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-[#F5F7FA] border-b border-[#D9E1EA] flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-[#0B2447]">
            Statutory & Scheme Compliance Matrix
          </div>
          <span className="text-[11px] text-slate-500 font-mono-numbers">
            {items.length} Schemes Evaluated
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#D9E1EA]">
              <tr>
                <th className="py-3 px-4 font-semibold">Requirement</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Evidence</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#0B2447]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#123B63] shrink-0" />
                      <span>{row.requirement}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{row.type}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(row.status)}</td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs leading-normal">
                    {row.evidence}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedItem(row)}
                      className="px-2.5 py-1 text-xs font-semibold text-[#123B63] hover:text-white hover:bg-[#123B63] border border-[#123B63] rounded transition-colors inline-flex items-center gap-1"
                    >
                      <span>{row.actionText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspection Modal for Details / Gazette */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-[#D9E1EA] rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Compliance Source Verification
                </span>
                <h3 className="text-base font-bold text-[#0B2447] mt-0.5">
                  {selectedItem.requirement}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3 bg-[#F5F7FA] rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Status Classification:</span>
                {getStatusBadge(selectedItem.status)}
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Official Evidence Grounding:</span>
                <p className="text-slate-700 leading-relaxed italic bg-blue-50/50 p-2.5 rounded border border-blue-100">
                  &ldquo;{selectedItem.evidence}&rdquo;
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Statutory Authority & Clause:</span>
                <p className="text-slate-600">{selectedItem.sourceDetails}</p>
                {selectedItem.gazetteRef && (
                  <span className="inline-block mt-1 font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                    Ref: {selectedItem.gazetteRef}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => alert(`Opening official gazette reference: ${selectedItem.sourceDetails}`)}
                className="px-3 py-1.5 bg-[#123B63] text-white text-xs font-semibold rounded-md hover:bg-[#0B2447] flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Official Gazette Record</span>
              </button>

              <button
                onClick={() => setSelectedItem(null)}
                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-md font-medium"
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
