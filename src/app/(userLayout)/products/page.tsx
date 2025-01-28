import Product from "@/components/pages/product/product";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { query = "" } = await searchParams;
  const queryString = Array.isArray(query) ? query[0] || "" : query;

  console.log(queryString);
  return (
    <div className="container">
      <Product query={queryString} />
    </div>
  );
}
