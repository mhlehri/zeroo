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
import skeletonImage from "../../../public/1.jpg";
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
  const [imageUrl, setImageUrl] = useState<string | null>();
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
      setImageUrl(category?.image ?? skeletonImage);
    }
  }, [category, form]);

  console.log(category?.image);

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
    <div className="mx-auto h-fit w-full max-w-md rounded-lg border p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
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
              signatureEndpoint={
                process.env.NEXT_PUBLIC_CLOUDINARY_SIGNATURE_ENDPOINT!
              }
              uploadPreset="Zeroo_products"
              options={{
                multiple: false,
                context: {
                  caption: `${form.getValues("name")}`,
                  alt: `${form.getValues("name")}-image`,
                },
                tags: [`${form.getValues("name")}`],
              }}
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
              <p className="mt-1 text-xs text-red-500">Image is required!</p>
            )}

            {/* ✅ Image Preview */}
            {isCategoryLoading ? (
              <div className="loader mx-auto" />
            ) : imageUrl ? (
              <Image
                className="mt-2 size-32 rounded border border-dashed border-slate-300 p-2"
                width={100}
                height={100}
                src={imageUrl}
                alt="Preview image"
              />
            ) : (
              <p className="text-primary-400 mt-1 text-xs">
                No images avalaible
              </p>
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
