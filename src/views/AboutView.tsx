import React from 'react';
import {
  Waves,
  Cpu,
  ScanEye,
  GitFork,
  BookOpen,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in pb-16 max-w-5xl">
      {/* Title Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#09263A] via-[#0B5E75]/40 to-[#061826] border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <Waves className="w-6 h-6 text-[#28D7D7]" />
          <span className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
            ACADEMIC RESEARCH & TECHNICAL SPECIFICATION
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AQUA INTELLIGENCE: Autonomous Water Intelligence & Decision Support System
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          An interdisciplinary scientific project demonstrating how Artificial Intelligence, Computer Vision, Machine Learning, environmental telemetry, and Bayesian decision-support mechanisms combine to monitor, analyze, and protect freshwater ecosystems.
        </p>
      </div>

      {/* Core Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Multi-Parameter Telemetry</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Automating physical water quality data acquisition (pH, Temperature, Turbidity, TDS, DO) to eliminate manual sample collection delays and transient pollution misses.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30">
            <ScanEye className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">YOLO11-WaterVision Computer Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Deploying updated Ultralytics YOLO11 architecture with C3k2 spatial backbones and C2PSA attention to identify, categorize, and quantify visible surface and semi-submerged plastics while suppressing specular water glare.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30">
            <GitFork className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Bayesian Decision Fusion</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Synthesizing disparate sensor evidence into calibrated 0–100 risk estimates with explicit categorization of observed vs. predicted vs. recommended action states.
          </p>
        </div>
      </div>

      {/* System Architecture Description */}
      <div className="rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 p-6 sm:p-8 backdrop-blur-md shadow-xl space-y-5">
        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
          <Layers className="w-5 h-5 text-[#28D7D7]" />
          <span>System Architecture & Integration Readiness</span>
        </h3>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <p>
            The platform is engineered using a modular, service-oriented architecture designed for direct integration with production edge inference servers (e.g., Python FastAPI, YOLOv8 ONNX runtime, and IoT MQTT telemetry brokers).
          </p>
          <div className="p-4 rounded-2xl bg-[#061826] border border-[#0B5E75]/40 font-mono text-[11px] space-y-1.5 text-slate-300">
            <div>[IoT Ingestion Layer]  &rarr; Sonde Array (pH, DO, Turbidity, TDS, Temp) via MQTT/HTTP</div>
            <div>[Computer Vision Edge]  &rarr; Optical Surface Surveillance (YOLOv8 PyTorch/ONNX)</div>
            <div>[Multi-Agent Core]      &rarr; Kalman Parameter Filtering + Bayesian Risk Aggregator</div>
            <div>[Decision Support]      &rarr; Prioritized Municipal Intervention Dispatch (SLA &lt; 6h)</div>
          </div>
        </div>
      </div>

      {/* Ethical and Scientific Disclaimer */}
      <div className="rounded-2xl bg-[#061826] border border-[#13A8A8]/40 p-5 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Scientific Disclaimer & Operational Scope</span>
        </div>
        <p className="leading-relaxed text-slate-400">
          AQUA INTELLIGENCE is an academic and municipal decision-support tool. It presents probabilistic environmental indices and actionable operational recommendations based on incoming sensor telemetry. It does not replace official microbiological laboratory water potability certifications or medical epidemiology assays.
        </p>
      </div>
    </div>
  );
};
