"use client";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { api } from "@/lib/api";
export default function Shop() {
  const [cats, setCats] = useState<any[]>([]); const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState(""); const [q, setQ] = useState(""); const [sort, setSort] = useState(""); const [err, setErr] = useState("");
  useEffect(() => { api("/categories").then(setCats).catch(() => {}); }, []);
  useEffect(() => { const t = setTimeout(() => api(`/products?category=${category}&q=${encodeURIComponent(q)}&sort=${sort}`).then(setItems).catch((e) => setErr(e.message)), 250); return () => clearTimeout(t); }, [category, q, sort]);
  return (<main className="mx-auto max-w-6xl px-5 py-10">
    <h1 className="font-serif text-4xl sm:text-5xl">Shop</h1>
    <div className="mt-6 flex flex-wrap gap-3">
      <input className="inp !w-full sm:!w-64" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className="inp !w-auto" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{cats.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}</select>
      <select className="inp !w-auto" value={sort} onChange={(e) => setSort(e.target.value)}><option value="">Newest</option><option value="name">Name</option><option value="price_asc">Price: low to high</option><option value="price_desc">Price: high to low</option></select></div>
    {err && <p className="mt-6 text-berry">{err}</p>}
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
    {!items.length && !err && <p className="mt-8 opacity-70">No products found.</p>}</main>);
}
