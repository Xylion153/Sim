import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section id="contact" className="py-24 bg-sky-500">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
          Ready for a cleaner home?
        </h2>
        <p className="text-sky-100 text-lg max-w-xl mx-auto mb-10">
          Join hundreds of homeowners who've automated their home cleaning.
          Start today — first month guaranteed.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-sky-600 hover:bg-sky-50 shadow-xl shadow-sky-700/30"
            >
              Get Started Today <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/#pricing">
            <Button
              variant="ghost"
              size="lg"
              className="text-white hover:bg-sky-400"
            >
              View All Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
