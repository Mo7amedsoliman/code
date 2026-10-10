import { ReactNode } from "react";

export default function CheckoutPanel({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <header className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-white sm:px-5">
        <div className="flex items-center gap-2 text-sm font-bold">{icon}{title}</div>
        <p className="mt-1 text-[11px] text-green-50">{subtitle}</p>
      </header>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}
