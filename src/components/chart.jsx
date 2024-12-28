"use client"

import { ResponsiveContainer } from "recharts"

export function ChartContainer({
  children,
  className,
}) {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      {children}
    </ResponsiveContainer>
  )
}

