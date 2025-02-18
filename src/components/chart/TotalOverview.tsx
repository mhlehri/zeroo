// "use client";
import TotalCounts from "./TotalCounts";
// import { useEffect, useState } from "react";
import { getUsers } from "@/services/auth";
import { getCategories } from "@/services/category";
import { getOrders } from "@/services/order";
import { getProducts } from "@/services/product";
import { Suspense } from "react";

export default async function TotalOverview() {
  //   const [pending, setPending] = useState(true);
  const orders = await getOrders({});
  const { data: users } = await getUsers();
  const totalCategories = await getCategories();
  const totalProducts = await getProducts({});

  //   useEffect(() => {
  //     if (
  //       !isCategoriesLoading &&
  //       !isUsersLoading &&
  //       !isLoading &&
  //       !isOrdersLoading
  //     ) {
  //       setPending(false);
  //     }
  //   }, [isCategoriesLoading, isUsersLoading, isLoading, isOrdersLoading]);

  //   if (pending) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <div className="flex flex-wrap items-center gap-4 *:min-w-56">
      <Suspense fallback={<div>Loading...</div>}>
        <TotalCounts
          text="Orders"
          // isLoading={isOrdersLoading}
          count={orders?.length}
          link="/admin/orders"
        />
      </Suspense>{" "}
      <Suspense fallback={<div>Loading...</div>}>
        <TotalCounts
          text="Products"
          // isLoading={isLoading}
          count={totalProducts?.data?.total}
          link="/admin/products"
        />{" "}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <TotalCounts
          text="Categories"
          // isLoading={isCategoriesLoading}
          count={totalCategories?.data?.total}
          link="/admin/categories"
        />{" "}
      </Suspense>
      <TotalCounts
        text="Users"
        // isLoading={isUsersLoading}
        count={users?.length}
        link="/admin/users"
      />
    </div>
  );
}
