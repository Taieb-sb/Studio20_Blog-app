// src/components/PostActions.tsx (Client Component)
"use client";

import { useRouter } from "next/navigation";

export default function PostActions({ id }: { id: string }) {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!confirm("Supprimer cet article ?")) return;
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push('/');
    } else {
      alert("Erreur lors de la suppression");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={handleEdit}
        className="px-3 py-1 bg-yellow-500 text-white rounded"
      >
        Modifier
      </button>
      <button
        onClick={handleDelete}
        className="px-3 py-1 bg-red-600 text-white rounded"
      >
        Supprimer
      </button>
    </div>
  );
}
