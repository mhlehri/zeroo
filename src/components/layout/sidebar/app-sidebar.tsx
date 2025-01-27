"use client";

import { NavMain } from "@/components/layout/sidebar/nav-main";
import { SidebarLogo } from "@/components/layout/sidebar/sidebar-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  ListEnd,
  ListOrdered,
  Package,
  Settings2,
  Users,
} from "lucide-react";
import * as React from "react";
import { NavUser } from "./nav-user";
import { useUser } from "@/context/user-provider";

export const items = [
  {
    title: "Dashboard Overview",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product Management",
    url: "",
    icon: Package,
    isActive: true,
    items: [
      {
        title: "Product List",
        url: "/admin/products",
      },
      {
        title: "Add Product",
        url: "/admin/add-product",
      },
    ],
  },
  {
    title: "Category Management",
    url: "",
    icon: ListEnd,
    isActive: true,
    items: [
      {
        title: "Category List",
        url: "/admin/categories",
      },
      {
        title: "Add Category",
        url: "/admin/add-category",
      },
    ],
  },
  {
    title: "Order Management",
    url: "/admin/orders",
    icon: ListOrdered,
  },
  {
    title: "User Management",
    url: "",
    icon: Users,
    isActive: true,
    items: [
      {
        title: "User List",
        url: "/admin/users",
      },
      {
        title: "Add User",
        url: "/admin/add-user",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
      {
        title: "General",
        url: "#",
      },
      {
        title: "Team",
        url: "#",
      },
      {
        title: "Billing",
        url: "#",
      },
      {
        title: "Limits",
        url: "#",
      },
    ],
  },
];
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {user} = useUser()
  return (
    <Sidebar collapsible="icon" className="" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user?.name || "Admin",
            email: user?.email || "admin@gmail.com",
            avatar: "string",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
