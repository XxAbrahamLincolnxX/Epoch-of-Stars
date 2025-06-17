import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from './GameProvider';
import { CoreStats } from '@/types/game';

export function StatsPanel() {
  const { gameState, upgradeStat } = useGame();

  const getStatIcon = (stat: keyof CoreStats): string => {
    const icons = {
      grav: '🧲',
      fus: '🔥',
      rad: '☢️',
      elec: '💠',
      ent: '🌀',
      eff: '⚛️'
    };
    return icons[stat];
  };

  const getStatName = (stat: keyof CoreStats): string => {
    const names = {
      grav: 'Gravitational Force',
      fus: 'Fusion Output',
      rad: 'Radiation Output',
      elec: 'Elemental Complexity',
      ent: 'Entropy Control',
      eff: 'Matter Efficiency'
    };
    return names[stat];
  };

  const getStatDescription = (stat: keyof CoreStats): string => {
    const descriptions = {
      grav: 'Pull radius, orbital control, gravitational damage',
      fus: 'Energy efficiency, fusion reactions, reactor control',
      rad: 'AoE damage, radiation bursts, stellar pressure',
      elec: 'Element fusion, exotic reactions, resistances',
      ent: 'Time control, decay resistance, meta-progression',
      eff: 'Matter absorption, storage, conversion efficiency'
    };
    return descriptions[stat];
  };

  return (
    <Card className="w-96 pointer-events-auto bg-black/90 border-white/30 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          Core Stats
          <span className="text-sm text-blue-400">
            Points: {gameState.statPoints}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(gameState.coreStats).map(([stat, value]) => (
          <div key={stat} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">{getStatIcon(stat as keyof CoreStats)}</span>
                <span className="font-semibold">
                  {getStatName(stat as keyof CoreStats)}
                </span>
                <span className="text-blue-400 font-bold">
                  {value}
                </span>
              </div>
              <p className="text-xs text-gray-300">
                {getStatDescription(stat as keyof CoreStats)}
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => upgradeStat(stat as keyof CoreStats)}
              disabled={gameState.statPoints < 1}
              className="ml-3"
            >
              +
            </Button>
          </div>
        ))}
        
        <div className="mt-4 pt-4 border-t border-white/20">
          <h4 className="font-semibold mb-2">Current Bonuses</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Fusion Efficiency:</span>
              <span className="text-green-400">{(gameState.fusionEfficiency * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Matter Efficiency:</span>
              <span className="text-blue-400">{(gameState.matterEfficiency * 100).toFixed(0)}%</span>
            </div>
            <div className="flex justify-between">
              <span>Entropy Resistance:</span>
              <span className="text-purple-400">{gameState.entropyResistance.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}