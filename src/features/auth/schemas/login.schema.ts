import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Invalid email" })),
  password: z
    .string()
    .min(1, { error: "Password is required" })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[!@#$%^&*]/, {
      error: "Password must contain at least one special character",
    }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
