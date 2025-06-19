"use client";
 
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { PencilIcon, TrashIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
 
interface PostActionsProps {
  postId: string;
  authorId?: string;
}
 
export default function PostActions({ postId, authorId }: PostActionsProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
 
  // Only show actions if user is the author
  const canEdit = session?.user?.id === authorId;
 
  if (!canEdit) return null;
 
  const handleEdit = () => {
    router.push(`/posts/${postId}/edit`);
    setShowMenu(false);
  };
 
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setShowMenu(false);
      return;
    }
 
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/posts/${postId}`, { 
        method: "DELETE" 
      });
 
      if (!res.ok) {
        throw new Error("Failed to delete post");
      }
 
      toast.success("Post deleted successfully");
      router.push('/');
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };
 
  return (
<div className="relative">
<button
        onClick={() => setShowMenu(!showMenu)}
        className="btn btn-ghost p-2"
        aria-label="Post actions"
>
<EllipsisVerticalIcon className="h-5 w-5" />
</button>
 
      {showMenu && (
<>
          {/* Backdrop */}
<div 
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          {/* Menu */}
<div 
            className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg z-20 border py-1"
            style={{ 
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--border)"
            }}
>
<button
              onClick={handleEdit}
              className="flex items-center space-x-2 px-4 py-2 text-sm w-full text-left hover:bg-opacity-10 transition-colors"
              style={{ color: "var(--foreground)" }}
>
<PencilIcon className="h-4 w-4" />
<span>Edit Post</span>
</button>
<button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center space-x-2 px-4 py-2 text-sm w-full text-left text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
>
<TrashIcon className="h-4 w-4" />
<span>{isDeleting ? "Deleting..." : "Delete Post"}</span>
</button>
</div>
</>
      )}
</div>
  );
}