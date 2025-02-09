"use client";
import { CommandDialogSearch } from "@/components/search/search-command";
import { useCart } from "@/context/cart-provider";
import { CircleUser, ShoppingBag } from "lucide-react";
import Link from "next/link";
import UserDropdown from "./user-dropdown";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

export default function RightSide() {
  const [isProductPage, setIsProductPage] = useState(false);
  const [isDetailsPage, setIsDetailsPage] = useState(false);
  const [isCartPage, setIsCartPage] = useState(false);
  const isMobile = useIsMobile();
  const pathname = usePathname();
  useEffect(() => {
    setIsProductPage(pathname === "/products");
    setIsDetailsPage(
      pathname.startsWith("/products/") && pathname.split("/").length === 3,
    );
    setIsCartPage(pathname === "/cart");
  }, [pathname]);

  console.log(pathname, isProductPage);
  const { cart } = useCart();
  return (
    <div className="flex w-full items-center justify-end gap-4 md:gap-6 lg:gap-10">
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
      <Link href="/cart" className="relative">
        <ShoppingBag className="text-primary hover:text-primary/80 size-5 md:size-6" />
        <span className="absolute -top-1 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white">
          {cart.length}
        </span>
      </Link>
      <UserDropdown mainClass="hidden md:block">
        <CircleUser
          className={"text-primary size-5 cursor-pointer md:size-6"}
        />
      </UserDropdown>
    </div>
  );
}
