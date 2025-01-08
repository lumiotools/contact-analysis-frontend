"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-next.svg";

export function SavingsExplanationScreen({
  onClose,
  onNext,
  onPrev,
  currentStep,
}) {
  return (
    <div className="absolute top-1/4 left-24 w-full max-w-sm">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323]/80 cursor-pointer hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl px-6 py-3 w-full shadow-lg relative">
        {/* Rounded pointer tip - pointing right */}
        <div
          className="absolute -right-1 top-10 w-6 h-6 bg-white"
          style={{
            transform: "rotate(45deg) translateY(-50%)",
            borderTopRightRadius: "4px",
          }}
        />

        <div className="mb-4">
          <h3 className="text-[#424259] text-lg font-semibold mb-2 italic">
            Your Savings Over Time
          </h3>
          <p className="text-[#424259] text-base italic">
            This chart shows your{" "}
            <span className="font-semibold">savings progress</span> over time.
            Watch as your financial decisions impact your growing nest egg. Keep
            an eye on this to track your{" "}
            <span className="font-semibold">long-term financial health</span>!
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
