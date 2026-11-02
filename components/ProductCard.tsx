"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { pkr } from "@/lib/api";
export default function ProductCard({ p }: { p: any }) {
  const { add } = useCart(); const ok = p.variants.filter((v: any) => v.inStock);
  const [vid, setVid] = useState(ok[0]?.id); const v = p.variants.find((x: any) => x.id === vid); const [done, setDone] = useState(false);
  return (<motion.div whileHover={{ y: -6 }} className="group">
    <div className="aspect-square overflow-hidden rounded-[2rem] bg-vanilla">
      {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />}</div>
    <h3 className="mt-3 font-serif text-xl">{p.name}</h3>
    <p className="text-sm opacity-70">{[p.flavor, p.category?.name].filter(Boolean).join(" / ")}</p>
    {p.description && <p className="mt-1 text-sm line-clamp-2">{p.description}</p>}
    {ok.length ? (<div className="mt-3 flex items-center gap-3">
      <select className="inp !w-auto !py-2" value={vid} onChange={(e) => setVid(e.target.value)}>{ok.map((x: any) => <option key={x.id} value={x.id}>{x.size} - {pkr(x.price)}</option>)}</select>
      <button className="btn !py-2" onClick={() => { add({ variantId: v.id, name: p.name, size: v.size, price: v.price }); setDone(true); setTimeout(() => setDone(false), 1200); }}>{done ? "Added" : "Add to cart"}</button>
    </div>) : <p className="mt-3 text-sm text-berry">Currently unavailable</p>}
  </motion.div>);
}
