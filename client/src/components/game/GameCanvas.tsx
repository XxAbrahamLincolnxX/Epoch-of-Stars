import * as React from 'react';
import { useGame } from './GameProvider';
import { particleSpawnConfig } from '@/data/particleSpawnConfig';

export function GameCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { gameState, absorbParticle, checkEvolution, updateGameState } = useGame();
  const animationRef = React.useRef<number>();
  const particlesRef = React.useRef(gameState.particles);

  React.useEffect(() => {
    particlesRef.current = gameState.particles;
  }, [gameState.particles]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [...particlesRef.current];

    // Initialize particles if empty - reduced to 12 particles
    if (particles.length === 0) {
      particles = generateParticles(12, gameState.stage);
      updateGameState({ particles });
    }

    const animate = () => {
      // Clear with solid black background
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw simplified space background - reduced to 20 stars
      drawStars(ctx, canvas.width, canvas.height);

      // Update and draw particles
      particles = updateParticles(particles, canvas.width, canvas.height);

      particles.forEach(particle => {
        drawParticle(ctx, particle);
      });

      // Draw player
      drawPlayer(ctx, gameState);

      // Check for particle absorption
      particles = particles.filter(particle => {
        const distance = Math.sqrt(
          Math.pow(particle.position.x - gameState.position.x, 2) +
          Math.pow(particle.position.y - gameState.position.y, 2)
        );

        if (distance < gameState.size + particle.size) {
          absorbParticle(particle.mass);
          return false;
        }
        return true;
      });

      // Slower spawn rate and max particles
      if (Math.random() < 0.03 && particles.length < 50) {
        particles.push(createRandomParticle(canvas.width, canvas.height, gameState.stage));
      }

      updateGameState({ particles });
      checkEvolution();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.position, gameState.size, gameState.stage, absorbParticle, checkEvolution, updateGameState]);

  const handleMouseMove = React.useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updateGameState({
      position: { x, y }
    });
  }, [updateGameState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-none"
      onMouseMove={handleMouseMove}
    />
  );
}

function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number) {
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

function drawPlayer(ctx: CanvasRenderingContext2D, gameState: any) {
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

function drawParticle(ctx: CanvasRenderingContext2D, particle: any) {
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

function getStageColor(stage: string, alpha: number): string {
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

function getParticleColor(type: string): string {
  const colors: Record<string, string> = {
    hydrogen: '#87CEEB',
    helium: '#FFE4B5',
    dust: '#CD853F',
    debris: '#A9A9A9'
  };
  return colors[type] || '#87CEEB';
}

function generateParticles(count: number, stage: string): any[] {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(createRandomParticle(800, 600, stage));
  }
  return particles;
}

function createRandomParticle(width: number, height: number, stage: string): any {
  const config = particleSpawnConfig[stage] || particleSpawnConfig['hydrogen'];
  const { types, weights } = config;

  let random = Math.random() * 100;
  let selectedType = types[0];

  for (let i = 0; i < types.length; i++) {
    if (random < weights[i]) {
      selectedType = types[i];
      break;
    }
    random -= weights[i];
  }

  return {
    id: Math.random().toString(36).substr(2, 9),
    position: {
      x: Math.random() * width,
      y: Math.random() * height
    },
    velocity: {
      x: (Math.random() - 0.5) * 0.8,
      y: (Math.random() - 0.5) * 0.8
    },
    mass: getMassForType(selectedType),
    type: selectedType,
    size: getSizeForType(selectedType)
  };
}

function getMassForType(type: string): number {
  const masses: Record<string, number> = {
    hydrogen: 1.67e-27,
    helium: 6.64e-27,
    dust: 1e-24,
    debris: 1e-22
  };
  return masses[type] || 1.67e-27;
}

function getSizeForType(type: string): number {
  const sizes: Record<string, number> = {
    hydrogen: 4,
    helium: 5,
    dust: 7,
    debris: 9
  };
  return sizes[type] || 4;
}

function updateParticles(particles: any[], width: number, height: number): any[] {
  return particles.map(particle => ({
    ...particle,
    position: {
      x: (particle.position.x + particle.velocity.x + width) % width,
      y: (particle.position.y + particle.velocity.y + height) % height
    }
  }));
}
