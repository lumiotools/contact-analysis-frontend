"use client";

import * as React from "react";
import { ResponsiveContainer } from "recharts";

export function ChartContainer({ children, className, config = {} }) {
  return (
    <div className={className}>
      <style jsx global>{`
        ${Object.entries(config)
          .map(
            ([key, value]) => `
          :root {
            --color-${key}: ${value.color};
          }
        `
          )
          .join("\n")}
      `}</style>
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

export function ChartTooltip({ className, children }) {
  return (
    <div
      className={`rounded-lg border bg-background p-2 shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export function ChartTooltipContent({
  active,
  payload,
  config = {},
  hideLabel = false,
}) {
  if (!active || !payload) {
    return null;
  }

  return (
    <ChartTooltip>
      <div className="flex flex-col gap-2">
        {payload.map((item, index) => {
          const key = item.dataKey;
          const data = config[key];
          if (!data) return null;

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ background: data.color }}
              />
              {!hideLabel && (
                <div className="text-sm text-muted-foreground">
                  {data.label}:
                </div>
              )}
              <div className="text-sm font-bold">{item.value}</div>
            </div>
          );
        })}
      </div>
    </ChartTooltip>
  );
}
