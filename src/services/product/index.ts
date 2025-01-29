"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { FieldValues } from "react-hook-form";

//? This function fetches products from the server
export async function getProducts({
  searchTerm = "",
  limit = 10,
  sortOrder = "",
  category = "",
}: {
  searchTerm?: string;
  limit?: number;
  sortOrder?: string;
  category?: string;
}) {
  try {
    const { data } = await ax.get(`/products`, {
      params: { searchTerm, limit, sortOrder, category },
    });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function getProductById(id: string) {
  try {
    const { data } = await ax.get(`/products/${id}`);
    return data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function addProduct(formData: FieldValues) {
  try {
    const { data } = await ax.post(`/products`, formData);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function deleteProduct(id: string) {
  try {
    const { data } = await ax.delete(`/products/${id}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
