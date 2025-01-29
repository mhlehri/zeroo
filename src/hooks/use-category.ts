import { getCategories } from "@/services/category";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const [categories, setCategories] = useState<TCategory[]>([]);

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
      setCategories(data.data.categories);
    } else {
      setCategories([]);
    }
  }, [data]);

  return { categories, isCategoriesLoading, isError };
}
