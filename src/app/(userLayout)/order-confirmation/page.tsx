import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function OrderConfirmation() {
  // In a real application, you would fetch this data from an API or database
  const orderDetails = {
    orderNumber: "ORD-12345",
    date: "February 17, 2025",
    total: "$129.99",
    items: [
      { name: "Product 1", quantity: 2, price: "$49.99" },
      { name: "Product 2", quantity: 1, price: "$30.01" },
    ],
    shippingAddress: "123 Main St, Anytown, USA 12345",
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <CardTitle className="text-2xl font-bold">
              Order Confirmed
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Order Number</p>
              <p className="font-medium">{orderDetails.orderNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Order Date</p>
              <p className="font-medium">{orderDetails.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total</p>
              <p className="font-medium">{orderDetails.total}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Items</p>
              <ul className="list-inside list-disc">
                {orderDetails.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - Quantity: {item.quantity}, Price: {item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Shipping Address</p>
              <p className="font-medium">{orderDetails.shippingAddress}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href="/" passHref>
            <Button className="w-full">Continue Shopping</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
