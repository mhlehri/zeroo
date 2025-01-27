"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";

//? This function fetches products from the server
export async function getProducts({
  searchTerm = "",
  limit = 10,
}: {
  searchTerm?: string;
  limit?: number;
}) {
  try {
    const { data } = await ax.get(`/products`, {
      params: { searchTerm, limit },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function getProducts({
  searchTerm = "",
  limit = 10,
}: {
  searchTerm?: string;
  limit?: number;
}) {
  try {
    const { data } = await ax.get(`/products`, {
      params: { searchTerm, limit },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
