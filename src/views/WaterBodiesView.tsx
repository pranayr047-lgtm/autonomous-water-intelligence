import React, { useState } from 'react';
import { WaterBody } from '../types';
import {
  Waves,
  MapPin,
  Clock,
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  Activity,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Search,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { CircularGauge } from '../components/CircularGauge';
import { WaterQualityOverviewChart } from '../components/WaterQualityOverviewChart';

interface WaterBodiesViewProps {
  waterBodies: WaterBody[];
  selectedWaterBody: WaterBody;
  onSelectWaterBody: (wb: WaterBody) => void;
  onNavigateSection: (section: any) => void;
}

export const WaterBodiesView: React.FC<WaterBodiesViewProps> = ({
  waterBodies,
  selectedWaterBody,
  onSelectWaterBody,
  onNavigateSection,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'healthy' | 'moderate' | 'critical'>('all');

  const filteredBodies = waterBodies.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || b.qualityStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: WaterBody['qualityStatus']) => {
    switch (status) {
      case 'healthy':
        return {
          label: 'Healthy Equilibrium',
          classes: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50',
          icon: ShieldCheck,
        };
      case 'moderate':
        return {
          label: 'Moderate Risk',
          classes: 'bg-amber-950/60 text-amber-400 border-amber-800/50',
          icon: AlertTriangle,
        };
      case 'critical':
        return {
          label: 'Critical Risk',
          classes: 'bg-red-950/60 text-red-400 border-red-800/50',
          icon: AlertOctagon,
        };
      default:
        return {
          label: 'Monitoring',
          classes: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/50',
          icon: Activity,
        };
    }
  };

  const statusBadge = getStatusBadge(selectedWaterBody.qualityStatus);
  const StatusIcon = statusBadge.icon;

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Waves className="w-5 h-5 text-[#28D7D7]" />
            <span>Monitored Water Ecosystems</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Catchment stations, lake bodies, and municipal retention basins under continuous sensor supervision
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter water bodies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75]/50 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#13A8A8]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#061826] p-1 rounded-lg border border-[#0B5E75]/40 text-xs">
            {(['all', 'healthy', 'moderate', 'critical'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded font-medium capitalize transition-all ${
                  filterStatus === s
                    ? 'bg-[#13A8A8] text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Selection Carousel / Cards on Left, Detailed View on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List of Water Bodies */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-[#28D7D7] uppercase px-1">
            Select Site ({filteredBodies.length} Sites)
          </div>

          <div className="space-y-2.5 max-h-[720px] overflow-y-auto pr-1">
            {filteredBodies.map((body) => {
              const isSelected = selectedWaterBody.id === body.id;
              const badge = getStatusBadge(body.qualityStatus);

              return (
                <div
                  key={body.id}
                  onClick={() => onSelectWaterBody(body)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#0B5E75]/40 border-[#28D7D7] shadow-lg shadow-[#13A8A8]/15 ring-1 ring-[#28D7D7]/50'
                      : 'bg-[#09263A]/70 border-[#0B5E75]/30 hover:border-[#13A8A8]/60 hover:bg-[#09263A]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-wide">
                        {body.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-[#28D7D7]" />
                        <span>{body.location}</span>
                      </p>
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${badge.classes}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#0B5E75]/20 text-[11px] font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Turbidity</span>
                      <span className="font-bold text-white">{body.parameters.turbidity} NTU</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">DO (mg/L)</span>
                      <span className="font-bold text-emerald-400">{body.parameters.dissolvedOxygen}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Risk Index</span>
                      <span className={`font-bold ${body.riskScore > 75 ? 'text-red-400' : body.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {body.riskScore}/100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane: Section 15 Requirements */}
        <div className="lg:col-span-7 space-y-6">
          {/* Water Body Overview Card */}
          <div className="p-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-6">
            {/* Title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0B5E75]/30">
              <div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-xl font-extrabold text-white tracking-wide">
                    {selectedWaterBody.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium border ${statusBadge.classes}`}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span>{statusBadge.label}</span>
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1.5 font-mono">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#28D7D7]" />
                    {selectedWaterBody.location}
                  </span>
                  <span>•</span>
                  <span>Surface Area: <strong className="text-white">{selectedWaterBody.areaSqKm} km²</strong></span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Clock className="w-3 h-3" />
                    Updated {selectedWaterBody.lastUpdated}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Ecosystem Risk</span>
                <span className={`text-2xl font-extrabold font-mono ${selectedWaterBody.riskScore > 75 ? 'text-red-400' : selectedWaterBody.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {selectedWaterBody.riskScore}<span className="text-xs text-slate-400">/100</span>
                </span>
              </div>
            </div>

            {/* Current Parameters Grid (Section 15: pH, Temperature, Turbidity, TDS, Dissolved Oxygen) */}
            <div>
              <h4 className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider mb-3">
                Current Physicochemical Telemetry
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                <div className="p-3 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 flex flex-col items-center">
                  <CircularGauge value={selectedWaterBody.parameters.pH} min={0} max={14} size={78} label="pH Level" statusColor="#28D7D7" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Target: 6.5–8.5</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 flex flex-col items-center">
                  <CircularGauge value={selectedWaterBody.parameters.turbidity} min={0} max={40} size={78} unit="NTU" label="Turbidity" statusColor="#f59e0b" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Target: &lt;5 NTU</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 flex flex-col items-center">
                  <CircularGauge value={selectedWaterBody.parameters.tds} min={100} max={900} size={78} unit="ppm" label="TDS" statusColor="#ec4899" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Target: &lt;300</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 flex flex-col items-center">
                  <CircularGauge value={selectedWaterBody.parameters.temperature} min={15} max={35} size={78} unit="°C" label="Temperature" statusColor="#38bdf8" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Target: 20–28°C</span>
                </div>
                <div className="p-3 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 flex flex-col items-center">
                  <CircularGauge value={selectedWaterBody.parameters.dissolvedOxygen} min={0} max={12} size={78} unit="mg/L" label="Dissolved O2" statusColor="#10b981" />
                  <span className="text-[10px] font-mono text-slate-400 mt-1">Target: &gt;6.5</span>
                </div>
              </div>
            </div>

            {/* AI Assessment & Contributing Factors */}
            <div className="p-4 rounded-2xl bg-[#061826]/90 border border-[#13A8A8]/40 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#28D7D7]" />
                  <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    AI Ecological Assessment
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#28D7D7] bg-[#09263A] px-2 py-0.5 rounded border border-[#0B5E75]">
                  Confidence: {selectedWaterBody.aiConfidence}%
                </span>
              </div>

              <div className="text-sm font-bold text-white">
                Current Ecosystem Status:{' '}
                <span className={selectedWaterBody.riskScore > 75 ? 'text-red-400' : selectedWaterBody.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                  {statusBadge.label}
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedWaterBody.description} Optical surveillance detected{' '}
                <strong className="text-white">{selectedWaterBody.wasteObjectsCount} visible floating waste units</strong>. Turbidity reading of{' '}
                <strong className="text-white">{selectedWaterBody.parameters.turbidity} NTU</strong> indicates particulate suspension requiring observational tracking.
              </p>
            </div>

            {/* Recommended Action (Section 15) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#09263A] to-[#0B5E75]/40 border border-[#0B5E75] space-y-2">
              <div className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-[#28D7D7]" />
                Recommended Operational Action
              </div>
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                "{selectedWaterBody.recommendedAction}"
              </p>
              <div className="text-[10px] text-slate-400 font-mono italic pt-1">
                * Note: This is an AI-generated decision-support recommendation based on available project sensor data and optical observations.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateSection('waste-detection')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white font-semibold text-xs transition-all shadow-md"
              >
                <span>Launch Waste Detection on this Site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateSection('risk-analysis')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#061826] hover:bg-[#0B5E75]/40 text-[#28D7D7] border border-[#0B5E75] font-semibold text-xs transition-all"
              >
                <span>View Multi-Agent Risk Graph</span>
              </button>
            </div>
          </div>

          {/* Historical Trend Chart Component for this specific water body */}
          <WaterQualityOverviewChart waterBody={selectedWaterBody} />
        </div>
      </div>
    </div>
  );
};
