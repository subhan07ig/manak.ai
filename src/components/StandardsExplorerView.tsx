import React, { useState } from 'react';
import {
  Search,
  Filter,
  Layers,
  FileCheck2,
  ExternalLink,
  ChevronRight,
  GitCompare,
  Plus,
  Network,
  X,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { EXPLORER_STANDARDS_CATALOG } from '../data/standardsData';
import { StandardRecord, ScreenType } from '../types';

interface StandardsExplorerViewProps {
  onNavigate: (screen: ScreenType) => void;
  onAddToAnalysis: (std: StandardRecord) => void;
}

export const StandardsExplorerView: React.FC<StandardsExplorerViewProps> = ({
  onNavigate,
  onAddToAnalysis,
}) => {
  const [standards] = useState<StandardRecord[]>(EXPLORER_STANDARDS_CATALOG);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedStandard, setSelectedStandard] = useState<StandardRecord | null>(null);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const sectors = [
    'All',
    'Electrotechnical (ETD)',
    'Civil Engineering (CED)',
    'Metallurgical Engineering (MTD)',
    'Medical Equipment and Hospital Planning (MHD)',
  ];

  const statuses = ['All', 'Current', 'Superseded'];

  const filteredStandards = standards.filter((s) => {
    if (selectedSector !== 'All' && s.sector !== selectedSector) return false;
    if (selectedStatus !== 'All' && s.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchNumber = s.isNumber.toLowerCase().includes(q);
      const matchTitle = s.title.toLowerCase().includes(q);
      const matchCategory = s.productCategory.toLowerCase().includes(q);
      const matchProperties = s.relevantProperties.some((p) => p.toLowerCase().includes(q));
      if (!matchNumber && !matchTitle && !matchCategory && !matchProperties) return false;
    }
    return true;
  });

  const handleAdd = (std: StandardRecord) => {
    onAddToAnalysis(std);
    setAddedNotice(`Added ${std.isNumber} to active tender specification.`);
    setTimeout(() => setAddedNotice(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
          Indian Standards Explorer
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Live searchable registry of Bureau of Indian Standards (BIS) specifications, normative cross-references, and gazette orders.
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-[#D9E1EA] rounded-2xl p-4 shadow-sm space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by IS number, product, keyword, test, material, or certification…"
            className="w-full text-sm pl-11 pr-4 py-3 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#123B63] focus:bg-white transition-all"
          />
        </div>

        {/* Filter Row as per PDF */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <Filter className="w-3.5 h-3.5" />
            <span>Sector:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {sectors.map((sec) => (
              <button
                key={sec}
                onClick={() => setSelectedSector(sec)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedSector === sec
                    ? 'bg-[#123B63] text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-slate-200 hidden sm:block mx-1" />

          <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
            <span>Status:</span>
          </div>

          <div className="flex items-center gap-1.5">
            {statuses.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedStatus === st
                    ? 'bg-[#123B63] text-white font-bold'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Added notice */}
      {addedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{addedNotice}</span>
        </div>
      )}

      {/* Results Table as per PDF */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 bg-[#F5F7FA] border-b border-[#D9E1EA] flex items-center justify-between text-xs">
          <span className="font-bold text-[#0B2447] uppercase tracking-wider">
            Matching Standards Catalogue Records
          </span>
          <span className="font-mono-numbers text-slate-500 font-semibold">
            {filteredStandards.length} records found
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#D9E1EA]">
              <tr>
                <th className="py-3 px-4 font-semibold">IS Number</th>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Sector</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Latest Update</th>
                <th className="py-3 px-4 font-semibold">Certification</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStandards.map((std) => (
                <tr
                  key={std.id}
                  className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                  onClick={() => setSelectedStandard(std)}
                >
                  <td className="py-3.5 px-4 font-extrabold text-[#0B2447] whitespace-nowrap">
                    {std.isNumber}
                  </td>
                  <td className="py-3.5 px-4 text-slate-800 font-medium max-w-sm">
                    <span className="line-clamp-2 group-hover:text-[#123B63]">{std.title}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{std.sector}</td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        std.status === 'Current'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {std.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap font-mono-numbers">
                    {std.edition}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                    <span className="font-semibold text-[#123B63] bg-blue-50 px-1.5 py-0.5 rounded">
                      BIS Scheme-I
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div
                      className="inline-flex items-center gap-1.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setSelectedStandard(std)}
                        className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold text-[11px]"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleAdd(std)}
                        className="px-2 py-1 bg-[#123B63] hover:bg-[#0B2447] text-white rounded font-semibold text-[11px] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detailed Standard Inspector Drawer / Modal */}
      {selectedStandard && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white border border-[#D9E1EA] rounded-2xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {selectedStandard.committee}
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2447] mt-0.5">
                  {selectedStandard.isNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedStandard(null)}
                className="text-slate-400 hover:text-slate-700 font-bold p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p className="font-semibold text-slate-900 leading-relaxed">
                {selectedStandard.title}
              </p>

              <div className="grid grid-cols-2 gap-3 p-3 bg-[#F5F7FA] rounded-xl border border-slate-200">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
                  <span className="font-bold text-emerald-800">{selectedStandard.status}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Edition</span>
                  <span className="font-mono-numbers">{selectedStandard.edition}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Sector</span>
                  <span>{selectedStandard.sector}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Verified Date</span>
                  <span className="font-mono-numbers">{selectedStandard.lastVerifiedDate}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Standard Scope & Rationale:</span>
                <p className="text-slate-600 bg-white p-3 rounded-lg border border-slate-200 leading-relaxed">
                  {selectedStandard.reason}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Relevant Properties & Tests:</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600">
                  {selectedStandard.relevantProperties.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="font-bold text-slate-900 block mb-1">Official Reference Source:</span>
                <span className="text-slate-600 font-mono text-[11px] block bg-slate-50 p-2 rounded border border-slate-200">
                  {selectedStandard.officialSource}
                </span>
              </div>
            </div>

            {/* Actions: View standard, View relationships, Compare versions, Add to analysis */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedStandard(null);
                    onNavigate('knowledge-graph');
                  }}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md flex items-center gap-1.5"
                >
                  <Network className="w-3.5 h-3.5 text-[#123B63]" />
                  <span>View in Graph</span>
                </button>

                <button
                  onClick={() => alert('Opening side-by-side revision comparator.')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md flex items-center gap-1.5"
                >
                  <GitCompare className="w-3.5 h-3.5 text-slate-600" />
                  <span>Compare Versions</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleAdd(selectedStandard);
                    setSelectedStandard(null);
                  }}
                  className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Analysis</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
