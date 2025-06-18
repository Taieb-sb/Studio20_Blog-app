// src/components/CreatePostForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Erreur inconnue");
      return;
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Titre"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Contenu"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        className="w-full p-2 border rounded h-40"
        required
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Publier
      </button>
    </form>
  );
}
