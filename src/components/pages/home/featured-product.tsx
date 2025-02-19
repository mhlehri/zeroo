import CardCarousel from "@/components/card/card-carousel";
import { getProducts } from "@/services/product";

export default async function FeaturedProducts() {
  const { products } = await getProducts({
    limit: 8,
    sortOrder: "new",
  });

  return <CardCarousel cardArr={products} />;
}
