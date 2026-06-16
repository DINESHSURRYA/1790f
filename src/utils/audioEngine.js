class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.currentVibe = null;
    this.activeVoices = []; // To manage crossfading multiple groups
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (this.ctx && this.ctx.state === 'suspended' && !muted) {
      this.ctx.resume();
    }
    
    if (!muted) {
      if (this.currentVibe !== null) {
        this.playVibe(this.currentVibe);
      }
    } else {
      this.stopAllBGM();
    }
  }

  setVibe(vibeIndex) {
    if (this.currentVibe === vibeIndex) return;
    this.currentVibe = vibeIndex;
    
    if (!this.isMuted && this.ctx) {
      this.playVibe(vibeIndex);
    }
  }

  getVibeConfig(vibeIndex) {
    // Vibe 0: Intro (Warm synth pad, slow attack)
    if (vibeIndex === 0) {
      return { type: 'sine', freqs: [130.81, 164.81, 196.00], LFO: 0.05, volume: 0.15 }; // C3, E3, G3
    }
    // Vibe 1: Problem (Analytical, minor keys, digital pulses)
    else if (vibeIndex === 1) {
      return { type: 'triangle', freqs: [110.00, 130.81, 164.81], LFO: 0.8, volume: 0.10 }; // A2, C3, E3
    }
    // Vibe 2: Intuition (Cascading, flowing, smooth)
    else if (vibeIndex === 2) {
      return { type: 'sine', freqs: [146.83, 185.00, 220.00, 293.66], LFO: 0.2, volume: 0.12 }; // D3, F#3, A3, D4
    }
    // Vibe 3: Algorithm (Deep ambient techno, sub-bass)
    else if (vibeIndex === 3) {
      return { type: 'triangle', freqs: [43.65, 65.41, 87.31], LFO: 1.5, volume: 0.15 }; // F1, C2, F2
    }
    // Vibe 4: Summary (Triumphant, major chord progression)
    else {
      return { type: 'triangle', freqs: [98.00, 123.47, 146.83, 185.00, 220.00], LFO: 0.1, volume: 0.15 }; // G2, B2, D3, F#3, A3
    }
  }

  playVibe(vibeIndex) {
    const config = this.getVibeConfig(vibeIndex);
    const t = this.ctx.currentTime;
    const fadeDuration = 1.5;

    // Fade out old voices
    this.activeVoices.forEach(voiceGroup => {
      voiceGroup.masterGain.gain.cancelScheduledValues(t);
      voiceGroup.masterGain.gain.setValueAtTime(voiceGroup.masterGain.gain.value, t);
      voiceGroup.masterGain.gain.linearRampToValueAtTime(0, t + fadeDuration);
      
      setTimeout(() => {
        voiceGroup.oscillators.forEach(o => o.stop());
        voiceGroup.masterGain.disconnect();
      }, fadeDuration * 1000 + 100);
    });

    this.activeVoices = [];

    // Create new voice group
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0, t);
    masterGain.gain.linearRampToValueAtTime(config.volume, t + fadeDuration);
    masterGain.connect(this.ctx.destination);

    const oscillators = [];

    config.freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = config.type;
      osc.frequency.value = freq;

      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = config.LFO + (idx * 0.02);

      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.5;
      lfo.connect(lfoGain.gain);

      const nodeGain = this.ctx.createGain();
      nodeGain.gain.value = 0.5;

      osc.connect(nodeGain);
      lfo.connect(nodeGain.gain);
      nodeGain.connect(masterGain);

      lfo.start(t);
      osc.start(t);
      oscillators.push(osc, lfo);
    });

    this.activeVoices.push({ masterGain, oscillators });
  }

  stopAllBGM() {
    const t = this.ctx.currentTime;
    this.activeVoices.forEach(voiceGroup => {
      voiceGroup.masterGain.gain.cancelScheduledValues(t);
      voiceGroup.masterGain.gain.setValueAtTime(voiceGroup.masterGain.gain.value, t);
      voiceGroup.masterGain.gain.linearRampToValueAtTime(0, t + 0.5);
      setTimeout(() => {
        voiceGroup.oscillators.forEach(o => o.stop());
        voiceGroup.masterGain.disconnect();
      }, 600);
    });
    this.activeVoices = [];
  }

  playTransitionSound(vibeIndex) {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    if (vibeIndex >= 0) {
      // Cinematic, low-end sweeping whoosh for all transitions
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60, t);
      osc.frequency.exponentialRampToValueAtTime(20, t + 0.8);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(100, t);
      filter.frequency.exponentialRampToValueAtTime(800, t + 0.4);
      filter.frequency.exponentialRampToValueAtTime(100, t + 0.8);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.2);
      gain.gain.linearRampToValueAtTime(0, t + 0.8);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.8);
    } 
    else if (vibeIndex === 1) {
      // Damp tick
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(100, t + 0.05);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    }
    else if (vibeIndex === 2) {
      // Wooden chime (liquid pop)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(800, t + 0.1);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    }
    else if (vibeIndex === 3) {
      // Electronic beep
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.01);
      gain.gain.setValueAtTime(0.3, t + 0.05);
      gain.gain.linearRampToValueAtTime(0, t + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.1);
    }
    else {
      // Resonant chime chord
      [523.25, 659.25, 783.99].forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.1, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 1.5);
      });
    }
  }

  playHoverSound() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Soft UI tick / electromagnetic hum
    osc.type = 'sine';
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(40, t + 0.05);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.05, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(t);
    osc.stop(t + 0.05);
  }

  playClickSound() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    // Crisp click-clack / pneumatic release
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(100, t + 0.08);
    
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(0.15, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    
    // Add a quick noise burst for the mechanical feel
    const bufferSize = this.ctx.sampleRate * 0.05; // 50ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.1, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(t);
    osc.stop(t + 0.08);
    noise.start(t);
  }

  playSimulationSound() {
    if (this.isMuted || !this.ctx) return;
    const t = this.ctx.currentTime;
    
    // Resonant digital chime / energy swell
    [440, 554.37, 659.25].forEach(freq => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.6);
    });
  }
}

export const audio = new AudioEngine();
