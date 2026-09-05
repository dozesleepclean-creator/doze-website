import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Instagram,
  Mail,
  Music2,
  Phone,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact DOZE",
  description: "Contact DOZE by phone, email, Instagram, TikTok, or Facebook.",
};

type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: LucideIcon;
  external?: boolean;
};

const contactItems: ContactItem[] = [
  {
    label: "Phone",
    value: "407-405-5512",
    href: "tel:+14074055512",
    icon: Phone,
  },
  {
    label: "Email",
    value: "dozesleepclean@gmail.com",
    href: "mailto:dozesleepclean@gmail.com",
    icon: Mail,
  },
  {
    label: "Instagram",
    value: "@dozesleepclean",
    href: "https://www.instagram.com/dozesleepclean/",
    icon: Instagram,
    external: true,
  },
  {
    label: "TikTok",
    value: "@dozesleepclean",
    href: "https://www.tiktok.com/@dozesleepclean",
    icon: Music2,
    external: true,
  },
  {
    label: "Facebook",
    value: "Doze SleepClean",
    href: "https://www.facebook.com/DozeSleepClean",
    icon: Users,
    external: true,
  },
];

export default function ContactPage(): ReactNode {
  return (
    <main id="main-content" className="min-h-screen bg-background px-6 pb-24 pt-40 md:pb-32 md:pt-52">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-brand-blue-deep/70 hover:text-brand-blue-deep mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors md:mb-14"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <section className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-44 lg:self-start">
            <p className="text-brand-blue-deep/60 mb-4 text-xs font-medium tracking-[0.28em] uppercase">
              Get in touch
            </p>
            <h1
              className="text-brand-blue-deep max-w-xl text-5xl font-normal leading-[0.98] tracking-tight md:text-7xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Contact DOZE.
            </h1>
            <p className="text-muted-foreground mt-7 max-w-lg text-lg leading-relaxed md:text-xl">
              Questions, feedback, partnerships, or just want to say hi? Reach DOZE wherever is easiest for you.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              const isWide = index === contactItems.length - 1;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className={`group border-border/60 bg-brand-ivory hover:border-brand-blue-soft hover:bg-brand-cream relative flex min-h-52 flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-blue-deep/10 md:p-7 ${
                    isWide ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="bg-brand-blue-soft/25 text-brand-blue-deep flex h-12 w-12 items-center justify-center rounded-full">
                      <Icon className="h-5 w-5" strokeWidth={1.4} />
                    </span>
                    <ArrowUpRight className="text-brand-blue-deep/35 group-hover:text-brand-blue-deep h-5 w-5 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <div className="mt-10">
                    <p className="text-muted-foreground mb-2 text-xs font-medium tracking-[0.18em] uppercase">
                      {item.label}
                    </p>
                    <p
                      className="text-brand-blue-deep break-words text-2xl font-normal leading-tight md:text-3xl"
                      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bg-brand-blue mt-20 overflow-hidden rounded-[2rem] px-7 py-12 text-center text-white md:mt-28 md:px-12 md:py-16">
          <p className="mb-3 text-xs font-medium tracking-[0.28em] uppercase text-white/65">
            Sleep clean
          </p>
          <h2
            className="mx-auto max-w-2xl text-3xl font-normal tracking-tight md:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            We would love to hear from you.
          </h2>
          <a
            href="mailto:dozesleepclean@gmail.com"
            className="bg-brand-ivory text-brand-blue-deep mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3 font-medium transition-transform duration-300 hover:scale-[1.03]"
          >
            Email DOZE
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </section>
      </div>
    </main>
  );
}
