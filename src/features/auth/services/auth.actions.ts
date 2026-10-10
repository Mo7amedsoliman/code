"use server";
import apiClient from "@/services/apiCliente";
import { AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { AuthState } from "../slices/auth.slices";

export async function setToken(token: string) {
  const normalizedToken = token.trim();
  if (!normalizedToken) {
    throw new Error("Cannot save an empty authentication token.");
  }

  const cookieStore = await cookies();
  cookieStore.set("token", normalizedToken, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token") || null;

  return token;
}

export async function deleteToken() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: "token", path: "/" });
}

export async function VerifyToken(): Promise<AuthState> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token") || null;

  if (!token) {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
  try {
    const options: AxiosRequestConfig = {
      url: "/auth/verifyToken",
      method: "GET",
      headers: {
        token: token.value,
      },
    };

    const { data } = await apiClient.request(options);
    const verifiedUser = data?.decoded;

    // The API's verification message has varied in spelling/whitespace. The
    // decoded identity is the actual proof that the token was accepted.
    if (
      verifiedUser &&
      typeof verifiedUser.name === "string" &&
      typeof verifiedUser.role === "string"
    ) {
      return {
        isAuthenticated: true,
        userInfo: {
          name: verifiedUser.name,
          role: verifiedUser.role,
          id:
            typeof verifiedUser.id === "string"
              ? verifiedUser.id
              : typeof verifiedUser._id === "string"
                ? verifiedUser._id
                : typeof verifiedUser.userId === "string"
                  ? verifiedUser.userId
                  : undefined,
          email: typeof verifiedUser.email === "string" ? verifiedUser.email : undefined,
          phone: typeof verifiedUser.phone === "string" ? verifiedUser.phone : undefined,
        },
      };
    }
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  } catch {
    return {
      isAuthenticated: false,
      userInfo: null,
    };
  }
}
