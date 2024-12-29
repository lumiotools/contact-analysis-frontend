"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export const contractData = {
  services: [
    {
      id: 1,
      name: "Next Day Package",
      currentDiscount: "32%",
      defaultValue: 65,
      projectedSavings: "$12.5k",
      category: "express",
    },
    {
      id: 2,
      name: "2 Day Package",
      currentDiscount: "28%",
      defaultValue: 72,
      projectedSavings: "$8.3k",
      category: "standard",
    },
    {
      id: 3,
      name: "3 Day Package",
      currentDiscount: "35%",
      defaultValue: 58,
      projectedSavings: "$15.2k",
      category: "standard",
    },
    {
      id: 4,
      name: "UPS Ground Commercial",
      currentDiscount: "30%",
      defaultValue: 68,
      projectedSavings: "$9.7k",
      category: "ground",
    },
    {
      id: 5,
      name: "DAS Commercial",
      currentDiscount: "25%",
      defaultValue: 75,
      projectedSavings: "$11.3k",
      category: "commercial",
    },
    {
      id: 6,
      name: "2 Day Air Package",
      currentDiscount: "33%",
      defaultValue: 62,
      projectedSavings: "$13.8k",
      category: "express",
    },
    {
      id: 7,
      name: "Express Delivery",
      currentDiscount: "40%",
      defaultValue: 55,
      projectedSavings: "$18.2k",
      category: "express",
    },
    {
      id: 8,
      name: "International Shipping",
      currentDiscount: "22%",
      defaultValue: 78,
      projectedSavings: "$7.5k",
      category: "international",
    },
  ],
  totalPotentialSavings: "$60k",
  currentSaving: "$47k",
  competitiveScore: 84,
};

export default function ContractSimulator() {
  const [discounts, setDiscounts] = useState(
    Object.fromEntries(
      contractData.services.map((service) => [
        service.name,
        parseInt(service.currentDiscount),
      ])
    )
  );

  const handleDiscountChange = (service, value) => {
    setDiscounts((prev) => ({
      ...prev,
      [service]: value[0],
    }));
  };

  return (
    <div className="w-full rounded-2xl bg-[#2A2A36] p-6 md:p-8 border-2 border-[#464653]">
      <div className="flex flex-col gap-8 md:flex-row md:items-stretch md:justify-between">
        <div className="flex-shrink-0 md:w-1/2 md:sticky md:top-8 h-full">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-wide text-[#E8E8E8]">
                SIMULATE YOUR CONTRACT DISCOUNTS
              </h2>
              <p className="mt-1 text-sm text-[#B5B5B5]">
                Adjust your discounts to see how your savings improve
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  Current Saving:
                </span>
                <span className="font-semibold text-[#FFA726]">
                  {contractData.currentSaving}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline">
                  <span className="text-3xl font-medium text-[#FFA726]">$</span>
                  <span className="text-5xl font-semibold text-[#FFA726]">
                    60
                  </span>
                  <span className="text-3xl font-medium text-[#FFA726]">k</span>
                </div>
                <p className="mt-1 text-sm text-[#B5B5B5]">
                  You Can Save Annually with{" "}
                  <span className="font-medium text-white">50%</span> discount
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-white">
                  Competitive Score
                </span>
                <div className="relative h-10 w-full md:w-[500px] overflow-hidden rounded-full bg-[#363647]">
                  <div
                    className="h-full absolute left-0"
                    style={{
                      width: "64%",
                      background:
                        "linear-gradient(90deg, #FFD572 0%, #FEBD38 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-6">
                    <span className="text-lg font-medium">
                      <span className="text-white">
                        {contractData.competitiveScore}
                      </span>
                      <span className="text-[#B5B5B5]">/100</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <div
            className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-x-2 md:gap-y-4 overflow-y-auto pr-4 -mr-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#464653 #2A2A36",
              display: "grid",
              gridTemplateRows: "repeat(3, minmax(100px, auto))",
              maxHeight: "calc(3 * 100px + 2 * 1rem)",
              minHeight: "unset",
            }}
          >
            {contractData.services.map((service) => (
              <div key={service.id} className="w-full">
                <div className="mb-2">
                  <span className="text-base font-medium text-white">
                    {service.name}
                  </span>
                </div>
                <div className="relative mt-4">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: `calc(${discounts[service.name]}% - 20px)`,
                      top: "-32px",
                    }}
                  >
                    <div className="relative -left-1.5 -top-1.5">
                      <div className="bg-[#FFA726] rounded-lg px-3 py-1 text-center min-w-[40px]">
                        <span className="text-sm font-semibold text-[#593F0C]">
                          {discounts[service.name]}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-[#FFA726]" />
                    </div>
                  </div>
                  <Slider
                    defaultValue={[parseInt(service.currentDiscount)]}
                    value={[discounts[service.name]]}
                    onValueChange={(value) =>
                      handleDiscountChange(service.name, value)
                    }
                    max={100}
                    step={1}
                    className={cn(
                      "bg-[#593F0C] rounded-lg",
                      "relative flex w-full touch-none select-none items-center",
                      "[&_[role=slider]]:h-4 [&_[role=slider]]:w-4",
                      "[&_[role=slider]]:border-2 [&_[role=slider]]:border-white",
                      "[&_[role=slider]]:bg-white [&_[role=slider]]:rounded-full",
                      "[&_[role=slider]]:shadow-[0_0_10px_rgba(255,255,255,0.3)]",
                      "[&_[role=slider]]:outline-none",
                      "[&_[role=slider]]:transition-transform duration-200",
                      "[&_[role=slider]]:hover:scale-110",
                      "[&_.slider-track]:h-2 [&_.slider-track]:rounded-full [&_.slider-track]:bg-[#8B4D00]",
                      "[&_.slider-range]:h-2 [&_.slider-range]:rounded-full [&_.slider-range]:bg-[#FFA726]",
                      "[&_.slider-range]:shadow-[0_0_10px_rgba(255,167,38,0.3)]"
                    )}
                  />
                  <div className="mt-2 flex justify-center">
                    <div className="relative inline-flex rounded-full bg-[#424259] backdrop-blur-sm px-4 py-1 mt-1">
                      <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-[#424259]" />
                      <p className="text-sm font-medium text-[#E2E2E2]">
                        Current Discount: {service.currentDiscount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
