"use client";
import { useState } from "react";
import { api } from "@/lib/api";
export default function Login() {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [err, setErr] = useState("");
  async function go(e: any) { e.preventDefault(); try { const r = await api("/auth/login", { method: "POST", body: { email, password } }); localStorage.setItem("admin_token", r.token); location.href = "/admin"; } catch (x: any) { setErr(x.message); } }
  return (<main className="mx-auto max-w-sm px-5 py-24"><h1 className="font-serif text-4xl">Admin</h1>
    <form onSubmit={go} className="mt-6 space-y-3"><input className="inp" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="inp" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {err && <p className="text-berry">{err}</p>}<button className="btn w-full">Sign in</button></form></main>);
}
