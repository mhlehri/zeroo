export const Counts = async ({
  func,
}: {
  func: Promise<{ total: number }>;
}) => {
  const { total } = await func;
  return (
    <p className="text-xl font-semibold md:text-2xl lg:text-3xl">{total}</p>
  );
};
