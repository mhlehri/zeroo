"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { deleteProduct } from "@/services/product";
import { toast } from "sonner";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProductPublishModal({
  name,
  id,
  children,
  isPublished,
}: {
  name: string;
  id: string;
  children: React.ReactNode;
  isPublished: string;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: deleteP, isPending } = useMutation({
    mutationKey: ["products"], // Tracks mutation
    mutationFn: async (id: string) => {
      const res = await deleteProduct(id);
      return res;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message, { richColors: true });

        // ✅ Revalidate "products" after deletion
        queryClient.invalidateQueries({ queryKey: ["products"] });

        setOpen(false); // Close modal on success
      } else {
        toast.error(data?.message, { richColors: true });
      }
    },
    onError: (error) => {
      toast.error("Failed to delete product. Try again.", { richColors: true });
      console.error("Delete error:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="roundeddd-sm hover:bg-primary-100 hover:text-primary-900 relative w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left text-sm outline-hidden transition-colors select-none dark:focus:bg-slate-800 dark:focus:text-slate-50">
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[500px] overflow-y-auto xl:max-h-full">
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to delete &quot;{name}&quot;?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            product.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={isPending}
            onClick={() => deleteP(id)} // Only call deleteP here
            variant={isPublished === "true" ? "destructive" : "default"}
          >
            {isPublished === "true" ? "Unpublish" : "Publish"}
          </Button>
          <DialogClose>
            <Button className="bg-blue-500 hover:bg-blue-600">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
