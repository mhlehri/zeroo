"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Trash2, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getSizes, addSize, deleteSize } from "@/services/inventory";

const sizeFormSchema = z.object({
  size: z.string().min(1, { message: "Size is required" }),
});

export default function SizesManagement() {
  const queryClient = useQueryClient();

  // Sizes Query with refetch interval
  const {
    data: sizes = [],
    isLoading: isSizesLoading,
    isError: isSizesError,
    refetch: refetchSizes,
    isFetching: isRefetchingSizes,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
    refetchInterval: 0, // Disable automatic refetching
    staleTime: 0, // Consider data stale immediately
  });

  // Size Form
  const sizeForm = useForm<z.infer<typeof sizeFormSchema>>({
    resolver: zodResolver(sizeFormSchema),
    defaultValues: {
      size: "",
    },
  });

  // Add Size Mutation
  const { mutate: addSizeMutation, isPending: isAddingSize } = useMutation({
    mutationFn: addSize,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message || "Size added successfully", {
          richColors: true,
        });
        // Force refetch after mutation
        queryClient.invalidateQueries({ queryKey: ["sizes"] });
        refetchSizes();
        sizeForm.reset();
      } else {
        toast.error(data.message || "Failed to add size", {
          richColors: true,
        });
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the size", {
        richColors: true,
      });
      console.error(error);
    },
  });

  // Delete Size Mutation
  const { mutate: deleteSizeMutation, isPending: isDeletingSize } = useMutation(
    {
      mutationFn: deleteSize,
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || "Size deleted successfully", {
            richColors: true,
          });
          // Force refetch after mutation
          queryClient.invalidateQueries({ queryKey: ["sizes"] });
          refetchSizes();
        } else {
          toast.error(data.message || "Failed to delete size", {
            richColors: true,
          });
        }
      },
      onError: (error) => {
        toast.error("An error occurred while deleting the size", {
          richColors: true,
        });
        console.error(error);
      },
    },
  );

  // Submit handler
  const onSubmitSize = (values: z.infer<typeof sizeFormSchema>) => {
    addSizeMutation(values);
  };

  const handleDeleteSize = (size: string) => {
    deleteSizeMutation({ size });
  };

  // Force refetch when component mounts
  useEffect(() => {
    refetchSizes();
  }, [refetchSizes]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Add New Size</CardTitle>
          <CardDescription>
            Create a new size for product variants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...sizeForm}>
            <form
              onSubmit={sizeForm.handleSubmit(onSubmitSize)}
              className="space-y-4"
            >
              <FormField
                control={sizeForm.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter size (e.g., S, M, L, XL)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isAddingSize} className="w-full">
                {isAddingSize ? "Adding..." : "Add Size"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Existing Sizes</CardTitle>
            <CardDescription>Manage your product sizes</CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => refetchSizes()}
            disabled={isRefetchingSizes}
            className="h-8 w-8"
          >
            <RefreshCw
              className={`h-4 w-4 ${isRefetchingSizes ? "animate-spin" : ""}`}
            />
            <span className="sr-only">Refresh</span>
          </Button>
        </CardHeader>
        <CardContent>
          {isSizesLoading ? (
            <div className="flex justify-center py-6">
              <div className="border-primary h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
            </div>
          ) : isSizesError ? (
            <div className="py-6 text-center text-red-500">
              Error loading sizes
            </div>
          ) : sizes.length === 0 ? (
            <div className="text-muted-foreground py-6 text-center">
              No sizes found
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {sizes.sort().map((size: string, index: number) => (
                <Badge
                  key={`${size}-${index}`}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1.5"
                >
                  {size}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5 rounded-full p-0 text-red-500 hover:bg-red-100 hover:text-red-600"
                    onClick={() => handleDeleteSize(size)}
                    disabled={isDeletingSize}
                  >
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="text-muted-foreground text-xs">
          {sizes.length} sizes total
        </CardFooter>
      </Card>
    </div>
  );
}
