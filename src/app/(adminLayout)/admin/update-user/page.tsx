import UserUpdateForm from "@/components/form/update-user-form";
export default async function Page({
  searchParams,
}: {
  searchParams: Record<string, string | "">;
}) {
  const id = searchParams.id; // Directly access the property
  console.log(id, "searchParams");

  return (
    <div>
      <UserUpdateForm id={id} />
    </div>
  );
}
