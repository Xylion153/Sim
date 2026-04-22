import { Trash2, Droplets, Home, Package } from "lucide-react";

const services = [
  {
    icon: Trash2,
    title: "Trash Can Cleaning",
    description:
      "Monthly pressure wash and deodorizing of your outdoor bins. Eliminates bacteria, mold, and odors — so your cans are as clean as your home.",
    color: "bg-sky-50 text-sky-600",
    from: "$15/mo",
  },
  {
    icon: Droplets,
    title: "Driveway & Pavement Wash",
    description:
      "High-pressure cleaning removes oil, algae, tire marks, and years of grime from driveways, walkways, and patios. Curb appeal, restored.",
    color: "bg-indigo-50 text-indigo-600",
    from: "$45/mo",
  },
  {
    icon: Home,
    title: "Home Exterior Wash",
    description:
      "Full exterior wash covering siding, gutters, and windows. Our soft-wash technique is safe for all surfaces and gets into every corner.",
    color: "bg-emerald-50 text-emerald-600",
    from: "$99/mo",
  },
  {
    icon: Package,
    title: "Full Home Bundle",
    description:
      "Our all-in-one plan covers everything — home exterior, driveway, walkways, and trash cans. One subscription, completely covered.",
    color: "bg-amber-50 text-amber-600",
    from: "$149/mo",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Every inch, every month.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pick the plan that fits your needs. All services are delivered on a predictable
            monthly schedule so you never have to think about it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`inline-flex rounded-xl p-3 mb-5 ${service.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {service.description}
                </p>
                <span className="text-sm font-semibold text-sky-600">
                  From {service.from}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
