import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PlusCircle,
  FileCheck,
  Send,
  Download,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Layers,
  Wrench,
  FlaskConical,
  FileSpreadsheet
} from 'lucide-react';
import { MISSING_REQUIREMENTS } from '../data/standardsData';
import { MissingRequirementItem } from '../types';

interface MissingRequirementsViewProps {
  onCompleteSpecification: () => void;
  onSendForReview: () => void;
  onExportChecklist: () => void;
}

export const MissingRequirementsView: React.FC<MissingRequirementsViewProps> = ({
  onCompleteSpecification,
  onSendForReview,
  onExportChecklist,
}) => {
  const [items, setItems] = useState<MissingRequirementItem[]>(MISSING_REQUIREMENTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  // Calculate completeness percentage based on items completed
  const completeCount = items.filter(
    (i) => i.status === 'Complete' || i.status === 'Required' || !!i.value
  ).length;
  const percentage = Math.round((completeCount / items.length) * 100);

  const categories: Array<MissingRequirementItem['category']> = [
    'Product identity',
    'Technical parameters',
    'Testing',
    'Procurement and compliance',
  ];

  const getStatusIcon = (status: MissingRequirementItem['status']) => {
    switch (status) {
      case 'Complete':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'Required':
        return <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />;
      case 'Partial':
        return <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />;
      case 'Needs confirmation':
        return <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'Missing':
        return <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />;
      case 'Not specified':
        return <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />;
    }
  };

  const getStatusBadge = (status: MissingRequirementItem['status']) => {
    switch (status) {
      case 'Complete':
        return (
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Complete
          </span>
        );
      case 'Required':
        return (
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
            Required
          </span>
        );
      case 'Partial':
        return (
          <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Partial
          </span>
        );
      case 'Needs confirmation':
        return (
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
            Needs confirmation
          </span>
        );
      case 'Missing':
        return (
          <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Missing
          </span>
        );
      case 'Not specified':
        return (
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
            Not specified
          </span>
        );
    }
  };

  const handleSaveValue = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            value: inputValue,
            status: 'Complete',
          };
        }
        return item;
      })
    );
    setEditingId(null);
    setInputValue('');
  };

  const handleAddAllRecommended = () => {
    setItems((prev) =>
      prev.map((item) => {
        if (!item.value) {
          let defaultVal = 'BIS Standard Specified';
          if (item.name.includes('Voltage')) defaultVal = '1100 V (1.1 kV) Grade';
          if (item.name.includes('Model')) defaultVal = 'Class FRLS-H Zero Halogen';
          if (item.name.includes('Dimensions')) defaultVal = '4 Core x 25 sq.mm Stranded';
          if (item.name.includes('Sampling')) defaultVal = 'IS 2500 (Part 1) Level II';
          if (item.name.includes('Marking')) defaultVal = 'Continuous embossed metre marking with CM/L licence';
          if (item.name.includes('Inspection')) defaultVal = 'Joint pre-dispatch inspection by RITES / CPWD';
          return {
            ...item,
            value: defaultVal,
            status: 'Complete',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl font-bold text-[#0B2447]">
          Specification Completeness Check
        </h2>
        <p className="text-xs text-[#64748B] mt-1">
          Identifies missing engineering parameters, test schedules, and compliance criteria required to eliminate tender ambiguity.
        </p>
      </div>

      {/* Completeness Progress Bar (72% complete as per PDF) */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider">
              Tender Technical Robustness Score
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {completeCount} of {items.length} key procurement parameters verified
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-[#123B63] font-mono-numbers">
              {percentage}%
            </span>
            <span className="text-xs text-slate-500 ml-1">complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-[#123B63] to-emerald-600 transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>72% Baseline (Prompt Extraction)</span>
          <span className="text-emerald-700 font-semibold">
            Goal: 100% Audit-Proof Tender Specification
          </span>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={handleAddAllRecommended}
          className="px-4 py-2 bg-[#F59E0B] hover:bg-[#d97706] text-[#0B2447] text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Add All Recommended Requirements</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={onExportChecklist}
            className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Checklist</span>
          </button>

          <button
            onClick={onSendForReview}
            className="px-3.5 py-2 bg-white border border-[#123B63] text-[#123B63] hover:bg-blue-50 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send for Expert Review</span>
          </button>

          <button
            onClick={onCompleteSpecification}
            className="px-4 py-2 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-lg shadow transition-colors flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Complete Specification</span>
          </button>
        </div>
      </div>

      {/* Categorized Checklist as per PDF */}
      <div className="space-y-5">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat);
          return (
            <div key={cat} className="bg-white border border-[#D9E1EA] rounded-xl overflow-hidden shadow-sm">
              <div className="p-3.5 bg-[#F5F7FA] border-b border-[#D9E1EA] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B2447] uppercase tracking-wider flex items-center gap-2">
                  {cat === 'Product identity' && <Layers className="w-4 h-4 text-[#123B63]" />}
                  {cat === 'Technical parameters' && <Wrench className="w-4 h-4 text-[#123B63]" />}
                  {cat === 'Testing' && <FlaskConical className="w-4 h-4 text-[#123B63]" />}
                  {cat === 'Procurement and compliance' && <FileSpreadsheet className="w-4 h-4 text-[#123B63]" />}
                  <span>{cat}</span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono-numbers">
                  {catItems.filter((i) => i.status === 'Complete' || i.value).length}/{catItems.length} verified
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {catItems.map((item) => (
                  <div key={item.id} className="p-4 hover:bg-slate-50/70 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <span className="text-xs font-bold text-[#0B2447]">{item.name}</span>
                          {getStatusBadge(item.status)}
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          <span className="font-semibold text-slate-800">Why it matters:</span> {item.whyItMatters}
                        </p>

                        <div className="flex items-center gap-2 text-[11px] text-[#123B63] font-medium pt-0.5">
                          <span className="text-slate-400">Governing reference:</span>
                          <span className="bg-slate-100 px-1.5 py-0.2 rounded font-mono">
                            {item.sourceOrStandard}
                          </span>
                        </div>

                        {item.value && (
                          <div className="mt-2 text-xs bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center justify-between">
                            <span>
                              <span className="font-semibold">Specified parameter value:</span> {item.value}
                            </span>
                            <button
                              onClick={() => {
                                setEditingId(item.id);
                                setInputValue(item.value || '');
                              }}
                              className="text-[11px] font-semibold text-emerald-800 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Add Value Button or Input Field */}
                      <div className="shrink-0 flex items-center gap-2">
                        {editingId === item.id ? (
                          <div className="flex items-center gap-1.5">
                            <input
                              type="text"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              placeholder="Enter specification value..."
                              className="text-xs border border-[#123B63] rounded px-2.5 py-1.5 bg-white focus:outline-none w-48"
                            />
                            <button
                              onClick={() => handleSaveValue(item.id)}
                              className="px-2.5 py-1.5 bg-[#123B63] text-white text-xs font-semibold rounded"
                            >
                              Apply
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-2 py-1.5 text-xs text-slate-500 hover:text-slate-800"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : !item.value ? (
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setInputValue('');
                            }}
                            className="px-3 py-1.5 bg-[#F5F7FA] hover:bg-slate-100 text-[#123B63] border border-[#D9E1EA] hover:border-[#123B63] text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
                          >
                            <PlusCircle className="w-3.5 h-3.5" />
                            <span>Add value</span>
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
