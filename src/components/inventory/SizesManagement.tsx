"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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

  // Sizes Query
  const {
    data: sizes = [],
    isLoading: isSizesLoading,
    isError: isSizesError,
  } = useQuery({
    queryKey: ["sizes"],
    queryFn: getSizes,
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
        toast.success(data.message || "Size added successfully");
        queryClient.invalidateQueries({ queryKey: ["sizes"] });
        sizeForm.reset();
      } else {
        toast.error(data.message || "Failed to add size");
      }
    },
    onError: (error) => {
      toast.error("An error occurred while adding the size");
      console.error(error);
    },
  });

  // Delete Size Mutation
  const { mutate: deleteSizeMutation, isPending: isDeletingSize } = useMutation(
    {
      mutationFn: deleteSize,
      onSuccess: (data) => {
        if (data.success) {
          toast.success(data.message || "Size deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["sizes"] });
        } else {
          toast.error(data.message || "Failed to delete size");
        }
      },
      onError: (error) => {
        toast.error("An error occurred while deleting the size");
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
        <CardHeader>
          <CardTitle>Existing Sizes</CardTitle>
          <CardDescription>Manage your product sizes</CardDescription>
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
              {sizes.map((size: string, index: number) => (
                <Badge
                  key={index}
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
      </Card>
    </div>
  );
}
