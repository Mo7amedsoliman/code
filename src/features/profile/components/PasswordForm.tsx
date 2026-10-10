"use client";

import { FormEvent, useState } from "react";
import { IconEye, IconEyeOff, IconLock } from "@tabler/icons-react";
import { toast } from "sonner";
import { changePassword } from "../services/profile.actions";
import FormSkeleton from "./FormSkeleton";

const fields = [
  { name: "currentPassword", label: "Current Password", placeholder: "Enter your current password" },
  { name: "password", label: "New Password", placeholder: "Enter your new password" },
  { name: "rePassword", label: "Confirm New Password", placeholder: "Confirm your new password" },
] as const;
type PasswordField = (typeof fields)[number]["name"];

export default function PasswordForm() {
  const [values, setValues] = useState<Record<PasswordField, string>>({ currentPassword: "", password: "", rePassword: "" });
  const [visible, setVisible] = useState<Record<PasswordField, boolean>>({ currentPassword: false, password: false, rePassword: false });
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (values.password.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (values.password !== values.rePassword) {
      toast.error("The new passwords do not match.");
      return;
    }
    setIsSaving(true);
    try {
      const result = await changePassword(values);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      setValues({ currentPassword: "", password: "", rePassword: "" });
      toast.success(result.message);
    } catch {
      toast.error("Could not change your password. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-lg bg-amber-100 text-amber-700"><IconLock size={19} /></span>
        <div><h3 className="text-sm font-bold text-slate-900">Change Password</h3><p className="text-xs text-slate-500">Update your account password</p></div>
      </div>
      {isSaving ? (
        <div aria-busy="true">
          <p className="mb-4 text-xs text-slate-500">Updating your password. Please wait.</p>
          <FormSkeleton rows={3} tone="amber" />
        </div>
      ) : <form onSubmit={handleSubmit} className="space-y-3.5">
        {fields.map((field) => (
          <label key={field.name} className="block text-xs font-medium text-slate-700">
            {field.label}
            <span className="relative mt-1.5 block">
              <input className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100" type={visible[field.name] ? "text" : "password"} value={values[field.name]} onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))} placeholder={field.placeholder} autoComplete={field.name === "currentPassword" ? "current-password" : "new-password"} required minLength={field.name === "currentPassword" ? undefined : 6} />
              <button type="button" aria-label={visible[field.name] ? "Hide password" : "Show password"} onClick={() => setVisible((current) => ({ ...current, [field.name]: !current[field.name] }))} className="absolute inset-y-0 right-2 grid w-7 place-items-center text-slate-400 hover:text-slate-700">{visible[field.name] ? <IconEyeOff size={16} /> : <IconEye size={16} />}</button>
            </span>
            {field.name === "password" && <span className="mt-1 text-[10px] font-normal text-slate-400">Must be at least 6 characters</span>}
          </label>
        ))}
        <button type="submit" disabled={isSaving} className="inline-flex h-10 items-center gap-2 rounded-lg bg-amber-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60">
          <IconLock size={15} />{isSaving ? "Updating..." : "Change Password"}
        </button>
      </form>}
    </section>
  );
}
