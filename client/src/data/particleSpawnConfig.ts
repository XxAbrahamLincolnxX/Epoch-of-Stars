// src/data/particleSpawnConfig.ts

export const particleSpawnConfig = {
    hydrogen: {
      types: ['hydrogen', 'helium'],
      weights: [90, 10],
    },
    molecule: {
      types: ['hydrogen', 'helium', 'oxygen'],
      weights: [70, 20, 10],
    },
    dust_grain: {
      types: ['hydrogen', 'helium', 'carbon', 'silicon_dust'],
      weights: [50, 20, 20, 10],
    },
    planetoid: {
      types: ['iron', 'silicon_dust', 'carbon'],
      weights: [30, 40, 30],
    },
    planet: {
      types: ['water', 'iron', 'carbon', 'nitrogen'],
      weights: [25, 25, 25, 25],
    },
    brown_dwarf: {
      types: ['hydrogen', 'helium', 'deuterium'],
      weights: [60, 30, 10],
    },
    red_dwarf: {
      types: ['hydrogen', 'helium', 'carbon'],
      weights: [50, 40, 10],
    },
    main_sequence: {
      types: ['hydrogen', 'helium', 'carbon', 'oxygen'],
      weights: [40, 30, 20, 10],
    },
    giant_star: {
      types: ['carbon', 'oxygen', 'neon'],
      weights: [30, 40, 30],
    },
    supergiant: {
      types: ['iron', 'silicon', 'magnesium'],
      weights: [20, 40, 40],
    },
    black_hole: {
      types: ['dark_matter', 'graviton_shards'],
      weights: [50, 50],
    },
    galaxy: {
      types: ['star_cluster', 'nebula_matter', 'dark_energy'],
      weights: [40, 30, 30],
    }
  };
  