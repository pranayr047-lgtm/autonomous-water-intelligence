import React, { useState } from 'react';
import { AlertItem } from '../types';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  Info,
  CheckCircle2,
  Filter,
  Search,
  Clock,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface AlertsViewProps {
  alerts: AlertItem[];
  onReviewAlert: (id: string) => void;
  onResolveAlert: (id: string) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  alerts,
  onReviewAlert,
  onResolveAlert,
}) => {
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'warning' | 'informational'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((a) => {
    const matchesSev = filterSeverity === 'all' || a.severity === filterSeverity;
    const matchesQuery =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSev && matchesQuery;
  });

  const getSeverityBadge = (severity: AlertItem['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: AlertOctagon,
          bg: 'bg-red-950/60 border-red-800/50 text-red-400',
          indicator: 'bg-red-500',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          bg: 'bg-amber-950/60 border-amber-800/50 text-amber-400',
          indicator: 'bg-amber-500',
        };
      default:
        return {
          icon: Info,
          bg: 'bg-cyan-950/60 border-cyan-800/50 text-cyan-400',
          indicator: 'bg-cyan-500',
        };
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Environmental Alert Management Center
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Real-time threshold breaches, visual debris surges, and prioritized remediation notices
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75]/50 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#13A8A8]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#061826] p-1 rounded-lg border border-[#0B5E75]/40 text-xs">
            {(['all', 'critical', 'warning', 'informational'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded font-medium capitalize transition-all ${
                  filterSeverity === sev
                    ? 'bg-[#13A8A8] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {sev === 'informational' ? 'info' : sev}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-[#09263A]/80 border border-[#0B5E75]/40 text-slate-400">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
            <div className="text-sm font-bold text-white">No Matching Alerts</div>
            <p className="text-xs text-slate-400 mt-1">All water body thresholds within nominal boundaries.</p>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            const badge = getSeverityBadge(alert.severity);
            const Icon = badge.icon;

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  alert.severity === 'critical'
                    ? 'bg-red-950/25 border-red-800/40 hover:border-red-600/60'
                    : alert.severity === 'warning'
                    ? 'bg-amber-950/25 border-amber-800/40 hover:border-amber-600/60'
                    : 'bg-[#09263A]/80 border-[#0B5E75]/40 hover:border-[#13A8A8]'
                }`}
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${badge.bg}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{alert.severity}</span>
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-wide truncate">
                      {alert.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {alert.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400 pt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#28D7D7]" />
                      {alert.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {alert.timestamp}
                    </span>
                    <span>•</span>
                    <span>Trigger: <strong className="text-slate-200">{alert.parameterImpacted || 'Multi-Parameter Variance'}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {!alert.isReviewed ? (
                    <button
                      onClick={() => onReviewAlert(alert.id)}
                      className="px-3 py-1.5 rounded-xl bg-[#061826] hover:bg-[#13A8A8] text-[#28D7D7] hover:text-white border border-[#0B5E75] text-xs font-semibold transition-all"
                    >
                      Review Alert
                    </button>
                  ) : (
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                      Reviewed
                    </span>
                  )}
                  <button
                    onClick={() => onResolveAlert(alert.id)}
                    className="px-3 py-1.5 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white text-xs font-bold transition-all shadow-sm"
                  >
                    Resolve & Close
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
