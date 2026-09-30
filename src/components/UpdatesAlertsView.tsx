import React from 'react';
import {
  Bell,
  AlertTriangle,
  FileClock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Scale
} from 'lucide-react';
import { ScreenType } from '../types';

interface UpdatesAlertsViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const UpdatesAlertsView: React.FC<UpdatesAlertsViewProps> = ({ onNavigate }) => {
  const alertsList = [
    {
      id: 1,
      title: 'Amendment detected in saved analysis: IS 7098 (Part 1)',
      desc: 'IS 7098 (Part 1) Fourth Revision 2025 replaces the 2018 edition. Added mandatory halogen acid gas limit (<0.5%) and harmonised with IS 10810 (Part 62) flame integrity test.',
      time: '18 minutes ago',
      category: 'Standard Amendment',
      type: 'warning',
      actionScreen: 'new-analysis' as ScreenType,
      actionText: 'Review Specification & Timeline',
    },
    {
      id: 2,
      title: 'Three tender specifications require expert committee sign-off',
      desc: 'Surgical gloves powder-free transition (IS 13422) and Seismic Zone IV Structural Steel toughness criteria flagged for senior engineer review.',
      time: '1 hour ago',
      category: 'Expert Review',
      type: 'review',
      actionScreen: 'expert-review' as ScreenType,
      actionText: 'Open Review Workspace',
    },
    {
      id: 3,
      title: 'Electrical Cables & Wires QCO 2024 Gazette Notification Active',
      desc: 'Ministry of Heavy Industries Gazette Notification S.O. 312(E) mandates mandatory BIS Scheme-I licensing for all low-voltage power cables in government procurement.',
      time: '3 hours ago',
      category: 'Statutory Order',
      type: 'statutory',
      actionScreen: 'compliance-centre' as ScreenType,
      actionText: 'View Gazette Compliance Matrix',
    },
    {
      id: 4,
      title: 'Steel Quality Control Order 2024 Scope Expanded',
      desc: 'Added hot-rolled sections and micro-alloyed bars under mandatory certification schedule with immediate effect.',
      time: 'Yesterday at 17:00 IST',
      category: 'Statutory Order',
      type: 'statutory',
      actionScreen: 'compliance-centre' as ScreenType,
      actionText: 'Inspect Order',
    },
    {
      id: 5,
      title: 'BIS Know Your Standard (KYS) Catalogue Synchronization Complete',
      desc: '52,180 standards re-indexed with latest reaffirmation records and committee minutes.',
      time: 'Today at 05:40 IST',
      category: 'System Sync',
      type: 'info',
      actionScreen: 'administration' as ScreenType,
      actionText: 'View Ingestion Health',
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="border-b border-slate-200 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0B2447]">
          Standards Updates & Regulatory Alerts
        </h2>
        <p className="text-xs text-[#64748B] mt-0.5">
          Real-time circulars, Gazette Quality Control Orders, and tender revision notifications affecting public procurement.
        </p>
      </div>

      <div className="space-y-3.5">
        {alertsList.map((alert) => (
          <div
            key={alert.id}
            className="bg-white border border-[#D9E1EA] rounded-xl p-5 shadow-sm space-y-3 hover:border-[#123B63] transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    alert.type === 'warning'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : alert.type === 'statutory'
                      ? 'bg-rose-100 text-rose-900 border border-rose-300'
                      : alert.type === 'review'
                      ? 'bg-blue-100 text-blue-900 border border-blue-300'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  }`}
                >
                  {alert.category}
                </span>
                <span className="text-[11px] text-slate-400 font-mono-numbers">
                  {alert.time}
                </span>
              </div>

              <button
                onClick={() => onNavigate(alert.actionScreen)}
                className="text-xs font-bold text-[#123B63] hover:text-[#0B2447] flex items-center gap-1 group"
              >
                <span>{alert.actionText}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#0B2447]">{alert.title}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
