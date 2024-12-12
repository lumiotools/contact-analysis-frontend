import React, { useState, useEffect } from "react";
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

export default function DiscountDistributionAnalysis({
  currentDiscount = 40,
  serviceName,
}) {
  const [barData, setBarData] = useState([]);
  const [topDiscounts, setTopDiscounts] = useState([]);

  useEffect(() => {
    const graphDataString = localStorage.getItem("graphData");
    if (!graphDataString) return;

    try {
      const graphData = JSON.parse(graphDataString);

      const serviceData = graphData.find((item) =>
        item["Service Level"].includes(serviceName)
      );

      if (serviceData && serviceData["Discount Values"]) {
        const processedData = serviceData["Discount Values"].map((value) => ({
          value: value,
          count: 1,
          discount: `${value}%`,
        }));

        const sortedData = processedData.sort((a, b) => a.value - b.value);
        setBarData(sortedData);

        const sortedDiscounts = [...sortedData]
          .sort((a, b) => b.value - a.value)
          .slice(0, 5)
          .map((item, index) => ({
            discount: item.value,
            rank:
              index === 0
                ? "1st"
                : index === 1
                ? "2nd"
                : index === 2
                ? "3rd"
                : `${index + 1}th`,
          }));

        setTopDiscounts(sortedDiscounts);
      }
    } catch (error) {
      console.error("Error processing graph data:", error);
    }
  }, [serviceName]);

  // If no data is available, return null or a placeholder
  if (barData.length === 0) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6 bg-[#23232F]">
        <div className="col-span-1 lg:col-span-2">
          <Card className="bg-[#2A2A36] border-none h-full">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl font-semibold text-white">
                Discount Distribution Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-[300px]">
              <p className="text-gray-400">No discount data available</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6 bg-[#23232F]">
      <div className="col-span-1 lg:col-span-2">
        <Card className="bg-[#2A2A36] border-none h-full">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl font-semibold text-white">
              Discount Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 md:p-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{
                    top: 30,
                    right: 10,
                    left: 0,
                    bottom: 30,
                  }}
                  barSize={20}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="discount"
                    stroke="hsl(var(--muted-foreground))"
                    domain={[0, 100]}
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => `${value}%`}
                    fontSize={12}
                  />

                  <YAxis
                    type="number"
                    domain={[0, 100]}
                    stroke="hsl(var(--muted-foreground))"
                    ticks={[0, 20, 40, 60, 80, 100]}
                    tickFormatter={(value) => `${value}%`}
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
                              <span className="text-[0.70rem] uppercase text-muted-foreground">
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
                          </div>
                        </div>
                      );
                    }}
                  />

                  <ReferenceLine
                    x={currentDiscount}
                    stroke="white"
                    strokeWidth={2}
                    label={{
                      value: "Your Discount",
                      position: "top",
                      fill: "white",
                      fontSize: 12,
                    }}
                  />

                  <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={15}>
                    {barData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.value}`}
                        fill={getBarColor(entry.value, currentDiscount)}
                        className={getBarClassName(
                          entry.value,
                          currentDiscount
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
            <CardTitle className="text-lg md:text-xl font-semibold text-white">
              Top Discounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDiscounts.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg bg-[#23232F] ${
                    item.discount === currentDiscount
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
