"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUser } from "@/context/user-provider";
import { updateUserAction } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { useUserById } from "@/hooks/use-user";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  address: z.string().min(2, {
    message: "address is required.",
  }),
  phone: z.string().min(1, {
    message: "phone number is required.",
  }),
});

export default function SignupForm() {
  const { user, loading } = useUser();
  const { user: userData } = useUserById(user?.id as string);
  if (loading) {
    <Loader2 className="mx-auto my-2 animate-spin" />;
  }
  const u = userData;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: u?.name || "",
      email: u?.email || "",
      address: u?.address || "",
      phone: u?.phone || "",
    },
  });
  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name,
        email: userData.email,
        address: userData.address,
        phone: userData.phone,
      });
    }
  }, [userData, form]);
  const { mutate: updateUser } = useMutation<unknown, Error, FieldValues>({
    mutationKey: ["users", userData, user?.id],
    mutationFn: async (values: FieldValues) => {
      if (!user?.id) {
        throw new Error("User not Found!");
      }
      const res = await updateUserAction({ id: user.id, formData: values });
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
        console.log(res, "res");
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    updateUser(values);
  }
  const submitting = form.formState.isSubmitting;
  return (
    <div className="roundeddd-lg mx-auto my-6 h-fit w-full max-w-xl border p-6 shadow-lg md:my-10 md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary flex items-center justify-center gap-2 text-2xl font-semibold md:text-3xl">
            <User /> Account Details
          </h3>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col justify-between gap-3 md:flex-row md:gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="phone number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "Update"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
