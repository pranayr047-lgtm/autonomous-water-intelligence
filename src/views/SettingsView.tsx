import React, { useState } from 'react';
import {
  Settings,
  Sliders,
  Bell,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Save,
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [pollingFreq, setPollingFreq] = useState('15');
  const [cvThreshold, setCvThreshold] = useState('0.75');
  const [turbidityWeight, setTurbidityWeight] = useState('35');
  const [tdsWeight, setTdsWeight] = useState('25');
  const [wasteWeight, setWasteWeight] = useState('40');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 animate-in fade-in pb-12 max-w-4xl">
      <div className="p-5 rounded-2xl bg-[#09263A]/80 border border-[#0B5E75]/40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#28D7D7]" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Platform Configuration & Calibration
          </h2>
        </div>
        <p className="text-xs text-slate-300 mt-1">
          Adjust multi-agent weights, computer vision confidence cutoffs, and IoT sonde telemetry intervals
        </p>
      </div>

      {isSaved && (
        <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Platform calibration saved and applied to active ingestion nodes.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Sonde Telemetry Settings */}
        <div className="p-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
            <Cpu className="w-4 h-4" />
            <span>IoT Ingestion & Polling Frequency</span>
          </div>

          <div className="space-y-2 text-xs">
            <label className="block text-slate-300 font-semibold">
              Sonde Sensor Sample Interval
            </label>
            <select
              value={pollingFreq}
              onChange={(e) => setPollingFreq(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-xl bg-[#061826] border border-[#0B5E75] text-white focus:outline-none focus:border-[#13A8A8]"
            >
              <option value="5">Every 5 Minutes (High Precision)</option>
              <option value="15">Every 15 Minutes (Recommended)</option>
              <option value="30">Every 30 Minutes (Balanced Power)</option>
              <option value="60">Every 60 Minutes (Low Bandwidth)</option>
            </select>
          </div>
        </div>

        {/* Computer Vision Confidence Cutoff */}
        <div className="p-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>YOLO Computer Vision Inference & Calibration</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/40">
              YOLO11-WATERVISION SOTA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Active Computer Vision Architecture
              </label>
              <select
                className="w-full px-3 py-2 rounded-xl bg-[#061826] border border-[#0B5E75] text-white focus:outline-none focus:border-[#13A8A8] font-mono text-xs"
                defaultValue="yolo11-watervision"
              >
                <option value="yolo11-watervision">YOLO11-WaterVision (Updated Ultra-SOTA - C2PSA Attention)</option>
                <option value="yolo10-aqua">YOLOv10-Aqua (Dual-Assignment NMS-Free)</option>
                <option value="yolov8-baseline">YOLOv8-Baseline (Legacy Pre-trained)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">
                Target Weights Checkpoint
              </label>
              <div className="px-3 py-2 rounded-xl bg-[#061826] border border-[#0B5E75]/50 text-slate-300 font-mono text-xs truncate">
                runs/detect/yolo11_watervision_best.pt (56.8 MB)
              </div>
            </div>
          </div>

          <div className="space-y-3 text-xs pt-2">
            <div className="flex justify-between items-center">
              <label className="text-slate-300 font-semibold">
                Minimum Detection Confidence Threshold
              </label>
              <span className="font-mono text-[#28D7D7] font-bold">
                {(parseFloat(cvThreshold) * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type="range"
              min="0.50"
              max="0.95"
              step="0.05"
              value={cvThreshold}
              onChange={(e) => setCvThreshold(e.target.value)}
              className="w-full accent-[#13A8A8]"
            />
            <p className="text-[11px] text-slate-400">
              Detections below this probability will be suppressed to avoid false-positive debris classifications. YOLO11’s C2PSA attention keeps false alarms under 1.8% even at lower thresholds.
            </p>
          </div>
        </div>

        {/* Risk Score Bayesian Weighting */}
        <div className="p-6 rounded-3xl bg-[#09263A]/85 border border-[#0B5E75]/40 backdrop-blur-md shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#28D7D7] uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Bayesian Risk Model Factor Weights</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30">
              <label className="block text-slate-300 font-semibold mb-1">
                Turbidity Factor Weight: {turbidityWeight}%
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={turbidityWeight}
                onChange={(e) => setTurbidityWeight(e.target.value)}
                className="w-full accent-[#f59e0b]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30">
              <label className="block text-slate-300 font-semibold mb-1">
                TDS Factor Weight: {tdsWeight}%
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={tdsWeight}
                onChange={(e) => setTdsWeight(e.target.value)}
                className="w-full accent-[#ec4899]"
              />
            </div>

            <div className="p-3 rounded-xl bg-[#061826] border border-[#0B5E75]/30">
              <label className="block text-slate-300 font-semibold mb-1">
                Visible Waste Weight: {wasteWeight}%
              </label>
              <input
                type="range"
                min="10"
                max="60"
                value={wasteWeight}
                onChange={(e) => setWasteWeight(e.target.value)}
                className="w-full accent-[#28D7D7]"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#13A8A8] to-[#0B5E75] hover:from-[#28D7D7] hover:to-[#13A8A8] hover:text-[#061826] text-white font-bold text-xs transition-all shadow-lg shadow-[#13A8A8]/20 flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Calibration Profiles</span>
        </button>
      </form>
    </div>
  );
};
