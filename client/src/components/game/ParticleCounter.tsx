import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from './GameProvider';

export function ParticleCounter() {
  const { gameState } = useGame();

  return (
    <Card className="w-80 pointer-events-auto bg-black/80 border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Absorption Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Particles Absorbed:</span>
          <span className="text-green-400">{gameState.particlesAbsorbed}</span>
        </div>
        <div className="flex justify-between">
          <span>Available Particles:</span>
          <span className="text-blue-400">{gameState.particles.length}</span>
        </div>
        <div className="flex justify-between">
          <span>Experience:</span>
          <span className="text-purple-400">{Math.floor(gameState.experience)}</span>
        </div>
      </CardContent>
    </Card>
  );
}