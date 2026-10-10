"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  IconChevronDown,
  IconGift,
  IconHeadset,
  IconHeart,
  IconMail,
  IconMenu2,
  IconPhone,
  IconSearch,
  IconShoppingCart,
  IconTruckDelivery,
  IconUser,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import AccountDropdown from "./AccountDropdown";
import logo from "../../../assets/images/freshcart-logo.svg";
import { RootState } from "@/store/Store";
import { Category } from "@/features/categories/types/categories.types";
import { deleteToken } from "@/features/auth/services/auth.actions";
import { authActions } from "@/features/auth/slices/auth.slices";
import { cartActions } from "@/features/cart/slices/cart.slice";
import { wishlistActions } from "@/features/wishlist/slices/wishlist.slice";
import { toast } from "sonner";

export default function Navbar({ categories }: { categories: Category[] }) {
  const { isAuthenticated, userInfo } = useSelector(
    (state: RootState) => state.AuthReducer,
  );
  const numOfCartItems = useSelector(
    (state: RootState) => state.cartReducer.numOfCartItems,
  );
  const wishlistCount = useSelector(
    (state: RootState) => state.wishlistReducer.count,
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const keyword = String(formData.get("keyword") ?? "").trim();
    if (!keyword) return;
    setIsMenuOpen(false);
    router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
  }

  async function handleLogout() {
    try {
      await deleteToken();
      dispatch(
        authActions.setAuthStates({ isAuthenticated: false, userInfo: null }),
      );
      dispatch(
        cartActions.setcartInfo({
          status: "",
          message: "",
          numOfCartItems: 0,
          cartId: null,
          data: { products: [], totalCartPrice: 0 },
        }),
      );
      dispatch(
        wishlistActions.setWishlistInfo({
          status: "success",
          message: "",
          count: 0,
          data: [],
        }),
      );
      setIsMenuOpen(false);
      toast.success("You have signed out");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out. Please try again.");
    }
  }

  const navLinkClass = (href: string) =>
    `whitespace-nowrap text-sm font-medium transition-colors hover:text-primary-700 ${pathname === href ? "text-primary-700" : "text-slate-700"}`;

  const searchForm = (mobile = false) => (
    <form
      onSubmit={submitSearch}
      role="search"
      className={`flex h-11 items-center rounded-full border border-slate-200 bg-slate-50 p-1 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-primary-100 ${mobile ? "w-full" : "w-full max-w-[470px]"}`}
    >
      <input
        name="keyword"
        type="search"
        placeholder="Search for products, brands and more..."
        aria-label="Search products"
        className="min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />
      <button
        type="submit"
        aria-label="Search"
        className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700"
      >
        <IconSearch size={17} stroke={2.2} />
      </button>
    </form>
  );

  const cartLink = (
    <Link
      href="/cart"
      aria-label={`Shopping cart, ${numOfCartItems} items`}
      className="relative grid size-10 place-items-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-primary-700"
    >
      <IconShoppingCart size={22} stroke={1.8} />
      {numOfCartItems > 0 && (
        <span className="absolute right-0 top-0 grid min-h-4 min-w-4 -translate-y-0.5 translate-x-0.5 place-items-center rounded-full bg-primary-600 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
          {numOfCartItems > 99 ? "99+" : numOfCartItems}
        </span>
      )}
    </Link>
  );

  const wishlistLink = (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${wishlistCount} saved items`}
      className="relative grid size-10 place-items-center rounded-full text-slate-600 transition hover:bg-rose-50 hover:text-rose-500"
    >
      <IconHeart size={21} stroke={1.8} />
      {wishlistCount > 0 && (
        <span className="absolute right-0 top-0 grid min-h-4 min-w-4 -translate-y-0.5 translate-x-0.5 place-items-center rounded-full bg-rose-500 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
          {wishlistCount > 99 ? "99+" : wishlistCount}
        </span>
      )}
    </Link>
  );

  return (
    <header className="relative z-40 border-b border-slate-200 bg-white">
      <div className="hidden border-b border-slate-100 bg-white md:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <IconTruckDelivery size={15} className="text-primary-600" />
              Free Shipping on Orders 500 EGP
            </span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <IconGift size={14} className="text-primary-600" />
              New Arrivals Daily
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href="tel:+18001234567" className="inline-flex items-center gap-1.5 hover:text-primary-700">
              <IconPhone size={14} /> +1 (800) 123-4567
            </a>
            <a href="mailto:support@freshcart.com" className="inline-flex items-center gap-1.5 hover:text-primary-700">
              <IconMail size={14} /> support@freshcart.com
            </a>
            <span className="h-4 border-l border-slate-200" />
            {isAuthenticated ? (
              <Link href="/profile" className="hover:text-primary-700">{userInfo?.name || "My Account"}</Link>
            ) : (
              <>
                <Link href="/login" className="hover:text-primary-700">Sign In</Link>
                <Link href="/signup" className="hover:text-primary-700">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[70px] items-center justify-between gap-4">
          <Link href="/" aria-label="FreshCart home" className="shrink-0">
            <Image src={logo} alt="FreshCart" priority className="h-9 w-auto" />
          </Link>

          <div className="hidden min-w-0 flex-1 justify-center px-2 lg:flex">
            {searchForm()}
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/shop" className={navLinkClass("/shop")}>Shop</Link>
            <div className="group relative">
              <button
                type="button"
                aria-haspopup="true"
                className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-medium text-slate-700 transition hover:text-primary-700"
              >
                Categories
                <IconChevronDown size={15} className="transition-transform group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-2 pt-3 opacity-0 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="max-h-80 overflow-auto rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  <Link href="/categories" className="block rounded-lg px-3 py-2 text-sm font-semibold text-primary-700 hover:bg-primary-50">
                    Browse all categories
                  </Link>
                  {categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/shop?category=${category._id}`}
                      className="block rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary-700"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/brands" className={navLinkClass("/brands")}>Brands</Link>
          </nav>

          <div className="hidden shrink-0 items-center gap-3 lg:flex">
            <a
              href="mailto:support@freshcart.com"
              className="flex items-center gap-2 rounded-full px-2 py-1 text-slate-700 transition hover:bg-primary-50"
            >
              <span className="grid size-10 place-items-center rounded-full bg-primary-50 text-primary-600">
                <IconHeadset size={20} />
              </span>
              <span className="whitespace-nowrap text-[11px] leading-4">
                <span className="block text-slate-500">Support</span>
                <span className="font-semibold">24/7 Help</span>
              </span>
            </a>
            <span className="h-8 border-l border-slate-200" />
            {wishlistLink}
            {cartLink}
            {isAuthenticated ? (
              <AccountDropdown userName={userInfo?.name ?? "My Account"} onLogout={handleLogout} />
            ) : (
              <Link
                href="/login"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                <IconUser size={17} /> Sign In
              </Link>
            )}
          </div>

          <div className="flex shrink-0 items-center gap-1 lg:hidden">
            {wishlistLink}
            {cartLink}
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid size-10 place-items-center rounded-full text-slate-700 hover:bg-slate-100"
            >
              {isMenuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
            </button>
          </div>
        </div>

        <div className="pb-3 lg:hidden">{searchForm(true)}</div>

        {isMenuOpen && (
          <nav aria-label="Mobile navigation" className="border-t border-slate-100 py-4 lg:hidden">
            <div className="flex flex-col gap-1">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Shop</Link>
              <details className="group rounded-lg px-3 py-2.5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-slate-700">
                  Categories <IconChevronDown size={16} className="transition group-open:rotate-180" />
                </summary>
                <div className="mt-2 flex max-h-52 flex-col gap-1 overflow-auto border-l border-slate-200 pl-3">
                  <Link href="/categories" onClick={() => setIsMenuOpen(false)} className="py-2 text-sm text-primary-700">All categories</Link>
                  {categories.map((category) => (
                    <Link key={category._id} href={`/shop?category=${category._id}`} onClick={() => setIsMenuOpen(false)} className="py-2 text-sm text-slate-600">
                      {category.name}
                    </Link>
                  ))}
                </div>
              </details>
              <Link href="/brands" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Brands</Link>
              <Link href="/wishlist" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Wishlist ({wishlistCount})</Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Cart ({numOfCartItems})</Link>
              {isAuthenticated ? (
                <>
                  <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">My Account</Link>
                  <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">My Orders</Link>
                  <button type="button" onClick={handleLogout} className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-rose-600 hover:bg-rose-50">Sign Out</button>
                </>
              ) : (
                <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-full bg-primary-600 px-4 py-2.5 text-center text-sm font-semibold text-white">Sign In</Link>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)} className="flex-1 rounded-full border border-primary-200 px-4 py-2.5 text-center text-sm font-semibold text-primary-700">Sign Up <IconUserPlus size={15} className="ml-1 inline" /></Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
