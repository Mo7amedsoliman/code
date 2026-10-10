"use client";

import { FormEvent, useState } from "react";
import { IconUser, IconDeviceFloppy } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/store/Store";
import { authActions } from "@/features/auth/slices/auth.slices";
import { updateProfile } from "../services/profile.actions";
import FormSkeleton from "./FormSkeleton";

const inputClass = "mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

export default function ProfileSettings() {
  const userInfo = useSelector((state: RootState) => state.AuthReducer.userInfo);
  const dispatch = useDispatch();
  const [name, setName] = useState(userInfo?.name ?? "");
  const [email, setEmail] = useState(userInfo?.email ?? "");
  const [phone, setPhone] = useState(userInfo?.phone ?? "");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Name, email, and phone number are required.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await updateProfile({ name: name.trim(), email: email.trim(), phone: phone.trim() });
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      dispatch(
        authActions.setAuthStates({
          isAuthenticated: true,
          userInfo: {
            ...userInfo,
            name: result.user?.name ?? name.trim(),
            email: result.user?.email ?? email.trim(),
            phone: result.user?.phone ?? phone.trim(),
          },
        }),
      );
      toast.success(result.message);
    } catch {
      toast.error("Could not update your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <form onSubmit={handleSubmit}>
        {isSaving ? (
          <div className="p-5 sm:p-6" aria-busy="true">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-green-100 text-green-700"><IconUser size={20} /></span>
              <div><h3 className="text-sm font-bold text-slate-900">Saving Profile</h3><p className="text-xs text-slate-500">Please wait while your details are updated</p></div>
            </div>
            <FormSkeleton rows={3} />
          </div>
        ) : <div className="p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-green-100 text-green-700"><IconUser size={20} /></span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Profile Information</h3>
              <p className="text-xs text-slate-500">Update your personal details</p>
            </div>
          </div>
          <div className="space-y-3.5">
            <label className="block text-xs font-medium text-slate-700">Full Name<input className={inputClass} value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required /></label>
            <label className="block text-xs font-medium text-slate-700">Email Address<input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required /></label>
            <label className="block text-xs font-medium text-slate-700">Phone Number<input className={inputClass} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" placeholder="01xxxxxxxxx" required /></label>
          </div>
          <button type="submit" disabled={isSaving} className="mt-4 inline-flex h-10 items-center gap-2 rounded-lg bg-green-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60">
            <IconDeviceFloppy size={16} />{isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>}
        <div className="border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
          <h4 className="mb-3 text-xs font-bold text-slate-800">Account Information</h4>
          <div className="flex items-center justify-between py-1 text-xs"><span className="text-slate-500">User ID</span><span className="max-w-[65%] truncate text-slate-600">{userInfo?.id ?? "—"}</span></div>
          <div className="flex items-center justify-between py-1 text-xs"><span className="text-slate-500">Role</span><span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-medium capitalize text-green-700">{userInfo?.role ?? "User"}</span></div>
        </div>
      </form>
    </section>
  );
}
