"use client";

import CategoryMenuSkeleton from "@/components/skeleton/category-menu-skeleton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useCategories } from "@/hooks/use-category";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { forwardRef, useEffect, useState } from "react";
import BottomNavigation from "./bottom-navigation";
import RightSideSticky from "./righ-side-sticky";
import RightSideNotSticky from "./right-side-not-sticky";
import { ArrowLeft, Blend } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import RightSide from "./right-side";

type TLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

const links: TLink[] = [
  // {
  //   href: "/",
  //   label: "Home",
  // },
  {
    href: "/products",
    label: "Shop",
  },
  // {
  //   href: "/categories",
  //   label: "Categories",
  // },
  {
    href: "/products?sort=new",
    label: "New Arrivals",
  },
];

export default function Navbar() {
  const { categories, isCategoriesLoading } = useCategories();
  const router = useRouter();
  const [isDetailsPage, setIsDetailsPage] = useState(false);
  const [isProductPage, setIsProductPage] = useState(false);
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

  return (
    <>
      <div className="sticky top-0 z-50 bg-[#FFBF00]">
        <div className="container flex items-center justify-between gap-4 py-2 md:gap-6 md:py-4 xl:px-0">
          {/* <MobileMenu className="h-fit md:hidden" textHidden={true}/> */}
          {(isMobile && isProductPage) ||
          (isMobile && isCartPage) ||
          (isMobile && isDetailsPage) ? (
            <ArrowLeft
              className="text-primary-700"
              onClick={() => router.back()}
            />
          ) : (
            <>
              {/* <div className="flex items-center divide-x divide-slate-300">
                <MobileMenu
                  textHidden
                  isLoading={isCategoriesLoading}
                  categories={categories}
                  className="hover:bg-primary-50 inline-flex flex-col items-center justify-center gap-1 pr-2 md:hidden"
                />
              </div> */}
              <Link
                href="/"
                className="flex items-center gap-2 pl-2 text-2xl font-bold text-black md:text-2xl"
              >
                {/* <Blend /> */}
                <span className="text-teal-700">Rong</span>
                <span className="text-rose-400">berong</span>
              </Link>
            </>
          )}

          <RightSide />
        </div>
      </div>
      {/* <div className="bg-primary-50 sticky top-0 z-50 hidden shadow-md md:block"></div> */}
      <BottomNavigation />
    </>
  );
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  image?: string;
  title?: string;
}

const ListItem = forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, image, title, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            href={`/products?category=${encodeURIComponent(title as string)}`}
            ref={ref}
            className={cn(
              "hover:bg-primary/10 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-1.5 leading-none no-underline outline-hidden transition-colors select-none",
              className,
            )}
            {...props}
          >
            <div className="flex items-center gap-2 text-sm leading-none font-medium">
              {image && (
                <Image
                  src={image}
                  width={30}
                  height={30}
                  alt=""
                  className="size-8 rounded"
                />
              )}
              {title}
            </div>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  },
);
ListItem.displayName = "ListItem";
