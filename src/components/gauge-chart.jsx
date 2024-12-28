"use client";

import React, { useState, useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export function GaugeChart({ score = 60 }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const requestRef = useRef();
  const startTimeRef = useRef();

  const radius = 170;
  const strokeWidth = 55;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.5;

  const svgSize = (radius + strokeWidth) * 2;
  const centerPoint = svgSize / 2;

  const animate = (time) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;
    const duration = 2000; // 2 seconds
    const progress = Math.min(elapsed / duration, 1);
    const currentScore = progress * score;

    setAnimatedScore(currentScore);

    if (progress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [score]);

  const normalizedScore = animatedScore / 100;
  const offset = arc - arc * normalizedScore;

  const innerRadius = radius - 70;
  const dotCount = 30;
  const dotRadius = 0.1;
  const dots = Array.from({ length: dotCount }).map((_, i) => {
    const angle = (Math.PI * i) / (dotCount - 1);
    const x = centerPoint + innerRadius * Math.cos(angle);
    const y = centerPoint + innerRadius * Math.sin(angle);
    return { x, y };
  });

  const lineStartX =
    centerPoint +
    (radius - strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
  const lineStartY =
    centerPoint +
    (radius - strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);
  const lineEndX =
    centerPoint +
    (radius + strokeWidth / 2) * Math.cos(Math.PI * normalizedScore);
  const lineEndY =
    centerPoint +
    (radius + strokeWidth / 2) * Math.sin(Math.PI * normalizedScore);

  return (
    <div
      className={`${montserrat.className} flex flex-col items-center space-y-1 mt-2 rounded-2xl bg-[#313143] p-6 border-2 border-[#464653]`}
    >
      <h2 className="text-xl font-bold text-white">HOW COMPETITIVE ARE YOU?</h2>

      <div className="relative h-[300px] w-[500px]">
        <svg
          className="absolute left-1/2 -top-8 -translate-x-1/2 rotate-180"
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          width="500"
          height="550"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Dots */}
          {dots.map((dot, i) => (
            <circle
              key={i}
              cx={dot.x}
              cy={dot.y}
              r={dotRadius}
              fill="none"
              stroke="rgba(255, 179, 35, 1)"
              strokeWidth="1"
            />
          ))}

          {/* Background arc */}
          <circle
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            fill="none"
            stroke="url(#darkGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc} ${circumference}`}
            strokeLinecap="butt"
          />

          {/* Foreground arc */}
          <circle
            cx={centerPoint}
            cy={centerPoint}
            r={radius}
            fill="none"
            stroke="url(#lightGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arc} ${circumference}`}
            strokeDashoffset={offset}
            strokeLinecap="butt"
          />

          {/* Indicator line */}
          <line
            x1={lineStartX}
            y1={lineStartY}
            x2={lineEndX}
            y2={lineEndY}
            stroke="white"
            strokeWidth="3"
          />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="lightGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#FFD572" />
              <stop offset="100%" stopColor="#FEBD38" />
            </linearGradient>

            <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6b4b0f" />
              <stop offset="100%" stopColor="#593F0C" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-11 text-center w-full space-y-1">
          <div className="text-[44px] font-semibold text-[#FFB800] tabular-nums tracking-tight">
            {Math.round(animatedScore)}
            <span className="text-[40px]">/100</span>
          </div>

          <p className="text-[24px] font-normal text-[#E2E2E2] w-full">
            Top 10% among peers!
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <p className="text-[18px] leading-relaxed text-[#B5B5B5] tracking-wide mt-3">
          {"You're only "}
          <span className="text-[#FFB323] font-semibold">7</span>
          {" points away from"}
          <br />
          {"being in the Top "}
          <span className="text-[#FFB323] font-semibold">5%</span>!
        </p>
      </div>
    </div>
  );
}
