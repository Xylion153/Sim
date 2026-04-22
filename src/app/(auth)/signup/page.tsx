import Link from "next/link";
import { Sparkles } from "lucide-react";
import { SignupForm } from "./SignupForm";

export const metadata = {
  title: "Create Account — SparkleServ",
};

export default function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4">
      <div className="mx-auto w-full max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 text-sky-600 mb-8">
          <Sparkles className="h-7 w-7" />
          <span className="text-2xl font-bold tracking-tight">SparkleServ</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-8">
            Join SparkleServ and start your first subscription today.
          </p>
          <SignupForm searchParams={searchParams} />
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-600 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
