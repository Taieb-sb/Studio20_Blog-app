// src/app/create-post/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CreatePostForm from "@/components/CreatePostForm";

export default async function CreatePostPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/auth/login");

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Créer un nouvel article</h1>
      <CreatePostForm />
    </div>
  );
}