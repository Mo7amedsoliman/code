"use client";

import { IconMapPin, IconSettings } from "@tabler/icons-react";

type ProfileSidebarProps = {
  activeTab: "settings" | "addresses";
  onChange: (tab: "settings" | "addresses") => void;
};

export default function ProfileSidebar({ activeTab, onChange }: ProfileSidebarProps) {
  return (
    <aside className="h-fit overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-4 py-3 text-sm font-semibold text-slate-800">
        My Account
      </div>
      <nav className="space-y-1 p-2" aria-label="Account navigation">
        <button
          type="button"
          onClick={() => onChange("addresses")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
            activeTab === "addresses"
              ? "bg-green-50 font-semibold text-green-700 ring-2 ring-slate-900"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <IconMapPin size={18} />
          My Addresses
        </button>
        <button
          type="button"
          onClick={() => onChange("settings")}
          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
            activeTab === "settings"
              ? "bg-green-50 font-semibold text-green-700 ring-2 ring-slate-900"
              : "text-slate-600 hover:bg-slate-50"
          }`}
        >
          <IconSettings size={18} />
          Settings
        </button>
      </nav>
    </aside>
  );
}
