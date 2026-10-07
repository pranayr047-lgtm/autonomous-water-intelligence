import React, { useState } from 'react';
import { WaterBody } from '../types';
import { ShieldCheck, AlertTriangle, AlertOctagon, MapPin, Eye, ArrowRight, Layers, Waves, Wind } from 'lucide-react';

interface WaterBodyMapProps {
  waterBodies: WaterBody[];
  selectedBody: WaterBody | null;
  onSelectBody: (body: WaterBody) => void;
  onInspectDetails?: (body: WaterBody) => void;
}

export const WaterBodyMap: React.FC<WaterBodyMapProps> = ({
  waterBodies,
  selectedBody,
  onSelectBody,
  onInspectDetails,
}) => {
  const [activeLayer, setActiveLayer] = useState<'standard' | 'satellite' | 'heatmap'>('standard');
  const [hoveredBody, setHoveredBody] = useState<WaterBody | null>(null);

  const getMarkerColor = (status: WaterBody['qualityStatus']) => {
    switch (status) {
      case 'healthy':
        return {
          fill: '#10b981',
          border: 'border-emerald-500',
          bg: 'bg-emerald-500',
          ring: 'ring-emerald-500/30',
          badge: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/50',
          label: 'Healthy Equilibrium',
        };
      case 'moderate':
        return {
          fill: '#f59e0b',
          border: 'border-amber-500',
          bg: 'bg-amber-500',
          ring: 'ring-amber-500/30',
          badge: 'text-amber-400 bg-amber-950/60 border-amber-800/50',
          label: 'Moderate Risk',
        };
      case 'critical':
        return {
          fill: '#ef4444',
          border: 'border-red-500',
          bg: 'bg-red-500',
          ring: 'ring-red-500/30',
          badge: 'text-red-400 bg-red-950/60 border-red-800/50',
          label: 'Critical Risk',
        };
      default:
        return {
          fill: '#28D7D7',
          border: 'border-[#28D7D7]',
          bg: 'bg-[#28D7D7]',
          ring: 'ring-[#28D7D7]/30',
          badge: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/50',
          label: 'Monitoring Active',
        };
    }
  };

  return (
    <div className="relative w-full rounded-2xl border border-[#0B5E75]/30 bg-[#09263A]/80 backdrop-blur-md overflow-hidden shadow-xl shadow-black/20">
      {/* Top Map Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-[#0B5E75]/25 bg-[#061826]/70">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#0B5E75]/30 text-[#28D7D7] border border-[#13A8A8]/30">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide flex items-center gap-2">
              Geospatial Water Ecosystem Map
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/30">
                5 SITES SYNCHRONIZED
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Interactive spatial monitoring across urban catchments & riparian basins
            </p>
          </div>
        </div>

        {/* Layer switch buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#061826] rounded-lg border border-[#0B5E75]/40 text-xs">
          <button
            onClick={() => setActiveLayer('standard')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeLayer === 'standard'
                ? 'bg-[#13A8A8] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Telemetry Grid
          </button>
          <button
            onClick={() => setActiveLayer('satellite')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeLayer === 'satellite'
                ? 'bg-[#13A8A8] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bathymetry
          </button>
          <button
            onClick={() => setActiveLayer('heatmap')}
            className={`px-2.5 py-1 rounded font-medium transition-all ${
              activeLayer === 'heatmap'
                ? 'bg-[#13A8A8] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Risk Heatmap
          </button>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className="relative w-full h-[400px] sm:h-[460px] bg-[#051420] overflow-hidden select-none">
        {/* Abstract Topographic/Hydrological SVG Grid Background */}
        <svg
          className="absolute inset-0 w-full h-full opacity-60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(11, 94, 117, 0.18)"
                strokeWidth="0.8"
              />
            </pattern>
            <radialGradient id="lake-grad-1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0B5E75" stopOpacity="0.6" />
              <stop offset="80%" stopColor="#09263A" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#061826" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-glow-red" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heat-glow-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid */}
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />

          {/* River Inflow Vector Corridors */}
          <path
            d="M 0,220 Q 200,200 350,260 T 600,180 T 900,240 T 1200,210"
            fill="none"
            stroke="rgba(19, 168, 168, 0.22)"
            strokeWidth="12"
            strokeLinecap="round"
            className="opacity-70"
          />
          <path
            d="M 0,220 Q 200,200 350,260 T 600,180 T 900,240 T 1200,210"
            fill="none"
            stroke="rgba(40, 215, 215, 0.5)"
            strokeWidth="2"
            strokeDasharray="6 4"
            className="animate-flow-line"
          />

          {/* Tributary paths */}
          <path
            d="M 350,260 Q 420,380 520,440"
            fill="none"
            stroke="rgba(11, 94, 117, 0.35)"
            strokeWidth="4"
          />
          <path
            d="M 600,180 Q 640,90 760,60"
            fill="none"
            stroke="rgba(11, 94, 117, 0.35)"
            strokeWidth="4"
          />

          {/* Abstract Lake shapes */}
          {/* Hussain Sagar (Center-North) */}
          <path
            d="M 460,160 C 510,130 550,170 530,220 C 510,250 450,240 430,200 C 420,170 440,140 460,160 Z"
            fill="url(#lake-grad-1)"
            stroke="#13A8A8"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            className="transition-all duration-500"
          />

          {/* Osman Sagar (South-West) */}
          <ellipse
            cx="240"
            cy="310"
            rx="75"
            ry="45"
            fill="url(#lake-grad-1)"
            stroke="#13A8A8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Himayat Sagar (South-Central) */}
          <ellipse
            cx="360"
            cy="360"
            rx="60"
            ry="40"
            fill="url(#lake-grad-1)"
            stroke="#13A8A8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* If Heatmap mode is on, render environmental risk radiuses */}
          {activeLayer === 'heatmap' && (
            <>
              {/* Zone A (high risk) */}
              <circle cx="68%" cy="35%" r="85" fill="url(#heat-glow-red)" />
              {/* Hussain Sagar (moderate) */}
              <circle cx="48%" cy="42%" r="90" fill="url(#heat-glow-amber)" />
              {/* Zone B (moderate) */}
              <circle cx="74%" cy="72%" r="75" fill="url(#heat-glow-amber)" />
            </>
          )}

          {/* Contour topographic elevation isolines */}
          {activeLayer === 'satellite' && (
            <g stroke="rgba(40, 215, 215, 0.12)" strokeWidth="1" fill="none">
              <ellipse cx="480" cy="190" rx="110" ry="80" />
              <ellipse cx="480" cy="190" rx="140" ry="110" />
              <ellipse cx="240" cy="310" rx="110" ry="75" />
              <ellipse cx="360" cy="360" rx="90" ry="65" />
            </g>
          )}
        </svg>

        {/* Legend Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 p-2.5 rounded-xl bg-[#061826]/90 border border-[#0B5E75]/40 text-[11px] backdrop-blur-md shadow-lg pointer-events-none">
          <div className="font-semibold text-slate-300 font-mono tracking-wider text-[10px] uppercase">
            Sensor Status
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
            <span className="text-slate-300">Healthy (&lt;40 Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_6px_#f59e0b]" />
            <span className="text-slate-300">Moderate (40–79 Risk)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444]" />
            <span className="text-slate-300">Critical (80+ Risk)</span>
          </div>
        </div>

        {/* Water Body Interactive Markers */}
        {waterBodies.map((body) => {
          const isSelected = selectedBody?.id === body.id;
          const isHovered = hoveredBody?.id === body.id;
          const styles = getMarkerColor(body.qualityStatus);

          return (
            <div
              key={body.id}
              style={{
                left: `${body.coordinates.x}%`,
                top: `${body.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="absolute z-20 cursor-pointer transition-transform duration-200"
              onClick={() => onSelectBody(body)}
              onMouseEnter={() => setHoveredBody(body)}
              onMouseLeave={() => setHoveredBody(null)}
            >
              {/* Outer pulsing ping for critical/attention nodes */}
              {body.qualityStatus !== 'healthy' && (
                <span
                  className={`absolute -inset-2 rounded-full animate-ping opacity-40 ${styles.bg}`}
                />
              )}

              {/* Marker pin element */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${
                  styles.border
                } ${
                  isSelected
                    ? 'ring-4 ring-[#28D7D7] scale-125 bg-[#061826] shadow-xl'
                    : 'bg-[#09263A] hover:scale-115'
                } transition-all duration-200 shadow-md`}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: styles.fill }}
                />
              </div>

              {/* Marker Label */}
              <div
                className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-md text-[11px] font-medium border backdrop-blur-md transition-all ${
                  isSelected || isHovered
                    ? 'bg-[#061826] text-white border-[#28D7D7]/70 shadow-lg scale-105 z-30'
                    : 'bg-[#061826]/80 text-slate-300 border-[#0B5E75]/40 opacity-90'
                }`}
              >
                {body.name.split(' (')[0]}
              </div>
            </div>
          );
        })}

        {/* Coordinates / Sonar readout */}
        <div className="absolute bottom-3 right-3 z-10 font-mono text-[10px] text-[#28D7D7]/60 bg-[#061826]/80 px-2.5 py-1 rounded border border-[#0B5E75]/30">
          SCAN COORD: 17.4239° N, 78.4738° E • TELEMETRY ACTIVE
        </div>
      </div>

      {/* Selected Water Body Quick Details Panel */}
      {selectedBody && (
        <div className="p-4 sm:p-5 border-t border-[#0B5E75]/30 bg-[#061826]/90 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-all">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h4 className="text-base font-bold text-white tracking-wide">
                {selectedBody.name}
              </h4>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${
                  getMarkerColor(selectedBody.qualityStatus).badge
                }`}
              >
                {getMarkerColor(selectedBody.qualityStatus).label}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Risk Score: <strong className="text-white">{selectedBody.riskScore}/100</strong>
              </span>
            </div>
            <p className="text-xs text-slate-300 flex items-center gap-1.5">
              <span className="text-[#28D7D7] font-semibold">AI Recommendation:</span>
              <span>{selectedBody.recommendedAction}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-3 bg-[#09263A] px-3 py-2 rounded-lg border border-[#0B5E75]/30">
              <div>
                <span className="text-slate-400 block text-[10px]">pH Level</span>
                <span className="font-mono font-bold text-white">{selectedBody.parameters.pH}</span>
              </div>
              <div className="h-6 w-px bg-[#0B5E75]/40" />
              <div>
                <span className="text-slate-400 block text-[10px]">Turbidity</span>
                <span className="font-mono font-bold text-white">{selectedBody.parameters.turbidity} NTU</span>
              </div>
              <div className="h-6 w-px bg-[#0B5E75]/40" />
              <div>
                <span className="text-slate-400 block text-[10px]">Visible Waste</span>
                <span className="font-mono font-bold text-amber-400">{selectedBody.wasteObjectsCount} objects</span>
              </div>
            </div>

            {onInspectDetails && (
              <button
                onClick={() => onInspectDetails(selectedBody)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white font-semibold transition-all shadow-md shadow-[#13A8A8]/20"
              >
                <Eye className="w-4 h-4" />
                <span>Inspect Full Telemetry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
