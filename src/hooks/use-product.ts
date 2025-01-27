import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/product";
import { useDebounce } from "@/lib/use-debounce";

export function useProducts(query: string) {
  const [products, setProducts] = useState<TProduct[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: () => getProducts({ searchTerm: debouncedQuery }),
    enabled: debouncedQuery.length > 0,
  });

  useEffect(() => {
    if (data?.data?.products) {
      setProducts(data.data.products);
    } else {
      setProducts([]);
    }
  }, [data]);

  return { products, isLoading };
}
