import { getCategories, getCategoryById } from "@/services/category";
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
