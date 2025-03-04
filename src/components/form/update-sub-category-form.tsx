"use client";
import { useCategories } from "@/hooks/use-category";
import { updateSubCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  subCategoryId: z.string().min(1, {
    message: "Sub Category is required.",
  }),
});

export default function UpdateSubCategoryForm() {
  const { categories, isCategoriesLoading } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      subCategoryId: "",
    },
  });

  const categoryId = form.watch("categoryId");
  const subCategoryId = form.watch("subCategoryId");

  const { mutate: updateCategory, isPending } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["updateSubCategory"],
    mutationFn: async (values: FieldValues) => {
      const res = await updateSubCategory(values);

      if (res.success) {
        toast.success(res.message || "Sub Category updated successfully", {
          richColors: true,
        });
        // Reset only the name field, keep the category and subcategory selections
        form.setValue("name", "");
      } else {
        toast.error(res.message || "Failed to update Sub Category", {
          richColors: true,
        });
      }
    },
  });

  // When category changes, update the selected category object
  useEffect(() => {
    if (categoryId && categories) {
      const category = categories.find(
        (cat: TCategory) => cat._id === categoryId,
      );
      setSelectedCategory(category || null);
      // Reset subcategory selection when category changes
      form.setValue("subCategoryId", "");
      form.setValue("name", "");
    }
  }, [categoryId, categories, form]);

  // When subcategory changes, update the name field
  useEffect(() => {
    if (subCategoryId && selectedCategory?.subCategories) {
      const subCategory = selectedCategory.subCategories.find(
        (sub) => sub._id === subCategoryId,
      );
      if (subCategory) {
        form.setValue("name", subCategory.name);
      }
    }
  }, [subCategoryId, selectedCategory, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateCategory(values);
  }

  const submitting = isPending;
  const hasSubCategories =
    selectedCategory?.subCategories &&
    selectedCategory.subCategories.length > 0;

  return (
    <div className="h-fit w-full max-w-md border bg-white p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
            Update Sub Category
          </h3>

          {/* Category Selection */}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isCategoriesLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          isCategoriesLoading
                            ? "Loading categories..."
                            : "Select a category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category: TCategory) => (
                      <SelectItem key={category?._id} value={category?._id}>
                        {category?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Sub Category Selection */}
          <FormField
            control={form.control}
            name="subCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category to Update</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!selectedCategory || !hasSubCategories}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          !selectedCategory
                            ? "Select a category first"
                            : !hasSubCategories
                              ? "No sub categories available"
                              : "Select a sub category"
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedCategory?.subCategories?.map((subCategory) => (
                      <SelectItem key={subCategory._id} value={subCategory._id}>
                        {subCategory.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Name Input */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter new sub category name"
                    {...field}
                    disabled={!form.watch("subCategoryId")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={submitting || !form.watch("subCategoryId")}
            type="submit"
            className="w-full"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Sub Category"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
