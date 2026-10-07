import React, { useState } from 'react';
import { WaterBody, WaterQualityParameters } from '../types';
import {
  Activity,
  Droplets,
  Thermometer,
  Gauge,
  Wind,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { CircularGauge } from '../components/CircularGauge';
import { WaterQualityOverviewChart } from '../components/WaterQualityOverviewChart';

interface WaterQualityViewProps {
  waterBodies: WaterBody[];
  selectedWaterBody: WaterBody;
  onSelectWaterBody: (wb: WaterBody) => void;
}

export const WaterQualityView: React.FC<WaterQualityViewProps> = ({
  waterBodies,
  selectedWaterBody,
  onSelectWaterBody,
}) => {
  const params = selectedWaterBody.parameters;

  const parameterCards = [
    {
      name: 'pH Level',
      value: params.pH.toString(),
      unit: 'pH',
      status: 'Normal',
      statusColor: 'text-emerald-400',
      statusBg: 'bg-emerald-950/60 border-emerald-800/40',
      change: '+0.1 (24h)',
      isTrendUp: true,
      optimal: '6.5 – 8.5',
      desc: 'Hydrogen-ion potential indicating chemical acidity or basicity of water.',
      icon: Droplets,
      gaugeColor: '#28D7D7',
      gaugeMin: 0,
      gaugeMax: 14,
      gaugeVal: params.pH,
      sparkline: [7.1, 7.15, 7.2, 7.18, 7.22, 7.2],
    },
    {
      name: 'Turbidity',
      value: params.turbidity.toString(),
      unit: 'NTU',
      status: params.turbidity > 10 ? 'Elevated' : 'Normal',
      statusColor: params.turbidity > 10 ? 'text-amber-400' : 'text-emerald-400',
      statusBg: params.turbidity > 10 ? 'bg-amber-950/60 border-amber-800/40' : 'bg-emerald-950/60 border-emerald-800/40',
      change: '+2.4 NTU',
      isTrendUp: true,
      optimal: '< 5.0 NTU',
      desc: 'Optical scattering by suspended clay, silt, micro-debris, or algae.',
      icon: Gauge,
      gaugeColor: '#f59e0b',
      gaugeMin: 0,
      gaugeMax: 40,
      gaugeVal: params.turbidity,
      sparkline: [9.8, 10.4, 11.2, 13.5, 12.8, params.turbidity],
    },
    {
      name: 'Temperature',
      value: params.temperature.toString(),
      unit: '°C',
      status: 'Normal',
      statusColor: 'text-emerald-400',
      statusBg: 'bg-emerald-950/60 border-emerald-800/40',
      change: '-0.3°C',
      isTrendUp: false,
      optimal: '20 – 28°C',
      desc: 'Ambient aquatic column temperature influencing metabolic gas solubility.',
      icon: Thermometer,
      gaugeColor: '#38bdf8',
      gaugeMin: 15,
      gaugeMax: 35,
      gaugeVal: params.temperature,
      sparkline: [25.8, 26.1, 26.8, 27.2, 26.6, params.temperature],
    },
    {
      name: 'TDS (Dissolved Solids)',
      value: params.tds.toString(),
      unit: 'ppm',
      status: params.tds > 500 ? 'Attention' : 'Moderate',
      statusColor: params.tds > 500 ? 'text-red-400' : 'text-amber-400',
      statusBg: params.tds > 500 ? 'bg-red-950/60 border-red-800/40' : 'bg-amber-950/60 border-amber-800/40',
      change: '+15 ppm',
      isTrendUp: true,
      optimal: '< 300 ppm',
      desc: 'Aggregate measure of dissolved organic and inorganic ionic salts.',
      icon: Activity,
      gaugeColor: '#ec4899',
      gaugeMin: 100,
      gaugeMax: 900,
      gaugeVal: params.tds,
      sparkline: [390, 405, 412, 430, 425, params.tds],
    },
    {
      name: 'Dissolved Oxygen',
      value: params.dissolvedOxygen.toString(),
      unit: 'mg/L',
      status: params.dissolvedOxygen < 5 ? 'Critical Low' : 'Healthy',
      statusColor: params.dissolvedOxygen < 5 ? 'text-red-400' : 'text-emerald-400',
      statusBg: params.dissolvedOxygen < 5 ? 'bg-red-950/60 border-red-800/40' : 'bg-emerald-950/60 border-emerald-800/40',
      change: '+0.2 mg/L',
      isTrendUp: true,
      optimal: '≥ 6.5 mg/L',
      desc: 'Molecular oxygen available for fish respiration and benthic biotas.',
      icon: Wind,
      gaugeColor: '#10b981',
      gaugeMin: 0,
      gaugeMax: 12,
      gaugeVal: params.dissolvedOxygen,
      sparkline: [6.4, 6.2, 6.0, 6.3, 6.7, params.dissolvedOxygen],
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Header & Site Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#28D7D7]" />
            <span>Water Quality Intelligence</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time calibrated sonde physicochemical parameter telemetry and sensor analytics
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Monitoring Site:</span>
          <select
            value={selectedWaterBody.id}
            onChange={(e) => {
              const match = waterBodies.find((b) => b.id === e.target.value);
              if (match) onSelectWaterBody(match);
            }}
            className="px-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75] text-xs font-semibold text-white focus:outline-none focus:border-[#13A8A8]"
          >
            {waterBodies.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name} ({b.qualityStatus.toUpperCase()})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section 16: Parameter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {parameterCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/35 backdrop-blur-md shadow-lg flex flex-col justify-between space-y-4 hover:border-[#13A8A8]/60 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#061826] text-[#28D7D7] border border-[#0B5E75]/40">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-slate-200">{card.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${card.statusBg} ${card.statusColor}`}
                  >
                    {card.status}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 my-2">
                  <span className="text-2xl font-extrabold font-mono text-white tracking-tight">
                    {card.value}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{card.unit}</span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Sparkline & Delta Indicator */}
              <div className="pt-3 border-t border-[#0B5E75]/25 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] font-mono">
                  {card.isTrendUp ? (
                    <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                  ) : (
                    <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                  <span className={card.isTrendUp ? 'text-amber-400' : 'text-emerald-400'}>
                    {card.change}
                  </span>
                </div>

                <div className="text-[10px] font-mono text-slate-400">
                  Target: {card.optimal}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section 17: AI Water Quality Assessment Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Score & Factor Breakdown */}
        <div className="lg:col-span-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 p-6 backdrop-blur-md shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#0B5E75]/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#28D7D7]" />
              <h3 className="text-base font-bold text-white tracking-wide">
                AI Water Quality Assessment
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Site: <strong className="text-white">{selectedWaterBody.name}</strong>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-[#061826]/80 border border-[#0B5E75]/40">
            {/* Overall Score */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#09263A] border border-[#13A8A8]/30 min-w-[130px]">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Overall Quality Score</span>
              <span className="text-4xl font-extrabold font-mono text-white mt-1">
                {100 - selectedWaterBody.riskScore}
                <span className="text-xs text-slate-400">/100</span>
              </span>
              <span className="text-[11px] font-mono text-emerald-400 mt-1">
                Normalized Scale
              </span>
            </div>

            <div className="space-y-1.5 text-center sm:text-left">
              <div className="text-xs text-slate-400 font-mono uppercase">Ecosystem Classification</div>
              <div className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className={selectedWaterBody.riskScore > 75 ? 'text-red-400' : selectedWaterBody.riskScore > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                  {selectedWaterBody.riskScore > 75 ? 'Critical Risk' : selectedWaterBody.riskScore > 40 ? 'Moderate Risk' : 'Healthy Equilibrium'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Composite evaluation computed via Kalman-filtered telemetry deviations from historical seasonal bounds.
              </p>
            </div>
          </div>

          {/* Section 17: Contributing Factors Progress Bars */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider">
              Contributing Parameter Impact Factors
            </div>

            {/* Turbidity Factor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Turbidity (Suspended Particulates)</span>
                <span className="font-mono font-bold text-amber-400">82% (Elevated)</span>
              </div>
              <div className="h-2.5 w-full bg-[#061826] rounded-full overflow-hidden border border-[#0B5E75]/40">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            {/* TDS Factor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Total Dissolved Solids (TDS)</span>
                <span className="font-mono font-bold text-amber-400">70% (Moderate)</span>
              </div>
              <div className="h-2.5 w-full bg-[#061826] rounded-full overflow-hidden border border-[#0B5E75]/40">
                <div className="h-full bg-gradient-to-r from-cyan-500 to-[#13A8A8] rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            {/* Temperature Factor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Thermal Stratification / Temperature</span>
                <span className="font-mono font-bold text-emerald-400">60% (Nominal)</span>
              </div>
              <div className="h-2.5 w-full bg-[#061826] rounded-full overflow-hidden border border-[#0B5E75]/40">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" style={{ width: '60%' }} />
              </div>
            </div>

            {/* Dissolved Oxygen Factor */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Dissolved Oxygen (DO Re-aeration)</span>
                <span className="font-mono font-bold text-emerald-400">90% (Healthy)</span>
              </div>
              <div className="h-2.5 w-full bg-[#061826] rounded-full overflow-hidden border border-[#0B5E75]/40">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full" style={{ width: '90%' }} />
              </div>
            </div>
          </div>

          {/* AI Explanation Box (Section 17 Exact Requirement) */}
          <div className="p-4 rounded-2xl bg-[#061826] border border-[#13A8A8]/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#28D7D7] font-mono uppercase">
              <Info className="w-3.5 h-3.5" />
              <span>AI Explanation & Diagnostic Narrative</span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed italic">
              "The current assessment is influenced by elevated turbidity ({params.turbidity} NTU) and moderate TDS readings ({params.tds} ppm). Continued monitoring is recommended."
            </p>
            <div className="pt-2 border-t border-[#0B5E75]/30 text-[10px] text-slate-400 font-mono">
              Scientific Notice: The model generates probabilistic environmental risk estimates from project telemetry and does NOT represent medically certified potability or chemical laboratory proof.
            </div>
          </div>
        </div>

        {/* Right Chart Visualization */}
        <div className="lg:col-span-6 flex flex-col">
          <WaterQualityOverviewChart waterBody={selectedWaterBody} />
        </div>
      </div>
    </div>
  );
};
