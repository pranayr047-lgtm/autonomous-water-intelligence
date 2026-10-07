import React, { useState, useEffect } from 'react';
import { ApiService } from './services/api';
import {
  WaterBody,
  AlertItem,
  WasteAnalysisRecord,
  AgentNodeInfo,
  RiskAnalysisResult,
} from './types';

// Layout Components
import { Sidebar, NavSection } from './components/Sidebar';
import { Header } from './components/Header';
import { SystemDemonstrationModal } from './components/SystemDemonstrationModal';
import { WaterBackground } from './components/WaterBackground';

// View Pages
import { LandingPage } from './views/LandingPage';
import { LoginPage } from './views/LoginPage';
import { DashboardView } from './views/DashboardView';
import { WaterBodiesView } from './views/WaterBodiesView';
import { WaterQualityView } from './views/WaterQualityView';
import { WasteDetectionView } from './views/WasteDetectionView';
import { DatasetModelView } from './views/DatasetModelView';
import { RiskAnalysisView } from './views/RiskAnalysisView';
import { AnalyticsView } from './views/AnalyticsView';
import { AlertsView } from './views/AlertsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { AboutView } from './views/AboutView';

export default function App() {
  // Screen Level Navigation
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'app'>('landing');
  const [currentSection, setCurrentSection] = useState<NavSection>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  // App Data State
  const [waterBodies, setWaterBodies] = useState<WaterBody[]>([]);
  const [selectedWaterBody, setSelectedWaterBody] = useState<WaterBody | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [wasteDetections, setWasteDetections] = useState<WasteAnalysisRecord[]>([]);
  const [agents, setAgents] = useState<AgentNodeInfo[]>([]);
  const [riskResult, setRiskResult] = useState<RiskAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load Initial Data from ApiService
  useEffect(() => {
    async function loadData() {
      try {
        const [wBodies, alertData, wasteData, agentData, riskData] = await Promise.all([
          ApiService.getWaterBodies(),
          ApiService.getAlerts(),
          ApiService.getWasteDetections(),
          ApiService.getAgentNodes(),
          ApiService.getRiskAnalysis(),
        ]);

        setWaterBodies(wBodies);
        setSelectedWaterBody(wBodies[0]);
        setAlerts(alertData);
        setWasteDetections(wasteData);
        setAgents(agentData);
        setRiskResult(riskData);
      } catch (err) {
        console.error('Failed to initialize environmental datasets:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleReviewAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isReviewed: true } : a))
    );
    showToast('Alert marked as reviewed by environmental operator');
  };

  const handleResolveAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
    showToast('Alert resolved and logged in historical remediation audit');
  };

  const handleNewAnalysis = async (
    imageUrl: string,
    location: string
  ): Promise<WasteAnalysisRecord> => {
    const newRecord = await ApiService.analyzeWaterImage(imageUrl, location);
    setWasteDetections((prev) => [newRecord, ...prev]);
    showToast(`AI inference complete: ${newRecord.objectsCount} debris items classified.`);
    return newRecord;
  };

  // Section Header Configuration
  const getSectionMetadata = (section: NavSection) => {
    switch (section) {
      case 'dashboard':
        return {
          title: 'Autonomous Environmental Dashboard',
          subtitle: 'Real-time telemetry, predictive risk assessments, and multi-agent directives',
        };
      case 'water-bodies':
        return {
          title: 'Monitored Water Ecosystems',
          subtitle: 'Active lake stations, catchment basins, and continuous sonde profiles',
        };
      case 'water-quality':
        return {
          title: 'Water Quality Intelligence',
          subtitle: 'Multi-parameter physicochemical telemetry with automated drift analysis',
        };
      case 'waste-detection':
        return {
          title: 'AI Waste Detection Studio',
          subtitle: 'Edge computer vision object detection and optical debris classification',
        };
      case 'dataset-model':
        return {
          title: 'Dataset & Model Engineering Hub',
          subtitle: 'Benchmark datasets, class distributions, model metrics, and quality control',
        };
      case 'risk-analysis':
        return {
          title: 'AI Environmental Risk Analysis',
          subtitle: 'Multi-agent Bayesian synthesis with observed, predicted, and recommended states',
        };
      case 'analytics':
        return {
          title: 'Longitudinal Trend Intelligence',
          subtitle: 'Multi-season hydrological correlation and environmental shift curves',
        };
      case 'alerts':
        return {
          title: 'Environmental Alert Center',
          subtitle: 'Threshold breach surveillance, critical incidents, and patrol dispatch',
        };
      case 'reports':
        return {
          title: 'Regulatory Reports & Dossiers',
          subtitle: 'Generate and export certified environmental audit summaries',
        };
      case 'settings':
        return {
          title: 'Platform Calibration & Weights',
          subtitle: 'Configure IoT sample intervals, model sensitivity, and decision rules',
        };
      case 'about':
        return {
          title: 'About AQUA INTELLIGENCE',
          subtitle: 'Academic research specification, architecture documentation, and system credits',
        };
      default:
        return {
          title: 'AQUA INTELLIGENCE',
          subtitle: 'Autonomous Water Intelligence & Decision Support System',
        };
    }
  };

  // 1. Landing Page View
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onEnterApp={() => setViewMode('app')}
          onOpenLogin={() => setViewMode('login')}
          onRunDemo={() => setIsDemoModalOpen(true)}
        />
        <SystemDemonstrationModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
          onNavigateSection={(sec) => {
            setViewMode('app');
            setCurrentSection(sec as NavSection);
          }}
        />
      </>
    );
  }

  // 2. Login Page View
  if (viewMode === 'login') {
    return (
      <>
        <LoginPage
          onLoginSuccess={() => setViewMode('app')}
          onBackToLanding={() => setViewMode('landing')}
        />
        <SystemDemonstrationModal
          isOpen={isDemoModalOpen}
          onClose={() => setIsDemoModalOpen(false)}
        />
      </>
    );
  }

  // 3. Authenticated App Shell View
  if (isLoading || !selectedWaterBody || !riskResult) {
    return (
      <div className="min-h-screen bg-[#061826] flex flex-col items-center justify-center p-4">
        <WaterBackground intensity="deep" />
        <div className="relative z-10 p-6 rounded-3xl bg-[#09263A]/90 border border-[#13A8A8] shadow-2xl flex flex-col items-center space-y-3">
          <div className="w-10 h-10 border-3 border-[#28D7D7] border-t-transparent rounded-full animate-spin" />
          <div className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Initializing Aqua Intelligence Engine...
          </div>
          <p className="text-xs text-slate-400">
            Calibrating Sonde Ingestion Array & Pre-loading YOLOv8 Object Weights
          </p>
        </div>
      </div>
    );
  }

  const { title, subtitle } = getSectionMetadata(currentSection);

  return (
    <div className="min-h-screen bg-[#061826] text-slate-100 flex flex-col antialiased selection:bg-[#13A8A8]/30 selection:text-[#28D7D7] relative overflow-x-hidden">
      {/* Dynamic Aquatic Visualizer Canvas Layer */}
      <WaterBackground intensity="subtle" />

      {/* Floating Action Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-[#09263A] border border-[#28D7D7] shadow-2xl text-xs text-white flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-[#28D7D7] animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Persistent Collapsible Navigation Sidebar */}
        <Sidebar
          currentSection={currentSection}
          onSelectSection={(sec) => setCurrentSection(sec)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          unreadAlertsCount={alerts.filter((a) => !a.isReviewed).length}
          onRunDemo={() => setIsDemoModalOpen(true)}
        />

        {/* Main Application Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
          {/* Top Universal Header */}
          <Header
            title={title}
            subtitle={subtitle}
            alerts={alerts}
            onOpenAlerts={() => setCurrentSection('alerts')}
            onRunDemo={() => setIsDemoModalOpen(true)}
            onLogout={() => setViewMode('landing')}
          />

          {/* Active View Container */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentSection === 'dashboard' && (
              <DashboardView
                waterBodies={waterBodies}
                alerts={alerts}
                wasteDetections={wasteDetections}
                selectedWaterBody={selectedWaterBody}
                onSelectWaterBody={(wb) => setSelectedWaterBody(wb)}
                onNavigateSection={(sec) => setCurrentSection(sec)}
                onRunDemo={() => setIsDemoModalOpen(true)}
                onReviewAlert={handleReviewAlert}
              />
            )}

            {currentSection === 'water-bodies' && (
              <WaterBodiesView
                waterBodies={waterBodies}
                selectedWaterBody={selectedWaterBody}
                onSelectWaterBody={(wb) => setSelectedWaterBody(wb)}
                onNavigateSection={(sec) => setCurrentSection(sec)}
              />
            )}

            {currentSection === 'water-quality' && (
              <WaterQualityView
                waterBodies={waterBodies}
                selectedWaterBody={selectedWaterBody}
                onSelectWaterBody={(wb) => setSelectedWaterBody(wb)}
              />
            )}

            {currentSection === 'waste-detection' && (
              <WasteDetectionView
                detectionHistory={wasteDetections}
                onNewAnalysis={handleNewAnalysis}
                onOpenDatasetHub={() => setCurrentSection('dataset-model')}
              />
            )}

            {currentSection === 'dataset-model' && (
              <DatasetModelView />
            )}

            {currentSection === 'risk-analysis' && (
              <RiskAnalysisView
                agents={agents}
                riskResult={riskResult}
                selectedWaterBody={selectedWaterBody}
              />
            )}

            {currentSection === 'analytics' && (
              <AnalyticsView
                waterBodies={waterBodies}
                selectedWaterBody={selectedWaterBody}
              />
            )}

            {currentSection === 'alerts' && (
              <AlertsView
                alerts={alerts}
                onReviewAlert={handleReviewAlert}
                onResolveAlert={handleResolveAlert}
              />
            )}

            {currentSection === 'reports' && (
              <ReportsView
                waterBodies={waterBodies}
                selectedWaterBody={selectedWaterBody}
              />
            )}

            {currentSection === 'settings' && <SettingsView />}

            {currentSection === 'about' && <AboutView />}
          </main>
        </div>
      </div>

      {/* Guided 5-Step System Demonstration Modal */}
      <SystemDemonstrationModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onNavigateSection={(sec) => {
          setCurrentSection(sec as NavSection);
          setIsDemoModalOpen(false);
        }}
      />
    </div>
  );
}
