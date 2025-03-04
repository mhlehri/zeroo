"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetProducts } from "@/hooks/use-product";
import { useDebounce } from "@/lib/use-debounce";
import Image from "next/image";
import Link from "next/link";
import ProductDeleteModal from "../modal/product-delete";
import ProductModal from "../modal/product-modal";
import { DataTableColumnHeader } from "./column-header";
import { DataTable } from "./data-table";

export default function ProductList({ isPublished }: { isPublished?: string }) {
  const [query, setQuery] = React.useState("");
  const debouncedQuery = useDebounce(query, 300);

  const { products, isLoading } = useGetProducts({
    limit: 0,
    query: debouncedQuery,
    isPublished: isPublished ?? "true",
  });

  // console.log(products);

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  const columns: ColumnDef<TProduct>[] = [
    {
      accessorKey: "images",
      header: "Image",
      cell: ({ row }) => {
        const images = row.getValue("images") as string[];
        return (
          <Image
            src={images[0]}
            alt={row.getValue("name")}
            width={50}
            height={50}
            className="roundeddd size-12"
          />
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("category")}</div>
      ),
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Stock" />;
      },

      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("stock")}</div>
      ),
    },
    {
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Price" />
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        return <div className="font-medium">{amount}TK </div>;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original;
        return <ActionCell product={product} />;
      },
    },
  ];

  const ActionCell = ({ product }: { product: TProduct }) => {
    const [open, setOpen] = React.useState(false);

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(product.name)}
          >
            Copy Product Name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <ProductModal product={product}>View Details</ProductModal>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              href={`/admin/update-product?id=${product._id}`}
              className="roundeddd-sm relative w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm outline-hidden transition-colors select-none hover:bg-slate-100 hover:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-slate-50"
            >
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            {isPublished === "false" ? (
              <></>
            ) : (
              <ProductDeleteModal name={product.name} id={product._id}>
                Unpublish
              </ProductDeleteModal>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <DataTable
        data={products}
        isLoading={isLoading}
        columns={columns}
        handleSearch={handleSearch}
      />
    </>
  );
}
