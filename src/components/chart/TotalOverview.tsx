"use client";
import { useUsers } from "@/hooks/use-user";
import TotalCounts from "./TotalCounts";
import { useGetProducts } from "@/hooks/use-product";
import { useCategories } from "@/hooks/use-category";
import { useEffect, useState } from "react";
import { useGetOrders } from "@/hooks/use-order";

export default function TotalOverview() {
  const [pending, setPending] = useState(true);
  const { users, isUsersLoading } = useUsers();
  const { totalProducts, isLoading } = useGetProducts({});
  const { totalCategories, isCategoriesLoading } = useCategories();
  const { orders, isOrdersLoading } = useGetOrders({});

  useEffect(() => {
    if (
      !isCategoriesLoading &&
      !isUsersLoading &&
      !isLoading &&
      !isOrdersLoading
    ) {
      setPending(false);
    }
  }, [isCategoriesLoading, isUsersLoading, isLoading, isOrdersLoading]);

  if (pending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap items-center gap-4 *:min-w-56">
      <TotalCounts
        text="Orders"
        isLoading={isOrdersLoading}
        count={orders?.length}
        link="/admin/orders"
      />
      <TotalCounts
        text="Products"
        isLoading={isLoading}
        count={totalProducts}
        link="/admin/products"
      />
      <TotalCounts
        text="Categories"
        isLoading={isCategoriesLoading}
        count={totalCategories}
        link="/admin/categories"
      />
      <TotalCounts
        text="Users"
        isLoading={isUsersLoading}
        count={users?.length}
        link="/admin/users"
      />
    </div>
  );
}
