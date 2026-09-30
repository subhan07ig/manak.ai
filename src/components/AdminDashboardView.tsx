import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Activity,
  Users,
  Shield,
  Layers,
  FileText,
  Sliders,
  Sparkles,
  Server
} from 'lucide-react';
import { DATA_SOURCES_ADMIN } from '../data/standardsData';
import { DataSourceRecord } from '../types';

export const AdminDashboardView: React.FC = () => {
  const [sources, setSources] = useState<DataSourceRecord[]>(DATA_SOURCES_ADMIN);
  const [activeTab, setActiveTab] = useState<'sources' | 'users' | 'ontology' | 'audit'>('sources');
  const [syncing, setSyncing] = useState(false);

  const handleSyncAll = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      alert('All 5 official data sources synchronized with Bureau of Indian Standards master index.');
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold mb-1">
            <Server className="w-3.5 h-3.5 text-[#123B63]" />
            System Administration & Ingestion Pipeline
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
            Portal Administration Console
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Monitor official Indian Standards datasets, sync status, ontologies, and procurement compliance policies.
          </p>
        </div>

        <button
          onClick={handleSyncAll}
          disabled={syncing}
          className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Feeds...' : 'Sync Master BIS Sources'}</span>
        </button>
      </div>

      {/* Admin KPI Cards as per PDF Screen 15 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">Connected Sources</span>
          <span className="text-xl font-extrabold text-[#0B2447] font-mono-numbers mt-1 block">5</span>
          <span className="text-[10px] text-emerald-600 font-semibold">100% Operational</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">Last Update</span>
          <span className="text-xs font-bold text-[#0B2447] mt-1 block">05:40 IST</span>
          <span className="text-[10px] text-slate-400">Today</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">Standards Records</span>
          <span className="text-xl font-extrabold text-[#123B63] font-mono-numbers mt-1 block">52,180</span>
          <span className="text-[10px] text-slate-500">Full Indian Catalogue</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">Pending Changes</span>
          <span className="text-xl font-extrabold text-amber-600 font-mono-numbers mt-1 block">14</span>
          <span className="text-[10px] text-amber-700">Awaiting parsing</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">Conflicts to Review</span>
          <span className="text-xl font-extrabold text-rose-600 font-mono-numbers mt-1 block">2</span>
          <span className="text-[10px] text-rose-700">In Expert Queue</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-500 block">System Health</span>
          <span className="text-xl font-extrabold text-emerald-600 font-mono-numbers mt-1 block">99.8%</span>
          <span className="text-[10px] text-emerald-700">Audit Grade</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-[#D9E1EA] text-xs font-bold text-slate-600 gap-4">
        {[
          { id: 'sources', label: 'Data Sources & Synchronisation' },
          { id: 'users', label: 'User Roles & Access Control' },
          { id: 'ontology', label: 'Product Ontology & Mapping' },
          { id: 'audit', label: 'System Audit Logs' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-2.5 transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-[#123B63] text-[#0B2447]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Data Source Table (Screen 15) */}
      {activeTab === 'sources' && (
        <div className="bg-white border border-[#D9E1EA] rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-[#F5F7FA] border-b border-[#D9E1EA] flex items-center justify-between text-xs">
            <span className="font-bold text-[#0B2447] uppercase tracking-wider">
              Connected Authorised Technical Repositories
            </span>
            <span className="text-slate-500 font-mono-numbers font-medium">5 feeds active</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#D9E1EA]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Data Source Name</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Last Sync</th>
                  <th className="py-3 px-4 font-semibold text-right">Records Added</th>
                  <th className="py-3 px-4 font-semibold text-right">Records Updated</th>
                  <th className="py-3 px-4 font-semibold text-right">Deprecated</th>
                  <th className="py-3 px-4 font-semibold text-right">Validation Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources.map((src, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0B2447] flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-[#123B63]" />
                      <span>{src.name}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        {src.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono-numbers text-slate-600">{src.lastSync}</td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers text-slate-800 font-semibold">
                      +{src.recordsAdded}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers text-slate-800 font-semibold">
                      {src.recordsUpdated}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-numbers text-rose-700 font-semibold">
                      {src.recordsDeprecated}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[11px] font-semibold text-[#123B63] bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {src.validationStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Users & Roles Mock View */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold text-[#0B2447]">Manage Users & Departmental Roles</h3>
            <button
              onClick={() => alert('New user invitation sent via departmental directory.')}
              className="px-3 py-1.5 bg-[#123B63] text-white rounded font-semibold text-xs"
            >
              + Invite Officer
            </button>
          </div>
          <div className="space-y-2">
            {[
              { name: 'Ananya Sharma', email: 'ananya.sharma@pwd.delhi.gov.in', role: 'Procurement Officer', dept: 'Public Works' },
              { name: 'Dr. V. K. Raman', email: 'raman.vk@health.gov.in', role: 'Standards & Compliance Expert', dept: 'Medical Infrastructure' },
              { name: 'S. N. Mehta', email: 'mehta.sn@cpwd.gov.in', role: 'Chief Structural Engineer', dept: 'CPWD Works' },
            ].map((u, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{u.name}</div>
                  <div className="text-slate-500">{u.email} · {u.dept}</div>
                </div>
                <span className="font-semibold bg-white border border-slate-300 px-2 py-1 rounded text-slate-700">
                  {u.role}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ontology Tab */}
      {activeTab === 'ontology' && (
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0B2447]">Product Ontology & Semantic Concept Graph</h3>
          <p className="text-slate-600">
            Mapping unstructured procurement vocabulary to official BIS Technical Committees (ETD, CED, MTD, MHD, CHD).
          </p>
          <div className="p-3 bg-[#F5F7FA] rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800 space-y-1">
            <div>&quot;fire-resistant cable&quot; → ETD 09 → IS 7098 (Pt 1) / IS 17048 → QCO S.O. 312(E)</div>
            <div>&quot;surgical gloves&quot; → MHD 09 → IS 13422 (Hypoallergenic barrier) → CDSCO Regs</div>
            <div>&quot;structural steel beams&quot; → MTD 04 → IS 2062 Grade E250 / E350 → Steel QCO</div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'audit' && (
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3 text-xs">
          <h3 className="text-sm font-bold text-[#0B2447]">Immutable System Audit Trail</h3>
          <div className="space-y-2">
            {[
              { time: '26 Sep 2026 14:15 IST', user: 'Ananya Sharma', action: 'Tender analysis generated for hospital fire-resistant cables' },
              { time: '26 Sep 2026 05:40 IST', user: 'SYSTEM CRON', action: 'Synchronized BIS Gazette amendments feed' },
              { time: '25 Sep 2026 19:22 IST', user: 'Dr. V. K. Raman', action: 'Approved amendment to IS 13422 surgical gloves' },
            ].map((log, i) => (
              <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded flex items-center justify-between text-slate-700">
                <span>{log.action}</span>
                <span className="font-mono text-slate-400 text-[10px]">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
