"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { IconBuilding, IconMapPin, IconPhone, IconPlus, IconTrash, IconX } from "@tabler/icons-react";
import { toast } from "sonner";
import { addAddress, getMyAddresses, removeAddress } from "../services/address.actions";
import { AddressFields, ShippingAddress } from "../types/address.types";

const emptyAddress: AddressFields = { name: "", details: "", phone: "", city: "" };

export default function AddressBook() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<AddressFields>(emptyAddress);
  const [loadError, setLoadError] = useState("");

  const loadAddresses = useCallback(async () => {
    setIsLoading(true);
    const result = await getMyAddresses();
    setIsLoading(false);
    if (!result.success) {
      setLoadError(result.message);
      return;
    }
    setLoadError("");
    setAddresses(result.addresses ?? []);
  }, []);

  useEffect(() => {
    let isActive = true;
    void getMyAddresses().then((result) => {
      if (!isActive) return;
      setIsLoading(false);
      if (!result.success) {
        setLoadError(result.message);
        return;
      }
      setLoadError("");
      setAddresses(result.addresses ?? []);
    });
    return () => { isActive = false; };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    const result = await addAddress({
      name: values.name.trim(),
      details: values.details.trim(),
      phone: values.phone.trim(),
      city: values.city.trim(),
    });
    setIsSaving(false);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    setValues(emptyAddress);
    setShowForm(false);
    await loadAddresses();
  }

  async function handleRemove(address: ShippingAddress) {
    if (!window.confirm(`Remove the ${address.name || "selected"} address?`)) return;
    setRemovingId(address._id);
    const result = await removeAddress(address._id);
    setRemovingId(null);
    if (!result.success) {
      toast.error(result.message);
      return;
    }
    setAddresses((current) => current.filter((item) => item._id !== address._id));
    toast.success(result.message);
  }

  const inputClass = "mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><h2 className="text-base font-bold text-slate-900">My Addresses</h2><p className="mt-1 text-xs text-slate-500">Save delivery addresses to use at checkout</p></div>
        <button type="button" onClick={() => setShowForm((current) => !current)} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-green-600 px-3 text-xs font-semibold text-white transition hover:bg-green-700">
          {showForm ? <IconX size={15} /> : <IconPlus size={15} />}{showForm ? "Cancel" : "Add Address"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-5 rounded-xl border border-green-100 bg-green-50/50 p-4">
          <h3 className="mb-4 text-sm font-semibold text-slate-800">New Delivery Address</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-xs font-medium text-slate-700">Address Name<input className={inputClass} value={values.name} onChange={(event) => setValues((current) => ({ ...current, name: event.target.value }))} placeholder="Home, Work..." required /></label>
            <label className="text-xs font-medium text-slate-700">City<input className={inputClass} value={values.city} onChange={(event) => setValues((current) => ({ ...current, city: event.target.value }))} placeholder="Cairo" required /></label>
            <label className="text-xs font-medium text-slate-700 sm:col-span-2">Street Address<textarea className={`${inputClass} h-auto min-h-16 resize-y py-2.5`} value={values.details} onChange={(event) => setValues((current) => ({ ...current, details: event.target.value }))} placeholder="Street, building, floor, apartment..." required rows={2} /></label>
            <label className="text-xs font-medium text-slate-700">Phone Number<input className={inputClass} type="tel" pattern="01[0125][0-9]{8}" title="Enter a valid Egyptian mobile number" value={values.phone} onChange={(event) => setValues((current) => ({ ...current, phone: event.target.value }))} placeholder="01xxxxxxxxx" required /></label>
          </div>
          <button type="submit" disabled={isSaving} className="mt-4 inline-flex h-9 items-center gap-2 rounded-lg bg-green-600 px-4 text-xs font-semibold text-white hover:bg-green-700 disabled:opacity-60">{isSaving ? "Saving..." : "Save Address"}</button>
        </form>
      )}

      {loadError && <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-xs text-red-700"><span>{loadError}</span><button type="button" onClick={() => void loadAddresses()} className="font-semibold underline">Try again</button></div>}

      {isLoading ? (
        <div className="mt-5 space-y-3" aria-label="Loading addresses" role="status"><span className="sr-only">Loading addresses</span>{[0, 1].map((item) => <div key={item} className="animate-pulse rounded-xl border border-slate-100 p-4"><div className="h-4 w-28 rounded bg-slate-100" /><div className="mt-3 h-3 w-2/3 rounded bg-slate-100" /><div className="mt-2 h-3 w-1/3 rounded bg-slate-100" /></div>)}</div>
      ) : addresses.length > 0 ? (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <article key={address._id} className="relative rounded-xl border border-slate-200 p-4 transition hover:border-green-200 hover:shadow-sm">
              <div className="flex items-start justify-between gap-3"><h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900"><IconBuilding size={16} className="text-green-600" />{address.name || "Delivery Address"}</h3><button type="button" aria-label={`Remove ${address.name} address`} disabled={removingId === address._id} onClick={() => void handleRemove(address)} className="grid size-8 shrink-0 place-items-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"><IconTrash size={15} /></button></div>
              <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-600"><IconMapPin size={15} className="mt-0.5 shrink-0 text-slate-400" />{address.details}, {address.city}</p>
              <p className="mt-2 flex items-center gap-2 text-xs text-slate-600"><IconPhone size={14} className="text-slate-400" />{address.phone}</p>
            </article>
          ))}
        </div>
      ) : !loadError ? (
        <div className="mt-5 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center"><span className="mx-auto grid size-11 place-items-center rounded-full bg-green-50 text-green-600"><IconMapPin size={21} /></span><p className="mt-3 text-sm font-semibold text-slate-800">No saved addresses yet</p><p className="mt-1 text-xs text-slate-500">Add an address to make checkout faster.</p><button type="button" onClick={() => setShowForm(true)} className="mt-3 text-xs font-semibold text-green-700 hover:underline">Add your first address</button></div>
      ) : null}
    </section>
  );
}
