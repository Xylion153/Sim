import Link from "next/link";
import { Sparkles } from "lucide-react";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign In — SparkleServ",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4">
      <div className="mx-auto w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 text-sky-600 mb-8">
          <Sparkles className="h-7 w-7" />
          <span className="text-2xl font-bold tracking-tight">SparkleServ</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-8">
            Sign in to manage your subscriptions and appointments.
          </p>
          <LoginForm searchParams={searchParams} />
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-sky-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
