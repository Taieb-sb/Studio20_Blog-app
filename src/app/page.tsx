import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Hero from "@/components/Hero";
import { BookOpenIcon, UsersIcon, PencilIcon } from "@heroicons/react/24/outline";
 
type Post = {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
};
 
async function getPosts(): Promise<Post[]> {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts`, { 
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
 
export default async function HomePage() {
  const posts = await getPosts();
 
  const stats = [
    {
      name: "Total Posts",
      value: posts.length.toString(),
      icon: BookOpenIcon,
    },
    {
      name: "Authors",
      value: new Set(posts.map(post => post.authorName)).size.toString(),
      icon: UsersIcon,
    },
    {
      name: "This Month",
      value: posts.filter(post => {
        const postDate = new Date(post.createdAt);
        const now = new Date();
        return postDate.getMonth() === now.getMonth() && 
               postDate.getFullYear() === now.getFullYear();
      }).length.toString(),
      icon: PencilIcon,
    },
  ];
 
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50" 
         style={{ backgroundColor: "var(--background)" }}>
<Header />
      {/* Hero Section */}
<Hero />
      {/* Stats Section */}
<section className="py-12 border-b" style={{ borderColor: "var(--border)" }}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {stats.map((stat) => (
<div key={stat.name} className="card p-6 text-center animate-fade-in">
<stat.icon className="mx-auto h-8 w-8 mb-3" style={{ color: "var(--accent)" }} />
<div className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  {stat.value}
</div>
<div className="text-sm" style={{ color: "var(--muted)" }}>
                  {stat.name}
</div>
</div>
            ))}
</div>
</div>
</section>
 
      {/* Posts Section */}
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="flex justify-between items-center mb-8">
<div>
<h2 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
              Latest Posts
</h2>
<p style={{ color: "var(--muted)" }}>
              Discover insights, tutorials, and stories from our community
</p>
</div>
</div>
 
        {posts.length === 0 ? (
<div className="card p-12 text-center">
<BookOpenIcon className="mx-auto h-16 w-16 mb-4" style={{ color: "var(--muted)" }} />
<h3 className="text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              No posts yet
</h3>
<p className="mb-6" style={{ color: "var(--muted)" }}>
              Be the first to share your thoughts and ideas with the community.
</p>
</div>
        ) : (
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
<div
                key={post._id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
>
<PostCard post={post} />
</div>
            ))}
</div>
        )}
 
        {posts.length > 0 && (
<div className="mt-12 text-center">
<p style={{ color: "var(--muted)" }}>
              Showing {posts.length} post{posts.length !== 1 ? 's' : ''}
</p>
</div>
        )}
</main>
 
      {/* Footer */}
<footer className="border-t py-12" style={{ borderColor: "var(--border)" }}>
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="text-center">
<h3 className="text-lg font-semibold mb-2" style={{ color: "var(--foreground)" }}>
              Studio Blog
</h3>
<p style={{ color: "var(--muted)" }}>
              Built with Next.js, MongoDB, and NextAuth.js
</p>
</div>
</div>
</footer>
</div>
  );
}