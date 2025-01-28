"use client";
import { Filter, ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export type NavProps = {
  links?: unknown[];
  categories: { name: string }[];
};

export default function BottomNavigation({ categories }: NavProps) {
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
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-slate-200 md:hidden">
      <div
        className={`grid h-full max-w-lg  mx-auto ${
          isProductPage ? "grid-cols-4" : "grid-cols-3"
        }`}
      >
        <Link
          href="/products"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 gap-1"
        >
          <Store className="w-6 h-6 text-primary" />
          <span className="text-xs text-gray-500">Shop</span>
        </Link>
        {isProductPage && (
          <div className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 gap-1">
            <Filter className="size-6 text-primary" />
            <span className="text-xs text-gray-500">Filters</span>
          </div>
        )}
        <Link
          href="/cart"
          className="relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 gap-1"
        >
          <ShoppingCart className="w-6 h-6 text-primary" />
          <span className="text-xs text-gray-500">Cart</span>
          <span
            className={`absolute top-2 ${
              isProductPage ? "right-8" : "right-12"
            }  bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center`}
          >
            0
          </span>
        </Link>
        <MobileMenu
          categories={categories}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 gap-1"
        />
        {/* <UserDropdown mainClass="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 gap-1">
          <User className={"size-6 text-primary"} />
          <span className="text-xs text-gray-500 truncate">Account</span>
        </UserDropdown> */}
      </div>
    </div>
  );
}
