// src/systems/phase0/ParticleSpawner.ts

import { particleSpawnConfig } from '@/systems/shared/particleSpawnConfig';

export type ParticleType = 'hydrogen' | 'helium' | 'dust' | 'debris';

export interface Particle {
  id: string;
  position: { x: number; y: number };
  velocity: { x: number; y: number };
  mass: number;
  type: ParticleType;
  size: number;
}

export function generateParticles(count: number, stage: string): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push(createRandomParticle(800, 600, stage));
  }
  return particles;
}

export function createRandomParticle(
  width: number,
  height: number,
  stage: string
): Particle {
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

export function getMassForType(type: ParticleType): number {
  const masses: Record<ParticleType, number> = {
    hydrogen: 1.67e-27,
    helium: 6.64e-27,
    dust: 1e-24,
    debris: 1e-22
  };
  return masses[type] || 1.67e-27;
}

export function getSizeForType(type: ParticleType): number {
  const sizes: Record<ParticleType, number> = {
    hydrogen: 4,
    helium: 5,
    dust: 7,
    debris: 9
  };
  return sizes[type] || 4;
}
