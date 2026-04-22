"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function SignupForm({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Failed to create account.");
        return;
      }

      const params = await searchParams;
      if (params.plan) {
        router.push(`/dashboard/subscribe?plan=${params.plan}`);
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          id="firstName"
          label="First name"
          placeholder="Jane"
          value={form.firstName}
          onChange={update("firstName")}
          required
          autoComplete="given-name"
        />
        <Input
          id="lastName"
          label="Last name"
          placeholder="Smith"
          value={form.lastName}
          onChange={update("lastName")}
          required
          autoComplete="family-name"
        />
      </div>
      <Input
        id="email"
        type="email"
        label="Email address"
        placeholder="you@example.com"
        value={form.email}
        onChange={update("email")}
        required
        autoComplete="email"
      />
      <Input
        id="phone"
        type="tel"
        label="Phone number"
        placeholder="(555) 555-0100"
        value={form.phone}
        onChange={update("phone")}
        autoComplete="tel"
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Min. 8 characters"
        value={form.password}
        onChange={update("password")}
        required
        autoComplete="new-password"
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm password"
        placeholder="Re-enter password"
        value={form.confirmPassword}
        onChange={update("confirmPassword")}
        required
        autoComplete="new-password"
      />

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full mt-1">
        {loading ? "Creating account…" : "Create Account"}
      </Button>

      <p className="text-center text-xs text-slate-400">
        By creating an account you agree to our{" "}
        <a href="/terms" className="text-sky-600 hover:underline">Terms</a>
        {" "}and{" "}
        <a href="/privacy" className="text-sky-600 hover:underline">Privacy Policy</a>.
      </p>
    </form>
  );
}
