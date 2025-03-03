"use client";
import { deleteUser } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
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
export default function UserDeleteModal({
  name,
  id,
  children,
}: {
  name: string;
  id: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: removeUser, isPending } = useMutation({
    mutationKey: ["users"],
    mutationFn: async (id: string) => {
      const res = await deleteUser(id);
      return res;
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data?.message, { richColors: true });

        // ✅ Revalidate "products" after deletion
        queryClient.invalidateQueries({ queryKey: ["users"] });

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
            onClick={() => removeUser(id)}
            variant="destructive"
          >
            <Trash /> {isPending ? "Deleting..." : "Delete"}
          </Button>
          <DialogClose>
            <Button className="bg-blue-500 hover:bg-blue-600">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
