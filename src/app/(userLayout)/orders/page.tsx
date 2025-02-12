"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUser } from "@/context/user-provider";
import { getMyOrders } from "@/services/order";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function OrdersPage() {
  const { loading } = useUser();

  const { data, isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => await getMyOrders(),
  });

  if (loading) {
    return <Loader2 className="mx-auto my-2 animate-spin" />;
  }

  console.log(data);
  return (
    <div className="container-dashboard min-h-[70dvh]">
      <div className="max-w-4xl rounded-lg border">
        <h3 className="border-b py-2 text-center text-xl font-bold md:text-2xl">
          Your recent order list
        </h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN.</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <div className="loader" />
                </TableCell>
              </TableRow>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data.map((order: any, index: number) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{index + 1}.</TableCell>
                  <TableCell className="text-nowrap">
                    {order.products.map(
                      (
                        product: { product: TProduct; quantity: number },
                        index: number,
                      ) => (
                        <div key={index}>
                          <Link
                            className="text-blue-400 underline"
                            href={`/products/${product.product._id}`}
                          >
                            {product.product.name}
                          </Link>{" "}
                          x {product.quantity}
                        </div>
                      ),
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        order.payment === "done"
                          ? "bg-blue-100 text-blue-500"
                          : "bg-amber-100 text-amber-500"
                      } rounded-full px-2 py-0.5`}
                    >
                      {order.paymentStatus === "paid"
                        ? "Paid"
                        : order.paymentStatus === "failed"
                          ? "Failed"
                          : "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="bg-primary-200 text-primary-500 rounded-full px-2 py-0.5">
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    TK {order.totalAmount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
