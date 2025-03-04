"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-provider";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetClose } from "../ui/sheet";

export default function CartSheet() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center space-y-4 px-2 py-8">
        <div className="relative mb-4">
          <div className="absolute inset-0 scale-150 rounded-full bg-teal-500/50 opacity-50 blur-xl" />
          <div className="relative rounded-full bg-teal-50 p-4">
            <ShoppingBag className="size-12 text-slate-600" strokeWidth={1.5} />
          </div>
        </div>
        <h3 className="text-xl font-semibold">Your cart is empty</h3>
        <p className="text-muted-foreground text-center text-sm">
          Add items to your cart to see them here
        </p>
        <SheetClose className="mt-2" asChild>
          <Button variant="default" asChild size="sm">
            <Link href="/products">Browse Products</Link>
          </Button>
        </SheetClose>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-lg font-semibold">
          My Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
        </h2>
      </div>

      <ScrollArea className="-mx-6 flex-1 px-6">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex items-start justify-between gap-3 border-b pb-4"
            >
              <div className="flex gap-3">
                <Link href={`/products/${item.id}`}>
                  <Image
                    src={
                      item?.image ||
                      "data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" ||
                      "/placeholder.svg"
                    }
                    alt={item?.name}
                    width={60}
                    height={60}
                    className="roundeddd-md size-14 bg-slate-600 object-cover"
                  />
                </Link>
                <div>
                  <Link href={`/products/${item.id}`}>
                    <h3 className="line-clamp-2 font-medium">{item?.name}</h3>
                  </Link>
                  <p className="text-sm text-slate-600">TK {item.price}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                    >
                      <Minus size={12} />
                    </Button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={12} />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="font-medium whitespace-nowrap">
                  TK {(item.price * item.quantity).toFixed(2)}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:bg-destructive/10 hover:text-destructive h-7 px-2 text-xs"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>

      <div className="mt-auto pt-4">
        <div className="mb-4 flex justify-between border-t pt-4 text-lg font-bold">
          <span>Subtotal:</span>
          <span>TK {calculateTotal().toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <SheetClose className="flex-1" asChild>
            <Button asChild variant="outline">
              <Link href="/products">Continue Shopping </Link>
            </Button>
          </SheetClose>
          <SheetClose className="flex-1" asChild>
            <Button asChild>
              <Link href="/cart">View Cart</Link>
            </Button>
          </SheetClose>
        </div>
        <SheetClose asChild>
          <Button asChild className="mt-3 w-full" variant="default">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </SheetClose>
      </div>
    </div>
  );
}
