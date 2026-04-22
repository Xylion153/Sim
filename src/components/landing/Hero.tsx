import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const highlights = [
  "No contracts — cancel anytime",
  "Fully insured technicians",
  "Flexible scheduling",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-slate-50 py-24 md:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-sky-100 opacity-50 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-slate-100 opacity-60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-6">
            Subscription-Based Home Services
          </span>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-none mb-6">
            A cleaner home,{" "}
            <span className="text-sky-500">every month.</span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-8 max-w-2xl">
            SparkleServ handles your exterior cleaning so you never have to think about it.
            Trash cans, driveways, pressure washing, full home exterior — all on autopilot,
            starting at just $15/month.
          </p>

          <div className="flex flex-wrap gap-4 mb-10">
            <Link href="/signup">
              <Button size="lg" className="shadow-lg shadow-sky-200">
                Start Your Plan <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#pricing">
              <Button variant="outline" size="lg">
                See All Plans
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap gap-6">
            {highlights.map((item) => (
              <span key={item} className="flex items-center gap-2 text-sm text-slate-600">
                <CheckCircle2 className="h-4 w-4 text-sky-500 shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
