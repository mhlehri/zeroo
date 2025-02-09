"use client";

import CategoryMenuSkeleton from "@/components/skeleton/category-menu-skeleton";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { label: "HOME", href: "/" },
  { label: "SHOP", href: "/products" },
  { label: "BLOG", href: "/blog" },
  { label: "ABOUT US", href: "/about" },
  { label: "CONTACT US", href: "/contact" },
];

export default function MobileMenu({
  textHidden,
  className,
  isLoading,
  categories,
}: {
  textHidden?: boolean;
  isLoading?: boolean;
  className?: string;
  categories: { name: string; image: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className={className}>
        <>
          <Menu className="text-primary size-5" />
          <span
            className="text-primary-500 truncate text-xs"
            hidden={textHidden}
          >
            Menu
          </span>
        </>
      </DrawerTrigger>
      <DrawerContent className="">
        <Tabs defaultValue="menu" className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle hidden>Menu</DrawerTitle>
            <TabsList className="grid h-12 w-full grid-cols-2 rounded-lg">
              <TabsTrigger
                value="menu"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded"
              >
                MENU
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary rounded"
              >
                CATEGORIES
              </TabsTrigger>
            </TabsList>
          </DrawerHeader>
          <TabsContent value="menu" className="mt-0">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="hover:bg-muted block px-4 py-2 transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </TabsContent>
          <TabsContent value="categories" className="mt-0">
            <nav className="max-h-[50vh] space-y-2 overflow-y-auto">
              {isLoading ? (
                <>
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                  <CategoryMenuSkeleton />
                </>
              ) : (
                categories?.length > 0 &&
                categories?.map((category) => (
                  <Link
                    key={category?.name}
                    href={`/products?category=${category?.name}`}
                    className="hover:bg-muted flex items-center gap-2 px-4 py-2 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {category.image && (
                      <Image
                        src={category.image}
                        width={30}
                        height={30}
                        alt=""
                        className="size-8 rounded"
                      />
                    )}{" "}
                    {category?.name}
                  </Link>
                ))
              )}
            </nav>
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
}
