"use client";

import { Target, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ChallengesCard({ isOpen, onClose }) {
  if (!isOpen) return null;

  const challenges = Array(5).fill({
    title: "Avail 50% discount on 2nd Day Air Letter",
  });

  return (
    <div className="fixed inset-0 flex items-start justify-end p-4 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <Card className="relative w-[500px] bg-[#2A2A36]/95 border-white/10 rounded-3xl overflow-hidden mt-16 mr-4 z-10">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span
              className="text-2xl font-bold italic"
              style={{
                background: "linear-gradient(180deg, #FFD572 0%, #FEBD38 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ongoing Challenge
            </span>
            <span className="text-xl text-white font-medium italic">
              180XP Remaining
            </span>
          </div>

          {/* Challenges List */}
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-white/90 p-2 rounded-lg transition-colors hover:bg-white/5"
              >
                <Target size={24} className="text-white/50" />
                <span className="text-lg italic font-medium">
                  {challenge.title}
                </span>
              </div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="bg-[#1C1C24]/50 rounded-xl p-4 mt-4">
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
                className="text-lg font-bold italic"
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
            <p className="text-white/80 italic">
              Use the{" "}
              <span className="underline">Contract Discount Negotiation</span>{" "}
              Chatbot to get discounts and completing the challenge
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
