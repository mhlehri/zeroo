"use client";
import { useUser } from "@/context/user-provider";
import { cn } from "@/lib/utils";
import { logout } from "@/services/auth";
import Link from "next/link";
import { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

const dropdownItems = [
  {
    title: "Profile",
    url: "/profile",
  },
  {
    title: "Orders",
    url: "/orders",
  },
];

export default function UserDropdown({
  children,
  mainClass,
}: {
  children: ReactNode;
  mainClass?: string;
}) {
  const { user, setLoading } = useUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn("border-0 ring-0 outline-0", mainClass)}
      >
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user ? (
          <>
            {user?.role !== "admin" ? (
              dropdownItems.map((item) => (
                <DropdownMenuItem key={item.title}>
                  <Link className="block w-full" href={item.url}>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem asChild>
                <Link className="block w-full" href={`/admin/dashboard`}>
                  Admin Dashboard
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                setLoading(true);
              }}
            >
              Logout
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem asChild>
              <Link className="block w-full" href="/login">
                Login
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link className="block w-full" href="/signup">
                Create Account
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
