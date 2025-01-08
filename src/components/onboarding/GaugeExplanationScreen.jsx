"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-next.svg";

export function GaugeExplanationScreen({
  onClose,
  onNext,
  onPrev,
  currentStep,
}) {
  return (
    <div className="absolute top-1/4 right-24 w-full max-w-sm">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323]/80 cursor-pointer hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl p-6 pb-3 w-full shadow-lg relative">
        {/* Rounded pointer tip - pointing left */}
        <div
          className="absolute -left-0.5 top-10 -translate-x-1/2 w-6 h-6 bg-white"
          style={{
            transform: "rotate(-45deg) translateX(-50%)",
            borderTopLeftRadius: "4px",
          }}
        />

        <div className="mb-4">
          <h3 className="text-[#424259] text-lg font-semibold mb-2 italic">
            How Competitive Are You?
          </h3>
          <p className="text-[#424259] text-base italic">
            Let's see where you <span className="font-semibold">stand!</span>{" "}
            This is your Competitiveness{" "}
            <span className="font-semibold">Score</span>—a visual snapshot of
            how you're doing compared to your peers. 🎯 Aim for the{" "}
            <span className="font-semibold">top 5%</span> to unlock exclusive
            perks!"
          </p>
        </div>
        <div className="text-sm text-[#1E1E1E] italic font-medium">
          Step {currentStep} of 5
        </div>
      </div>

      <div className="absolute left-0 right-0 flex items-end justify-end mt-2 pt-2 gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:opacity-80"
          onClick={onPrev}
        >
          <Image
            src={prev}
            alt="Previous"
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:opacity-80"
          onClick={onNext}
        >
          <Image
            src={next}
            alt="Next"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
