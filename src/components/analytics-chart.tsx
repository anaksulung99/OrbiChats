"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { analytics } from "@/lib/mock-data";

const chartConfig = {
  leads: {
    label: "Leads",
    color: "#059669",
  },
  routed: {
    label: "Routed",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export function AnalyticsChart() {
  return (
    <ChartContainer className="h-70 w-full" config={chartConfig}>
      <AreaChart data={analytics} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Area
          dataKey="leads"
          type="monotone"
          fill="var(--color-leads)"
          fillOpacity={0.18}
          stroke="var(--color-leads)"
          strokeWidth={2}
        />
        <Area
          dataKey="routed"
          type="monotone"
          fill="var(--color-routed)"
          fillOpacity={0.14}
          stroke="var(--color-routed)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}
