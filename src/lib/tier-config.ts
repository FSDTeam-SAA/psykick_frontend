// Tier configuration based on the tier transition table
export interface TierConfig {
  tier: number;
  name: string;
  levelsUp: number;
  retainsTierMin: number;
  retainsTierMax: number;
  levelsDown: number;
  image?: string;
}

export const TIER_CONFIG: TierConfig[] = [
  {
    tier: 1,
    name: "NOVICE SEEKER",
    levelsUp: 1,
    retainsTierMin: 0,
    retainsTierMax: 0,
    levelsDown: Number.NEGATIVE_INFINITY, // NON VALID
  },
  {
    tier: 2,
    name: "INITIATE",
    levelsUp: 1,
    retainsTierMin: -29,
    retainsTierMax: 0,
    levelsDown: -30,
  },
  {
    tier: 3,
    name: "APPRENTICE",
    levelsUp: 31,
    retainsTierMin: 1,
    retainsTierMax: 30,
    levelsDown: 0,
  },
  {
    tier: 4,
    name: "EXPLORER",
    levelsUp: 61,
    retainsTierMin: 1,
    retainsTierMax: 60,
    levelsDown: 0,
  },
  {
    tier: 5,
    name: "VISIONARY",
    levelsUp: 81,
    retainsTierMin: 31,
    retainsTierMax: 80,
    levelsDown: 30,
  },
  {
    tier: 6,
    name: "ADEPT",
    levelsUp: 101,
    retainsTierMin: 31,
    retainsTierMax: 100,
    levelsDown: 30,
  },
  {
    tier: 7,
    name: "SEER",
    levelsUp: 121,
    retainsTierMin: 61,
    retainsTierMax: 120,
    levelsDown: 60,
  },
  {
    tier: 8,
    name: "ORACLE",
    levelsUp: 141,
    retainsTierMin: 61,
    retainsTierMax: 140,
    levelsDown: 60,
  },
  {
    tier: 9,
    name: "MASTER REMOTE VIEWER",
    levelsUp: 161,
    retainsTierMin: 101,
    retainsTierMax: 160,
    levelsDown: 100,
  },
  {
    tier: 10,
    name: "ASCENDING MASTER",
    levelsUp: Number.POSITIVE_INFINITY, // NON VALID
    retainsTierMin: 121,
    retainsTierMax: Number.POSITIVE_INFINITY,
    levelsDown: 120,
  },
];

// Determine current tier based on score
export function getCurrentTier(score: number): TierConfig | null {
  for (const tier of TIER_CONFIG) {
    if (score >= tier.retainsTierMin && score <= tier.retainsTierMax) {
      return tier;
    }
  }
  return null;
}

// Get color state based on score and tier
export function getColorState(
  score: number,
  tier: TierConfig,
): "green" | "blue" | "red" {
  if (score >= tier.levelsUp) {
    return "green"; // Can level up
  } else if (score >= tier.retainsTierMin && score <= tier.retainsTierMax) {
    return "blue"; // Retains tier
  } else if (score <= tier.levelsDown) {
    return "red"; // Levels down
  }
  return "blue"; // Default to retain
}
