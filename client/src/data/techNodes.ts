import { TechNode, TechBranch, CoreStats } from '@/types/game';

export const techNodes: TechNode[] = [
  // Gravitational Force Tech Trees
  {
    id: 'grav_pull_radius',
    name: 'Enhanced Pull Radius',
    description: 'Increases gravitational pull radius by 25%',
    branch: TechBranch.SINGULARITY_CORE,
    unlocked: false,
    purchased: false,
    cost: 25, // Reduced cost
    requirements: { grav: 2 },
    effects: [
      { type: 'multiplier', target: 'pull_radius', value: 1.25, description: '+25% pull radius' }
    ]
  },
  {
    id: 'orbital_formation',
    name: 'Orbital Formation',
    description: 'Enables particles to orbit around you, providing defense',
    branch: TechBranch.ORBITAL_CONTROL,
    unlocked: false,
    purchased: false,
    cost: 50, // Reduced cost
    requirements: { grav: 3 },
    effects: [
      { type: 'ability_unlock', target: 'orbital_shield', value: 1, description: 'Unlocks orbital defense' }
    ]
  },
  {
    id: 'gravitational_damage',
    name: 'Gravitational Shockwave',
    description: 'Deal damage based on gravitational force',
    branch: TechBranch.WELLSPRING,
    unlocked: false,
    purchased: false,
    cost: 40, // Reduced cost
    requirements: { grav: 3, rad: 2 },
    effects: [
      { type: 'ability_unlock', target: 'grav_shockwave', value: 1, description: 'Unlocks shockwave attack' }
    ]
  },

  // Fusion Output Tech Trees
  {
    id: 'pp_chain_fusion',
    name: 'Proton-Proton Chain',
    description: 'Basic hydrogen fusion - improves energy efficiency',
    branch: TechBranch.FUSION_TYPES,
    unlocked: false,
    purchased: false,
    cost: 20, // Reduced cost
    requirements: { fus: 2 },
    effects: [
      { type: 'multiplier', target: 'fusion_efficiency', value: 1.5, description: '+50% fusion efficiency' }
    ]
  },
  {
    id: 'cno_cycle',
    name: 'CNO Cycle',
    description: 'Advanced fusion using carbon, nitrogen, oxygen as catalysts',
    branch: TechBranch.FUSION_TYPES,
    unlocked: false,
    purchased: false,
    cost: 80, // Reduced cost
    requirements: { fus: 4, elec: 3 },
    effects: [
      { type: 'multiplier', target: 'fusion_efficiency', value: 2.0, description: '+100% fusion efficiency' }
    ]
  },
  {
    id: 'fusion_overload',
    name: 'Reactor Overload',
    description: 'Temporarily boost fusion output at the cost of stability',
    branch: TechBranch.REACTOR_MANIPULATION,
    unlocked: false,
    purchased: false,
    cost: 60, // Reduced cost
    requirements: { fus: 3, ent: 2 },
    effects: [
      { type: 'ability_unlock', target: 'fusion_burst', value: 1, description: 'Unlocks fusion burst ability' }
    ]
  },

  // Radiation Output Tech Trees
  {
    id: 'stellar_flare',
    name: 'Stellar Flare',
    description: 'Release bursts of radiation that damage nearby particles',
    branch: TechBranch.RADIANT_BURST,
    unlocked: false,
    purchased: false,
    cost: 30, // Reduced cost
    requirements: { rad: 2 },
    effects: [
      { type: 'ability_unlock', target: 'stellar_flare', value: 1, description: 'Unlocks flare attack' }
    ]
  },
  {
    id: 'solar_wind',
    name: 'Solar Wind',
    description: 'Continuous radiation pressure pushes particles away',
    branch: TechBranch.STELLAR_PRESSURE,
    unlocked: false,
    purchased: false,
    cost: 45, // Reduced cost
    requirements: { rad: 3, grav: 2 },
    effects: [
      { type: 'mechanic_unlock', target: 'solar_wind', value: 1, description: 'Passive particle repulsion' }
    ]
  },

  // Elemental Complexity Tech Trees
  {
    id: 'helium_fusion',
    name: 'Helium Burning',
    description: 'Fuse helium into carbon - unlocks triple-alpha process',
    branch: TechBranch.ELEMENTAL_FUSION,
    unlocked: false,
    purchased: false,
    cost: 50, // Reduced cost
    requirements: { elec: 3, fus: 3 },
    effects: [
      { type: 'mechanic_unlock', target: 'helium_fusion', value: 1, description: 'Can fuse helium particles' }
    ]
  },
  {
    id: 'element_storage',
    name: 'Elemental Storage',
    description: 'Store different elements for later use',
    branch: TechBranch.ELEMENT_STORAGE,
    unlocked: false,
    purchased: false,
    cost: 35, // Reduced cost
    requirements: { elec: 2, eff: 2 },
    effects: [
      { type: 'mechanic_unlock', target: 'element_storage', value: 1, description: 'Store up to 3 element types' }
    ]
  },

  // Entropy Control Tech Trees
  {
    id: 'time_dilation',
    name: 'Time Dilation',
    description: 'Slow down time in your local area',
    branch: TechBranch.CHRONO_TOOLS,
    unlocked: false,
    purchased: false,
    cost: 100, // Reduced cost
    requirements: { ent: 4, grav: 3 },
    effects: [
      { type: 'ability_unlock', target: 'time_slow', value: 1, description: 'Slows time for 5 seconds' }
    ]
  },
  {
    id: 'entropy_shield',
    name: 'Entropy Shield',
    description: 'Resist damage from chaotic cosmic forces',
    branch: TechBranch.ENTROPY_IMMUNITY,
    unlocked: false,
    purchased: false,
    cost: 75, // Reduced cost
    requirements: { ent: 3 },
    effects: [
      { type: 'stat_boost', target: 'entropy_resistance', value: 50, description: '+50% entropy resistance' }
    ]
  },

  // Matter Efficiency Tech Trees
  {
    id: 'perfect_absorption',
    name: 'Perfect Absorption',
    description: '100% matter conversion efficiency',
    branch: TechBranch.MASS_EFFICIENCY,
    unlocked: false,
    purchased: false,
    cost: 60, // Reduced cost
    requirements: { eff: 4 },
    effects: [
      { type: 'multiplier', target: 'matter_efficiency', value: 2.0, description: 'Double matter conversion' }
    ]
  },
  {
    id: 'multi_stream',
    name: 'Multi-Stream Absorption',
    description: 'Absorb multiple particles simultaneously',
    branch: TechBranch.STREAM_MULTIPLEXING,
    unlocked: false,
    purchased: false,
    cost: 85, // Reduced cost
    requirements: { eff: 3, grav: 3 },
    effects: [
      { type: 'mechanic_unlock', target: 'multi_absorption', value: 1, description: 'Absorb 3 particles at once' }
    ]
  }
];