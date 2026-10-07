import React, { useState } from 'react';
import {
  Search,
  Bell,
  Sparkles,
  Shield,
  User,
  LogOut,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react';
import { AlertItem } from '../types';

interface HeaderProps {
  title: string;
  subtitle: string;
  alerts: AlertItem[];
  onOpenAlerts: () => void;
  onRunDemo: () => void;
  onLogout: () => void;
  onSearchQuery?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  alerts,
  onOpenAlerts,
  onRunDemo,
  onLogout,
  onSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const unreadAlerts = alerts.filter((a) => !a.isReviewed);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    if (onSearchQuery) onSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 h-18 bg-[#061826]/85 backdrop-blur-xl border-b border-[#0B5E75]/30 px-4 sm:px-6 flex items-center justify-between gap-4 select-none">
      {/* Page Title & Subtitle */}
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2.5">
          <h1 className="text-base sm:text-lg font-extrabold text-white tracking-wide truncate">
            {title}
          </h1>
          {/* Subtle AI Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#09263A] border border-[#0B5E75]/50 text-[10px] font-mono text-[#28D7D7]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#28D7D7] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#13A8A8]" />
            </span>
            <span>AI ENGINE ONLINE</span>
          </div>
        </div>
        <p className="text-xs text-slate-400 truncate hidden sm:block">
          {subtitle}
        </p>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Search Bar */}
        <div className="relative hidden md:block w-44 lg:w-56">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search lakes, zones, sensors..."
            value={searchVal}
            onChange={handleSearchChange}
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#09263A]/80 border border-[#0B5E75]/40 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-[#13A8A8] focus:ring-1 focus:ring-[#13A8A8]/30 transition-all"
          />
        </div>

        {/* Guided Demo Button */}
        <button
          onClick={onRunDemo}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#13A8A8]/20 hover:bg-[#13A8A8]/30 text-[#28D7D7] border border-[#13A8A8]/50 text-xs font-semibold transition-all hover:scale-102 shadow-sm"
        >
          <PlayCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Guided Demo</span>
        </button>

        {/* Notification Bell with Popup */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#09263A] border border-[#0B5E75]/40 text-slate-300 hover:text-white hover:border-[#13A8A8]/60 transition-all relative"
            title="System Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadAlerts.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-500 text-[#061826] font-bold text-[9px] flex items-center justify-center font-mono">
                {unreadAlerts.length}
              </span>
            )}
          </button>

          {/* Notification dropdown popover */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#061826] border border-[#0B5E75] shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#0B5E75]/30">
                <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                  Active Environmental Alerts ({unreadAlerts.length})
                </span>
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onOpenAlerts();
                  }}
                  className="text-[11px] text-[#28D7D7] hover:underline"
                >
                  View All Alerts
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto space-y-2">
                {alerts.slice(0, 4).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-2.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                      alert.severity === 'critical'
                        ? 'bg-red-950/40 border-red-800/50 text-red-200'
                        : alert.severity === 'warning'
                        ? 'bg-amber-950/40 border-amber-800/50 text-amber-200'
                        : 'bg-[#09263A] border-[#0B5E75]/30 text-slate-300'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-400" />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate">{alert.title}</div>
                      <div className="text-[11px] opacity-80 truncate">{alert.location} • {alert.timestamp}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/40 text-xs text-white hover:border-[#13A8A8]/60 transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#13A8A8] to-[#28D7D7] flex items-center justify-center text-[#061826] font-bold text-[10px]">
              AD
            </div>
            <span className="hidden sm:inline font-medium">Research Admin</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#061826] border border-[#0B5E75] shadow-2xl p-2 z-50">
              <div className="p-2 border-b border-[#0B5E75]/30">
                <div className="text-xs font-bold text-white">Pranay R. / Evaluator</div>
                <div className="text-[11px] text-[#28D7D7] font-mono">admin@aquaintelligence.ai</div>
                <div className="text-[10px] text-emerald-400 font-mono mt-0.5">Role: Chief Environmental Officer</div>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout();
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out / Landing</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
