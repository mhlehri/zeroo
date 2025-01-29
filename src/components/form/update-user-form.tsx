"use client";
import { updateUserAction } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
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
import { useUserById } from "@/hooks/use-user";

// Validation schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  address: z.string().min(2, {
    message: "Address is required.",
  }),
  phone: z.string().min(1, {
    message: "Phone number is required.",
  }),
  role: z.string({
    message: "Role is required.",
  }),
});

export default function UserUpdateForm({ id }: { id: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      role: "",
    },
  });

  const { user } = useUserById(id);

  // Reset form when `user` prop is passed
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
        role: user.role || "",
      });
    }
  }, [user, form]);

  // Mutations for Create and Update
  const { mutate: saveUser, isPending } = useMutation<
    unknown,
    Error,
    FieldValues
  >({
    mutationKey: ["user"],
    mutationFn: async (values: FieldValues) => {
      let res;
      const formData = { ...values };
      if (user?._id) {
        res = await updateUserAction({ id: user._id, formData });
      }

      if (res.success) {
        toast.success(res.message, { richColors: true });
        form.reset();
      } else {
        toast.error(res.message, { richColors: true });
      }
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Submitting:", values);
    saveUser(values);
  };

  return (
    <div className="w-full max-w-md p-6 md:p-8 rounded-lg shadow-lg border h-fit mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-2xl md:text-3xl font-semibold text-center">
            {user ? "Update User" : "Add User"}
          </h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email address" {...field} />
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
                  <Input placeholder="Phone number" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["admin", "user"].map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit">
            {isPending ? "Processing..." : user ? "Update User" : "Add User"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
