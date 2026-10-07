import React, { useEffect, useRef } from 'react';

interface WaterBackgroundProps {
  intensity?: 'subtle' | 'medium' | 'deep';
  interactive?: boolean;
}

export const WaterBackground: React.FC<WaterBackgroundProps> = ({
  intensity = 'subtle',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes representing aquatic telemetry points
    const particleCount = intensity === 'deep' ? 45 : intensity === 'medium' ? 30 : 18;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }> = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3 - 0.1, // slight upward float like bubbles
        radius: Math.random() * 2.2 + 1.0,
        baseAlpha: Math.random() * 0.4 + 0.15,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle aquatic depth gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, 'rgba(6, 24, 38, 0.98)');
      bgGrad.addColorStop(0.5, 'rgba(9, 38, 58, 0.96)');
      bgGrad.addColorStop(1, 'rgba(6, 24, 38, 0.99)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw subtle undulating wave lines (representing water strata / sonar echoes)
      const waveCount = 3;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const waveY = height * (0.35 + w * 0.28);
        const waveAmp = 18 + w * 8;
        const waveFreq = 0.0025 + w * 0.001;
        const waveSpeed = time * (0.8 + w * 0.4);

        for (let x = 0; x <= width; x += 15) {
          const y = waveY + Math.sin(x * waveFreq + waveSpeed) * waveAmp + Math.cos(x * 0.001 + time * 0.5) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.strokeStyle = `rgba(19, 168, 168, ${0.04 + w * 0.025})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // Draw floating telemetry particles and soft connection lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = p.baseAlpha + Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;

        // Particle glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(40, 215, 215, ${Math.max(0.08, currentAlpha)})`;
        ctx.shadowColor = 'rgba(40, 215, 215, 0.5)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby points to form subtle sensor mesh
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(19, 168, 168, ${(1 - dist / 110) * 0.08})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none w-full h-full z-0 opacity-80"
    />
  );
};
