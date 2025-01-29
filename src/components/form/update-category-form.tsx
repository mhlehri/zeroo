"use client";
import { updateCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { useCategoryById } from "@/hooks/use-category";

// ✅ Form Schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
});

export default function UpdateCategoryForm({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { category, isCategoryLoading } = useCategoryById(id);

  // ✅ State for Image Upload
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState(false);

  // ✅ React Hook Form Setup
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });
  console.log(category);

  // ✅ Update form fields when `category` data is available
  useEffect(() => {
    if (category) {
      form.reset({
        name: category?.name || "",
      });
      setImageUrl(category?.image || null);
    }
  }, [category, form]);

  // ✅ Mutation for updating category
  const { mutate: updateCategoryMutation, isPending } = useMutation({
    mutationKey: ["categories"],
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const formData = { ...values, image: imageUrl };
      const res = await updateCategory({ id, formData });

      if (res.success) {
        toast.success(res.message, { richColors: true });
        form.reset();
        setImageUrl(null);

        // ✅ Revalidate categories
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      } else {
        toast.error(res.message, { richColors: true });
      }
    },
  });

  // ✅ Handle Form Submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!imageUrl) {
      setErrorImage(true);
      return;
    }
    setErrorImage(false);
    updateCategoryMutation(values);
  }

  return (
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-primary text-2xl md:text-3xl font-semibold text-center">
            Edit Category
          </h3>

          {/* ✅ Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ✅ Image Upload */}
          <div>
            <CldUploadWidget
              uploadPreset="zeroo_products"
              options={{ multiple: false }}
              onSuccess={(result, { widget }) => {
                const info = result?.info;
                if (
                  info &&
                  typeof info === "object" &&
                  "secure_url" in info &&
                  typeof info.secure_url === "string"
                ) {
                  setImageUrl(info.secure_url);
                  setErrorImage(false);
                  widget.close();
                }
              }}
            >
              {({ open }) => (
                <Button
                  type="button"
                  className={`border-dashed ${
                    errorImage
                      ? "border-red-500 text-red-500"
                      : "border-slate-300"
                  } w-full`}
                  variant="outline"
                  onClick={() => open()}
                >
                  Upload Image
                </Button>
              )}
            </CldUploadWidget>
            {errorImage && (
              <p className="text-xs text-red-500 mt-1">Image is required!</p>
            )}

            {/* ✅ Image Preview */}
            {isCategoryLoading ? (
              <>loading...</>
            ) : imageUrl ? (
              <Image
                className="size-32 p-2 border-dashed mt-2 border-slate-300 border rounded"
                width={100}
                height={100}
                src={imageUrl}
                alt="Preview image"
              />
            ) : (
              <p className="text-xs text-gray-400 mt-1">No images avalaible</p>
            )}
          </div>

          {/* ✅ Submit Button */}
          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Update Category"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
