"use server";

import apiClient from "@/services/apiCliente";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { PasswordFields, ProfileActionResult, ProfileFields } from "../types/profile.types";

async function getAuthHeaders() {
  const token = (await cookies()).get("token")?.value;
  if (!token) throw new Error("Please sign in to update your account.");
  return { token };
}

function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof AxiosError) {
    const data = error.response?.data;
    return data?.errors?.[0]?.msg ?? data?.message ?? fallback;
  }
  return error instanceof Error ? error.message : fallback;
}

export async function updateProfile(values: ProfileFields): Promise<ProfileActionResult> {
  try {
    const { data } = await apiClient.put("/users/updateMe/", values, {
      headers: await getAuthHeaders(),
    });
    const updatedUser = data?.user ?? data?.data?.user;
    return {
      success: true,
      message: data?.message ?? "Profile updated successfully.",
      user: updatedUser
        ? {
            name: updatedUser.name,
            email: updatedUser.email,
            phone: updatedUser.phone,
          }
        : values,
    };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Could not update your profile. Please try again."),
    };
  }
}

export async function changePassword(values: PasswordFields): Promise<ProfileActionResult> {
  try {
    const { data } = await apiClient.put("/users/changeMyPassword", values, {
      headers: await getAuthHeaders(),
    });
    return { success: true, message: data?.message ?? "Password changed successfully." };
  } catch (error) {
    return {
      success: false,
      message: getErrorMessage(error, "Could not change your password. Please try again."),
    };
  }
}
