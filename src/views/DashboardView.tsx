import React, { useState, useEffect } from 'react';
import {
  WaterBody,
  AlertItem,
  WasteAnalysisRecord,
} from '../types';
import {
  Waves,
  ShieldCheck,
  ScanEye,
  Bell,
  Cpu,
  ClipboardCheck,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  MapPin,
  Clock,
  Sparkles,
  PlayCircle,
  Eye,
} from 'lucide-react';
import { WaterQualityOverviewChart } from '../components/WaterQualityOverviewChart';
import { WaterBodyMap } from '../components/WaterBodyMap';

interface DashboardViewProps {
  waterBodies: WaterBody[];
  alerts: AlertItem[];
  wasteDetections: WasteAnalysisRecord[];
  selectedWaterBody: WaterBody;
  onSelectWaterBody: (wb: WaterBody) => void;
  onNavigateSection: (section: any) => void;
  onRunDemo: () => void;
  onReviewAlert: (id: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  waterBodies,
  alerts,
  wasteDetections,
  selectedWaterBody,
  onSelectWaterBody,
  onNavigateSection,
  onRunDemo,
  onReviewAlert,
}) => {
  // Animated Counters for Section 12 Statistics
  const [counts, setCounts] = useState({
    monitored: 0,
    healthy: 0,
    detections: 0,
    alerts: 0,
    confidence: 0,
    inspections: 0,
  });

  useEffect(() => {
    // Target metrics specified in Section 12
    const target = {
      monitored: 12,
      healthy: 8,
      detections: 1284,
      alerts: 8,
      confidence: 91.4,
      inspections: 5,
    };

    let start = 0;
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start++;
      const progress = Math.min(start / steps, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setCounts({
        monitored: Math.round(ease * target.monitored),
        healthy: Math.round(ease * target.healthy),
        detections: Math.round(ease * target.detections),
        alerts: Math.round(ease * target.alerts),
        confidence: parseFloat((ease * target.confidence).toFixed(1)),
        inspections: Math.round(ease * target.inspections),
      });

      if (progress >= 1) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const metricCards = [
    {
      title: 'Monitored Water Bodies',
      value: counts.monitored.toString(),
      subtext: 'Urban & riparian catchments',
      icon: Waves,
      color: '#28D7D7',
      bgColor: 'from-[#0B5E75]/30 to-[#061826]',
      borderColor: 'border-[#13A8A8]/30',
      badge: 'Active Mesh',
    },
    {
      title: 'Healthy Water Bodies',
      value: counts.healthy.toString(),
      subtext: 'Nominal parameter index',
      icon: ShieldCheck,
      color: '#10b981',
      bgColor: 'from-emerald-950/30 to-[#061826]',
      borderColor: 'border-emerald-800/30',
      badge: '66.7% Clean',
    },
    {
      title: 'AI Waste Detections',
      value: counts.detections.toLocaleString(),
      subtext: 'Optical debris identified',
      icon: ScanEye,
      color: '#38bdf8',
      bgColor: 'from-[#0B5E75]/30 to-[#061826]',
      borderColor: 'border-[#13A8A8]/30',
      badge: 'YOLOv8 Edge',
    },
    {
      title: 'Active Alerts',
      value: counts.alerts < 10 ? `0${counts.alerts}` : counts.alerts.toString(),
      subtext: 'Requiring review & patrol',
      icon: Bell,
      color: '#f59e0b',
      bgColor: 'from-amber-950/30 to-[#061826]',
      borderColor: 'border-amber-800/30',
      badge: '2 Critical',
    },
    {
      title: 'AI Model Confidence',
      value: `${counts.confidence}%`,
      subtext: 'Ensemble cross-validation',
      icon: Cpu,
      color: '#28D7D7',
      bgColor: 'from-[#0B5E75]/30 to-[#061826]',
      borderColor: 'border-[#13A8A8]/30',
      badge: 'Multi-Agent',
    },
    {
      title: 'Inspections Required',
      value: counts.inspections < 10 ? `0${counts.inspections}` : counts.inspections.toString(),
      subtext: 'Prioritized patrol zones',
      icon: ClipboardCheck,
      color: '#ec4899',
      bgColor: 'from-pink-950/30 to-[#061826]',
      borderColor: 'border-pink-800/30',
      badge: 'Action SLA 6h',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Top Welcome & System Demonstration Banner */}
      <div className="rounded-3xl border border-[#0B5E75]/40 bg-gradient-to-r from-[#09263A]/90 via-[#0B5E75]/40 to-[#061826]/90 p-5 sm:p-6 backdrop-blur-xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40">
              AUTONOMOUS MONITORING SYSTEM
            </span>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Sonde Sonar Array Online
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Environmental Intelligence Overview
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time multi-agent decision support monitoring water quality parameters, optical waste accumulation, and ecological risk vectors across urban lakes and catchment basins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
          <button
            onClick={onRunDemo}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#13A8A8] to-[#0B5E75] hover:from-[#28D7D7] hover:to-[#13A8A8] hover:text-[#061826] text-white font-bold text-xs transition-all shadow-lg shadow-[#13A8A8]/20"
          >
            <PlayCircle className="w-4 h-4" />
            <span>Run System Demonstration</span>
          </button>
          <button
            onClick={() => onNavigateSection('waste-detection')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#09263A] hover:bg-[#0B5E75]/40 text-[#28D7D7] border border-[#0B5E75] text-xs font-semibold transition-all"
          >
            <ScanEye className="w-4 h-4" />
            <span>Analyze Water Image</span>
          </button>
        </div>
      </div>

      {/* Section 12: Statistics Cards with Animated Numbers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {metricCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl bg-gradient-to-b ${card.bgColor} border ${card.borderColor} backdrop-blur-md shadow-lg flex flex-col justify-between hover:scale-102 transition-all duration-300 group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${card.color}15`, color: card.color }}
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#061826]/80 text-slate-300 border border-white/5">
                    {card.badge}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold font-mono text-white tracking-tight">
                  {card.value}
                </div>
                <div className="text-[11px] font-semibold text-slate-200 mt-0.5">
                  {card.title}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 mt-2 truncate font-mono">
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Central Row: Geospatial Water Map + Interactive Quality Overview Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Geospatial Water Body Map (Section 14) */}
        <div className="lg:col-span-6 flex flex-col">
          <WaterBodyMap
            waterBodies={waterBodies}
            selectedBody={selectedWaterBody}
            onSelectBody={onSelectWaterBody}
            onInspectDetails={(body) => {
              onSelectWaterBody(body);
              onNavigateSection('water-bodies');
            }}
          />
        </div>

        {/* Water Quality Overview Chart (Section 13) */}
        <div className="lg:col-span-6 flex flex-col">
          <WaterQualityOverviewChart waterBody={selectedWaterBody} />
        </div>
      </div>

      {/* Bottom Grid: Recent Waste Detections + Active Environmental Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent AI Waste Detections List */}
        <div className="lg:col-span-7 rounded-2xl border border-[#0B5E75]/30 bg-[#09263A]/80 backdrop-blur-md p-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#0B5E75]/30">
            <div className="flex items-center gap-2">
              <ScanEye className="w-4 h-4 text-[#28D7D7]" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Recent AI Waste Detections
              </h3>
            </div>
            <button
              onClick={() => onNavigateSection('waste-detection')}
              className="text-xs text-[#28D7D7] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Computer Vision Studio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {wasteDetections.slice(0, 3).map((record) => (
              <div
                key={record.id}
                className="p-3.5 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/30 flex items-center justify-between gap-4 hover:border-[#13A8A8]/60 transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#051420] border border-[#0B5E75]/40 flex-shrink-0">
                    <img
                      src={record.imageUrl}
                      alt={record.location}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">
                      {record.location}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">
                      {record.observation}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 mt-1">
                      <span>{record.date}</span>
                      <span>•</span>
                      <span className="text-[#28D7D7] font-semibold">{record.objectsCount} Objects Detected</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end flex-shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {record.confidence}% Conf
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-medium bg-[#13A8A8]/20 text-[#28D7D7] mt-1 border border-[#13A8A8]/30">
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-[#0B5E75]/30 bg-[#09263A]/80 backdrop-blur-md p-5 shadow-xl">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#0B5E75]/30">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white tracking-wide">
                Environmental Action Alerts
              </h3>
            </div>
            <button
              onClick={() => onNavigateSection('alerts')}
              className="text-xs text-[#28D7D7] hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Alert Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className={`p-3.5 rounded-xl border text-xs transition-all ${
                  alert.severity === 'critical'
                    ? 'bg-red-950/40 border-red-800/40'
                    : alert.severity === 'warning'
                    ? 'bg-amber-950/40 border-amber-800/40'
                    : 'bg-[#061826]/80 border-[#0B5E75]/30'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <AlertTriangle className={`w-3.5 h-3.5 ${alert.severity === 'critical' ? 'text-red-400' : 'text-amber-400'}`} />
                    <span>{alert.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap">
                    {alert.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mb-2">
                  {alert.description}
                </p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-mono">{alert.location}</span>
                  {!alert.isReviewed ? (
                    <button
                      onClick={() => onReviewAlert(alert.id)}
                      className="px-2 py-1 rounded bg-[#13A8A8]/30 hover:bg-[#13A8A8] text-white font-medium border border-[#13A8A8]/50 transition-colors"
                    >
                      Mark as Reviewed
                    </button>
                  ) : (
                    <span className="text-emerald-400 font-mono">Reviewed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
