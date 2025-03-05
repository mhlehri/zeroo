"use client";
import { useCart } from "@/context/cart-provider";
import { cn } from "@/lib/utils";
import { CheckSquareIcon, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "../cart/cart-sheet";
import { usePage } from "@/hooks/use-page";

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
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isDetailsPage } = usePage();

  useEffect(() => {
    const isItemInCart = cart.find((item) => item.id === product.id);
    if (isItemInCart) {
      setIsAdded(true);
    } else {
      setIsAdded(false);
    }
  }, [cart, product.id]);

  const handleAddToCart = () => {
    if (!isAdded) {
      addToCart({ ...product, quantity: quantity || 1 });
      toast.success(`Product : ${product.name}, Added to cart`, {
        richColors: true,
      });
    }
  };

  return (
    <>
      {!isAdded ? (
        <Button
          disabled={!product.stock}
          {...props}
          onClick={handleAddToCart}
          variant={!product.stock ? "destructive" : variant || "outline"}
          className={cn(
            "rounded text-xs md:text-sm",
            textVisible ? "w-full" : "w-fit",
            className,
          )}
          size="sm"
        >
          {!product.stock ? null : isAdded ? (
            <CheckSquareIcon />
          ) : (
            <ShoppingBag />
          )}{" "}
          {!product.stock && !isDetailsPage
            ? "Out of Stock"
            : textVisible && "Add to Cart"}
        </Button>
      ) : (
        <Sheet
          open={isSheetOpen}
          onOpenChange={() => setIsSheetOpen(!isSheetOpen)}
        >
          <SheetTrigger asChild>
            <Button
              disabled={!product.stock}
              {...props}
              onClick={handleAddToCart}
              variant={!product.stock ? "destructive" : variant || "outline"}
              className={cn(
                "rounded text-xs md:text-sm",
                textVisible ? "w-full" : "w-fit",
                isAdded ? "bg-slate-200 text-slate-700" : "",
                className,
              )}
              size="sm"
            >
              {!product.stock ? null : isAdded ? (
                <CheckSquareIcon />
              ) : (
                <ShoppingBag />
              )}{" "}
              {!product.stock
                ? "Out of Stock"
                : textVisible && (isAdded ? "View Cart" : "Add to Cart")}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-md">
            <CartSheet />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}
