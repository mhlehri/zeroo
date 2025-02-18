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
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetOrders } from "@/hooks/use-order";
import { Loader2 } from "lucide-react";

const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-0))",
  },
  paid: {
    label: "Paid",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pending",
    color: "hsl(var(--chart-4))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function DailyOrderPaymentOverview() {
  const { orders, isOrdersLoading } = useGetOrders({
    today: "yes",
  });
  console.log("Orders =>", orders, "from DailyOrderPaymentOverview.tsx");
  const chartData = React.useMemo(() => {
    const status = {
      paid: 0,
      pending: 0,
      failed: 0,
      //   rejected: 0,
      //   cancelled: 0,
      //   delivered: 0,
    };

    if (orders?.length > 0) {
      orders?.forEach((order: TOrder) => {
        if (order.paymentStatus === "paid") {
          status.paid++;
        } else if (order.paymentStatus === "pending") {
          status.pending++;
        } else if (order.paymentStatus === "failed") {
          status.failed++;
        }
      });
    } else {
      // Handle the case when there are no orders
      status.paid = 0;
      status.pending = 0;
      status.failed = 0;
    }

    return Object?.entries(status).map(([status, orders]) => ({
      status,
      orders,
      fill: chartConfig[status as keyof typeof chartConfig].color,
    }));
  }, [orders]);

  const totalOrders = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.orders, 0);
  }, [chartData]);

  console.log(chartData);

  const d = new Date();
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Today&apos;s orders payment status</CardTitle>
        <CardDescription>
          {d.getDate() + "-" + d.getMonth() + 1 + "-" + d.getFullYear()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isOrdersLoading ? (
          <Loader2 className="mx-auto my-2 animate-spin" />
        ) : orders?.length ? (
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
        ) : (
          <div className="py-2 text-center">No orders available for today</div>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing total orders payment status for the last 24 hours.
        </div>
      </CardFooter>
    </Card>
  );
}
