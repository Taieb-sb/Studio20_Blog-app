"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {status === "loading" ? null : session ? (
          <>
            <span>Welcome, {session.user?.name}</span>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <Link href="/auth/login">Sign in</Link>
        )}
      </nav>
    </header>
  );
}
