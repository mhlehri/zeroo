import { CommandDialogSearch } from "@/components/search/search-command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import UserDropdown from "./user-dropdown";

export default function RightSide() {
  return (
    <div className="flex items-center gap-6 lg:gap-10 md:w-full justify-end">
      {/* search */}
      <CommandDialogSearch />
      <Link href="/cart" className="text-primary hover:text-primary/80">
        <ShoppingCart />
      </Link>
      <UserDropdown mainClass="hidden md:block">
        <Avatar className="border-amber-500">
          <AvatarFallback>
            <User className={"size-6 text-primary"} />
          </AvatarFallback>
          <AvatarImage
            src="https://randomuser.me/api/portraits"
            className={"size-6"}
            alt="User"
          />
        </Avatar>
      </UserDropdown>
    </div>
  );
}
