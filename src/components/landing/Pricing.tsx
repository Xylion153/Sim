import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

const plans = [
  {
    slug: "trash-basic",
    name: "Trash Can Clean",
    price: 15,
    description: "Monthly deep clean for your outdoor bins.",
    features: ["Monthly pressure wash", "Sanitizing deodorizer spray", "Up to 2 trash cans", "Curbside service"],
    category: "trash",
    featured: false,
  },
  {
    slug: "trash-pro",
    name: "Trash Can Clean Pro",
    price: 25,
    description: "Bi-monthly service for up to 4 cans.",
    features: ["Bi-monthly pressure wash", "Sanitizing deodorizer spray", "Up to 4 trash cans", "Curbside service", "Priority scheduling"],
    category: "trash",
    featured: false,
  },
  {
    slug: "pavement-basic",
    name: "Driveway & Pavement",
    price: 45,
    description: "Monthly driveway, walkway, and patio wash.",
    features: ["Monthly pressure wash", "Driveway + walkways", "Patio/deck surface", "Stain pre-treatment", "Up to 1,500 sq ft"],
    category: "pavement",
    featured: false,
  },
  {
    slug: "pavement-pro",
    name: "Driveway & Pavement Pro",
    price: 75,
    description: "Bi-monthly wash for larger properties.",
    features: ["Bi-monthly pressure wash", "Driveway + walkways + patio", "Stain pre-treatment", "Up to 3,000 sq ft", "Priority scheduling"],
    category: "pavement",
    featured: false,
  },
  {
    slug: "home-essential",
    name: "Home Essential",
    price: 99,
    description: "Full exterior home wash every month.",
    features: ["Monthly exterior wash", "Siding & gutters", "Exterior windows", "Front & back entryways", "Up to 2,000 sq ft home"],
    category: "home",
    featured: false,
  },
  {
    slug: "home-complete",
    name: "Home Complete",
    price: 149,
    description: "Everything covered — our most popular plan.",
    features: ["Monthly exterior wash", "Siding, gutters & windows", "Driveway + walkways", "2 trash cans included", "Up to 3,500 sq ft", "Priority scheduling", "Dedicated technician"],
    category: "bundle",
    featured: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-4">
            Simple Pricing
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Pick your plan.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            All plans are month-to-month. No contracts, no surprise fees.
            Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.slug}
              className={cn(
                "relative rounded-2xl bg-white border p-8 flex flex-col transition-shadow",
                plan.featured
                  ? "border-sky-400 shadow-xl shadow-sky-100 ring-2 ring-sky-400"
                  : "border-slate-200 shadow-sm hover:shadow-md"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-500 px-4 py-1 text-xs font-bold text-white shadow">
                    <Star className="h-3 w-3 fill-white" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold text-slate-900">
                  {formatCurrency(plan.price)}
                </span>
                <span className="text-slate-500 text-sm">/month</span>
              </div>

              <ul className="flex flex-col gap-2.5 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="h-4 w-4 text-sky-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href={`/signup?plan=${plan.slug}`} className="mt-auto">
                <Button
                  variant={plan.featured ? "primary" : "outline"}
                  size="md"
                  className="w-full"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-500 mt-10">
          All prices are per month. Taxes may apply based on your service area.
          Need a custom plan?{" "}
          <a href="#contact" className="text-sky-600 font-medium hover:underline">
            Contact us.
          </a>
        </p>
      </div>
    </section>
  );
}
