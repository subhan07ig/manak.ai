import React from 'react';
import {
  Sparkles,
  UploadCloud,
  FileCheck2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { ScreenType, AnalysisRecord } from '../types';

interface DashboardViewProps {
  onNavigate: (screen: ScreenType) => void;
  analyses: AnalysisRecord[];
  onSelectAnalysis: (analysis: AnalysisRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  analyses,
  onSelectAnalysis,
}) => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Primary Hero Card */}
      <div className="bg-gradient-to-r from-[#0B2447] via-[#123B63] to-[#1a4a7a] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-[#1e4e7c]">
        {/* Subtle decorative geometry */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none flex items-center justify-end pr-8">
          <svg viewBox="0 0 200 200" className="w-80 h-80 text-white fill-none stroke-current" strokeWidth="2">
            <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="50" />
            <polygon points="100,20 170,140 30,140" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tender Specification Intelligence Engine</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Create a standards-backed procurement specification
          </h2>

          <p className="text-sm text-slate-200 mb-6 leading-relaxed">
            Describe a product, upload a tender document, or check an existing IS reference. MANAK.AI automatically extracts parameters, verifies active Indian Standards, checks Quality Control Orders (QCO), and identifies missing requirements.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('new-analysis')}
              className="px-5 py-2.5 bg-[#F59E0B] hover:bg-[#d97706] text-[#0B2447] text-xs font-bold rounded-lg transition-all shadow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start New Analysis</span>
            </button>

            <button
              onClick={() => onNavigate('new-analysis')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg border border-white/20 transition-all flex items-center gap-2"
            >
              <UploadCloud className="w-4 h-4 text-slate-300" />
              <span>Upload Tender Document</span>
            </button>

            <button
              onClick={() => onNavigate('standards-explorer')}
              className="px-4 py-2.5 text-xs text-slate-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Direct Standards Explorer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Metrics with trend indicators */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Analyses this month</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#123B63] flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers">24</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 4 procurement categories</p>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Standards verified</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers">1,248</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> +8%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Verified against official BIS gazette</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Outdated references detected</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#D97706] font-mono-numbers">7</span>
            <span className="text-xs text-amber-700 font-medium">Requires replacement</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Superseded standards prevented</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Expert reviews pending</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers">3</span>
            <span className="text-xs text-slate-500 font-medium">In review queue</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Pending committee approval</p>
        </div>
      </div>

      {/* Main Grid: Recent Analyses & Alerts Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Analyses Table */}
        <div className="lg:col-span-2 bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 sm:px-6 border-b border-[#D9E1EA] flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#0B2447]">Recent Procurement Analyses</h3>
              <p className="text-xs text-[#64748B]">Tenders checked for Indian Standards compliance</p>
            </div>
            <button
              onClick={() => onNavigate('my-analyses')}
              className="text-xs font-semibold text-[#123B63] hover:underline flex items-center gap-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F7FA] text-[#64748B] border-b border-[#D9E1EA]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Analysis Name</th>
                  <th className="py-3 px-4 font-semibold">Product Category</th>
                  <th className="py-3 px-4 font-semibold">Date</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Standards Found</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {analyses.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    onClick={() => onSelectAnalysis(item)}
                  >
                    <td className="py-3 px-4 font-semibold text-[#0B2447]">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-4 h-4 text-[#123B63] shrink-0" />
                        <span className="group-hover:text-[#123B63]">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{item.productCategory}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono-numbers">{item.date}</td>
                    <td className="py-3 px-4">
                      {item.status === 'Verified' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      )}
                      {item.status === 'Expert review required' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Expert review required
                        </span>
                      )}
                      {item.status === 'Draft' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          Draft
                        </span>
                      )}
                      {item.status === 'Pending expert approval' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          <Clock className="w-3 h-3 text-blue-600" />
                          Pending approval
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-numbers font-semibold text-slate-700">
                      {item.standardsCount} standards
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectAnalysis(item);
                        }}
                        className="text-xs font-semibold text-[#123B63] hover:text-[#0B2447] inline-flex items-center gap-1 p-1"
                      >
                        <span>Open</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Col: Alerts Panel & Quick Actions */}
        <div className="space-y-6">
          {/* Alerts Panel */}
          <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2447]">
                  Alerts & Notifications
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono-numbers">Live BIS Feed</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg">
                <div className="text-xs font-semibold text-amber-900">
                  An amendment was detected for one standard in your saved analysis.
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  IS 7098 (Part 1) Fourth Revision 2025 replaces the 2018 edition for hospital low-voltage cables.
                </p>
                <button
                  onClick={() => onNavigate('new-analysis')}
                  className="mt-2 text-xs font-bold text-[#123B63] hover:underline flex items-center gap-1"
                >
                  Review tender diff <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 bg-blue-50/70 border border-blue-200/80 rounded-lg">
                <div className="text-xs font-semibold text-blue-900">
                  Three tender specifications require expert review.
                </div>
                <p className="text-[11px] text-blue-800 mt-1">
                  Conflicting standards and clinical directives escalated for senior committee verification.
                </p>
                <button
                  onClick={() => onNavigate('expert-review')}
                  className="mt-2 text-xs font-bold text-[#123B63] hover:underline flex items-center gap-1"
                >
                  Go to review queue <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-lg">
                <div className="text-xs font-semibold text-emerald-900">
                  A certification notification has changed.
                </div>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Ministry QCO Notification S.O. 312(E) mandates ISI Mark verification on e-procurement portal.
                </p>
                <button
                  onClick={() => onNavigate('compliance-centre')}
                  className="mt-2 text-xs font-bold text-emerald-900 hover:underline flex items-center gap-1"
                >
                  View compliance matrix <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2447] mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <button
                onClick={() => onNavigate('new-analysis')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#123B63] hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Analyse product description</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('new-analysis')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#123B63] hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Upload tender document</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('standards-explorer')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#123B63] hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Check an IS number</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('standards-explorer')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#123B63] hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Explore standards catalogue</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('my-analyses')}
                className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-[#123B63] hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span className="font-semibold text-slate-800">Review saved tenders</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
