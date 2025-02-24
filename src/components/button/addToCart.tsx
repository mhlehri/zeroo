"use client";
import { useCart } from "@/context/cart-provider";
import { cn } from "@/lib/utils";
import { CheckSquareIcon, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

export default function AddToCart({
  className,
  product,
  textVisible = false,
  variant,
  quantity,
  ...props
}: {
  className?: string;
  textVisible?: boolean;
  quantity?: number;
  variant?: "outline" | "ghost" | "link" | "default";
  product: TCartProduct;
}) {
  const { cart, addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false); // Track if item is already added

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
    if (isAdded) {
      toast.warning("Item already added to cart. Please visit your cart.", {
        richColors: true,
      });
    } else {
      addToCart({ ...product, quantity: quantity || 1 });
      setIsAdded(true);
      toast.success(`Product : ${product.name}, Added to cart`, {
        richColors: true,
      });
    }
  };

  return (
    <>
      <Button
        {...props}
        onClick={handleAddToCart}
        variant={variant || "outlineSecondary"}
        className={cn(
          "rounded text-xs md:text-sm",
          textVisible ? "w-full" : "w-fit",
          isAdded ? "bg-slate-200 text-slate-700" : "bg-transparent",
          className,
        )}
        size="sm"
      >
        {isAdded ? <CheckSquareIcon /> : <ShoppingBag />}{" "}
        {textVisible && (isAdded ? "Added to Cart" : "Add to Cart")}
      </Button>
    </>
  );
}
