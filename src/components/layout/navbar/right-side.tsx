"use client";
import CartModal from "@/components/modal/cart";
import { CommandDialogSearch } from "@/components/search/search-command";
import { useCart } from "@/context/cart-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePage } from "@/hooks/use-page";
import { CircleUser } from "lucide-react";
import UserDropdown from "./user-dropdown";

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
      <CartModal cart={cart} />
      <UserDropdown mainClass={`hidden md:block`}>
        <CircleUser className={"size-5 cursor-pointer text-black md:size-6"} />
      </UserDropdown>
    </div>
  );
}
