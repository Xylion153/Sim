import Link from "next/link";
import { Sparkles, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white mb-4">
              <Sparkles className="h-6 w-6 text-sky-400" />
              <span className="text-xl font-bold">SparkleServ</span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              Professional residential cleaning and pressure washing services on a subscription basis.
              Set it and forget it — we show up, you enjoy a clean home.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm">
              <a href="tel:+15555550100" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                <Phone className="h-4 w-4" /> (555) 555-0100
              </a>
              <a href="mailto:hello@sparkleserv.com" className="flex items-center gap-2 hover:text-sky-400 transition-colors">
                <Mail className="h-4 w-4" /> hello@sparkleserv.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Serving the greater metro area
              </span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { label: "Trash Can Cleaning", href: "/#pricing" },
                { label: "Driveway Pressure Wash", href: "/#pricing" },
                { label: "Home Exterior Wash", href: "/#pricing" },
                { label: "Full Home Bundle", href: "/#pricing" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sky-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { label: "Sign Up", href: "/signup" },
                { label: "Sign In", href: "/login" },
                { label: "Dashboard", href: "/dashboard" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-sky-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} SparkleServ. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-sky-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sky-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
