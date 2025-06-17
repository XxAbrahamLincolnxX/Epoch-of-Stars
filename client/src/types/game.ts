export enum EvolutionStage {
  HYDROGEN = 'hydrogen',
  MOLECULE = 'molecule',
  DUST_GRAIN = 'dust_grain',
  PLANETOID = 'planetoid',
  PLANET = 'planet',
  BROWN_DWARF = 'brown_dwarf',
  RED_DWARF = 'red_dwarf',
  MAIN_SEQUENCE = 'main_sequence',
  GIANT_STAR = 'giant_star',
  SUPERGIANT = 'supergiant',
  BLACK_HOLE = 'black_hole',
  GALAXY = 'galaxy'
}

export interface Position {
  x: number;
  y: number;
}

export interface Velocity {
  x: number;
  y: number;
}

export interface Particle {
  id: string;
  position: Position;
  velocity: Velocity;
  mass: number;
  type: 'hydrogen' | 'helium' | 'dust' | 'debris';
  size: number;
}

export interface CoreStats {
  grav: number; // Gravitational Force
  fus: number;  // Fusion Output
  rad: number;  // Radiation Output
  elec: number; // Elemental Complexity
  ent: number;  // Entropy Control
  eff: number;  // Matter Efficiency
}

export interface TechNode {
  id: string;
  name: string;
  description: string;
  branch: TechBranch;
  unlocked: boolean;
  purchased: boolean;
  cost: number;
  requirements: Partial<CoreStats>;
  effects: TechEffect[];
}

export enum TechBranch {
  SINGULARITY_CORE = 'singularity_core',
  WELLSPRING = 'wellspring',
  ORBITAL_CONTROL = 'orbital_control',
  COLLAPSE_TREE = 'collapse_tree',
  ARM_CONTROL = 'arm_control',
  PLASMA_EFFICIENCY = 'plasma_efficiency',
  FUSION_TYPES = 'fusion_types',
  REACTOR_MANIPULATION = 'reactor_manipulation',
  SHELL_FUSION = 'shell_fusion',
  STAR_FORMATION = 'star_formation',
  RADIANT_BURST = 'radiant_burst',
  STELLAR_PRESSURE = 'stellar_pressure',
  ENTROPY_RADIATION = 'entropy_radiation',
  STELLAR_DEFENSE = 'stellar_defense',
  GRAVITY_DOMINATION = 'gravity_domination',
  ELEMENTAL_FUSION = 'elemental_fusion',
  ELEMENT_STORAGE = 'element_storage',
  RESISTANCE_ADAPTATION = 'resistance_adaptation',
  LAYERED_FUSION = 'layered_fusion',
  CHRONO_TOOLS = 'chrono_tools',
  ENTROPY_IMMUNITY = 'entropy_immunity',
  ENDGAME_COSMOLOGY = 'endgame_cosmology',
  COLLAPSE_SYNERGY = 'collapse_synergy',
  COSMIC_CONSCIOUSNESS = 'cosmic_consciousness',
  MASS_EFFICIENCY = 'mass_efficiency',
  STREAM_MULTIPLEXING = 'stream_multiplexing',
  ENTROPY_SYNERGY = 'entropy_synergy',
  MATTER_MANAGEMENT = 'matter_management',
  GALACTIC_THREADING = 'galactic_threading'
}

export interface TechEffect {
  type: 'stat_boost' | 'ability_unlock' | 'mechanic_unlock' | 'multiplier';
  target: string;
  value: number;
  description: string;
}

export interface EvolutionTrigger {
  id: string;
  name: string;
  description: string;
  fromStage: EvolutionStage;
  toStage: EvolutionStage;
  requirements: Partial<CoreStats>;
  unlocked: boolean;
  available: boolean;
}

export interface Ability {
  id: string;
  name: string;
  description: string;
  cost: number;
  cooldown: number;
  lastUsed: number;
  unlocked: boolean;
}

export interface GameState {
  mass: number;
  stage: EvolutionStage;
  particlesAbsorbed: number;
  energy: number;
  position: Position;
  velocity: Velocity;
  size: number;
  level: number;
  experience: number;
  statPoints: number;
  coreStats: CoreStats;
  techNodes: TechNode[];
  evolutionTriggers: EvolutionTrigger[];
  abilities: Ability[];
  particles: Particle[];
  fusionEfficiency: number;
  radiationDamage: number;
  gravitationalPull: number;
  elementalResistance: number;
  entropyResistance: number;
  matterEfficiency: number;
}