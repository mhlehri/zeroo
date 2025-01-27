"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";

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
