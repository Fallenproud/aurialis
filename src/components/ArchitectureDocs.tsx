import React, { useState } from 'react';
import { 
  Cpu, 
  Terminal, 
  Copy, 
  Check, 
  Workflow, 
  Globe2, 
  ShieldAlert, 
  Server, 
  Network, 
  Calculator,
  Code2,
  FileCode,
  DollarSign
} from 'lucide-react';
import { CODE_SNIPPETS } from '../data/mockData';

export const ArchitectureDocs: React.FC = () => {
  const [activeCodeTab, setActiveCodeTab] = useState<'curl' | 'typescript' | 'python' | 'websocket'>('typescript');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  // Enterprise Pricing Calculator State
  const [callMinutes, setCallMinutes] = useState<number>(50000);
  const [humanAgentCost, setHumanAgentCost] = useState<number>(0.22); // per min

  const auralisCostPerMin = callMinutes > 100000 ? 0.019 : 0.024;
  const totalAuralisMonthly = callMinutes * auralisCostPerMin;
  const totalHumanMonthly = callMinutes * humanAgentCost;
  const monthlySavings = Math.max(0, totalHumanMonthly - totalAuralisMonthly);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CODE_SNIPPETS[activeCodeTab]);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider mb-1">
          <Workflow className="w-3.5 h-3.5" />
          <span>System Blueprint & Developer SDK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Auralis Precision Pipeline Architecture
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Explore sub-millisecond audio packet routing, streaming ASR/TTS architectures, and SDK implementations.
        </p>
      </div>

      {/* Interactive Code Playground & SDK Explorer */}
      <div className="mt-8 rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-white/10 bg-slate-950/70 gap-3">
          <div className="flex items-center space-x-2 text-xs">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-white">Developer Quickstart SDK</span>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-900 p-1 rounded-xl border border-white/10 text-xs font-mono">
            {(['typescript', 'python', 'curl', 'websocket'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveCodeTab(lang)}
                className={`px-3 py-1 rounded-lg uppercase transition-colors ${
                  activeCodeTab === lang
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 border border-white/10 transition-colors"
          >
            {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedSnippet ? 'Copied to Clipboard' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-5 bg-slate-950/95 font-mono text-xs overflow-x-auto text-cyan-200 leading-relaxed">
          <pre>{CODE_SNIPPETS[activeCodeTab]}</pre>
        </div>
      </div>

      {/* Global Edge Node Carrier Map */}
      <div className="mt-12 rounded-2xl glass-panel border border-white/10 p-6 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Global Sub-50ms Edge Telephony Map</h3>
          </div>
          <span className="text-xs font-mono text-emerald-400">32 Edge Nodes Peered</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
            <div className="text-slate-400 text-[10px]">North America (US-East)</div>
            <div className="text-white font-bold text-sm mt-0.5">Virginia / us-east-1</div>
            <div className="text-emerald-400 text-[11px] mt-1">Ping: 8ms &bull; 99.999% SLA</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
            <div className="text-slate-400 text-[10px]">North America (US-West)</div>
            <div className="text-white font-bold text-sm mt-0.5">Oregon / us-west-2</div>
            <div className="text-emerald-400 text-[11px] mt-1">Ping: 11ms &bull; 99.999% SLA</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
            <div className="text-slate-400 text-[10px]">Europe Central</div>
            <div className="text-white font-bold text-sm mt-0.5">Frankfurt / eu-central-1</div>
            <div className="text-emerald-400 text-[11px] mt-1">Ping: 9ms &bull; 99.999% SLA</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5">
            <div className="text-slate-400 text-[10px]">Asia Pacific</div>
            <div className="text-white font-bold text-sm mt-0.5">Singapore / ap-southeast-1</div>
            <div className="text-emerald-400 text-[11px] mt-1">Ping: 14ms &bull; 99.999% SLA</div>
          </div>
        </div>
      </div>

      {/* Interactive Enterprise Cost Calculator */}
      <div className="mt-12 rounded-2xl glass-panel border border-white/10 p-6 shadow-xl">
        <div className="flex items-center space-x-2 pb-4 border-b border-white/10 mb-6">
          <Calculator className="w-5 h-5 text-amber-400" />
          <div>
            <h3 className="text-base font-bold text-white">Enterprise ROI & Minute Cost Calculator</h3>
            <p className="text-xs text-slate-400">Estimate monthly operational savings by routing telephony to Auralis voice agents.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-xs">
            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <span className="text-slate-300">Monthly Telephony Call Volume</span>
                <span className="font-mono text-cyan-400 font-bold text-sm">
                  {callMinutes.toLocaleString()} minutes / mo
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={callMinutes}
                onChange={(e) => setCallMinutes(Number(e.target.value))}
                className="w-full accent-cyan-400 bg-slate-900 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>5,000 mins</span>
                <span>100,000 mins</span>
                <span>500,000 mins</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between font-medium mb-1.5">
                <span className="text-slate-300">Current Human Call Center Cost per Minute</span>
                <span className="font-mono text-amber-400 font-bold text-sm">
                  ${humanAgentCost.toFixed(2)} / min
                </span>
              </div>
              <input
                type="range"
                min="0.10"
                max="0.50"
                step="0.02"
                value={humanAgentCost}
                onChange={(e) => setHumanAgentCost(Number(e.target.value))}
                className="w-full accent-amber-400 bg-slate-900 h-2 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$0.10 / min (Offshore)</span>
                <span>$0.22 / min (Blended)</span>
                <span>$0.50 / min (Specialist)</span>
              </div>
            </div>
          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-tr from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-500/30 text-center">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-cyan-300 block mb-1">
              Estimated Monthly Savings
            </span>
            <div className="text-4xl font-extrabold text-white font-mono my-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
              ${Math.round(monthlySavings).toLocaleString()} <span className="text-sm text-slate-400 font-normal">/ mo</span>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs font-mono text-left">
              <div className="flex justify-between text-slate-400">
                <span>Auralis Platform Ingest:</span>
                <strong className="text-white">${Math.round(totalAuralisMonthly).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Human Call Center Cost:</span>
                <strong className="text-red-400">${Math.round(totalHumanMonthly).toLocaleString()}</strong>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Unit Cost:</span>
                <strong className="text-cyan-400">${auralisCostPerMin.toFixed(3)} / min</strong>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
