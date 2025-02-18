"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export async function addOrder(formData: FieldValues) {
  try {
    const { data } = await ax.post(`/orders`, formData);
    revalidatePath("/orders");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
export async function getMyOrders() {
  try {
    const { data } = await ax.get(`/orders/my-orders`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
export async function getOrders({ today = "" }: { today?: string }) {
  try {
    const { data } = await ax.get(`/orders`, {
      params: {
        today: today,
      },
    });
    // console.log(data, "data");
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
export async function deleteOrder(id: string) {
  try {
    const { data } = await ax.delete(`/orders/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
export async function updateOrder({
  id,
  formData,
}: {
  id: string;
  formData: FieldValues;
}) {
  try {
    const { data } = await ax.put(`/orders/${id}`, formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
