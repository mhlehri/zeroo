import Product from "@/components/pages/product/product";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { query = "", category = "", sort = "" } = await searchParams;
  console.log("query =>", query, "from page.tsx");
  console.log("category =>", category, "from page.tsx");
  return (
    <div className="container">
      <Product query={query} category={category} sort={sort} />
    </div>
  );
}
