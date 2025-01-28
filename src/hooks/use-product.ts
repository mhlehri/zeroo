import { getProductById, getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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

  if (query && query?.length > 0) {
    sortOrder = "";
    limit = 10;
    category = "";
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", query, sortOrder, limit, category],
    queryFn: () =>
      getProducts({ searchTerm: query, sortOrder, limit, category }),
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

export function useProductById(id: string) {
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

  return { product, isLoading, isError };
}
