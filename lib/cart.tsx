"use client";
import { createContext, useContext, useEffect, useState } from "react";
type Line = { variantId: string; name: string; size: string; price: number; qty: number };
const Ctx = createContext<any>(null);
export const useCart = () => useContext(Ctx);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]); const [ready, setReady] = useState(false);
  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem("cart") || "[]")); } catch {} setReady(true); }, []);
  useEffect(() => { if (ready) localStorage.setItem("cart", JSON.stringify(lines)); }, [lines, ready]);
  const add = (l: Omit<Line, "qty">, qty = 1) => setLines((p) => p.some((x) => x.variantId === l.variantId) ? p.map((x) => x.variantId === l.variantId ? { ...x, qty: x.qty + qty } : x) : [...p, { ...l, qty }]);
  const setQty = (id: string, q: number) => setLines((p) => q < 1 ? p.filter((x) => x.variantId !== id) : p.map((x) => x.variantId === id ? { ...x, qty: Math.min(q, 50) } : x));
  const clear = () => setLines([]);
  const total = lines.reduce((s, l) => s + l.price * l.qty, 0); const count = lines.reduce((s, l) => s + l.qty, 0);
  return <Ctx.Provider value={{ lines, add, setQty, clear, total, count }}>{children}</Ctx.Provider>;
}
