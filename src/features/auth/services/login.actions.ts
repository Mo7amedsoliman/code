"use server";

import z from "zod";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import apiClient from "@/services/apiCliente";

type LoginResponse = {
  message: string;
  user: {
    name: string;
    role: string;
    email: string;
    phone?: string;
    _id?: string;
    id?: string;
  };
  token: string;
};

export type LoginActionReturn =
  | { success: true; message: string; data: LoginResponse }
  | { success: false; message: string; fieldErrors?: loginFieldErrors };
type loginFieldErrors = Partial<Record<keyof LoginFormValues, string[]>>;

export async function loginAction(
  values: LoginFormValues,
): Promise<LoginActionReturn> {
  const validationResult = loginSchema.safeParse(values);

  if (validationResult.success === false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      fieldErrors,
      message: formErrors[0],
    };
  }

  try {
    const options: AxiosRequestConfig = {
      url: "/auth/signin",
      method: "POST",
      data: validationResult.data,
    };

    const { data } = await apiClient.request(options);
    return {
      success: true,
      message: "Login Successful",
      data: data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data.message ??
          "Can not reach server. try agin later",
      };
    }

    return {
      success: false,
      message: "somthing went wrong",
    };
  }
}
