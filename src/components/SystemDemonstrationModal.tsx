import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Activity,
  ScanEye,
  GitFork,
  ShieldAlert,
  FileCheck,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { CircularGauge } from './CircularGauge';

interface SystemDemonstrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateSection?: (section: string) => void;
}

export const SystemDemonstrationModal: React.FC<SystemDemonstrationModalProps> = ({
  isOpen,
  onClose,
  onNavigateSection,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const totalSteps = 5;

  // Auto-play timer
  useEffect(() => {
    let interval: any;
    if (isPlaying && isOpen) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < totalSteps) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 5500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  // Scan simulation for step 3
  useEffect(() => {
    if (currentStep === 3) {
      setScanProgress(0);
      const timer = setInterval(() => {
        setScanProgress((p) => {
          if (p >= 100) {
            clearInterval(timer);
            return 100;
          }
          return p + 20;
        });
      }, 200);
      return () => clearInterval(timer);
    }
  }, [currentStep]);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'IoT Sensor Telemetry Ingestion',
      subtitle: 'Physicochemical Parameter Ingestion',
      icon: Activity,
    },
    {
      num: 2,
      title: 'Real-Time Anomaly Analysis',
      subtitle: 'Kalman Filtering & Normative Threshold Crosscheck',
      icon: ShieldAlert,
    },
    {
      num: 3,
      title: 'Computer Vision Waste Detection',
      subtitle: 'YOLO11-WaterVision with C2PSA Spatial Attention',
      icon: ScanEye,
    },
    {
      num: 4,
      title: 'Multi-Agent Bayesian Synthesis',
      subtitle: 'Autonomous Agent Consensus & Fusion',
      icon: GitFork,
    },
    {
      num: 5,
      title: 'Actionable Decision Support',
      subtitle: 'Prioritized Interventions (Observed vs Predicted vs Recommended)',
      icon: FileCheck,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#061826] border border-[#0B5E75] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0B5E75]/40 bg-[#051420]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  Autonomous System Demonstration
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40">
                  ACADEMIC PANEL EVALUATION MODE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-end intelligence execution pipeline (Sensor &rarr; Computer Vision &rarr; Multi-Agent &rarr; Decision Support)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#0B5E75]/30 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="px-6 py-3 bg-[#09263A]/60 border-b border-[#0B5E75]/30 flex items-center justify-between overflow-x-auto gap-2">
          {steps.map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            const Icon = s.icon;

            return (
              <button
                key={s.num}
                onClick={() => setCurrentStep(s.num)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#13A8A8] text-white font-bold shadow-md shadow-[#13A8A8]/30'
                    : isDone
                    ? 'bg-[#0B5E75]/40 text-[#28D7D7] border border-[#13A8A8]/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{s.num}. {s.title.split(' ')[0]}</span>
                {isDone && <CheckCircle className="w-3 h-3 text-emerald-400 ml-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Modal Dynamic Content Area */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#061826]">
          {/* STEP 1: Sensor Ingestion */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Step 1: Physicochemical Sonde Telemetry Ingestion
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Target Site: <strong className="text-white">Hussain Sagar Monitoring Node #4</strong> • Sampling Rate: 1.0 Hz
                  </p>
                </div>
                <div className="text-xs font-mono text-[#28D7D7] bg-[#09263A] px-3 py-1 rounded-lg border border-[#0B5E75]/50">
                  KALMAN FILTER: SYNCHRONIZED
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 flex flex-col items-center text-center">
                  <CircularGauge value={7.2} min={0} max={14} size={90} label="pH Level" statusColor="#28D7D7" />
                  <span className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Normal (6.5-8.5)
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 flex flex-col items-center text-center">
                  <CircularGauge value={12.4} min={0} max={40} size={90} unit="NTU" label="Turbidity" statusColor="#f59e0b" />
                  <span className="mt-2 text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Elevated (+24%)
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 flex flex-col items-center text-center">
                  <CircularGauge value={420} min={100} max={800} size={90} unit="ppm" label="TDS" statusColor="#ec4899" />
                  <span className="mt-2 text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
                    Moderate
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 flex flex-col items-center text-center">
                  <CircularGauge value={26.4} min={15} max={35} size={90} unit="°C" label="Temperature" statusColor="#38bdf8" />
                  <span className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Nominal
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 flex flex-col items-center text-center">
                  <CircularGauge value={6.8} min={0} max={12} size={90} unit="mg/L" label="Dissolved O2" statusColor="#10b981" />
                  <span className="mt-2 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Equilibrium
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 text-xs text-slate-300">
                <strong className="text-white block mb-1">Observation Telemetry Note:</strong>
                Surface telemetry confirms slight turbidity elevation at 12.4 NTU while dissolved oxygen remains at 6.8 mg/L. Data is pre-processed and forwarded to the Water Quality Agent node for cross-correlation.
              </div>
            </div>
          )}

          {/* STEP 2: Anomaly Analysis */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 2: Automated Anomaly Isolation
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comparing live sensor readings against 90-day baseline historical matrices
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 space-y-3">
                  <div className="text-xs font-bold text-[#28D7D7] font-mono uppercase">
                    Parameter Deviations
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-[#061826]">
                      <span className="text-slate-300">Turbidity vs Seasonal Mean</span>
                      <span className="font-mono font-bold text-amber-400">+2.4 NTU (Z-Score: +1.84)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-[#061826]">
                      <span className="text-slate-300">TDS Drift</span>
                      <span className="font-mono font-bold text-amber-400">+45 ppm (Z-Score: +1.20)</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded-lg bg-[#061826]">
                      <span className="text-slate-300">Dissolved Oxygen Fluctuation</span>
                      <span className="font-mono font-bold text-emerald-400">-0.2 mg/L (Nominal)</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 space-y-3 flex flex-col justify-center">
                  <div className="text-xs font-bold text-white">Preliminary Automated Flag</div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Slight organic particulate turbidity identified at northern inflow corridor. Automated rule triggers high-priority optical camera frame capture for computer vision waste analysis.
                  </p>
                  <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-800/50 text-amber-300 text-xs font-mono">
                    ALERT TRIGGERED: Camera PTZ redirected to Inflow Grid A-2
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Computer Vision Detection */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Step 3: Computer Vision Optical Waste Detection
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Model: YOLO11-WaterVision (Updated Ultra-SOTA) • TensorRT Latency: 11.2ms • C2PSA Glare Filter: 98.2% Active
                  </p>
                </div>
                <div className="text-xs font-mono text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-lg border border-emerald-800/40">
                  DETECTIONS: 8 TARGETS (95.8% CONFIDENCE)
                </div>
              </div>

              {/* Simulated Image with Bounding Boxes */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-[#13A8A8]/40 bg-[#051420]">
                <img
                  src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=1200&q=80"
                  alt="Water surface sampling"
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Animated Scanning Line */}
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#28D7D7] to-transparent shadow-[0_0_15px_#28D7D7] animate-scanline pointer-events-none" />

                {/* Detection Boxes */}
                <div
                  className="absolute border-2 border-[#28D7D7] bg-[#28D7D7]/15 rounded"
                  style={{ top: '28%', left: '35%', width: '16%', height: '20%' }}
                >
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#061826] text-[#28D7D7] border border-[#28D7D7] rounded">
                    Plastic Bottle 91%
                  </span>
                </div>

                <div
                  className="absolute border-2 border-[#28D7D7] bg-[#28D7D7]/15 rounded"
                  style={{ top: '48%', left: '58%', width: '22%', height: '24%' }}
                >
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#061826] text-[#28D7D7] border border-[#28D7D7] rounded">
                    Plastic Bag 87%
                  </span>
                </div>

                <div
                  className="absolute border-2 border-amber-400 bg-amber-400/15 rounded"
                  style={{ top: '60%', left: '22%', width: '18%', height: '16%' }}
                >
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#061826] text-amber-400 border border-amber-400 rounded">
                    Floating Waste 82%
                  </span>
                </div>

                <div
                  className="absolute border-2 border-emerald-400 bg-emerald-400/15 rounded"
                  style={{ top: '18%', left: '15%', width: '20%', height: '18%' }}
                >
                  <span className="absolute -top-5 left-0 px-1.5 py-0.5 text-[9px] font-mono font-bold bg-[#061826] text-emerald-400 border border-emerald-400 rounded">
                    Organic Waste 74%
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">Total Detected</span>
                  <span className="text-lg font-bold font-mono text-white">7 Objects</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">Plastic Waste</span>
                  <span className="text-lg font-bold font-mono text-[#28D7D7]">4 Units</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">Organic Refuse</span>
                  <span className="text-lg font-bold font-mono text-emerald-400">2 Units</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">AI Confidence</span>
                  <span className="text-lg font-bold font-mono text-white">91.0%</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Multi-Agent Synthesis */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Step 4: Multi-Agent Bayesian Fusion & Ecosystem Risk Scoring
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Decentralized agent consensus synthesizing water parameters, optical debris, and seasonal trend vectors
                </p>
              </div>

              {/* Agent Node Topology diagram */}
              <div className="p-4 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#061826] border border-[#13A8A8]/30">
                    <div className="text-xs font-bold text-[#28D7D7]">Water Quality Agent</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Reports elevated turbidity index (12.4 NTU, +24% variance).
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400">Confidence: 96.2%</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#061826] border border-[#13A8A8]/30">
                    <div className="text-xs font-bold text-[#28D7D7]">Waste Detection Agent</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Identified 7 floating units (4 polymeric plastics, 2 organic debris).
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400">Confidence: 91.4%</div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#061826] border border-[#13A8A8]/30">
                    <div className="text-xs font-bold text-[#28D7D7]">Historical Agent</div>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Correlates pattern to rainfall event 18 hours prior.
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400">Confidence: 93.8%</div>
                  </div>
                </div>

                <div className="flex items-center justify-center p-2 text-[#28D7D7]">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-[#061826] to-[#09263A] border border-amber-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-mono text-amber-400 uppercase font-bold">
                      Risk Assessment Agent Consensus
                    </div>
                    <div className="text-base font-extrabold text-white">
                      Current Ecosystem Status: Moderate Risk
                    </div>
                    <p className="text-xs text-slate-300">
                      Weighted score synthesis across physicochemical indices and surface refuse density.
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-extrabold font-mono text-amber-400">78/100</div>
                    <div className="text-[10px] text-slate-400 uppercase font-mono">Unified Risk Index</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Decision Support */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    Step 5: Actionable Decision Support Recommendations
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Structured operational guidance with rigorous scientific separation
                  </p>
                </div>
                <div className="text-xs font-mono text-[#28D7D7] bg-[#09263A] px-3 py-1 rounded-lg border border-[#0B5E75]">
                  RECOMMENDATION GENERATED
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 space-y-2">
                  <div className="text-xs font-bold text-emerald-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    1. Observed
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sonde sensors measured turbidity at 12.4 NTU; computer vision optical stream confirmed 7 visible floating refuse objects.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 space-y-2">
                  <div className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    2. Predicted
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    68% probability of localized benthic sunlight attenuation and subsequent down-current debris migration into Zone B within 24 hours.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#09263A] border border-[#0B5E75]/40 space-y-2">
                  <div className="text-xs font-bold text-[#28D7D7] uppercase font-mono tracking-wider flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#28D7D7]" />
                    3. Recommended
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Prioritize physical inspection and deploy containment boom at Northern Inlet Station 2 within 6 hours.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#09263A] border border-[#13A8A8]/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Full Workflow Complete</div>
                  <div className="text-xs text-slate-400">
                    You can now inspect individual modules in the live platform.
                  </div>
                </div>
                {onNavigateSection && (
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateSection('waste-detection');
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white font-semibold text-xs transition-all shadow-md"
                  >
                    <span>Test AI Waste Detection</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#0B5E75]/40 bg-[#051420]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#09263A] text-slate-200 border border-[#0B5E75]/50 text-xs font-medium hover:border-[#13A8A8] transition-all"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Auto-Play Walkthrough'}</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Step {currentStep} of {totalSteps}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStep <= 1}
              onClick={() => setCurrentStep((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 rounded-xl bg-[#09263A] text-slate-300 border border-[#0B5E75]/40 text-xs font-medium disabled:opacity-40 hover:bg-[#0B5E75]/30 transition-all"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep((p) => Math.min(totalSteps, p + 1))}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white font-semibold text-xs transition-all shadow-md"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-xl bg-[#13A8A8] text-white font-semibold text-xs hover:bg-[#28D7D7] hover:text-[#061826] transition-all shadow-md"
              >
                Finish Presentation
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
