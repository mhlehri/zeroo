import { getOrders } from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function useGetOrders({ today = "" }: { today?: string }) {
  const [orders, setOrders] = useState([]);

  const {
    data,
    isLoading: isOrdersLoading,
    isError,
  } = useQuery({
    queryKey: ["orders", today],
    queryFn: () => getOrders({ today }),
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
    } else {
      setOrders([]);
    }
  }, [data]);

  return { orders, isOrdersLoading, isError };
}
