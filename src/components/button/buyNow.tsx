"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-provider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function BuyNow({
  product,
  className,
  quantity,
  variant,
  ...props
}: {
  className?: string;
  quantity?: number;
  variant?: "outline" | "ghost" | "link" | "default";
  product: TCartProduct;
}) {
  const { cart, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  useEffect(
    () => {
      const isItemInCart = cart.find((item) => item.id === product.id);
      if (isItemInCart) {
        setIsAdded(true);
      }
    },
    // eslint-disable-next-line
    [cart],
  );

  const handleAddToCart = () => {
    if (!isAdded) {
      addToCart({ ...product, quantity: quantity || 1 });
      setIsAdded(true);
    }
  };
  return (
    <Button
      onClick={handleAddToCart}
      {...props}
      variant={variant || "default"}
      className={cn("w-full rounded", className)}
      size="sm"
      asChild
    >
      <Link href="/checkout">Buy Now</Link>
    </Button>
  );
}
