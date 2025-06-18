import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const post = await client
      .db()
      .collection("posts")
      .findOne({ _id: new ObjectId(params.id) });
    if (!post) {
      return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
    }
    const serialized = {
      _id: post._id.toString(),
      title: post.title,
      content: post.content,
      authorName: post.authorName,
      authorId: post.authorId.toString(),
      createdAt: post.createdAt.toISOString(),
    };
    return NextResponse.json(serialized);
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { title, content } = await request.json();
  if (!title || !content) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  const client = await clientPromise;
  const result = await client
    .db()
    .collection("posts")
    .updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, content } }
    );
  if (result.matchedCount === 0) {
    return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const client = await clientPromise;
  const result = await client
    .db()
    .collection("posts")
    .deleteOne({ _id: new ObjectId(params.id) });
  if (result.deletedCount === 0) {
    return NextResponse.json({ error: "Article non trouvé" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
