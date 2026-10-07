import React from 'react';
import {
  LayoutDashboard,
  Waves,
  Activity,
  ScanEye,
  Database,
  GitFork,
  BarChart3,
  Bell,
  FileText,
  Settings,
  Info,
  PlayCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export type NavSection =
  | 'dashboard'
  | 'water-bodies'
  | 'water-quality'
  | 'waste-detection'
  | 'dataset-model'
  | 'risk-analysis'
  | 'analytics'
  | 'alerts'
  | 'reports'
  | 'settings'
  | 'about';

interface SidebarProps {
  currentSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadAlertsCount: number;
  onRunDemo: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  collapsed,
  onToggleCollapse,
  unreadAlertsCount,
  onRunDemo,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'water-bodies', label: 'Water Bodies', icon: Waves },
    { id: 'water-quality', label: 'Water Quality', icon: Activity },
    { id: 'waste-detection', label: 'Waste Detection', icon: ScanEye, highlight: true },
    { id: 'dataset-model', label: 'Dataset & Model Hub', icon: Database },
    { id: 'risk-analysis', label: 'AI Risk Analysis', icon: GitFork },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About the Project', icon: Info },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-[#061826] border-r border-[#0B5E75]/30 flex flex-col transition-all duration-300 select-none ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-18 flex items-center justify-between px-4 border-b border-[#0B5E75]/25 bg-[#051420]">
        {!collapsed ? (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#13A8A8] to-[#0B5E75] flex items-center justify-center text-white shadow-lg shadow-[#13A8A8]/20 border border-[#28D7D7]/40 flex-shrink-0">
              <Waves className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-sm tracking-wider text-white uppercase font-mono">
                AQUA INTELLIGENCE
              </span>
              <span className="text-[10px] text-[#28D7D7] tracking-tight font-medium truncate">
                Autonomous Decision Support
              </span>
            </div>
          </div>
        ) : (
          <div className="mx-auto w-9 h-9 rounded-xl bg-gradient-to-br from-[#13A8A8] to-[#0B5E75] flex items-center justify-center text-white shadow-lg shadow-[#13A8A8]/20 border border-[#28D7D7]/40">
            <Waves className="w-5 h-5 text-white" />
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#0B5E75]/30 transition-colors"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Quick Demonstration CTA */}
      <div className="p-3 border-b border-[#0B5E75]/20">
        <button
          onClick={onRunDemo}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center p-2.5' : 'gap-2.5 px-3 py-2'
          } rounded-xl bg-gradient-to-r from-[#0B5E75] to-[#13A8A8] hover:from-[#13A8A8] hover:to-[#28D7D7] text-white font-medium text-xs shadow-md shadow-[#13A8A8]/20 transition-all group`}
          title="Run System Demonstration"
        >
          <PlayCircle className="w-4 h-4 text-[#EAF9F8] group-hover:scale-110 transition-transform flex-shrink-0" />
          {!collapsed && (
            <div className="text-left flex flex-col">
              <span className="font-semibold text-white">System Demo</span>
              <span className="text-[10px] text-[#EAF9F8]/80">Run Academic Evaluation</span>
            </div>
          )}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id as NavSection)}
              className={`w-full flex items-center ${
                collapsed ? 'justify-center px-2 py-2.5' : 'gap-3 px-3 py-2.5'
              } rounded-xl text-xs font-medium transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#0B5E75]/80 to-[#13A8A8]/40 text-white border border-[#13A8A8]/40 shadow-md shadow-black/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-[#09263A]/70'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-4 h-4 flex-shrink-0 transition-colors ${
                  isActive ? 'text-[#28D7D7]' : 'text-slate-400 group-hover:text-[#28D7D7]'
                }`}
              />

              {!collapsed && (
                <span className="truncate flex-1 text-left tracking-wide">
                  {item.label}
                </span>
              )}

              {item.badge !== undefined && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold bg-amber-500 text-[#061826] ${
                    collapsed ? 'absolute top-1 right-1 w-2 h-2 p-0' : ''
                  }`}
                >
                  {!collapsed && item.badge}
                </span>
              )}

              {item.highlight && !collapsed && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#13A8A8]/20 text-[#28D7D7] border border-[#13A8A8]/30">
                  CV
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Status Block */}
      <div className="p-3 border-t border-[#0B5E75]/25 bg-[#051420]">
        {!collapsed ? (
          <div className="p-2.5 rounded-xl bg-[#09263A]/80 border border-[#0B5E75]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white tracking-wide">AI Engine</span>
                <span className="text-[10px] text-emerald-400 font-mono">Online • 91.4% Conf</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-slate-400">v2.4</div>
          </div>
        ) : (
          <div className="flex justify-center p-2" title="AI Engine Online">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
