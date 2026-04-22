import { ClipboardList, CreditCard, CalendarCheck, Star } from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    step: "01",
    title: "Pick your plan",
    description:
      "Choose the service level that fits your home. Mix and match or start simple — you can always upgrade.",
  },
  {
    icon: CreditCard,
    step: "02",
    title: "Subscribe & set up",
    description:
      "Create your account, enter your address, and subscribe. Your first appointment is scheduled automatically.",
  },
  {
    icon: CalendarCheck,
    step: "03",
    title: "We show up monthly",
    description:
      "Our team arrives on your scheduled day. No need to be home — we work around you.",
  },
  {
    icon: Star,
    step: "04",
    title: "Enjoy a clean home",
    description:
      "That's it. Your home stays clean every month without lifting a finger.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block rounded-full bg-sky-100 px-4 py-1.5 text-sm font-semibold text-sky-700 mb-4">
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
            Simple as it gets.
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Four steps to a cleaner home — and then you never have to think about it again.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.step} className="relative flex flex-col items-start">
                {/* Connector line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-slate-200 -translate-y-1/2 z-0" />
                )}
                <div className="relative z-10 flex items-center justify-center h-12 w-12 rounded-xl bg-sky-500 text-white mb-5 shadow-md shadow-sky-200">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold tracking-widest text-sky-400 mb-1 uppercase">
                  Step {step.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
