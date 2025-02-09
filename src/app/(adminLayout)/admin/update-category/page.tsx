import UpdateCategoryForm from "@/components/form/update-category-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { id = "" } = await searchParams; // Directly access the property
  console.log(id, "searchParams");

  return (
    <div>
      <UpdateCategoryForm id={id} />
    </div>
  );
}
