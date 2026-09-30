import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Loader2,
  Circle,
  Database,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface AnalysisProcessingViewProps {
  onComplete: () => void;
}

export const AnalysisProcessingView: React.FC<AnalysisProcessingViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(2); // 0-indexed, start at step 3 (searching)
  const [candidateCount, setCandidateCount] = useState(6);
  const [verifiedCount, setVerifiedCount] = useState(2);

  const stages = [
    { title: 'Reading input document', detail: 'Parsing textual requirement and parameters' },
    { title: 'Extracting product and technical requirements', detail: 'Identified voltage grade, flame retardance, and healthcare context' },
    { title: 'Searching Indian Standards catalogue', detail: 'Querying electrotechnical ETD 09 repository' },
    { title: 'Checking normative and allied references', detail: 'Cross-referencing conductor (IS 8130) and installation code (IS 732)' },
    { title: 'Validating revisions and amendments', detail: 'Detecting 2025 revision superseding 2018 edition' },
    { title: 'Checking certification requirements', detail: 'Evaluating QCO 2024 gazette and BIS Scheme-I ISI Mark requirements' },
    { title: 'Generating evidence-backed recommendation', detail: 'Extracting verbatim scope clauses from official BIS standards' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < stages.length - 1) {
          const next = prev + 1;
          if (next === 3) {
            setCandidateCount(14);
            setVerifiedCount(7);
          } else if (next === 5) {
            setCandidateCount(18);
            setVerifiedCount(11);
          }
          return next;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-6 pb-12">
      {/* Central Brand Motto Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold rounded-full">
          <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Real-time BIS Retrieval Engine</span>
        </div>
        <h2 className="text-2xl font-extrabold text-[#0B2447] tracking-tight">
          Analysing your procurement requirement
        </h2>
        <p className="text-sm font-medium text-[#123B63] italic">
          “AI recommends. Official evidence verifies.”
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
        {/* Animated Visual Progress Timeline */}
        <div className="space-y-4">
          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStep;
            const isInProgress = idx === currentStep;
            const isPending = idx > currentStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 ${
                  isInProgress
                    ? 'bg-blue-50/80 border border-blue-200 scale-[1.01]'
                    : isCompleted
                    ? 'bg-slate-50/50'
                    : 'opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                  {isInProgress && <Loader2 className="w-5 h-5 text-[#123B63] animate-spin" />}
                  {isPending && <Circle className="w-5 h-5 text-slate-300" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold ${
                        isInProgress
                          ? 'text-[#0B2447]'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-500'
                      }`}
                    >
                      {idx + 1}. {stage.title}
                    </span>

                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800'
                          : isInProgress
                          ? 'bg-blue-100 text-[#123B63]'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {isCompleted ? 'Completed' : isInProgress ? 'In progress' : 'Pending'}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    {stage.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Status Card */}
        <div className="p-4 bg-[#F5F7FA] border border-[#D9E1EA] rounded-xl">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-[#123B63]" />
            <span>Catalogue Query Engine Status</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <div className="text-slate-500 text-[11px]">Sources checked</div>
              <div className="font-semibold text-slate-800 mt-0.5">BIS Catalogue</div>
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Candidate standards</div>
              <div className="font-bold text-[#0B2447] font-mono-numbers text-sm mt-0.5">
                {candidateCount} found
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Current standards</div>
              <div className="font-bold text-emerald-700 font-mono-numbers text-sm mt-0.5">
                {verifiedCount} verified
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[11px]">Possible matches</div>
              <div className="font-bold text-amber-700 font-mono-numbers text-sm mt-0.5">
                3 for review
              </div>
            </div>
          </div>
        </div>

        {/* Action Button once complete or bypass for quick testing */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {currentStep >= stages.length - 1
              ? 'Analysis completed with verified evidence.'
              : 'Verifying normative standards and Gazette Quality Orders...'}
          </span>

          <button
            onClick={onComplete}
            className="px-5 py-2.5 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow transition-all flex items-center gap-2"
          >
            <span>{currentStep >= stages.length - 1 ? 'View Recommendation Report' : 'Skip to Results'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
