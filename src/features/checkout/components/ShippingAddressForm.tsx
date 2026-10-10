"use client";

import { FormEvent, useEffect, useState } from "react";
import { IconBuilding, IconInfoCircle, IconMapPin, IconPhone } from "@tabler/icons-react";
import CheckoutPanel from "./CheckoutPanel";
import { ShippingAddress } from "../types/checkout.types";
import { getMyAddresses } from "@/features/addresses/services/address.actions";
import { ShippingAddress as SavedAddress } from "@/features/addresses/types/address.types";

export default function ShippingAddressForm({
  defaultPhone,
  onSubmit,
}: {
  defaultPhone: string;
  onSubmit: (address: ShippingAddress) => void;
}) {
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [phone, setPhone] = useState(defaultPhone);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    let isActive = true;
    void getMyAddresses().then((result) => {
      if (isActive && result.success) setSavedAddresses(result.addresses ?? []);
    });
    return () => { isActive = false; };
  }, []);

  function selectSavedAddress(addressId: string) {
    setSelectedAddressId(addressId);
    const address = savedAddresses.find((item) => item._id === addressId);
    if (!address) {
      setCity("");
      setDetails("");
      setPhone(defaultPhone);
      return;
    }
    setCity(address.city);
    setDetails(address.details);
    setPhone(address.phone);
  }
  const inputClass = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-2 focus:ring-green-100";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit({ city: city.trim(), details: details.trim(), phone: phone.trim() });
  }

  return (
    <CheckoutPanel title="Shipping Address" subtitle="Where should we deliver your order?" icon={<IconMapPin size={16} fill="currentColor" />}>
      <div className="mb-4 flex gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2.5 text-blue-700">
        <IconInfoCircle size={17} className="mt-0.5 shrink-0" />
        <div><p className="text-xs font-semibold">Delivery Information</p><p className="mt-0.5 text-[10px] leading-4">Please ensure your address is accurate for smooth delivery</p></div>
      </div>
      {savedAddresses.length > 0 && (
        <label className="mb-4 block text-xs font-medium text-slate-700">Use a saved address
          <select className={`${inputClass} mt-1.5`} value={selectedAddressId} onChange={(event) => selectSavedAddress(event.target.value)}>
            <option value="">Enter a new delivery address</option>
            {savedAddresses.map((address) => <option key={address._id} value={address._id}>{address.name} — {address.city}</option>)}
          </select>
        </label>
      )}
      <form id="checkout-form" onSubmit={handleSubmit} className="space-y-3">
        <label className="block text-xs font-medium text-slate-700">City <span className="text-red-500">*</span>
          <span className="relative mt-1.5 block"><IconBuilding size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input className={`${inputClass} pl-9`} value={city} onChange={(event) => setCity(event.target.value)} placeholder="e.g. Cairo, Alexandria, Giza" autoComplete="address-level2" required /></span>
        </label>
        <label className="block text-xs font-medium text-slate-700">Street Address <span className="text-red-500">*</span>
          <span className="relative mt-1.5 block"><IconMapPin size={16} className="absolute left-3 top-3 text-slate-400" /><textarea className={`${inputClass} min-h-16 resize-y pl-9`} value={details} onChange={(event) => setDetails(event.target.value)} placeholder="Street name, building number, floor, apartment..." autoComplete="street-address" required rows={2} /></span>
        </label>
        <label className="block text-xs font-medium text-slate-700">Phone Number <span className="text-red-500">*</span>
          <span className="relative mt-1.5 block"><IconPhone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input className={`${inputClass} pl-9 pr-28`} type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="01xxxxxxxxx" autoComplete="tel" pattern="01[0125][0-9]{8}" title="Enter a valid Egyptian mobile number" required /><span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-slate-400">Egyptian numbers only</span></span>
        </label>
      </form>
    </CheckoutPanel>
  );
}
