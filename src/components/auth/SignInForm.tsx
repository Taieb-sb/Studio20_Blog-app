"use client";
 
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  BookOpenIcon,
  ArrowRightIcon 
} from "@heroicons/react/24/outline";
 
export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
 
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
      });
 
      if (res?.error) {
        toast.error("Invalid credentials. Please try again.");
      } else {
        toast.success("Welcome back!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
<div className="w-full max-w-md mx-auto">
      {/* Header */}
<div className="text-center mb-8">
<Link href="/" className="inline-flex items-center space-x-2 mb-6">
<BookOpenIcon className="h-8 w-8" style={{ color: "var(--accent)" }} />
<span className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>
            Studio Blog
</span>
</Link>
<h1 className="text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
          Welcome back
</h1>
<p style={{ color: "var(--muted)" }}>
          Sign in to your account to continue writing and sharing
</p>
</div>
 
      {/* Form Card */}
<div className="card p-8">
<form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
<div>
<label 
              htmlFor="email" 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
>
              Email address
</label>
<input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="input w-full"
              required
              disabled={isLoading}
            />
</div>
 
          {/* Password Field */}
<div>
<label 
              htmlFor="password" 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
>
              Password
</label>
<div className="relative">
<input
                id="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                className="input w-full pr-10"
                required
                disabled={isLoading}
              />
<button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                disabled={isLoading}
>
                {showPassword ? (
<EyeSlashIcon className="h-5 w-5" style={{ color: "var(--muted)" }} />
                ) : (
<EyeIcon className="h-5 w-5" style={{ color: "var(--muted)" }} />
                )}
</button>
</div>
</div>
 
          {/* Submit Button */}
<button
            type="submit"
            disabled={isLoading || !form.email || !form.password}
            className="btn btn-primary w-full flex items-center justify-center space-x-2"
>
            {isLoading ? (
<>
<div className="spinner" />
<span>Signing in...</span>
</>
            ) : (
<>
<span>Sign in</span>
<ArrowRightIcon className="h-4 w-4" />
</>
            )}
</button>
</form>
 
        {/* Divider */}
<div className="relative my-6">
<div className="absolute inset-0 flex items-center">
<div className="w-full border-t" style={{ borderColor: "var(--border)" }} />
</div>
<div className="relative flex justify-center text-sm">
<span 
              className="px-2"
              style={{ 
                backgroundColor: "var(--card-bg)", 
                color: "var(--muted)" 
              }}
>
</span>
</div>
</div>
 
        {/* Sign Up Link */}
<div className="text-center">
<Link 
            href="/auth/signup"
            className="btn btn-secondary w-full"
>
            Create new account
</Link>
</div>
</div>
 
      {/* Footer Links */}
<div className="mt-8 text-center space-y-4">
<div className="flex items-center justify-center space-x-6 text-sm">
<Link 
            href="/"
            className="hover:underline transition-colors"
            style={{ color: "var(--muted)" }}
>
            ← Back to home
</Link>
<Link 
            href="/forgot-password"
            className="hover:underline transition-colors"
            style={{ color: "var(--muted)" }}
>
            Forgot password?
</Link>
</div>
<p className="text-xs" style={{ color: "var(--muted)" }}>
          By signing in, you agree to our Terms of Service and Privacy Policy
</p>
</div>
</div>
  );
}