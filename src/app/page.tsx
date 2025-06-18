// src/app/page.tsx
import Header from "@/components/Header";
import Link from "next/link";

type Post = {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
};

export default async function HomePage() {
  // 1) On récupère la liste des posts depuis notre API
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/posts`, { cache: "no-store" });
  if (!res.ok) {
    // si l’API renvoie une erreur on peut afficher un message
    return (
      <div>
        <Header />
        <main className="p-8">
          <p className="text-red-500">Failed to load posts.</p>
        </main>
      </div>
    );
  }
  const posts: Post[] = await res.json();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 2) Notre barre de navigation / header */}
      <Header />

      {/* 3) Contenu principal */}
      <main className="max-w-3xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            My Blog
          </h1>
          {/* Le bouton de création de post n’apparaît que si 
              Header a détecté une session (via useSession) */}
          <Link
            href="/create-post"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + New Post
          </Link>
        </div>

        {/* 4) Affichage de la liste des articles */}
        {posts.length === 0 ? (
          <p className="text-gray-700 dark:text-gray-300">
            No posts yet.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li
                key={post._id}
                className="p-6 bg-white dark:bg-gray-800 rounded shadow"
              >
                <Link
                  href={`/posts/${post._id}`}
                  className="text-2xl font-semibold text-blue-600 hover:underline"
                >
                  {post.title}
                </Link>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  By {post.authorName} on{" "}
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="mt-4 text-gray-800 dark:text-gray-200">
                  {post.content.substring(0, 150)}…
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
