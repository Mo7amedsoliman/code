"use client";

import { IconCash, IconCheck, IconCreditCard, IconShieldCheck } from "@tabler/icons-react";
import CheckoutPanel from "./CheckoutPanel";

export type PaymentMethodValue = "cash" | "online";

export default function PaymentMethod({ value, onChange }: { value: PaymentMethodValue; onChange: (value: PaymentMethodValue) => void }) {
  const options: { value: PaymentMethodValue; title: string; description: string; icon: typeof IconCash }[] = [
    { value: "cash", title: "Cash on Delivery", description: "Pay when your order arrives at your doorstep", icon: IconCash },
    { value: "online", title: "Pay Online", description: "Secure payment with Credit/Debit Card via Stripe", icon: IconCreditCard },
  ];

  return (
    <CheckoutPanel title="Payment Method" subtitle="Choose how you'd like to pay" icon={<IconCreditCard size={16} />}>
      <div className="space-y-2.5">
        {options.map((option) => {
          const selected = value === option.value;
          const Icon = option.icon;
          return (
            <button key={option.value} type="button" role="radio" aria-checked={selected} onClick={() => onChange(option.value)} className={`flex min-h-[70px] w-full items-center gap-3 rounded-lg border p-3 text-left transition ${selected ? "border-green-500 bg-green-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}>
              <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${selected ? "bg-green-600 text-white shadow-md shadow-green-600/20" : "bg-slate-100 text-slate-500"}`}><Icon size={19} /></span>
              <span className="min-w-0 flex-1"><span className="block text-xs font-bold text-slate-900">{option.title}</span><span className="mt-1 block text-[10px] text-slate-500">{option.description}</span>{option.value === "online" && <span className="mt-1 flex gap-1 text-[9px] font-bold text-slate-500"><span className="rounded bg-slate-100 px-1">VISA</span><span className="rounded bg-slate-100 px-1">MC</span><span className="rounded bg-slate-100 px-1">AMEX</span></span>}</span>
              <span className={`grid size-4 shrink-0 place-items-center rounded-full ${selected ? "bg-green-600 text-white" : "border border-slate-300 text-transparent"}`}>{selected && <IconCheck size={11} stroke={3} />}</span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 px-3 py-2.5 text-green-700">
        <span className="grid size-6 place-items-center rounded-full bg-green-100"><IconShieldCheck size={14} /></span>
        <div><p className="text-[10px] font-semibold">Secure &amp; Encrypted</p><p className="mt-0.5 text-[9px]">Your payment information is protected with SSL encryption</p></div>
      </div>
    </CheckoutPanel>
  );
}
