"use client";
import { useCategories } from "@/hooks/use-category";
import { addSubCategory } from "@/services/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, useForm } from "react-hook-form";
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
});

export default function AddSubCategoryForm() {
  const { categories } = useCategories();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      categoryId: "",
    },
  });
  const { mutate: createCategory, isPending } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["categories"],
    mutationFn: async (values: FieldValues) => {
      const res = await addSubCategory(values);

      console.log(res, "res category");
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
        form.setValue("name", "");
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    createCategory(values);
  }

  const submitting = isPending;
  return (
    <div className="roundeddd-lg h-fit w-full max-w-md border bg-white p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
            Add Sub Category
          </h3>
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category: TCategory) => (
                      <SelectItem key={category?.name} value={category?._id}>
                        {category?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sub Category</FormLabel>
                <FormControl>
                  <Input placeholder="sub category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={submitting} type="submit">
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
