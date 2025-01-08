"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import next from "../../../public/next-ploy.svg";
import prev from "../../../public/prev-ploy.svg";
import { AnimatedRocket } from "./AnimatedRocket";

export function WelcomeScreen({ onClose, onNext }) {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute -top-8 right-2 text-[#FFB323] hover:text-[#FFB323]/80 cursor-pointer hover:bg-transparent p-0 text-base font-semibold italic"
      >
        Skip
      </Button>

      <div className="bg-white rounded-2xl p-4 px-6 w-full shadow-lg">
        <div className="flex flex-col items-center mb-8 pt-4">
          <div className="mb-6">
            <AnimatedRocket />
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-800 italic">
            Welcome to the Contract Discounts
          </h2>
        </div>
        <p className="text-gray-600 mb-2 text-lg italic">
          Welcome aboard, Kushagra!{" "}
          <span className="font-semibold">
            Ready to level up your savings strategy?
          </span>
        </p>
        <p className="text-gray-600 text-lg italic">
          Let's take a quick tour of your dashboard and unlock new
          possibilities. Complete the steps to earn rewards and become a Elite
          Optimizer!
        </p>
      </div>

      <div className="absolute left-0 right-0 flex items-end justify-end mt-2 pt-2 gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center mb-6 cursor-pointer hover:opacity-80">
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
