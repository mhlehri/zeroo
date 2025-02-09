"use client";
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
import { useCart } from "@/context/cart-provider";
import { useUser } from "@/context/user-provider";
import { useUserById } from "@/hooks/use-user";
import { addOrder } from "@/services/order";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Loader2,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  Truck,
  Wallet2,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// // Load Stripe
// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );

// Form Schema for validation
const FormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }).optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Street Address is required" }),
  paymentMethod: z.enum(["cash", "online"]), // Add payment method to the schema
  shipping: z.enum(["Inside Dhaka", "Outside Dhaka"]), // Add shipping method to the schema
});

export default function Checkout() {
  const searchParams = useSearchParams();
  const shipping = searchParams.get("shipping");
  console.log(shipping);
  // const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod">(
  //   "stripe"
  // );
  const { user } = useUser();
  const { user: u } = useUserById(user?.id as string);
  const [processing, setProcessing] = useState(false);
  const router = useRouter();
  const { cart, cartLoading, removeFromCart, updateQuantity, clearCart } =
    useCart();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: u?.name || "",
      email: u?.email || "",
      phone: u?.phone || "",
      address: u?.address || "",
      paymentMethod: "cash",
      shipping:
        shipping === "Inside Dhaka" || shipping === "Outside Dhaka"
          ? shipping
          : "Inside Dhaka",
    },
  });
  useEffect(() => {
    if (u) {
      form.reset({
        name: u.name,
        email: u.email,
        address: u.address,
        phone: u.phone,
      });
    }
  }, [u, form]);
  console.log(user, "user");
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleSubmitOrder = async (data: z.infer<typeof FormSchema>) => {
    try {
      setProcessing(true);
      const { name, email, phone, address, paymentMethod } = data;
      const res = await addOrder({
        name,
        email,
        phone,
        address,
        paymentMethod,
        user: user?.id,
        products: cart.map((item) => ({
          product: item.id,
          quantity: item.quantity,
        })),
        totalAmount:
          calculateTotal() +
          (form.watch("shipping") === "Inside Dhaka" ? 80 : 120),
        orderStatus: "unconfirmed",
        paymentStatus: "pending",
      });

      if (paymentMethod === "online") {
        if (res.data?.payment_url) {
          window.location.href = res?.data?.payment_url;
        }
        clearCart();
      } else {
        if (res.success) {
          toast.success("Order placed successfully!", { richColors: true });
          setProcessing(false);
          clearCart();
        } else {
          toast.error(res.message, {
            richColors: true,
          });
          setProcessing(false);
        }
      }

      // Log shipping method
      console.log("FormData:", data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  if (cartLoading) return <Loader2 className="mx-auto my-2 animate-spin" />;

  if (cart?.length === 0) {
    router.push("/products");
  }

  return (
    <div className="mx-auto max-w-6xl p-3 md:p-6">
      <h1 className="text-primary-800 mb-8 text-center text-3xl font-bold">
        Checkout
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitOrder)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-primary-50 rounded-lg p-3 shadow-md md:p-6">
                <h2 className="mb-4 flex items-center text-xl font-semibold md:text-2xl">
                  <Truck className="mr-2" /> Shipping Information
                </h2>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />{" "}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="example@gmail.com" {...field} />
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
                        <Input placeholder="+800" {...field} />
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
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Shipping Method Radio Buttons */}
                <FormField
                  control={form.control}
                  name="shipping"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Shipping</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Inside Dhaka"
                              checked={field.value === "Inside Dhaka"}
                              onChange={() => field.onChange("Inside Dhaka")}
                              className="form-radio"
                            />
                            <span>Inside Dhaka (TK. 80.00)</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="Outside Dhaka"
                              checked={field.value === "Outside Dhaka"}
                              onChange={() => field.onChange("Outside Dhaka")}
                              className="form-radio"
                            />
                            <span>Outside Dhaka (TK. 120.00)</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Payment Information */}
                {/* <h2 className="text-xl md:text-2xl font-semibold my-4 flex items-center">
              <Wallet className="mr-2" /> Payment Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-2 font-medium">Payment Method</label>
                <div className="flex gap-2">
                  <Button
                    variant={paymentMethod === "stripe" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("stripe")}
                    className="flex-1"
                  >
                    <CreditCard className="mr-2" /> Stripe
                    </Button>
                    <Button
                    variant={paymentMethod === "cod" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("cod")}
                    className="flex-1"
                  >
                  Cash on Delivery
                  </Button>
                </div>
              </div>
              {paymentMethod === "stripe" && (
                <Elements stripe={stripePromise}>
                  <StripePaymentForm
                    shippingInfo={form.getValues()}
                    user={user?._id || ""}
                    products={cart.map((item) => ({
                      product: item.id,
                      quantity: item.quantity,
                    }))}
                    SubmitButton={
                      <Button
                        disabled={processing || !form.formState.isValid}
                        type="submit"
                        className="w-full md:text-lg"
                      >
                        {processing ? "Processing..." : "Pay"}
                      </Button>
                    }
                  />
                </Elements>
              )}

              {paymentMethod === "cod" && (
                <div>
                  <div className="text-center text-primary-600">
                    Pay with cash when your order is delivered.
                  </div>
                  <Button
                    onSubmit={form.handleSubmit(handleSubmitOrder)}
                    disabled={processing}
                    className="w-full  md:text-lg mt-3"
                  >
                    {processing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              )}
            </div>
            */}
              </div>
            </div>
            <div className="space-y-8">
              {/* Order Summary */}
              <div className="bg-primary-50 space-y-2 rounded-lg p-3 shadow-md md:space-y-4 md:p-6">
                <h2 className="flex items-center text-xl font-semibold md:text-2xl">
                  <ShoppingBag className="mr-2" /> Cart Items
                </h2>
                <ul className="space-y-2">
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-primary-600">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 md:flex-nowrap">
                        <div className="flex w-fit items-center rounded-md border border-slate-300">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="p-1.5 text-xs md:text-sm"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1),
                              )
                            }
                          >
                            <Minus size={14} />
                          </Button>
                          <Input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="h-7 w-12 border-0 p-2 text-center"
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number.parseInt(e.target.value) || 1,
                              )
                            }
                          />
                          <Button
                            className="p-1.5 text-xs md:text-sm"
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                        <Button
                          size="sm"
                          variant="link"
                          className="text-xs text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 size={14} />{" "}
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
                <h2 className="flex items-center text-xl font-semibold md:text-2xl">
                  <Wallet2 className="mr-2" /> Order Summary
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>TK. {calculateTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {form.watch("shipping") === "Inside Dhaka"
                        ? "TK. 80.00"
                        : "TK. 120.00"}
                    </span>
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>
                      TK.
                      {(
                        calculateTotal() +
                        (form.watch("shipping") === "Inside Dhaka" ? 80 : 120)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="online payment"
                              checked={field.value === "online"}
                              onChange={() => field.onChange("online")}
                              className="form-radio"
                            />
                            <span>online payment</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              value="cash on delivery"
                              checked={field.value === "cash"}
                              onChange={() => field.onChange("cash")}
                              className="form-radio"
                            />
                            <span>cash on delivery</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={processing}
                  className="mt-3 w-full md:text-lg"
                >
                  {processing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
