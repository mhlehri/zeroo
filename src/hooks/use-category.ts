import { getCategories } from "@/services/category";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const [categories, setProducts] = useState<TCategory[]>([]);

  const {
    data,
    isLoading: isCategoriesLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  useEffect(() => {
    if (data?.data?.categories) {
      setProducts(data.data.categories);
    } else {
      setProducts([]);
    }
  }, [data]);

  return { categories, isCategoriesLoading, isError };
}
