// src/app/create-post/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Header from "@/components/Header";
import CreatePostForm from "@/components/CreatePostForm";
import { PencilIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
 
export default async function CreatePostPage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/signin");
  }
 
  return (
<div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
<Header />
<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
<nav className="flex items-center space-x-2 mb-8">
<Link 
            href="/" 
            className="flex items-center space-x-2 text-sm hover:underline transition-colors"
            style={{ color: "var(--muted)" }}
>
<ArrowLeftIcon className="h-4 w-4" />
<span>Back to Home</span>
</Link>
<span style={{ color: "var(--muted)" }}>/</span>
<span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
            Create New Post
</span>
</nav>
 
        {/* Header Section */}
<div className="mb-8">
<div className="flex items-center space-x-3 mb-4">
<div 
              className="p-3 rounded-lg"
              style={{ backgroundColor: "var(--sidebar-bg)" }}
>
<PencilIcon className="h-6 w-6" style={{ color: "var(--accent)" }} />
</div>
<div>
<h1 className="text-3xl font-bold" style={{ color: "var(--foreground)" }}>
                Create New Post
</h1>
<p className="mt-1" style={{ color: "var(--muted)" }}>
                Share your thoughts and ideas with the community
</p>
</div>
</div>
          {/* Author Info */}
<div 
            className="flex items-center space-x-3 p-4 rounded-lg border"
            style={{ 
              backgroundColor: "var(--sidebar-bg)", 
              borderColor: "var(--border)" 
            }}
>
<div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: "var(--accent)" }}
>
              {session.user?.name?.charAt(0).toUpperCase() || 'U'}
</div>
<div>
<p className="font-medium" style={{ color: "var(--foreground)" }}>
                {session.user?.name || 'Unknown User'}
</p>
<p className="text-sm" style={{ color: "var(--muted)" }}>
                {session.user?.email}
</p>
</div>
</div>
</div>
 
        {/* Form Section */}
<div 
          className="card p-8 shadow-sm"
          style={{ 
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border)"
          }}
>
<div className="mb-6">
<h2 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              Post Details
</h2>
<p style={{ color: "var(--muted)" }}>
              Fill in the information below to create your blog post.
</p>
</div>
 
          <CreatePostForm />
</div>
 
        {/* Tips Section */}
<div className="mt-8">
<div 
            className="p-6 rounded-lg border"
            style={{ 
              backgroundColor: "var(--sidebar-bg)", 
              borderColor: "var(--border)"
            }}
>
<h3 className="font-semibold mb-3" style={{ color: "var(--foreground)" }}>
              Writing Tips
</h3>
<ul className="space-y-2 text-sm" style={{ color: "var(--muted)" }}>
<li className="flex items-start space-x-2">
<span className="text-green-500 mt-0.5">•</span>
<span>Use a clear and descriptive title that captures the essence of your post</span>
</li>
<li className="flex items-start space-x-2">
<span className="text-blue-500 mt-0.5">•</span>
<span>Structure your content with headings, paragraphs, and lists for better readability</span>
</li>
<li className="flex items-start space-x-2">
<span className="text-purple-500 mt-0.5">•</span>
<span>Include examples and practical insights to make your content more valuable</span>
</li>
<li className="flex items-start space-x-2">
<span className="text-orange-500 mt-0.5">•</span>
<span>Proofread your content before publishing to ensure quality</span>
</li>
</ul>
</div>
</div>
</main>
</div>
  );
}