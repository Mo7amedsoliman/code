"use client";
import { IconUserPlus } from "@tabler/icons-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormValues, signupSchema } from "../../schemas/signupSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupAction } from "@/features/auth/services/signup.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  // type signupFormValues = {
  //   name: string;
  //   email: string;
  //   password: string;
  //   rePassword: string;
  //   phone: string;
  //   terms: boolean;
  // };

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms: false,
    },
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupFormValues> = async function (values) {
    const response = await signupAction(values);
    if (response.success) {
      toast.success(response.message);
      router.push("/login");
    }

    if (response.success === false) {
      if (response.fieldErrors) {
        for (const [field, message] of Object.entries(response.fieldErrors)) {
          setError(field as keyof SignupFormValues, { message: message[0] });
        }
      }
      setError("root", { message: response.message });
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg px-6 py-10">
        <div className="mb-10">
          <h2 className="text-center text-3xl font-semibold mb-2">
            Create Your Account
          </h2>
          <p className="text-center">Start your fresh journey with us today</p>
        </div>

        <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ali"
              id="name"
              {...register("name")}
            />
            {errors.name && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.name.message}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              className="form-control"
              placeholder="ali@example.com"
              id="email"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.email.message}</p>
              </div>
            )}
          </div>

          <div className="flex bg-light flex-col gap-2">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="create a strong password"
              autoComplete="off"
              id="password"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.password.message}</p>
              </div>
            )}
            <div className="password-requirements">
              <div className="flex items-center gap-2">
                <div className="bar grow h-1 bg-gray-200 rounded-md overflow-hidden">
                  <div className={`progress bg-orange-500 w-50 h-full`}></div>
                </div>
                <span>Fair</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="rePassword">Confirm Password*</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm your password"
              autoComplete="off"
              id="rePassword"
              {...register("rePassword")}
            />
            {errors.rePassword && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.rePassword.message}</p>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+1 234 567 8900"
              id="phone"
              {...register("phone")}
            />
            {errors.phone && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.phone.message}</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="terms"
                className="size-4 accent-primary-600"
                {...register("terms")}
              />

              <label htmlFor="terms" className="ms-2">
                I agree to the{" "}
                <Link href={`/terms`} className="text-primary-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href={`/privacy-policy`} className="text-primary-600">
                  Privacy Policy
                </Link>{" "}
                *
              </label>
            </div>
            {errors.terms && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.terms.message}</p>
              </div>
            )}
            {errors.root && (
              <div className="text-red-800 text-sm font-semibold px-1 py-2 bg-red-100 rounded-md mt-1">
                <p>* {errors.root.message}</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn flex gap-2 justify-center bg-primary-600 text-white hover:bg-primary-700 cursor-pointer disabled:cursor-not-allowed w-full"
          >
            <IconUserPlus stroke={2} />

            <span>Create My Account</span>
          </button>
        </form>

        <p className="border-t pt-10 border-gray-300/30 my-4 text-center">
          Already have an account?{" "}
          <Link href={`/login`} className="text-primary-600">
            Sign In
          </Link>
        </p>
      </div>
    </>
  );
}
