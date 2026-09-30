import React, { useState } from 'react';
import {
  ScreenType,
  LanguageCode,
  ExtractedRequirement,
  AnalysisRecord,
  StandardRecord,
} from './types';
import { getDefaultDocumentMetadata } from './utils/pdfMetadata';
import {
  INITIAL_ANALYSES,
  DEMO_STANDARDS_FOR_CABLE,
  TRANSLATIONS,
} from './data/standardsData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { LoginView } from './components/LoginView';
import { DashboardView } from './components/DashboardView';
import { NewAnalysisWorkspace } from './components/NewAnalysisWorkspace';
import { RequirementUnderstandingView } from './components/RequirementUnderstandingView';
import { AnalysisProcessingView } from './components/AnalysisProcessingView';
import { RecommendationResultsView } from './components/RecommendationResultsView';
import { KnowledgeGraphView } from './components/KnowledgeGraphView';
import { CertificationComplianceView } from './components/CertificationComplianceView';
import { MissingRequirementsView } from './components/MissingRequirementsView';
import { VersionHistoryView } from './components/VersionHistoryView';
import { EvidencePanel } from './components/EvidencePanel';
import { ExpertReviewWorkspace } from './components/ExpertReviewWorkspace';
import { StandardsExplorerView } from './components/StandardsExplorerView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { HelpDocumentationView } from './components/HelpDocumentationView';
import { MyAnalysesView } from './components/MyAnalysesView';
import { UpdatesAlertsView } from './components/UpdatesAlertsView';
import { ReportGenerationModal } from './components/ReportGenerationModal';

export default function App() {
  // Current high-level view
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Sub-stage within 'new-analysis' workflow:
  // 'input' -> 'understand' -> 'processing' -> 'results'
  const [analysisStage, setAnalysisStage] = useState<'input' | 'understand' | 'processing' | 'results'>('input');

  // List of saved analyses
  const [analysesList, setAnalysesList] = useState<AnalysisRecord[]>(INITIAL_ANALYSES);

  // Active extracted requirement
  const [extractedData, setExtractedData] = useState<ExtractedRequirement>({
    product: 'Electrical cable',
    productType: 'Low-voltage cable',
    performance: 'Fire-resistant',
    application: 'Government hospital',
    procurementContext: 'Public-sector tender',
    likelyRequirements: [
      'Electrical safety (IS 732)',
      'Fire-resistance testing (IS 10810 Pt 62)',
      'Installation requirements in healthcare occupancy',
      'Marking and labelling with CM/L licence',
      'BIS certification verification under QCO 2024',
    ],
    confidence: {
      product: 'High',
      productType: 'High',
      performance: 'High',
      application: 'High',
      procurementContext: 'High',
    },
    missingWarnings: [
      'Voltage range was not specified. Adding it may improve recommendation accuracy.',
    ],
    documentMetadata: getDefaultDocumentMetadata(),
  });

  const [pendingReviewCount, setPendingReviewCount] = useState(3);
  const [unreadAlertCount, setUnreadAlertCount] = useState(3);
  const [globalReportModalOpen, setGlobalReportModalOpen] = useState(false);

  // Flow handlers
  const handleStartAnalysis = (params: any) => {
    const documentMetadata = params.documentMetadata || getDefaultDocumentMetadata(params.fileName);

    // Populate or adapt extracted data based on query
    if (params.query.toLowerCase().includes('cable')) {
      setExtractedData({
        product: 'Electrical cable',
        productType: 'Low-voltage cable',
        performance: 'Fire-resistant',
        application: 'Government hospital',
        procurementContext: 'Public-sector tender',
        likelyRequirements: [
          'Electrical safety',
          'Fire-resistance testing',
          'Installation requirements',
          'Marking and labelling',
          'BIS certification verification',
        ],
        confidence: {
          product: 'High',
          productType: 'High',
          performance: 'High',
          application: 'High',
          procurementContext: 'High',
        },
        missingWarnings: [
          'Voltage range was not specified. Adding it may improve recommendation accuracy.',
        ],
        documentMetadata,
      });
    } else {
      setExtractedData({
        product: params.query.slice(0, 30),
        productType: params.productCategory || 'Industrial Equipment',
        performance: params.requiredPerformance || 'Standard Duty',
        application: params.applicationSector || 'Public Infrastructure',
        procurementContext: 'Public-sector tender',
        likelyRequirements: [
          'Quality Control Order adherence',
          'BIS Scheme-I licensing',
          'Material tensile & composition testing',
          'Acceptance testing schedule',
        ],
        confidence: {
          product: 'High',
          productType: 'Medium',
          performance: 'Medium',
          application: 'High',
          procurementContext: 'High',
        },
        missingWarnings: [],
        documentMetadata,
      });
    }
    setAnalysisStage('understand');
  };

  const handleConfirmUnderstanding = () => {
    setAnalysisStage('processing');
  };

  const handleProcessingComplete = () => {
    setAnalysisStage('results');
  };

  const handleSendForReview = () => {
    setPendingReviewCount((prev) => prev + 1);
    // Update active cable analysis status
    setAnalysesList((prev) =>
      prev.map((item) =>
        item.id === 'ana-001'
          ? { ...item, status: 'Pending expert approval' as const }
          : item
      )
    );
    alert(
      'Analysis has been escalated to the Expert Review Queue with status "Pending expert approval". Committee reviewers have been notified.'
    );
    setCurrentScreen('expert-review');
  };

  const handleSelectAnalysis = (analysis: AnalysisRecord) => {
    setCurrentScreen('new-analysis');
    setAnalysisStage('results');
  };

  const handleAddToActiveAnalysis = (std: StandardRecord) => {
    // Notify user
    alert(`Standard ${std.isNumber} added to current procurement specification checklist.`);
  };

  // If user is on login screen, render standalone login page
  if (currentScreen === 'login') {
    return (
      <LoginView
        onLoginSuccess={() => setCurrentScreen('dashboard')}
        onNavigate={setCurrentScreen}
      />
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F5F7FA]">
      {/* Persistent Left Sidebar on Desktop */}
      <div className="hidden md:flex shrink-0">
        <Sidebar
          currentScreen={currentScreen}
          onNavigate={(screen) => {
            setCurrentScreen(screen);
            if (screen === 'new-analysis' && analysisStage === 'results') {
              // keep as results or allow restart
            }
          }}
          language={language}
          onLanguageChange={setLanguage}
          pendingReviewCount={pendingReviewCount}
          unreadAlertCount={unreadAlertCount}
        />
      </div>

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Header */}
        <Header
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          language={language}
          onLanguageChange={setLanguage}
          unreadAlertCount={unreadAlertCount}
        />

        {/* Viewport Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Dashboard (Screen 2) */}
          {currentScreen === 'dashboard' && (
            <DashboardView
              onNavigate={setCurrentScreen}
              analyses={analysesList}
              onSelectAnalysis={handleSelectAnalysis}
            />
          )}

          {/* New Analysis Workflow (Screens 3, 4, 5, 6) */}
          {currentScreen === 'new-analysis' && (
            <>
              {analysisStage === 'input' && (
                <NewAnalysisWorkspace
                  onStartAnalysis={handleStartAnalysis}
                  language={language}
                />
              )}

              {analysisStage === 'understand' && (
                <RequirementUnderstandingView
                  extracted={extractedData}
                  onConfirm={handleConfirmUnderstanding}
                  onEdit={setExtractedData}
                  onBack={() => setAnalysisStage('input')}
                />
              )}

              {analysisStage === 'processing' && (
                <AnalysisProcessingView onComplete={handleProcessingComplete} />
              )}

              {analysisStage === 'results' && (
                <RecommendationResultsView
                  onNavigate={setCurrentScreen}
                  onSendForReview={handleSendForReview}
                />
              )}
            </>
          )}

          {/* My Analyses (Screen 2 / Navigation) */}
          {currentScreen === 'my-analyses' && (
            <MyAnalysesView
              analyses={analysesList}
              onSelectAnalysis={handleSelectAnalysis}
              onNavigate={setCurrentScreen}
            />
          )}

          {/* Standards Explorer (Screen 14) */}
          {currentScreen === 'standards-explorer' && (
            <StandardsExplorerView
              onNavigate={setCurrentScreen}
              onAddToAnalysis={handleAddToActiveAnalysis}
            />
          )}

          {/* Knowledge Graph (Screen 7) */}
          {currentScreen === 'knowledge-graph' && (
            <div className="max-w-7xl mx-auto space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-[#0B2447]">
                  Related Standards Knowledge Graph
                </h2>
                <p className="text-xs text-[#64748B]">
                  Interactive visualization of normative links, test methods, amendments, and supersessions.
                </p>
              </div>
              <KnowledgeGraphView />
            </div>
          )}

          {/* Compliance Centre (Screen 8) */}
          {currentScreen === 'compliance-centre' && (
            <div className="max-w-7xl mx-auto">
              <CertificationComplianceView />
            </div>
          )}

          {/* Updates & Alerts */}
          {currentScreen === 'updates-alerts' && (
            <UpdatesAlertsView onNavigate={setCurrentScreen} />
          )}

          {/* Expert Review Workspace (Screen 13) */}
          {currentScreen === 'expert-review' && <ExpertReviewWorkspace />}

          {/* Reports (Screen 12) */}
          {currentScreen === 'reports' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="border-b border-slate-200 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
                    Tender Documentation & Reports
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Generate and download tender-ready technical schedules, audit certifications, and compliance dossiers.
                  </p>
                </div>
                <button
                  onClick={() => setGlobalReportModalOpen(true)}
                  className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow-sm"
                >
                  + Generate New Report
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-[#0B2447]">
                    Fire-Resistant Cables Specification Dossier
                  </h3>
                  <p className="text-xs text-slate-600">
                    Compiled for Public Works Procurement Division · 4 pages · PDF & DOCX
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setGlobalReportModalOpen(true)}
                      className="px-3 py-1.5 bg-[#F5F7FA] hover:bg-slate-100 text-xs font-semibold text-[#123B63] rounded border border-[#D9E1EA]"
                    >
                      Inspect / Configure
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
                  <h3 className="text-sm font-bold text-[#0B2447]">
                    GFR 2017 Rule 144 Technical Compliance Audit Summary
                  </h3>
                  <p className="text-xs text-slate-600">
                    Departmental quarterly audit clearance · 12 tenders verified · PDF
                  </p>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setGlobalReportModalOpen(true)}
                      className="px-3 py-1.5 bg-[#F5F7FA] hover:bg-slate-100 text-xs font-semibold text-[#123B63] rounded border border-[#D9E1EA]"
                    >
                      Inspect / Configure
                    </button>
                  </div>
                </div>
              </div>

              <ReportGenerationModal
                isOpen={globalReportModalOpen}
                onClose={() => setGlobalReportModalOpen(false)}
                onShareWithReviewer={handleSendForReview}
              />
            </div>
          )}

          {/* Administration (Screen 15) */}
          {currentScreen === 'administration' && <AdminDashboardView />}

          {/* Help & Documentation */}
          {currentScreen === 'help-docs' && <HelpDocumentationView />}
        </main>

        {/* Mobile Bottom Navigation (<md) */}
        <MobileNav
          currentScreen={currentScreen}
          onNavigate={setCurrentScreen}
          language={language}
          onLanguageChange={setLanguage}
          pendingReviewCount={pendingReviewCount}
        />
      </div>
    </div>
  );
}
