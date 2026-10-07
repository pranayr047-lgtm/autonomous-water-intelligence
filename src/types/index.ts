export type QualityStatus = 'healthy' | 'moderate' | 'critical' | 'informational';

export interface WaterQualityParameters {
  pH: number;
  turbidity: number; // NTU
  temperature: number; // °C
  tds: number; // ppm
  dissolvedOxygen: number; // mg/L
  conductivity?: number; // µS/cm
}

export interface ParameterThreshold {
  key: keyof WaterQualityParameters;
  label: string;
  unit: string;
  optimalMin: number;
  optimalMax: number;
  warningMin: number;
  warningMax: number;
  description: string;
}

export interface WaterBody {
  id: string;
  name: string;
  location: string;
  coordinates: { x: number; y: number; lat: number; lng: number };
  areaSqKm: number;
  lastUpdated: string;
  monitoringStatus: 'Online' | 'Intermittent' | 'Calibrating';
  qualityStatus: QualityStatus;
  riskScore: number; // 0 - 100
  wasteObjectsCount: number;
  parameters: WaterQualityParameters;
  aiConfidence: number;
  description: string;
  recommendedAction: string;
  historicalTrend: Array<{
    timestamp: string;
    pH: number;
    turbidity: number;
    tds: number;
    temperature: number;
    dissolvedOxygen: number;
    riskScore: number;
  }>;
}

export type WasteCategory =
  | 'plastic'
  | 'organic'
  | 'paper'
  | 'metal'
  | 'glass'
  | 'textile'
  | 'other';

export interface PixelBoundingBox {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface WasteDetectionBox {
  id: string;
  label: string;
  category: WasteCategory;
  confidence: number; // e.g. 0.91
  box: [number, number, number, number]; // [top%, left%, width%, height%]
  pixelBox?: PixelBoundingBox; // [x1, y1, x2, y2]
  color: string;
  isUncertain?: boolean;
  submergedDepthEstimate?: string; // e.g. "Surface (0-5cm)", "Semi-submerged (12cm)"
  estimatedMaterial?: string; // e.g. "PET High-Density Polymer", "Expanded Polystyrene (EPS)"
  toxicityIndex?: 'Low' | 'Moderate' | 'High' | 'Severe';
  recommendedTool?: string; // e.g. "Surface Skimmer Net", "Containment Boom Unit", "Autonomous Trash Skimmer Catamaran"
}

export interface WasteAnalysisRecord {
  id: string;
  date: string;
  location: string;
  imageUrl: string;
  objectsCount: number;
  confidence: number;
  status: 'Reviewed' | 'Attention' | 'Normal';
  breakdown: {
    plastic: number;
    organic: number;
    paper: number;
    metal: number;
    glass: number;
    textile: number;
    other: number;
  };
  observation: string;
  visibleWasteLevel?: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  recommendedAction?: string;
  howGeneratedSteps?: string[];
  detections: WasteDetectionBox[];
  modelVersionUsed?: string;
  modelName?: string;
  inferenceLatencyMs?: number;
}

export interface DatasetClassItem {
  id: number;
  name: string;
  group: WasteCategory;
  count: number;
  samplePrecision: number;
  sampleRecall: number;
  isEvaluated: boolean;
}

export interface DatasetSource {
  name: string;
  source: string;
  url?: string;
  paperUrl?: string;
  license: string;
  licenseType: string;
  totalImages: number;
  annotations: number;
  format: string;
  isWaterSpecific: boolean;
  description: string;
  splits: {
    train: number;
    val: number;
    test: number;
  };
}

export interface DatasetMetadata {
  projectName: string;
  version: string;
  createdDate: string;
  annotationFormat: string;
  task: string;
  splits: {
    train: { images: number; annotations: number; percentage: number };
    val: { images: number; annotations: number; percentage: number };
    test: { images: number; annotations: number; percentage: number };
    totalImages: number;
    totalAnnotations: number;
  };
  classes: DatasetClassItem[];
  sources: DatasetSource[];
  waterEnvironments: string[];
  environmentalVariations: string[];
  qualityControl: {
    totalChecksPassed: number;
    totalChecksRun: number;
    invalidBoundingBoxes: number;
    missingLabels: number;
    emptyAnnotations: number;
    duplicateImages: number;
    outOfBoundClassIds: number;
    extremelySmallObjects: number;
    blurryImagesFiltered: number;
    classBalanceStatus: string;
    lastAuditTimestamp: string;
  };
}

export interface YoloModelInfo {
  id: string;
  name: string;
  version: string;
  architecture: string;
  map50: number;
  map50_95: number;
  precision: number;
  recall: number;
  meanIoU: number;
  latencyMs: number;
  weightsSize: string;
  glareSuppressionRate: number;
  submergedRecall: number;
  description: string;
  isTrained: boolean;
  lastTrainedAt?: string;
  datasetName: string;
  checkpointFilename: string;
  supportedClassesCount: number;
  isEvaluationPending?: boolean;
}

export interface TrainingHyperparameters {
  baseModel: string;
  epochs: number;
  batchSize: number;
  imgSize: number;
  optimizer: 'AdamW' | 'SGD';
  lr0: number;
  dataset: string;
  augmentations: {
    sunGlareJitter: boolean;
    waveCaustics: boolean;
    turbidityFogging: boolean;
    subsurfaceRefraction: boolean;
    mosaicFlotsam: boolean;
  };
}

export interface TrainingEpochMetric {
  epoch: number;
  totalEpochs: number;
  boxLoss: number;
  clsLoss: number;
  dflLoss: number;
  map50: number;
  map50_95: number;
  precision: number;
  recall: number;
  gpuMemory: string;
}

export interface AgentNodeInfo {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'processing' | 'standby';
  purpose: string;
  input: string;
  processing: string;
  output: string;
  confidenceScore: number;
  x: number;
  y: number;
}

export interface RiskFactor {
  parameter: string;
  value: string;
  weight: number; // 0 - 10
  severity: 'low' | 'moderate' | 'high';
  impactExplanation: string;
}

export interface RiskAnalysisResult {
  waterBodyId: string;
  waterBodyName: string;
  timestamp: string;
  riskScore: number; // 0 - 100
  classification: 'Healthy' | 'Moderate Risk' | 'Critical Risk';
  observedObservations: string[];
  predictedTrends: string[];
  recommendedActions: string[];
  contributingFactors: RiskFactor[];
  modelConfidence: number;
}

export interface AlertItem {
  id: string;
  title: string;
  location: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'informational' | 'resolved';
  description: string;
  parameterImpacted?: string;
  isReviewed: boolean;
}

export interface EnvironmentalReport {
  id: string;
  waterBodyName: string;
  reportingPeriod: string;
  generatedDate: string;
  generatedBy: string;
  overallHealthScore: number;
  riskClassification: string;
  parametersSummary: {
    avgPh: number;
    avgTurbidity: number;
    avgTds: number;
    avgTemp: number;
    avgDo: number;
  };
  wasteDetectionsCount: number;
  predominantWasteType: string;
  executiveObservations: string[];
  prioritizedActions: string[];
}
