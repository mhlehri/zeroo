import Product from "@/components/pages/product/product";

export default function page({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = searchParams;
  return (
    <div className="container">
      <Product query={query} />
    </div>
  );
}
