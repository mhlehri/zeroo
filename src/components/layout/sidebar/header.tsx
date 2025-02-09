"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { items } from "./app-sidebar";

export default function Header() {
  const pathname = usePathname();
  const page = items.find((item) => {
    return item.items
      ? item.items.some((subitem) => subitem.url === pathname)
      : item.url === pathname;
  });
  console.log(page);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/admin/dashboard">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>{page?.title}</BreadcrumbPage>
            </BreadcrumbItem>
            {page?.items?.map((item) =>
              pathname.includes(item.url) ? (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem key={item.url}>
                    <BreadcrumbPage>{item.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              ) : null
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
}
