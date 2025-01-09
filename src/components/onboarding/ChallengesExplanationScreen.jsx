"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-next.svg";

export function ChallengesExplanationScreen({
  onClose,
  onNext,
  onPrev,
  currentStep,
}) {
  return (
    <div className="absolute top-40 right-1/3 w-full max-w-md mr-8">
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
          className="absolute -right-1 top-10 w-6 h-6 bg-white"
          style={{
            transform: "rotate(45deg) translateY(-50%)",
            borderTopRightRadius: "4px",
          }}
        />

        <div className="mb-4">
          <h3 className="text-[#424259] text-lg font-semibold mb-2 italic">
            Finally, Explore the Challenges Section!
          </h3>
          <p className="text-[#424259] text-base italic">
            Let's talk challenges! Click on the 'Challenges' button to{" "}
            <span className="font-semibold">view/track</span> ongoing
            challenges. Each completed challenge earns you{" "}
            <span className="font-semibold">30XP</span> and boosts your level.
            Use the Tip Bar within for{" "}
            <span className="font-semibold">quick tips</span> to finish them
            efficiently.
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
