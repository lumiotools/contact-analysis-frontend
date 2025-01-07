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
    <div className="absolute top-1/4 left-28 w-full max-w-sm">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323] hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl p-6 w-full shadow-lg relative">
        <div className="absolute -right-3 top-10 -translate-y-1/2 w-0 h-0 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent border-l-[16px] border-l-white" />

        <div className="mb-4">
          <h3 className="text-[#424259] text-lg font-semibold mb-2">
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
        <div className="text-sm text-gray-500 italic">
          Step {currentStep} of 5
        </div>
      </div>

      <div className="absolute -bottom-10 left-0 right-0 flex justify-end mt-2">
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
