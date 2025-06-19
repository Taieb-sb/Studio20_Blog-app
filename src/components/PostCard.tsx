import Link from "next/link";
import { CalendarIcon, UserIcon, ClockIcon } from "@heroicons/react/24/outline";
 
interface Post {
  _id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}
 
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
 
function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
 
function truncateContent(content: string, maxLength: number = 150): string {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + "...";
}
 
export default function PostCard({ post }: { post: Post }) {
  const readingTime = getReadingTime(post.content);
 
  return (
<article className="card p-6 group hover:shadow-lg transition-all duration-200">
<div className="space-y-4">
        {/* Post Title */}
<div>
<Link 
            href={`/posts/${post._id}`}
            className="block group-hover:opacity-80 transition-opacity"
>
<h3 
              className="text-xl font-semibold line-clamp-2 leading-tight"
              style={{ color: "var(--foreground)" }}
>
              {post.title}
</h3>
</Link>
</div>
 
        {/* Post Excerpt */}
<div>
<p 
            className="text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
>
            {truncateContent(post.content)}
</p>
</div>
 
        {/* Post Meta */}
<div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "var(--border)" }}>
<div className="flex items-center space-x-4 text-sm" style={{ color: "var(--muted)" }}>
            {/* Author */}
<div className="flex items-center space-x-1">
<div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                style={{ backgroundColor: "var(--accent)" }}
>
                {post.authorName.charAt(0).toUpperCase()}
</div>
<span className="font-medium">
                {post.authorName}
</span>
</div>
 
            {/* Date */}
<div className="flex items-center space-x-1">
<CalendarIcon className="h-4 w-4" />
<span>{formatDate(post.createdAt)}</span>
</div>
 
            {/* Reading Time */}
<div className="flex items-center space-x-1">
<ClockIcon className="h-4 w-4" />
<span>{readingTime} min read</span>
</div>
</div>
 
          {/* Read More Link */}
<Link 
            href={`/posts/${post._id}`}
            className="text-sm font-medium hover:underline transition-colors"
            style={{ color: "var(--accent)" }}
>
            Read more →
</Link>
</div>
</div>
</article>
  );
}