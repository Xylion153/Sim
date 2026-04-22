import { sql } from "drizzle-orm";
import {
  integer,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

// ─── Users ───────────────────────────────────────────────────────────────────

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zip: text("zip"),
  role: text("role", { enum: ["customer", "admin"] }).notNull().default("customer"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Plans ────────────────────────────────────────────────────────────────────

export const plans = sqliteTable("plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: real("price").notNull(),           // monthly price in USD
  interval: text("interval", { enum: ["monthly", "quarterly", "annual"] }).notNull().default("monthly"),
  features: text("features").notNull(),     // JSON array stored as text
  category: text("category", {
    enum: ["trash", "pavement", "home", "bundle"],
  }).notNull(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Subscriptions ────────────────────────────────────────────────────────────

export const subscriptions = sqliteTable("subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  planId: integer("plan_id")
    .notNull()
    .references(() => plans.id),
  status: text("status", {
    enum: ["active", "paused", "cancelled", "past_due"],
  }).notNull().default("active"),
  stripeSubscriptionId: text("stripe_subscription_id"),
  stripeCustomerId: text("stripe_customer_id"),
  currentPeriodStart: text("current_period_start"),
  currentPeriodEnd: text("current_period_end"),
  cancelledAt: text("cancelled_at"),
  serviceAddress: text("service_address"),
  serviceCity: text("service_city"),
  serviceState: text("service_state"),
  serviceZip: text("service_zip"),
  notes: text("notes"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Appointments ─────────────────────────────────────────────────────────────

export const appointments = sqliteTable("appointments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subscriptionId: integer("subscription_id")
    .notNull()
    .references(() => subscriptions.id, { onDelete: "cascade" }),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  scheduledDate: text("scheduled_date").notNull(),   // ISO date string
  scheduledTime: text("scheduled_time").notNull(),   // "09:00", "13:30", etc.
  status: text("status", {
    enum: ["scheduled", "completed", "cancelled", "no_show"],
  }).notNull().default("scheduled"),
  technicianNotes: text("technician_notes"),
  customerNotes: text("customer_notes"),
  completedAt: text("completed_at"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Service Areas ────────────────────────────────────────────────────────────

export const serviceAreas = sqliteTable("service_areas", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull().unique(),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),              // UUID
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`),
});

// ─── Type exports ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Plan = typeof plans.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type Session = typeof sessions.$inferSelect;
