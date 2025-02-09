import CardCarousel from "@/components/card/card-carousel";
import { getProducts } from "@/services/product";

export default async function FeaturedProducts() {
  const { data } = await getProducts({
    limit: 8,
    sortOrder: "new",
  });
  const products = await data?.products;

  return <CardCarousel cardArr={products}></CardCarousel>;
}
