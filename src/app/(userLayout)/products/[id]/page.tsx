import ProductDetails from "@/components/pages/product/product-details";
import { getProductById } from "@/services/product";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  console.log(product, "product from product details page");
  return (
    <div className="container px-4">
      <ProductDetails product={product} />
    </div>
  );
}
