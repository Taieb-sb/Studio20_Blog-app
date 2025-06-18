import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";      // ← on importe le type
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },                       // ← TS sait maintenant que c’est le littéral "jwt"
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const mongo = await clientPromise;
        const users = mongo.db().collection("users");
        const user = await users.findOne({ email: credentials.email });
        if (!user) return null;
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user._id.toString(), email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    // Quand on crée le JWT, on y stocke l’ID retourné par authorize()
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    // Quand on convertit le JWT en session, on expose token.id dans session.user.id
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
    error:  "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET!,                // ← on force non-null avec le "!"
};

// on peut maintenant passer ces options à NextAuth en toute sécurité
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
