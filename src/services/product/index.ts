// "use server";
import ax from "@/lib/axios-instance";
import axios from "axios";

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

export async function getProductByName() {
  try {
    const { data } = await ax.get(`/products`, {
      params: { name },
    });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
