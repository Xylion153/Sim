-- SparkleServ Initial Schema

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS plans (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price REAL NOT NULL,
  interval TEXT NOT NULL DEFAULT 'monthly',
  features TEXT NOT NULL,
  category TEXT NOT NULL,
  is_active INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan_id INTEGER NOT NULL REFERENCES plans(id),
  status TEXT NOT NULL DEFAULT 'active',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  current_period_start TEXT,
  current_period_end TEXT,
  cancelled_at TEXT,
  service_address TEXT,
  service_city TEXT,
  service_state TEXT,
  service_zip TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  subscription_id INTEGER NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  scheduled_date TEXT NOT NULL,
  scheduled_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled',
  technician_notes TEXT,
  customer_notes TEXT,
  completed_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS service_areas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL UNIQUE,
  is_active INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- ─── Seed Plans ───────────────────────────────────────────────────────────────

INSERT INTO plans (slug, name, description, price, interval, features, category, sort_order) VALUES
(
  'trash-basic',
  'Trash Can Clean',
  'Monthly deep clean and pressure wash of your outdoor trash cans. Deodorized and sanitized — ready for another month.',
  15.00,
  'monthly',
  '["Monthly pressure wash","Sanitizing deodorizer spray","Up to 2 trash cans","Curbside service"]',
  'trash',
  1
),
(
  'trash-pro',
  'Trash Can Clean Pro',
  'Everything in Trash Can Clean, plus a second visit mid-month and coverage for up to 4 cans.',
  25.00,
  'monthly',
  '["Bi-monthly pressure wash","Sanitizing deodorizer spray","Up to 4 trash cans","Curbside service","Priority scheduling"]',
  'trash',
  2
),
(
  'pavement-basic',
  'Driveway & Pavement Wash',
  'Monthly pressure wash of your driveway, walkways, and patio surfaces. Remove oil stains, algae, and grime.',
  45.00,
  'monthly',
  '["Monthly pressure wash","Driveway + walkways","Patio/deck surface","Stain pre-treatment","Up to 1,500 sq ft"]',
  'pavement',
  3
),
(
  'pavement-pro',
  'Driveway & Pavement Pro',
  'Bi-monthly pressure washing with expanded square footage and surface sealing available as an add-on.',
  75.00,
  'monthly',
  '["Bi-monthly pressure wash","Driveway + walkways + patio","Stain pre-treatment","Up to 3,000 sq ft","Priority scheduling"]',
  'pavement',
  4
),
(
  'home-essential',
  'Home Essential',
  'Full exterior home pressure washing once a month. Includes siding, gutters, windows (exterior), and entryways.',
  99.00,
  'monthly',
  '["Monthly exterior wash","Siding & gutters","Exterior windows","Front & back entryways","Up to 2,000 sq ft home"]',
  'home',
  5
),
(
  'home-complete',
  'Home Complete',
  'Our most comprehensive plan. Full exterior wash plus driveway, walkways, and trash cans — everything covered.',
  149.00,
  'monthly',
  '["Monthly exterior wash","Siding, gutters & windows","Driveway + walkways","2 trash cans included","Up to 3,500 sq ft","Priority scheduling","Dedicated technician"]',
  'bundle',
  6
);
