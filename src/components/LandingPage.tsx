import React, { useState } from 'react';
import { 
  PhoneCall, 
  Terminal, 
  ShieldCheck, 
  Cpu, 
  Zap, 
  Volume2, 
  Square, 
  Play, 
  CheckCircle2, 
  ArrowRight, 
  Network, 
  Lock, 
  Server, 
  Sparkles,
  Layers,
  Globe2,
  Gauge,
  Workflow,
  AudioWaveform
} from 'lucide-react';
import { VoicePersona, LayoutVariation, PageTab } from '../types';
import { VOICE_PERSONAS, LATENCY_BENCHMARKS } from '../data/mockData';
import { WaveformVisualizer } from './WaveformVisualizer';
import { speakSampleText, stopSpeaking } from '../utils/audioSynth';

interface LandingPageProps {
  onNavigateTab: (tab: PageTab) => void;
  layoutVariation: LayoutVariation;
  onOpenQuickDemo: (persona?: VoicePersona) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigateTab,
  layoutVariation,
  onOpenQuickDemo
}) => {
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(VOICE_PERSONAS[0]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [activeBenchmarkMetric, setActiveBenchmarkMetric] = useState<'total' | 'detailed'>('detailed');

  const handlePlayVoice = (persona: VoicePersona) => {
    setSelectedPersona(persona);
    if (isPlayingVoice) {
      stopSpeaking();
      setIsPlayingVoice(false);
      return;
    }

    setIsPlayingVoice(true);
    speakSampleText(
      persona.sampleText,
      persona.gender,
      () => setIsPlayingVoice(true),
      () => setIsPlayingVoice(false)
    );
  };

  return (
    <div className="min-h-screen text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/15 to-purple-600/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Pill - Live Status Banner */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full glass-panel border border-cyan-500/30 shadow-lg shadow-cyan-500/10 text-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium text-slate-300">
                Auralis Engine v2.5 Online &bull; <span className="text-cyan-400 font-mono font-semibold">Sub-100ms Roundtrip Voice</span>
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">Carrier Grade 99.999% SLA</span>
            </div>
          </div>

          {/* Headline & Core Value Prop */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Enterprise AI Voice Infrastructure with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300">
                Zero Human Latency.
              </span>
            </h1>
            
            <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
              Orchestrate conversational voice agents over SIP trunking and WebRTC with instant interruption handling, emotional inflection, and sub-50ms neural speech synthesis.
            </p>

            {/* Hero CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                onClick={() => onNavigateTab('workstation')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 flex items-center justify-center space-x-2 group transition-all transform active:scale-95"
              >
                <Terminal className="w-4 h-4 text-cyan-200" />
                <span>Launch Workstation Studio</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => handlePlayVoice(selectedPersona)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl glass-panel border border-white/15 hover:border-cyan-500/40 text-slate-200 hover:text-white font-medium text-sm flex items-center justify-center space-x-2 transition-all"
              >
                {isPlayingVoice ? (
                  <>
                    <Square className="w-4 h-4 text-red-400 fill-red-400" />
                    <span>Stop Speaking</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>Listen to {selectedPersona.name}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onOpenQuickDemo(selectedPersona)}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-sm flex items-center justify-center space-x-2 transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Simulate Live Call</span>
              </button>
            </div>
          </div>

          {/* Interactive Voice Hero Console */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-8 relative">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
              
              {/* Persona Selector Pill Row */}
              <div>
                <span className="text-xs uppercase font-semibold tracking-wider text-slate-400 block mb-2.5">
                  Select Active Neural Voice Persona
                </span>
                <div className="flex flex-wrap gap-2">
                  {VOICE_PERSONAS.map((persona) => {
                    const isSelected = selectedPersona.id === persona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          if (isPlayingVoice) stopSpeaking();
                          setIsPlayingVoice(false);
                          setSelectedPersona(persona);
                        }}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                            : 'bg-white/5 text-slate-400 hover:text-slate-200 border border-white/5'
                        }`}
                      >
                        <img 
                          src={persona.avatarUrl} 
                          alt={persona.name} 
                          className="w-4 h-4 rounded-full object-cover" 
                        />
                        <span>{persona.name}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{persona.latencyMs}ms</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Telemetry Stats Header */}
              <div className="flex items-center space-x-4 bg-slate-950/60 px-4 py-2.5 rounded-xl border border-white/5">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Voice Latency</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono flex items-center space-x-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{selectedPersona.latencyMs} ms P50</span>
                  </div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Codec</div>
                  <div className="text-sm font-semibold text-slate-200 font-mono">Opus 24kHz</div>
                </div>
                <div className="h-6 w-px bg-white/10" />
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Packet Loss</div>
                  <div className="text-sm font-semibold text-cyan-400 font-mono">0.00%</div>
                </div>
              </div>
            </div>

            {/* Audio Waveform Canvas Box */}
            <div className="mt-6 bg-slate-950/80 rounded-xl p-4 sm:p-5 border border-white/5 relative">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs font-mono font-medium text-cyan-300">
                    {selectedPersona.name} ({selectedPersona.role})
                  </span>
                  <span className="text-[11px] text-slate-500 hidden sm:inline">&bull; {selectedPersona.accent}</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {isPlayingVoice ? 'Streaming Audio Egress...' : 'Ready for Audio Injection'}
                </div>
              </div>

              {/* Dynamic Soundwave Visualizer */}
              <WaveformVisualizer
                isActive={isPlayingVoice}
                color={selectedPersona.gender === 'female' ? 'cyan' : 'emerald'}
                height={54}
                barsCount={48}
                className="bg-slate-900/60 p-2"
              />

              {/* Dynamic Speech Text */}
              <div className="mt-4 p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-slate-300 italic leading-relaxed">
                "{selectedPersona.sampleText}"
              </div>

              {/* Playback Controls and Test Call CTA */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePlayVoice(selectedPersona)}
                    className="px-4 py-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-medium flex items-center space-x-1.5 transition-colors"
                  >
                    {isPlayingVoice ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    <span>{isPlayingVoice ? 'Stop Persona Voice' : 'Play Sample Voice'}</span>
                  </button>

                  <button
                    onClick={() => onOpenQuickDemo(selectedPersona)}
                    className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10 flex items-center space-x-1.5 transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Full Call Interactive Sim</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ducking Interruption: &lt;15ms response</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust & Enterprise Compliance Strip */}
      <section className="py-10 border-y border-white/10 bg-slate-950/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                Enterprise Regulatory Compliance
              </span>
              <h3 className="text-sm font-medium text-slate-200">
                Validated for high-security banking, healthcare, and federal telephony.
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>SOC2 Type II</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>HIPAA BAA Ready</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-cyan-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>PCI-DSS Level 1</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-blue-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                <span>ISO 27001</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
                <span>GDPR Zero-Retention</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Latency Benchmark Comparison */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-2">
              <Gauge className="w-3.5 h-3.5" />
              <span>Independent Latency Benchmarks</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why sub-100ms latency creates real human presence.
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-xl">
              Humans perceive delays above 250ms as awkward pauses. Auralis streams STT, LLM reasoning, and neural TTS in lockstep to maintain natural cadence.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-2 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveBenchmarkMetric('detailed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeBenchmarkMetric === 'detailed'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pipeline Stage Breakdown
            </button>
            <button
              onClick={() => setActiveBenchmarkMetric('total')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeBenchmarkMetric === 'total'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Total Round-trip Time
            </button>
          </div>
        </div>

        {/* Benchmark Visual Cards */}
        <div className="space-y-4">
          {LATENCY_BENCHMARKS.map((bench, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl transition-all ${
                bench.highlight
                  ? 'glass-panel border-cyan-500/50 shadow-xl shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                  : 'bg-slate-900/40 border border-white/5 hover:border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${bench.highlight ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`} />
                  <span className={`font-semibold text-sm ${bench.highlight ? 'text-white' : 'text-slate-300'}`}>
                    {bench.provider}
                  </span>
                  {bench.highlight && (
                    <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Industry Leader
                    </span>
                  )}
                </div>

                <div className="text-right font-mono">
                  <span className={`text-xl font-extrabold ${bench.highlight ? 'text-cyan-400' : 'text-slate-400'}`}>
                    {bench.totalMs} ms
                  </span>
                  <span className="text-xs text-slate-500 ml-1.5">total TTFB</span>
                </div>
              </div>

              {/* Progress bar visualizer */}
              {activeBenchmarkMetric === 'detailed' ? (
                <div>
                  <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(bench.sttMs / bench.totalMs) * 100}%` }}
                      className="bg-blue-500 h-full"
                      title={`STT: ${bench.sttMs}ms`}
                    />
                    <div
                      style={{ width: `${(bench.llmMs / bench.totalMs) * 100}%` }}
                      className="bg-indigo-500 h-full"
                      title={`LLM: ${bench.llmMs}ms`}
                    />
                    <div
                      style={{ width: `${(bench.ttsMs / bench.totalMs) * 100}%` }}
                      className="bg-cyan-400 h-full"
                      title={`TTS: ${bench.ttsMs}ms`}
                    />
                    <div
                      style={{ width: `${(bench.networkMs / bench.totalMs) * 100}%` }}
                      className="bg-emerald-400 h-full"
                      title={`Network: ${bench.networkMs}ms`}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-2 text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>STT: {bench.sttMs}ms</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                      <span>LLM: {bench.llmMs}ms</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>TTS: {bench.ttsMs}ms</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span>Network: {bench.networkMs}ms</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${Math.min((bench.totalMs / 1050) * 100, 100)}%` }}
                    className={`h-full rounded-full ${bench.highlight ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-slate-700'}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Asymmetrical Architecture Section (from auralis_precision_ai_platform_asymmetrical_layout) */}
      <section className="py-20 bg-slate-950/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
              Deep Architectural Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 6-Stage Streaming Audio Fabric
            </h2>
            <p className="mt-3 text-slate-400 text-sm">
              Traditional stacks serialize whole sentences. Auralis processes sub-phoneme audio chunks in zero-buffer pipelines with hardware WebRTC acceleration.
            </p>
          </div>

          {/* Asymmetrical 3-Column Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Stage 1 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-blue-500/30">
                01
              </div>
              <h3 className="text-base font-bold text-white mb-2">Direct SIP / WebRTC Gateway</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                32 globally distributed telephony points of presence with carrier peering to Telnyx, Twilio, and Vonage. Egress packets bypass HTTP abstractions completely.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                Latency: 6-10ms
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-indigo-500/30">
                02
              </div>
              <h3 className="text-base font-bold text-white mb-2">Sub-15ms Voice Activity Detection (VAD)</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Hardware Silero VAD coupled with adaptive noise cancellation ducks background chatter and identifies human speech onsets within 15 milliseconds.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                Interruption response: 12ms
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-purple-500/30">
                03
              </div>
              <h3 className="text-base font-bold text-white mb-2">Continuous Whisper-Turbo ASR</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Tokens stream incrementally rather than waiting for pauses. Partial hypotheses feed directly into speculative language model decoders.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                Word Error Rate: 1.8%
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-emerald-500/30">
                04
              </div>
              <h3 className="text-base font-bold text-white mb-2">Speculative LLM Agent Orchestration</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Low-latency reasoning engine with tool-calling webhooks, automated vector memory retrieval, and intent classification optimized for speech cadence.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                First token: 32ms
              </div>
            </div>

            {/* Stage 5 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-cyan-500/30">
                05
              </div>
              <h3 className="text-base font-bold text-white mb-2">Neural Vocoder Streaming Synthesis</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Synthesizes ultra-realistic breaths, vocal dynamics, and micro-inflections. Emits audio frames in 20ms chunks directly into RTP queues.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                Output: 24kHz Uncompressed
              </div>
            </div>

            {/* Stage 6 */}
            <div className="p-6 rounded-2xl glass-panel border-white/10 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-amber-500/30">
                06
              </div>
              <h3 className="text-base font-bold text-white mb-2">Immediate Ducking & Turn Takeover</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                When a user speaks during an agent response, the agent instantly stops speaking in 12ms and smoothly transitions to active listening without glitching.
              </p>
              <div className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded inline-block">
                Zero audio buffer collision
              </div>
            </div>

          </div>

          {/* Quick Action into Architecture & SDK */}
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigateTab('architecture')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl glass-panel border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-semibold shadow-lg shadow-cyan-500/10 transition-all"
            >
              <Workflow className="w-4 h-4" />
              <span>Explore Architecture Blueprint & Code SDKs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

      {/* Feature Pillars: Enterprise Voice Workstation */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Developer & Ops Workstation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Test, tune, and deploy agents in a live simulation studio.
            </h2>
            <p className="mt-4 text-slate-300 text-sm leading-relaxed">
              Eliminate guesswork. Simulate real telephony calls directly from your browser, inject background noise, tweak interruption thresholds, and monitor packet jitter in real-time.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Live Canvas Spectrogram:</strong> Monitor frequency response and speech cadence frame-by-frame.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>Interruption Sensitivity Knobs:</strong> Calibrate aggressive vs calm turn-taking policies.</span>
              </div>
              <div className="flex items-start space-x-3 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span><strong>SIP Direct Egress:</strong> Bind agents to any PSTN number with one click.</span>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-3">
              <button
                onClick={() => onNavigateTab('workstation')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch Workstation Studio</span>
              </button>
              <button
                onClick={() => onNavigateTab('agents')}
                className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-xs border border-white/10 transition-colors"
              >
                <span>View Agent Fleet</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Mockup Box */}
          <div className="rounded-2xl glass-panel border border-white/15 p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
                <span className="text-xs font-mono text-slate-400 ml-2">studio.auralis.ai/session-live</span>
              </div>
              <span className="px-2 py-0.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/60 rounded border border-emerald-500/20">
                Connected &bull; 41ms
              </span>
            </div>

            {/* Conversation Simulation Snippet */}
            <div className="mt-5 space-y-3.5 text-xs">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-[10px] text-cyan-300 shrink-0">
                  AI
                </div>
                <div className="p-3 rounded-xl rounded-tl-none bg-slate-900/90 border border-white/10 text-slate-200">
                  Hello Jonathan, this is Elena from Apex Treasury. I noticed an inbound wire notification for $45,000. Would you like me to process authorization?
                </div>
              </div>

              <div className="flex items-start space-x-3 justify-end">
                <div className="p-3 rounded-xl rounded-tr-none bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-right">
                  Yes, approve that transfer and log the compliance trace.
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center font-bold text-[10px] text-slate-200 shrink-0">
                  U
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-[10px] text-cyan-300 shrink-0">
                  AI
                </div>
                <div className="p-3 rounded-xl rounded-tl-none bg-slate-900/90 border border-white/10 text-slate-200">
                  Approved in 38ms. Transaction ID #TX-99021 confirmed with cryptographic verification hash.
                </div>
              </div>
            </div>

            {/* Waveform indicator */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                Live Egress Stream (Elena Vance)
              </div>
              <div className="w-32 h-6">
                <WaveformVisualizer isActive={true} color="cyan" height={24} barsCount={24} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Edge Map & Telephony Metrics */}
      <section className="py-16 border-t border-white/10 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-5 rounded-2xl glass-panel border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">38ms</div>
              <div className="mt-1 text-xs text-slate-400">Median Global P50 Latency</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">99.999%</div>
              <div className="mt-1 text-xs text-slate-400">Telephony Carrier SLA</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 font-mono">32</div>
              <div className="mt-1 text-xs text-slate-400">Global Edge Telephony PoPs</div>
            </div>
            <div className="p-5 rounded-2xl glass-panel border-white/5">
              <div className="text-3xl sm:text-4xl font-extrabold text-purple-400 font-mono">&gt;1.2M</div>
              <div className="mt-1 text-xs text-slate-400">Daily Voice Minutes Processed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Glassy Footer (from auralis_ai_voice_infrastructure_enhanced_glassy_ui_transparent_footer) */}
      <footer className="border-t border-white/10 bg-[#06080d]/80 backdrop-blur-2xl py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <AudioWaveform className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-wider">AURALIS AI</span>
              <span className="text-xs text-slate-400">&bull; Enterprise Precision Voice Platform</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <button onClick={() => onNavigateTab('workstation')} className="hover:text-cyan-400 transition-colors">
                Workstation Studio
              </button>
              <button onClick={() => onNavigateTab('agents')} className="hover:text-cyan-400 transition-colors">
                Agent Fleet
              </button>
              <button onClick={() => onNavigateTab('analytics')} className="hover:text-cyan-400 transition-colors">
                Call Observability
              </button>
              <button onClick={() => onNavigateTab('architecture')} className="hover:text-cyan-400 transition-colors">
                Architecture & Code SDKs
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              &copy; 2026 Auralis Inc. All rights reserved. SOC2 Type II Certified, HIPAA Compliant.
            </div>
            <div className="flex items-center space-x-4">
              <span>Status: <strong className="text-emerald-400 font-mono">All Systems Operational</strong></span>
              <span>&bull;</span>
              <span>Carrier Grade Opus 24kHz</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
