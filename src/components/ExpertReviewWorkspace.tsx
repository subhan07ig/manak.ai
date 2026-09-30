import React, { useState } from 'react';
import {
  UserCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  MessageSquare,
  ShieldAlert,
  ChevronRight,
  Filter,
  Check,
  Scale,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { EXPERT_REVIEW_ITEMS } from '../data/standardsData';
import { ExpertReviewItem } from '../types';

export const ExpertReviewWorkspace: React.FC = () => {
  const [items, setItems] = useState<ExpertReviewItem[]>(EXPERT_REVIEW_ITEMS);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedItem, setSelectedItem] = useState<ExpertReviewItem>(EXPERT_REVIEW_ITEMS[0]);
  const [commentText, setCommentText] = useState('');
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const filters = [
    'All',
    'Pending approval',
    'High-risk',
    'Low confidence',
    'Certification ambiguity',
    'Conflicting standards',
    'Outdated reference',
    'Reviewed',
  ];

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Reviewed') return item.status === 'Reviewed';
    return item.status === activeFilter;
  });

  const handleExpertAction = (decision: string, commentSummary: string) => {
    const updatedHistory = [
      {
        reviewer: 'Ananya Sharma (Procurement Officer)',
        date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) + ' IST',
        decision,
        comment: commentText.trim() ? commentText : commentSummary,
      },
      ...selectedItem.reviewHistory,
    ];

    const updatedItem = {
      ...selectedItem,
      status: decision === 'Approved' ? ('Reviewed' as const) : selectedItem.status,
      reviewHistory: updatedHistory,
    };

    setItems((prev) => prev.map((i) => (i.id === selectedItem.id ? updatedItem : i)));
    setSelectedItem(updatedItem);
    setCommentText('');
    setActionNotice(`Expert Action Recorded: ${decision}`);
    setTimeout(() => setActionNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-50 text-purple-700 text-xs font-semibold mb-1">
            <UserCheck className="w-3.5 h-3.5" />
            Human-in-the-Loop Governance
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
            Expert Review Queue
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Audit interface for senior technical committee members, compliance experts, and procurement directors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono-numbers px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-md font-bold">
            {items.filter((i) => i.status !== 'Reviewed').length} Pending Decisions
          </span>
        </div>
      </div>

      {/* Filter Tabs as per PDF */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              activeFilter === f
                ? 'bg-[#123B63] text-white shadow-xs'
                : 'bg-white border border-[#D9E1EA] text-slate-700 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Action Notification */}
      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Grid: Left Queue List + Right Active Review Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Col: Queue items */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider flex items-center justify-between">
            <span>Escalated Cases</span>
            <span className="text-slate-400 font-normal">({filteredItems.length})</span>
          </div>

          <div className="space-y-2.5">
            {filteredItems.map((item) => {
              const isSelected = selectedItem.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-[#123B63] shadow-sm ring-1 ring-[#123B63]'
                      : 'bg-white border-[#D9E1EA] hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold text-slate-500">
                      {item.productCategory}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        item.status === 'Reviewed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.status === 'High-risk'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-[#0B2447] line-clamp-1">
                    {item.analysisName}
                  </h3>

                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    {item.reasonForEscalation}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-mono-numbers text-slate-500">
                      Score: <strong className="text-slate-800">{item.confidenceScore}%</strong>
                    </span>
                    <span className="text-[#123B63] font-semibold flex items-center gap-0.5">
                      Review <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Cols: Detailed Expert Review Card & Actions */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white border border-[#D9E1EA] rounded-2xl p-6 shadow-sm space-y-5">
            {/* Header info */}
            <div className="border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    {selectedItem.productCategory} · Case Ref: {selectedItem.id}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0B2447] mt-0.5">
                    {selectedItem.analysisName}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">AI Confidence Score</div>
                  <div className="text-xl font-black text-[#123B63] font-mono-numbers">
                    {selectedItem.confidenceScore}%
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                Automated AI Recommendation
              </span>
              <p className="text-xs font-semibold text-[#0B2447] leading-relaxed">
                {selectedItem.aiRecommendation}
              </p>
            </div>

            {/* Reason for Escalation */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Reason for Escalation
              </span>
              <p className="text-xs text-amber-950 leading-relaxed">
                {selectedItem.reasonForEscalation}
              </p>
            </div>

            {/* Official Evidence Grounding */}
            <div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Official Evidence & Committee Directives
              </span>
              <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 leading-relaxed italic">
                &ldquo;{selectedItem.officialEvidence}&rdquo;
              </p>
            </div>

            {/* Suggested Action */}
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-lg">
              <span className="text-[11px] font-bold text-[#123B63] uppercase tracking-wider block mb-0.5">
                Suggested System Action
              </span>
              <p className="text-xs text-slate-800 font-medium">{selectedItem.suggestedAction}</p>
            </div>

            {/* Expert Actions Bar as per PDF Section 16 */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <span className="text-xs font-bold text-[#0B2447] uppercase tracking-wider block">
                Expert Actions & Override Controls
              </span>

              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => handleExpertAction('Approved', 'Technical recommendation approved without alterations.')}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Recommendation</span>
                </button>

                <button
                  onClick={() => handleExpertAction('Rejected', 'Recommendation rejected due to contradictory departmental advisory.')}
                  className="px-3.5 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Recommendation</span>
                </button>

                <button
                  onClick={() => handleExpertAction('Alternate Standard Selected', 'Alternate halogen-free standard IS 17048 substituted.')}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium rounded-lg"
                >
                  Select Alternate Standard
                </button>

                <button
                  onClick={() => handleExpertAction('Product Mapping Edited', 'Adjusted product classification to ICU flame-retardant power feed.')}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium rounded-lg"
                >
                  Edit Product Mapping
                </button>

                <button
                  onClick={() => handleExpertAction('Marked as Mandatory', 'Certification enforced as mandatory under QCO Notification.')}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium rounded-lg flex items-center gap-1"
                >
                  <Scale className="w-3.5 h-3.5 text-blue-600" />
                  <span>Mark Certification as Mandatory</span>
                </button>

                <button
                  onClick={() => handleExpertAction('Marked as Voluntary', 'Certification downgraded to voluntary advisory.')}
                  className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium rounded-lg"
                >
                  Mark as Voluntary
                </button>
              </div>

              {/* Review Comment Box */}
              <div className="pt-2 flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add expert audit note or committee rationale..."
                  className="flex-1 text-xs bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
                <button
                  onClick={() => {
                    if (commentText.trim()) {
                      handleExpertAction('Comment Added', commentText);
                    }
                  }}
                  className="px-3.5 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log Comment</span>
                </button>
              </div>
            </div>

            {/* Review History as per PDF */}
            <div className="border-t border-slate-100 pt-4">
              <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#123B63]" />
                <span>Review History & Audit Trail</span>
              </div>

              <div className="space-y-2.5">
                {selectedItem.reviewHistory.map((rev, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="font-bold text-slate-800">{rev.reviewer}</span>
                      <span className="font-mono-numbers">{rev.date}</span>
                    </div>
                    <div className="font-semibold text-[#123B63]">Decision: {rev.decision}</div>
                    <p className="text-slate-600">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
