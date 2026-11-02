import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import { CartProvider } from "@/lib/cart";
import Nav from "@/components/Nav";
const serif = Fraunces({ subsets: ["latin"], variable: "--font-serif" });
const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
export const metadata = { title: "Peshawari Dairy Ice Cream", description: "100% Pure Dairy Milk Ice Cream. Family packs and kulfi, Karachi." };
export default function Root({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body className={`${serif.variable} ${sans.variable} font-sans`}><CartProvider><Nav />{children}</CartProvider></body></html>);
}
