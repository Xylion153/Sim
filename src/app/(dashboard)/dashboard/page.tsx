import { redirect } from "next/navigation";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb } from "@/db/client";
import { users, subscriptions, appointments, plans } from "@/db/schema";
import { getSessionUserId } from "@/lib/auth";
import { eq, desc } from "drizzle-orm";
import { DashboardClient } from "./DashboardClient";

export const runtime = "edge";

export const metadata = {
  title: "Dashboard — SparkleServ",
};

export default async function DashboardPage() {
  const userId = await getSessionUserId();
  if (!userId) redirect("/login?redirect=/dashboard");

  const { env } = getRequestContext();
  const db = getDb(env as { DB: D1Database });

  const user = await db
    .select({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      phone: users.phone,
    })
    .from(users)
    .where(eq(users.id, userId))
    .get();

  if (!user) redirect("/login");

  const userSubs = await db
    .select({
      id: subscriptions.id,
      status: subscriptions.status,
      serviceAddress: subscriptions.serviceAddress,
      serviceCity: subscriptions.serviceCity,
      serviceState: subscriptions.serviceState,
      serviceZip: subscriptions.serviceZip,
      currentPeriodEnd: subscriptions.currentPeriodEnd,
      planName: plans.name,
      planPrice: plans.price,
      planCategory: plans.category,
      planSlug: plans.slug,
    })
    .from(subscriptions)
    .innerJoin(plans, eq(subscriptions.planId, plans.id))
    .where(eq(subscriptions.userId, userId))
    .all();

  const upcomingAppointments = await db
    .select({
      id: appointments.id,
      scheduledDate: appointments.scheduledDate,
      scheduledTime: appointments.scheduledTime,
      status: appointments.status,
      customerNotes: appointments.customerNotes,
    })
    .from(appointments)
    .where(eq(appointments.userId, userId))
    .orderBy(desc(appointments.scheduledDate))
    .limit(5)
    .all();

  return (
    <DashboardClient
      user={user}
      subscriptions={userSubs}
      appointments={upcomingAppointments}
    />
  );
}
