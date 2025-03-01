import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { ShoppingBag } from "lucide-react";
import CartSheet from "../cart/cart-sheet";
import { CartItem } from "@/context/cart-provider";

export default function CartModal({ cart }: { cart: CartItem[] }) {
  return (
    <Sheet>
      <SheetTrigger className="relative">
        <ShoppingBag className="size-5 text-black hover:text-black/80 md:size-6" />
        <span className="absolute -top-1 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-teal-600 text-[10px] text-white">
          {cart.length}
        </span>
      </SheetTrigger>
      <SheetContent className="p-2 sm:p-4">
        <CartSheet />
      </SheetContent>
    </Sheet>
  );
}
