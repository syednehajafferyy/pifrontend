export const API = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
export async function api(path: string, opts: any = {}) {
  const headers: any = { "Content-Type": "application/json", ...(opts.token ? { Authorization: `Bearer ${opts.token}` } : {}) };
  const r = await fetch(`${API}/api${path}`, { ...opts, headers, body: opts.body ? JSON.stringify(opts.body) : undefined, cache: "no-store" });
  if (r.status === 204) return null;
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || "Request failed");
  return d;
}
export const pkr = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;
