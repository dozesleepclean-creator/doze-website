"use client";

import { ChevronRightIcon, Instagram, Mail, Moon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.8, ease: easeOut },
};

const exploreLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why DOZE", href: "#main-content" },
  { label: "FAQ", href: "#faq" },
];

const connectLinks = [
  { label: "Contact", href: "mailto:hello@dozesleepclean.com" },
  { label: "Launch List", href: "mailto:hello@dozesleepclean.com?subject=DOZE%20Launch%20List" },
];

function DozeWordmark(): ReactNode {
  return (
    <span
      className="relative inline-block pr-7 text-6xl font-normal tracking-[0.18em] md:text-7xl"
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      doze
      <span className="absolute right-0 top-0 text-[0.16em] tracking-normal">z</span>
      <span className="absolute right-[-0.15em] top-[-0.62em] text-[0.14em] tracking-normal">z</span>
      <span className="absolute right-[-0.34em] top-[-1.2em] text-[0.12em] tracking-normal">z</span>
    </span>
  );
}

export function Footer(): ReactNode {
  return (
    <footer className="bg-foreground text-background rounded-tr-4xl rounded-tl-4xl px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div className="max-w-lg" {...fadeInUp}>
            <p className="text-background/75 text-lg leading-relaxed">
              A fresh pillow surface for the nights you want your routine to feel a little cleaner, calmer, and easier.
            </p>
            <Link
              href="mailto:hello@dozesleepclean.com?subject=DOZE%20Launch%20List"
              className="group mt-8 inline-flex items-center gap-3 rounded-md bg-background py-3 pl-4 pr-3 font-medium text-foreground transition-all duration-500 ease-out hover:rounded-[50px]"
            >
              <span>Join the launch list</span>
              <span className="bg-accent text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                <ChevronRightIcon className="h-4 w-4 relative left-px" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
              <h4 className="text-background/45 mb-4 text-sm font-semibold uppercase tracking-wider">
                Explore
              </h4>
              <ul className="space-y-3">
                {exploreLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/75 hover:text-background inline-block transition-all duration-300 hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}>
              <h4 className="text-background/45 mb-4 text-sm font-semibold uppercase tracking-wider">
                Connect
              </h4>
              <ul className="space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-background/75 hover:text-background inline-block transition-all duration-300 hover:translate-x-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="bg-background/10 my-16 h-px" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeInUp}>
            <DozeWordmark />
            <p className="text-background/55 mt-5 text-xs font-medium tracking-[0.24em] uppercase">
              Sleep clean
            </p>
            <p className="text-background/45 mt-8 text-sm">
              © {new Date().getFullYear()} DOZE. All rights reserved.
            </p>
          </motion.div>

          <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right">
            <motion.div className="space-y-5" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
              <p className="text-background/70 max-w-md leading-relaxed">
                Sleep cleaner. Wake clearer. A simpler nightly reset for people who care what their skin rests on.
              </p>
              <a
                href="mailto:hello@dozesleepclean.com"
                className="inline-block text-lg font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                hello@dozesleepclean.com
              </a>
            </motion.div>

            <motion.div className="flex items-center gap-4 lg:justify-end" {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}>
              <a
                href="#"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@dozesleepclean.com"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Email DOZE"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#how-it-works"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Learn about DOZE"
              >
                <Moon className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
