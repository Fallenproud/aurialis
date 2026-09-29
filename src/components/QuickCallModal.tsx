import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  X, 
  Send, 
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { VoicePersona } from '../types';
import { WaveformVisualizer } from './WaveformVisualizer';
import { speakSampleText, stopSpeaking, playChime } from '../utils/audioSynth';

interface QuickCallModalProps {
  persona: VoicePersona;
  onClose: () => void;
}

export const QuickCallModal: React.FC<QuickCallModalProps> = ({ persona, onClose }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [inputText, setInputText] = useState('');
  const [transcript, setTranscript] = useState<Array<{ sender: 'agent' | 'user'; text: string; ms?: number }>>([
    {
      sender: 'agent',
      text: `Hello, this is ${persona.name} on the Auralis ultra-low latency line. How can I help you today?`,
      ms: persona.latencyMs
    }
  ]);

  useEffect(() => {
    // Play initial connect tone and speak greeting
    playChime(640, 'triangle', 0.2);
    setIsSpeaking(true);
    speakSampleText(
      transcript[0].text,
      persona.gender,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );

    const interval = setInterval(() => {
      setCallDuration((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
      stopSpeaking();
    };
  }, []);

  const handleSendPrompt = (text: string) => {
    if (!text.trim()) return;

    setTranscript((prev) => [...prev, { sender: 'user', text: text.trim() }]);
    setInputText('');

    setTimeout(() => {
      let reply = `Confirmed. Routing your request "${text.slice(0, 35)}..." through the ${persona.role} pipeline. Everything is synchronized.`;
      if (text.toLowerCase().includes('wire') || text.toLowerCase().includes('transfer')) {
        reply = `Your transfer of $45,000 has been verified and settled. Reference code TX-88902 is stored in your audit log.`;
      } else if (text.toLowerCase().includes('latency') || text.toLowerCase().includes('speed')) {
        reply = `Current speech-to-speech roundtrip is 38 milliseconds. Instant interruption ducking is active.`;
      }

      setTranscript((prev) => [
        ...prev,
        { sender: 'agent', text: reply, ms: persona.latencyMs + Math.floor(Math.random() * 4) }
      ]);

      setIsSpeaking(true);
      speakSampleText(
        reply,
        persona.gender,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }, persona.latencyMs + 50);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/30 p-6 shadow-2xl relative overflow-hidden ring-1 ring-cyan-500/20">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <img 
              src={persona.avatarUrl} 
              alt={persona.name} 
              className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/40" 
            />
            <div>
              <h3 className="font-bold text-sm text-white flex items-center space-x-2">
                <span>{persona.name}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </h3>
              <div className="text-[11px] text-slate-400 font-mono">
                {persona.role} &bull; <strong className="text-emerald-400">{formatTimer(callDuration)}</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              playChime(380, 'sine', 0.2);
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Audio Waveform */}
        <div className="my-4 bg-slate-950/90 rounded-2xl p-4 border border-white/10">
          <div className="flex items-center justify-between text-[11px] font-mono mb-2 text-slate-400">
            <span className="flex items-center space-x-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Voice Latency: <strong className="text-cyan-300">{persona.latencyMs}ms</strong></span>
            </span>
            <span className="text-emerald-400">RTP Opus 24kHz</span>
          </div>

          <WaveformVisualizer
            isActive={isSpeaking}
            color={persona.gender === 'female' ? 'cyan' : 'emerald'}
            height={48}
            barsCount={40}
            className="bg-slate-900/40 p-2"
          />
        </div>

        {/* Transcript Area */}
        <div className="h-48 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-slate-950/60 border border-white/5 text-xs">
          {transcript.map((item, idx) => (
            <div
              key={idx}
              className={`p-2.5 rounded-xl leading-relaxed ${
                item.sender === 'agent'
                  ? 'bg-slate-900/90 border border-white/10 text-slate-200'
                  : 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-100 ml-8 text-right'
              }`}
            >
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-0.5">
                <span>{item.sender === 'agent' ? persona.name : 'You'}</span>
                {item.ms && <span className="text-emerald-400">{item.ms}ms</span>}
              </div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Quick prompt injection buttons */}
        <div className="my-3 flex flex-wrap gap-1.5">
          {[
            'Verify wire status of $45,000',
            'What is your latency right now?',
            'File a credit dispute'
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendPrompt(prompt)}
              className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/15 text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendPrompt(inputText);
          }}
          className="flex items-center space-x-2 pt-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your message to speak..."
            className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center space-x-1"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>

        {/* Hang Up Action Button */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Audio Channel</span>
          </div>

          <button
            onClick={() => {
              stopSpeaking();
              playChime(380, 'sine', 0.2);
              onClose();
            }}
            className="px-4 py-1.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-lg shadow-red-500/20 transition-all"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Call</span>
          </button>
        </div>

      </div>
    </div>
  );
};
