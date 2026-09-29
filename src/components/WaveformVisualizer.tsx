import React, { useEffect, useRef } from 'react';

interface WaveformVisualizerProps {
  isActive: boolean;
  color?: 'cyan' | 'emerald' | 'purple' | 'amber';
  height?: number;
  barsCount?: number;
  className?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isActive,
  color = 'cyan',
  height = 48,
  barsCount = 36,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const colorMap = {
      cyan: { main: '#06b6d4', glow: 'rgba(6, 182, 212, 0.4)', inactive: '#1e293b' },
      emerald: { main: '#10b981', glow: 'rgba(16, 185, 129, 0.4)', inactive: '#1e293b' },
      purple: { main: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)', inactive: '#1e293b' },
      amber: { main: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)', inactive: '#1e293b' },
    };

    const palette = colorMap[color];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / barsCount;
      const padding = 2;

      for (let i = 0; i < barsCount; i++) {
        const x = i * barWidth;
        let barHeight: number;

        if (isActive) {
          // Dynamic organic waveform calculation
          const wave1 = Math.sin(phase + i * 0.25) * 0.5 + 0.5;
          const wave2 = Math.cos(phase * 1.5 + i * 0.4) * 0.5 + 0.5;
          const wave3 = Math.sin(phase * 0.8 + i * 0.1) * 0.5 + 0.5;
          const combined = (wave1 * 0.4 + wave2 * 0.4 + wave3 * 0.2);
          barHeight = Math.max(combined * (canvas.height * 0.85), 4);
        } else {
          // Subtle idle ambient line
          const idleWave = Math.sin(phase * 0.2 + i * 0.1) * 0.2 + 0.2;
          barHeight = 3 + idleWave * 3;
        }

        const y = (canvas.height - barHeight) / 2;

        ctx.fillStyle = isActive ? palette.main : palette.inactive;
        if (isActive) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = palette.glow;
        } else {
          ctx.shadowBlur = 0;
        }

        // Draw rounded bar
        ctx.beginPath();
        ctx.roundRect(x + padding / 2, y, barWidth - padding, barHeight, 3);
        ctx.fill();
      }

      phase += isActive ? 0.08 : 0.02;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, color, barsCount]);

  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-lg ${className}`}>
      <canvas
        ref={canvasRef}
        width={barsCount * 8}
        height={height}
        className="w-full h-full block"
      />
    </div>
  );
};
