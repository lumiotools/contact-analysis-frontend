"use client";

import React, { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const savingsData = [
  { score: 20, savings: 30000 },
  { score: 30, savings: 32000 },
  { score: 40, savings: 35000 },
  { score: 50, savings: 38000 },
  { score: 60, savings: 45000 },
  { score: 70, savings: 50000 },
];

const chartConfig = {
  savings: {
    label: "Savings",
    color: "#593F0C",
  },
};

export function SavingsChart({ animate = false }) {
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    if (animate) {
      setAnimatedData([]);
      const animationDuration = 2000; // 2 seconds
      const steps = 60; // 60 frames for smooth animation
      const stepDuration = animationDuration / steps;

      let step = 0;
      const intervalId = setInterval(() => {
        if (step < steps) {
          const newData = savingsData.map((item, index) => ({
            ...item,
            savings: (item.savings * (step + 1)) / steps,
          }));
          setAnimatedData(newData);
          step++;
        } else {
          clearInterval(intervalId);
        }
      }, stepDuration);

      return () => clearInterval(intervalId);
    } else {
      setAnimatedData(savingsData);
    }
  }, [animate]);

  return (
    <div className="h-[450px] bg-[#2A2A36] rounded-2xl border-2 border-[#464653] p-6 flex flex-col">
      <h2 className="text-xl font-bold text-white tracking-wide text-center">
        SEE HOW MUCH YOU COULD SAVE!
      </h2>

      <div className="flex-1 mt-4">
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={animatedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
            >
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B8860B" stopOpacity={0.6} />
                  <stop offset="95%" stopColor="#B8860B" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                horizontal={true}
                vertical={false}
                stroke="#464653"
              />
              <XAxis
                dataKey="score"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#FFFFFF", fontSize: 14 }}
                dy={10}
                label={{
                  value: "Competitiveness Score",
                  position: "bottom",
                  offset: 20,
                  style: { fill: "#FFFFFF", fontSize: 14 },
                }}
              />
              <YAxis
                tickFormatter={(value) => `$${value / 1000}K`}
                domain={[10000, 50000]}
                ticks={[10000, 30000, 50000]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#FFB323", fontSize: 14 }}
                dx={-10}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    valueFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                  />
                }
              />
              <ReferenceLine
                x={60}
                stroke="#FFB323"
                strokeWidth={2}
                isFront={true}
              />
              <Area
                type="natural"
                dataKey="savings"
                stroke="#FFB323"
                strokeWidth={3}
                fill="url(#areaGradient)"
                fillOpacity={1}
                dot={(props) => {
                  if (props.payload.score === 60) {
                    return (
                      <g>
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={8}
                          fill="#FFB323"
                          stroke="none"
                        />
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={4}
                          fill="white"
                          stroke="none"
                        />
                      </g>
                    );
                  }
                  return null;
                }}
                activeDot={{
                  r: 8,
                  fill: "#FFB323",
                  strokeWidth: 0,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <p className="text-base font-normal text-[#E2E2E2] text-center mt-1">
        Unlock an additional{" "}
        <span className="text-[#FFB323] font-bold">$10K</span> in savings by
        improving your score by{" "}
        <span className="text-[#FFB323] font-bold">10</span> points!
      </p>
    </div>
  );
}
