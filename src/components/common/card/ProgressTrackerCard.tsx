/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* Lines 3-5 omitted */

import { TIER_CONFIG, type TierConfig } from "@/lib/tier-config";

interface ProgressTrackerProps {
  up: number;
  down: number;
  currentScore: number;
  completedChallenges: number;
  tierImages: any;
  currentTierName: string;
}

export default function ProgressTrackerCard({
  up,
  down,
  currentScore,
  completedChallenges,
  tierImages,
  currentTierName,
}: ProgressTrackerProps) {
  const currentTierConfig = TIER_CONFIG.find((t) => t.name === currentTierName);
  console.log(
    up,
    down,
    currentScore,
    completedChallenges,
    tierImages,
    currentTierName,
  );
  if (!currentTierConfig) {
    console.error(`Tier "${currentTierName}" not found in configuration`);
    return null;
  }

  const currentTierIndex = TIER_CONFIG.indexOf(currentTierConfig);
  const isLowestTier = currentTierIndex === 0;
  const isHighestTier = currentTierIndex === TIER_CONFIG.length - 1;

  const previousTier: TierConfig | null = !isLowestTier
    ? TIER_CONFIG[currentTierIndex - 1]
    : null;
  const nextTier: TierConfig | null = !isHighestTier
    ? TIER_CONFIG[currentTierIndex + 1]
    : null;

  const getXFromY = (y: number) => {
    const slope = (275 - -100) / (10 - 1); // 375 / 9 ≈ 41.67
    return 1 + (y - -100) / slope;
  };

  const dataPoints: Array<{
    x: number;
    y: number;
    color: string;
    tier: string;
    label: string;
  }> = [];

  // --- Dynamic Tier Image Placement Logic ---
  // Always show bottom image at -100 (previous tier or current if lowest)
  // Current image at current tier start (retainsTierMin)
  // Top image at current tier end (levelsUp)

  // Helper to get image safely
  const getTierImage = (type: "previous" | "current" | "next") => {
    if (type === "previous") {
      // previous tier image: tierImages?.prev?.image or fallback
      return (
        tierImages?.next[0]?.image || "/placeholder.svg?height=40&width=40"
      );
    }
    if (type === "current") {
      return (
        tierImages?.current?.image || "/placeholder.svg?height=40&width=40"
      );
    }
    if (type === "next") {
      // next tier image: tierImages?.next?.image or fallback
      // Some APIs may return next as array or object
      if (Array.isArray(tierImages?.next)) {
        return (
          tierImages?.next[1]?.image ||
          tierImages?.next[0]?.image ||
          "/placeholder.svg?height=40&width=40"
        );
      }
      return tierImages?.next?.image || "/placeholder.svg?height=40&width=40";
    }
    return "/placeholder.svg?height=40&width=40";
  };

  // 1. Bottom image: always at -100
  if (isLowestTier) {
    // For NOVICE SEEKER: only show current tier at bottom and next tier at top
    dataPoints.push({
      x: getXFromY(-100),
      y: -100,
      color: "#FF6F00",
      tier: getTierImage("current"),
      label: currentTierConfig.name,
    });
    // Top image at end of tier (next tier)
    if (nextTier) {
      dataPoints.push({
        x: getXFromY(currentTierConfig.levelsUp),
        y: currentTierConfig.levelsUp,
        color: "#9CCC65",
        tier: getTierImage("next"),
        label: nextTier.name,
      });
    }
  } else if (isHighestTier) {
    // For ASCENDING MASTER: show current tier at top and previous tier in middle
    // Top image (current tier - ASCENDING MASTER)
    dataPoints.push({
      x: getXFromY(275),
      y: 275,
      color: "#9CCC65",
      tier: getTierImage("current"),
      label: currentTierConfig.name,
    });
    // Middle image (previous tier - MASTER REMOTE VIEWER)
    if (previousTier) {
      dataPoints.push({
        x: getXFromY(previousTier.retainsTierMin),
        y: previousTier.retainsTierMin,
        color: "#FF6F00",
        tier: getTierImage("previous"),
        label: previousTier.name,
      });
    }
  } else {
    // Middle tiers: bottom = NOVICE SEEKER, middle = current, top = next
    // Bottom image (always NOVICE SEEKER) at -100
    const noviceSeekerTier = TIER_CONFIG[0]; // NOVICE SEEKER is always first tier
    dataPoints.push({
      x: getXFromY(-100),
      y: -100,
      color: "#D84315",
      tier: noviceSeekerTier.image || getTierImage("previous"),
      label: noviceSeekerTier.name,
    });
    // Current image at start of tier
    dataPoints.push({
      x: getXFromY(currentTierConfig.retainsTierMin),
      y: currentTierConfig.retainsTierMin,
      color: "#FF6F00",
      tier: getTierImage("current"),
      label: currentTierConfig.name,
    });
    // Top image (next tier) at end of tier
    if (nextTier) {
      dataPoints.push({
        x: getXFromY(currentTierConfig.levelsUp),
        y: currentTierConfig.levelsUp,
        color: "#9CCC65",
        tier: getTierImage("next"),
        label: nextTier.name,
      });
    }
  }

  // Sort by y position (bottom to top)
  dataPoints.sort((a, b) => a.y - b.y);

  // Y-axis configuration
  const yAxisValues = [-100, down, up, 275];
  const yMin = -100;
  const yMax = 275;
  const yRange = yMax - yMin;

  const xMin = 1;
  const xMax = 10;
  const xRange = xMax - xMin;
  const xAxisValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Graph dimensions
  const graphWidth = 540;
  const graphHeight = 440;
  const paddingLeft = 60;
  const paddingRight = 40;
  const paddingTop = 40;
  const paddingBottom = 60;
  const plotWidth = graphWidth - paddingLeft - paddingRight;
  const plotHeight = graphHeight - paddingTop - paddingBottom;

  // Helper function to convert data coordinates to SVG coordinates
  const getX = (value: number) => {
    const normalized = (value - xMin) / xRange;
    return paddingLeft + normalized * plotWidth;
  };

  const getY = (value: number) => {
    const normalized = (value - yMin) / yRange;
    return paddingTop + plotHeight - normalized * plotHeight;
  };

  // const currentX = getXFromY(currentScore);
  const areaPath = `
    M ${getX(1)} ${getY(-100)}
    L ${getX(completedChallenges)} ${getY(-100)}
    L ${getX(completedChallenges)} ${getY(currentScore)}
    L ${getX(1)} ${getY(currentScore)}
    Z
  `;

  const generateHorizontalGridLines = () => {
    const lines = [];
    const step = 25;
    for (let value = yMin; value <= yMax; value += step) {
      lines.push(value);
    }
    return lines;
  };
  const horizontalGridLines = generateHorizontalGridLines();

  const verticalGridLines = xAxisValues;

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-[#1a1a2e] rounded-2xl p-8 shadow-2xl">
        {/* SVG Graph */}
        <svg
          width={graphWidth}
          height={graphHeight}
          className="w-full"
          viewBox={`0 0 ${graphWidth} ${graphHeight}`}
        >
          {/* Grid lines - vertical */}
          {verticalGridLines.map((value) => (
            <line
              key={`v-grid-${value}`}
              x1={getX(value)}
              y1={paddingTop}
              x2={getX(value)}
              y2={graphHeight - paddingBottom}
              stroke="#2d2d4d"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {horizontalGridLines.map((value) => (
            <line
              key={`h-grid-${value}`}
              x1={paddingLeft}
              y1={getY(value)}
              x2={graphWidth - paddingRight}
              y2={getY(value)}
              stroke="#2d2d4d"
              strokeWidth="1"
              opacity="0.5"
            />
          ))}

          {/* Bold Y-axis line */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={graphHeight - paddingBottom}
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Bold X-axis line */}
          <line
            x1={paddingLeft}
            y1={graphHeight - paddingBottom}
            x2={graphWidth - paddingRight}
            y2={graphHeight - paddingBottom}
            stroke="#fff"
            strokeWidth="2"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#59ecff92" />
              <stop offset="50%" stopColor="#26c5da81" />
              <stop offset="100%" stopColor="#028394bc" />
            </linearGradient>

            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D84315" />
              <stop offset="40%" stopColor="#FF6F00" />
              <stop offset="70%" stopColor="#FFA726" />
              <stop offset="100%" stopColor="#9CCC65" />
            </linearGradient>

            {/* Clip paths for circular tier images */}
            {dataPoints.map((point, index) => (
              <clipPath key={`clip-${index}`} id={`circleClip-${index}`}>
                <circle cx={getX(point.x)} cy={getY(point.y)} r="20" />
              </clipPath>
            ))}
          </defs>

          <path d={areaPath} fill="url(#cyanGradient)" opacity="0.7" />

          <path
            d={`M ${getX(1)} ${getY(-100)} L ${getX(10)} ${getY(275)}`}
            stroke="url(#lineGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />

          {dataPoints.map((point, index) => (
            <g key={`point-${index}`}>
              {/* Outer glow */}
              <circle
                cx={getX(point.x)}
                cy={getY(point.y)}
                r="28"
                fill={point.color}
                opacity="0.3"
              />

              {/* White border circle */}
              <circle
                cx={getX(point.x)}
                cy={getY(point.y)}
                r="22"
                fill="#fff"
                stroke={point.color}
                strokeWidth="2.5"
              />

              {/* Tier image */}
              <image
                href={point.tier}
                x={getX(point.x) - 20}
                y={getY(point.y) - 20}
                width="40"
                height="40"
                clipPath={`url(#circleClip-${index})`}
                preserveAspectRatio="xMidYMid slice"
              />

              {/* Tier name label */}
              <text
                x={getX(point.x)}
                y={getY(point.y) + 40}
                fill="#fff"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                className="uppercase"
              >
                {point.label}
              </text>
            </g>
          ))}

          {/* Y-axis label */}
          <text
            x={5}
            y={paddingTop - 20}
            fill="#a107fa"
            fontSize="13"
            fontWeight="700"
            className="uppercase tracking-wider"
          >
            Points
          </text>

          {/* Y-axis values */}
          {yAxisValues.map((value) => (
            <text
              key={`y-label-${value}`}
              x={paddingLeft - 25}
              y={getY(value) + 5}
              fill="#fff"
              fontSize="15"
              fontWeight="600"
              textAnchor="end"
            >
              {value}
            </text>
          ))}

          {/* Current score Y-axis indicator */}
          <text
            x={paddingLeft - 10}
            y={getY(currentScore) + 5}
            fill="#E91E63"
            fontSize="15"
            fontWeight="700"
            textAnchor="end"
          >
            {currentScore}
          </text>

          {/* X-axis label */}
          <text
            x={paddingLeft}
            y={graphHeight - 1}
            fill="#cc00ff"
            fontSize="13"
            fontWeight="700"
            className="uppercase tracking-wider"
          >
            Targets Completed
          </text>

          {/* X-axis values */}
          {xAxisValues.map((value) => (
            <text
              key={`x-label-${value}`}
              x={getX(value)}
              y={graphHeight - paddingBottom + 28}
              fill={value === completedChallenges ? "#E91E63" : "#fff"}
              fontSize={value === completedChallenges ? "18" : "15"}
              fontWeight={value === completedChallenges ? "700" : "500"}
              textAnchor="middle"
            >
              {value}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
