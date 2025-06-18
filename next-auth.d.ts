// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** l’ID MongoDB sous forme de chaîne */
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    /** si tu utilises JWT pour la session */
    id: string;
  }
}