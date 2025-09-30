export interface TierThresholds {
  up: number;
  down: number;
  retainMin: number;
  retainMax: number;
  image: string;
}

export interface GraphConfig {
  yMin: number;
  yMax: number;
  xMax: number;
}

export interface TierData {
  currentScore: number;
  completedChallenges: number;
  targetsLeft: number;
  tierRank: string;
  nextTierPoint: number;
  challengePoints: number[];
  tierThresholds: TierThresholds;
  graphConfig: GraphConfig;
  tierImages: object;
}

export interface TierInfoResponse {
  status: boolean;
  message: string;
  data: TierData;
}
