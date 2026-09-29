export type PageTab = 
  | 'overview' 
  | 'workstation' 
  | 'agents' 
  | 'analytics' 
  | 'architecture' 
  | 'pricing';

export type LayoutVariation = 
  | 'enterprise' 
  | 'asymmetrical' 
  | 'glassy-transparent' 
  | 'minimal-signoff';

export interface VoicePersona {
  id: string;
  name: string;
  role: string;
  voiceStyle: string;
  accent: string;
  latencyMs: number;
  sampleText: string;
  avatarUrl: string;
  tags: string[];
  gender: 'female' | 'male';
}

export interface VoiceAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'deploying' | 'paused';
  persona: string;
  model: string;
  phoneNumber?: string;
  totalCalls: number;
  avgDuration: string;
  resolutionRate: number;
  avgLatency: number;
  webhookUrl: string;
  complianceTier: string;
  createdDate: string;
}

export interface CallLog {
  id: string;
  agentName: string;
  callerNumber: string;
  durationSeconds: number;
  latencyMs: number;
  status: 'resolved' | 'transferred' | 'dropped';
  sentiment: 'positive' | 'neutral' | 'frustrated';
  cost: number;
  timestamp: string;
  summary: string;
  transcript: Array<{
    speaker: 'agent' | 'user';
    text: string;
    timestamp: string;
    latencyMs?: number;
  }>;
}

export interface LatencyBenchmark {
  provider: string;
  sttMs: number;
  llmMs: number;
  ttsMs: number;
  networkMs: number;
  totalMs: number;
  highlight?: boolean;
}
