import React from 'react';
import {
  Waves,
  Activity,
  ScanEye,
  GitFork,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Database,
  BarChart2,
  Sparkles,
  PlayCircle,
  MapPin,
  ChevronRight,
  Eye,
} from 'lucide-react';
import { WaterBackground } from '../components/WaterBackground';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenLogin: () => void;
  onRunDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenLogin,
  onRunDemo,
}) => {
  return (
    <div className="relative min-h-screen bg-[#061826] text-white selection:bg-[#13A8A8]/30 selection:text-[#28D7D7] overflow-x-hidden">
      {/* Dynamic Aquatic Canvas Layer */}
      <WaterBackground intensity="deep" />

      {/* Top Navbar */}
      <header className="relative z-20 border-b border-[#0B5E75]/30 bg-[#061826]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#13A8A8] to-[#0B5E75] flex items-center justify-center text-white shadow-xl shadow-[#13A8A8]/25 border border-[#28D7D7]/40">
              <Waves className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-wider text-white uppercase font-mono block">
                AQUA INTELLIGENCE
              </span>
              <span className="text-[11px] text-[#28D7D7] tracking-tight font-medium">
                Autonomous Water Intelligence & Decision Support
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
            <a href="#features" className="hover:text-[#28D7D7] transition-colors">
              Platform Capabilities
            </a>
            <a href="#vision" className="hover:text-[#28D7D7] transition-colors">
              Computer Vision
            </a>
            <a href="#multi-agent" className="hover:text-[#28D7D7] transition-colors">
              Multi-Agent Engine
            </a>
            <a href="#architecture" className="hover:text-[#28D7D7] transition-colors">
              Architecture
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={onRunDemo}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#09263A] text-[#28D7D7] border border-[#0B5E75]/60 hover:border-[#13A8A8] text-xs font-semibold transition-all"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Live Demonstration</span>
            </button>
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white text-xs font-bold transition-all shadow-lg shadow-[#13A8A8]/20"
            >
              <span>Access Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 lg:pt-24 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#09263A]/90 border border-[#13A8A8]/40 text-xs font-mono text-[#28D7D7] shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>ENVIRONMENTAL AI & SENSOR INTELLIGENCE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Understand Water.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28D7D7] to-[#13A8A8]">
                Predict Risk.
              </span>{' '}
              Protect Ecosystems.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              An AI-powered environmental intelligence platform for real-time water quality analytics,
              computer-vision waste detection, risk assessment, and sustainable decision support.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onEnterApp}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#13A8A8] to-[#0B5E75] hover:from-[#28D7D7] hover:to-[#13A8A8] hover:text-[#061826] text-white font-bold text-sm transition-all shadow-xl shadow-[#13A8A8]/25 hover:scale-102"
              >
                <span>Explore Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onRunDemo}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#09263A] hover:bg-[#0B5E75]/50 text-[#28D7D7] border border-[#0B5E75] hover:border-[#13A8A8] font-semibold text-sm transition-all shadow-sm"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Run System Demonstration</span>
              </button>
            </div>

            {/* Trust / Technical Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#0B5E75]/30 text-slate-400 text-xs font-mono">
              <div>
                <span className="text-white font-bold block text-base sm:text-lg">5 Multi-Parameter</span>
                <span>Sonde Sensors</span>
              </div>
              <div>
                <span className="text-[#28D7D7] font-bold block text-base sm:text-lg">YOLOv8 Edge CV</span>
                <span>Visible Waste Model</span>
              </div>
              <div>
                <span className="text-emerald-400 font-bold block text-base sm:text-lg">91.4% Avg</span>
                <span>Model Confidence</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Interactive Technological Environmental Visualization */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-[#0B5E75]/50 bg-gradient-to-b from-[#09263A]/90 to-[#061826]/90 p-5 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
              {/* Radar/Bathymetric grid header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#0B5E75]/30 text-xs">
                <div className="flex items-center gap-2 font-mono text-[#28D7D7]">
                  <Activity className="w-3.5 h-3.5 animate-pulse" />
                  <span>AUTONOMOUS STREAM: ONLINE</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">FPS: 60 • LATENCY: 24ms</span>
              </div>

              {/* Central Schematic Ecosystem Canvas */}
              <div className="relative h-64 sm:h-72 my-3 rounded-2xl bg-[#051420] border border-[#0B5E75]/30 overflow-hidden flex items-center justify-center">
                {/* Visual SVG Sonar and Vector Nodes */}
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Concentric Sonar Rings */}
                  <circle cx="50%" cy="50%" r="40" fill="none" stroke="rgba(19, 168, 168, 0.2)" strokeWidth="1" />
                  <circle cx="50%" cy="50%" r="80" fill="none" stroke="rgba(19, 168, 168, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx="50%" cy="50%" r="120" fill="none" stroke="rgba(19, 168, 168, 0.1)" strokeWidth="1" />

                  {/* Flow wave vector */}
                  <path
                    d="M 0,180 Q 80,140 180,160 T 360,150 T 500,170"
                    fill="none"
                    stroke="#13A8A8"
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    className="animate-flow-line"
                  />

                  {/* Connected Telemetry Nodes */}
                  <line x1="50%" y1="50%" x2="25%" y2="30%" stroke="rgba(40, 215, 215, 0.3)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="75%" y2="35%" stroke="rgba(40, 215, 215, 0.3)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="70%" y2="75%" stroke="rgba(40, 215, 215, 0.3)" strokeWidth="1" />
                  <line x1="50%" y1="50%" x2="30%" y2="70%" stroke="rgba(40, 215, 215, 0.3)" strokeWidth="1" />
                </svg>

                {/* Central AI Decision Engine Hub */}
                <div className="relative z-10 flex flex-col items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#0B5E75] to-[#13A8A8] border border-[#28D7D7] shadow-xl shadow-[#13A8A8]/30">
                  <Cpu className="w-8 h-8 text-white animate-pulse" />
                  <span className="text-[9px] font-mono font-bold text-white mt-1">AI CORE</span>
                </div>

                {/* Node 1: Sonde Telemetry */}
                <div className="absolute top-6 left-6 p-2 rounded-xl bg-[#061826]/90 border border-[#13A8A8]/40 text-[10px] font-mono shadow-md">
                  <div className="text-[#28D7D7] font-bold">pH 7.2 • DO 6.8</div>
                  <div className="text-slate-400">Sonde #04 Normal</div>
                </div>

                {/* Node 2: CV Detection */}
                <div className="absolute top-8 right-6 p-2 rounded-xl bg-[#061826]/90 border border-[#28D7D7]/40 text-[10px] font-mono shadow-md">
                  <div className="text-amber-400 font-bold">CV: 7 Debris Units</div>
                  <div className="text-slate-400">Confidence: 91.4%</div>
                </div>

                {/* Node 3: Risk Score */}
                <div className="absolute bottom-6 right-8 p-2 rounded-xl bg-[#061826]/90 border border-amber-500/40 text-[10px] font-mono shadow-md">
                  <div className="text-amber-400 font-bold">Risk: 78/100</div>
                  <div className="text-slate-400">Moderate Warning</div>
                </div>

                {/* Node 4: Decision Support */}
                <div className="absolute bottom-6 left-6 p-2 rounded-xl bg-[#061826]/90 border border-emerald-500/40 text-[10px] font-mono shadow-md">
                  <div className="text-emerald-400 font-bold">Recommendation</div>
                  <div className="text-slate-400">Deploy Boom A-2</div>
                </div>
              </div>

              {/* Bottom Telemetry Bar */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                <div className="p-2.5 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">Active Water Bodies</span>
                  <span className="font-bold text-white">5 Smart Catchments</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/30">
                  <span className="text-slate-400 block text-[10px]">Decision State</span>
                  <span className="font-bold text-emerald-400">Autonomous Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section (Section 8) */}
      <section id="features" className="relative z-10 py-20 bg-[#051420]/80 border-t border-[#0B5E75]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-mono uppercase text-[#28D7D7] tracking-widest bg-[#09263A] px-3 py-1 rounded-full border border-[#13A8A8]/30">
              CORE SYSTEM CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              End-to-End Environmental Intelligence Architecture
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Integrating multi-parameter physical telemetry, computer vision object detection,
              longitudinal trend analysis, and decision-support algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Water Quality Intelligence */}
            <div className="group p-6 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 hover:border-[#28D7D7] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#13A8A8]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30 mb-5 group-hover:scale-110 transition-transform">
                  <Activity className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Water Quality Intelligence
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Continuous multi-parameter monitoring for pH, Temperature, Turbidity, Total Dissolved Solids (TDS), and Dissolved Oxygen with automated drift detection.
                </p>
              </div>
              <div className="pt-3 border-t border-[#0B5E75]/20 flex items-center justify-between text-[11px] text-[#28D7D7] font-mono">
                <span>5 Parameters Monitored</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: AI Waste Detection */}
            <div className="group p-6 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 hover:border-[#28D7D7] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#13A8A8]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30 mb-5 group-hover:scale-110 transition-transform">
                  <ScanEye className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  AI Waste Detection
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Computer vision identifies visible plastic, organic, and anthropogenic debris in water images with bounding boxes and class confidence scores.
                </p>
              </div>
              <div className="pt-3 border-t border-[#0B5E75]/20 flex items-center justify-between text-[11px] text-[#28D7D7] font-mono">
                <span>YOLOv8 Edge Computer Vision</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Risk Assessment */}
            <div className="group p-6 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 hover:border-[#28D7D7] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#13A8A8]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30 mb-5 group-hover:scale-110 transition-transform">
                  <GitFork className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Risk Assessment
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Combines physicochemical indicators, historical trends, and optical refuse density into a normalized 0-100 ecosystem vulnerability index.
                </p>
              </div>
              <div className="pt-3 border-t border-[#0B5E75]/20 flex items-center justify-between text-[11px] text-[#28D7D7] font-mono">
                <span>Bayesian Multi-Evidence Fusion</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Decision Support */}
            <div className="group p-6 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 hover:border-[#28D7D7] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-2xl hover:shadow-[#13A8A8]/10 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#0B5E75]/40 text-[#28D7D7] flex items-center justify-center border border-[#13A8A8]/30 mb-5 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Decision Support
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Generates actionable, prioritized recommendations for municipal inspection, barrier boom deployment, and ecological restoration teams.
                </p>
              </div>
              <div className="pt-3 border-t border-[#0B5E75]/20 flex items-center justify-between text-[11px] text-[#28D7D7] font-mono">
                <span>Observed vs Predicted vs Action</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#0B5E75]/30 bg-[#061826] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#13A8A8] flex items-center justify-center text-white">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-wider text-white uppercase font-mono">
                AQUA INTELLIGENCE
              </span>
              <p className="text-xs text-slate-400">
                Autonomous Water Intelligence & Decision Support System • Academic Demonstration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 rounded-xl bg-[#09263A] hover:bg-[#0B5E75]/40 text-white border border-[#0B5E75]/50 transition-colors"
            >
              Sign In (Demo Access)
            </button>
            <button
              onClick={onEnterApp}
              className="px-4 py-2 rounded-xl bg-[#13A8A8] hover:bg-[#28D7D7] hover:text-[#061826] text-white font-semibold transition-all"
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
