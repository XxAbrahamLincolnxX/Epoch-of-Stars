import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGame } from './GameStateProvider';

export function EvolutionPanel() {
  const { gameState, triggerEvolution, canTriggerEvolution } = useGame();

  const availableEvolutions = gameState.evolutionTriggers.filter(
    trigger => trigger.fromStage === gameState.stage
  );

  const getStageIcon = (stage: string): string => {
    const icons: Record<string, string> = {
      hydrogen: '⚛️',
      molecule: '🧲',
      dust_grain: '🌫️',
      planetoid: '🪨',
      planet: '🌍',
      brown_dwarf: '🟤',
      red_dwarf: '🔴',
      main_sequence: '⭐',
      giant_star: '🔶',
      supergiant: '🔴',
      black_hole: '⚫',
      galaxy: '🌌'
    };
    return icons[stage] || '⭐';
  };

  const getProgressToNextStat = () => {
    const availableEvolution = availableEvolutions.find(trigger => trigger.available);
    if (!availableEvolution) return [];

    return Object.entries(availableEvolution.requirements).map(([stat, required]) => {
      const current = gameState.coreStats[stat as keyof typeof gameState.coreStats];
      const progress = Math.min(100, (current / required) * 100);
      return {
        stat: stat.toUpperCase(),
        current,
        required,
        progress,
        met: current >= required
      };
    });
  };

  return (
    <Card className="w-96 pointer-events-auto bg-black/90 border-white/30 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <span>{getStageIcon(gameState.stage)}</span>
          Evolution Path
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-green-400 capitalize mb-2">
            {gameState.stage.replace('_', ' ')}
          </h3>
          <p className="text-sm text-gray-300">
            Current evolutionary stage
          </p>
        </div>

        {availableEvolutions.length > 0 ? (
          availableEvolutions.map(trigger => (
            <div
              key={trigger.id}
              className={`p-4 rounded-lg border ${
                trigger.available
                  ? 'bg-green-900/20 border-green-500/50'
                  : 'bg-white/5 border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span>{getStageIcon(trigger.toStage)}</span>
                  <div>
                    <h4 className="font-semibold">{trigger.name}</h4>
                    <p className="text-sm text-blue-400 capitalize">
                      → {trigger.toStage.replace('_', ' ')}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => triggerEvolution(trigger.id)}
                  disabled={!trigger.available}
                  className={trigger.available ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {trigger.available ? 'Evolve!' : 'Requirements not met'}
                </Button>
              </div>
              
              <p className="text-sm text-gray-300 mb-3">{trigger.description}</p>
              
              <div className="space-y-2">
                <h5 className="text-sm font-semibold">Requirements:</h5>
                {getProgressToNextStat().map(req => (
                  <div key={req.stat} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{req.stat}</span>
                      <span className={req.met ? 'text-green-400' : 'text-red-400'}>
                        {req.current}/{req.required}
                      </span>
                    </div>
                    <Progress 
                      value={req.progress} 
                      className={`h-2 ${req.met ? 'bg-green-900' : 'bg-gray-700'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p>🌌 Final Evolution Achieved! 🌌</p>
            <p className="text-sm mt-2">
              You have reached the ultimate cosmic form
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}