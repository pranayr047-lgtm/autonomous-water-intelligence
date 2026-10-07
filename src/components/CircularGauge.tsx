import React from 'react';

interface CircularGaugeProps {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  unit?: string;
  label?: string;
  statusColor?: string; // hex or tailwind class
  showThresholds?: boolean;
  valueFormatter?: (val: number) => string;
}

export const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  min = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  unit = '',
  label,
  statusColor = '#28D7D7',
  valueFormatter,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270-degree arc for high-tech scientific instrument feel
  const arcLength = circumference * 0.75;
  const normalizedValue = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const strokeDashoffset = arcLength - normalizedValue * arcLength;

  const displayVal = valueFormatter ? valueFormatter(value) : value.toString();

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="transform -rotate-135 origin-center overflow-visible"
        >
          {/* Background Track Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(11, 94, 117, 0.25)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={statusColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${statusColor}40)`,
            }}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-1">
          <span className="text-xl font-bold font-mono tracking-tight text-white">
            {displayVal}
          </span>
          {unit && (
            <span className="text-[11px] font-medium text-[#28D7D7]/80 uppercase tracking-wider">
              {unit}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-1 text-xs font-medium text-slate-400 tracking-wide text-center">
          {label}
        </span>
      )}
    </div>
  );
};
