"use client";
import { signupAction } from "@/services/auth";
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
    message: "name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email.",
  }),
  password: z.string().min(6, {
    message: "password must be at least 6 characters.",
  }),
  address: z.string().min(2, {
    message: "address is required.",
  }),
  phone: z.string().min(1, {
    message: "phone number is required.",
  }),
  role: z.string({
    message: "role number is required.",
  }),
});

export default function AddUserForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      phone: "",
      role: "",
    },
  });
  const { mutate: registerUser } = useMutation<unknown, Error, FieldValues>({
    mutationKey: ["user"],
    mutationFn: async (values: FieldValues) => {
      const res = await signupAction(values);
      if (res.success) {
        toast.success(res.message, {
          richColors: true,
        });
        form.reset();
      } else {
        toast.error(res.message, {
          richColors: true,
        });
      }
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values, "values");
    registerUser(values);
  }
  const submitting = form.formState.isSubmitting;
  return (
    <div className="mx-auto h-fit w-full max-w-md rounded-lg border p-6 shadow-lg md:p-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <h3 className="text-primary text-center text-2xl font-semibold md:text-3xl">
            Add User
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
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email address" {...field} />
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
                  <Input placeholder="phone number" type="number" {...field} />
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
                  <Input placeholder="address" {...field} />
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
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {["admin", "user"]?.map((role) => (
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="*****" type="password" {...field} />
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
