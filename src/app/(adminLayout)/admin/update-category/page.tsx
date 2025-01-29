import UpdateCategoryForm from "@/components/form/update-category-form";

export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | "">;
}) {
  const id = searchParams.id; // Directly access the property
  console.log(id, "searchParams");

  return (
    <div>
      <UpdateCategoryForm id={id} />
    </div>
  );
}
