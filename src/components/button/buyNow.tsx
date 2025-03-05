"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { useCart } from "@/context/cart-provider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePage } from "@/hooks/use-page";

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
  const { isDetailsPage } = usePage();
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
    if (!isAdded && product.stock) {
      addToCart({ ...product, quantity: quantity || 1 });
      setIsAdded(true);
    }
  };
  return (
    <Button
      disabled={!product.stock && isDetailsPage}
      onClick={handleAddToCart}
      {...props}
      variant={
        !isDetailsPage && !product.stock ? "secondary" : variant || "default"
      }
      className={cn("w-full rounded", className)}
      size="sm"
      asChild={!isDetailsPage}
    >
      {!isDetailsPage && !product.stock ? (
        <Link href={`/products/${product.id}`}>View Details</Link>
      ) : (
        <Link href="/checkout">Buy Now</Link>
      )}
    </Button>
  );
}
