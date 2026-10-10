"use client";

import { useEffect, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import Link from "next/link";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileSettings from "../components/ProfileSettings";
import PasswordForm from "../components/PasswordForm";
import AddressBook from "@/features/addresses/components/AddressBook";

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<"settings" | "addresses">("settings");

  useEffect(() => {
    const syncTabWithUrl = () => {
      const tab = window.location.hash.slice(1) || new URLSearchParams(window.location.search).get("tab");
      setActiveTab(tab === "addresses" ? "addresses" : "settings");
    };
    syncTabWithUrl();
    window.addEventListener("hashchange", syncTabWithUrl);
    return () => window.removeEventListener("hashchange", syncTabWithUrl);
  }, []);

  return (
    <main className="min-h-[70vh] bg-slate-50/70">
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-3 flex items-center gap-2 text-xs text-green-50/90">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span><span>My Account</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-xl bg-white/20 shadow-inner"><IconUser size={24} /></span>
            <div><h1 className="text-xl font-bold">My Account</h1><p className="mt-0.5 text-xs text-green-50">Manage your addresses and account settings</p></div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-7 lg:px-8">
        <ProfileSidebar activeTab={activeTab} onChange={setActiveTab} />
        <div className="min-w-0">
          {activeTab === "settings" ? (
            <>
              <div className="mb-4">
                <h2 className="text-base font-bold text-slate-900">Account Settings</h2>
                <p className="text-xs text-slate-500">Update your profile information and change your password</p>
              </div>
              <div className="space-y-4">
                <ProfileSettings />
                <PasswordForm />
              </div>
            </>
          ) : (
            <AddressBook />
          )}
        </div>
      </div>
    </main>
  );
}
