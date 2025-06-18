// src/app/posts/[id]/edit/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditPostForm from "@/components/EditPostForm";

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export default async function EditPostPage({ 
  params,
 }: { 
  params: { id: string };
 }) {
  // on vérifie la session
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  // on construit une URL ABSOLUE
  const baseUrl  = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const url = new URL(`/api/posts/${params.id}`, baseUrl);
  //on fetch les données du post
  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) {
    redirect("/");
  }
  const post: Post = await res.json();

  //on vérifie que c’est bien l’auteur
  //if (post.authorId !== session.user.id) {
  //  redirect("/");
  //}
  
  //
  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <EditPostForm post={post} />
    </div>
  );
}