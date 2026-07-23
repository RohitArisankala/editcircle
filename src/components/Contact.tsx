"use client";

import { useState } from "react";
import { Mail, Send, Instagram } from "lucide-react";
import { site } from "@/lib/site";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`New project enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  const input =
    "w-full rounded-xl border border-brand-300/15 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-brand-400/60 focus:ring-2 focus:ring-brand-500/20";

  return (
    <section id="contact" className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/15 blur-3xl" />
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let's make something great"
          subtitle="Tell us about your project and we'll get back to you within a day."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col justify-between gap-8">
            <div className="glass rounded-2xl p-7">
              <h3 className="text-lg font-semibold text-white">
                Prefer email?
              </h3>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-3 text-brand-300 transition hover:text-brand-200"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl border border-gold-500/20 bg-gold-500/10 text-gold-300">
                  <Mail size={18} />
                </span>
                {site.email}
              </a>
              <p className="mt-6 text-sm leading-relaxed text-slate-400">
                Booking projects now. Whether it&apos;s one video or an ongoing
                partnership, we&apos;d love to hear the idea.
              </p>

              <div className="mt-6 flex gap-3">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center gap-2 rounded-xl border border-brand-300/15 px-4 py-2.5 text-sm text-slate-300 transition hover:border-gold-500/50 hover:text-white"
                >
                  <Instagram size={18} /> @the_edit_circle
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="glass rounded-2xl p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Name
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    className={input}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm text-slate-300">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    className={input}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1.5 block text-sm text-slate-300">
                  Project details
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="What are you looking to create?"
                  className={`${input} resize-none`}
                />
              </div>
              <button
                type="submit"
                className="btn-gold mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold"
              >
                Send message
                <Send size={16} />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
