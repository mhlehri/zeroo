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
