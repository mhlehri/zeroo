"use client";

import Title from "@/components/title";
import CardCarousel from "@/components/card/card-carousel";
import { useGetProducts } from "@/hooks/use-product";

export default function TrendingProducts() {
  const { products, isLoading } = useGetProducts({
    limit: 6,
    sortOrder: "desc",
  });
  if (isLoading) return;
  return (
    <section>
      <Title className="mb-6">Trending Now</Title>
      <CardCarousel cardArr={products}></CardCarousel>
    </section>
  );
}
