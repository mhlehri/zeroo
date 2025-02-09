"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-provider";
import {
  Minus,
  MoveLeft,
  Plus,
  ShoppingBag,
  Trash2,
  Wallet2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const form = useForm({
    defaultValues: {
      shipping: "Inside Dhaka", // Default shipping method
    },
  });

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="mx-auto my-4 flex min-h-[70vh] max-w-6xl flex-col px-4 md:my-6">
      <h1 className="text-primary-800 mb-4 text-center text-3xl font-bold md:mb-6">
        My Cart
      </h1>

      {cart.length === 0 ? (
        <div className="w-full space-y-4">
          <p className="text-primary-600 text-center text-xl">Cart is empty.</p>
          <Button asChild className="mx-auto flex w-fit items-center">
            <Link href="/products" className="">
              <MoveLeft /> Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {/* Cart Items */}
            <div className="bg-primary-50 rounded-lg p-3 shadow-md md:p-6">
              <h2 className="mb-4 flex items-center text-2xl font-semibold">
                <ShoppingBag className="mr-2" /> Items
              </h2>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item?.id}
                    className="flex items-center justify-between gap-4 border-b pb-4 last-of-type:border-b-0 last-of-type:pb-0"
                  >
                    <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:gap-4">
                      <Image
                        src={item?.image || "/placeholder.png"}
                        alt={item?.name}
                        width={60}
                        height={60}
                        className="bg-primary-200 size-16 rounded-md"
                      />
                      <div>
                        <h3 className="text-md font-semibold md:text-base">
                          {item?.name}
                        </h3>
                        <p className="md:text-md text-primary-600 text-sm">
                          TK. {item?.price?.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-1 md:gap-3">
                      <div className="flex w-fit items-center rounded-md border border-slate-300">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 text-xs md:p-1.5 md:text-sm"
                          onClick={() =>
                            updateQuantity(
                              item?.id,
                              Math.max(1, item?.quantity - 1),
                            )
                          }
                        >
                          <Minus size={14} />
                        </Button>
                        <Input
                          type="number"
                          value={item?.quantity}
                          min="1"
                          className="h-7 w-8 border-0 p-1 text-center text-xs md:w-12 md:p-2 md:text-sm"
                          onChange={(e) =>
                            updateQuantity(
                              item?.id,
                              Number.parseInt(e.target.value) || 1,
                            )
                          }
                        />
                        <Button
                          className="p-1 text-xs md:p-1.5 md:text-sm"
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            updateQuantity(item?.id, item?.quantity + 1)
                          }
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="link"
                        className="text-xs text-red-500"
                        onClick={() => removeFromCart(item?.id)}
                      >
                        <Trash2 size={14} />{" "}
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-8">
            {/* Order Summary */}
            <div className="bg-primary-50 rounded-lg p-3 shadow-md md:p-6">
              <h2 className="mb-4 flex items-center text-2xl font-semibold">
                <Wallet2 className="mr-2" /> Cart Total
              </h2>
              <div className="space-y-2 font-medium slashed-zero">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>TK. {calculateTotal()?.toFixed(2)}</span>
                </div>
                <hr />
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {form.watch("shipping") === "Inside Dhaka"
                      ? "TK. 80.00"
                      : "TK. 120.00"}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Inside Dhaka"
                      checked={form.watch("shipping") === "Inside Dhaka"}
                      onChange={() => form.setValue("shipping", "Inside Dhaka")}
                      className="form-radio"
                    />
                    <span>Inside Dhaka (TK. 80.00)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Outside Dhaka"
                      checked={form.watch("shipping") === "Outside Dhaka"}
                      onChange={() =>
                        form.setValue("shipping", "Outside Dhaka")
                      }
                      className="form-radio"
                    />
                    <span>Outside Dhaka (TK. 120.00)</span>
                  </label>
                </div>
                <hr />
                <div className="mt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    TK.
                    {(
                      calculateTotal() +
                      (form.watch("shipping") === "Inside Dhaka" ? 80 : 120)
                    )?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button onClick={clearCart} variant="outline" className="w-full">
                Clear Cart
              </Button>
              <Button className="w-full" asChild>
                <Link
                  href={{
                    pathname: "/checkout",
                    query: { shipping: form.watch("shipping") },
                  }}
                >
                  Proceed to Checkout
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
