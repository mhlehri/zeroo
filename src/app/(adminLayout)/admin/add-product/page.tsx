"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  name: z
    .string({
      message: "Name is required",
    })
    .min(3, "Name must be at least 3 characters long"),
  roomNo: z
    .number({
      message: "Room number is required",
    })
    .min(1, "Room number is required"),
  floorNo: z
    .number({
      message: "Floor number is required",
    })
    .min(1, "Floor number is required"),
  capacity: z
    .number({
      message: "Capacity is required",
    })
    .min(1, "Capacity is required"),
  pricePerSlot: z
    .number({
      message: "Price per slot is required",
    })
    .min(1, "Price per slot  is required")
    .nonnegative("Price per slot must be a non-negative number"),
  amenities: z.string({
    message: "Amenities are required",
  }),
  images: z.array(
    z
      .string({
        message: "At least one image URL is required",
      })
      .optional()
  ),
});

type FormData = z.infer<typeof formSchema>;

export default function AddProductPage() {
  const [amenities, setAmenities] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // const [addRoom] = useAddRoomMutation();
  const addRoom = async (data: FormData) => {
    // const res = await addRoomMutation(data);
    // return res;
    return { data: { success: true } };
  };

  const onSubmit = async (data: FormData) => {
    const d = { ...data, amenities };
    // console.log(d);
    const res = await addRoom(d);
    // @ts-expect-error - error is not null
    if ((res?.error?.data as Error)?.message.includes("E11000 duplicate key")) {
      toast.error("Room already exists. Please add a different roomNo.");
      return;
    } else if (res.error) {
      toast.error("Failed to add room. Please try again");
    } else if (res?.data?.success) {
      toast.success("Room added successfully", {
        richColors: true,
      });
      // console.log(res.data);
      reset(); // Reset the form after successful submission
    }
  };

  const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amenitiesList = e.target.value.split(",").map((item) => item.trim());
    setAmenities(amenitiesList);
  };
  return (
    <div>
      <div className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-2xl text-center text-indigo-500 font-bold uppercase underline">
            Create New Room
          </h2>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="roomNo">Room Number</Label>
            <Input
              id="roomNo"
              type="number"
              {...register("roomNo", { valueAsNumber: true })}
            />
            {errors.roomNo && (
              <p className="text-red-500">{errors.roomNo.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="floorNo">Floor Number</Label>
            <Input
              id="floorNo"
              type="number"
              {...register("floorNo", { valueAsNumber: true })}
            />
            {errors.floorNo && (
              <p className="text-red-500">{errors.floorNo.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input
              id="capacity"
              type="number"
              {...register("capacity", { valueAsNumber: true })}
            />
            {errors.capacity && (
              <p className="text-red-500">{errors.capacity.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="pricePerSlot">Price Per Slot</Label>
            <Input
              id="pricePerSlot"
              type="number"
              step="0.01"
              {...register("pricePerSlot", { valueAsNumber: true })}
            />
            {errors.pricePerSlot && (
              <p className="text-red-500">{errors.pricePerSlot.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="amenities">Amenities (comma-separated)</Label>
            <Input
              id="amenities"
              {...register("amenities")}
              onChange={handleAmenitiesChange}
            />
            {errors.amenities && (
              <p className="text-red-500">{errors.amenities.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="image1">Image URL 1 (Required)</Label>
            <Input id="image1" {...register("images.0")} />
            {errors.images?.[0]?.message && (
              <p className="text-red-500">{errors.images[0]?.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="image2">Image URL 2 (Optional)</Label>
            <Input id="image2" {...register("images.1")} />
          </div>
          <div>
            <Label htmlFor="image3">Image URL 3 (Optional)</Label>
            <Input id="image3" {...register("images.2")} />
          </div>
          <Button disabled={isSubmitting} type="submit" className="w-full">
            {isSubmitting ? "submitting.." : "Add"}
          </Button>
        </form>
      </div>
    </div>
  );
}
