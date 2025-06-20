// src/systems/phase0/DrawSystem.ts

export function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.2;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  export function drawPlayer(ctx: CanvasRenderingContext2D, gameState: any) {
    const { position, size, stage } = gameState;
  
    ctx.save();
    ctx.translate(position.x, position.y);
  
    const ringGradient = ctx.createRadialGradient(0, 0, size + 8, 0, 0, size + 20);
    ringGradient.addColorStop(0, getStageColor(stage, 0.4));
    ringGradient.addColorStop(1, getStageColor(stage, 0));
  
    ctx.fillStyle = ringGradient;
    ctx.beginPath();
    ctx.arc(0, 0, size + 20, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.strokeStyle = getStageColor(stage, 1.0);
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, size + 12, 0, Math.PI * 2);
    ctx.stroke();
  
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 1.8);
    gradient.addColorStop(0, getStageColor(stage, 0.9));
    gradient.addColorStop(1, getStageColor(stage, 0.3));
  
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.fillStyle = getStageColor(stage, 1);
    ctx.beginPath();
    ctx.arc(0, 0, size, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(2, size * 0.4), 0, Math.PI * 2);
    ctx.fill();
  
    ctx.restore();
  }
  
  export function drawParticle(ctx: CanvasRenderingContext2D, particle: any) {
    ctx.save();
    ctx.translate(particle.position.x, particle.position.y);
  
    const glowGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size * 3);
    glowGradient.addColorStop(0, getParticleColor(particle.type));
    glowGradient.addColorStop(1, 'transparent');
  
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(0, 0, particle.size * 3, 0, Math.PI * 2);
    ctx.fill();
  
    ctx.strokeStyle = getParticleColor(particle.type);
    ctx.lineWidth = 1;
    ctx.fillStyle = getParticleColor(particle.type);
    ctx.beginPath();
    ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  
    ctx.restore();
  }
  
  export function getStageColor(stage: string, alpha: number): string {
    const colors: Record<string, string> = {
      hydrogen: `rgba(135, 206, 250, ${alpha})`,
      molecule: `rgba(173, 216, 230, ${alpha})`,
      dust_grain: `rgba(210, 180, 140, ${alpha})`,
      planetoid: `rgba(160, 82, 45, ${alpha})`,
      planet: `rgba(65, 105, 225, ${alpha})`,
      brown_dwarf: `rgba(165, 42, 42, ${alpha})`,
      red_dwarf: `rgba(255, 69, 0, ${alpha})`,
      main_sequence: `rgba(255, 255, 0, ${alpha})`,
      giant_star: `rgba(255, 140, 0, ${alpha})`,
      supergiant: `rgba(255, 0, 0, ${alpha})`,
      black_hole: `rgba(148, 0, 211, ${alpha})`,
      galaxy: `rgba(255, 215, 0, ${alpha})`
    };
    return colors[stage] || `rgba(135, 206, 250, ${alpha})`;
  }
  
  export function getParticleColor(type: string): string {
    const colors: Record<string, string> = {
      hydrogen: '#87CEEB',
      helium: '#FFE4B5',
      dust: '#CD853F',
      debris: '#A9A9A9'
    };
    return colors[type] || '#87CEEB';
  }
  