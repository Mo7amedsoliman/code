"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IconAddressBook, IconChevronDown, IconHeart, IconLogout, IconPackage, IconSettings, IconUser, IconUserCircle } from "@tabler/icons-react";

export default function AccountDropdown({ userName, onLogout }: { userName: string; onLogout: () => void | Promise<void> }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handlePointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setIsOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);
  const itemClass = "flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs text-slate-600 transition hover:bg-slate-50 hover:text-green-700";

  return (
    <div ref={menuRef} className="relative">
      <button type="button" aria-label="Account menu" aria-haspopup="menu" aria-expanded={isOpen} onClick={() => setIsOpen((current) => !current)} className={`grid size-10 place-items-center rounded-full text-slate-600 transition hover:bg-green-50 hover:text-green-700 ${isOpen ? "bg-green-50 text-green-700" : ""}`}>
        <IconUserCircle size={22} stroke={1.7} />
      </button>
      {isOpen && (
        <div role="menu" className="absolute right-0 top-full z-[60] mt-2 w-56 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl shadow-slate-900/10">
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3.5">
            <span className="grid size-9 place-items-center rounded-full bg-green-50 text-green-600"><IconUser size={18} /></span>
            <span className="min-w-0 truncate text-xs font-semibold text-slate-800">{userName || "My Account"}</span>
            <IconChevronDown size={14} className="ml-auto shrink-0 rotate-180 text-slate-400" />
          </div>
          <nav aria-label="Account menu links" className="py-1.5">
            <Link role="menuitem" href="/profile#settings" onClick={closeMenu} className={itemClass}><IconUser size={15} className="text-slate-400" />My Profile</Link>
            <Link role="menuitem" href="/orders" onClick={closeMenu} className={itemClass}><IconPackage size={15} className="text-slate-400" />My Orders</Link>
            <Link role="menuitem" href="/wishlist" onClick={closeMenu} className={itemClass}><IconHeart size={15} className="text-slate-400" />My Wishlist</Link>
            <Link role="menuitem" href="/profile#addresses" onClick={closeMenu} className={itemClass}><IconAddressBook size={15} className="text-slate-400" />Addresses</Link>
            <Link role="menuitem" href="/profile#settings" onClick={closeMenu} className={itemClass}><IconSettings size={15} className="text-slate-400" />Settings</Link>
          </nav>
          <div className="border-t border-slate-100 py-1.5">
            <button role="menuitem" type="button" onClick={() => { closeMenu(); void onLogout(); }} className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs text-red-500 transition hover:bg-red-50"><IconLogout size={15} />Sign Out</button>
          </div>
        </div>
      )}
    </div>
  );
}
