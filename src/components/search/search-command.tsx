"use client";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "@/lib/use-debounce";
import { getProducts } from "@/services/product";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";

export function CommandDialogSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 500);

  const { data, isLoading } = useQuery({
    queryKey: ["products", debouncedQuery],
    queryFn: async () => {
      const result = await getProducts({ searchTerm: debouncedQuery });
      console.log(result, "Fetched Result");
      return result; // Ensure the API returns { data: { products: [...] } }
    },
  });

  // Memoize products to avoid unnecessary re-renders
  const products = useMemo(() => data?.data?.products || [], [data]);
  console.log(debouncedQuery, "Debounced Query");
  console.log(query, "Query");
  console.log(products, "products");

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="block w-full md:max-w-sm relative">
        <Input
          placeholder="Search by products..."
          className="bg-black/5 rounded-lg border-primary-200 hover:placeholder:text-black placeholder:text-black/50 py-0 hidden md:block text-sm"
          onFocus={() => setOpen(true)} // Open dialog on focus
        />
        <Search className="text-primary md:absolute right-2 top-[20%]" />
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command>
          <CommandInput
            placeholder="Search products..."
            value={query}
            onValueChange={handleSearch}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : (
              <>
                {products?.length === 0 && query !== "" && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
                {products?.length > 0 && (
                  <div>
                    {products?.map((product: TProduct) => (
                      <div
                        key={product._id}
                        className="flex items-center gap-2 p-2"
                        onSelect={() => {
                          setQuery(product?.name || "");
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {product?.category} • {product?.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
