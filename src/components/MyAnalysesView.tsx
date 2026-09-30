import React, { useState } from 'react';
import {
  FolderKanban,
  FileCheck2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Search,
  Filter,
  ArrowRight,
  PlusCircle,
  FileText
} from 'lucide-react';
import { AnalysisRecord, ScreenType } from '../types';

interface MyAnalysesViewProps {
  analyses: AnalysisRecord[];
  onSelectAnalysis: (analysis: AnalysisRecord) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const MyAnalysesView: React.FC<MyAnalysesViewProps> = ({
  analyses,
  onSelectAnalysis,
  onNavigate,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = analyses.filter((a) => {
    if (filterStatus !== 'All' && a.status !== filterStatus) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase()) && !a.productCategory.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
            My Procurement Analyses
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Archived tenders, drafts, and active standards evaluations under your departmental login.
          </p>
        </div>

        <button
          onClick={() => onNavigate('new-analysis')}
          className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow-sm flex items-center gap-1.5"
        >
          <PlusCircle className="w-4 h-4 text-[#F59E0B]" />
          <span>New Analysis</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tender name or category..."
            className="w-full pl-9 pr-3 py-2 bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          {['All', 'Verified', 'Expert review required', 'Draft', 'Pending expert approval'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1.5 rounded-md font-semibold transition-colors ${
                filterStatus === st
                  ? 'bg-[#123B63] text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Analyses Table */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F5F7FA] text-[#64748B] border-b border-[#D9E1EA]">
            <tr>
              <th className="py-3.5 px-4 font-semibold">Tender Specification Title</th>
              <th className="py-3.5 px-4 font-semibold">Product Category</th>
              <th className="py-3.5 px-4 font-semibold">Date Created</th>
              <th className="py-3.5 px-4 font-semibold">Compliance Status</th>
              <th className="py-3.5 px-4 font-semibold text-right">Standards Mapped</th>
              <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectAnalysis(item)}
                className="hover:bg-slate-50/80 cursor-pointer transition-colors"
              >
                <td className="py-3.5 px-4 font-bold text-[#0B2447]">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#123B63]" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-slate-600">{item.productCategory}</td>
                <td className="py-3.5 px-4 text-slate-500 font-mono-numbers">{item.date}</td>
                <td className="py-3.5 px-4">
                  {item.status === 'Verified' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                  {item.status === 'Expert review required' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
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
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      <Clock className="w-3 h-3 text-blue-600" />
                      Pending approval
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-4 text-right font-mono-numbers font-bold text-slate-800">
                  {item.standardsCount} standards
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectAnalysis(item);
                    }}
                    className="text-xs font-semibold text-[#123B63] hover:text-[#0B2447] inline-flex items-center gap-1"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
