// 2) Client Component for the edit form
// src/components/EditPostForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function EditPostForm({ post }: { post: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/posts/${post._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setSaving(false);
    if (res.ok) router.push(`/posts/${post._id}`);
    else {
      const err = await res.json();
      alert(err.error || 'Erreur de mise à jour');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Titre</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Contenu</label>
        <textarea
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-2 py-1 rounded"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {saving ? 'Enregistrement…' : 'Enregistrer'}
      </button>
    </form>
  );
}
