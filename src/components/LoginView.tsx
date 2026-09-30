import React, { useState } from 'react';
import {
  Shield,
  ArrowRight,
  CheckCircle,
  FileCheck,
  Lock,
  Layers,
  Sparkles,
  KeyRound,
  FileText
} from 'lucide-react';
import { ScreenType } from '../types';

interface LoginViewProps {
  onLoginSuccess: () => void;
  onNavigate: (screen: ScreenType) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('ananya.sharma@pwd.delhi.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [orgType, setOrgType] = useState('Central / State PWD');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-between">
      {/* Top Banner / GovTech Disclaimer */}
      <div className="bg-[#0B2447] text-slate-300 text-xs py-2 px-6 border-b border-[#123B63] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold text-white">MANAK.AI</span>
          <span className="text-slate-400">·</span>
          <span>Indian Standards Intelligence & Procurement Specification Validation Platform</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-400">
          <span>Compliant with GFR 2017 Rule 144</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline text-amber-300">Smart India Hackathon Prototype</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-center gap-12">
        {/* Left Side: Brand Narrative & Workflow Illustration */}
        <div className="flex-1 max-w-xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#123B63] border border-[#1e4e7c] flex items-center justify-center relative shadow-md">
              <svg viewBox="0 0 32 32" className="w-7 h-7 text-white" fill="none" stroke="currentColor">
                <path
                  d="M6 24V9L16 19L26 9V24"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 16L15 19L21 13"
                  stroke="#16A34A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#F59E0B] ring-2 ring-white" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-[#16A34A] ring-2 ring-white" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0B2447] tracking-tight">MANAK.AI</div>
              <div className="text-xs text-[#123B63] font-semibold">
                Indian Standards Intelligence for Better Procurement
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2447] tracking-tight leading-tight mb-4">
            Make every tender <br className="hidden sm:inline" />
            <span className="text-[#123B63] underline decoration-[#F59E0B] decoration-4 underline-offset-4">
              technically complete.
            </span>
          </h1>

          <p className="text-base text-[#64748B] mb-8 leading-relaxed">
            Identify applicable Indian Standards, allied references, amendments, testing requirements,
            and certifications from a single procurement requirement.
          </p>

          {/* Visual Flow Illustration: Product Requirement -> Standards -> Verified Tender */}
          <div className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm mb-8">
            <div className="text-xs font-bold text-[#123B63] uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              Specification Validation Pipeline
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative">
              {/* Box 1 */}
              <div className="p-3 bg-[#F5F7FA] border border-slate-200 rounded-lg">
                <div className="text-[11px] font-semibold text-slate-500 uppercase">Input</div>
                <div className="text-xs font-bold text-[#0B2447] mt-0.5 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  Product Requirement
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Unstructured text, BoQ line item, or tender draft
                </p>
              </div>

              {/* Box 2 */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-[11px] font-semibold text-blue-700 uppercase">AI Reasoning</div>
                <div className="text-xs font-bold text-[#123B63] mt-0.5 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#123B63]" />
                  Indian Standards (BIS)
                </div>
                <p className="text-[11px] text-blue-700 mt-1">
                  Recommends primary, allied & test standards
                </p>
              </div>

              {/* Box 3 */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="text-[11px] font-semibold text-emerald-700 uppercase">Output</div>
                <div className="text-xs font-bold text-emerald-900 mt-0.5 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Verified Tender
                </div>
                <p className="text-[11px] text-emerald-700 mt-1">
                  Audit-ready checklist & QCO compliance
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-[#0B2447]">Core Motto:</span>
              <span className="italic text-[#123B63] font-medium">
                “AI recommends. Official evidence verifies.”
              </span>
            </div>
          </div>

          {/* Small Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="flex items-center gap-2 p-2.5 bg-white border border-[#D9E1EA] rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-xs font-semibold text-slate-800">BIS-source aligned</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border border-[#D9E1EA] rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-xs font-semibold text-slate-800">Evidence-backed</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border border-[#D9E1EA] rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-xs font-semibold text-slate-800">Version-aware</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 bg-white border border-[#D9E1EA] rounded-lg">
              <CheckCircle className="w-4 h-4 text-[#16A34A] shrink-0" />
              <span className="text-xs font-semibold text-slate-800">Multilingual</span>
            </div>
          </div>
        </div>

        {/* Right Side: Professional Government Officer Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-white border border-[#D9E1EA] rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="border-b border-[#D9E1EA] pb-4 mb-6">
              <h2 className="text-xl font-bold text-[#0B2447]">Officer Sign In</h2>
              <p className="text-xs text-[#64748B] mt-1">
                Access the standards intelligence and procurement verification workspace.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Organisation Department
                </label>
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                  className="w-full text-xs bg-[#F5F7FA] border border-[#D9E1EA] rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123B63]"
                >
                  <option>Central / State PWD (Public Works)</option>
                  <option>CPWD / NBCC / Rail Vikas Nigam</option>
                  <option>Public Sector Undertaking (PSU / BHEL / NTPC)</option>
                  <option>Government Hospital / Health Mission</option>
                  <option>Municipal Corporation / Jal Board</option>
                  <option>Standards Expert / Technical Committee</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Government Email / Organisation ID
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer.name@gov.in or org ID"
                  required
                  className="w-full text-xs bg-white border border-[#D9E1EA] rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123B63]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <a
                    href="#forgot"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('Self-service password reset is routed via departmental SSO.');
                    }}
                    className="text-xs text-[#123B63] hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-xs bg-white border border-[#D9E1EA] rounded-lg px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#123B63]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-[#123B63] hover:bg-[#0B2447] text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Enter Procurement Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200" />
                </div>
                <span className="relative bg-white px-2 text-[11px] text-slate-400 uppercase font-medium">
                  Or institutional SSO
                </span>
              </div>

              {/* Parichay / DigiLocker / Govt SSO Placeholder */}
              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full py-2 px-3 border border-[#D9E1EA] hover:border-slate-400 bg-[#F5F7FA] hover:bg-slate-100 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Sign in with MeriPehchaan / Parichay SSO</span>
              </button>

              <button
                type="button"
                onClick={onLoginSuccess}
                className="w-full py-2 px-3 border border-dashed border-slate-300 text-slate-600 text-xs rounded-lg hover:bg-slate-50 flex items-center justify-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5 text-blue-600" />
                <span>Verify with DigiLocker Institutional Identity</span>
              </button>
            </form>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>New department unit?</span>
              <button
                onClick={() => alert('Access request submitted to nodal system administrator.')}
                className="text-[#123B63] font-semibold hover:underline"
              >
                Request access
              </button>
            </div>

            {/* Security Note */}
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-[#123B63] shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-600 leading-normal">
                <span className="font-semibold text-slate-800">Security Note:</span> Your documents are
                processed in a controlled and auditable environment. MANAK.AI does not claim official BIS endorsement.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D9E1EA] py-4 px-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MANAK.AI Prototype — Smart India Hackathon & Public Procurement Innovation</span>
          <span>Aligned with Bureau of Indian Standards (BIS) Public Specifications Catalogue</span>
        </div>
      </footer>
    </div>
  );
};
