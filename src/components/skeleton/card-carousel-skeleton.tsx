import React from "react";
import ProductCardSkeleton from "./product-card-skeleton";

export default function CardCarouselSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <ProductCardSkeleton className="" />
      <ProductCardSkeleton className="" />
      <ProductCardSkeleton className="md:block hidden" />
      <ProductCardSkeleton className="lg:block hidden" />
      <ProductCardSkeleton className="xl:block hidden" />
    </div>
  );
}
