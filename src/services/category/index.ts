"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getCategories = async () => {
  try {
    const { data } = await ax.get(`/category`);
    console.log(data, "categories");
    return data?.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
};
export async function getCategoryById(id: string) {
  try {
    const { data } = await ax.get(`/category/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function addCategory(formData: FieldValues) {
  try {
    const { data } = await ax.post(`/category`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function addSubCategory(formData: FieldValues) {
  try {
    const { data } = await ax.post(`/category/sub-categories`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function updateCategory({
  id,
  formData,
}: {
  id: string;
  formData: FieldValues;
}) {
  try {
    const { data } = await ax.put(`/category/${id}`, formData);
    revalidatePath("/");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function deleteCategory(id: string) {
  try {
    const { data } = await ax.delete(`/category/${id}`);
    revalidatePath("/");
    revalidatePath("/navbar");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
