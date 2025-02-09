import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateOrder } from "@/services/order";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: string;
    }) => {
      return await updateOrder({
        id,
        formData: { orderStatus: newStatus },
      });
    },
    onSuccess: (data, { newStatus }) => {
      if (data.success) {
        toast.success("Order status updated", {
          description: `Order status has been changed to ${newStatus}`,
          richColors: true,
        });
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      } else {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Error", {
        description:
          error instanceof Error
            ? error.message
            : "Failed to update order status",
        richColors: true,
      });
    },
  });
}
