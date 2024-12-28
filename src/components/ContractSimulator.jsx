"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export default function ContractSimulator() {
  const [showMore, setShowMore] = useState(false);
  const services = [
    { name: "Next Day Package", currentDiscount: "32%" },
    { name: "2 Day Package", currentDiscount: "32%" },
    { name: "3 Day Package", currentDiscount: "32%" },
    { name: "UPS Ground Commercial", currentDiscount: "32%" },
    { name: "DAS Commercial", currentDiscount: "32%" },
    { name: "2 Day Air Package", currentDiscount: "32%" },
    ...(showMore
      ? [
          { name: "Express Delivery", currentDiscount: "32%" },
          { name: "International Shipping", currentDiscount: "32%" },
          { name: "Same Day Delivery", currentDiscount: "32%" },
        ]
      : []),
  ];

  const [discounts, setDiscounts] = useState(
    Object.fromEntries(services.map((service) => [service.name, 80]))
  );

  const handleDiscountChange = (service, value) => {
    setDiscounts((prev) => ({
      ...prev,
      [service]: value[0],
    }));
  };

  return (
    <div className="w-full rounded-2xl bg-[#2A2A36] p-6 md:p-8 border-2 border-[#464653]">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex-shrink-0 w-1/2">
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
              <span className="font-semibold text-[#FFA726]">$47K</span>
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

            <div className="mt-8">
              <div className="flex flex-col gap-3">
                <span className="text-2xl font-medium text-white">
                  Competitive Score
                </span>
                <div className="relative h-12 w-full md:w-[400px] overflow-hidden rounded-full bg-[#363647]">
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
                      <span className="text-white">84</span>
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
            className={cn(
              "grid grid-cols-1 gap-2 sm:grid-cols-2 md:gap-x-3 md:gap-y-6",
              showMore
                ? "h-[calc(3*176px)] overflow-y-auto pr-4 -mr-4"
                : "h-auto"
            )}
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#464653 #2A2A36",
            }}
          >
            {services.map((service) => (
              <div key={service.name} className="w-full">
                <div className="mb-4">
                  <span className="text-base font-medium text-white">
                    {service.name}
                  </span>
                </div>
                <div className="relative mt-6">
                  <div
                    className="absolute -top-8 pointer-events-none"
                    style={{
                      left: `calc(${discounts[service.name]}% - 20px)`,
                      transition: "left 0.1s ease-out",
                    }}
                  >
                    <div
                      className="relative flex h-7 min-w-[30px] items-center justify-center rounded-lg bg-[#FFA726] px-2"
                      style={{
                        filter: "drop-shadow(0 0 6px rgba(255, 167, 38, 0.3))",
                      }}
                    >
                      <span className="text-sm font-semibold text-white">
                        {discounts[service.name]}
                      </span>
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-[#FFA726]" />
                    </div>
                  </div>
                  <Slider
                    defaultValue={[50]}
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
                  <div className="mt-4 flex justify-center">
                    <div className="relative inline-flex rounded-full bg-[#424259] backdrop-blur-sm px-4 py-1 -mt-1">
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
          {services.length > 6 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="mt-4 text-[#FFA726] hover:text-[#FFB74D] transition-colors"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
