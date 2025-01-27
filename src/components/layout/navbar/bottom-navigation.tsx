"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Store, User } from "lucide-react";
import Link from "next/link";
import MobileMenu from "./mobile-menu";
import UserDropdown from "./user-dropdown";

export type NavProps = {
  links?: unknown[];
  categories: { name: string }[];
};

export default function BottomNavigation({ categories }: NavProps) {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-amber-200 md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto">
        <Link
          href="/products"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <Store className="w-6 h-6 text-primary" />
          <span className="text-xs text-gray-500">Shop</span>
        </Link>
        <Link
          href="/cart"
          className="relative inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        >
          <ShoppingCart className="w-6 h-6 text-primary" />
          <span className="text-xs text-gray-500">Cart</span>
          <span className="absolute top-2 right-8 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            0
          </span>
        </Link>
        <UserDropdown mainClass="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50">
          <Avatar className="border-gray-500">
            <AvatarFallback>
              <User className={"size-4"} />
            </AvatarFallback>
            <AvatarImage
              src="https://randomuser.me/api/portraits"
              className={"size-6"}
              alt="User"
            />
          </Avatar>
          <span className="text-xs text-gray-500 truncate">Account</span>
        </UserDropdown>
        <MobileMenu
          categories={categories}
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50"
        />
      </div>
    </div>
  );
}
