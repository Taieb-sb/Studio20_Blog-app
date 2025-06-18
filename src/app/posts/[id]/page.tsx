// src/app/posts/[id]/page.tsx
import Link from "next/link";
import PostActions from "@/components/PostActions";


interface Post {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}

export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  // ① Détermine la base URL
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  // ② Construis l'URL absolue
  const url = new URL(`/api/posts/${params.id}`, baseUrl);

  // ③ Fetch avec URL absolue
  const res = await fetch(url.toString(), {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <p className="text-red-500">Article non trouvé ou erreur</p>
        <Link href="/" className="text-blue-600">
          ← Retour à l’accueil
        </Link>
      </div>
    );
  }

  const post: Post = await res.json();
  return (
    <article className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-600">
        Par {post.authorName} • {new Date(post.createdAt).toLocaleString()}
      </p>
      <div className="prose">
        <p>{post.content}</p>
      </div>
      {/* Ton composant PostActions ici */}
      <PostActions id={params.id} />

      <Link href="/" className="text-blue-600">
        ← Retour à l’accueil
      </Link>
    </article>
  );
}
