"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string|null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res?.error) {
      setError("Identifiants invalides");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h1 className="text-2xl mb-4">Se connecter</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="email" placeholder="Email"
        value={form.email}
        onChange={e=>setForm({...form, email: e.target.value})}
        className="w-full mb-2 p-2 border"
        required
      />
      <input
        type="password" placeholder="Mot de passe"
        value={form.password}
        onChange={e=>setForm({...form, password: e.target.value})}
        className="w-full mb-4 p-2 border"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Se connecter
      </button>
    </form>
  );
}
