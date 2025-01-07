"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-next.svg";

export function ContractSimulatorExplanationScreen({
  onClose,
  onNext,
  onPrev,
  currentStep,
}) {
  return (
    <div className="absolute top-1/4 -right-20 w-full max-w-md mt-20">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323] hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl p-6 w-full shadow-lg relative">
      <div className="absolute -bottom-3 left-[50px] -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-white" />
        
        <div className="mb-4">
          <h3 className="text-[#424259] text-lg font-semibold mb-2">
            How to Simulate Your Contract Discounts?
          </h3>
          <p className="text-[#424259] text-base italic">
            Time to play with the sliders! <span className="font-semibold">Adjust</span> your contract discounts in real-time to see how much you can save annually. The goal is to <span className="font-semibold">maximize your competitive score!</span>
          </p>
        </div>
        <div className="text-sm text-gray-500 italic">
          Step {currentStep} of 5
        </div>
      </div>

      <div className="absolute -bottom-10 right-0 flex justify-end gap-2">
        <button
          onClick={onPrev}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
        >
          <Image src={prev} alt="Previous" className="w-6 h-6 object-contain" />
        </button>
        <button
          onClick={onNext}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
        >
          <Image src={next} alt="Next" className="w-6 h-6 object-contain" />
        </button>
      </div>
    </div>
  );
}

