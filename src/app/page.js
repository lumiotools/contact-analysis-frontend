"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Gauge,
  LineChart,
  Rocket,
  Zap,
  Timer,
  TrendingUp,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const navigate = useRouter();

  return (
    <div
      className="h-screen  bg-[#1C1C28] flex items-center justify-center w-full"
    >
      <div className="w-full h-full mx-auto">
        <div
          className="relative w-full h-full bg-[#23232F]/80  backdrop-blur-xl border border-[#2A2A36] overflow-x-hidden"
        >
          <div
            className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-500/20 to-orange-500/20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"
          />

          <div className="relative z-10 p-12 md:p-16 lg:p-20">
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              {/* Left Column */}
              <div className="space-y-8">
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full bg-orange-500/10 text-orange-500"
                >
                  <span className="text-sm font-medium">
                    New Feature
                  </span>
                </div>

                <div className="space-y-6">
                  <h1
                    className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white"
                  >
                    Smart Contract{" "}
                    <span className="text-orange-500">
                      Discounts
                    </span>
                  </h1>

                  <p className="text-xl text-gray-400 max-w-2xl">
                    Leverage AI-powered analysis to automatically calculate and
                    apply the best possible discounts for your shipping
                    contracts.
                  </p>
                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl bg-orange-500/10 flex items-center justify-center"
                    >
                      <ArrowUpRight
                        className="h-6 w-6 text-orange-500"
                      />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium text-white"
                      >
                        Increased Savings
                      </h3>
                      <p className="text-gray-400">
                        Up to 76% cost reduction
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center"
                    >
                      <Zap className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-medium text-white"
                      >
                        Instant Analysis
                      </h3>
                      <p className="text-gray-400">
                        Results in seconds
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => navigate.push("/contract-discounts")}
                  className="bg-orange-500 hover:bg-orange-600 text-black px-12 py-7 text-lg rounded-xl font-semibold"
                >
                  Get Contract Discounts
                </Button>
              </div>

              {/* Right Column - Improved Visualization */}
              <div className="relative">
                {/* Main Circle with Percentage */}
                <div
                  className="relative w-[500px] h-[500px] mx-auto"
                >
                  {/* Decorative Rings */}
                  <div
                    className="absolute inset-0 rounded-full border-4 border-orange-500/10 animate-pulse"
                  />

                  <div
                    className="absolute inset-[10%] rounded-full border-4 border-purple-500/10 animate-pulse delay-75"
                  />

                  <div
                    className="absolute inset-[20%] rounded-full border-4 border-orange-500/10 animate-pulse delay-150"
                  />

                  {/* Central Content */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="text-center z-50">
                      <div
                        className="text-[120px] font-bold text-white leading-none relative z-50"
                      >
                        41
                        <span className="text-orange-500">
                          %
                        </span>
                      </div>
                      <div
                        className="text-xl text-gray-400 relative z-50"
                      >
                        Average Savings
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute inset-0">
                    {/* Top Stat */}
                    <div
                      className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#2A2A36] p-4 rounded-xl border border-orange-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <Target
                          className="h-5 w-5 text-orange-500"
                        />

                        <div>
                          <div
                            className="text-lg font-bold text-white"
                          >
                            76%
                          </div>
                          <div className="text-sm text-gray-400">
                            Max Savings
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Stat */}
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-7 bg-[#2A2A36] p-4 rounded-xl border border-purple-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <Rocket
                          className="h-5 w-5 text-purple-500"
                        />

                        <div>
                          <div
                            className="text-lg font-bold text-white"
                          >
                            2.5x
                          </div>
                          <div className="text-sm text-gray-400">
                            ROI Increase
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Stat */}
                    <div
                      className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#2A2A36] p-4 rounded-xl border border-orange-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <Timer
                          className="h-5 w-5 text-orange-500"
                        />

                        <div>
                          <div
                            className="text-lg font-bold text-white"
                          >
                            24/7
                          </div>
                          <div className="text-sm text-gray-400">
                            Analysis
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Left Stat */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-[#2A2A36] p-4 rounded-xl border border-purple-500/20"
                    >
                      <div className="flex items-center gap-3">
                        <Gauge
                          className="h-5 w-5 text-purple-500"
                        />

                        <div>
                          <div
                            className="text-lg font-bold text-white"
                          >
                            100%
                          </div>
                          <div className="text-sm text-gray-400">
                            Automated
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Icons */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-[15%] left-[15%] bg-orange-500/10 p-3 rounded-full"
                    >
                      <BarChart3
                        className="h-5 w-5 text-orange-500"
                      />
                    </div>
                    <div
                      className="absolute top-[15%] right-[15%] bg-purple-500/10 p-3 rounded-full"
                    >
                      <LineChart
                        className="h-5 w-5 text-purple-500"
                      />
                    </div>
                    <div
                      className="absolute bottom-[15%] left-[15%] bg-purple-500/10 p-3 rounded-full"
                    >
                      <DollarSign
                        className="h-5 w-5 text-purple-500"
                      />
                    </div>
                    <div
                      className="absolute bottom-[15%] right-[15%] bg-orange-500/10 p-3 rounded-full"
                    >
                      <TrendingUp
                        className="h-5 w-5 text-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
