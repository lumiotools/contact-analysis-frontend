import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { discount: "0%", count: 2, value: 0 },
  { discount: "10%", count: 1, value: 10 },
  { discount: "20%", count: 6, value: 20 },
  { discount: "30%", count: 3, value: 30 },
  { discount: "40%", count: 2, value: 40 },
  { discount: "50%", count: 4, value: 50 },
  { discount: "60%", count: 4, value: 60 },
  { discount: "70%", count: 5, value: 70 },
  { discount: "80%", count: 3, value: 80 },
  { discount: "90%", count: 2, value: 90 },
  { discount: "100%", count: 3, value: 100 },
];

const topDiscounts = [
  { discount: 80, rank: "1st" },
  { discount: 70, rank: "2nd" },
  { discount: 60, rank: "3rd" },
  { discount: 50, rank: "4th" },
  { discount: 40, rank: "5th" },
];

const getBarColor = (value, currentDiscount) => {
  if (value === currentDiscount) {
    return "rgba(255, 255, 255, 1)";
  }
  if (value > currentDiscount) {
    return "rgba(249, 115, 22, 0.8)";
  }
  return "rgba(249, 115, 22, 0.4)";
};

const getBarClassName = (value, currentDiscount) => {
  if (value === currentDiscount) {
    return "animate-pulse shadow-lg shadow-white/50";
  }
  return "";
};

const getBackgroundColorByValue = (value) => {
  const hue = (value * 120) / 100;
  return `hsla(${hue}, 80%, 40%, 0.1)`;
};

const getColorByValue = (value) => {
  const hue = (value * 120) / 100;
  return `hsla(${hue}, 80%, 40%, 1)`;
};

export default function DiscountDetails({ currentDiscount = 40 }) {
  const benchmarkDiscount = 65;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6 bg-[#23232F] animate-in slide-in-from-top duration-200"
    >
      <div className="col-span-1 lg:col-span-2">
        <Card className="bg-[#2A2A36] border-none h-full">
          <CardHeader>
            <CardTitle
              className="text-lg md:text-xl font-semibold text-white"
            >
              Discount Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{
                    top: 30,
                    right: 10,
                    left: 0,
                    bottom: 30,
                  }}
                  barSize={20}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="value"
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => `${value}%`}
                    fontSize={12}
                  />

                  <YAxis
                    tickFormatter={(value) => value}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />

                  <ChartTooltip
                    cursor={false}
                    content={({ active, payload }) => {
                      if (!active || !payload?.length) return null;
                      const data = payload[0].payload;
                      const isCurrentDiscount = data.value === currentDiscount;
                      return (
                        <div
                          className={`rounded-lg border bg-[#2A2A36] p-2 shadow-sm ${
                            isCurrentDiscount ? "ring-2 ring-white/50" : ""
                          }`}
                        >
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col">
                              <span
                                className="text-[0.70rem] uppercase text-muted-foreground"
                              >
                                Discount
                              </span>
                              <span
                                className={`font-bold ${
                                  isCurrentDiscount 
                                    ? "text-white"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {data.discount}
                                {isCurrentDiscount && " (Current)"}
                              </span>
                            </div>
                            <div className="flex flex-col">
                              <span
                                className="text-[0.70rem] uppercase text-muted-foreground"
                              >
                                Companies
                              </span>
                              <span
                                className="font-bold text-white"
                              >
                                {data.count}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }}
                  />

                  <ReferenceLine
                    x={40}
                    stroke="white"
                    strokeWidth={2}
                    label={{
                      value: "Your Discount",
                      position: "top",
                      fill: "white",
                      fontSize: 12,
                    }}
                  />

                  <ReferenceLine
                    y={benchmarkDiscount}
                    stroke="hsl(var(--success))"
                    strokeDasharray="3 3"
                    label={{
                      value: "Benchmark (65%)",
                      position: "right",
                      fill: "hsl(var(--success))",
                      fontSize: 12,
                    }}
                  />

                  <Bar
                    dataKey="count"
                    radius={[4, 4, 0, 0]}
                    barSize={15}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.value}`}
                        fill={getBarColor(entry.value, 40)}
                        className={getBarClassName(
                          entry.value,
                          40,
                        )}
                        id={`02m01t_${index}`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <Card className="bg-[#2A2A36] border-none h-full">
          <CardHeader>
            <CardTitle
              className="text-lg md:text-xl font-semibold text-white"
            >
              Top Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiscounts.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg bg-[#23232F] ${
                    item.discount === 50
                      ? "ring-2 ring-white/20"
                      : ""
                  }`}
                  id={`hx9pqy_${index}`}
                >
                  <span
                    className="text-sm font-medium"
                    style={{ color: getColorByValue(item.discount) }}
                    id={`xkt2bz_${index}`}
                  >
                    {item.rank}
                  </span>
                  <Badge
                    variant="secondary"
                    style={{
                      backgroundColor: getBackgroundColorByValue(item.discount),
                      color: getColorByValue(item.discount),
                    }}
                    id={`ienvuk_${index}`}
                  >
                    {item.discount}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
