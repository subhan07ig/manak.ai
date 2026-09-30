import React, { useState } from 'react';
import {
  Sparkles,
  UploadCloud,
  FileCode,
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  Sliders,
  Shield,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Paperclip,
  Check,
  Calendar,
  User,
  HardDrive
} from 'lucide-react';
import { LanguageCode, DocumentMetadata } from '../types';
import { extractPdfMetadata, getDefaultDocumentMetadata } from '../utils/pdfMetadata';

interface NewAnalysisWorkspaceProps {
  onStartAnalysis: (params: {
    query: string;
    productCategory: string;
    intendedUse: string;
    material: string;
    applicationSector: string;
    requiredPerformance: string;
    locationEnv: string;
    quantity: string;
    existingISRef: string;
    fileName?: string;
    documentMetadata?: DocumentMetadata;
    options: {
      includeAllied: boolean;
      includeTestMethods: boolean;
      includeSafetyStandards: boolean;
      checkCertification: boolean;
      checkOutdatedReferences: boolean;
      generateTenderChecklist: boolean;
      searchOnlyCurrent: boolean;
    };
  }) => void;
  language: LanguageCode;
}

export const NewAnalysisWorkspace: React.FC<NewAnalysisWorkspaceProps> = ({
  onStartAnalysis,
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'product' | 'tender' | 'is_number' | 'natural'>('product');
  const [queryText, setQueryText] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [docMetadata, setDocMetadata] = useState<DocumentMetadata | null>(null);
  const [isExtractingMeta, setIsExtractingMeta] = useState(false);

  // Optional structured fields
  const [productCategory, setProductCategory] = useState('');
  const [intendedUse, setIntendedUse] = useState('');
  const [material, setMaterial] = useState('');
  const [applicationSector, setApplicationSector] = useState('');
  const [requiredPerformance, setRequiredPerformance] = useState('');
  const [locationEnv, setLocationEnv] = useState('');
  const [quantity, setQuantity] = useState('');
  const [existingISRef, setExistingISRef] = useState('');

  // Advanced options accordion
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [options, setOptions] = useState({
    includeAllied: true,
    includeTestMethods: true,
    includeSafetyStandards: true,
    checkCertification: true,
    checkOutdatedReferences: true,
    generateTenderChecklist: true,
    searchOnlyCurrent: true,
  });

  const SAMPLE_TEXT = 'Procurement of fire-resistant low-voltage electrical cables for a government hospital.';

  const handleUseSample = () => {
    setQueryText(SAMPLE_TEXT);
    setProductCategory('Electrical Equipment & Cables');
    setIntendedUse('Emergency power distribution in ICU & trauma building');
    setMaterial('Copper conductor, XLPE insulated, FRLS / HFFR sheath');
    setApplicationSector('Healthcare Infrastructure / Public Works');
    setRequiredPerformance('Fire-resistant (Circuit integrity under fire, low smoke)');
    setLocationEnv('Indoor conduit & cable tray in hospital premises');
    setQuantity('12,000 Running Metres');
    setExistingISRef('IS 7098 (Part 1)');
    setFileName('Tender_Schedule_Fire_Resistant_Cables_PWD_2026.pdf');
    setDocMetadata(getDefaultDocumentMetadata());
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsExtractingMeta(true);
    try {
      const meta = await extractPdfMetadata(file);
      setDocMetadata(meta);
    } catch (err) {
      console.error('Failed to extract PDF metadata:', err);
      setDocMetadata(getDefaultDocumentMetadata(file.name));
    } finally {
      setIsExtractingMeta(false);
    }
  };

  const handleRemoveFile = () => {
    setFileName(null);
    setDocMetadata(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryText.trim()) {
      handleUseSample();
      return;
    }
    const finalDocMetadata = docMetadata || getDefaultDocumentMetadata(fileName || undefined);

    onStartAnalysis({
      query: queryText,
      productCategory,
      intendedUse,
      material,
      applicationSector,
      requiredPerformance,
      locationEnv,
      quantity,
      existingISRef,
      fileName: fileName || finalDocMetadata.fileName,
      documentMetadata: finalDocMetadata,
      options,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Progress Indicator (5 Steps as per PDF: 1. Input -> 2. Understand -> 3. Recommend -> 4. Validate -> 5. Export) */}
      <div className="bg-white border border-[#D9E1EA] rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {[
            { step: 1, name: '1. Input', active: true, completed: false },
            { step: 2, name: '2. Understand', active: false, completed: false },
            { step: 3, name: '3. Recommend', active: false, completed: false },
            { step: 4, name: '4. Validate', active: false, completed: false },
            { step: 5, name: '5. Export', active: false, completed: false },
          ].map((item, index) => (
            <React.Fragment key={item.step}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono-numbers transition-colors ${
                    item.active
                      ? 'bg-[#123B63] text-white ring-4 ring-blue-100'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {item.step}
                </div>
                <span
                  className={`text-[11px] mt-1 font-medium ${
                    item.active ? 'text-[#0B2447] font-bold' : 'text-slate-500'
                  }`}
                >
                  {item.name}
                </span>
              </div>
              {index < 4 && (
                <div className="flex-1 h-0.5 mx-3 bg-slate-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Workspace Card */}
      <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-sm overflow-hidden">
        {/* Input Mode Tabs */}
        <div className="flex border-b border-[#D9E1EA] bg-[#F5F7FA] overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('product')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'product'
                ? 'border-[#F59E0B] text-[#0B2447] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4 text-[#123B63]" />
            <span>Product Description</span>
          </button>

          <button
            onClick={() => setActiveTab('tender')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'tender'
                ? 'border-[#F59E0B] text-[#0B2447] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <UploadCloud className="w-4 h-4 text-[#123B63]" />
            <span>Tender Document / BoQ</span>
          </button>

          <button
            onClick={() => setActiveTab('is_number')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'is_number'
                ? 'border-[#F59E0B] text-[#0B2447] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCode className="w-4 h-4 text-[#123B63]" />
            <span>Existing IS Number</span>
          </button>

          <button
            onClick={() => setActiveTab('natural')}
            className={`px-5 py-3.5 flex items-center gap-2 border-b-2 font-semibold transition-colors whitespace-nowrap ${
              activeTab === 'natural'
                ? 'border-[#F59E0B] text-[#0B2447] bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-4 h-4 text-[#123B63]" />
            <span>Natural Language Query</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {/* Main Input Textarea */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <label className="text-base font-bold text-[#0B2447] flex items-center gap-2">
                <span>What are you procuring?</span>
              </label>

              {/* Sample Query Button */}
              <button
                type="button"
                onClick={handleUseSample}
                className="text-xs font-semibold px-3 py-1 bg-amber-50 hover:bg-amber-100 text-[#D97706] border border-amber-300 rounded-md transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Use sample: Fire-resistant electrical cable</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                rows={4}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Example: Procurement of fire-resistant low-voltage electrical cables for a government hospital…"
                className="w-full text-sm text-[#172033] bg-white border border-[#D9E1EA] rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#123B63] focus:border-transparent leading-relaxed"
              />
            </div>
          </div>

          {/* Drag & Drop File Zone */}
          <div className="border-2 border-dashed border-[#D9E1EA] hover:border-[#123B63] rounded-xl p-5 bg-[#F5F7FA] text-center transition-colors">
            <div className="flex flex-col items-center">
              <UploadCloud className="w-8 h-8 text-[#123B63] mb-2" />
              <div className="text-xs font-semibold text-[#0B2447]">
                {fileName ? (
                  <span className="text-emerald-700 flex items-center gap-1.5 font-bold">
                    <Check className="w-4 h-4 text-emerald-600" /> Attached: {fileName}
                  </span>
                ) : (
                  <span>Upload supporting tender documents or Technical Schedule of Requirements (PDF, BoQ)</span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Accepted file formats: PDF, DOCX, XLSX, PNG, JPG (Auto-extracts file size, creation date, author & properties)
              </p>

              {isExtractingMeta && (
                <div className="mt-2 flex items-center gap-2 text-xs text-[#123B63] font-medium bg-blue-50 px-3 py-1 rounded-full border border-blue-200 animate-pulse">
                  <div className="w-3 h-3 border-2 border-[#123B63] border-t-transparent rounded-full animate-spin" />
                  <span>Extracting PDF metadata, creation date & author properties…</span>
                </div>
              )}

              {/* Extracted Metadata Preview Pill */}
              {docMetadata && !isExtractingMeta && (
                <div className="mt-3 w-full max-w-xl bg-white border border-emerald-200 rounded-lg p-3 text-left shadow-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800 pb-1.5 border-b border-emerald-100">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      Document Properties Extracted
                    </span>
                    <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded text-[10px]">
                      {docMetadata.pdfVersion || 'PDF Document'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2 text-[11px] text-slate-700">
                    <div className="flex items-center gap-1.5 truncate">
                      <HardDrive className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Size: <strong className="font-semibold text-slate-900">{docMetadata.fileSize}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">Date: <strong className="font-semibold text-slate-900">{docMetadata.dateCreated.split(',')[0]}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate" title={docMetadata.author}>
                        Author: <strong className="font-semibold text-slate-900">{docMetadata.author.split('-')[0].trim()}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center gap-2">
                <label className="cursor-pointer px-3 py-1.5 bg-white border border-[#D9E1EA] hover:bg-slate-50 text-xs font-medium text-[#123B63] rounded-md shadow-sm transition-colors">
                  <Paperclip className="w-3.5 h-3.5 inline mr-1" />
                  <span>Browse local document</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx,.xlsx,.png,.jpg"
                    onChange={handleFileUpload}
                  />
                </label>
                {fileName && (
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="text-xs text-red-600 hover:underline px-2 py-1"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Optional Structured Fields (Collapsible / Grid) */}
          <div className="border-t border-slate-200 pt-5">
            <div className="text-xs font-bold text-[#0B2447] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#123B63]" />
              <span>Optional Structured Procurement Fields (Improves Precision)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Product Category</label>
                <input
                  type="text"
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  placeholder="e.g. Electrical / Cables"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Intended Use</label>
                <input
                  type="text"
                  value={intendedUse}
                  onChange={(e) => setIntendedUse(e.target.value)}
                  placeholder="e.g. ICU fire survival circuit"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. Copper conductor, XLPE"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Application Sector</label>
                <input
                  type="text"
                  value={applicationSector}
                  onChange={(e) => setApplicationSector(e.target.value)}
                  placeholder="e.g. Healthcare / Public Works"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Required Performance</label>
                <input
                  type="text"
                  value={requiredPerformance}
                  onChange={(e) => setRequiredPerformance(e.target.value)}
                  placeholder="e.g. 180 min fire resistance"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Location / Environment</label>
                <input
                  type="text"
                  value={locationEnv}
                  onChange={(e) => setLocationEnv(e.target.value)}
                  placeholder="e.g. Hospital basement tray"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Estimated Quantity</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 12,000 Metres"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Existing IS Reference</label>
                <input
                  type="text"
                  value={existingISRef}
                  onChange={(e) => setExistingISRef(e.target.value)}
                  placeholder="e.g. IS 7098 or IS 694"
                  className="w-full bg-[#F5F7FA] border border-[#D9E1EA] rounded-md px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#123B63]"
                />
              </div>
            </div>
          </div>

          {/* Advanced Options Accordion */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-[#0B2447] transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#123B63]" />
                <span>Advanced Verification Parameters & Scope Rules</span>
              </div>
              {showAdvanced ? (
                <ChevronUp className="w-4 h-4 text-slate-500" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {showAdvanced && (
              <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeAllied}
                    onChange={(e) => setOptions({ ...options, includeAllied: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Include allied standards</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeTestMethods}
                    onChange={(e) => setOptions({ ...options, includeTestMethods: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Include test methods</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.includeSafetyStandards}
                    onChange={(e) => setOptions({ ...options, includeSafetyStandards: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Include safety standards</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.checkCertification}
                    onChange={(e) => setOptions({ ...options, checkCertification: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Check certification requirements (QCO/ISI)</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.checkOutdatedReferences}
                    onChange={(e) => setOptions({ ...options, checkOutdatedReferences: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Check outdated references</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.generateTenderChecklist}
                    onChange={(e) => setOptions({ ...options, generateTenderChecklist: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Generate tender checklist</span>
                </label>

                <label className="flex items-center gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={options.searchOnlyCurrent}
                    onChange={(e) => setOptions({ ...options, searchOnlyCurrent: e.target.checked })}
                    className="w-4 h-4 text-[#123B63] rounded border-slate-300 focus:ring-[#123B63]"
                  />
                  <span className="text-slate-800 font-medium">Search only current standards</span>
                </label>
              </div>
            )}
          </div>

          {/* Action Bar & Privacy Note */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] text-slate-500 max-w-md">
              <span className="font-semibold text-slate-700">Privacy & Audit Note:</span> MANAK.AI uses your input only to analyse the procurement requirement according to your organisation&apos;s access policy.
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#123B63] hover:bg-[#0B2447] text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>Analyse Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
