import React, { useState } from 'react';
import { AgentNodeInfo, RiskAnalysisResult, WaterBody } from '../types';
import {
  GitFork,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Info,
  Activity,
  ScanEye,
  History,
  TrendingUp,
} from 'lucide-react';
import { CircularGauge } from '../components/CircularGauge';

interface RiskAnalysisViewProps {
  agents: AgentNodeInfo[];
  riskResult: RiskAnalysisResult;
  selectedWaterBody: WaterBody;
}

export const RiskAnalysisView: React.FC<RiskAnalysisViewProps> = ({
  agents,
  riskResult,
  selectedWaterBody,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentNodeInfo>(agents[0]);

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'agent-wq':
        return Activity;
      case 'agent-waste':
        return ScanEye;
      case 'agent-hist':
        return History;
      case 'agent-risk':
        return GitFork;
      case 'agent-decision':
        return FileCheck;
      default:
        return Cpu;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12">
      {/* Header (Section 22) */}
      <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <GitFork className="w-5 h-5 text-[#28D7D7]" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              AI Environmental Risk Analysis
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40">
              BAYESIAN MULTI-AGENT FUSION
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-3xl">
            The system combines available environmental observations to identify areas that may require additional attention.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-[#061826] px-3 py-1.5 rounded-xl border border-[#0B5E75]">
          <span>Target Catchment:</span>
          <strong className="text-white">{selectedWaterBody.name}</strong>
        </div>
      </div>

      {/* Section 22: Animated Pipeline Diagram */}
      <div className="p-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
            Multi-Source Synthesis Pipeline
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            Autonomous Flow (Inputs &rarr; Consensus &rarr; Interventions)
          </span>
        </div>

        {/* Visual Pipeline Bar */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center text-xs">
          {/* Inputs */}
          <div className="md:col-span-3 p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/40 space-y-1.5">
            <div className="text-[10px] font-mono text-[#28D7D7] uppercase font-bold">
              Heterogeneous Ingestion
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[11px]">
              <span className="p-1.5 rounded bg-[#09263A] text-slate-200 border border-[#0B5E75]/30">
                • Water Quality Sonde
              </span>
              <span className="p-1.5 rounded bg-[#09263A] text-slate-200 border border-[#0B5E75]/30">
                • Optical Waste Detection
              </span>
              <span className="p-1.5 rounded bg-[#09263A] text-slate-200 border border-[#0B5E75]/30">
                • Historical Baselines
              </span>
              <span className="p-1.5 rounded bg-[#09263A] text-slate-200 border border-[#0B5E75]/30">
                • Geospatial Coordinates
              </span>
            </div>
          </div>

          <div className="flex justify-center text-[#28D7D7]">
            <ArrowRight className="w-5 h-5 animate-pulse hidden md:block" />
            <span className="md:hidden text-slate-500">&darr;</span>
          </div>

          {/* AI Decision Engine */}
          <div className="p-3 rounded-xl bg-[#061826] border border-[#13A8A8]/40 text-center space-y-1">
            <Cpu className="w-5 h-5 text-[#28D7D7] mx-auto animate-pulse" />
            <div className="font-bold text-white text-[11px]">AI Decision Engine</div>
            <div className="text-[10px] text-slate-400 font-mono">Multi-Agent Core</div>
          </div>

          <div className="flex justify-center text-[#28D7D7]">
            <ArrowRight className="w-5 h-5 animate-pulse hidden md:block" />
            <span className="md:hidden text-slate-500">&darr;</span>
          </div>

          {/* Risk Assessment & Decision Output */}
          <div className="p-3 rounded-xl bg-[#061826] border border-amber-500/40 text-center space-y-1">
            <GitFork className="w-5 h-5 text-amber-400 mx-auto" />
            <div className="font-bold text-white text-[11px]">Risk Assessment</div>
            <div className="text-[10px] text-amber-400 font-mono font-bold">78/100 Moderate</div>
          </div>
        </div>
      </div>

      {/* Section 23: Multi-Agent Interactive Topology */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Agent Interactive Graph */}
        <div className="lg:col-span-7 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 p-6 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0B5E75]/30">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#28D7D7]" />
              <h3 className="text-base font-bold text-white tracking-wide">
                Multi-Agent Cognitive Framework
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Click any agent node to inspect telemetry
            </span>
          </div>

          {/* Interactive Node Graph Area */}
          <div className="relative h-96 w-full rounded-2xl bg-[#051420] border border-[#0B5E75]/40 overflow-hidden flex items-center justify-center select-none p-4">
            {/* SVG Connecting Flow Lines between Agents */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Lines from Left Agents to Middle Risk Engine */}
              <path
                d="M 160,80 Q 260,110 320,150"
                fill="none"
                stroke="rgba(40, 215, 215, 0.4)"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-flow-line"
              />
              <path
                d="M 160,280 Q 260,250 320,210"
                fill="none"
                stroke="rgba(40, 215, 215, 0.4)"
                strokeWidth="2"
                strokeDasharray="6 4"
                className="animate-flow-line"
              />
              {/* Line from Historical to Risk */}
              <path
                d="M 320,80 L 320,150"
                fill="none"
                stroke="rgba(19, 168, 168, 0.4)"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              {/* Line from Risk to Decision Support */}
              <path
                d="M 360,180 Q 440,180 500,180"
                fill="none"
                stroke="rgba(40, 215, 215, 0.6)"
                strokeWidth="3"
                strokeDasharray="6 4"
                className="animate-flow-line"
              />
            </svg>

            {/* Agent Nodes rendered in layout */}
            <div className="relative w-full h-full flex flex-col justify-between z-10">
              {/* Top Row: Historical Agent */}
              <div className="flex justify-center">
                {(() => {
                  const agent = agents.find((a) => a.id === 'agent-hist') || agents[2];
                  const Icon = getAgentIcon(agent.id);
                  const isSel = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-3 rounded-2xl border transition-all duration-200 flex items-center gap-3 backdrop-blur-md ${
                        isSel
                          ? 'bg-[#0B5E75] border-[#28D7D7] shadow-xl shadow-[#13A8A8]/30 scale-105 ring-2 ring-[#28D7D7]/50'
                          : 'bg-[#061826]/90 border-[#0B5E75]/50 hover:border-[#13A8A8]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#09263A] flex items-center justify-center text-[#28D7D7]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{agent.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400">Active • 93.8%</div>
                      </div>
                    </button>
                  );
                })()}
              </div>

              {/* Middle Row: Water Quality, Risk Engine, Decision Support */}
              <div className="flex items-center justify-between px-2">
                {/* Water Quality Agent */}
                {(() => {
                  const agent = agents.find((a) => a.id === 'agent-wq') || agents[0];
                  const Icon = getAgentIcon(agent.id);
                  const isSel = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-3 rounded-2xl border transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md ${
                        isSel
                          ? 'bg-[#0B5E75] border-[#28D7D7] shadow-xl shadow-[#13A8A8]/30 scale-105 ring-2 ring-[#28D7D7]/50'
                          : 'bg-[#061826]/90 border-[#0B5E75]/50 hover:border-[#13A8A8]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#09263A] flex items-center justify-center text-[#28D7D7]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{agent.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400">Active • 96.2%</div>
                      </div>
                    </button>
                  );
                })()}

                {/* Risk Assessment Central Engine */}
                {(() => {
                  const agent = agents.find((a) => a.id === 'agent-risk') || agents[3];
                  const Icon = getAgentIcon(agent.id);
                  const isSel = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-4 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center gap-1.5 backdrop-blur-md ${
                        isSel
                          ? 'bg-gradient-to-tr from-[#0B5E75] to-[#13A8A8] border-[#28D7D7] shadow-2xl shadow-[#13A8A8]/40 scale-110'
                          : 'bg-[#061826]/95 border-[#13A8A8]/60 hover:border-[#28D7D7]'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#09263A] flex items-center justify-center text-[#28D7D7] border border-[#28D7D7]/30">
                        <Icon className="w-5 h-5 animate-pulse" />
                      </div>
                      <div className="text-xs font-extrabold text-white text-center">
                        {agent.name}
                      </div>
                      <div className="text-[10px] font-mono text-amber-400 font-bold">
                        Score: 78/100
                      </div>
                    </button>
                  );
                })()}

                {/* Decision Support Agent */}
                {(() => {
                  const agent = agents.find((a) => a.id === 'agent-decision') || agents[4];
                  const Icon = getAgentIcon(agent.id);
                  const isSel = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-3 rounded-2xl border transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md ${
                        isSel
                          ? 'bg-[#0B5E75] border-[#28D7D7] shadow-xl shadow-[#13A8A8]/30 scale-105 ring-2 ring-[#28D7D7]/50'
                          : 'bg-[#061826]/90 border-[#0B5E75]/50 hover:border-[#13A8A8]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#09263A] flex items-center justify-center text-[#28D7D7]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{agent.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400">Outputs Plan</div>
                      </div>
                    </button>
                  );
                })()}
              </div>

              {/* Bottom Row: Waste Detection Agent */}
              <div className="flex justify-start pl-6">
                {(() => {
                  const agent = agents.find((a) => a.id === 'agent-waste') || agents[1];
                  const Icon = getAgentIcon(agent.id);
                  const isSel = selectedAgent.id === agent.id;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent)}
                      className={`p-3 rounded-2xl border transition-all duration-200 flex items-center gap-2.5 backdrop-blur-md ${
                        isSel
                          ? 'bg-[#0B5E75] border-[#28D7D7] shadow-xl shadow-[#13A8A8]/30 scale-105 ring-2 ring-[#28D7D7]/50'
                          : 'bg-[#061826]/90 border-[#0B5E75]/50 hover:border-[#13A8A8]'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-[#09263A] flex items-center justify-center text-[#28D7D7]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white">{agent.name}</div>
                        <div className="text-[10px] font-mono text-emerald-400">YOLOv8 • 91.4%</div>
                      </div>
                    </button>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Right Selected Agent Details Inspector (Section 23: Agent Name, Purpose, Input, Processing, Output) */}
        <div className="lg:col-span-5 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 p-6 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#0B5E75]/30">
            <div>
              <span className="text-[10px] font-mono text-[#28D7D7] uppercase tracking-wider block">
                Agent Node Inspector
              </span>
              <h3 className="text-base font-bold text-white tracking-wide">
                {selectedAgent.name}
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              Confidence: {selectedAgent.confidenceScore}%
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Purpose */}
            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#28D7D7] uppercase block">
                Core Purpose & Responsibility
              </span>
              <p className="text-slate-300 leading-relaxed">
                {selectedAgent.purpose}
              </p>
            </div>

            {/* Input */}
            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                Ingested Input Feeds
              </span>
              <p className="text-slate-200 font-mono">
                {selectedAgent.input}
              </p>
            </div>

            {/* Processing */}
            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30 space-y-1">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">
                Algorithmic Processing Pipeline
              </span>
              <p className="text-slate-200">
                {selectedAgent.processing}
              </p>
            </div>

            {/* Output */}
            <div className="p-3 rounded-xl bg-[#061826] border border-[#13A8A8]/40 space-y-1">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase block">
                Standardized Agent Output
              </span>
              <p className="text-white font-medium">
                {selectedAgent.output}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 24: Decision Support Result (Strict Observed / Predicted / Recommended) */}
      <div className="rounded-3xl bg-[#09263A]/90 border border-[#0B5E75]/50 p-6 backdrop-blur-md shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#0B5E75]/40">
          <div>
            <div className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
              Autonomous Environmental Decision Support Result
            </div>
            <h3 className="text-xl font-extrabold text-white mt-0.5">
              Ecosystem Assessment: <span className="text-amber-400">Moderate Risk</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right font-mono">
              <div className="text-2xl font-extrabold text-amber-400">78 / 100</div>
              <div className="text-[10px] text-slate-400 uppercase">Composite Risk Score</div>
            </div>
          </div>
        </div>

        {/* The 3 Required Scientific Categories: Observed, Predicted, Recommended */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Observed */}
          <div className="p-5 rounded-2xl bg-[#061826] border border-emerald-800/40 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-emerald-800/30">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
              <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                1. Observed Telemetry
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {riskResult.observedObservations.map((obs, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{obs}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Predicted */}
          <div className="p-5 rounded-2xl bg-[#061826] border border-amber-800/40 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-amber-800/30">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
              <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                2. Predicted Trend Vectors
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              {riskResult.predictedTrends.map((trend, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{trend}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended */}
          <div className="p-5 rounded-2xl bg-[#061826] border border-[#13A8A8]/50 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#13A8A8]/30">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28D7D7] shadow-[0_0_8px_#28D7D7]" />
              <h4 className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
                3. Recommended Interventions
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-slate-200 font-medium">
              {riskResult.recommendedActions.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#28D7D7] font-bold">&rarr;</span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Ethical/Scientific Rigor Disclaimer (Section 24) */}
        <div className="p-4 rounded-2xl bg-[#061826]/70 border border-[#0B5E75]/40 text-xs text-slate-400 flex items-start gap-3">
          <Info className="w-4 h-4 text-[#28D7D7] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>System Rigor Protocol:</strong> The application clearly distinguishes between directly{' '}
            <span className="text-emerald-400 font-bold">Observed</span> sensor data, statistically{' '}
            <span className="text-amber-400 font-bold">Predicted</span> trends, and operational{' '}
            <span className="text-[#28D7D7] font-bold">Recommended</span> interventions. It does NOT assert automated proof of disease vectors or definitive biological pathogen contamination beyond available telemetry.
          </p>
        </div>
      </div>
    </div>
  );
};
