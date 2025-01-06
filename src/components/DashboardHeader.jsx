"use client";

import { Target } from 'lucide-react';
import Image from "next/image";
import headerIcon from "../../public/header.svg";

export function DashboardHeader() {
  const currentXP =100;
  const maxXP = 300;
  const progress = (currentXP / maxXP) * 100;
  const gradientId = "targetGradient";

  return (
    <div className="w-full py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo and title */}
          <div className="flex items-center gap-3">
            <div className="relative w-[50px] h-[50px]">
              <Image
                src={headerIcon}
                alt="Star Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-white text-base font-bold tracking-wide italic">
              Savings Strategist
            </span>
          </div>

          {/* Level Progress Section */}
          <div className="flex items-center gap-4">
            <div className="relative w-[300px]">
              <div className="flex justify-between items-center mb-1">
                <span 
                  className="text-base font-bold italic ml-2.5"
                  style={{
                    background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Level 3
                </span>
                <div className="flex items-center gap-2 text-base text-[#E8E8E8] italic mr-1">
                  <span className="font-bold">120XP</span>
                  <span className="font-medium">/</span>
                  <span className="font-medium">300XP</span>
                </div>
              </div>

              {/* Progress Bar Container */}
              <div className="relative h-[14px] w-full">
                {/* Background Bar */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "#464653",
                    clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                    boxShadow: "inset 0px 2px 4px rgba(0, 0, 0, 0.25)"
                  }}
                />

                {/* Progress Fill */}
                <div
                  className="absolute inset-0 h-full"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                    clipPath: "polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)",
                    transition: "width 0.3s ease-in-out",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)"
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Challenges Button */}
        <button
          className="relative flex items-center gap-3 px-12 py-2 rounded-full 
            border border-white transition-all hover:opacity-90"
          style={{
            background: "linear-gradient(180deg, #2A2A36 0%, #464653 50%, #6B6B6B 100%)",
            boxShadow: `
              0px 0px 6px 0px rgba(0, 0, 0, 0.26),
              0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset,
              4px -1px 4.9px 0px rgba(0, 0, 0, 0.25) inset,
              0px -4px 4.8px 0px rgba(0, 0, 0, 0.25) inset,
              0 0 0 1px rgba(255, 255, 255, 0.1)
            `
          }}
        >
          <svg width="0" height="0">
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFD572" />
                <stop offset="100%" stopColor="#FEBD38" />
              </linearGradient>
            </defs>
          </svg>
          <Target
            size={32}
            style={{
              stroke: `url(#${gradientId})`,
              strokeWidth: 2.5
            }}
          />
          <span 
            className="font-bold text-xl italic"
            style={{
              background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Challenges
          </span>
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;

