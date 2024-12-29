"use client";

import { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ContractSimulator({
  data = { services: [], competitiveScore: 84 },
}) {
  const [discounts, setDiscounts] = useState(() =>
    Object.fromEntries(
      (data?.services || []).map((service) => [
        service.name,
        { current: service.defaultValue, default: service.defaultValue },
      ])
    )
  );

  const [competitiveScore, setCompetitiveScore] = useState(
    data?.competitiveScore
  );

  const handleDiscountChange = (service, value) => {
    setDiscounts((prev) => ({
      ...prev,
      [service]: { ...prev[service], current: value[0] },
    }));
  };

  // Update competitive score when discounts change
  useEffect(() => {
    if (Object.keys(discounts).length === 0) {
      setCompetitiveScore(data?.competitiveScore || 84); // Set to default if no discounts
      return;
    }

    const totalDiscount = Object.values(discounts).reduce(
      (sum, discount) => sum + (discount.current || 0),
      0
    );
    const averageDiscount = totalDiscount / Object.keys(discounts).length;

    const baseScore = data?.competitiveScore || 84;
    const scoreDelta = (averageDiscount - 50) / 2;
    const newScore = Math.min(
      100,
      Math.max(0, Math.round(baseScore + scoreDelta))
    );

    setCompetitiveScore(newScore);
  }, [discounts, data?.competitiveScore]);

  const getTooltipPosition = (value) => {
    const minPosition = 20;
    const maxPosition = `calc(100% - 40px)`;

    if (value <= 10) {
      return `${minPosition}px`;
    } else if (value >= 90) {
      return maxPosition;
    } else {
      return `calc(${value}% - 20px)`;
    }
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
                  $
                  {formatNumber(
                    parseInt(data?.currentSaving?.replace(/\D/g, "") || "47000")
                  )}
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-baseline">
                  <span className="text-3xl font-medium text-[#FFA726]">$</span>
                  <span className="text-5xl font-semibold text-[#FFA726]">
                    {formatNumber(
                      parseInt(
                        data?.totalPotentialSavings?.replace(/\D/g, "") ||
                          "60000"
                      )
                    )}
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
                <div className="relative h-10 w-full md:w-[370px] overflow-hidden rounded-full bg-[#363647]">
                  <div
                    className="h-full absolute left-0 transition-all duration-300 ease-in-out"
                    style={{
                      width: `${competitiveScore}%`,
                      background:
                        "linear-gradient(90deg, #FFD572 0%, #FEBD38 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-end pr-6">
                    <span className="text-lg font-medium">
                      <span className="text-white">{competitiveScore}</span>
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
            className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-x-2 md:gap-y-1 overflow-y-auto pr-4 -mr-4"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#464653 #2A2A36",
              display: "grid",
              gridTemplateRows: "repeat(3, minmax(100px, auto))",
              maxHeight: "calc(3 * 100px + 2 * 1rem)",
              minHeight: "unset",
            }}
          >
            {(data?.services || []).map((service) => (
              <div key={service.id} className="w-full">
                <div className="mb-2 mt-3">
                  <span className="text-xs font-medium text-white">
                    {service.name}
                  </span>
                </div>
                <div className="relative mt-4" style={{ height: "60px" }}>
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      left: getTooltipPosition(
                        discounts[service.name]?.current || service.defaultValue
                      ),
                      top: "-35px",
                    }}
                  >
                    <div className="relative -left-1 -top-2">
                      <div className="bg-[#FFA726] rounded-lg px-3 py-1 text-center min-w-[40px]">
                        <span className="text-sm font-semibold text-[#593F0C]">
                          {discounts[service.name]?.current ||
                            service.defaultValue}
                          %
                        </span>
                      </div>
                      <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform bg-[#FFA726]" />
                    </div>
                  </div>
                  <Slider
                    defaultValue={[service.defaultValue]}
                    value={[
                      discounts[service.name]?.current || service.defaultValue,
                    ]}
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
                    <div className="relative inline-flex rounded-full bg-[#424259] backdrop-blur-sm px-4 py-1">
                      <div className="absolute -top-1 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 transform bg-[#424259]" />
                      <p className="text-xs font-medium text-[#E2E2E2]">
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
