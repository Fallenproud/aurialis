import { VoicePersona, VoiceAgent, CallLog, LatencyBenchmark } from '../types';

export const VOICE_PERSONAS: VoicePersona[] = [
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    role: 'Fintech & Wealth Concierge',
    voiceStyle: 'Warm, refined, reassuring',
    accent: 'Mid-Atlantic / Transatlantic',
    latencyMs: 38,
    sampleText: 'Welcome back, Jonathan. Your wire transfer of forty-five thousand dollars to Meridian Capital has been verified and settled. Would you like me to email your compliance audit receipt?',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    tags: ['Ultra-Low Latency', 'Financial Services', 'Empathy Tuned'],
    gender: 'female'
  },
  {
    id: 'marcus-sterling',
    name: 'Marcus Sterling',
    role: 'Enterprise Tech Support & DevOps',
    voiceStyle: 'Precise, calm, analytical',
    accent: 'North American Crisp',
    latencyMs: 41,
    sampleText: 'I detected a spike in P99 latency on your Frankfurt Kubernetes egress node. I can roll back revision 14b or route traffic through our Zurich fallback cluster immediately.',
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    tags: ['Technical Precision', 'Incident Triage', 'Direct & Concise'],
    gender: 'male'
  },
  {
    id: 'dr-sofia-reyes',
    name: 'Dr. Sofia Reyes',
    role: 'Clinical Patient Intake',
    voiceStyle: 'Compassionate, soothing, clear',
    accent: 'Bilingual English/Spanish',
    latencyMs: 35,
    sampleText: 'Good morning, Sarah. I have your post-operation follow-up scheduled for Thursday morning at nine. How is your recovery progressing today?',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813576-a0521e860956?w=150&auto=format&fit=crop&q=80',
    tags: ['HIPAA Certified', 'Medical Intake', 'Multi-Lingual'],
    gender: 'female'
  },
  {
    id: 'julian-mercer',
    name: 'Julian Mercer',
    role: 'Outbound Compliance & Risk Auditor',
    voiceStyle: 'Authoritative, balanced, articulate',
    accent: 'British Received Pronunciation',
    latencyMs: 44,
    sampleText: 'Good afternoon. This is Julian on a secure line from Apex Governance regarding your quarterly automated trade audit. All fifty-two counterparty hashes match the ledger.',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    tags: ['High Reliability', 'Legal & Audit', 'Formal Tone'],
    gender: 'male'
  }
];

export const LATENCY_BENCHMARKS: LatencyBenchmark[] = [
  {
    provider: 'Auralis Precision Pipeline',
    sttMs: 28,
    llmMs: 35,
    ttsMs: 29,
    networkMs: 8,
    totalMs: 100,
    highlight: true
  },
  {
    provider: 'OpenAI Realtime API',
    sttMs: 85,
    llmMs: 140,
    ttsMs: 95,
    networkMs: 25,
    totalMs: 345,
    highlight: false
  },
  {
    provider: 'ElevenLabs + Deepgram + Groq',
    sttMs: 90,
    llmMs: 110,
    ttsMs: 180,
    networkMs: 55,
    totalMs: 435,
    highlight: false
  },
  {
    provider: 'Traditional Telephony Stack (Twilio/Whisper)',
    sttMs: 240,
    llmMs: 380,
    ttsMs: 320,
    networkMs: 85,
    totalMs: 1025,
    highlight: false
  }
];

export const VOICE_AGENTS: VoiceAgent[] = [
  {
    id: 'agent-101',
    name: 'Fintech Tier-1 Inbound',
    description: 'Instant identity verification, wire status inquiries, and automated dispute intake with zero wait times.',
    status: 'active',
    persona: 'Elena Vance',
    model: 'auralis-stream-voice-v2.5',
    phoneNumber: '+1 (800) 412-AURA',
    totalCalls: 34291,
    avgDuration: '2m 14s',
    resolutionRate: 97.8,
    avgLatency: 38,
    webhookUrl: 'https://api.fintech.corp/v1/auralis/telephony-hook',
    complianceTier: 'SOC2 Type II + PCI-DSS',
    createdDate: '2026-01-14'
  },
  {
    id: 'agent-102',
    name: 'Critical Infrastructure Dispatch',
    description: 'P1 incident escalations, automated on-call engineer phone paging, and voice status confirmations.',
    status: 'active',
    persona: 'Marcus Sterling',
    model: 'auralis-stream-voice-v2.5',
    phoneNumber: '+1 (888) 902-OPS1',
    totalCalls: 12480,
    avgDuration: '1m 08s',
    resolutionRate: 99.4,
    avgLatency: 41,
    webhookUrl: 'https://ops.infra.cloud/auralis/pager-escalation',
    complianceTier: 'Enterprise 99.999% SLA',
    createdDate: '2026-02-01'
  },
  {
    id: 'agent-103',
    name: 'Patient Telehealth Screening',
    description: 'HIPAA-compliant pre-visit questionnaire, vitals recording, and calendar slot booking.',
    status: 'active',
    persona: 'Dr. Sofia Reyes',
    model: 'auralis-clinical-v1.8',
    phoneNumber: '+1 (844) 304-CARE',
    totalCalls: 8940,
    avgDuration: '3m 42s',
    resolutionRate: 95.2,
    avgLatency: 36,
    webhookUrl: 'https://health.ehr-secure.io/intake-stream',
    complianceTier: 'HIPAA Tier-A + BAA',
    createdDate: '2026-02-18'
  },
  {
    id: 'agent-104',
    name: 'Global Trade Settlement Desk',
    description: 'B2B institutional confirmation calls for transactions exceeding $100k, recorded with immutable audit trails.',
    status: 'paused',
    persona: 'Julian Mercer',
    model: 'auralis-omni-v3-beta',
    phoneNumber: '+44 20 7946 0912',
    totalCalls: 4510,
    avgDuration: '1m 45s',
    resolutionRate: 98.9,
    avgLatency: 43,
    webhookUrl: 'https://settlement.apex.uk/audit/voice-confirm',
    complianceTier: 'FCA & GDPR Compliant',
    createdDate: '2026-03-05'
  }
];

export const CALL_LOGS: CallLog[] = [
  {
    id: 'call-98214',
    agentName: 'Fintech Tier-1 Inbound',
    callerNumber: '+1 (415) 890-4421',
    durationSeconds: 142,
    latencyMs: 38,
    status: 'resolved',
    sentiment: 'positive',
    cost: 0.047,
    timestamp: 'Just now (12:14 PM)',
    summary: 'Caller confirmed identity via 2FA voice token, requested real-time status of $18,400 ACH transfer, received instant proof of settlement.',
    transcript: [
      { speaker: 'agent', text: 'Thank you for calling Apex Treasury. My name is Elena. How may I assist your business accounts today?', timestamp: '00:01', latencyMs: 34 },
      { speaker: 'user', text: 'Hi Elena, I sent out an eighteen thousand dollar contractor wire this morning and need to verify the recipient reference code.', timestamp: '00:05' },
      { speaker: 'agent', text: 'I see that pending wire batch right here. The reference code matches TX-88902-NY and was cleared at eleven forty-two AM.', timestamp: '00:08', latencyMs: 38 },
      { speaker: 'user', text: 'That was lightning fast, thank you so much!', timestamp: '00:12' },
      { speaker: 'agent', text: 'My pleasure! I have dispatched the PDF confirmation to your verified administrator email. Have a wonderful afternoon.', timestamp: '00:15', latencyMs: 36 }
    ]
  },
  {
    id: 'call-98213',
    agentName: 'Critical Infrastructure Dispatch',
    callerNumber: '+1 (206) 555-0199',
    durationSeconds: 68,
    latencyMs: 42,
    status: 'resolved',
    sentiment: 'neutral',
    cost: 0.022,
    timestamp: '4 mins ago',
    summary: 'Automated P1 alert verification: Database cluster primary disk utilization 94%. Engineer acknowledged pager and initiated disk volume expansion.',
    transcript: [
      { speaker: 'agent', text: 'Priority Alert from Auralis Monitor. Cluster DB-US-WEST-4 storage has crossed ninety-four percent capacity. Say acknowledge or transfer to escalate.', timestamp: '00:01', latencyMs: 39 },
      { speaker: 'user', text: 'Acknowledge. Trigger automated LVM volume resize to five hundred gigabytes.', timestamp: '00:06' },
      { speaker: 'agent', text: 'Confirmed. Automated resize command sent to Ansible runner job eight-seven-four. Volume now expanding.', timestamp: '00:09', latencyMs: 42 },
      { speaker: 'user', text: 'All set. End call.', timestamp: '00:14' },
      { speaker: 'agent', text: 'Ending dispatch session. System telemetry will update in your Slack channel.', timestamp: '00:16', latencyMs: 40 }
    ]
  },
  {
    id: 'call-98212',
    agentName: 'Patient Telehealth Screening',
    callerNumber: '+1 (312) 555-8812',
    durationSeconds: 220,
    latencyMs: 36,
    status: 'resolved',
    sentiment: 'positive',
    cost: 0.073,
    timestamp: '18 mins ago',
    summary: 'Patient answered 5 pre-surgery screening questions, confirmed allergy list, and updated emergency contact phone number.',
    transcript: [
      { speaker: 'agent', text: 'Hello, this is Dr. Sofia Reyes calling from St. Jude Specialty Care with your scheduled pre-procedure check.', timestamp: '00:01', latencyMs: 35 },
      { speaker: 'user', text: 'Yes, hi Dr. Sofia, I have my paperwork ready.', timestamp: '00:06' },
      { speaker: 'agent', text: 'Wonderful. Let us verify your medications first. Are you currently taking any blood thinners or aspirin?', timestamp: '00:09', latencyMs: 37 }
    ]
  },
  {
    id: 'call-98211',
    agentName: 'Fintech Tier-1 Inbound',
    callerNumber: '+1 (650) 555-3211',
    durationSeconds: 310,
    latencyMs: 51,
    status: 'transferred',
    sentiment: 'frustrated',
    cost: 0.103,
    timestamp: '32 mins ago',
    summary: 'Customer disputed charge of $3,450 from merchant in Singapore. Agent captured merchant ID and warm-transferred to Senior Fraud Special Operations with complete context packet.',
    transcript: [
      { speaker: 'agent', text: 'Apex Treasury Fraud Shield, Elena speaking. I am here to help secure your account.', timestamp: '00:01', latencyMs: 42 },
      { speaker: 'user', text: 'Someone just charged thirty-four hundred dollars to a card in Singapore and I am sitting here in San Francisco!', timestamp: '00:07' },
      { speaker: 'agent', text: 'I understand how concerning that is. I have immediately frozen that physical card and initiated a temporary credit claim. Connecting you to Senior Fraud Specialist David now with full context.', timestamp: '00:11', latencyMs: 44 }
    ]
  }
];

export const CODE_SNIPPETS = {
  curl: `curl -X POST https://api.auralis.ai/v1/voice/sessions \\
  -H "Authorization: Bearer aura_live_89b27fd199" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "agent-101",
    "voice_persona": "elena-vance",
    "latency_mode": "ultra-low-sub-50ms",
    "sip_trunk": "sip:us-east.telnyx.auralis.net",
    "interruption_handling": "smooth-ducking",
    "webhook_url": "https://api.yourcorp.com/voice-events"
  }'`,

  typescript: `import { AuralisVoiceClient } from '@auralis/voice-sdk';

const auralis = new AuralisVoiceClient({
  apiKey: process.env.AURALIS_API_KEY,
  region: 'us-east-1'
});

// Spin up a live real-time voice call session
const session = await auralis.sessions.create({
  agentId: 'agent-101',
  persona: 'elena-vance',
  telephony: {
    sipEgress: true,
    callerId: '+1800412AURA',
    toNumber: '+14158904421'
  },
  onTurn: (event) => {
    console.log(\`[\${event.timestamp}] \${event.speaker}: \${event.text} (\${event.latencyMs}ms)\`);
  },
  onInterrupted: () => {
    console.log('User interjected; TTS audio pipeline ducked in 12ms');
  }
});`,

  python: `import os
from auralis import AuralisClient, VoiceStream

client = AuralisClient(api_key=os.environ["AURALIS_API_KEY"])

async def start_voice_pipeline():
    async with client.voice.connect_stream(
        persona="elena-vance",
        latency_mode="sub-50ms",
        sampling_rate=24000
    ) as stream:
        # Stream raw PCM or Opus frames directly
        async for audio_chunk in stream.read_audio():
            await sip_gateway.send_rtp(audio_chunk)
`,

  websocket: `// Connect directly to Auralis Global WebRTC/WebSocket Edge
const ws = new WebSocket('wss://stream.auralis.ai/v2/voice-pipeline?key=YOUR_API_KEY');

ws.onopen = () => {
  ws.send(JSON.stringify({
    action: 'init_session',
    persona: 'elena-vance',
    codecs: ['opus', 'pcm24k'],
    vad_threshold: 0.35,
    max_latency_target_ms: 45
  }));
};

ws.onmessage = (event) => {
  const packet = JSON.parse(event.data);
  if (packet.type === 'audio_chunk') {
    audioContext.playChunk(packet.base64Pcm);
  }
};`
};
