"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getTags = async () => {
  try {
    const { data } = await ax.get(`/inventory/tag`);
    console.log(data, "tags from inventory service");
    return data?.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
export const getSizes = async () => {
  try {
    const { data } = await ax.get(`/inventory/size`);
    console.log(data, "tags from inventory service");
    return data?.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};

export async function addTag(formData: FieldValues) {
  try {
    const { data } = await ax.put(`/inventory/tag`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function addSize(formData: FieldValues) {
  try {
    const { data } = await ax.put(`/inventory/size`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function deleteSize(formData: FieldValues) {
  try {
    const { data } = await ax.delete(`/inventory/size`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
