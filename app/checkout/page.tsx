"use client";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { api, pkr } from "@/lib/api";
export default function Checkout() {
  const { lines, setQty, clear, total } = useCart();
  const [f, setF] = useState({ customerName: "", phone: "", address: "", area: "", notes: "" });
  const [err, setErr] = useState(""); const [busy, setBusy] = useState(false); const [done, setDone] = useState<any>(null);
  const set = (k: string) => (e: any) => setF({ ...f, [k]: e.target.value });
  const items = lines.map((l: any) => ({ variantId: l.variantId, quantity: l.qty }));
  async function submit(e: any) { e.preventDefault(); setBusy(true); setErr("");
    try { setDone(await api("/orders", { method: "POST", body: { ...f, items } })); clear(); } catch (x: any) { setErr(x.message); } setBusy(false); }
  async function whatsapp() {
    if (!f.customerName || !f.phone || !f.address || !f.area) return setErr("Please fill in name, phone, address and area first.");
    const s = await api("/settings"); const text = ["New order", ...lines.map((l: any) => `${l.qty} x ${l.name} (${l.size}) - ${pkr(l.price * l.qty)}`), `Total: ${pkr(total)}`, "", `Name: ${f.customerName}`, `Phone: ${f.phone}`, `Address: ${f.address}, ${f.area}`, f.notes && `Notes: ${f.notes}`].filter(Boolean).join("\n");
    window.open(`https://wa.me/${s.business.whatsapp}?text=${encodeURIComponent(text)}`, "_blank"); }
  if (done) return <main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="font-serif text-4xl">Order received</h1><p className="mt-4">Your order number is <b>#{done.orderNumber}</b>. Total {pkr(done.total)}, payable on delivery. We will contact you to confirm.</p><Link href="/shop" className="btn mt-8">Continue shopping</Link></main>;
  if (!lines.length) return <main className="mx-auto max-w-xl px-5 py-20 text-center"><h1 className="font-serif text-4xl">Your cart is empty</h1><Link href="/shop" className="btn mt-8">Go to shop</Link></main>;
  return (<main className="mx-auto max-w-5xl px-5 py-10 grid md:grid-cols-2 gap-10">
    <section><h1 className="font-serif text-4xl">Your cart</h1>
      {lines.map((l: any) => (<div key={l.variantId} className="mt-5 flex items-center justify-between gap-3 border-b border-cocoa/10 pb-4">
        <div><p className="font-serif text-lg">{l.name}</p><p className="text-sm opacity-70">{l.size} - {pkr(l.price)}</p></div>
        <div className="flex items-center gap-3"><button className="btn btn-o !px-3 !py-1" onClick={() => setQty(l.variantId, l.qty - 1)}>-</button><span className="w-6 text-center">{l.qty}</span><button className="btn btn-o !px-3 !py-1" onClick={() => setQty(l.variantId, l.qty + 1)}>+</button></div></div>))}
      <p className="mt-6 text-xl font-serif">Total {pkr(total)}</p><p className="text-sm opacity-70">Cash on delivery. Final price is confirmed by the server.</p></section>
    <form onSubmit={submit} className="space-y-3"><h2 className="font-serif text-2xl">Delivery details</h2>
      <input required className="inp" placeholder="Full name" value={f.customerName} onChange={set("customerName")} />
      <input required className="inp" placeholder="Phone" inputMode="tel" value={f.phone} onChange={set("phone")} />
      <input required className="inp" placeholder="Area" value={f.area} onChange={set("area")} />
      <textarea required className="inp" placeholder="Delivery address" value={f.address} onChange={set("address")} />
      <textarea className="inp" placeholder="Order notes (optional)" value={f.notes} onChange={set("notes")} />
      {err && <p className="text-berry">{err}</p>}
      <button className="btn w-full" disabled={busy}>{busy ? "Placing order..." : "Place order on website"}</button>
      <button type="button" className="btn btn-o w-full" onClick={whatsapp}>Order via WhatsApp</button></form></main>);
}
