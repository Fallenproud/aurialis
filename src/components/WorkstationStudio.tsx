import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Settings2, 
  Zap, 
  Activity, 
  Volume2, 
  RotateCcw, 
  Send, 
  Sliders, 
  Code2, 
  CheckCircle2, 
  Sparkles,
  Radio,
  FileText,
  Terminal
} from 'lucide-react';
import { VoicePersona, VoiceAgent } from '../types';
import { VOICE_PERSONAS } from '../data/mockData';
import { WaveformVisualizer } from './WaveformVisualizer';
import { speakSampleText, stopSpeaking, playChime } from '../utils/audioSynth';

interface WorkstationStudioProps {
  initialPersona?: VoicePersona;
}

interface ChatTurn {
  id: string;
  speaker: 'user' | 'agent';
  text: string;
  timestamp: string;
  latencyMs?: number;
  tokensCount?: number;
}

export const WorkstationStudio: React.FC<WorkstationStudioProps> = ({
  initialPersona
}) => {
  const [selectedPersona, setSelectedPersona] = useState<VoicePersona>(
    initialPersona || VOICE_PERSONAS[0]
  );
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [isAgentSpeaking, setIsAgentSpeaking] = useState<boolean>(false);
  const [userInputText, setUserInputText] = useState<string>('');
  const [callDuration, setCallDuration] = useState<number>(0);

  // Agent Tuning Parameters
  const [selectedModel, setSelectedModel] = useState<string>('auralis-stream-voice-v2.5');
  const [latencyMode, setLatencyMode] = useState<'aggressive' | 'balanced' | 'expressive'>('aggressive');
  const [interruptionThreshold, setInterruptionThreshold] = useState<number>(15);
  const [temperature, setTemperature] = useState<number>(0.4);
  const [systemPrompt, setSystemPrompt] = useState<string>(
    `You are ${selectedPersona.name}, an ultra-responsive enterprise voice assistant. Maintain natural conversational pacing, acknowledge user statements in sub-40ms, and keep answers concise and professional.`
  );

  // Conversation turns
  const [conversation, setConversation] = useState<ChatTurn[]>([
    {
      id: '1',
      speaker: 'agent',
      text: `Hello, this is ${selectedPersona.name} on the Auralis low-latency voice pipeline. I am ready to process requests or simulate your customer workflow. How can I assist?`,
      timestamp: '00:01',
      latencyMs: selectedPersona.latencyMs,
      tokensCount: 32
    }
  ]);

  // Duration timer when call is active
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  // Update prompt on persona switch
  useEffect(() => {
    setSystemPrompt(
      `You are ${selectedPersona.name}, an ultra-responsive enterprise voice assistant specializing in ${selectedPersona.role}. Maintain natural conversational pacing and sub-40ms response latency.`
    );
  }, [selectedPersona]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleCall = () => {
    if (isCallActive) {
      playChime(380, 'sine', 0.2);
      stopSpeaking();
      setIsCallActive(false);
      setIsAgentSpeaking(false);
    } else {
      playChime(640, 'triangle', 0.15);
      setIsCallActive(true);
      const greeting = `Session established with ${selectedPersona.name}. Audio RTP stream active at 24kHz Opus. What would you like to test?`;
      
      const newTurn: ChatTurn = {
        id: Date.now().toString(),
        speaker: 'agent',
        text: greeting,
        timestamp: formatDuration(callDuration),
        latencyMs: selectedPersona.latencyMs,
        tokensCount: 28
      };

      setConversation([newTurn]);
      setIsAgentSpeaking(true);
      speakSampleText(
        greeting,
        selectedPersona.gender,
        () => setIsAgentSpeaking(true),
        () => setIsAgentSpeaking(false)
      );
    }
  };

  const handleSendUtterance = (text: string) => {
    if (!text.trim()) return;

    const userTurn: ChatTurn = {
      id: Date.now().toString(),
      speaker: 'user',
      text: text.trim(),
      timestamp: formatDuration(callDuration)
    };

    setConversation((prev) => [...prev, userTurn]);
    setUserInputText('');

    // Generate responsive contextual AI reply
    setTimeout(() => {
      let agentReply = '';
      const lower = text.toLowerCase();

      if (lower.includes('transfer') || lower.includes('wire') || lower.includes('money') || lower.includes('balance')) {
        agentReply = `I have verified the ledger transaction. The outbound wire of $45,000 has cleared with verification hash #TX-9982. Would you like a receipt dispatched?`;
      } else if (lower.includes('latency') || lower.includes('speed') || lower.includes('fast') || lower.includes('ms')) {
        agentReply = `Current roundtrip latency: 38ms TTFB. Speech-to-Text took 28ms, and neural Opus voice synthesis began in 10ms.`;
      } else if (lower.includes('dispute') || lower.includes('fraud') || lower.includes('charge')) {
        agentReply = `I have logged the unauthorized transaction dispute. The physical card is temporarily locked and a provisional credit has been scheduled.`;
      } else if (lower.includes('schedule') || lower.includes('doctor') || lower.includes('appointment')) {
        agentReply = `I have verified availability for Thursday at nine-thirty AM with Dr. Sofia Reyes. I have placed a provisional calendar hold.`;
      } else {
        agentReply = `Understood. Processing your input "${text.slice(0, 40)}..." through the Auralis speculative streaming router. Response synthesized in ${selectedPersona.latencyMs} milliseconds.`;
      }

      const agentTurn: ChatTurn = {
        id: (Date.now() + 1).toString(),
        speaker: 'agent',
        text: agentReply,
        timestamp: formatDuration(callDuration + 1),
        latencyMs: selectedPersona.latencyMs + Math.floor(Math.random() * 6 - 3),
        tokensCount: agentReply.split(' ').length
      };

      setConversation((prev) => [...prev, agentTurn]);
      setIsAgentSpeaking(true);

      speakSampleText(
        agentReply,
        selectedPersona.gender,
        () => setIsAgentSpeaking(true),
        () => setIsAgentSpeaking(false)
      );
    }, selectedPersona.latencyMs + 50);
  };

  const samplePrompts = [
    'Verify wire status of $45,000 to Meridian Capital',
    'What is your current end-to-end voice latency?',
    'I want to dispute an unrecognized card charge',
    'Schedule follow-up telehealth appointment'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>Real-time Voice Telephony Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Auralis Workstation Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate live calls, benchmark packet-by-packet audio streaming, and calibrate interruption thresholds.
          </p>
        </div>

        {/* Global Live Session Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-900 px-3.5 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`}></span>
            <span className="text-slate-300">
              {isCallActive ? `Live Session: ${formatDuration(callDuration)}` : 'Standby / Idle'}
            </span>
          </div>

          <button
            onClick={handleToggleCall}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center space-x-2 shadow-lg transition-all transform active:scale-95 ${
              isCallActive
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25'
            }`}
          >
            {isCallActive ? (
              <>
                <PhoneOff className="w-4 h-4" />
                <span>Disconnect Call</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-4 h-4" />
                <span>Initiate Call Test</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Telemetry & Live Call Console + Right Config Rail */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Live Call Stage & Conversation Transcript (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Audio Telemetry Stage & Waveform Monitor */}
          <div className="rounded-2xl glass-panel border border-white/10 p-5 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono text-slate-400">
              <div className="flex items-center space-x-2">
                <Radio className={`w-3.5 h-3.5 ${isCallActive ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                <span>Egress Channel: {isCallActive ? 'RTP Opus Direct' : 'Inactive'}</span>
              </div>
              <div className="flex items-center space-x-3 text-[11px]">
                <span>P50: <strong className="text-cyan-400">{selectedPersona.latencyMs}ms</strong></span>
                <span>Jitter: <strong className="text-slate-200">1.2ms</strong></span>
                <span>Loss: <strong className="text-emerald-400">0.0%</strong></span>
              </div>
            </div>

            {/* Main Interactive Waveform Display */}
            <div className="my-4 bg-slate-950/90 rounded-xl p-4 border border-white/5 relative">
              <div className="flex items-center justify-between mb-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${isAgentSpeaking ? 'bg-cyan-400 animate-ping' : 'bg-slate-700'}`}></div>
                  <span className="font-semibold text-slate-200 font-mono">
                    {selectedPersona.name} ({selectedPersona.role})
                  </span>
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {isAgentSpeaking ? 'Active Speech Stream...' : isCallActive ? 'Listening for speech...' : 'Click "Initiate Call Test"'}
                </div>
              </div>

              <WaveformVisualizer
                isActive={isAgentSpeaking}
                color={selectedPersona.gender === 'female' ? 'cyan' : 'emerald'}
                height={64}
                barsCount={60}
                className="bg-slate-900/40 p-2"
              />

              {/* In-Call Quick Controls */}
              <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsMicMuted(!isMicMuted)}
                    className={`p-2 rounded-lg text-xs font-medium border flex items-center space-x-1.5 transition-colors ${
                      isMicMuted
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                    title="Mute microphone simulation"
                  >
                    {isMicMuted ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{isMicMuted ? 'Muted' : 'Mic Active'}</span>
                  </button>

                  <button
                    onClick={() => {
                      stopSpeaking();
                      setIsAgentSpeaking(false);
                      playChime(420, 'sine', 0.1);
                    }}
                    className="p-2 rounded-lg text-xs font-medium bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 flex items-center space-x-1.5 transition-colors"
                    title="Simulate user interrupting agent while speaking"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Trigger Ducking / Interruption</span>
                  </button>
                </div>

                <div className="text-[11px] text-slate-500 font-mono">
                  Sample Rate: 24,000 Hz
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Conversation Transcript Stream */}
          <div className="rounded-2xl glass-panel border border-white/10 p-5 shadow-xl flex flex-col h-[400px]">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center space-x-2 text-xs font-semibold text-slate-300">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Live Transcript Stream</span>
              </div>
              <button
                onClick={() => setConversation([])}
                className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center space-x-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Transcript</span>
              </button>
            </div>

            {/* Scrollable Conversation Container */}
            <div className="flex-1 overflow-y-auto space-y-3.5 py-4 pr-1">
              {conversation.length === 0 ? (
                <div className="h-full flex items-center justify-center text-xs text-slate-500 italic">
                  Transcript is empty. Speak or click a sample prompt below to start.
                </div>
              ) : (
                conversation.map((turn) => {
                  const isAgent = turn.speaker === 'agent';
                  return (
                    <div
                      key={turn.id}
                      className={`flex items-start space-x-3 ${isAgent ? '' : 'justify-end'}`}
                    >
                      {isAgent && (
                        <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-[10px] font-bold text-cyan-300 shrink-0">
                          AI
                        </div>
                      )}

                      <div
                        className={`max-w-[80%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          isAgent
                            ? 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-sm'
                            : 'bg-gradient-to-r from-cyan-600/30 to-blue-600/30 border border-cyan-500/30 text-cyan-100 rounded-tr-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-slate-400 font-mono">
                          <span>{isAgent ? selectedPersona.name : 'You (Caller)'}</span>
                          <div className="flex items-center space-x-2">
                            {turn.latencyMs && (
                              <span className="text-emerald-400 font-semibold">{turn.latencyMs}ms</span>
                            )}
                            <span>{turn.timestamp}</span>
                          </div>
                        </div>
                        <p>{turn.text}</p>
                      </div>

                      {!isAgent && (
                        <div className="w-7 h-7 rounded-lg bg-slate-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300 shrink-0">
                          ME
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Quick Prompt Injection Pills */}
            <div className="pt-2 pb-2">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1.5 font-semibold">
                Quick Speech Injections (Click to simulate speaking):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {samplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (!isCallActive) setIsCallActive(true);
                      handleSendUtterance(prompt);
                    }}
                    className="px-2.5 py-1 rounded-md text-[11px] bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 border border-white/5 transition-all text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isCallActive) setIsCallActive(true);
                handleSendUtterance(userInputText);
              }}
              className="mt-2 flex items-center space-x-2 pt-2 border-t border-white/10"
            >
              <input
                type="text"
                value={userInputText}
                onChange={(e) => setUserInputText(e.target.value)}
                placeholder="Type what you want to say to the voice agent (e.g. 'Can you verify my wire?')..."
                className="flex-1 bg-slate-950/80 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/60"
              />
              <button
                type="submit"
                disabled={!userInputText.trim()}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-slate-950 font-semibold text-xs flex items-center space-x-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Speak</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Agent Configuration & Tuning Inspector (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="rounded-2xl glass-panel border border-white/10 p-5 shadow-xl">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/10 text-xs font-semibold text-slate-200">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Voice Agent Configuration</span>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              
              {/* Persona Selector */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Voice Persona
                </label>
                <select
                  value={selectedPersona.id}
                  onChange={(e) => {
                    const p = VOICE_PERSONAS.find((item) => item.id === e.target.value);
                    if (p) setSelectedPersona(p);
                  }}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {VOICE_PERSONAS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — {p.role} ({p.latencyMs}ms)
                    </option>
                  ))}
                </select>
              </div>

              {/* Model Choice */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Streaming LLM Backbone
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="auralis-stream-voice-v2.5">auralis-stream-voice-v2.5 (35ms TTFB)</option>
                  <option value="auralis-omni-v3-beta">auralis-omni-v3-beta (Full Multimodal)</option>
                  <option value="auralis-clinical-v1.8">auralis-clinical-v1.8 (HIPAA Trained)</option>
                </select>
              </div>

              {/* Latency Mode Selector */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Pipeline Optimization Mode
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['aggressive', 'balanced', 'expressive'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setLatencyMode(mode)}
                      className={`py-1.5 px-2 rounded-lg text-[11px] capitalize font-medium border transition-colors ${
                        latencyMode === mode
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interruption Sensitivity */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1">
                  <span>Interruption Ducking Threshold</span>
                  <span className="font-mono text-cyan-400">{interruptionThreshold} ms</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="60"
                  value={interruptionThreshold}
                  onChange={(e) => setInterruptionThreshold(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                  <span>Ultra-Aggressive (5ms)</span>
                  <span>Patient (60ms)</span>
                </div>
              </div>

              {/* Temperature */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-400 mb-1">
                  <span>Temperature (Cadence Variance)</span>
                  <span className="font-mono text-cyan-400">{temperature.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-900 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* System Prompt Editor */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  Agent Directive & Pacing
                </label>
                <textarea
                  rows={4}
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-[11px] text-slate-200 focus:outline-none focus:border-cyan-500 leading-relaxed font-mono"
                />
              </div>

              {/* Telephony Connection Credentials */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  SIP Inbound Telephony Binding
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-white/5 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                  <span>sip:inbound.aura.carrier/800412</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                    Active
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
