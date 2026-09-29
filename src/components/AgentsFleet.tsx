import React, { useState } from 'react';
import { 
  Bot, 
  Plus, 
  Phone, 
  Activity, 
  Clock, 
  Zap, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle, 
  Sliders, 
  Globe, 
  Trash2,
  ExternalLink,
  ShieldCheck,
  Search
} from 'lucide-react';
import { VoiceAgent, VoicePersona } from '../types';
import { VOICE_AGENTS, VOICE_PERSONAS } from '../data/mockData';

interface AgentsFleetProps {
  onSelectAgentForStudio?: (agent: VoiceAgent) => void;
}

export const AgentsFleet: React.FC<AgentsFleetProps> = ({ onSelectAgentForStudio }) => {
  const [agents, setAgents] = useState<VoiceAgent[]>(VOICE_AGENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Agent Form State
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPersona, setNewPersona] = useState(VOICE_PERSONAS[0].name);
  const [newModel, setNewModel] = useState('auralis-stream-voice-v2.5');
  const [newPhone, setNewPhone] = useState('+1 (800) 555-0199');
  const [newWebhook, setNewWebhook] = useState('https://api.yourcorp.com/v1/voice-event');

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.persona.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((agent) => {
        if (agent.id === id) {
          return {
            ...agent,
            status: agent.status === 'active' ? 'paused' : 'active'
          };
        }
        return agent;
      })
    );
  };

  const handleCreateAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const personaObj = VOICE_PERSONAS.find((p) => p.name === newPersona) || VOICE_PERSONAS[0];

    const newAgent: VoiceAgent = {
      id: `agent-${Date.now().toString().slice(-4)}`,
      name: newName.trim(),
      description: newDescription.trim() || 'Custom configured real-time conversational voice agent.',
      status: 'active',
      persona: newPersona,
      model: newModel,
      phoneNumber: newPhone,
      totalCalls: 0,
      avgDuration: '0m 00s',
      resolutionRate: 100,
      avgLatency: personaObj.latencyMs,
      webhookUrl: newWebhook,
      complianceTier: 'Enterprise SOC2',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setAgents([newAgent, ...agents]);
    setIsCreateModalOpen(false);
    setNewName('');
    setNewDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & New Agent CTA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Bot className="w-3.5 h-3.5" />
            <span>Agent Fleet Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Active Voice Agent Fleets
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor, deploy, and scale dedicated telephony voice agents across enterprise departments.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Deploy New Voice Agent</span>
        </button>
      </div>

      {/* Filters & Search Row */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, personas, or phone..."
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Status Filter buttons */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
          {(['all', 'active', 'paused'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                statusFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Agents Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => {
          const isActive = agent.status === 'active';
          return (
            <div
              key={agent.id}
              className="rounded-2xl glass-panel border border-white/10 p-5 shadow-xl hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Agent Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600/30 to-blue-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono mt-0.5">
                        <span>Persona: <strong className="text-cyan-400">{agent.persona}</strong></span>
                        <span>&bull;</span>
                        <span className="text-emerald-400 font-semibold">{agent.avgLatency}ms P50</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {agent.description}
                </p>

                {/* Metrics Matrix */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-950/80 border border-white/5 text-center mb-4">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Total Calls</div>
                    <div className="text-xs font-bold text-white font-mono mt-0.5">
                      {agent.totalCalls.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Resolution</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">
                      {agent.resolutionRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Avg Length</div>
                    <div className="text-xs font-bold text-slate-300 font-mono mt-0.5">
                      {agent.avgDuration}
                    </div>
                  </div>
                </div>

                {/* Telephony and Compliance Pill Row */}
                <div className="space-y-1.5 text-[11px] text-slate-400 font-mono">
                  {agent.phoneNumber && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>{agent.phoneNumber}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>{agent.complianceTier}</span>
                  </div>
                </div>
              </div>

              {/* Card Bottom Actions */}
              <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => toggleAgentStatus(agent.id)}
                  className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {isActive ? (
                    <>
                      <PauseCircle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Pause Agent</span>
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Activate Agent</span>
                    </>
                  )}
                </button>

                {onSelectAgentForStudio && (
                  <button
                    onClick={() => onSelectAgentForStudio(agent)}
                    className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                  >
                    <span>Open in Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deploy Agent Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl glass-panel border border-white/15 p-6 shadow-2xl relative">
            <h3 className="text-lg font-bold text-white mb-1">Deploy New Voice Agent</h3>
            <p className="text-xs text-slate-400 mb-5">
              Bind an intelligent conversational voice persona to your telephony gateway.
            </p>

            <form onSubmit={handleCreateAgent} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Agent Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. VIP Concierge & Booking Desk"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Description & Objective</label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe what this voice agent handles and its target business KPIs..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Persona</label>
                  <select
                    value={newPersona}
                    onChange={(e) => setNewPersona(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    {VOICE_PERSONAS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.latencyMs}ms)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Voice Backbone</label>
                  <select
                    value={newModel}
                    onChange={(e) => setNewModel(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="auralis-stream-voice-v2.5">auralis-stream-v2.5</option>
                    <option value="auralis-omni-v3-beta">auralis-omni-v3</option>
                    <option value="auralis-clinical-v1.8">auralis-clinical-v1.8</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Phone Number (DID / SIP Egress)</label>
                <input
                  type="text"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Turn Event Webhook URL</label>
                <input
                  type="url"
                  value={newWebhook}
                  onChange={(e) => setNewWebhook(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all shadow-lg shadow-cyan-500/20"
                >
                  Confirm & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
