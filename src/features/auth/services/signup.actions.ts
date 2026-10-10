"use server";

import z from "zod";
import { SignupFormValues, signupSchema } from "../schemas/signupSchema";
import { AxiosRequestConfig, isAxiosError } from "axios";
import apiClient from "@/services/apiCliente";

export type SignupActionReturn =
  | { success: true; message: string }
  | { success: false; message: string; fieldErrors?: signupFieldErrors };
type signupFieldErrors = Partial<Record<keyof SignupFormValues, string[]>>;

export async function signupAction(
  values: SignupFormValues,
): Promise<SignupActionReturn> {
  const validationResult = signupSchema.safeParse(values);

  if (validationResult.success === false) {
    const { formErrors, fieldErrors } = z.flattenError(validationResult.error);

    return {
      success: false,
      fieldErrors,
      message: formErrors[0],
    };
  }

  try {
    const requestBody = Object.fromEntries(
      Object.entries(validationResult.data).filter(([key]) => key !== "terms"),
    );

    const options: AxiosRequestConfig = {
      url: "/auth/signup",
      method: "POST",
      data: requestBody,
    };

    await apiClient.request(options);
    return {
      success: true,
      message: "Account Created Successfully",
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
