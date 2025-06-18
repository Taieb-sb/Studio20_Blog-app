// src/app/api/posts/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET /api/posts
export async function GET() {
  const client = await clientPromise;
  const posts = await client
    .db()
    .collection("posts")
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json(posts);
}

// POST /api/posts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // ① : Si pas de session OU pas d’utilisateur, on renvoie 401
  if (!session || !session.user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  // ② : On sait maintenant que session.user existe
  const { title, content } = await req.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  // ③ : on peut accéder à session.user.id / name / email
  //    Utilise un non-null assertion (!) ou un fallback
  const authorId = new ObjectId(session.user.id!);
  const authorName =
    session.user.name ??
    session.user.email!; // on force non-null avec le !

  const client = await clientPromise;
  const posts = client.db().collection("posts");
  const result = await posts.insertOne({
    title,
    content,
    authorId,
    authorName,
    createdAt: new Date(),
  });

  const newPost = await posts.findOne({ _id: result.insertedId });
  return NextResponse.json(newPost);
}
