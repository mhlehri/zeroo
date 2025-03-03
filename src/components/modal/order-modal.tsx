"use client";
import {
  Package,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  Check,
  X,
} from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

// Import or declare TOrder type
export default function OrderModal({
  order,
  children,
}: {
  order: TOrder;
  children: React.ReactNode;
}) {
  const {
    name,
    address,
    email,
    orderStatus,
    paymentMethod,
    paymentStatus,
    phone,
    products,
    totalAmount,
    transactionId,
    user,
  } = order || {};

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-primary-100 text-primary-800";
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="hover:bg-primary-100 hover:text-primary-900 roundeddd-sm relative w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm outline-hidden transition-colors select-none data-disabled:pointer-events-none data-disabled:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <ScrollArea className="max-h-[80vh] pr-4">
          <div className="space-y-6">
            <div>
              <h2 className="text-primary-900 text-2xl font-bold">
                Order Details
              </h2>
              <p className="text-primary-500 text-sm">
                Transaction ID: {transactionId}
              </p>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-primary-900 font-semibold">{name}</h3>
                <p className="text-primary-500 text-sm">
                  {user?.email || email}
                </p>
              </div>
              <Badge className={getStatusColor(orderStatus)}>
                {orderStatus}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-primary-900 font-medium">
                Shipping Information
              </h4>
              <div className="text-primary-500 flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </div>
              <div className="text-primary-500 flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
              <div className="text-primary-500 flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="text-primary-900 mb-2 font-medium">Order Items</h4>
              <ul className="space-y-2">
                {products?.map((product, index: number) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Package className="text-primary-400 h-4 w-4" />
                      <span className="text-sm font-medium">
                        {typeof product.product === "object"
                          ? product.product.name
                          : product.product}
                      </span>
                    </div>
                    <span className="text-primary-500 text-sm">
                      {product.quantity} x TK
                      {typeof product.product === "object"
                        ? product.product.price.toFixed(2)
                        : "0.00"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Total Amount</span>
                <span className="text-lg font-bold">
                  TK {totalAmount?.toFixed(2)}
                </span>
              </div>
              <div className="text-primary-500 flex items-center justify-between text-sm">
                <span>Payment Method</span>
                <div className="flex items-center space-x-1">
                  <CreditCard className="h-4 w-4" />
                  <span>{paymentMethod}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Payment Status</span>
                <Badge className={getStatusColor(paymentStatus)}>
                  {paymentStatus === "paid" ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <X className="mr-1 h-3 w-3" />
                  )}
                  {paymentStatus}
                </Badge>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
