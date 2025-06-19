"use client";
 
import Link from "next/link";
import { useSession } from "next-auth/react";
import { PencilIcon, BookOpenIcon, UsersIcon, SparklesIcon } from "@heroicons/react/24/outline";
 
export default function Hero() {
  const { data: session } = useSession();
 
  return (
<section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
<div className="absolute inset-0 -z-10">
<div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: "var(--accent)" }}
        />
<div 
          className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full opacity-10 blur-2xl"
          style={{ backgroundColor: "var(--accent)" }}
        />
</div>
 
      <div className="max-w-4xl mx-auto text-center relative">
        {/* Main heading */}
<div className="mb-6 animate-fade-in">
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
<span style={{ color: "var(--foreground)" }}>
              Share your{" "}
</span>
<span 
              className="relative inline-block"
              style={{ color: "var(--accent)" }}
>
              ideas
<SparklesIcon className="absolute -top-2 -right-8 h-8 w-8 text-yellow-400 animate-pulse" />
</span>
<br />
<span style={{ color: "var(--foreground)" }}>
              with the world
</span>
</h1>
</div>
 
        {/* Subtitle */}
<p 
          className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in"
          style={{ 
            color: "var(--muted)",
            animationDelay: "0.1s"
          }}
>
          Join our community of writers and readers. Create, share, and discover 
          amazing content from passionate authors around the globe.
</p>
 
        {/* CTA Buttons */}
<div 
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in"
          style={{ animationDelay: "0.2s" }}
>
          {session ? (
<>
<Link 
                href="/create-post" 
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
>
<PencilIcon className="h-5 w-5" />
<span>Start Writing</span>
</Link>
<Link 
                href="#posts" 
                className="btn btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2"
>
<BookOpenIcon className="h-5 w-5" />
<span>Explore Posts</span>
</Link>
</>
          ) : (
<>
<Link 
                href="/auth/signup" 
                className="btn btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
>
<UsersIcon className="h-5 w-5" />
<span>Join Community</span>
</Link>
<Link 
                href="/auth/signin" 
                className="btn btn-secondary text-lg px-8 py-3 flex items-center justify-center space-x-2"
>
<BookOpenIcon className="h-5 w-5" />
<span>Sign In</span>
</Link>
</>
          )}
</div>
 
        {/* Features */}
<div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
>
<div className="text-center">
<div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--sidebar-bg)" }}
>
<PencilIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
</div>
<h3 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              Easy Writing
</h3>
<p className="text-sm" style={{ color: "var(--muted)" }}>
              Create beautiful blog posts with our intuitive editor and real-time preview.
</p>
</div>
 
          <div className="text-center">
<div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--sidebar-bg)" }}
>
<UsersIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
</div>
<h3 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              Community Driven
</h3>
<p className="text-sm" style={{ color: "var(--muted)" }}>
              Connect with like-minded writers and readers in our growing community.
</p>
</div>
 
          <div className="text-center">
<div 
              className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--sidebar-bg)" }}
>
<BookOpenIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
</div>
<h3 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              Discover Stories
</h3>
<p className="text-sm" style={{ color: "var(--muted)" }}>
              Explore a diverse collection of articles, tutorials, and personal stories.
</p>
</div>
</div>
 
        {/* Welcome message for authenticated users */}
        {session && (
<div 
            className="mt-12 p-6 rounded-lg border animate-slide-in"
            style={{ 
              backgroundColor: "var(--sidebar-bg)",
              borderColor: "var(--border)"
            }}
>
<div className="flex items-center justify-center space-x-3 mb-2">
<div 
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                style={{ backgroundColor: "var(--accent)" }}
>
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
</div>
<div>
<p className="font-medium" style={{ color: "var(--foreground)" }}>
                  Welcome back, {session.user?.name}!
</p>
<p className="text-sm" style={{ color: "var(--muted)" }}>
                  Ready to share your next big idea?
</p>
</div>
</div>
</div>
        )}
</div>
</section>
  );
}