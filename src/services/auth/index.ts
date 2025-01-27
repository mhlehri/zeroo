"use server";
import ax from "@/lib/axios-instance";
import axios from "axios";
import { FieldValues } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export async function loginAction(formData: FieldValues) {
  try {
    const { data } = await ax.post("/auth/login", formData);
    console.log(data);
    if (data.success) {
      const cookieStore = await cookies();
      cookieStore.set("user-token", data.token);
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}
export async function signupAction(formData: FieldValues) {
  try {
    console.log(formData, "signup action formData");
    const { data } = await ax.post("/auth/signup", formData);
    console.log(data, "signup action");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("user-token")?.value;
    if (!token) {
      return null;
    }
    const decoded = jwtDecode(token);
    console.log(decoded, "decoded");
    return decoded;
  } catch (error) {
    return error;
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("user-token");
}
