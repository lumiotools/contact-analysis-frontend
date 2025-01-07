"use client";

import React, { useState, useEffect, useRef } from "react";
import { Target, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardChallenges({ isOpen: propIsOpen = false }) {
  const [isOpen, setIsOpen] = useState(propIsOpen);
  const [showCompleted, setShowCompleted] = useState(false);
  const contentRef = useRef(null);
  const ongoingChallenges = Array(5).fill({
    title: "Avail 50% discount on 2nd Day Air Letter",
  });
  const completedChallenges = Array(5).fill({
    title: "Avail 50% discount on 2nd Day Air Letter",
  });

  useEffect(() => {
    setIsOpen(propIsOpen);
  }, [propIsOpen]);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        setShowCompleted(true);
      }
    }
  };

  const handleOpenChange = (open) => {
    setIsOpen(open);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <button
          onClick={handleButtonClick}
          className="relative flex items-center gap-3 px-12 py-2 rounded-full transition-all hover:opacity-90"
          style={{
            background: "#464653",
            boxShadow: `
              0px 0px 6px 0px #00000042,
              0px 0px 4px 0px #00000040 inset,
              4px -1px 4.9px 0px #00000040 inset,
              0px -4px 4.8px 0px #00000040 inset
            `,
            border: `2px solid ${isOpen ? "#FFD572" : "#FFFFFF"}`,
          }}
        >
          <Target
            size={32}
            className="text-[#FFD572]"
            style={{ strokeWidth: 2.5 }}
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
        className="w-[310px] p-4 mt-2"
        style={{
          backgroundColor: "#464653",
          border: `1px solid ${
            isOpen ? "#FFD572" : "rgba(255, 255, 255, 0.1)"
          }`,
          boxShadow: `
            0px 0px 6px 0px rgba(0, 0, 0, 0.42),
            0px 0px 4px 0px rgba(0, 0, 0, 0.40) inset,
            4px -1px 4.9px 0px rgba(0, 0, 0, 0.40) inset,
            0px -4px 4.8px 0px rgba(0, 0, 0, 0.40) inset
          `,
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div
          ref={contentRef}
          onScroll={handleScroll}
          className="space-y-2 h-[160px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#22222E] [&::-webkit-scrollbar-track]:bg-[#22222E]/20"
          style={{
            scrollbarWidth: "none",
            scrollbarColor: '#22222E #22222E20'
          }}
        >
          {/* Ongoing Challenges Header */}
          <div className="flex items-center justify-between mb-2">
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

          {/* Ongoing Challenges */}
          {ongoingChallenges.map((challenge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 py-1 rounded-lg transition-colors cursor-pointer group"
            >
              <Target size={20} className="text-white" />
              <span className="text-xs italic font-semibold text-white/90">
                {challenge.title}
              </span>
            </div>
          ))}

          {/* Completed Challenges Section */}
          <div
            className={`pt-2 transition-opacity duration-300 ${
              showCompleted ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span
                className="text-sm font-semibold italic"
                style={{
                  background:
                    "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Completed Challenge
              </span>
              <span className="text-sm text-white font-bold italic">
                120XP Collected
              </span>
            </div>
            {completedChallenges.map((challenge, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1 rounded-lg transition-colors cursor-pointer group mt-2"
              >
                <Target size={20} className="text-[#FFD572]" />
                <span className="text-xs italic font-semibold text-white/90">
                  {challenge.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#555564] rounded-xl p-3 mt-4">
          <div className="flex items-center gap-2 mb-2">
            <Info size={20} className="text-[#FFD572]" />
            <span
              className="text-sm font-bold italic"
              style={{
                background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Tips
            </span>
          </div>
          <p className="text-white/90 italic text-xs leading-relaxed">
            Use the{" "}
            <span className="underline font-semibold">
              Contract Discount Negotiation
            </span>{" "}
            Chatbot to get discounts and complete the challenge
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashboardChallenges;