"use client";
import Link from "next/link";
import { motion } from "framer-motion";
export default function Hero({ tagline }: { tagline: string }) {
  return (<section className="mx-auto max-w-6xl px-5 py-14 sm:py-24 grid md:grid-cols-2 gap-10 items-center overflow-hidden">
    <div>
      <motion.h1 initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8 }} className="font-serif text-5xl sm:text-7xl leading-[1.02]">Cold, creamy, <span className="text-berry italic">family-sized.</span></motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} className="mt-5 max-w-md text-lg">{tagline}</motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6 }} className="mt-8 flex gap-3 flex-wrap">
        <Link href="/shop" className="btn">Shop now</Link><Link href="/shop" className="btn btn-o">Explore flavors</Link></motion.div></div>
    <motion.svg initial={{ scale: .8, rotate: -6, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ duration: 1, type: "spring" }} viewBox="0 0 300 300" className="w-full max-w-sm mx-auto" aria-hidden>
      <path d="M60 130h180l-16 140a14 14 0 0 1-14 12H90a14 14 0 0 1-14-12z" fill="#D9647C" />
      <rect x="52" y="112" width="196" height="30" rx="12" fill="#4A2C20" />
      <path d="M70 112c0-48 36-82 80-82s80 34 80 82z" fill="#F7E6C4" />
      <path d="M80 112c8-18 22-26 36-18 14-12 30-10 38 2 14-10 34-6 40 16z" fill="#fff" opacity=".7" />
    </motion.svg></section>);
}
