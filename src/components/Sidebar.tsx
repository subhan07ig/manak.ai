import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  Search,
  Network,
  ShieldCheck,
  Bell,
  UserCheck,
  FileText,
  Settings,
  HelpCircle,
  Globe,
  ChevronDown
} from 'lucide-react';
import { ScreenType, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/standardsData';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  pendingReviewCount: number;
  unreadAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  language,
  onLanguageChange,
  pendingReviewCount,
  unreadAlertCount,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const navItems = [
    { id: 'dashboard' as ScreenType, label: t.dashboard, icon: LayoutDashboard },
    { id: 'new-analysis' as ScreenType, label: t.newAnalysis, icon: PlusCircle, isPrimaryAction: true },
    { id: 'my-analyses' as ScreenType, label: t.myAnalyses, icon: FolderKanban },
    { id: 'standards-explorer' as ScreenType, label: t.standardsExplorer, icon: Search },
    { id: 'knowledge-graph' as ScreenType, label: t.knowledgeGraph, icon: Network },
    { id: 'compliance-centre' as ScreenType, label: t.complianceCentre, icon: ShieldCheck },
    { id: 'updates-alerts' as ScreenType, label: t.updatesAlerts, icon: Bell, badge: unreadAlertCount },
    { id: 'expert-review' as ScreenType, label: t.expertReview, icon: UserCheck, badge: pendingReviewCount },
    { id: 'reports' as ScreenType, label: t.reports, icon: FileText },
    { id: 'administration' as ScreenType, label: t.administration, icon: Settings },
    { id: 'help-docs' as ScreenType, label: t.helpDocs, icon: HelpCircle },
  ];

  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'gu', name: 'ગુજરાતી' },
    { code: 'mr', name: 'मराठी' },
    { code: 'bn', name: 'বাংলা' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
  ];

  return (
    <aside className="w-64 bg-[#0B2447] text-white flex flex-col h-screen shrink-0 border-r border-[#123B63] select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#123B63]/60 flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          {/* Stylized Logo: Minimal "M" + standards document checkmark + subtle saffron and green dot */}
          <div className="w-10 h-10 rounded-lg bg-[#123B63] border border-[#1e4e7c] flex items-center justify-center relative shadow-sm">
            <svg viewBox="0 0 32 32" className="w-6 h-6 text-white" fill="none" stroke="currentColor">
              {/* Stylized M */}
              <path
                d="M6 24V9L16 19L26 9V24"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Checkmark inside */}
              <path
                d="M12 16L15 19L21 13"
                stroke="#16A34A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {/* Subtle Saffron & Green Accent Dots */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#F59E0B] ring-2 ring-[#0B2447]" />
            <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#16A34A] ring-2 ring-[#0B2447]" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg text-white group-hover:text-amber-300 transition-colors">
                MANAK.AI
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.2 bg-emerald-950/80 text-emerald-400 border border-emerald-700/50 rounded">
                GovTech
              </span>
            </div>
            <p className="text-[11px] text-slate-300 tracking-tight leading-tight line-clamp-1">
              Indian Standards Intelligence
            </p>
          </div>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;

          if (item.isPrimaryAction) {
            return (
              <div key={item.id} className="py-1">
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-semibold text-sm transition-all shadow-sm ${
                    isActive
                      ? 'bg-[#F59E0B] text-[#0B2447] ring-2 ring-white/30'
                      : 'bg-[#F59E0B] hover:bg-[#d97706] text-[#0B2447]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-black/15 px-1.5 py-0.5 rounded">
                    Workflow
                  </span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#123B63] text-white font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-[#123B63]/50'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Language Switcher */}
      <div className="px-3 py-2 border-t border-[#123B63]/60 bg-[#0B2447]">
        <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 px-1">
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-medium">Portal Language</span>
          </div>
          <span className="text-[10px] text-slate-400">8 Indian Languages</span>
        </div>
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
            className="w-full bg-[#123B63] text-xs text-white rounded-md px-2.5 py-1.5 border border-[#1e4e7c] focus:outline-none focus:ring-1 focus:ring-amber-400 appearance-none cursor-pointer pr-7"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-[#0B2447] text-white">
                {lang.name}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* User Profile Card at bottom */}
      <div className="p-3 border-t border-[#123B63]/80 bg-[#091d38]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#123B63] to-blue-500 border border-blue-400/40 flex items-center justify-center font-bold text-xs text-white shrink-0">
            AS
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">Ananya Sharma</div>
            <div className="text-[11px] text-amber-300 font-medium truncate">Procurement Officer</div>
            <div className="text-[10px] text-slate-400 truncate">Public Works Procurement Div.</div>
          </div>
        </div>

        <div className="mt-2.5 pt-2 border-t border-[#123B63]/40 flex items-center justify-between text-[10px] text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Connected to BIS Node
          </span>
          <button
            onClick={() => onNavigate('login')}
            className="hover:text-white underline underline-offset-2"
          >
            Sign out
          </button>
        </div>
      </div>
    </aside>
  );
};
