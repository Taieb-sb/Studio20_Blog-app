"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { 
  EyeIcon, 
  EyeSlashIcon, 
  BookOpenIcon,
  CheckCircleIcon,
  XCircleIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";
 
interface PasswordStrength {
  score: number;
  feedback: string[];
}
 
export default function SignUpForm() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const validatePassword = (password: string): PasswordStrength => {
    const feedback: string[] = [];
    let score = 0;
 
    if (password.length >= 8) score++;
    else feedback.push("At least 8 characters");
 
    if (/[A-Z]/.test(password)) score++;
    else feedback.push("One uppercase letter");
 
    if (/[a-z]/.test(password)) score++;
    else feedback.push("One lowercase letter");
 
    if (/\d/.test(password)) score++;
    else feedback.push("One number");
 
    if (/[!@#$%^&*]/.test(password)) score++;
    else feedback.push("One special character");
 
    return { score, feedback };
  };
 
  const passwordStrength = validatePassword(form.password);
  const isValidPassword = passwordStrength.score >= 4;
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPassword) {
      toast.error("Please meet all password requirements");
      return;
    }
 
    setIsLoading(true);
 
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
 
      const data = await res.json();
 
      if (res.ok) {
        toast.success("Account created successfully! Please sign in.");
        router.push("/auth/signin");
      } else {
        toast.error(data.message || "Failed to create account");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  const getPasswordStrengthColor = (score: number) => {
    if (score < 2) return "text-red-500";
    if (score < 4) return "text-yellow-500";
    return "text-green-500";
  };
 
  const getPasswordStrengthText = (score: number) => {
    if (score < 2) return "Weak";
    if (score < 4) return "Fair";
    return "Strong";
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
          Join our community
</h1>
<p style={{ color: "var(--muted)" }}>
          Create your account and start sharing your stories
</p>
</div>
 
      {/* Form Card */}
<div className="card p-8">
<form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
<div>
<label 
              htmlFor="name" 
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
>
              Full name
</label>
<input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="input w-full"
              required
              disabled={isLoading}
            />
</div>
 
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
                placeholder="Create a strong password"
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
 
            {/* Password Strength Indicator */}
            {form.password && (
<div className="mt-3">
<div className="flex items-center justify-between mb-2">
<span className="text-sm" style={{ color: "var(--muted)" }}>
                    Password strength:
</span>
<span className={`text-sm font-medium ${getPasswordStrengthColor(passwordStrength.score)}`}>
                    {getPasswordStrengthText(passwordStrength.score)}
</span>
</div>
                {/* Progress bar */}
<div className="w-full bg-gray-200 rounded-full h-2 mb-3">
<div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      passwordStrength.score < 2 ? 'bg-red-500' :
                      passwordStrength.score < 4 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                  />
</div>
 
                {/* Requirements */}
<div className="space-y-1">
                  {passwordStrength.feedback.map((requirement, index) => (
<div key={index} className="flex items-center space-x-2 text-xs">
<XCircleIcon className="h-3 w-3 text-red-500" />
<span style={{ color: "var(--muted)" }}>{requirement}</span>
</div>
                  ))}
                  {passwordStrength.score >= 4 && (
<div className="flex items-center space-x-2 text-xs">
<CheckCircleIcon className="h-3 w-3 text-green-500" />
<span className="text-green-500">All requirements met!</span>
</div>
                  )}
</div>
</div>
            )}
</div>
 
          {/* Submit Button */}
<button
            type="submit"
            disabled={isLoading || !form.name || !form.email || !isValidPassword}
            className="btn btn-primary w-full flex items-center justify-center space-x-2"
>
            {isLoading ? (
<>
<div className="spinner" />
<span>Creating account...</span>
</>
            ) : (
<>
<UserPlusIcon className="h-4 w-4" />
<span>Create account</span>
</>
            )}
</button>
 
          {/* Terms */}
<p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            By creating an account, you agree to our{" "}
<Link href="/terms" className="hover:underline" style={{ color: "var(--accent)" }}>
              Terms of Service
</Link>{" "}
            and{" "}
<Link href="/privacy" className="hover:underline" style={{ color: "var(--accent)" }}>
              Privacy Policy
</Link>
</p>
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
              Already have an account?
</span>
</div>
</div>
 
        {/* Sign In Link */}
<div className="text-center">
<Link 
            href="/auth/signin"
            className="btn btn-secondary w-full"
>
            Sign in instead
</Link>
</div>
</div>
 
      {/* Footer Links */}
<div className="mt-8 text-center">
<Link 
          href="/"
          className="text-sm hover:underline transition-colors"
          style={{ color: "var(--muted)" }}
>
          ← Back to home
</Link>
</div>
</div>
  );
}