import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGame } from './GameStateProvider';
import { TechBranch } from '@/types/game';

export function TechTree() {
  const { gameState, purchaseTech, canAffordTech } = useGame();
  const [selectedBranch, setSelectedBranch] = React.useState<TechBranch | null>(null);

  const getBranchIcon = (branch: TechBranch): string => {
    const icons: Record<TechBranch, string> = {
      [TechBranch.SINGULARITY_CORE]: '🕳️',
      [TechBranch.WELLSPRING]: '💥',
      [TechBranch.ORBITAL_CONTROL]: '🌍',
      [TechBranch.COLLAPSE_TREE]: '⚫',
      [TechBranch.ARM_CONTROL]: '🌌',
      [TechBranch.PLASMA_EFFICIENCY]: '⚡',
      [TechBranch.FUSION_TYPES]: '🔬',
      [TechBranch.REACTOR_MANIPULATION]: '⚙️',
      [TechBranch.SHELL_FUSION]: '🥚',
      [TechBranch.STAR_FORMATION]: '⭐',
      [TechBranch.RADIANT_BURST]: '💫',
      [TechBranch.STELLAR_PRESSURE]: '🌪️',
      [TechBranch.ENTROPY_RADIATION]: '☠️',
      [TechBranch.STELLAR_DEFENSE]: '🛡️',
      [TechBranch.GRAVITY_DOMINATION]: '🌑',
      [TechBranch.ELEMENTAL_FUSION]: '🧪',
      [TechBranch.ELEMENT_STORAGE]: '📦',
      [TechBranch.RESISTANCE_ADAPTATION]: '🛡️',
      [TechBranch.LAYERED_FUSION]: '🧅',
      [TechBranch.CHRONO_TOOLS]: '⏰',
      [TechBranch.ENTROPY_IMMUNITY]: '🌀',
      [TechBranch.ENDGAME_COSMOLOGY]: '🌌',
      [TechBranch.COLLAPSE_SYNERGY]: '🔄',
      [TechBranch.COSMIC_CONSCIOUSNESS]: '🧠',
      [TechBranch.MASS_EFFICIENCY]: '⚖️',
      [TechBranch.STREAM_MULTIPLEXING]: '🔀',
      [TechBranch.ENTROPY_SYNERGY]: '♾️',
      [TechBranch.MATTER_MANAGEMENT]: '🔧',
      [TechBranch.GALACTIC_THREADING]: '🕸️'
    };
    return icons[branch] || '🔹';
  };

  const getBranchName = (branch: TechBranch): string => {
    return branch.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const availableTechs = gameState.techNodes.filter(tech => tech.unlocked);
  const branches = Array.from(new Set(availableTechs.map(tech => tech.branch)));
  const filteredTechs = selectedBranch 
    ? availableTechs.filter(tech => tech.branch === selectedBranch)
    : availableTechs;

  return (
    <Card className="w-[500px] max-h-[600px] pointer-events-auto bg-black/90 border-white/30 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          Tech Tree
          <span className="text-sm text-yellow-400">
            Energy: {Math.floor(gameState.energy)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Branch Selection */}
        <div className="space-y-2">
          <h4 className="font-semibold">Tech Branches</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={selectedBranch === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedBranch(null)}
              className="text-xs"
            >
              All
            </Button>
            {branches.slice(0, 8).map(branch => (
              <Button
                key={branch}
                variant={selectedBranch === branch ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBranch(branch)}
                className="text-xs flex items-center gap-1"
              >
                <span>{getBranchIcon(branch)}</span>
                <span className="truncate">{getBranchName(branch)}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tech Nodes */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {filteredTechs.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>No technologies available</p>
              <p className="text-sm mt-2">Upgrade your core stats to unlock new tech</p>
            </div>
          ) : (
            filteredTechs.map(tech => (
              <div
                key={tech.id}
                className={`p-3 rounded-lg border ${
                  tech.purchased 
                    ? 'bg-green-900/30 border-green-500/50' 
                    : canAffordTech(tech)
                    ? 'bg-white/5 border-white/20 hover:bg-white/10'
                    : 'bg-gray-900/30 border-gray-600/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span>{getBranchIcon(tech.branch)}</span>
                      <h5 className="font-semibold">{tech.name}</h5>
                      {tech.purchased && <span className="text-green-400 text-sm">✓</span>}
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{tech.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-yellow-400">Cost: {tech.cost}</span>
                      <div className="flex gap-2">
                        {Object.entries(tech.requirements).map(([stat, value]) => (
                          <span
                            key={stat}
                            className={
                              gameState.coreStats[stat as keyof typeof gameState.coreStats] >= value
                                ? 'text-green-400'
                                : 'text-red-400'
                            }
                          >
                            {stat.toUpperCase()}: {value}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2">
                      {tech.effects.map((effect, index) => (
                        <div key={index} className="text-xs text-blue-300">
                          {effect.description}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => purchaseTech(tech.id)}
                    disabled={!canAffordTech(tech) || tech.purchased}
                    className="ml-3"
                  >
                    {tech.purchased ? '✓' : 'Buy'}
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}