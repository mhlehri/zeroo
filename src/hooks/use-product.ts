import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product";
import { useDebounce } from "@/lib/use-debounce";

type TProductParams = {
  query?: string;
  sortOrder?: string;
  limit?: number;
  category?: string;
};

export function useProducts({
  query,
  sortOrder,
  limit,
  category,
}: TProductParams) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  if (debouncedQuery && debouncedQuery?.length > 0) {
    sortOrder = "";
    limit = 10;
    category = "";
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", debouncedQuery, sortOrder, limit, category],
    queryFn: () =>
      getProducts({ searchTerm: debouncedQuery, sortOrder, limit, category }),
  });

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    } else {
      setProducts([]);
    }
  }, [data]);

  return { products, isLoading, isError };
}
