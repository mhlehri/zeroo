"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BottomNavigation from "./bottom-navigation";
import RightSide from "./right-side";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/services/category";
import { Loader2 } from "lucide-react";

type TLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const links: TLink[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Shop",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/products?sort=newest",
    label: "New Arrivals",
  },
];

export default function Navbar() {
  // const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const result = await getCategories();
      console.log(result?.data, "result");
      return result?.data;
    },
  });
  const { categories } = data || [];

  console.log(categories, "categories");

  return (
    <>
      <div className="bg-primary-50/90 backdrop-blur-lg sticky top-0 md:relative z-50">
        <div className="flex justify-between items-center p-4 gap-6 container border-b border-b-primary-100">
          {/* <MobileMenu className="h-fit md:hidden" textHidden={true}/> */}
          <div className="">
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-primary"
            >
              Zeroo
            </Link>
          </div>
          {!isSticky && <RightSide />}
        </div>
      </div>
      <div className="shadow-md hidden md:block bg-primary-50/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center px-4 py-2 justify-between gap-4">
          <ul className="flex items-center gap-6 lg:gap-10">
            {links?.map((link, index) =>
              link.label !== "Categories" ? (
                <li
                  key={`nav-item-${index}`}
                  className="text-sm text-center uppercase hover:opacity-70 hover:underline whitespace-nowrap"
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ) : (
                <NavigationMenu key={`nav-item-${index}`}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm text-center uppercase font-normal  hover:opacity-70 hover:underline p-0 bg-none">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[360px] gap-3 p-4 md:grid-cols-2">
                          {categories?.length > 0 ? (
                            categories?.map((category: TCategory) => (
                              <ListItem
                                key={category.name}
                                title={category.name}
                                href={`${category.name
                                  .replace(/\s+/g, "-")
                                  .toLocaleLowerCase()}`}
                              ></ListItem>
                            ))
                          ) : isLoading ? (
                            <div className="flex items-center justify-center p-4">
                              <Loader2 className="h-6 w-6 animate-spin" />
                            </div>
                          ) : null}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )
            )}
          </ul>
          {/* search */}
          {isSticky && <RightSide />}
        </div>
      </div>

      <BottomNavigation categories={categories} />
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
