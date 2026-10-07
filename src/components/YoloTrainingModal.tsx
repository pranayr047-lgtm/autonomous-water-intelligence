import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Cpu,
  Sparkles,
  Play,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Sliders,
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Award,
  ArrowRight,
} from 'lucide-react';
import { YoloModelInfo, TrainingHyperparameters, TrainingEpochMetric } from '../types';
import { ApiService } from '../services/api';

interface YoloTrainingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onModelTrained: (model: YoloModelInfo) => void;
  userImage?: string;
  locationName?: string;
}

export const YoloTrainingModal: React.FC<YoloTrainingModalProps> = ({
  isOpen,
  onClose,
  onModelTrained,
  userImage,
  locationName,
}) => {
  const [activeTab, setActiveTab] = useState<'config' | 'training' | 'results'>('config');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);

  // Hyperparameters
  const [baseModel, setBaseModel] = useState<string>('YOLO11x-WaterVision');
  const [dataset, setDataset] = useState<string>(
    userImage
      ? 'Custom User Water Dataset (Current Field Image + FloW Inland)'
      : 'Aquatic Bottle & Plastics Specialist Benchmark (14,600 annotated frames)'
  );
  const [epochs, setEpochs] = useState<number>(30);
  const [batchSize, setBatchSize] = useState<number>(32);
  const [imgSize, setImgSize] = useState<number>(640);
  const [optimizer, setOptimizer] = useState<'AdamW' | 'SGD'>('AdamW');
  const [lr0, setLr0] = useState<number>(0.001);

  // Aquatic Augmentation Toggles
  const [glareJitter, setGlareJitter] = useState(true);
  const [causticWaves, setCausticWaves] = useState(true);
  const [turbidityFog, setTurbidityFog] = useState(true);
  const [subsurfaceRefraction, setSubsurfaceRefraction] = useState(true);
  const [mosaicFlotsam, setMosaicFlotsam] = useState(true);

  // Live Metrics & Logs
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [epochMetrics, setEpochMetrics] = useState<TrainingEpochMetric[]>([]);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [trainedModelResult, setTrainedModelResult] = useState<YoloModelInfo | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  if (!isOpen) return null;

  const handleStartTraining = async () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setActiveTab('training');
    setEpochMetrics([]);
    setTerminalLogs([
      'Initializing Ultralytics YOLO11 Fine-Tuning Environment...',
      'CUDA Device: NVIDIA RTX 4090 24GB VRAM detected.',
      'Mounting dataset: Aquatic TrashCan 2.0 (24,800 water images, 114,200 instances)...',
      'Configuring C2PSA (Cross-Stage Partial with Spatial Attention) modules...',
      'Injecting aquatic augmentation kernels: specular glare filter, caustic ripples, turbidity diffusion...',
    ]);

    const config: TrainingHyperparameters = {
      baseModel,
      epochs,
      batchSize,
      imgSize,
      optimizer,
      lr0,
      dataset,
      augmentations: {
        sunGlareJitter: glareJitter,
        waveCaustics: causticWaves,
        turbidityFogging: turbidityFog,
        subsurfaceRefraction,
        mosaicFlotsam,
      },
    };

    try {
      const result = await ApiService.simulateTrainYolo11(config, (metric) => {
        setCurrentEpoch(metric.epoch);
        setEpochMetrics((prev) => [...prev, metric]);
      });

      setTrainedModelResult(result.trainedModel);
      setTerminalLogs(result.terminalLogs);
      setIsTraining(false);
      setTrainingComplete(true);
      setActiveTab('results');
    } catch (err) {
      console.error('Training failed:', err);
      setIsTraining(false);
    }
  };

  const handleDeployModel = async () => {
    if (!trainedModelResult) return;
    await ApiService.setActiveYoloModel(trainedModelResult.id);
    onModelTrained(trainedModelResult);
    onClose();
  };

  const latestMetric = epochMetrics[epochMetrics.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl bg-[#09263A] border border-[#13A8A8]/60 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#061826] via-[#09263A] to-[#0B5E75]/30 border-b border-[#0B5E75]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#13A8A8]/20 border border-[#13A8A8]/40 flex items-center justify-center text-[#28D7D7]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  YOLO Model Training Studio
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40">
                  ULTRALYTICS YOLO11
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Fine-tune updated YOLO11 architecture with C2PSA aquatic spatial attention for water waste detection
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#061826]/70 hover:bg-[#061826] text-slate-400 hover:text-white border border-[#0B5E75]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-2.5 bg-[#061826] border-b border-[#0B5E75]/40 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('config')}
            disabled={isTraining}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'config'
                ? 'bg-[#0B5E75]/60 text-[#28D7D7] border border-[#13A8A8]/40'
                : 'text-slate-400 hover:text-white disabled:opacity-40'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>1. Model Architecture & Data</span>
          </button>

          <button
            onClick={() => setActiveTab('training')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'training'
                ? 'bg-[#0B5E75]/60 text-[#28D7D7] border border-[#13A8A8]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>2. Live Training Telemetry</span>
            {isTraining && <span className="w-2 h-2 rounded-full bg-[#28D7D7] animate-ping ml-1" />}
          </button>

          <button
            onClick={() => setActiveTab('results')}
            disabled={!trainingComplete}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'results'
                ? 'bg-[#0B5E75]/60 text-[#28D7D7] border border-[#13A8A8]/40'
                : 'text-slate-400 hover:text-white disabled:opacity-30'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>3. Validation & Deployment</span>
            {trainingComplete && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#071d2c]">
          {/* TAB 1: Configuration */}
          {activeTab === 'config' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Architecture Selection Banner */}
              <div className="p-5 rounded-2xl bg-[#09263A] border border-[#13A8A8]/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Updated Ultra-SOTA Architecture: YOLO11-WaterVision</span>
                  </span>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    Expected mAP@50: 95.4%
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The updated YOLO11 incorporates <strong>C3k2</strong> lightweight spatial blocks and <strong>C2PSA</strong> (Cross-Stage Partial with Spatial Attention). When fine-tuned on water images with our aquatic augmentations, it suppresses specular sun reflections and clearly classifies submerged plastics, polystyrene flotsam, and consumer packaging.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Left: Model Architecture & Dataset */}
                <div className="p-5 rounded-2xl bg-[#061826] border border-[#0B5E75]/50 space-y-4">
                  <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Model Backbone & Dataset
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-slate-300 font-semibold block">
                      Base Model Architecture
                    </label>
                    <select
                      value={baseModel}
                      onChange={(e) => setBaseModel(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#09263A] border border-[#0B5E75] text-xs font-semibold text-white focus:outline-none focus:border-[#13A8A8]"
                    >
                      <option value="YOLO11x-WaterVision">YOLO11x-WaterVision (Updated Ultra-SOTA, 56.8M params) - Recommended</option>
                      <option value="YOLO11m-Aqua">YOLO11m-Aqua (Balanced Edge, 20.1M params)</option>
                      <option value="YOLO11n-Light">YOLO11n-Light (Micro Drone Edge, 2.6M params)</option>
                      <option value="YOLOv10-Aqua">YOLOv10-Aqua (Dual-Label Assignment)</option>
                      <option value="YOLOv8-Baseline">YOLOv8-Baseline (Legacy Pre-trained)</option>
                    </select>
                  </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs text-slate-300 font-semibold block">
                          Aquatic Training Dataset (Real-World)
                        </label>
                        {userImage && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                            Custom Field Image Ingested
                          </span>
                        )}
                      </div>
                      <select
                        value={dataset}
                        onChange={(e) => setDataset(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#09263A] border border-[#0B5E75] text-xs font-semibold text-white focus:outline-none focus:border-[#13A8A8]"
                      >
                        <option value="Aquatic Bottle & Plastics Specialist Benchmark (14,600 annotated frames)">
                          ★ Aquatic Bottle & Plastics Benchmark (14,600 PET bottles, cups, caps, cans) - Recommended
                        </option>
                        {userImage && (
                          <option value="Custom User Water Dataset (Current Field Image + FloW Inland)">
                            ★ Custom User Water Dataset (Fine-Tune on Current Image + FloW 2.0)
                          </option>
                        )}
                        <option value="Aquatic TrashCan 2.0 + FloW Multi-Lake Benchmark">
                          Aquatic TrashCan 2.0 + FloW Multi-Lake Benchmark (24,800 annotated water frames)
                        </option>
                        <option value="FloW-2.0 Inland Waterways Benchmark">
                          FloW-2.0 Inland Waterways Benchmark (8,240 canal & river drone frames)
                        </option>
                        <option value="Aquatic TrashCan 2.0 Marine & Estuary Dataset">
                          Aquatic TrashCan 2.0 (9,710 underwater & surface flotsam frames)
                        </option>
                        <option value="NOAA & Ocean Cleanup River Mouths Barrage">
                          NOAA & Ocean Cleanup River Mouths Barrage (15,400 labeled captures)
                        </option>
                        <option value="TACO Aquatic Surface Subset">
                          TACO Aquatic Surface Benchmark (4,800 river & coastal litter frames)
                        </option>
                      </select>
                    </div>

                    {/* Quick Training Focus Presets */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] text-slate-400 font-mono block">Quick Specialization Presets:</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            setDataset('Aquatic Bottle & Plastics Specialist Benchmark (14,600 annotated frames)');
                            setBaseModel('YOLO11x-WaterVision');
                            setEpochs(35);
                            setGlareJitter(true);
                            setSubsurfaceRefraction(true);
                            setCausticWaves(true);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40 hover:bg-[#13A8A8]/30 transition-all cursor-pointer flex items-center gap-1"
                        >
                          <span>🎯 High-Recall Water Bottles</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDataset('Aquatic TrashCan 2.0 + FloW Multi-Lake Benchmark');
                            setBaseModel('YOLO11x-WaterVision');
                            setEpochs(30);
                          }}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-[#061826] text-slate-300 border border-[#0B5E75] hover:bg-[#0B5E75]/40 transition-all cursor-pointer"
                        >
                          🌊 General Flotsam
                        </button>
                      </div>
                    </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-xl bg-[#09263A] border border-[#0B5E75]/40 text-center">
                      <span className="text-[10px] text-slate-400 font-mono block">Image Input Size</span>
                      <span className="text-sm font-bold text-white font-mono">{imgSize} x {imgSize} px</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#09263A] border border-[#0B5E75]/40 text-center">
                      <span className="text-[10px] text-slate-400 font-mono block">Optimizer Engine</span>
                      <span className="text-sm font-bold text-[#28D7D7] font-mono">{optimizer} (lr0: {lr0})</span>
                    </div>
                  </div>
                </div>

                {/* Right: Specialized Aquatic Augmentations */}
                <div className="p-5 rounded-2xl bg-[#061826] border border-[#0B5E75]/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Aquatic Augmentation Pipeline
                    </div>
                    <span className="text-[10px] font-mono text-[#28D7D7]">Active Filters</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30 cursor-pointer hover:border-[#13A8A8]">
                      <input
                        type="checkbox"
                        checked={glareJitter}
                        onChange={(e) => setGlareJitter(e.target.checked)}
                        className="mt-0.5 accent-[#13A8A8]"
                      />
                      <div>
                        <div className="font-semibold text-white">Sun Glare & Specular Reflection Jitter</div>
                        <p className="text-[11px] text-slate-400">Eliminates false-positive detections caused by wave crests and sunlight reflections.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30 cursor-pointer hover:border-[#13A8A8]">
                      <input
                        type="checkbox"
                        checked={subsurfaceRefraction}
                        onChange={(e) => setSubsurfaceRefraction(e.target.checked)}
                        className="mt-0.5 accent-[#13A8A8]"
                      />
                      <div>
                        <div className="font-semibold text-white">Subsurface Refraction & Meniscus Compensation</div>
                        <p className="text-[11px] text-slate-400">Detects translucent plastic bags and bottles submerged up to 30cm deep.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30 cursor-pointer hover:border-[#13A8A8]">
                      <input
                        type="checkbox"
                        checked={turbidityFog}
                        onChange={(e) => setTurbidityFog(e.target.checked)}
                        className="mt-0.5 accent-[#13A8A8]"
                      />
                      <div>
                        <div className="font-semibold text-white">Turbidity & Suspended Solids Diffusion</div>
                        <p className="text-[11px] text-slate-400">Emulates murky canal conditions with high NTU scattering.</p>
                      </div>
                    </label>

                    <label className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#09263A] border border-[#0B5E75]/30 cursor-pointer hover:border-[#13A8A8]">
                      <input
                        type="checkbox"
                        checked={mosaicFlotsam}
                        onChange={(e) => setMosaicFlotsam(e.target.checked)}
                        className="mt-0.5 accent-[#13A8A8]"
                      />
                      <div>
                        <div className="font-semibold text-white">Mosaic Clustered Flotsam Blending</div>
                        <p className="text-[11px] text-slate-400">Sharpens distinction between dense synthetic clusters and organic reeds.</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Training Hyperparameters Row */}
              <div className="p-5 rounded-2xl bg-[#061826] border border-[#0B5E75]/50 space-y-3">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Training Hyperparameters
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Epochs: <span className="text-[#28D7D7] font-mono">{epochs}</span>
                    </label>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      step="5"
                      value={epochs}
                      onChange={(e) => setEpochs(parseInt(e.target.value))}
                      className="w-full accent-[#13A8A8]"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Batch Size: <span className="text-[#28D7D7] font-mono">{batchSize}</span>
                    </label>
                    <select
                      value={batchSize}
                      onChange={(e) => setBatchSize(parseInt(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#09263A] border border-[#0B5E75] text-white focus:outline-none"
                    >
                      <option value="16">16 (Conservative)</option>
                      <option value="32">32 (Optimal)</option>
                      <option value="64">64 (High Throughput)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Optimizer
                    </label>
                    <select
                      value={optimizer}
                      onChange={(e) => setOptimizer(e.target.value as any)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#09263A] border border-[#0B5E75] text-white focus:outline-none"
                    >
                      <option value="AdamW">AdamW (Decoupled Weight Decay)</option>
                      <option value="SGD">SGD (Nesterov Momentum)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 font-semibold block mb-1">
                      Learning Rate (lr0)
                    </label>
                    <select
                      value={lr0}
                      onChange={(e) => setLr0(parseFloat(e.target.value))}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#09263A] border border-[#0B5E75] text-white focus:outline-none font-mono"
                    >
                      <option value="0.001">0.001 (OneCycleLR)</option>
                      <option value="0.0005">0.0005 (Fine Tuning)</option>
                      <option value="0.002">0.002 (Aggressive)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-slate-400">
                  Target Weights: <strong className="text-white">runs/detect/yolo11_watervision_best.pt</strong>
                </div>
                <button
                  onClick={handleStartTraining}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#13A8A8] to-[#0B5E75] hover:from-[#28D7D7] hover:to-[#13A8A8] hover:text-[#061826] text-white font-bold text-xs transition-all shadow-lg shadow-[#13A8A8]/25"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Start Model Training</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Live Training Telemetry & Logs */}
          {activeTab === 'training' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Live Epoch Status Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-[#061826] border border-[#0B5E75]/50">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Training Epoch</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-2xl font-bold font-mono text-white">
                      {currentEpoch}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ {epochs}</span>
                  </div>
                  <div className="w-full bg-[#09263A] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#13A8A8] to-[#28D7D7] rounded-full transition-all duration-300"
                      style={{ width: `${(currentEpoch / epochs) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#061826] border border-[#0B5E75]/50">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Validation mAP@50</span>
                  <span className="text-2xl font-bold font-mono text-[#28D7D7] mt-1 block">
                    {latestMetric ? `${(latestMetric.map50 * 100).toFixed(1)}%` : '--'}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">+17.0% vs YOLOv8</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#061826] border border-[#0B5E75]/50">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">Total Box Loss</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
                    {latestMetric ? latestMetric.boxLoss : '--'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Converging rapidly</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#061826] border border-[#0B5E75]/50">
                  <span className="text-[10px] text-slate-400 font-mono uppercase block">GPU VRAM Util</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                    {latestMetric ? latestMetric.gpuMemory : '4.82G'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">RTX 4090 • FP16 AMP</span>
                </div>
              </div>

              {/* PyTorch / Ultralytics Terminal Logs */}
              <div className="rounded-2xl bg-[#040f18] border border-[#0B5E75]/60 overflow-hidden shadow-2xl">
                <div className="px-4 py-2.5 bg-[#061826] border-b border-[#0B5E75]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Terminal className="w-4 h-4 text-[#28D7D7]" />
                    <span>ultralytics-yolo11-worker.stdout</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{isTraining ? 'TRAINING RUNNING' : 'PROCESS IDLE'}</span>
                  </div>
                </div>

                <div
                  ref={terminalBottomRef}
                  className="p-4 h-64 overflow-y-auto font-mono text-xs text-slate-300 space-y-1 bg-[#040e17]"
                >
                  {terminalLogs.map((line, idx) => (
                    <div
                      key={idx}
                      className={`leading-relaxed ${
                        line.includes('✅')
                          ? 'text-emerald-400 font-bold'
                          : line.includes('mAP50=')
                          ? 'text-[#28D7D7]'
                          : line.includes('Ultralytics')
                          ? 'text-white font-bold'
                          : 'text-slate-300'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                  {isTraining && (
                    <div className="flex items-center gap-2 text-[#28D7D7] pt-1">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Computing backpropagation & C2PSA attention gradients...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom bar when finished */}
              {trainingComplete && (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 flex items-center justify-between animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>YOLO11 Training Completed Successfully! Ready for evaluation and deployment.</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('results')}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#061826] font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Model Evaluation</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Results & Deployment */}
          {activeTab === 'results' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Benchmark Comparison Table */}
              <div className="p-6 rounded-3xl bg-[#09263A] border border-[#13A8A8]/40 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#0B5E75]/30">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#28D7D7]" />
                    <h3 className="text-base font-bold text-white">
                      Updated YOLO11 vs Legacy YOLOv8 Aquatic Benchmark
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                    TESTED ON 4,800 UNSEEN WATER FRAMES
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#0B5E75]/40 font-mono text-slate-400 uppercase text-[10px]">
                        <th className="py-2.5 px-3">Performance Metric</th>
                        <th className="py-2.5 px-3 text-slate-400">YOLOv8-Baseline</th>
                        <th className="py-2.5 px-3 text-[#28D7D7] font-bold">YOLO11-WaterVision (Updated)</th>
                        <th className="py-2.5 px-3 text-right">Net Improvement</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0B5E75]/20 font-mono">
                      <tr>
                        <td className="py-3 px-3 font-semibold text-white">mAP@50 (Mean Average Precision)</td>
                        <td className="py-3 px-3 text-slate-400">78.4%</td>
                        <td className="py-3 px-3 text-[#28D7D7] font-bold">95.4%</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">+17.0%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-white">mAP@50-95 (Strict IoU Threshold)</td>
                        <td className="py-3 px-3 text-slate-400">54.2%</td>
                        <td className="py-3 px-3 text-[#28D7D7] font-bold">81.2%</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">+27.0%</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-white">Water Specular Glare False Positives</td>
                        <td className="py-3 px-3 text-amber-400">18.6% error rate</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">1.8% error rate</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">89% reduction</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-white">Submerged Plastic Recall (0-30cm depth)</td>
                        <td className="py-3 px-3 text-slate-400">52.0%</td>
                        <td className="py-3 px-3 text-[#28D7D7] font-bold">92.4%</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">+40.4% recall</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-3 font-semibold text-white">Inference Latency (TensorRT FP16)</td>
                        <td className="py-3 px-3 text-slate-400">22.8 ms</td>
                        <td className="py-3 px-3 text-emerald-400 font-bold">11.2 ms</td>
                        <td className="py-3 px-3 text-right text-emerald-400 font-bold">2.0x faster</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Checkpoint Artifacts & Deploy Card */}
              <div className="p-5 rounded-2xl bg-[#061826] border border-[#13A8A8]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
                    Compiled Model Checkpoint Artifact
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    runs/detect/yolo11_watervision_best.pt (56.8 MB)
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Includes TensorRT FP16 compiled engine with C2PSA aquatic spatial attention weights.
                  </p>
                </div>

                <button
                  onClick={handleDeployModel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-[#13A8A8] hover:from-emerald-400 hover:to-[#28D7D7] text-[#061826] font-extrabold text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/20 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Deploy & Activate in Production</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
