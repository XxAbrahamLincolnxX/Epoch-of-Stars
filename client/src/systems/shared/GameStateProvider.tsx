import * as React from 'react';
import { GameState, EvolutionStage, CoreStats, TechNode, EvolutionTrigger } from '@/types/game';
import { techNodes } from '@/systems/shared/techNodes';
import { evolutionTriggers } from '@/systems/shared/evolutionTriggers';

interface GameContextType {
  gameState: GameState;
  updateGameState: (updates: Partial<GameState>) => void;
  absorbParticle: (mass: number) => void;
  checkEvolution: () => void;
  upgradeStat: (stat: keyof CoreStats) => void;
  purchaseTech: (techId: string) => void;
  triggerEvolution: (triggerId: string) => void;
  canAffordTech: (tech: TechNode) => boolean;
  canTriggerEvolution: (trigger: EvolutionTrigger) => boolean;
}

const GameContext = React.createContext<GameContextType | undefined>(undefined);

export function useGame() {
  const context = React.useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}

const initialGameState: GameState = {
  mass: 1.67e-27, // Single hydrogen atom mass in kg
  stage: EvolutionStage.HYDROGEN,
  particlesAbsorbed: 0,
  energy: 0,
  position: { x: 400, y: 300 },
  velocity: { x: 0, y: 0 },
  size: 12, // Increased starting size for better visibility
  level: 1,
  experience: 0,
  statPoints: 5,
  coreStats: {
    grav: 1,
    fus: 1,
    rad: 1,
    elec: 1,
    ent: 1,
    eff: 1
  },
  techNodes: techNodes.map(node => ({ ...node })),
  evolutionTriggers: evolutionTriggers.map(trigger => ({ ...trigger })),
  abilities: [],
  particles: [],
  fusionEfficiency: 1.0,
  radiationDamage: 1.0,
  gravitationalPull: 1.0,
  elementalResistance: 0,
  entropyResistance: 0,
  matterEfficiency: 1.0
};

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = React.useState<GameState>(initialGameState);

  const updateGameState = React.useCallback((updates: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...updates }));
  }, []);

  const getExperienceFromParticle = (particleType: string): number => {
    // Simplified experience values based on particle type
    const baseExperience: Record<string, number> = {
      hydrogen: 2,   // 2 XP per hydrogen atom
      helium: 8,     // 8 XP per helium atom (4x hydrogen mass)
      dust: 15,      // 15 XP per dust grain
      debris: 25     // 25 XP per debris piece
    };
    return baseExperience[particleType] || 2;
  };

  const getEnergyFromParticle = (particleType: string): number => {
    // Energy values for purchasing tech
    const baseEnergy: Record<string, number> = {
      hydrogen: 1,
      helium: 4,
      dust: 10,
      debris: 20
    };
    return baseEnergy[particleType] || 1;
  };

  const absorbParticle = React.useCallback((mass: number) => {
    setGameState(prev => {
      // Determine particle type based on mass
      let particleType = 'hydrogen';
      if (mass > 1e-24) particleType = 'debris';
      else if (mass > 1e-26) particleType = 'dust';
      else if (mass > 4e-27) particleType = 'helium';

      const baseExperience = getExperienceFromParticle(particleType);
      const baseEnergy = getEnergyFromParticle(particleType);
      
      const efficiencyBonus = prev.matterEfficiency;
      const totalExperience = Math.floor(baseExperience * efficiencyBonus);
      const totalEnergy = Math.floor(baseEnergy * prev.fusionEfficiency * efficiencyBonus);
      
      const newExperience = prev.experience + totalExperience;
      
      // Level progression
      let newLevel = 1;
      let requiredExp = 100;
      let totalRequired = 0;
      
      while (totalRequired + requiredExp <= newExperience) {
        totalRequired += requiredExp;
        newLevel++;
        requiredExp = Math.floor(requiredExp * 1.8); // Exponential growth
      }
      
      const statPointsGained = newLevel > prev.level ? (newLevel - prev.level) : 0;

      console.log(`Absorbed ${particleType}: +${totalExperience} XP, +${totalEnergy} energy (Level ${newLevel})`);

      return {
        ...prev,
        mass: prev.mass + (mass * prev.matterEfficiency),
        particlesAbsorbed: prev.particlesAbsorbed + 1,
        energy: prev.energy + totalEnergy,
        experience: newExperience,
        level: newLevel,
        statPoints: prev.statPoints + statPointsGained
      };
    });
  }, []);

  const upgradeStat = React.useCallback((stat: keyof CoreStats) => {
    setGameState(prev => {
      if (prev.statPoints < 1) return prev;
      
      return {
        ...prev,
        coreStats: {
          ...prev.coreStats,
          [stat]: prev.coreStats[stat] + 1
        },
        statPoints: prev.statPoints - 1
      };
    });
  }, []);

  const purchaseTech = React.useCallback((techId: string) => {
    setGameState(prev => {
      const tech = prev.techNodes.find(t => t.id === techId);
      if (!tech || tech.purchased || prev.energy < tech.cost) return prev;

      // Check requirements
      const meetsRequirements = Object.entries(tech.requirements).every(
        ([stat, required]) => prev.coreStats[stat as keyof CoreStats] >= required
      );
      
      if (!meetsRequirements) return prev;

      const updatedTechNodes = prev.techNodes.map(t => 
        t.id === techId ? { ...t, purchased: true } : t
      );

      // Apply tech effects
      let updatedState = { ...prev };
      tech.effects.forEach(effect => {
        switch (effect.type) {
          case 'multiplier':
            if (effect.target === 'fusion_efficiency') {
              updatedState.fusionEfficiency *= effect.value;
            } else if (effect.target === 'matter_efficiency') {
              updatedState.matterEfficiency *= effect.value;
            }
            break;
          case 'stat_boost':
            if (effect.target === 'entropy_resistance') {
              updatedState.entropyResistance += effect.value;
            }
            break;
        }
      });

      console.log(`Purchased tech: ${tech.name} for ${tech.cost} energy`);

      return {
        ...updatedState,
        techNodes: updatedTechNodes,
        energy: prev.energy - tech.cost
      };
    });
  }, []);

  const canAffordTech = React.useCallback((tech: TechNode): boolean => {
    return gameState.energy >= tech.cost && !tech.purchased;
  }, [gameState.energy]);

  const canTriggerEvolution = React.useCallback((trigger: EvolutionTrigger): boolean => {
    return Object.entries(trigger.requirements).every(
      ([stat, required]) => gameState.coreStats[stat as keyof CoreStats] >= required
    );
  }, [gameState.coreStats]);

  const triggerEvolution = React.useCallback((triggerId: string) => {
    setGameState(prev => {
      const trigger = prev.evolutionTriggers.find(t => t.id === triggerId);
      if (!trigger || prev.stage !== trigger.fromStage) return prev;

      const meetsRequirements = Object.entries(trigger.requirements).every(
        ([stat, required]) => prev.coreStats[stat as keyof CoreStats] >= required
      );

      if (!meetsRequirements) return prev;

      const newStage = trigger.toStage;
      const newSize = getSizeFromStage(newStage);

      console.log(`Evolution! From ${prev.stage} to ${newStage}`);

      return {
        ...prev,
        stage: newStage,
        size: newSize
      };
    });
  }, []);

  const checkEvolution = React.useCallback(() => {
    setGameState(prev => {
      // Update tech unlocks based on stats
      const updatedTechNodes = prev.techNodes.map(tech => ({
        ...tech,
        unlocked: Object.entries(tech.requirements).every(
          ([stat, required]) => prev.coreStats[stat as keyof CoreStats] >= required
        )
      }));

      // Update evolution trigger availability
      const updatedTriggers = prev.evolutionTriggers.map(trigger => ({
        ...trigger,
        available: trigger.fromStage === prev.stage && Object.entries(trigger.requirements).every(
          ([stat, required]) => prev.coreStats[stat as keyof CoreStats] >= required
        )
      }));

      return {
        ...prev,
        techNodes: updatedTechNodes,
        evolutionTriggers: updatedTriggers
      };
    });
  }, []);

  React.useEffect(() => {
    checkEvolution();
  }, [gameState.coreStats, checkEvolution]);

  return (
    <GameContext.Provider value={{
      gameState,
      updateGameState,
      absorbParticle,
      checkEvolution,
      upgradeStat,
      purchaseTech,
      triggerEvolution,
      canAffordTech,
      canTriggerEvolution
    }}>
      {children}
    </GameContext.Provider>
  );
}

function getSizeFromStage(stage: EvolutionStage): number {
  const sizes: Record<EvolutionStage, number> = {
    [EvolutionStage.HYDROGEN]: 12,
    [EvolutionStage.MOLECULE]: 15,
    [EvolutionStage.DUST_GRAIN]: 18,
    [EvolutionStage.PLANETOID]: 22,
    [EvolutionStage.PLANET]: 28,
    [EvolutionStage.BROWN_DWARF]: 35,
    [EvolutionStage.RED_DWARF]: 42,
    [EvolutionStage.MAIN_SEQUENCE]: 50,
    [EvolutionStage.GIANT_STAR]: 65,
    [EvolutionStage.SUPERGIANT]: 80,
    [EvolutionStage.BLACK_HOLE]: 45,
    [EvolutionStage.GALAXY]: 100
  };
  return sizes[stage] || 12;
}