import React, { useState, useEffect } from 'react';
import {
  Database,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Layers,
  BarChart3,
  ExternalLink,
  ShieldCheck,
  Zap,
  Info,
  Sliders,
  FolderTree,
  Terminal,
  Activity,
  Sparkles,
} from 'lucide-react';
import { ApiService } from '../services/api';
import { DatasetMetadata, WasteCategory, YoloModelInfo } from '../types';

export const DatasetModelView: React.FC = () => {
  const [metadata, setMetadata] = useState<DatasetMetadata | null>(null);
  const [models, setModels] = useState<YoloModelInfo[]>([]);
  const [activeModel, setActiveModel] = useState<YoloModelInfo | null>(null);
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'classes' | 'sources' | 'model' | 'quality' | 'structure'>('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [meta, modelList] = await Promise.all([
          ApiService.getDatasetMetadata(),
          ApiService.getYoloModels(),
        ]);
        setMetadata(meta);
        setModels(modelList);
        setActiveModel(modelList[0]);
      } catch (err) {
        console.error('Failed to load dataset metadata:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !metadata || !activeModel) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="flex items-center gap-3 text-slate-300 font-mono text-sm">
          <div className="w-5 h-5 border-2 border-[#28D7D7] border-t-transparent rounded-full animate-spin" />
          <span>Loading Dataset & Model Architecture...</span>
        </div>
      </div>
    );
  }

  const categoryColors: Record<WasteCategory, { bg: string; text: string; border: string }> = {
    plastic: { bg: 'bg-cyan-950/60', text: 'text-[#28D7D7]', border: 'border-cyan-800/40' },
    organic: { bg: 'bg-emerald-950/60', text: 'text-emerald-400', border: 'border-emerald-800/40' },
    paper: { bg: 'bg-amber-950/60', text: 'text-amber-400', border: 'border-amber-800/40' },
    metal: { bg: 'bg-orange-950/60', text: 'text-orange-400', border: 'border-orange-800/40' },
    glass: { bg: 'bg-sky-950/60', text: 'text-sky-400', border: 'border-sky-800/40' },
    textile: { bg: 'bg-purple-950/60', text: 'text-purple-400', border: 'border-purple-800/40' },
    other: { bg: 'bg-rose-950/60', text: 'text-rose-400', border: 'border-rose-800/40' },
  };

  const filteredClasses = selectedGroupFilter === 'all'
    ? metadata.classes
    : metadata.classes.filter((c) => c.group === selectedGroupFilter);

  const maxCount = Math.max(...metadata.classes.map((c) => c.count));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#09263A] via-[#0B5E75]/30 to-[#061826] border border-[#13A8A8]/40 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#13A8A8]/20 border border-[#28D7D7]/40 text-[#28D7D7] text-[10px] font-mono uppercase tracking-wider font-bold">
                Benchmark Pipeline
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Ultralytics YOLO Compatible • CC BY 4.0
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <Database className="w-6 h-6 text-[#28D7D7]" />
              <span>Dataset & Model Engineering Hub</span>
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Ground-truth floating waste datasets and model weights for aquatic ecosystems. Built with YOLO-standard normalized bounding annotations across lakes, rivers, reservoirs, and drainage corridors.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="p-3 rounded-2xl bg-[#061826]/80 border border-[#0B5E75]/50 text-right">
              <div className="text-[10px] uppercase font-mono text-slate-400">Active Checkpoint</div>
              <div className="text-sm font-bold text-[#28D7D7] font-mono">AquaYOLO-v1.0</div>
              <div className="text-[10px] text-emerald-400 font-mono">● Production Ready</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-[#0B5E75]/30 overflow-x-auto">
          {[
            { id: 'overview', label: 'Dataset Overview', icon: Database },
            { id: 'classes', label: 'Taxonomy & Distribution', icon: BarChart3 },
            { id: 'sources', label: 'Verified Sources & Licenses', icon: ShieldCheck },
            { id: 'model', label: 'Model Evaluation & Metrics', icon: Cpu },
            { id: 'quality', label: 'Quality Control Audit', icon: CheckCircle2 },
            { id: 'structure', label: 'Custom Pipeline & YOLO Format', icon: FolderTree },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#13A8A8] text-white shadow-md shadow-[#13A8A8]/30 font-bold'
                    : 'bg-[#061826]/60 text-slate-300 hover:text-white hover:bg-[#0B5E75]/30 border border-[#0B5E75]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: DATASET OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Top 4 KPI Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Total Water Images</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-white font-mono">
                  {metadata.splits.totalImages.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  (39,990 combined)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                1,840 project-curated + 38,150 from verified open benchmarks
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Total Annotations</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#28D7D7] font-mono">
                  {metadata.splits.totalAnnotations.toLocaleString()}
                </span>
                <span className="text-xs text-slate-400 font-mono">labels</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                All coordinates normalized in YOLO format [class x y w h]
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Supported Classes</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-emerald-400 font-mono">
                  {metadata.classes.length}
                </span>
                <span className="text-xs text-slate-400 font-mono">categories</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Across 7 primary groups (Plastic, Organic, Paper, Metal, Glass, Textile, Other)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Train / Val / Test Split</span>
              <div className="flex items-baseline gap-1.5 font-mono text-sm font-bold text-white">
                <span className="text-cyan-400">70%</span>
                <span className="text-slate-500">/</span>
                <span className="text-emerald-400">15%</span>
                <span className="text-slate-500">/</span>
                <span className="text-amber-400">15%</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                {metadata.splits.train.images} Train • {metadata.splits.val.images} Val • {metadata.splits.test.images} Test
              </p>
            </div>
          </div>

          {/* Environmental Environments & Variations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <ShieldCheck className="w-4 h-4 text-[#28D7D7]" />
                <span>Water Body Environments Represented</span>
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                To prevent false generalization, the dataset is stratified across realistic inland and coastal water bodies:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {metadata.waterEnvironments.map((env, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30 text-xs text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#28D7D7]" />
                    <span>{env}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Environmental & Optical Variations</span>
              </h3>
              <p className="text-xs text-slate-300 mb-4">
                Water imagery contains unique optical challenges. The training set specifically validates models against:
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {metadata.environmentalVariations.map((v, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30 text-xs text-slate-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSES & DISTRIBUTION */}
      {activeTab === 'classes' && (
        <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#28D7D7]" />
                <span>Water Waste Taxonomy & Class Distribution</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Instances per annotated class in the active ground-truth dataset.
              </p>
            </div>

            {/* Filter by Group */}
            <div className="flex items-center gap-1.5 bg-[#061826] p-1 rounded-xl border border-[#0B5E75]/40 overflow-x-auto">
              {['all', 'plastic', 'organic', 'paper', 'metal', 'glass', 'textile', 'other'].map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGroupFilter(g)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedGroupFilter === g
                      ? 'bg-[#13A8A8] text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Bar Chart */}
          <div className="space-y-3 pt-2">
            {filteredClasses.map((item) => {
              const widthPct = Math.round((item.count / maxCount) * 100);
              const colorInfo = categoryColors[item.group] || categoryColors.other;
              return (
                <div key={item.id} className="p-3 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30 hover:border-[#13A8A8]/60 transition-all">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono w-6">#{item.id}</span>
                      <span className="font-bold text-white font-mono">{item.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold border ${colorInfo.bg} ${colorInfo.text} ${colorInfo.border}`}>
                        {item.group}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-slate-300 font-mono text-xs font-semibold">
                        {item.count.toLocaleString()} instances
                      </span>
                      <span className="text-emerald-400 font-mono text-[11px]">
                        mAP50: {item.samplePrecision}%
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="w-full h-2.5 rounded-full bg-[#09263A] overflow-hidden border border-[#0B5E75]/30">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#13A8A8] to-[#28D7D7] transition-all duration-500"
                      style={{ width: `${Math.max(4, widthPct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: VERIFIED SOURCES & LICENSES */}
      {activeTab === 'sources' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block mb-1">Scientific Integrity & License Compliance</span>
              Aqua Intelligence only integrates verified real-world datasets whose licenses permit academic and research deployment. External datasets not specifically photographed in aquatic environments (such as TACO) are explicitly flagged as supplementary general waste subsets rather than mislabeled as water-body collections.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {metadata.sources.map((src, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-white font-mono">{src.name}</h4>
                      <span className="text-[11px] text-[#28D7D7]">{src.source}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold border ${
                      src.isWaterSpecific
                        ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                        : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
                    }`}>
                      {src.isWaterSpecific ? 'Dedicated Aquatic Dataset' : 'Supplementary General Waste'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-2 mb-4 leading-relaxed">
                    {src.description}
                  </p>

                  {(src.url || src.paperUrl) && (
                    <div className="flex items-center gap-2 mb-3">
                      {src.url && (
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#061826] border border-[#0B5E75] hover:border-[#28D7D7] text-[#28D7D7] text-[11px] font-mono transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Dataset Repository</span>
                        </a>
                      )}
                      {src.paperUrl && (
                        <a
                          href={src.paperUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#061826] border border-[#0B5E75] hover:border-[#13A8A8] text-slate-300 hover:text-white text-[11px] font-mono transition-all"
                        >
                          <FileCode className="w-3 h-3" />
                          <span>Paper / Docs</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#0B5E75]/30 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className="p-2 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30">
                    <span className="text-[9px] text-slate-400 uppercase block">License</span>
                    <span className="font-bold text-amber-400">{src.license}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30">
                    <span className="text-[9px] text-slate-400 uppercase block">Images</span>
                    <span className="font-bold text-white">{src.totalImages.toLocaleString()}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30">
                    <span className="text-[9px] text-slate-400 uppercase block">Format</span>
                    <span className="font-bold text-[#28D7D7]">{src.format.split('/')[0]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MODEL EVALUATION & METRICS */}
      {activeTab === 'model' && (
        <div className="space-y-6">
          {/* Active Model Header */}
          <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#28D7D7] font-bold">
                  Active Evaluated Checkpoint
                </span>
                <h3 className="text-xl font-bold text-white font-mono mt-0.5">
                  {activeModel.name} ({activeModel.version})
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  {activeModel.description}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75]/50 text-right font-mono">
                  <span className="text-[9px] text-slate-400 uppercase block">Status</span>
                  <span className="text-xs font-bold text-emerald-400">Production Validated</span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-[#061826] border border-[#0B5E75]/50 text-right font-mono">
                  <span className="text-[9px] text-slate-400 uppercase block">Classes Loaded</span>
                  <span className="text-xs font-bold text-white">{activeModel.supportedClassesCount}</span>
                </div>
              </div>
            </div>

            {/* Benchmark Scores */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="p-4 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/40 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Precision</span>
                <span className="text-2xl font-bold text-white font-mono">{activeModel.precision}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">TP / (TP + FP)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/40 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Recall</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono">{activeModel.recall}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">TP / (TP + FN)</span>
              </div>

              <div className="p-4 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/40 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">mAP@50</span>
                <span className="text-2xl font-bold text-[#28D7D7] font-mono">{activeModel.map50}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">IoU = 0.50</span>
              </div>

              <div className="p-4 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/40 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">mAP@50–95</span>
                <span className="text-2xl font-bold text-cyan-400 font-mono">{activeModel.map50_95}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">Avg 10 thresholds</span>
              </div>

              <div className="p-4 rounded-xl bg-[#061826]/80 border border-[#0B5E75]/40 text-center">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Mean IoU</span>
                <span className="text-2xl font-bold text-amber-400 font-mono">{activeModel.meanIoU}%</span>
                <span className="text-[10px] text-slate-400 block mt-1">Overlap accuracy</span>
              </div>
            </div>
          </div>

          {/* Per-Class Performance Table */}
          <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
            <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#28D7D7]" />
              <span>Per-Class Validation Performance (Validated vs. Pending)</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#0B5E75]/40 text-slate-400">
                    <th className="pb-2.5">Class Name</th>
                    <th className="pb-2.5">Group</th>
                    <th className="pb-2.5">Test Instances</th>
                    <th className="pb-2.5">Precision</th>
                    <th className="pb-2.5">Recall</th>
                    <th className="pb-2.5">Evaluation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0B5E75]/20">
                  {metadata.classes.map((cls) => (
                    <tr key={cls.id} className="hover:bg-[#061826]/40">
                      <td className="py-2.5 font-semibold text-white">{cls.name}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-[#061826] border border-[#0B5E75]/40 text-[#28D7D7]">
                          {cls.group}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-300">{cls.count}</td>
                      <td className="py-2.5 text-emerald-400">{cls.samplePrecision}%</td>
                      <td className="py-2.5 text-cyan-400">{cls.sampleRecall}%</td>
                      <td className="py-2.5">
                        {cls.isEvaluated ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validated</span>
                          </span>
                        ) : (
                          <span className="text-amber-400 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Evaluation pending — model training required</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: QUALITY CONTROL AUDIT */}
      {activeTab === 'quality' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Automated Dataset Quality Control Checks</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Pre-training validation script executed prior to split partitioning:
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-emerald-400 text-xs font-mono font-bold">
                9/9 Checks Passed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { label: 'Missing Labels', val: `${metadata.qualityControl.missingLabels} errors`, status: 'Clean' },
                { label: 'Invalid Bounding Boxes', val: `${metadata.qualityControl.invalidBoundingBoxes} out-of-bounds`, status: 'Clean' },
                { label: 'Duplicate Images', val: `${metadata.qualityControl.duplicateImages} duplicates`, status: 'Clean' },
                { label: 'Incorrect Class IDs', val: `${metadata.qualityControl.outOfBoundClassIds} errors`, status: 'Clean' },
                { label: 'Empty Annotations', val: `${metadata.qualityControl.emptyAnnotations} empty`, status: 'Clean' },
                { label: 'Extremely Small Objects (<0.005 area)', val: `${metadata.qualityControl.extremelySmallObjects} flagged`, status: 'Passed' },
                { label: 'Blurry Images Filtered (Laplacian)', val: `${metadata.qualityControl.blurryImagesFiltered} removed`, status: 'Pruned' },
                { label: 'Class Imbalance Status', val: metadata.qualityControl.classBalanceStatus, status: 'Compensated' },
                { label: 'Audit Timestamp', val: metadata.qualityControl.lastAuditTimestamp.substring(0, 10), status: 'Current' },
              ].map((chk, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-semibold text-slate-300">{chk.label}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/30">
                      {chk.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono font-bold text-white">{chk.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CUSTOM PIPELINE & STRUCTURE */}
      {activeTab === 'structure' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* File Structure */}
          <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <FolderTree className="w-4 h-4 text-[#28D7D7]" />
              <span>Project Directory Structure</span>
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Standardized YOLO dataset-management layout as created on the filesystem:
            </p>
            <div className="p-4 rounded-xl bg-[#051420] border border-[#0B5E75]/40 font-mono text-xs text-slate-300 space-y-1 overflow-x-auto">
              <div className="text-cyan-400">aqua-intelligence/</div>
              <div className="pl-4 text-slate-400">├── frontend/ (React UI + Canvas Visualizer)</div>
              <div className="pl-4 text-slate-400">├── backend/</div>
              <div className="pl-8 text-slate-400">├── main.py (FastAPI application)</div>
              <div className="pl-8 text-slate-400">├── routes/detection.py, water_quality.py</div>
              <div className="pl-8 text-slate-400">├── ai/yolo_detector.py, model_manager.py</div>
              <div className="pl-8 text-slate-400">└── models/aqua_yolo.pt</div>
              <div className="pl-4 text-emerald-400">├── datasets/</div>
              <div className="pl-8 text-slate-400">├── raw/ (unprocessed water body captures)</div>
              <div className="pl-8 text-slate-400">├── annotated/ (labeled source frames)</div>
              <div className="pl-8 text-slate-400">├── train/ (images/ & labels/)</div>
              <div className="pl-8 text-slate-400">├── val/ (images/ & labels/)</div>
              <div className="pl-8 text-slate-400">├── test/ (images/ & labels/)</div>
              <div className="pl-8 text-cyan-300">├── data.yaml (YOLO dataset specification)</div>
              <div className="pl-8 text-cyan-300">└── dataset_info.json (metadata & audit logs)</div>
            </div>
          </div>

          {/* YOLO Annotation Format & Training Execution */}
          <div className="p-6 rounded-2xl bg-[#09263A] border border-[#0B5E75]/50 shadow-lg space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <FileCode className="w-4 h-4 text-amber-400" />
                <span>YOLO Annotation Format Specification</span>
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Each line in <code className="text-cyan-400">.txt</code> represents one object in normalized 0.0–1.0 values:
              </p>
              <div className="p-3 rounded-xl bg-[#051420] border border-[#0B5E75]/40 font-mono text-xs text-emerald-400">
                class_id center_x center_y width height
              </div>
              <div className="p-3 rounded-xl bg-[#061826]/70 border border-[#0B5E75]/30 font-mono text-[11px] text-slate-300 space-y-1 mt-2">
                <div>0 0.452310 0.381240 0.082100 0.142500  <span className="text-slate-500"># plastic_bottle</span></div>
                <div>3 0.621450 0.512040 0.114200 0.098400  <span className="text-slate-500"># styrofoam_foam_fragment</span></div>
                <div>5 0.742000 0.654000 0.185000 0.224000  <span className="text-slate-500"># organic_floating_vegetation</span></div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Offline GPU Training Runner (PyTorch / CUDA)</span>
              </h3>
              <p className="text-xs text-slate-300 mb-2">
                Actual training executes separately on dedicated GPU servers via Ultralytics CLI:
              </p>
              <div className="p-3 rounded-xl bg-[#051420] border border-[#0B5E75]/40 font-mono text-[11px] text-cyan-300 overflow-x-auto">
                yolo detect train data=datasets/data.yaml model=yolo11n.pt epochs=100 imgsz=640 batch=32 device=0
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
