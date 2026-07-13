import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Youtube, Twitter } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-gold-500/10 bg-ink-950/60">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <Logo className="h-20 w-20" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              {site.intro}
            </p>
            <div className="mt-5 space-y-2 text-sm text-slate-400">
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-2 transition hover:text-gold-300"
              >
                <Mail size={15} className="text-gold-400" /> {site.email}
              </a>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gold-400" /> {site.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-gold-400" /> {site.location}
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              {[
                { href: site.socials.instagram, Icon: Instagram, label: "Instagram" },
                { href: site.socials.youtube, Icon: Youtube, label: "YouTube" },
                { href: site.socials.twitter, Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-gold-500/15 text-slate-300 transition hover:border-gold-500/50 hover:text-gold-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {site.footer.columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-slate-400 transition hover:text-gold-300"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-gold-500/10 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {site.brand}. {site.slogan}.
          </p>
          <p className="text-xs text-slate-600">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
