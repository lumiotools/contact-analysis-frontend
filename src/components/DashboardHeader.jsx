"use client";

import Image from "next/image";

const COMPETITIVE_LEVELS = {
  BEGINNER: {
    min: 0,
    max: 25,
    icon: "/Trophy.svg",
    title: "Beginner Negotiator",
    glow: "rgba(255, 199, 0, 0.15)",
    backdrop: "rgba(255, 199, 0, 0.1)",
  },
  PRO: {
    min: 26,
    max: 50,
    icon: "/Bronze.svg",
    title: "Pro Deal-Maker",
    glow: "rgba(205, 127, 50, 0.15)",
    backdrop: "rgba(205, 127, 50, 0.1)",
  },
  STRATEGIST: {
    min: 51,
    max: 75,
    icon: "/Silver.svg",
    title: "Savings Strategist",
    glow: "rgba(192, 192, 192, 0.15)",
    backdrop: "rgba(192, 192, 192, 0.1)",
  },
  ELITE: {
    min: 76,
    max: 100,
    icon: "/Gold.svg",
    title: "Elite Optimizer",
    glow: "rgba(255, 215, 0, 0.15)",
    backdrop: "rgba(255, 215, 0, 0.1)",
  },
};

function getCompetitiveLevel(score) {
  if (score <= COMPETITIVE_LEVELS.BEGINNER.max)
    return COMPETITIVE_LEVELS.BEGINNER;
  if (score <= COMPETITIVE_LEVELS.PRO.max) return COMPETITIVE_LEVELS.PRO;
  if (score <= COMPETITIVE_LEVELS.STRATEGIST.max)
    return COMPETITIVE_LEVELS.STRATEGIST;
  return COMPETITIVE_LEVELS.ELITE;
}

export function DashboardHeader({
  competitiveScore = 75,
  currentXP = 120,
  maxXP = 300,
}) {
  const progress = (currentXP / maxXP) * 100;
  const level = getCompetitiveLevel(competitiveScore);

  return (
    <div className="flex items-center gap-8 rounded-lg py-4">
      {/* Logo and title section with backdrop */}
      <div className="flex items-center gap-3">
        {/* Icon container with glow effect */}
        <div className="relative">
          {/* Glow backdrop */}
          <div
            className="absolute inset-0 rounded-full blur-sm"
            style={{
              background: level.glow,
              transform: "scale(0.4)",
            }}
          />
          {/* Icon backdrop */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: level.backdrop,
              transform: "scale(0.1)",
            }}
          />
          {/* Icon */}
          <div className="relative w-20 h-20 -ml-4">
            <Image
              src={level.icon}
              alt={`${level.title} Icon`}
              fill
              className="object-contain"
            />
          </div>
        </div>
        {/* Title with backdrop */}
        <div className="relative">
          <div
            className="absolute inset-0 blur-lg opacity-50"
            style={{
              background: level.backdrop,
              transform: "scale(0.2)",
            }}
          />
          <span className="relative text-xl font-bold tracking-wide italic text-white">
            {level.title}
          </span>
        </div>
      </div>

      {/* Level Progress Section */}
      <div className="flex items-center gap-4">
        <div className="relative w-[300px]">
          <div className="flex justify-between items-center mb-1">
            {/* Level indicator with golden backdrop */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FFD572]/20 blur-xl rounded-md" />
              <span
                className="relative text-lg font-bold italic ml-2.5 px-3 py-1 rounded-md"
                style={{
                  background:
                    "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Level 3
              </span>
            </div>
            {/* XP Counter */}
            <div className="flex items-center gap-2 text-base text-[#E8E8E8] italic mr-1">
              <span className="font-bold">{currentXP}XP</span>
              <span className="font-medium">/</span>
              <span className="font-medium">{maxXP}XP</span>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="relative h-[14px] w-full">
            {/* Background Bar */}
            <div
              className="absolute inset-0"
              style={{
                background: "#464653",
                clipPath:
                  "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)",
              }}
            />
            {/* Progress Fill with glow */}
            <div
              className="absolute inset-0 h-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                clipPath:
                  "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                transition: "width 0.3s ease-in-out",
                boxShadow: "0px 2px 4px rgba(255, 213, 114, 0.4)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
