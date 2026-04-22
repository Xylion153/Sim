import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    location: "Raleigh, NC",
    text: "My trash cans used to be absolutely disgusting in the summer. Two months in and it's like a completely different experience. Totally worth every penny.",
    stars: 5,
  },
  {
    name: "James T.",
    location: "Charlotte, NC",
    text: "The driveway plan has transformed our curb appeal. The oil stains I thought were permanent are completely gone. Easy 5 stars.",
    stars: 5,
  },
  {
    name: "Priya K.",
    location: "Durham, NC",
    text: "We did the full home bundle and the house looks brand new. The team is professional, fast, and thorough. I've already recommended SparkleServ to three neighbors.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-4">
            What Customers Say
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            People love it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
            >
              <Stars count={t.stars} />
              <p className="mt-4 text-slate-700 leading-relaxed text-sm">&ldquo;{t.text}&rdquo;</p>
              <div className="mt-6 pt-5 border-t border-slate-100">
                <p className="font-bold text-slate-900 text-sm">{t.name}</p>
                <p className="text-xs text-slate-400">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
