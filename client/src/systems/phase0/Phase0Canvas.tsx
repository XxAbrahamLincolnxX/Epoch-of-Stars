import * as React from 'react';
import { useGame } from '@/systems/shared/GameStateProvider';
// ✅ If using path alias
import {
    checkParticleAbsorption,
    updateParticlePositions
  } from './AbsorptionSystem';

  
  import {
    generateParticles,
    createRandomParticle
  } from './ParticleSpawner';
  
  import {
    drawStars,
    drawPlayer,
    drawParticle
  } from './DrawSystem.ts';

export function Phase0Canvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { gameState, absorbParticle, checkEvolution, updateGameState } = useGame();

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [...gameState.particles];
    if (particles.length === 0) {
      particles = generateParticles(12, gameState.stage);
      updateGameState({ particles });
    }

    const animate = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawStars(ctx, canvas.width, canvas.height);
      particles = updateParticlePositions(particles, canvas.width, canvas.height);
      particles.forEach(p => drawParticle(ctx, p));
      drawPlayer(ctx, gameState);

      particles = checkParticleAbsorption(particles, gameState, absorbParticle);
      if (Math.random() < 0.03 && particles.length < 50) {
        particles.push(createRandomParticle(canvas.width, canvas.height, gameState.stage));
      }

      updateGameState({ particles });
      checkEvolution();

      requestAnimationFrame(animate);
    };

    animate();
  }, [gameState, absorbParticle, checkEvolution, updateGameState]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    updateGameState({
      position: { x: e.clientX - rect.left, y: e.clientY - rect.top }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 cursor-none"
      onMouseMove={handleMouseMove}
    />
  );
}
