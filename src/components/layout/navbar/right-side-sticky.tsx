"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/cart-provider";
import { CommandDialogSearch } from "@/components/search/search-command";

export default function RightSideSticky() {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cart } = useCart();
  useEffect(() => {
    const toggleVisibility = () => {
      if (isMobile) return; // Prevent sticky behavior for mobile devices
      if (window.pageYOffset > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    if (!isMobile) {
      window.addEventListener("scroll", toggleVisibility);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [isMobile]);

  if (isSticky)
    return (
      <div className="flex gap-2">
        <CommandDialogSearch isSearchInputHidden={true} />
        <Link href="/cart" className="relative">
          <ShoppingBag className="size-5 text-black hover:text-black/80 md:size-6" />
          <span className="absolute -top-1 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#D10363] text-[10px] text-white">
            {cart.length}
          </span>
        </Link>
      </div>
    );
  return;
}
