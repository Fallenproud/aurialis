import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Zap, 
  PhoneCall, 
  CheckCircle2, 
  ArrowUpRight, 
  Filter, 
  Search, 
  Play, 
  FileText, 
  X,
  Volume2,
  DollarSign
} from 'lucide-react';
import { CallLog } from '../types';
import { CALL_LOGS } from '../data/mockData';

export const AnalyticsDashboard: React.FC = () => {
  const [callLogs, setCallLogs] = useState<CallLog[]>(CALL_LOGS);
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'resolved' | 'transferred'>('all');
  const [searchNumber, setSearchNumber] = useState('');

  const filteredLogs = callLogs.filter((log) => {
    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;
    const matchesSearch = log.callerNumber.includes(searchNumber) || 
      log.agentName.toLowerCase().includes(searchNumber.toLowerCase()) ||
      log.id.toLowerCase().includes(searchNumber.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Real-time Telephony Telemetry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Call Observability & Agent Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Detailed packet latency metrics, audio quality traces, and full conversation transcripts.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-5 gap-4">
        
        <div className="p-4 rounded-2xl glass-panel border border-white/5">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Total Voice Minutes</div>
          <div className="text-2xl font-bold text-white font-mono mt-1">1,248,390</div>
          <div className="mt-1 text-[11px] text-emerald-400 flex items-center space-x-1 font-mono">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% this week</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/5">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Active Concurrency</div>
          <div className="text-2xl font-bold text-cyan-400 font-mono mt-1">412 <span className="text-xs text-slate-500 font-normal">channels</span></div>
          <div className="mt-1 text-[11px] text-cyan-400 font-mono">32 global PoPs</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/5">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Global P50 Latency</div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">38 ms</div>
          <div className="mt-1 text-[11px] text-slate-400 font-mono">P99: 72 ms</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/5">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">First-Call Resolution</div>
          <div className="text-2xl font-bold text-purple-400 font-mono mt-1">97.8%</div>
          <div className="mt-1 text-[11px] text-emerald-400 font-mono">Target: &gt;95%</div>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-white/5 col-span-2 lg:col-span-1">
          <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Cost / Minute</div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">$0.024</div>
          <div className="mt-1 text-[11px] text-slate-400 font-mono">vs $0.18 human ops</div>
        </div>

      </div>

      {/* Visual Charts Row */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Hourly Concurrency Chart (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl glass-panel border border-white/10 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs font-semibold text-white">
              24-Hour Active Telephony Channels & Call Concurrency
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Peak: 520 calls @ 11:00 AM</span>
          </div>

          {/* Bar Chart Simulation */}
          <div className="h-44 flex items-end justify-between gap-1 pt-6 px-2">
            {[
              32, 28, 20, 16, 18, 42, 95, 180, 290, 420, 520, 480,
              450, 470, 510, 490, 380, 310, 240, 190, 140, 95, 60, 45
            ].map((val, i) => {
              const heightPct = (val / 520) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center group relative">
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-sm transition-all group-hover:bg-cyan-400 ${
                      i === 10 ? 'bg-cyan-400' : 'bg-gradient-to-t from-blue-600/40 to-cyan-500/80'
                    }`}
                  />
                  {/* Tooltip on hover */}
                  <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 border border-white/20 px-1.5 py-0.5 rounded text-[9px] font-mono text-cyan-300 pointer-events-none whitespace-nowrap z-20">
                    {val} calls
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-2 border-t border-white/5 mt-2">
            <span>00:00 (Midnight)</span>
            <span>06:00 AM</span>
            <span>12:00 PM (Noon)</span>
            <span>06:00 PM</span>
            <span>23:00 PM</span>
          </div>
        </div>

        {/* Latency Distribution Histogram (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl glass-panel border border-white/10 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <span className="text-xs font-semibold text-white">Round-Trip Latency Distribution</span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">99.4% &lt; 80ms</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 font-mono">&lt; 35ms (Near-Zero Latency)</span>
                  <span className="text-emerald-400 font-mono font-bold">54%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: '54%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 font-mono">35ms - 50ms (Natural Cadence)</span>
                  <span className="text-cyan-400 font-mono font-bold">38%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '38%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300 font-mono">50ms - 80ms (Standard Egress)</span>
                  <span className="text-blue-400 font-mono font-bold">7.4%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: '7.4%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-400 font-mono">&gt; 80ms (Extreme Jitter Spike)</span>
                  <span className="text-slate-500 font-mono">0.6%</span>
                </div>
                <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden">
                  <div className="h-full bg-slate-600 rounded-full" style={{ width: '0.6%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Audio Carrier: Telnyx SIP</span>
            <span className="text-emerald-400">Jitter: 1.1ms</span>
          </div>
        </div>

      </div>

      {/* Detailed Call Logs Table */}
      <div className="mt-8 rounded-2xl glass-panel border border-white/10 shadow-xl overflow-hidden">
        
        {/* Table Filters & Toolbar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <PhoneCall className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Recent Call Sessions & Voice Transcripts</h3>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Search phone number or call ID..."
                className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-white/10 text-xs">
              {(['all', 'resolved', 'transferred'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                    statusFilter === s
                      ? 'bg-cyan-500/20 text-cyan-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/60 text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-white/5">
              <tr>
                <th className="py-3 px-4">Call ID</th>
                <th className="py-3 px-4">Agent Name</th>
                <th className="py-3 px-4">Caller Number</th>
                <th className="py-3 px-4">Duration</th>
                <th className="py-3 px-4">P50 Latency</th>
                <th className="py-3 px-4">Sentiment</th>
                <th className="py-3 px-4">Cost</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{log.id}</td>
                  <td className="py-3.5 px-4 font-sans text-slate-200">{log.agentName}</td>
                  <td className="py-3.5 px-4 text-slate-400">{log.callerNumber}</td>
                  <td className="py-3.5 px-4">{Math.floor(log.durationSeconds / 60)}m {log.durationSeconds % 60}s</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{log.latencyMs}ms</td>
                  <td className="py-3.5 px-4 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] capitalize font-medium ${
                        log.sentiment === 'positive'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.sentiment === 'frustrated'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {log.sentiment}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">${log.cost.toFixed(3)}</td>
                  <td className="py-3.5 px-4 font-sans">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] capitalize ${
                        log.status === 'resolved'
                          ? 'text-emerald-400 bg-emerald-950/60'
                          : 'text-amber-400 bg-amber-950/60'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-sans">
                    <button
                      onClick={() => setSelectedCall(log)}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-colors"
                    >
                      View Transcript
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transcript Drawer Modal */}
      {selectedCall && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-2xl rounded-2xl glass-panel border border-white/15 p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-base font-bold text-white">Call Session: {selectedCall.id}</h3>
                  <span className="text-xs font-mono text-cyan-400">{selectedCall.callerNumber}</span>
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  Agent: {selectedCall.agentName} &bull; Latency: {selectedCall.latencyMs}ms &bull; Cost: ${selectedCall.cost.toFixed(3)}
                </div>
              </div>

              <button
                onClick={() => setSelectedCall(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* AI Call Summary */}
            <div className="my-4 p-3 rounded-xl bg-slate-950/80 border border-white/5 text-xs text-slate-300">
              <strong className="text-cyan-300 block mb-1">Automated Resolution Summary:</strong>
              {selectedCall.summary}
            </div>

            {/* Scrollable Conversation Transcript */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {selectedCall.transcript.map((item, idx) => {
                const isAgent = item.speaker === 'agent';
                return (
                  <div key={idx} className={`flex items-start space-x-2.5 ${isAgent ? '' : 'justify-end'}`}>
                    {isAgent && (
                      <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                        isAgent
                          ? 'bg-slate-900 border border-white/10 text-slate-200'
                          : 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-100'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 mb-1 text-[10px] text-slate-500 font-mono">
                        <span>{isAgent ? selectedCall.agentName : 'User'}</span>
                        <div className="flex items-center space-x-1.5">
                          {item.latencyMs && <span className="text-emerald-400">{item.latencyMs}ms</span>}
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                      <p>{item.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">Opus RTP 24kHz Stream Recorded</span>
              <button
                onClick={() => setSelectedCall(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
