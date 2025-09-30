/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface ProgressTrackerProps {
  up: number;
  down: number;
  currentScore: number;
  completedChallenges: number;
  tierImages: any;
}

export default function ProgressTrackerCard({
  up,
  down,
  currentScore,
  completedChallenges,
  tierImages,
}: ProgressTrackerProps) {
  // Y-axis configuration: -100, 0, 30, 275
  const yAxisValues = [-100, down, up, 275];
  const yMin = -100;
  const yMax = 275;
  const yRange = yMax - yMin; // 375

  // X-axis: 1 to 10
  const xAxisValues = Array.from({ length: 10 }, (_, i) => i + 1);

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
    return paddingLeft + (value / 10) * plotWidth;
  };

  const getY = (value: number) => {
    const normalized = (value - yMin) / yRange;
    return paddingTop + plotHeight - normalized * plotHeight;
  };

  // Calculate cyan rectangle dimensions
  const rectWidth = (completedChallenges / 10) * plotWidth;
  const rectHeight = plotHeight - (getY(currentScore) - paddingTop);
  console.log(tierImages);
  // Map tier images to data points
  const dataPoints = [
    {
      x: 2,
      y: 0,
      color: "#D84315",
      tier: tierImages?.current?.image,
    },
    {
      x: 5,
      y: 30,
      color: "#FF6F00",
      tier: tierImages?.next[0]?.image,
    },
    {
      x: 7,
      y: 275,
      color: "#9CCC65",
      tier: tierImages?.next[1]?.image,
    },
  ];
  console.log(dataPoints);

  const generateHorizontalGridLines = () => {
    const lines = [];
    const step = 25;
    for (let value = yMin; value <= yMax; value += step) {
      lines.push(value);
    }
    return lines;
  };
  const horizontalGridLines = generateHorizontalGridLines();

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
          {xAxisValues.map((value) => (
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

          {/* Additional horizontal grid lines */}
          {[50, 100, 150, 200, 250].map((value) => (
            <line
              key={`h-grid-extra-${value}`}
              x1={paddingLeft}
              y1={getY(value)}
              x2={graphWidth - paddingRight}
              y2={getY(value)}
              stroke="#2d2d4d"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Bold Y-axis line */}
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={graphHeight - paddingBottom}
            stroke="#fff"
            strokeWidth="3"
          />

          {/* Bold X-axis line */}
          <line
            x1={paddingLeft}
            y1={graphHeight - paddingBottom}
            x2={graphWidth - paddingRight}
            y2={graphHeight - paddingBottom}
            stroke="#fff"
            strokeWidth="3"
          />

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="cyanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#59ecff" />
              <stop offset="50%" stopColor="#26C6DA" />
              <stop offset="100%" stopColor="#028394" />
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

          {/* Cyan filled rectangle */}
          <rect
            x={paddingLeft}
            y={getY(currentScore)}
            width={rectWidth}
            height={rectHeight}
            fill="url(#cyanGradient)"
            opacity="0.7"
          />

          {/* Progress line with gradient */}
          <path
            d={`M ${getX(dataPoints[0].x)} ${getY(dataPoints[0].y)} 
                L ${getX(dataPoints[1].x)} ${getY(dataPoints[1].y)} 
                L ${getX(dataPoints[2].x)} ${getY(dataPoints[2].y)}`}
            stroke="url(#lineGradient)"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Tier images as data points */}
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
              {/* <text
                x={getX(point.x)}
                y={getY(point.y) + 40}
                fill="#fff"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                className="uppercase"
              >
                {point.tier}
              </text> */}
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
            x={paddingLeft}
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
            fill="#fff"
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
