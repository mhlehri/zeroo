"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { FieldValues } from "react-hook-form";

export async function getCategories() {
  try {
    const { data } = await ax.get(`/category`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
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
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
