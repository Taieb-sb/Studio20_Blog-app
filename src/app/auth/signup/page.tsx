"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string|null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push("/auth/login");
    } else {
      setError(data.error || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Créer un compte</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text" placeholder="Nom"
        value={form.name}
        onChange={e=>setForm({...form, name: e.target.value})}
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="email" placeholder="Email"
        value={form.email}
        onChange={e=>setForm({...form, email: e.target.value})}
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="password" placeholder="password"
        value={form.password}
        onChange={e=>setForm({...form, password: e.target.value})}
        className="w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Signin
      </button>
    </form>
  );
}
