import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { WaterBody } from '../types';
import { Activity, Clock } from 'lucide-react';

interface WaterQualityOverviewChartProps {
  waterBody: WaterBody;
}

type ParameterKey = 'pH' | 'turbidity' | 'tds' | 'temperature' | 'dissolvedOxygen';
type TimeframeKey = '24h' | '7d' | '30d' | '6m';

const PARAMETER_CONFIG: Record<
  ParameterKey,
  { label: string; unit: string; color: string; optimalRange: string; min: number; max: number }
> = {
  pH: { label: 'pH Value', unit: '', color: '#28D7D7', optimalRange: '6.5 – 8.5', min: 6.0, max: 9.0 },
  turbidity: { label: 'Turbidity', unit: 'NTU', color: '#f59e0b', optimalRange: '< 5.0 NTU', min: 0, max: 40 },
  tds: { label: 'Total Dissolved Solids', unit: 'ppm', color: '#ec4899', optimalRange: '< 300 ppm', min: 100, max: 900 },
  temperature: { label: 'Temperature', unit: '°C', color: '#38bdf8', optimalRange: '20 – 28°C', min: 18, max: 34 },
  dissolvedOxygen: { label: 'Dissolved Oxygen', unit: 'mg/L', color: '#10b981', optimalRange: '≥ 6.5 mg/L', min: 2, max: 10 },
};

export const WaterQualityOverviewChart: React.FC<WaterQualityOverviewChartProps> = ({
  waterBody,
}) => {
  const [selectedParam, setSelectedParam] = useState<ParameterKey>('turbidity');
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeframeKey>('24h');

  // Generate realistic time series points based on selected timeframe
  const generateData = () => {
    const base = waterBody.parameters[selectedParam] || 10;
    const count = selectedTimeframe === '24h' ? 8 : selectedTimeframe === '7d' ? 7 : selectedTimeframe === '30d' ? 10 : 12;

    const labels24h = ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'];
    const labels7d = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const labels30d = ['Day 3', 'Day 6', 'Day 9', 'Day 12', 'Day 15', 'Day 18', 'Day 21', 'Day 24', 'Day 27', 'Day 30'];
    const labels6m = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

    const labels =
      selectedTimeframe === '24h'
        ? labels24h
        : selectedTimeframe === '7d'
        ? labels7d
        : selectedTimeframe === '30d'
        ? labels30d
        : labels6m;

    return labels.map((label, idx) => {
      // realistic variance
      const varianceFactor = Math.sin(idx * 0.8) * 0.12 + (Math.cos(idx * 1.2) * 0.08);
      const val = parseFloat((base * (1 + varianceFactor)).toFixed(1));
      return {
        timestamp: label,
        [selectedParam]: val,
        baseline: parseFloat(base.toFixed(1)),
      };
    });
  };

  const chartData = generateData();
  const currentConfig = PARAMETER_CONFIG[selectedParam];

  return (
    <div className="w-full rounded-2xl border border-[#0B5E75]/30 bg-[#09263A]/80 backdrop-blur-md p-5 shadow-xl shadow-black/20">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#0B5E75]/25">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#28D7D7]" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Water Quality Overview
            </h3>
            <span className="text-xs px-2 py-0.5 rounded bg-[#0B5E75]/40 text-[#28D7D7] border border-[#13A8A8]/30 font-mono">
              {waterBody.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time physicochemical telemetry drift vs. normative baseline
          </p>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center gap-1 bg-[#061826] p-1 rounded-lg border border-[#0B5E75]/40 text-xs">
          <span className="text-[11px] text-slate-400 px-2 font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#28D7D7]" /> Interval:
          </span>
          {(['24h', '7d', '30d', '6m'] as TimeframeKey[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-2.5 py-1 rounded font-medium transition-all ${
                selectedTimeframe === tf
                  ? 'bg-[#13A8A8] text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf === '24h' ? '24 Hours' : tf === '7d' ? '7 Days' : tf === '30d' ? '30 Days' : '6 Months'}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Selector Tabs */}
      <div className="flex flex-wrap gap-2 pt-4 pb-2">
        {(Object.keys(PARAMETER_CONFIG) as ParameterKey[]).map((param) => {
          const cfg = PARAMETER_CONFIG[param];
          const isActive = selectedParam === param;
          const currentVal = waterBody.parameters[param];

          return (
            <button
              key={param}
              onClick={() => setSelectedParam(param)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 ${
                isActive
                  ? 'bg-[#061826] text-white border-[#28D7D7] shadow-lg shadow-[#13A8A8]/10 ring-1 ring-[#28D7D7]/50'
                  : 'bg-[#061826]/50 text-slate-300 border-[#0B5E75]/30 hover:border-[#13A8A8]/60 hover:text-white'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cfg.color }}
              />
              <span>{cfg.label}</span>
              <span className="font-mono text-slate-400 font-bold ml-1">
                {currentVal} {cfg.unit}
              </span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas */}
      <div className="h-[280px] w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${selectedParam}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={currentConfig.color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={currentConfig.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(11, 94, 117, 0.2)" vertical={false} />
            <XAxis
              dataKey="timestamp"
              stroke="#667786"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: 'rgba(11, 94, 117, 0.4)' }}
            />
            <YAxis
              stroke="#667786"
              tick={{ fill: '#94a3b8', fontSize: 11 }}
              tickLine={{ stroke: 'rgba(11, 94, 117, 0.4)' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#061826',
                borderColor: '#13A8A8',
                borderRadius: '10px',
                color: '#ffffff',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                fontSize: '12px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#28D7D7', fontWeight: 'bold', marginBottom: '4px' }}
              formatter={(val: any) => [`${val} ${currentConfig.unit}`, currentConfig.label]}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
            />
            <Area
              type="monotone"
              name={currentConfig.label}
              dataKey={selectedParam}
              stroke={currentConfig.color}
              strokeWidth={2.5}
              fillOpacity={1}
              fill={`url(#gradient-${selectedParam})`}
              dot={{ stroke: currentConfig.color, strokeWidth: 2, r: 3, fill: '#061826' }}
              activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2, fill: currentConfig.color }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer with Normative Threshold Guidance */}
      <div className="mt-3 pt-3 border-t border-[#0B5E75]/20 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Normative Environmental Baseline: <strong className="text-white">{currentConfig.optimalRange}</strong></span>
        </div>
        <div>
          <span>Sampling Confidence: <strong className="text-[#28D7D7]">{waterBody.aiConfidence}%</strong></span>
        </div>
      </div>
    </div>
  );
};
