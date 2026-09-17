// Web Audio API based cute cat sound synthesizer & animation triggers
export class ButterCatSoundEffect {
  private static ctx: AudioContext | null = null;

  private static getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return null;
    
    if (!this.ctx) {
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Generates a cute cat meow / purr tone using frequency modulation synthesis
   */
  public static playMeow(pitchMultiplier = 1.0): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Bandpass filter to make it sound like a cat voice/vocal tract
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800 * pitchMultiplier, now);
      filter.Q.setValueAtTime(3.5, now);

      // Pitch sweep: cute cat meow ("Nya~a~ong")
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(450 * pitchMultiplier, now);
      osc.frequency.exponentialRampToValueAtTime(750 * pitchMultiplier, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(520 * pitchMultiplier, now + 0.35);

      // Volume envelope
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch {
      // Audio auto-play or context block fallback - fail silently without throwing
    }
  }

  /**
   * Generates a soft cheerful cheer sound when crying cat gets comforted/cheered up!
   */
  public static playCheer(): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);

        gain.gain.setValueAtTime(0.001, now + index * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + index * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.28);
      });
    } catch {
      // Fail silently
    }
  }
}
