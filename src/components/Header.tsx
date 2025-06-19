"use client";

import Image from 'next/image'
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "@/app/providers";
import Link from "next/link";
import { useState } from "react";
import { 
  Bars3Icon, 
  XMarkIcon, 
  PlusIcon, 
  SunIcon, 
  MoonIcon,
} from "@heroicons/react/24/outline";
 
export default function Header() {
  const { data: session, status } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
  return (
<header 
      className="sticky top-0 z-50 border-b backdrop-blur-md"
      style={{ 
        backgroundColor: "rgba(var(--background-rgb), 0.8)", 
        borderColor: "var(--border)" 
      }}
>
<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
<div className="flex h-16 items-center justify-between">
          {/* Logo */}
<div className="flex items-center space-x-4">
  <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
    <Image
      src="/studio20-logo.png"
      alt="Studio20 Logo"
      width={32}
      height={32}
      className="block"
    />
    <span className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
      Studio20 Blog
    </span>
  </Link>
</div>
 
          {/* Desktop Navigation */}
<div className="hidden md:flex md:items-center md:space-x-6">
<Link 
              href="/" 
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-opacity-10 transition-colors"
              style={{ color: "var(--muted)" }}
>
              Home
</Link>
            {status === "authenticated" && (
<Link 
                href="/create-post" 
                className="btn btn-primary flex items-center space-x-2"
>
<PlusIcon className="h-4 w-4" />
<span>New Post</span>
</Link>
            )}
 
            {/* Theme Toggle */}
<button
              onClick={toggleTheme}
              className="btn btn-ghost p-2"
              aria-label="Toggle theme"
>
              {theme === "light" ? 
<MoonIcon className="h-3 w-3" /> : 
<SunIcon className="h-3 w-3" />
              }
</button>
 
            {/* User Menu */}
            {status === "loading" ? (
<div className="spinner" />
            ) : session ? (
<div className="flex items-center space-x-3">
<div className="flex items-center space-x-2">
<div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                    style={{ backgroundColor: "var(--accent)" }}
>
                    {session.user?.name?.charAt(0).toUpperCase() || 'U'}
</div>
<span className="text-sm font-medium hidden lg:block" style={{ color: "var(--foreground)" }}>
                    {session.user?.name}
</span>
</div>
<button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="btn btn-secondary text-sm"
>
                  Sign out
</button>
</div>
            ) : (
<div className="flex items-center space-x-3">
<Link href="/auth/signin" className="btn btn-ghost">
                  Sign in
</Link>
<Link href="/auth/signup" className="btn btn-primary">
                  Sign up
</Link>
</div>
            )}
</div>
 
          {/* Mobile menu button */}
<div className="md:hidden">
<button
              type="button"
              className="btn btn-ghost p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
              {mobileMenuOpen ? (
<XMarkIcon className="h-6 w-6" />
              ) : (
<Bars3Icon className="h-6 w-6" />
              )}
</button>
</div>
</div>
 
        {/* Mobile menu */}
        {mobileMenuOpen && (
<div className="md:hidden border-t" style={{ borderColor: "var(--border)" }}>
<div className="space-y-1 px-2 pb-3 pt-2">
<Link
                href="/"
                className="block px-3 py-2 text-base font-medium rounded-md hover:bg-opacity-10 transition-colors"
                style={{ color: "var(--muted)" }}
                onClick={() => setMobileMenuOpen(false)}
>
                Home
</Link>
              {status === "authenticated" ? (
<>
<Link
                    href="/create-post"
                    className="block px-3 py-2 text-base font-medium rounded-md transition-colors"
                    style={{ color: "var(--accent)" }}
                    onClick={() => setMobileMenuOpen(false)}
>
                    Create New Post
</Link>
<div className="px-3 py-2">
<div className="flex items-center space-x-2 mb-3">
<div 
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                        style={{ backgroundColor: "var(--accent)" }}
>
                        {session.user?.name?.charAt(0).toUpperCase() || 'U'}
</div>
<span className="font-medium" style={{ color: "var(--foreground)" }}>
                        {session.user?.name}
</span>
</div>
<button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left text-base font-medium text-red-600 hover:text-red-700"
>
                      Sign out
</button>
</div>
</>
              ) : (
<>
<Link
                    href="/auth/signin"
                    className="block px-3 py-2 text-base font-medium rounded-md transition-colors"
                    style={{ color: "var(--muted)" }}
                    onClick={() => setMobileMenuOpen(false)}
>
                    Sign in
</Link>
<Link
                    href="/auth/signup"
                    className="block px-3 py-2 text-base font-medium rounded-md transition-colors"
                    style={{ color: "var(--accent)" }}
                    onClick={() => setMobileMenuOpen(false)}
>
                    Sign up
</Link>
</>
              )}
<button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-3 py-2 text-base font-medium rounded-md w-full transition-colors"
                style={{ color: "var(--muted)" }}
>
                {theme === "light" ? 
<><MoonIcon className="h-5 w-5" /><span>Dark mode</span></> : 
<><SunIcon className="h-5 w-5" /><span>Light mode</span></>
                }
</button>
</div>
</div>
        )}
</nav>
</header>
  );
}