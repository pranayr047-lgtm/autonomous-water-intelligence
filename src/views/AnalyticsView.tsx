import React, { useState } from 'react';
import { WaterBody } from '../types';
import {
  BarChart2,
  TrendingUp,
  Calendar,
  Layers,
  Sparkles,
  ArrowUpRight,
  Info,
  Download,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface AnalyticsViewProps {
  waterBodies: WaterBody[];
  selectedWaterBody: WaterBody;
}

// 6-Month longitudinal telemetry dataset
const LONGITUDINAL_DATA = [
  { month: 'Apr', turbidity: 8.4, tds: 340, do: 7.2, wasteCount: 14, rainfall: 22 },
  { month: 'May', turbidity: 10.2, tds: 390, do: 6.8, wasteCount: 28, rainfall: 45 },
  { month: 'Jun', turbidity: 16.8, tds: 480, do: 5.4, wasteCount: 52, rainfall: 140 },
  { month: 'Jul', turbidity: 22.4, tds: 520, do: 4.8, wasteCount: 68, rainfall: 210 },
  { month: 'Aug', turbidity: 18.2, tds: 460, do: 5.6, wasteCount: 44, rainfall: 175 },
  { month: 'Sep', turbidity: 12.0, tds: 420, do: 6.8, wasteCount: 22, rainfall: 65 },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  waterBodies,
  selectedWaterBody,
}) => {
  const [activeMetric, setActiveMetric] = useState<'turbidity' | 'tds' | 'do' | 'waste'>('turbidity');

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#28D7D7]" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Longitudinal Analytics & Trend Intelligence
            </h2>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Historical environmental correlations, seasonal hydrological shifts, and waste accumulation vectors
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Timeframe:</span>
          <span className="px-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75] text-[#28D7D7] font-bold">
            Last 6 Months (Monsoon/Post-Monsoon)
          </span>
        </div>
      </div>

      {/* Key Metric Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: 'turbidity', label: 'Turbidity (NTU)', peak: '22.4 NTU (Jul)', color: '#f59e0b' },
          { id: 'tds', label: 'Total Dissolved Solids', peak: '520 ppm (Jul)', color: '#ec4899' },
          { id: 'do', label: 'Dissolved Oxygen', peak: '7.2 mg/L (Apr)', color: '#10b981' },
          { id: 'waste', label: 'Optical Waste Units', peak: '68 units (Jul)', color: '#28D7D7' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveMetric(tab.id as any)}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeMetric === tab.id
                ? 'bg-[#0B5E75]/50 border-[#28D7D7] shadow-lg shadow-[#13A8A8]/20 ring-1 ring-[#28D7D7]'
                : 'bg-[#09263A]/80 border-[#0B5E75]/30 hover:border-[#13A8A8]'
            }`}
          >
            <span className="text-[11px] font-mono text-slate-400 block">{tab.label}</span>
            <span className="text-lg font-bold text-white mt-1 block">{tab.peak}</span>
            <span className="text-[10px] font-mono text-[#28D7D7] mt-1 flex items-center gap-1">
              <span>View Trend Line</span>
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </button>
        ))}
      </div>

      {/* Main Longitudinal Chart */}
      <div className="rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 p-6 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#0B5E75]/30">
          <div>
            <span className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
              Longitudinal Observation Curve
            </span>
            <h3 className="text-base font-bold text-white mt-0.5">
              Seasonal Environmental Parameter Dynamics ({selectedWaterBody.name})
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Source: Sonde Continuous Array #01-#04
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={LONGITUDINAL_DATA}>
              <defs>
                <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#13A8A8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#13A8A8" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="rainfallGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#0B5E75" opacity={0.3} />
              <XAxis dataKey="month" stroke="#667786" fontSize={11} fontVariant="mono" />
              <YAxis yAxisId="left" stroke="#667786" fontSize={11} fontVariant="mono" />
              <YAxis yAxisId="right" orientation="right" stroke="#38bdf8" fontSize={11} fontVariant="mono" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#061826',
                  borderColor: '#13A8A8',
                  borderRadius: '0.75rem',
                  fontSize: '0.75rem',
                }}
              />
              <Legend />
              {activeMetric === 'turbidity' && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="turbidity"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fill="url(#metricGrad)"
                  name="Turbidity (NTU)"
                />
              )}
              {activeMetric === 'tds' && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="tds"
                  stroke="#ec4899"
                  strokeWidth={3}
                  fill="url(#metricGrad)"
                  name="TDS (ppm)"
                />
              )}
              {activeMetric === 'do' && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="do"
                  stroke="#10b981"
                  strokeWidth={3}
                  fill="url(#metricGrad)"
                  name="Dissolved Oxygen (mg/L)"
                />
              )}
              {activeMetric === 'waste' && (
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="wasteCount"
                  stroke="#28D7D7"
                  strokeWidth={3}
                  fill="url(#metricGrad)"
                  name="Waste Debris Count"
                />
              )}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rainfall"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="4 4"
                name="Rainfall Inflow (mm)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Correlation Insights Grid (Section 25) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Precipitation vs Turbidity</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Strong positive correlation (r = 0.88) between storm runoff volume and suspended particulate spikes, peaking in July at 22.4 NTU.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-400 uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Waste vs Dissolved Oxygen</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Inverse correlation detected: as floating organic & plastic debris surged during peak urban flush, benthic dissolved oxygen plummeted to 4.8 mg/L.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Post-Monsoon Equilibrium</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Current September readings demonstrate re-aeration recovery (6.8 mg/L DO) following seasonal settling and hydraulic stabilization.
          </p>
        </div>
      </div>
    </div>
  );
};
