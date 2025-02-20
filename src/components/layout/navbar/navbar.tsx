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
    href: "/products?sort=new",
    label: "New Arrivals",
  },
];

export default function Navbar() {
  // const [open, setOpen] = useState(false);
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

  // console.log(pathname, isProductPage);

  return (
    <>
      <div className="bg-primary-50 sticky top-0 z-50 md:relative">
        <div className="border-b-primary-200 container flex items-center justify-between gap-4 border-b py-2 md:gap-6 md:py-4">
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
                className="text-primary flex items-center gap-2 pl-2 text-2xl font-bold md:text-3xl"
              >
                <Blend /> <span className="">Zeroo</span>
              </Link>
            </>
          )}
          <RightSideNotSticky />
        </div>
      </div>
      <div className="bg-primary-50 sticky top-0 z-50 hidden shadow-md md:block">
        <div className="container flex items-center justify-between gap-4 px-4 py-2">
          <ul className="text-primary flex items-center gap-6 font-medium lg:gap-10">
            {links?.map((link, index) =>
              link.label !== "Categories" ? (
                <li
                  key={`nav-item-${index}`}
                  className={`text-center text-sm whitespace-nowrap uppercase hover:underline hover:opacity-70 ${pathname === link.href ? "font-semibold" : ""}`}
                >
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ) : (
                <NavigationMenu key={`nav-item-${index}`}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-none p-0 text-center text-sm uppercase hover:underline hover:opacity-70">
                        {link.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {isCategoriesLoading ? (
                          <div className="grid w-[360px] gap-3 p-4 md:grid-cols-2">
                            <CategoryMenuSkeleton />
                            <CategoryMenuSkeleton />
                            <CategoryMenuSkeleton />
                            <CategoryMenuSkeleton />
                            <CategoryMenuSkeleton />
                          </div>
                        ) : (
                          <ul className="grid w-[360px] gap-3 p-2 md:grid-cols-2">
                            {categories?.length > 0
                              ? categories?.map((category: TCategory) => (
                                  <ListItem
                                    key={category.name}
                                    title={category.name}
                                    image={category?.image}
                                  />
                                ))
                              : null}
                          </ul>
                        )}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ),
            )}
          </ul>
          {/* search */}
          <RightSideSticky />
        </div>
      </div>
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
