import { CommandDialogSearch } from "@/components/search/search-command";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import UserDropdown from "./user-dropdown";

export default function RightSide() {
  return (
    <div className="flex items-center gap-6 lg:gap-10 md:w-full justify-end">
      {/* search */}
      <CommandDialogSearch />
      <Link href="/cart" className="relative">
        <ShoppingCart className="w-6 h-6 text-primary hover:text-primary/80" />
        <span className="absolute -top-1 left-3  bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          0
        </span>
      </Link>
      <UserDropdown>
        <User className={"size-6 text-primary"} />
      </UserDropdown>
    </div>
  );
}
