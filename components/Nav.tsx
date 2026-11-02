"use client";
import Link from "next/link";
import { useCart } from "@/lib/cart";
export default function Nav() {
  const { count } = useCart();
  return (<header className="sticky top-0 z-20 bg-cream/90 backdrop-blur border-b border-cocoa/10">
    <nav className="mx-auto max-w-6xl flex items-center justify-between px-5 py-4">
      <Link href="/" className="font-serif text-lg sm:text-xl">Peshawari Dairy</Link>
      <div className="flex items-center gap-5 sm:gap-8 text-sm">
        <Link href="/shop" className="hover:text-berry">Shop</Link>
        <Link href="/#visit" className="hover:text-berry">Visit</Link>
        <Link href="/checkout" className="btn !py-2 !px-4">Cart ({count})</Link>
      </div></nav></header>);
}
