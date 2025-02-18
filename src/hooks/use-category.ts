import { getCategories, getCategoryById } from "@/services/category";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export function useCategories() {
  const {
    data,
    isLoading: isCategoriesLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getCategories(),
  });

  const categories = useMemo(() => data?.categories ?? [], [data]);
  const totalCategories = useMemo(() => data?.total ?? 0, [data]);

  return { totalCategories, categories, isCategoriesLoading, isError };
}

export function useCategoryById(id: string) {
  const [category, setCategory] = useState<TCategory>();

  const {
    data,
    isLoading: isCategoryLoading,
    isError,
  } = useQuery({
    queryKey: ["categories", id],
    queryFn: async () => await getCategoryById(id),
  });

  useEffect(() => {
    if (data?.data) {
      setCategory(data.data);
    }
  }, [data]);

  return { category, isCategoryLoading, isError };
}
