import React from 'react';
import { 
  AudioWaveform, 
  Terminal, 
  Bot, 
  BarChart3, 
  Cpu, 
  Layers, 
  PhoneCall, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { PageTab, LayoutVariation } from '../types';

interface NavbarProps {
  activeTab: PageTab;
  onTabChange: (tab: PageTab) => void;
  layoutVariation: LayoutVariation;
  onLayoutChange: (layout: LayoutVariation) => void;
  onOpenQuickDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  layoutVariation,
  onLayoutChange,
  onOpenQuickDemo
}) => {
  const [showLayoutMenu, setShowLayoutMenu] = React.useState(false);

  const tabs: Array<{ id: PageTab; label: string; icon: React.ReactNode }> = [
    { id: 'overview', label: 'Platform', icon: <AudioWaveform className="w-4 h-4" /> },
    { id: 'workstation', label: 'Workstation Studio', icon: <Terminal className="w-4 h-4" /> },
    { id: 'agents', label: 'Agent Fleet', icon: <Bot className="w-4 h-4" /> },
    { id: 'analytics', label: 'Observability', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'architecture', label: 'Pipeline & SDK', icon: <Cpu className="w-4 h-4" /> },
  ];

  const layoutNames: Record<LayoutVariation, string> = {
    enterprise: 'Enterprise Master',
    asymmetrical: 'Precision Asymmetrical',
    'glassy-transparent': 'Enhanced Glassy UI',
    'minimal-signoff': 'Minimal Sign-off'
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07090e]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('overview')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/25 ring-1 ring-white/20">
              <AudioWaveform className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tight text-white font-mono">AURALIS</span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Infra
                </span>
              </div>
              <div className="hidden sm:flex items-center space-x-1.5 text-[11px] text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>Global Edge: <strong className="text-emerald-400 font-mono">38ms P50</strong></span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 bg-white/[0.03] p-1 rounded-xl border border-white/5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={isActive ? 'text-cyan-400' : 'text-slate-500'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons & Layout Switcher */}
          <div className="flex items-center space-x-2.5">
            
            {/* Layout Variant Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLayoutMenu(!showLayoutMenu)}
                className="hidden lg:flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:border-cyan-500/40 transition-colors"
                title="Switch between the exported Stitch design variations"
              >
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>{layoutNames[layoutVariation]}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLayoutMenu && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 shadow-2xl p-1.5 z-50 text-xs">
                  <div className="px-2.5 py-1.5 text-[10px] uppercase font-semibold text-slate-400 border-b border-white/5 mb-1">
                    Stitch Design Export Variants
                  </div>
                  {(Object.keys(layoutNames) as LayoutVariation[]).map((variantKey) => (
                    <button
                      key={variantKey}
                      onClick={() => {
                        onLayoutChange(variantKey);
                        setShowLayoutMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-lg flex items-center justify-between transition-colors ${
                        layoutVariation === variantKey
                          ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <span>{layoutNames[variantKey]}</span>
                      {layoutVariation === variantKey && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Live Call test button */}
            <button
              onClick={onOpenQuickDemo}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/25 transition-all transform active:scale-95"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Simulate Call</span>
            </button>

            {/* Workstation direct launcher */}
            <button
              onClick={() => onTabChange('workstation')}
              className="hidden sm:flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Studio</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
