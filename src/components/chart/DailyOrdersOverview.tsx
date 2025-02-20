"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetOrders } from "@/hooks/use-order";
import { Loader2 } from "lucide-react";

// Define the TOrder type
type TOrder = {
  orderStatus: string;
};

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-0))",
  },
  confirmed: {
    label: "Confirmed",
    color: "hsl(var(--chart-2))",
  },
  unconfirmed: {
    label: "Unconfirmed",
    color: "hsl(var(--chart-4))",
  },
  rejected: {
    label: "Rejected",
    color: "hsl(var(--chart-3))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--chart-5))",
  },
  delivered: {
    label: "Delivered",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function DailyOrdersOverview() {
  const { orders, isOrdersLoading } = useGetOrders({
    today: "yes",
  });

  const chartData = React.useMemo(() => {
    const status = {
      confirmed: 0,
      unconfirmed: 0,
      rejected: 0,
      cancelled: 0,
      delivered: 0,
    };

    // Count orders by status
    orders.forEach((order: TOrder) => {
      if (order.orderStatus in status) {
        status[order.orderStatus as keyof typeof status]++;
      }
    });

    // Check if all values are 0
    const allZero = Object.values(status).every((value) => value === 0);

    if (allZero) {
      // Return single entry with muted color for zero data
      return [
        {
          status: "no-order",
          orders: 1,
          fill: "#000000",
        },
      ];
    }

    // Return normal data
    return Object.entries(status).map(([status, orders]) => ({
      status,
      orders,
      fill: chartConfig[status as keyof typeof chartConfig].color,
    }));
  }, [orders]);

  const totalOrders = React.useMemo(() => {
    if (!orders || orders.length === 0) return 0;
    return chartData.reduce((acc, curr) => acc + curr.orders, 0);
  }, [chartData, orders]);

  const d = new Date();

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today&apos;s orders status</CardTitle>
        <CardDescription>
          {d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isOrdersLoading ? (
          <Loader2 className="mx-auto my-2 animate-spin" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="orders"
                nameKey="status"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalOrders.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            orders
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {!orders || orders.length === 0
            ? "No orders data available"
            : "Showing total orders status for the last 24 hours."}
        </div>
      </CardFooter>
    </Card>
  );
}
