"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-next.svg";

export function LevelExplanationScreen({
  onClose,
  onNext,
  onPrev,
  currentStep,
}) {
  return (
    <div className="absolute top-28 left-1/2 -translate-x-1/2 w-full max-w-xs mx-auto -ml-24">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323] hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl p-6 w-full shadow-lg relative">
        {/* Rounded pointer tip */}
        <div
          className="absolute -top-4 left-[50px] -translate-x-1/2 w-6 h-6 bg-white"
          style={{
            transform: "rotate(45deg) translateY(50%)",
            borderTopLeftRadius: "4px",
          }}
        />

        <div className="mb-4">
          <p className="text-[#424259] text-base italic">
            This is your current level and XP tracker. As you complete
            challenges and improve your{" "}
            <span className="font-semibold">XP score</span>, you'll level up and
            unlock new <span className="font-semibold">levels</span> and{" "}
            <span className="font-semibold">challenges!</span>
          </p>
        </div>
        <div className="text-sm text-[#1E1E1E] italicfont-medium">
          Step {currentStep} of 5
        </div>
      </div>

      <div className="absolute -bottom-12 left-0 right-0 flex justify-end pt-2 gap-3">
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
        >
          <Image
            src={prev}
            alt="Previous"
            className="w-full h-full object-contain"
          />
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
        >
          <Image
            src={next}
            alt="Next"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
}
