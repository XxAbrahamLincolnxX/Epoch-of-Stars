import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGame } from './GameStateProvider';

export function PlayerStats() {
  const { gameState } = useGame();

  const formatMass = (mass: number): string => {
    if (mass < 1e-24) return `${(mass * 1e27).toFixed(2)} × 10⁻²⁷ kg`;
    if (mass < 1e-21) return `${(mass * 1e24).toFixed(2)} × 10⁻²⁴ kg`;
    if (mass < 1e-18) return `${(mass * 1e21).toFixed(2)} × 10⁻²¹ kg`;
    if (mass < 1e30) return `${(mass / 1e24).toFixed(2)} × 10²⁴ kg`;
    return `${(mass / 1.989e30).toFixed(2)} Solar Masses`;
  };

  const getNextLevelExp = (level: number): number => {
    let requiredExp = 100;
    for (let i = 1; i < level; i++) {
      requiredExp = Math.floor(requiredExp * 1.8);
    }
    return requiredExp;
  };

  const getCurrentLevelExp = (experience: number, level: number): number => {
    let totalUsed = 0;
    let requiredExp = 100;
    
    for (let i = 1; i < level; i++) {
      totalUsed += requiredExp;
      requiredExp = Math.floor(requiredExp * 1.8);
    }
    
    return experience - totalUsed;
  };

  const nextLevelExp = getNextLevelExp(gameState.level);
  const currentLevelExp = getCurrentLevelExp(gameState.experience, gameState.level);
  const progressPercent = (currentLevelExp / nextLevelExp) * 100;

  return (
    <Card className="w-80 pointer-events-auto bg-black/90 border-white/30 text-white">
      <CardHeader>
        <CardTitle className="text-lg">Player Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Mass:</span>
          <span className="text-blue-400">{formatMass(gameState.mass)}</span>
        </div>
        <div className="flex justify-between">
          <span>Stage:</span>
          <span className="text-green-400 capitalize">
            {gameState.stage.replace('_', ' ')}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Size:</span>
          <span className="text-yellow-400">{gameState.size.toFixed(1)}</span>
        </div>
        <div className="flex justify-between">
          <span>Energy:</span>
          <span className="text-purple-400">{Math.floor(gameState.energy)}</span>
        </div>
        <div className="flex justify-between">
          <span>Level:</span>
          <span className="text-red-400">{gameState.level}</span>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Experience:</span>
            <span className="text-cyan-400">
              {currentLevelExp}/{nextLevelExp} XP
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-cyan-400 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.min(100, progressPercent)}%` }}
            />
          </div>
        </div>
        {gameState.statPoints > 0 && (
          <div className="text-center p-2 bg-blue-600/30 rounded-lg">
            <span className="text-blue-300">
              💫 {gameState.statPoints} Stat Point{gameState.statPoints > 1 ? 's' : ''} Available!
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}