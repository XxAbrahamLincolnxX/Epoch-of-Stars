import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGame } from './GameStateProvider';
import { EvolutionStage } from '@/types/game';

export function EvolutionInfo() {
  const { gameState } = useGame();

  const getNextStage = (currentStage: EvolutionStage): EvolutionStage | null => {
    const stages = Object.values(EvolutionStage);
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
  };

  const getStageDescription = (stage: EvolutionStage): string => {
    const descriptions: Record<EvolutionStage, string> = {
      [EvolutionStage.HYDROGEN]: 'A single hydrogen atom drifting in space',
      [EvolutionStage.MOLECULE]: 'Simple molecules forming from absorbed atoms',
      [EvolutionStage.DUST_GRAIN]: 'Cosmic dust beginning to accumulate',
      [EvolutionStage.PLANETOID]: 'Small rocky body with gravitational pull',
      [EvolutionStage.PLANET]: 'Planetary mass with substantial gravity',
      [EvolutionStage.BROWN_DWARF]: 'Failed star with insufficient fusion mass',
      [EvolutionStage.RED_DWARF]: 'Small main sequence star burning hydrogen',
      [EvolutionStage.MAIN_SEQUENCE]: 'Stable star in hydrogen burning phase',
      [EvolutionStage.GIANT_STAR]: 'Evolved star with expanded outer layers',
      [EvolutionStage.SUPERGIANT]: 'Massive star nearing end of lifecycle',
      [EvolutionStage.BLACK_HOLE]: 'Collapsed star with infinite density',
      [EvolutionStage.GALAXY]: 'Collection of billions of stars and matter'
    };
    return descriptions[stage];
  };

  const getMassThreshold = (stage: EvolutionStage): number => {
    const thresholds: Record<EvolutionStage, number> = {
      [EvolutionStage.HYDROGEN]: 1e-26,
      [EvolutionStage.MOLECULE]: 1e-24,
      [EvolutionStage.DUST_GRAIN]: 1e-20,
      [EvolutionStage.PLANETOID]: 1e-15,
      [EvolutionStage.PLANET]: 1e24,
      [EvolutionStage.BROWN_DWARF]: 1.989e30,
      [EvolutionStage.RED_DWARF]: 1.989e31,
      [EvolutionStage.MAIN_SEQUENCE]: 1.989e32,
      [EvolutionStage.GIANT_STAR]: 1.989e33,
      [EvolutionStage.SUPERGIANT]: 1.989e34,
      [EvolutionStage.BLACK_HOLE]: 1.989e35,
      [EvolutionStage.GALAXY]: Infinity
    };
    return thresholds[stage];
  };

  const nextStage = getNextStage(gameState.stage);
  const currentThreshold = getMassThreshold(gameState.stage);
  const nextThreshold = nextStage ? getMassThreshold(nextStage) : Infinity;
  
  const progress = nextStage 
    ? Math.min(100, (gameState.mass / nextThreshold) * 100)
    : 100;

  return (
    <Card className="w-80 pointer-events-auto bg-black/80 border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Evolution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h3 className="font-semibold text-green-400 capitalize">
            {gameState.stage.replace('_', ' ')}
          </h3>
          <p className="text-sm text-gray-300 mt-1">
            {getStageDescription(gameState.stage)}
          </p>
        </div>
        
        {nextStage && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Next Evolution:</span>
              <span className="text-sm text-blue-400 capitalize">
                {nextStage.replace('_', ' ')}
              </span>
            </div>
            <Progress value={progress} className="w-full" />
            <p className="text-xs text-gray-400 mt-1">
              {progress.toFixed(1)}% to next stage
            </p>
          </div>
        )}
        
        {!nextStage && (
          <div className="text-center">
            <span className="text-gold text-lg font-bold">
              🌌 FINAL EVOLUTION ACHIEVED! 🌌
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}