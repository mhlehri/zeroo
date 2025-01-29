import { getProductById, getProducts, updateProduct } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";

type TProductParams = {
  query?: string;
  sortOrder?: string;
  limit?: number;
  category?: string;
};

export function useGetProducts({
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

export function useGetProductById(id: string) {
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

export function useUpdateProductById({
  id,
  formData,
}: {
  id: string;
  formData: FieldValues;
}) {
  const {
    data: product,
    isLoading: isUpdateProductLoading,
    isError,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => updateProduct({ id, formData }),
  });

  return { product, isUpdateProductLoading, isError };
}
