// "use client";
import TotalCounts from "./TotalCounts";
// import { useEffect, useState } from "react";
import { getUsers } from "@/services/auth";
import { getCategories } from "@/services/category";
import { getOrders } from "@/services/order";
import { getProducts } from "@/services/product";

export default function TotalOverview() {
  return (
    <div className="flex flex-wrap items-center gap-4 *:min-w-56">
      <TotalCounts text="Orders" func={getOrders({})} link="/admin/orders" />
      <TotalCounts
        func={getProducts({})}
        text="Products"
        link="/admin/products"
      />
      <TotalCounts
        func={getCategories()}
        text="Categories"
        link="/admin/categories"
      />
      <TotalCounts text="Users" func={getUsers()} link="/admin/users" />
    </div>
  );
}
