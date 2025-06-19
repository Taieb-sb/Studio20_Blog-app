"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { DocumentTextIcon, EyeIcon } from "@heroicons/react/24/outline";
 
export default function CreatePostForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [form, setForm] = useState({ title: "", content: "" });
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
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
 
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create post");
      }
 
      toast.success("Post created successfully!");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
 
  const handleCancel = () => {
    if (form.title || form.content) {
      if (confirm("Are you sure you want to discard your changes?")) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  };
 
  return (
<div className="space-y-6">
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
            placeholder="Enter an engaging title for your post..."
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
              {form.content ? (
<div className="whitespace-pre-wrap">{form.content}</div>
              ) : (
<p style={{ color: "var(--muted)" }}>Nothing to preview yet...</p>
              )}
</div>
          ) : (
<textarea
              id="content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="Write your post content here... You can use markdown formatting."
              className="input w-full resize-none"
              rows={12}
              required
            />
          )}
<div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
            {form.content.length} characters • Markdown supported
</div>
</div>
 
        {/* Author Preview */}
<div 
          className="p-4 rounded-lg border"
          style={{ 
            backgroundColor: "var(--sidebar-bg)",
            borderColor: "var(--border)"
          }}
>
<h4 className="text-sm font-medium mb-2" style={{ color: "var(--foreground)" }}>
            Post Preview
</h4>
<div className="flex items-center space-x-3">
<div 
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: "var(--accent)" }}
>
              {session?.user?.name?.charAt(0).toUpperCase() || 'U'}
</div>
<div>
<p className="font-medium" style={{ color: "var(--foreground)" }}>
                {session?.user?.name || 'Anonymous'}
</p>
<p className="text-sm" style={{ color: "var(--muted)" }}>
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
</p>
</div>
</div>
</div>
 
        {/* Form Actions */}
<div className="flex flex-col sm:flex-row gap-3 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
<button
            type="submit"
            disabled={isSubmitting || !form.title.trim() || !form.content.trim()}
            className="btn btn-primary flex items-center justify-center space-x-2 order-2 sm:order-1"
>
            {isSubmitting ? (
<>
<div className="spinner" />
<span>Publishing...</span>
</>
            ) : (
<>
<DocumentTextIcon className="h-4 w-4" />
<span>Publish Post</span>
</>
            )}
</button>
<button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="btn btn-secondary order-1 sm:order-2"
>
            Cancel
</button>
</div>
</form>
</div>
  );
}