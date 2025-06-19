import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth/next';
import Header from '@/components/Header';
import PostActions from '@/components/PostActions';
import { CalendarIcon, UserIcon, ClockIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
interface Post {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  authorId?: string;
  createdAt: string;
}
 
async function getPost(id: string): Promise<Post | null> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const url = new URL(`/api/posts/${id}`, baseUrl);
    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}
 
function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}
 
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
 
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const session = await getServerSession();
 
  if (!post) {
    notFound();
  }
 
  const readingTime = getReadingTime(post.content);
 
  return (
<div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
<Header />
<main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
<nav className="flex items-center space-x-2 mb-8 animate-fade-in">
<Link 
            href="/" 
            className="flex items-center space-x-2 text-sm hover:underline transition-colors"
            style={{ color: "var(--muted)" }}
>
<ArrowLeftIcon className="h-4 w-4" />
<span>Back to Home</span>
</Link>
</nav>
 
        {/* Post Container */}
<article className="card p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          {/* Post Header */}
<header className="mb-8">
<div className="flex justify-between items-start mb-6">
<div className="flex-1">
<h1 
                  className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
                  style={{ color: "var(--foreground)" }}
>
                  {post.title}
</h1>
</div>
              {session && (
<div className="ml-4">
<PostActions postId={post._id} authorId={post.authorId} />
</div>
              )}
</div>
 
            {/* Post Meta */}
<div 
              className="flex flex-wrap items-center gap-6 text-sm pb-6 border-b" 
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
>
              {/* Author */}
<div className="flex items-center space-x-2">
<div 
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                  style={{ backgroundColor: "var(--accent)" }}
>
                  {post.authorName.charAt(0).toUpperCase()}
</div>
<div>
<p className="font-medium" style={{ color: "var(--foreground)" }}>
                    {post.authorName}
</p>
<p className="text-xs" style={{ color: "var(--muted)" }}>
                    Author
</p>
</div>
</div>
              {/* Date */}
<div className="flex items-center space-x-2">
<CalendarIcon className="h-5 w-5" />
<div>
<p className="font-medium">Published</p>
<p className="text-xs">{formatDate(post.createdAt)}</p>
</div>
</div>
              {/* Reading Time */}
<div className="flex items-center space-x-2">
<ClockIcon className="h-5 w-5" />
<div>
<p className="font-medium">{readingTime} min read</p>
<p className="text-xs">Estimated</p>
</div>
</div>
</div>
</header>
 
          {/* Post Content */}
<div className="prose prose-lg max-w-none">
<div 
              className="leading-relaxed text-lg whitespace-pre-wrap"
              style={{ color: "var(--foreground)", lineHeight: "1.8" }}
>
              {post.content}
</div>
</div>
 
          {/* Post Footer */}
<footer className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
<div className="flex items-center justify-between">
<div className="flex items-center space-x-3">
<div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: "var(--accent)" }}
>
                  {post.authorName.charAt(0).toUpperCase()}
</div>
<div>
<p className="font-semibold" style={{ color: "var(--foreground)" }}>
                    {post.authorName}
</p>
<p className="text-sm" style={{ color: "var(--muted)" }}>
                    Thanks for reading! 👋
</p>
</div>
</div>
<div className="text-right">
<p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  Enjoyed this post?
</p>
<Link 
                  href="/"
                  className="text-sm hover:underline transition-colors"
                  style={{ color: "var(--accent)" }}
>
                  Discover more articles →
</Link>
</div>
</div>
</footer>
</article>
 
        {/* Related Actions */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
<Link 
            href="/"
            className="btn btn-secondary flex items-center justify-center space-x-2"
>
<ArrowLeftIcon className="h-4 w-4" />
<span>Back to all posts</span>
</Link>
          {session && (
<Link 
              href="/create-post"
              className="btn btn-primary flex items-center justify-center space-x-2"
>
<span>Write your own post</span>
</Link>
          )}
</div>
</main>
</div>
  );
}