import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { api } from "@/lib/api";
export const dynamic = "force-dynamic";
export default async function Home() {
  let s: any = {}, products: any[] = [];
  try { [s, products] = await Promise.all([api("/settings"), api("/products?featured=1")]); } catch {}
  const b = s.business || {};
  return (<main>
    <Hero tagline={b.tagline || "100% Pure Dairy Milk Ice Cream"} />
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="flex items-end justify-between mb-8"><h2 className="font-serif text-3xl sm:text-4xl">Featured</h2><Link href="/shop" className="underline">All products</Link></div>
      {products.length ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">{products.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        : <p className="opacity-70">Products will appear here once they are added in the admin panel.</p>}
    </section>
    {b.googleRating && <section className="bg-vanilla py-12 text-center"><p className="font-serif text-5xl">{b.googleRating.score} / 5</p><p className="mt-2">Google rating from {b.googleRating.count} reviews</p></section>}
    <section id="visit" className="mx-auto max-w-6xl px-5 py-16 grid sm:grid-cols-2 gap-8">
      <div><h2 className="font-serif text-3xl sm:text-4xl">Visit or call</h2><p className="mt-4">{b.address}</p>
        <p className="mt-3">{(b.phones || []).map((p: string) => <a key={p} href={`tel:${p.replace(/\s|-/g, "")}`} className="block underline">{p}</a>)}</p></div>
      <div>{b.whatsapp && <a className="btn" href={`https://wa.me/${b.whatsapp}`}>Message on WhatsApp</a>}
        {b.instagramUrl && <a className="btn btn-o ml-3" href={b.instagramUrl}>Instagram</a>}</div></section>
    <footer className="border-t border-cocoa/10 py-8 text-center text-sm">Peshawari Dairy Ice Cream, Karachi</footer></main>);
}
