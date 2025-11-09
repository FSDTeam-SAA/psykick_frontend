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

 // Helper function to get colors based on tier state
 export const getTierStateColors = (score: number, tier: TierConfig) => {
    const state = getColorState(score, tier);

    switch (state) {
      case "green":
        return {
          gradient: {
            start: "#00ff5e83", // Light bright green with 51% opacity
            middle: "#22c55e88", // Medium green with 53% opacity
            end: "#21a5517b", // Dark green with 48% opacity
          },
          text: "#4ade80", // Bright green for text
          border: "#22c55e", // Medium green for borders
          glow: "#00ff5e33", // Very light green for glowing effects
        };
      case "red":
        return {
          gradient: {
            start: "#ef444466", // Light red with 40% opacity
            middle: "#dc262688", // Medium red with 53% opacity
            end: "#b91c1caa", // Dark red with 67% opacity
          },
          text: "#ef4444", // Bright red for text
          border: "#dc2626", // Medium red for borders
          glow: "#ef444433", // Very light red for glowing effects
        };
      default: // "blue" state
        return {
          gradient: {
            start: "#3df9ff99", // Light cyan with 60% opacity
            middle: "#00e1ff87", // Medium cyan with 53% opacity
            end: "#1d93d855", // Dark cyan with 33% opacity
          },
          text: "#3df9ff", // Bright cyan for text
          border: "#00e1ff", // Medium cyan for borders
          glow: "#3df9ff33", // Very light cyan for glowing effects
        };
    }
  };