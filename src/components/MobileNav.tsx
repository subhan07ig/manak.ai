import React, { useState } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  UserCheck,
  Menu,
  X,
  Network,
  ShieldCheck,
  FileText,
  Settings,
  HelpCircle,
  Globe,
  Bell
} from 'lucide-react';
import { ScreenType, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/standardsData';

interface MobileNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  pendingReviewCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  pendingReviewCount,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleNav = (screen: ScreenType) => {
    onNavigate(screen);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* Pinned Bottom Navigation Bar for Mobile (<md) with 15% height constraint */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0B2447] border-t border-[#123B63] px-3 flex items-center justify-around z-40 text-slate-300">
        <button
          onClick={() => handleNav('dashboard')}
          className={`flex flex-col items-center justify-center text-[10px] ${
            currentScreen === 'dashboard' ? 'text-[#F59E0B] font-bold' : 'text-slate-300'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => handleNav('standards-explorer')}
          className={`flex flex-col items-center justify-center text-[10px] ${
            currentScreen === 'standards-explorer' ? 'text-[#F59E0B] font-bold' : 'text-slate-300'
          }`}
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>Search</span>
        </button>

        {/* Prominent New Analysis Action Button in Saffron */}
        <button
          onClick={() => handleNav('new-analysis')}
          className="flex flex-col items-center justify-center -mt-4"
        >
          <div className="w-12 h-12 rounded-full bg-[#F59E0B] text-[#0B2447] flex items-center justify-center shadow-lg border-2 border-white ring-2 ring-[#0B2447]">
            <PlusCircle className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="text-[10px] font-bold text-amber-300 mt-0.5">Analyse</span>
        </button>

        <button
          onClick={() => handleNav('expert-review')}
          className={`relative flex flex-col items-center justify-center text-[10px] ${
            currentScreen === 'expert-review' ? 'text-[#F59E0B] font-bold' : 'text-slate-300'
          }`}
        >
          <UserCheck className="w-4 h-4 mb-0.5" />
          <span>Review</span>
          {pendingReviewCount > 0 && (
            <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-amber-400" />
          )}
        </button>

        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center justify-center text-[10px] text-slate-300"
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span>Menu</span>
        </button>
      </div>

      {/* Full Mobile Drawer */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-xs bg-[#0B2447] text-white h-full p-5 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between border-b border-[#123B63] pb-3 mb-4">
                <span className="font-extrabold text-base tracking-tight">MANAK.AI Navigation</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <button
                  onClick={() => handleNav('dashboard')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNav('new-analysis')}
                  className="w-full text-left p-2 rounded bg-[#F59E0B] text-[#0B2447] font-bold"
                >
                  + Start New Analysis
                </button>
                <button
                  onClick={() => handleNav('my-analyses')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  My Saved Analyses
                </button>
                <button
                  onClick={() => handleNav('standards-explorer')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Standards Explorer
                </button>
                <button
                  onClick={() => handleNav('knowledge-graph')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Knowledge Graph
                </button>
                <button
                  onClick={() => handleNav('compliance-centre')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Compliance Centre (QCO)
                </button>
                <button
                  onClick={() => handleNav('updates-alerts')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Updates & Alerts
                </button>
                <button
                  onClick={() => handleNav('expert-review')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Expert Review Queue ({pendingReviewCount})
                </button>
                <button
                  onClick={() => handleNav('administration')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Administration
                </button>
                <button
                  onClick={() => handleNav('help-docs')}
                  className="w-full text-left p-2 rounded hover:bg-[#123B63]"
                >
                  Help & Documentation
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#123B63] space-y-3 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px] mb-1">Language</span>
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
                  className="w-full bg-[#123B63] text-white p-2 rounded border border-[#1e4e7c]"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="gu">ગુજરાતી</option>
                  <option value="mr">मराठी</option>
                  <option value="bn">বাংলা</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                </select>
              </div>

              <button
                onClick={() => handleNav('login')}
                className="w-full py-2 border border-slate-500 rounded text-slate-300 text-center"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
