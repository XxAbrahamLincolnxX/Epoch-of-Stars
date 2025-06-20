// src/systems/phase0/AbsorptionSystem.ts

import { GameState } from '@/types/game';

export function checkParticleAbsorption(
  particles: any[],
  gameState: GameState,
  absorbParticle: (mass: number) => void
): any[] {
  return particles.filter(particle => {
    const dx = particle.position.x - gameState.position.x;
    const dy = particle.position.y - gameState.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const absorbed = distance < gameState.size + particle.size;
    if (absorbed) {
      absorbParticle(particle.mass);
    }

    return !absorbed;
  });
}

export function updateParticlePositions(
  particles: any[],
  width: number,
  height: number
): any[] {
  return particles.map(particle => ({
    ...particle,
    position: {
      x: (particle.position.x + particle.velocity.x + width) % width,
      y: (particle.position.y + particle.velocity.y + height) % height
    }
  }));
} 
