"use client";
import { CommandDialogSearch } from "@/components/search/search-command";
import { CircleUser, Home, Search, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserDropdown from "./user-dropdown";

export type NavProps = {
  links?: unknown[];
  categories: { name: string; image: string }[];
};

export default function BottomNavigation() {
  const [isProductPage, setIsProductPage] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/products")) {
      setIsProductPage(true);
    } else {
      setIsProductPage(false);
    }
  }, [pathname]);
  console.log(pathname, isProductPage);
  return (
    <div
      hidden={isProductPage}
      className="bg-primary-50 fixed bottom-0 left-0 z-50 w-full border-t border-slate-200 py-2 md:hidden"
    >
      <div className={`mx-auto grid h-full max-w-lg grid-cols-4`}>
        <Link
          href="/"
          className={`hover:bg-primary-50 ${pathname === "/" ? "text-primary font-semibold" : "text-primary-500"} inline-flex flex-col items-center justify-center gap-1 px-5`}
        >
          <Home className="size-5" />
          <span className="text-[10px]">Home</span>
        </Link>
        <Link
          href="/products"
          className="hover:bg-primary-50 text-primary-500 inline-flex flex-col items-center justify-center gap-1 px-5"
        >
          <Store className="size-5" />
          <span className="text-[10px]">Shop</span>
        </Link>
        <CommandDialogSearch>
          <div className="hover:bg-primary-50 text-primary-500 inline-flex flex-col items-center justify-center gap-1 px-5">
            <Search className="size-5" />
            <span className="text-[10px]">Explore</span>
          </div>
        </CommandDialogSearch>
        {/* <Link
          href="/cart"
          className="hover:bg-primary-50 relative inline-flex flex-col items-center justify-center gap-1 px-5"
        >
          <ShoppingBag className="text-primary-400 size-5" />
          <span className="text-primary-500 text-[10px]">Cart</span>
          <span
            className={`absolute top-0 right-8 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] text-white`}
          >
            {cart.length}
          </span>
        </Link> */}

        <UserDropdown mainClass="inline-flex flex-col items-center justify-center px-5 hover:bg-primary-50 gap-1 text-primary-500">
          <CircleUser
            className={`${pathname === "/orders" || pathname === "/profile" ? "text-primary font-semibold" : ""} size-5`}
          />
          <span
            className={`${pathname === "/orders" || pathname === "/profile" ? "text-primary" : ""} truncate text-[10px]`}
          >
            Account
          </span>
        </UserDropdown>
      </div>
    </div>
  );
}
