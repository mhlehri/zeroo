import { getOrders } from "@/services/order";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export function useGetOrders({ today = "" }: { today?: string }) {
  const {
    data,
    isLoading: isOrdersLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", today],
    queryFn: () => getOrders({ today }),
  });

  const orders = useMemo(() => data?.orders ?? [], [data]);
  const totalOrders = useMemo(() => data?.total ?? 0, [data]);

  return { orders, totalOrders, isOrdersLoading, isError };
}
