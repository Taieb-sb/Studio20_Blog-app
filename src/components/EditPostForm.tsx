"use client";
 
import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { DocumentTextIcon, EyeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import Link from "next/link";
 
interface Post {

  _id: string;

  title: string;

  content: string;

  authorName: string;

  createdAt: string;

}
 
interface EditPostFormProps {

  post: Post;

}
 
export default function EditPostForm({ post }: EditPostFormProps) {

  const router = useRouter();

  const [form, setForm] = useState({ 

    title: post.title, 

    content: post.content 

  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [preview, setPreview] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.title.trim() || !form.content.trim()) {

      toast.error("Please fill in all fields");

      return;

    }
 
    setIsSubmitting(true);
 
    try {

      const res = await fetch(`/api/posts/${post._id}`, {

        method: 'PUT',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(form),

      });
 
      if (!res.ok) {

        const errorData = await res.json();

        throw new Error(errorData.message || "Failed to update post");

      }
 
      toast.success("Post updated successfully!");

      router.push(`/posts/${post._id}`);

      router.refresh();

    } catch (error) {

      toast.error(error instanceof Error ? error.message : "An error occurred");

    } finally {

      setIsSubmitting(false);

    }

  };
 
  const handleCancel = () => {

    if (form.title !== post.title || form.content !== post.content) {

      if (confirm("Are you sure you want to discard your changes?")) {

        router.push(`/posts/${post._id}`);

      }

    } else {

      router.push(`/posts/${post._id}`);

    }

  };
 
  return (
<div className="space-y-6">

      {/* Breadcrumb */}
<nav className="flex items-center space-x-2 text-sm">
<Link 

          href="/" 

          className="hover:underline transition-colors"

          style={{ color: "var(--muted)" }}
>

          Home
</Link>
<span style={{ color: "var(--muted)" }}>/</span>
<Link 

          href={`/posts/${post._id}`}

          className="hover:underline transition-colors"

          style={{ color: "var(--muted)" }}
>

          {post.title}
</Link>
<span style={{ color: "var(--muted)" }}>/</span>
<span style={{ color: "var(--foreground)" }}>Edit</span>
</nav>
 
      {/* Header */}
<div className="flex items-center space-x-3">
<Link 

          href={`/posts/${post._id}`}

          className="btn btn-ghost p-2"
>
<ArrowLeftIcon className="h-5 w-5" />
</Link>
<div>
<h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>

            Edit Post
</h1>
<p style={{ color: "var(--muted)" }}>

            Make changes to your blog post
</p>
</div>
</div>
 
      {/* Form */}
<div className="card p-6">
<form onSubmit={handleSubmit} className="space-y-6">

          {/* Title Input */}
<div>
<label 

              htmlFor="title" 

              className="block text-sm font-medium mb-2"

              style={{ color: "var(--foreground)" }}
>

              Post Title *
</label>
<input

              id="title"

              type="text"

              value={form.title}

              onChange={(e) => setForm({ ...form, title: e.target.value })}

              className="input w-full text-lg"

              maxLength={100}

              required

            />
<div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>

              {form.title.length}/100 characters
</div>
</div>
 
          {/* Content Input */}
<div>
<div className="flex items-center justify-between mb-2">
<label 

                htmlFor="content" 

                className="block text-sm font-medium"

                style={{ color: "var(--foreground)" }}
>

                Content *
</label>
<button

                type="button"

                onClick={() => setPreview(!preview)}

                className="btn btn-ghost text-sm flex items-center space-x-1"
>
<EyeIcon className="h-4 w-4" />
<span>{preview ? "Edit" : "Preview"}</span>
</button>
</div>
 
            {preview ? (
<div 

                className="min-h-[300px] p-4 border rounded-md prose max-w-none"

                style={{ 

                  backgroundColor: "var(--sidebar-bg)",

                  borderColor: "var(--border)",

                  color: "var(--foreground)"

                }}
>
<div className="whitespace-pre-wrap">{form.content}</div>
</div>

            ) : (
<textarea

                id="content"

                value={form.content}

                onChange={(e) => setForm({ ...form, content: e.target.value })}

                className="input w-full resize-none"

                rows={12}

                required

              />

            )}
</div>
 
          {/* Form Actions */}
<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
<button

              type="submit"

              disabled={isSubmitting}

              className="btn btn-primary flex items-center justify-center space-x-2"
>

              {isSubmitting ? (
<>
<div className="spinner" />
<span>Updating...</span>
</>

              ) : (
<>
<DocumentTextIcon className="h-4 w-4" />
<span>Update Post</span>
</>

              )}
</button>
<button

              type="button"

              onClick={handleCancel}

              disabled={isSubmitting}

              className="btn btn-secondary"
>

              Cancel
</button>
</div>
</form>
</div>
</div>

  );

}