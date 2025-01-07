"use client";

import { Target, Info } from "lucide-react";
import Image from "next/image";
import headerIcon from "../../public/header.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardChallenges() {
  const currentXP = 100;
  const maxXP = 300;
  const progress = (currentXP / maxXP) * 100;
  const gradientId = "targetGradient";
  const challenges = Array(5).fill({
    title: "Avail 50% discount on 2nd Day Air Letter",
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="relative flex items-center gap-3 px-12 py-2 rounded-full 
                border border-white transition-all hover:opacity-90"
            style={{
              background:
                "linear-gradient(180deg, #2A2A36 0%, #464653 50%, #6B6B6B 100%)",
              boxShadow: `
                  0px 0px 6px 0px rgba(0, 0, 0, 0.26),
                  0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset,
                  4px -1px 4.9px 0px rgba(0, 0, 0, 0.25) inset,
                  0px -4px 4.8px 0px rgba(0, 0, 0, 0.25) inset,
                  0 0 0 1px rgba(255, 255, 255, 0.1)
                `,
            }}
          >
            <svg width="0" height="0">
              <defs>
                <linearGradient
                  id={gradientId}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFD572" />
                  <stop offset="100%" stopColor="#FEBD38" />
                </linearGradient>
              </defs>
            </svg>
            <Target
              size={32}
              style={{
                stroke: `url(#${gradientId})`,
                strokeWidth: 2.5,
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[300px] p-4 backdrop-blur-sm mt-2 bg-[#2A2A36]"
          style={{
            border: "1px solid #FFFFFF",
            boxShadow: `
                0px 0px 6px 0px #00000042,
                0px 0px 4px 0px #00000040 inset,
                4px -1px 4.9px 0px #00000040 inset,
                0px -4px 4.8px 0px #00000040 inset
              `,
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-sm font-semibold italic"
              style={{
                background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ongoing Challenge
            </span>
            <span className="text-sm text-white font-bold italic">
              180XP Remaining
            </span>
          </div>

          {/* Challenges List */}
          <div className="space-y-4 mb-6">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-lg transition-colors cursor-pointer"
              >
                <Target size={24} className="text-[#B5B5B5]" />
                <span className="text-xs italic font-semibold text-white hover:text-white/80">
                  {challenge.title}
                </span>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="bg-[#555564] rounded-xl p-2">
            <div className="flex items-center gap-2 mb-2">
              <Info
                size={20}
                style={{
                  background:
                    "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <span
                className="text-sm font-bold italic"
                style={{
                  background:
                    "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tips
              </span>
            </div>
            <p className="text-white italic text-sm">
              Use the{" "}
              <span className="underline font-semibold">
                Contract Discount Negotiation
              </span>{" "}
              Chatbot to get discounts and completing the challenge
            </p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default DashboardChallenges;
