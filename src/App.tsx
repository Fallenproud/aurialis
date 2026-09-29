import React, { useState } from 'react';
import { PageTab, LayoutVariation, VoicePersona, VoiceAgent } from './types';
import { VOICE_PERSONAS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { WorkstationStudio } from './components/WorkstationStudio';
import { AgentsFleet } from './components/AgentsFleet';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ArchitectureDocs } from './components/ArchitectureDocs';
import { QuickCallModal } from './components/QuickCallModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [layoutVariation, setLayoutVariation] = useState<LayoutVariation>('enterprise');
  const [quickDemoPersona, setQuickDemoPersona] = useState<VoicePersona | null>(null);
  const [selectedStudioPersona, setSelectedStudioPersona] = useState<VoicePersona>(VOICE_PERSONAS[0]);

  const handleOpenQuickDemo = (persona?: VoicePersona) => {
    setQuickDemoPersona(persona || VOICE_PERSONAS[0]);
  };

  const handleSelectAgentForStudio = (agent: VoiceAgent) => {
    const matchedPersona = VOICE_PERSONAS.find((p) => p.name === agent.persona) || VOICE_PERSONAS[0];
    setSelectedStudioPersona(matchedPersona);
    setActiveTab('workstation');
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Universal Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        layoutVariation={layoutVariation}
        onLayoutChange={setLayoutVariation}
        onOpenQuickDemo={() => handleOpenQuickDemo(selectedStudioPersona)}
      />

      {/* Main Content Area */}
      <main className="w-full">
        {activeTab === 'overview' && (
          <LandingPage
            onNavigateTab={setActiveTab}
            layoutVariation={layoutVariation}
            onOpenQuickDemo={handleOpenQuickDemo}
          />
        )}

        {activeTab === 'workstation' && (
          <WorkstationStudio
            initialPersona={selectedStudioPersona}
          />
        )}

        {activeTab === 'agents' && (
          <AgentsFleet
            onSelectAgentForStudio={handleSelectAgentForStudio}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsDashboard />
        )}

        {(activeTab === 'architecture' || activeTab === 'pricing') && (
          <ArchitectureDocs />
        )}
      </main>

      {/* Quick Simulate Live Call Modal */}
      {quickDemoPersona && (
        <QuickCallModal
          persona={quickDemoPersona}
          onClose={() => setQuickDemoPersona(null)}
        />
      )}

    </div>
  );
}
