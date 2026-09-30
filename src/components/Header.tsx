import React, { useState } from 'react';
import {
  Bell,
  Search,
  Building2,
  AlertTriangle,
  FileCheck2,
  FileClock,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { ScreenType, LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/standardsData';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  unreadAlertCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  language,
  unreadAlertCount,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const alerts = [
    {
      id: 1,
      title: 'Amendment detected in saved analysis',
      desc: 'IS 7098 (Part 1) updated to 2025 revision with halogen acid gas limits.',
      type: 'warning',
      time: '18 mins ago',
      actionScreen: 'new-analysis' as ScreenType,
    },
    {
      id: 2,
      title: 'Three tender specifications require expert review',
      desc: 'Surgical gloves & Structural steel items pending safety sign-off.',
      type: 'review',
      time: '1 hr ago',
      actionScreen: 'expert-review' as ScreenType,
    },
    {
      id: 3,
      title: 'Certification notification updated',
      desc: 'Electrical Wires and Cables QCO 2024 published in Gazette S.O. 312(E).',
      type: 'info',
      time: '3 hrs ago',
      actionScreen: 'compliance-centre' as ScreenType,
    },
  ];

  return (
    <header className="h-16 bg-white border-b border-[#D9E1EA] px-6 flex items-center justify-between z-20 shrink-0 sticky top-0">
      {/* Left: Greeting & Department Information */}
      <div className="flex items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-[#0B2447] tracking-tight">
              {t.welcome}
            </h1>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#64748B] font-medium">
              <Building2 className="w-3.5 h-3.5 text-[#123B63]" />
              {t.org}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Empowering technical tender compliance across Indian public procurement
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Search quick bar */}
        <button
          onClick={() => onNavigate('standards-explorer')}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 bg-[#F5F7FA] border border-[#D9E1EA] rounded-md hover:bg-slate-100 hover:text-slate-800 transition-colors w-52 text-left"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">Search IS standards...</span>
          <kbd className="ml-auto text-[10px] font-mono bg-white border border-slate-200 px-1 rounded text-slate-400">
            /
          </kbd>
        </button>

        {/* Quick Start Action Button (if not on new-analysis) */}
        {currentScreen !== 'new-analysis' && (
          <button
            onClick={() => onNavigate('new-analysis')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-[#123B63] hover:bg-[#0B2447] text-white transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>New Analysis</span>
          </button>
        )}

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
            className="relative p-2 rounded-md text-slate-600 hover:text-[#0B2447] hover:bg-slate-100 transition-colors focus:outline-none"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#DC2626] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#D9E1EA] rounded-lg shadow-lg z-50 overflow-hidden animate-in fade-in duration-150">
              <div className="px-4 py-3 bg-[#0B2447] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Standards & Tender Alerts
                  </span>
                </div>
                <span className="text-[11px] text-amber-300 font-mono-numbers">
                  {alerts.length} active
                </span>
              </div>

              <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate(alert.actionScreen);
                    }}
                    className="p-3 hover:bg-[#F5F7FA] cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      {alert.type === 'warning' && (
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      )}
                      {alert.type === 'review' && (
                        <FileClock className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      )}
                      {alert.type === 'info' && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-slate-800 line-clamp-1">
                          {alert.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                          {alert.desc}
                        </div>
                        <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400">
                          <span>{alert.time}</span>
                          <span className="text-[#123B63] font-medium flex items-center gap-0.5">
                            Take action <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-slate-50 border-t border-slate-200 text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('updates-alerts');
                  }}
                  className="text-xs font-medium text-[#123B63] hover:underline"
                >
                  View All Regulatory Circulars & Alerts
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Official Verifiability Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-medium text-[11px]">BIS Catalogue v2026.3</span>
        </div>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full bg-[#123B63] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              AS
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#D9E1EA] rounded-lg shadow-lg z-50 p-3">
              <div className="border-b border-slate-100 pb-2 mb-2">
                <div className="text-xs font-bold text-[#0B2447]">Ananya Sharma</div>
                <div className="text-[11px] text-[#64748B]">ananya.sharma@gov.in</div>
                <div className="mt-1 text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded inline-block">
                  Verified Procurement Officer
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-700">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('my-analyses');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2"
                >
                  <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
                  My Saved Analyses
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('administration');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-100 flex items-center gap-2"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  Department Governance
                </button>
                <div className="border-t border-slate-100 my-1" />
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onNavigate('login');
                  }}
                  className="w-full text-left px-2 py-1.5 rounded text-red-600 hover:bg-red-50"
                >
                  Sign Out / Switch Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
