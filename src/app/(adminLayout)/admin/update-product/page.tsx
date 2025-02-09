import UpdateProductForm from "@/components/form/update-product-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id = "" } = await searchParams; // Directly access the property
  console.log(id, "searchParams");

  return (
    <div>
      <UpdateProductForm id={id} />
    </div>
  );
}
