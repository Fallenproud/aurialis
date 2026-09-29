// Real-time audio helper with Web Speech API and Web Audio API synthesizer fallback

let audioCtx: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChime(frequency = 520, type: OscillatorType = 'sine', duration = 0.25): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio tone play prevented:', err);
  }
}

export function speakSampleText(
  text: string, 
  gender: 'female' | 'male', 
  onStart?: () => void, 
  onEnd?: () => void
): boolean {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose appropriate voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find(v => {
      const name = v.name.toLowerCase();
      if (gender === 'female') {
        return name.includes('female') || name.includes('samantha') || name.includes('victoria') || name.includes('karen') || name.includes('zira');
      } else {
        return name.includes('male') || name.includes('daniel') || name.includes('george') || name.includes('david');
      }
    }) || voices[0];

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 1.05;
    utterance.pitch = gender === 'female' ? 1.1 : 0.95;

    utterance.onstart = () => {
      playChime(640, 'triangle', 0.15);
      if (onStart) onStart();
    };

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  }
  return false;
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
