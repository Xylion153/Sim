"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Sparkles,
  LogOut,
  User,
  CreditCard,
  CalendarDays,
  Plus,
  CheckCircle2,
  Clock,
  XCircle,
  PauseCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency, formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

type SubInfo = {
  id: number;
  status: string;
  serviceAddress: string | null;
  serviceCity: string | null;
  serviceState: string | null;
  serviceZip: string | null;
  currentPeriodEnd: string | null;
  planName: string;
  planPrice: number;
  planCategory: string;
  planSlug: string;
};

type ApptInfo = {
  id: number;
  scheduledDate: string;
  scheduledTime: string;
  status: string;
  customerNotes: string | null;
};

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; icon: React.ElementType; className: string }> = {
    active: { label: "Active", icon: CheckCircle2, className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    paused: { label: "Paused", icon: PauseCircle, className: "bg-amber-50 text-amber-700 border-amber-200" },
    cancelled: { label: "Cancelled", icon: XCircle, className: "bg-red-50 text-red-700 border-red-200" },
    scheduled: { label: "Scheduled", icon: Clock, className: "bg-sky-50 text-sky-700 border-sky-200" },
    completed: { label: "Completed", icon: CheckCircle2, className: "bg-slate-50 text-slate-600 border-slate-200" },
    past_due: { label: "Past Due", icon: XCircle, className: "bg-red-50 text-red-700 border-red-200" },
  };
  const c = config[status] ?? config.active;
  const Icon = c.icon;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold", c.className)}>
      <Icon className="h-3 w-3" />
      {c.label}
    </span>
  );
}

function CategoryIcon({ category }: { category: string }) {
  const colors: Record<string, string> = {
    trash: "bg-sky-100 text-sky-600",
    pavement: "bg-indigo-100 text-indigo-600",
    home: "bg-emerald-100 text-emerald-600",
    bundle: "bg-amber-100 text-amber-600",
  };
  return (
    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", colors[category] ?? "bg-slate-100 text-slate-600")}>
      <CreditCard className="h-5 w-5" />
    </div>
  );
}

export function DashboardClient({
  user,
  subscriptions,
  appointments,
}: {
  user: UserInfo;
  subscriptions: SubInfo[];
  appointments: ApptInfo[];
}) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "subscriptions" | "appointments" | "account">("overview");

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  const activeSubs = subscriptions.filter((s) => s.status === "active");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-sky-600">
            <Sparkles className="h-5 w-5" />
            <span className="font-bold text-lg">SparkleServ</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-slate-600">
              Hello, <strong className="text-slate-900">{user.firstName}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              disabled={loggingOut}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Tab nav */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-6 overflow-x-auto">
            {(
              [
                { id: "overview", label: "Overview", icon: Sparkles },
                { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
                { id: "appointments", label: "Appointments", icon: CalendarDays },
                { id: "account", label: "Account", icon: User },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap",
                    activeTab === tab.id
                      ? "border-sky-500 text-sky-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Good to see you, {user.firstName}!
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Here&apos;s a summary of your SparkleServ account.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Active Plans</p>
                <p className="text-3xl font-bold text-slate-900">{activeSubs.length}</p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Monthly Total</p>
                <p className="text-3xl font-bold text-slate-900">
                  {formatCurrency(activeSubs.reduce((sum, s) => sum + s.planPrice, 0))}
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Upcoming Visits</p>
                <p className="text-3xl font-bold text-slate-900">
                  {appointments.filter((a) => a.status === "scheduled").length}
                </p>
              </div>
            </div>

            {/* Active subscriptions */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="font-bold text-slate-900">Your Plans</h2>
                <Link href="/#pricing">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" /> Add Plan
                  </Button>
                </Link>
              </div>
              {subscriptions.length === 0 ? (
                <div className="px-6 py-12 text-center text-slate-500">
                  <p className="mb-4">No active plans yet.</p>
                  <Link href="/#pricing">
                    <Button size="sm">Browse Plans</Button>
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {subscriptions.map((sub) => (
                    <li key={sub.id} className="flex items-center gap-4 px-6 py-4">
                      <CategoryIcon category={sub.planCategory} />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">{sub.planName}</p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {sub.serviceCity ?? "No address set"} •{" "}
                          {formatCurrency(sub.planPrice)}/mo
                        </p>
                      </div>
                      <StatusBadge status={sub.status} />
                      <ChevronRight className="h-4 w-4 text-slate-300" />
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recent appointments */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100">
                <h2 className="font-bold text-slate-900">Upcoming Appointments</h2>
              </div>
              {appointments.length === 0 ? (
                <div className="px-6 py-8 text-center text-slate-500 text-sm">
                  No appointments scheduled yet.
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {appointments.map((appt) => (
                    <li key={appt.id} className="flex items-center gap-4 px-6 py-4">
                      <div className="h-10 w-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 shrink-0">
                        <CalendarDays className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">
                          {formatDate(appt.scheduledDate)}
                        </p>
                        <p className="text-xs text-slate-500">{appt.scheduledTime}</p>
                      </div>
                      <StatusBadge status={appt.status} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}

        {/* SUBSCRIPTIONS TAB */}
        {activeTab === "subscriptions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-slate-900">Subscriptions</h1>
              <Link href="/#pricing">
                <Button size="sm">
                  <Plus className="h-4 w-4" /> Add Plan
                </Button>
              </Link>
            </div>

            {subscriptions.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 px-6 py-16 text-center">
                <p className="text-slate-500 mb-4">You don&apos;t have any subscriptions yet.</p>
                <Link href="/#pricing">
                  <Button>Browse Plans</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <CategoryIcon category={sub.planCategory} />
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900">{sub.planName}</h3>
                        <p className="text-sm text-sky-600 font-semibold">
                          {formatCurrency(sub.planPrice)}/month
                        </p>
                      </div>
                      <StatusBadge status={sub.status} />
                    </div>
                    {sub.serviceAddress && (
                      <p className="text-xs text-slate-500 mb-1">
                        {sub.serviceAddress}, {sub.serviceCity}, {sub.serviceState} {sub.serviceZip}
                      </p>
                    )}
                    {sub.currentPeriodEnd && (
                      <p className="text-xs text-slate-400">
                        Next billing: {formatDate(sub.currentPeriodEnd)}
                      </p>
                    )}
                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Manage
                      </Button>
                      {sub.status === "active" && (
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === "appointments" && (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Appointments</h1>
            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 px-6 py-16 text-center text-slate-500">
                No appointments yet. Appointments are automatically scheduled when you subscribe.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <ul className="divide-y divide-slate-100">
                  {appointments.map((appt) => (
                    <li key={appt.id} className="flex items-center gap-4 px-6 py-5">
                      <div className="h-12 w-12 rounded-xl bg-sky-50 flex flex-col items-center justify-center text-sky-600 shrink-0 text-center">
                        <span className="text-xs font-bold leading-none">
                          {new Date(appt.scheduledDate).toLocaleDateString("en-US", { month: "short" })}
                        </span>
                        <span className="text-lg font-extrabold leading-tight">
                          {new Date(appt.scheduledDate).getDate()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 text-sm">
                          {formatDate(appt.scheduledDate)} at {appt.scheduledTime}
                        </p>
                        {appt.customerNotes && (
                          <p className="text-xs text-slate-500 mt-0.5">{appt.customerNotes}</p>
                        )}
                      </div>
                      <StatusBadge status={appt.status} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === "account" && (
          <div className="space-y-6 max-w-lg">
            <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="font-bold text-slate-900">Profile</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">First name</p>
                  <p className="font-medium text-slate-900">{user.firstName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Last name</p>
                  <p className="font-medium text-slate-900">{user.lastName}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Email</p>
                  <p className="font-medium text-slate-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs mb-0.5">Phone</p>
                  <p className="font-medium text-slate-900">{user.phone ?? "—"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Edit Profile</Button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="font-bold text-slate-900">Password</h2>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>

            <div className="bg-white rounded-2xl border border-red-100 p-6 space-y-3">
              <h2 className="font-bold text-red-600">Danger Zone</h2>
              <p className="text-sm text-slate-500">
                Permanently delete your account and all associated data.
              </p>
              <Button variant="danger" size="sm">Delete Account</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
