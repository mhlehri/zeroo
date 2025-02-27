"use client";
import { CommandDialogSearch } from "@/components/search/search-command";
import { useCart } from "@/context/cart-provider";
import { CircleUser, ShoppingBag } from "lucide-react";
import UserDropdown from "./user-dropdown";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import CartSheet from "@/components/cart/cart-sheet";
import { usePage } from "@/hooks/use-page";

export default function RightSide() {
  const isMobile = useIsMobile();
  const { isProductPage, isCartPage, isDetailsPage } = usePage();
  const { cart } = useCart();

  return (
    <div
      className={`flex w-full items-center justify-end gap-4 md:gap-6 lg:gap-10`}
    >
      {/* search */}
      {isDetailsPage && isMobile ? (
        <p className="w-full text-center text-xl font-semibold">
          Product Details
        </p>
      ) : isCartPage && isMobile ? (
        <p className="w-full text-center text-xl font-semibold">My Cart</p>
      ) : (
        <CommandDialogSearch isProductPage={isProductPage} />
      )}
      <Sheet>
        <SheetTrigger className="relative">
          <ShoppingBag className="size-5 text-black hover:text-black/80 md:size-6" />
          <span className="absolute -top-1 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#D10363] text-[10px] text-white">
            {cart.length}
          </span>
        </SheetTrigger>
        <SheetContent className="p-2 sm:p-4">
          <CartSheet />
        </SheetContent>
      </Sheet>
      <UserDropdown mainClass={`hidden md:block`}>
        <CircleUser className={"size-5 cursor-pointer text-black md:size-6"} />
      </UserDropdown>
    </div>
  );
}
