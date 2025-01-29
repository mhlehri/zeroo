import UpdateProductForm from "@/components/form/update-product-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | "">;
}) {
  const id = searchParams.id; // Directly access the property
  console.log(id, "searchParams");

  return (
    <div>
      <UpdateProductForm id={id} />
    </div>
  );
}
