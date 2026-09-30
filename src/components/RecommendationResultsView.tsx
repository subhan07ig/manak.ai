import React, { useState } from 'react';
import {
  FileText,
  Download,
  Share2,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  Network,
  ShieldCheck,
  History,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Layers,
  ArrowRight,
  Plus,
  GitCompare,
  Flag,
  HelpCircle,
  Eye
} from 'lucide-react';
import { DEMO_STANDARDS_FOR_CABLE } from '../data/standardsData';
import { StandardRecord, ScreenType } from '../types';
import { KnowledgeGraphView } from './KnowledgeGraphView';
import { CertificationComplianceView } from './CertificationComplianceView';
import { MissingRequirementsView } from './MissingRequirementsView';
import { VersionHistoryView } from './VersionHistoryView';
import { EvidencePanel } from './EvidencePanel';
import { ReportGenerationModal } from './ReportGenerationModal';

interface RecommendationResultsViewProps {
  onNavigate: (screen: ScreenType) => void;
  onSendForReview: () => void;
}

export const RecommendationResultsView: React.FC<RecommendationResultsViewProps> = ({
  onNavigate,
  onSendForReview,
}) => {
  const [activeTab, setActiveTab] = useState<
    'recommended' | 'related' | 'certification' | 'missing' | 'version' | 'evidence' | 'graph'
  >('recommended');

  const [standards, setStandards] = useState<StandardRecord[]>(DEMO_STANDARDS_FOR_CABLE);
  const [showRankingExplanation, setShowRankingExplanation] = useState<Record<string, boolean>>({
    'std-primary-1': true,
  });
  const [addedSpecs, setAddedSpecs] = useState<Record<string, boolean>>({
    'std-primary-1': true,
  });
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const toggleRanking = (id: string) => {
    setShowRankingExplanation((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggleAddSpec = (id: string) => {
    setAddedSpecs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveAnalysis = () => {
    setSavedNotice('Analysis successfully saved to your departmental repository.');
    setTimeout(() => setSavedNotice(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Results Header (Screen 6 in PDF) */}
      <div className="bg-white border border-[#D9E1EA] rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold mb-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evidence-Backed Standards Verification</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B2447] tracking-tight">
              Standards Recommendation Report
            </h1>
            <p className="text-xs text-[#64748B] mt-0.5">
              Tender Requirement: “Procurement of fire-resistant low-voltage electrical cables for a government hospital”
            </p>
          </div>

          {/* Action buttons: Export, Share, Save */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-[#F59E0B]" />
              <span>Export Report</span>
            </button>

            <button
              onClick={onSendForReview}
              className="px-3.5 py-2 bg-white border border-[#123B63] hover:bg-blue-50 text-[#123B63] font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Share2 className="w-4 h-4" />
              <span>Share for Expert Review</span>
            </button>

            <button
              onClick={handleSaveAnalysis}
              className="px-3.5 py-2 bg-[#F5F7FA] border border-[#D9E1EA] hover:bg-slate-100 text-slate-700 font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span>Save Analysis</span>
            </button>
          </div>
        </div>

        {/* Sub-bar metadata as per PDF */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-slate-400">Analysis Name:</span>{' '}
              <strong className="text-slate-800">Fire-resistant low-voltage cable procurement</strong>
            </div>
            <div>
              <span className="text-slate-400">Input Date:</span>{' '}
              <strong className="text-slate-800 font-mono-numbers">26 Sep 2026</strong>
            </div>
            <div>
              <span className="text-slate-400">Data Verified:</span>{' '}
              <strong className="text-emerald-700 font-mono-numbers">25 Sep 2026 IST</strong>
            </div>
            <div>
              <span className="text-slate-400">Query Language:</span>{' '}
              <strong className="text-slate-800">English (India)</strong>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>BIS Source-Synchronized</span>
          </div>
        </div>
      </div>

      {/* Save Notification Toast */}
      {savedNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-xs font-semibold text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{savedNotice}</span>
        </div>
      )}

      {/* Top 5 Summary Cards as mandated by PDF */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Primary standards</span>
          <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers mt-1 block">2</span>
          <span className="text-[11px] text-[#123B63] font-medium">IS 7098 & IS 17048</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Allied standards</span>
          <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers mt-1 block">5</span>
          <span className="text-[11px] text-slate-500">Conductors & Wiring Code</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Tests identified</span>
          <span className="text-2xl font-bold text-[#0B2447] font-mono-numbers mt-1 block">4</span>
          <span className="text-[11px] text-purple-700 font-medium">750°C Fire continuity</span>
        </div>

        <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Certification checks</span>
          <span className="text-2xl font-bold text-amber-700 font-mono-numbers mt-1 block">2</span>
          <span className="text-[11px] text-amber-800 font-medium">Mandatory ISI Mark (QCO)</span>
        </div>

        <div className="bg-white border border-rose-200 bg-rose-50/40 rounded-xl p-4 shadow-sm">
          <span className="text-xs font-semibold text-rose-800 block">Warnings</span>
          <span className="text-2xl font-bold text-rose-700 font-mono-numbers mt-1 block">3</span>
          <span className="text-[11px] text-rose-700 font-medium">Outdated 2018 edition</span>
        </div>
      </div>

      {/* Main Results Tabs as mandated by PDF */}
      <div className="border-b border-[#D9E1EA] flex items-center gap-1 overflow-x-auto text-xs font-bold text-slate-600 bg-white px-4 pt-2 rounded-t-xl">
        {[
          { id: 'recommended', label: 'Recommended Standards' },
          { id: 'graph', label: 'Knowledge Graph' },
          { id: 'certification', label: 'Certification' },
          { id: 'missing', label: 'Missing Requirements' },
          { id: 'version', label: 'Version History' },
          { id: 'evidence', label: 'Evidence' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#123B63] text-[#0B2447] font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Recommended Standards Cards */}
      {activeTab === 'recommended' && (
        <div className="space-y-6">
          {/* Outdated Notice Banner */}
          <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <span className="font-bold text-amber-900">
                  Outdated Reference Detected:
                </span>{' '}
                <span className="text-amber-800">
                  Tender refers to legacy IS 7098 (Part 1):2018. We have automatically mapped to current 2025 revised edition below.
                </span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('version')}
              className="px-3 py-1 bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-semibold rounded-md shrink-0 whitespace-nowrap ml-3"
            >
              Inspect Timeline
            </button>
          </div>

          {/* Cards Loop */}
          <div className="space-y-5">
            {standards.map((std) => {
              const isFirst = std.id === 'std-primary-1';
              const isAdded = addedSpecs[std.id];
              const isExplOpen = showRankingExplanation[std.id];

              return (
                <div
                  key={std.id}
                  className={`bg-white border rounded-2xl p-6 shadow-sm space-y-4 transition-all ${
                    std.status === 'Superseded'
                      ? 'border-rose-200 bg-rose-50/20'
                      : isFirst
                      ? 'border-[#123B63] ring-1 ring-[#123B63]/20'
                      : 'border-[#D9E1EA]'
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        {std.isPrimary ? (
                          <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#123B63] text-white">
                            Primary Standard
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {std.categoryType === 'test'
                              ? 'Normative Test Method'
                              : std.categoryType === 'safety'
                              ? 'Installation Code'
                              : 'Allied Raw Material'}
                          </span>
                        )}

                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            std.status === 'Current'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {std.status}
                        </span>

                        <span className="text-xs font-mono-numbers font-bold text-[#123B63] bg-blue-50 px-2 py-0.5 rounded">
                          {std.relevance}% relevance
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-[#0B2447]">
                        {std.isNumber}
                      </h3>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {std.title}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">
                        {std.edition}
                      </span>
                    </div>
                  </div>

                  {/* Reason Callout as per PDF */}
                  <div className="p-3 bg-[#F8FAFC] border-l-4 border-[#123B63] rounded-r-lg text-xs leading-relaxed text-slate-700">
                    <span className="font-bold text-[#0B2447]">Matching Rationale:</span> {std.reason}
                  </div>

                  {/* Details Grid as per PDF: Scope match, Product category, Relevant properties, Current edition, Amendment status, Official source, Last verified date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs bg-[#F5F7FA] p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Scope Match
                      </span>
                      <span className="font-semibold text-slate-800">{std.scopeMatch}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Product Category
                      </span>
                      <span className="font-medium text-slate-800">{std.productCategory}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Amendment Status
                      </span>
                      <span className="font-medium text-slate-800">{std.amendmentStatus}</span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Official Source
                      </span>
                      <span className="font-medium text-slate-800 truncate block">
                        {std.officialSource}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Last Verified Date
                      </span>
                      <span className="font-mono-numbers text-emerald-700 font-semibold">
                        {std.lastVerifiedDate}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Statutory Mandate
                      </span>
                      <span className="font-medium text-[#123B63]">{std.normativeRelevance}</span>
                    </div>
                  </div>

                  {/* Relevant Properties Checklist */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Verified Technical Performance Parameters
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {std.relevantProperties.map((prop, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-medium bg-white border border-slate-200 px-2.5 py-1 rounded text-slate-700"
                        >
                          ✓ {prop}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Ranking Explanation Dropdown as mandated by PDF */}
                  {isFirst && (
                    <div className="border border-blue-200 bg-blue-50/50 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleRanking(std.id)}
                        className="w-full p-2.5 text-left text-xs font-bold text-[#123B63] flex items-center justify-between hover:bg-blue-100/50 transition-colors"
                      >
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                          <span>Why this standard is ranked first</span>
                        </div>
                        {isExplOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>

                      {isExplOpen && (
                        <div className="p-3 border-t border-blue-200 text-xs space-y-1.5 bg-white text-slate-700">
                          <div className="flex items-center justify-between">
                            <span>• Product match:</span>
                            <strong className="text-emerald-700">100% Exact match to low-voltage power cables</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Scope match:</span>
                            <strong className="text-emerald-700">Directly covers public building emergency circuits</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Performance match:</span>
                            <strong className="text-emerald-700">Full 180 min fire continuity tested at 750°C</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Current status:</span>
                            <strong className="text-emerald-700">Active consolidated Fourth Revision (2025)</strong>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>• Normative relevance:</span>
                            <strong className="text-[#123B63]">Statutory compliance under QCO Order S.O. 312(E)</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Buttons as per PDF: View details, View evidence, Add to specification, Compare, Flag for review */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab('evidence')}
                        className="px-3 py-1.5 bg-white border border-[#D9E1EA] hover:bg-slate-50 text-slate-700 font-semibold rounded-md flex items-center gap-1"
                      >
                        <FileCheck2 className="w-3.5 h-3.5 text-[#123B63]" />
                        <span>View Evidence</span>
                      </button>

                      <button
                        onClick={() => setActiveTab('version')}
                        className="px-3 py-1.5 bg-white border border-[#D9E1EA] hover:bg-slate-50 text-slate-700 font-semibold rounded-md flex items-center gap-1"
                      >
                        <GitCompare className="w-3.5 h-3.5 text-slate-500" />
                        <span>Compare</span>
                      </button>

                      <button
                        onClick={() => {
                          onSendForReview();
                        }}
                        className="px-3 py-1.5 text-slate-500 hover:text-amber-800 flex items-center gap-1"
                      >
                        <Flag className="w-3.5 h-3.5 text-slate-400 hover:text-amber-600" />
                        <span>Flag for review</span>
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleAddSpec(std.id)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                          : 'bg-[#123B63] hover:bg-[#0B2447] text-white shadow-xs'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isAdded ? 'Added to Specification' : 'Add to Specification'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Knowledge Graph (Screen 7) */}
      {activeTab === 'graph' && <KnowledgeGraphView />}

      {/* Tab 3: Certification & Compliance (Screen 8) */}
      {activeTab === 'certification' && <CertificationComplianceView />}

      {/* Tab 4: Missing Requirements (Screen 9) */}
      {activeTab === 'missing' && (
        <MissingRequirementsView
          onCompleteSpecification={() => setIsReportModalOpen(true)}
          onSendForReview={onSendForReview}
          onExportChecklist={() => setIsReportModalOpen(true)}
        />
      )}

      {/* Tab 5: Version History (Screen 10) */}
      {activeTab === 'version' && (
        <VersionHistoryView
          onReplaceInSpecification={() => {
            alert('Updated tender baseline to IS 7098 (Part 1):2025');
          }}
          onRequestReview={onSendForReview}
        />
      )}

      {/* Tab 6: Evidence Panel (Screen 11) */}
      {activeTab === 'evidence' && <EvidencePanel />}

      {/* Report Generation Modal (Screen 12) */}
      <ReportGenerationModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onShareWithReviewer={onSendForReview}
      />
    </div>
  );
};
