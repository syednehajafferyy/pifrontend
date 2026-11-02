"use client";
import { useEffect, useState } from "react";
import { api, pkr } from "@/lib/api";
const STATUSES = ["PENDING", "CONFIRMED", "PROCESSING", "DISPATCHED", "DELIVERED", "CANCELLED"];
export default function Admin() {
  const [t, setT] = useState(""); const [d, setD] = useState<any>(null); const [orders, setOrders] = useState<any[]>([]); const [q, setQ] = useState(""); const [st, setSt] = useState("");
  const load = (tok: string) => { api("/dashboard", { token: tok }).then(setD).catch(() => { localStorage.removeItem("admin_token"); location.href = "/admin/login"; }); api(`/orders?status=${st}&q=${encodeURIComponent(q)}`, { token: tok }).then(setOrders).catch(() => {}); };
  useEffect(() => { const tok = localStorage.getItem("admin_token"); if (!tok) { location.href = "/admin/login"; return; } setT(tok); load(tok); }, [st, q]);
  if (!d) return <main className="p-10">Loading...</main>;
  const stats = [["Orders", d.totalOrders], ["Pending", d.pending], ["Processing", d.processing], ["Delivered", d.completed], ["Products", d.totalProducts], ["Sales", pkr(d.totalSales)]];
  return (<main className="mx-auto max-w-6xl px-5 py-8">
    <div className="flex justify-between"><h1 className="font-serif text-4xl">Dashboard</h1><button className="underline" onClick={() => { localStorage.removeItem("admin_token"); location.href = "/admin/login"; }}>Log out</button></div>
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">{stats.map(([k, v]) => <div key={k as string} className="border border-cocoa/20 rounded-2xl p-4"><p className="text-sm opacity-70">{k}</p><p className="font-serif text-2xl">{v}</p></div>)}</div>
    <h2 className="mt-10 font-serif text-2xl">Orders</h2>
    <div className="mt-3 flex gap-3 flex-wrap"><input className="inp !w-64" placeholder="Name, phone or order #" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className="inp !w-auto" value={st} onChange={(e) => setSt(e.target.value)}><option value="">All statuses</option>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></div>
    <div className="mt-4 overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b border-cocoa/20"><th className="py-2">#</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody>
      {orders.map((o) => (<tr key={o.id} className="border-b border-cocoa/10 align-top"><td className="py-2">{o.orderNumber}</td>
        <td>{o.customerName}<br />{o.phone}<br /><span className="opacity-70">{o.address}, {o.area}</span></td>
        <td>{o.items.map((i: any) => <div key={i.id}>{i.quantity} x {i.productName} ({i.size})</div>)}</td><td>{pkr(o.total)}</td>
        <td><select className="inp !py-1" value={o.status} onChange={async (e) => { await api(`/orders/${o.id}/status`, { method: "PATCH", token: t, body: { status: e.target.value } }); load(t); }}>{STATUSES.map((s) => <option key={s}>{s}</option>)}</select></td></tr>))}</tbody></table></div>
    <p className="mt-8 text-sm opacity-70">Product, category and settings management screens are not built yet; the API for them exists.</p></main>);
}
