import React from 'react';
import {
  HelpCircle,
  BookOpen,
  FileCheck2,
  Shield,
  Scale,
  Sparkles,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const HelpDocumentationView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
          Help & Procurement Documentation
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Standard Operating Procedures (SOP), statutory guidelines, and BIS integration manuals for procurement officers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Guide Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B2447] uppercase tracking-wider">
              <Scale className="w-4 h-4 text-[#123B63]" />
              <span>General Financial Rules (GFR) 2017 — Rule 144</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Under Rule 144 of the General Financial Rules (GFR), all government procuring authorities must ensure that technical specifications are objective, functional, and reference Indian Standards where available. Specifying obsolete, proprietary, or non-conforming standards may invite statutory audit objections.
            </p>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-[#123B63]">
              <strong>How MANAK.AI helps:</strong> Automatically checks every line item against the active Bureau of Indian Standards catalogue to ensure no superseded edition is cited in public notices.
            </div>
          </div>

          <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B2447] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>Understanding Quality Control Orders (QCO)</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              When a Central Ministry issues a Quality Control Order under the BIS Act, it transforms a voluntary technical standard into a statutory legal obligation. Any product supplied without a valid ISI Mark under Scheme-I is deemed illegal for sale and procurement across India.
            </p>
            <p className="text-xs text-slate-600">
              MANAK.AI explicitly tags standards with their governing Gazette S.O. number and warns drafting committees when a standard carries criminal non-compliance penalties for uncertified procurement.
            </p>
          </div>

          <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0B2447] uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-[#F59E0B]" />
              <span>Interactive 5-Step Procurement Workflow</span>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-xs text-slate-700">
              <li>
                <strong className="text-[#0B2447]">Input:</strong> Enter plain text requirement or upload tender Schedule of Requirements.
              </li>
              <li>
                <strong className="text-[#0B2447]">Understand:</strong> Review AI extracted parameters (voltage, application, test criteria).
              </li>
              <li>
                <strong className="text-[#0B2447]">Recommend:</strong> Inspect ranked Indian Standards with scope and verbatim clauses.
              </li>
              <li>
                <strong className="text-[#0B2447]">Validate:</strong> Check QCO mandates, knowledge graph, and missing parameters checklist.
              </li>
              <li>
                <strong className="text-[#0B2447]">Export:</strong> Generate audit-ready tender technical annexure in PDF/DOCX.
              </li>
            </ol>
          </div>
        </div>

        {/* Sidebar Help Links */}
        <div className="space-y-4">
          <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm space-y-3">
            <span className="text-xs font-bold text-[#0B2447] uppercase tracking-wider block">
              Official Regulatory Portals
            </span>
            <div className="space-y-2 text-xs">
              <a
                href="https://bis.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between text-[#123B63] font-medium"
              >
                <span>BIS Know Your Standard</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://egazette.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between text-[#123B63] font-medium"
              >
                <span>e-Gazette of India</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
              <a
                href="https://gem.gov.in"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg flex items-center justify-between text-[#123B63] font-medium"
              >
                <span>Government e-Marketplace (GeM)</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs text-emerald-950">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Smart India Hackathon Prototype</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Designed as a national decision-support system to elevate public procurement technical rigor across PSUs and State PWD departments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
