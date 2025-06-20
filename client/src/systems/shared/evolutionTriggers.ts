import { EvolutionTrigger, EvolutionStage } from '@/types/game';

export const evolutionTriggers: EvolutionTrigger[] = [
  {
    id: 'proto_core_spark',
    name: 'Proto-Core Spark',
    description: 'Transition from subatomic to hydrogen atom',
    fromStage: EvolutionStage.HYDROGEN,
    toStage: EvolutionStage.MOLECULE,
    requirements: { grav: 2, fus: 2 },
    unlocked: false,
    available: false
  },
  {
    id: 'core_binding',
    name: 'Core Binding',
    description: 'Form molecular bonds and dust accumulation',
    fromStage: EvolutionStage.MOLECULE,
    toStage: EvolutionStage.DUST_GRAIN,
    requirements: { grav: 3, fus: 3 },
    unlocked: false,
    available: false
  },
  {
    id: 'gravitational_collapse',
    name: 'Gravitational Collapse',
    description: 'Accumulate enough mass to form a planetoid',
    fromStage: EvolutionStage.DUST_GRAIN,
    toStage: EvolutionStage.PLANETOID,
    requirements: { grav: 4, eff: 3 },
    unlocked: false,
    available: false
  },
  {
    id: 'planetary_formation',
    name: 'Planetary Formation',
    description: 'Grow to planetary mass',
    fromStage: EvolutionStage.PLANETOID,
    toStage: EvolutionStage.PLANET,
    requirements: { grav: 5, elec: 3 },
    unlocked: false,
    available: false
  },
  {
    id: 'brown_dwarf_transition',
    name: 'Brown Dwarf Formation',
    description: 'Insufficient mass for full fusion - become a brown dwarf',
    fromStage: EvolutionStage.PLANET,
    toStage: EvolutionStage.BROWN_DWARF,
    requirements: { grav: 6, fus: 3 },
    unlocked: false,
    available: false
  },
  {
    id: 'ignition_trigger',
    name: 'Ignition Trigger',
    description: 'Achieve stable fusion - become a main sequence star',
    fromStage: EvolutionStage.BROWN_DWARF,
    toStage: EvolutionStage.RED_DWARF,
    requirements: { fus: 4, elec: 2 },
    unlocked: false,
    available: false
  },
  {
    id: 'stellar_maturation',
    name: 'Stellar Maturation',
    description: 'Stable hydrogen burning phase',
    fromStage: EvolutionStage.RED_DWARF,
    toStage: EvolutionStage.MAIN_SEQUENCE,
    requirements: { fus: 5, rad: 4 },
    unlocked: false,
    available: false
  },
  {
    id: 'giant_expansion',
    name: 'Giant Phase',
    description: 'Expand into a red giant as hydrogen depletes',
    fromStage: EvolutionStage.MAIN_SEQUENCE,
    toStage: EvolutionStage.GIANT_STAR,
    requirements: { rad: 6, elec: 4 },
    unlocked: false,
    available: false
  },
  {
    id: 'supergiant_evolution',
    name: 'Supergiant Evolution',
    description: 'Massive star approaching end of lifecycle',
    fromStage: EvolutionStage.GIANT_STAR,
    toStage: EvolutionStage.SUPERGIANT,
    requirements: { fus: 6, elec: 5, rad: 6 },
    unlocked: false,
    available: false
  },
  {
    id: 'iron_core_lock',
    name: 'Iron Core Lock',
    description: 'Fusion chain ends - prepare for collapse',
    fromStage: EvolutionStage.SUPERGIANT,
    toStage: EvolutionStage.BLACK_HOLE,
    requirements: { elec: 5, fus: 5, ent: 4 },
    unlocked: false,
    available: false
  },
  {
    id: 'galactic_core_trigger',
    name: 'Galactic Core Formation',
    description: 'Collapse into a galaxy seed',
    fromStage: EvolutionStage.BLACK_HOLE,
    toStage: EvolutionStage.GALAXY,
    requirements: { grav: 8, ent: 8 },
    unlocked: false,
    available: false
  }
];