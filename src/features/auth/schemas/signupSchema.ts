import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[A-Z]/, {
        error: "Password must contain at least one uppercase letter ",
      })
      .regex(/[a-z]/, {
        error: "Password must contain at least one lowercase letter ",
      })
      .regex(/[0-9]/, { error: "Password must contain at least one number " })
      .regex(/[!@#$%^&*]/, {
        error: "Password must contain at least one special character ",
      }),
    rePassword: z.string().min(1, "Please confirm your password"),
    phone: z.string().regex(/^01[0125][0-9]{8}$/, {
      error: "Phone number must be a valid Egyptian phone number",
    }),
    terms: z.boolean(),
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      path: ["rePassword"],
      error: "Password and confirm password must match",
    },
  )
  .refine((data) => data.terms, {
    path: ["terms"],
    error: "You must accept the terms and conditions",
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
