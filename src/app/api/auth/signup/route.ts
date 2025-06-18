import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();
  if (!email || !password || !name) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }
  const client = await clientPromise;
  const users = client.db().collection("users");
  const existing = await users.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Utilisateur déjà existant" }, { status: 409 });
  }
  const hashed = await hash(password, 10);
  const result = await users.insertOne({ email, name, password: hashed, createdAt: new Date() });
  return NextResponse.json({ success: true, userId: result.insertedId });
}
