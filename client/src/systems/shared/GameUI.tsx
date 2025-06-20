import * as React from 'react';
import { useGame } from './GameStateProvider';
import { PlayerStats } from './PlayerStats';
import { StatsPanel } from './StatsPanel';
import { TechTree } from './TechTree';
import { EvolutionPanel } from './EvolutionPanel';
import { ParticleCounter } from './ParticleCounter';

export function GameUI() {
  const [activePanel, setActivePanel] = React.useState<'stats' | 'tech' | 'evolution' | null>('stats');

  const togglePanel = (panel: 'stats' | 'tech' | 'evolution') => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Main UI Panels */}
      <div className="p-4 space-y-4">
        <PlayerStats />
        <ParticleCounter />
      </div>

      {/* Control Buttons */}
      <div className="absolute top-4 right-4 space-y-2 pointer-events-auto">
        <button
          onClick={() => togglePanel('stats')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activePanel === 'stats' 
              ? 'bg-blue-600 text-white' 
              : 'bg-black/80 text-white border border-white/20 hover:bg-white/10'
          }`}
        >
          📊 Core Stats
        </button>
        <button
          onClick={() => togglePanel('tech')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activePanel === 'tech' 
              ? 'bg-green-600 text-white' 
              : 'bg-black/80 text-white border border-white/20 hover:bg-white/10'
          }`}
        >
          🔬 Tech Tree
        </button>
        <button
          onClick={() => togglePanel('evolution')}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
            activePanel === 'evolution' 
              ? 'bg-purple-600 text-white' 
              : 'bg-black/80 text-white border border-white/20 hover:bg-white/10'
          }`}
        >
          🧬 Evolution
        </button>
      </div>

      {/* Active Panel */}
      {activePanel && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          {activePanel === 'stats' && <StatsPanel />}
          {activePanel === 'tech' && <TechTree />}
          {activePanel === 'evolution' && <EvolutionPanel />}
        </div>
      )}
    </div>
  );
}