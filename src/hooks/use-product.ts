import { getProductById, getProducts, updateProduct } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { useMemo } from "react";

type TProductParams = {
  query?: string;
  sortOrder?: string;
  limit?: number;
  category?: string;
  page?: number;
};

export function useGetProducts({
  query,
  sortOrder,
  limit,
  category,
  page,
}: TProductParams) {
  if (query && query?.length > 0) {
    sortOrder = "";
    limit = 12;
    page = 1;
    category = "";
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", query, sortOrder, limit, category, page],
    queryFn: () =>
      getProducts({ searchTerm: query, sortOrder, limit, category, page }),
  });

  const products = useMemo(() => data?.products ?? [], [data]);
  const totalProducts = useMemo(() => data?.total ?? 0, [data]);

  return { totalProducts, products, isLoading, isError };
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
