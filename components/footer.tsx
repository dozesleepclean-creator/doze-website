"use client";

import { ChevronRightIcon, Instagram, Mail, Music2, Phone } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { DozeWordmark } from "./doze-wordmark";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.8, ease: easeOut },
};

const exploreLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why DOZE", href: "/#why-doze" },
  { label: "FAQ", href: "/#faq" },
];

const connectLinks = [
  { label: "Email", href: "mailto:dozesleepclean@gmail.com" },
  { label: "Phone", href: "tel:+14074055512" },
  { label: "Instagram", href: "https://www.instagram.com/dozesleepclean/" },
  { label: "TikTok", href: "https://www.tiktok.com/@sleepwithdoze" },
];

export function Footer(): ReactNode {
  return (
    <footer className="bg-foreground text-background rounded-tl-4xl rounded-tr-4xl px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div className="max-w-lg" {...fadeInUp}>
            <p className="text-background/75 text-lg leading-relaxed">
              DOZE is in pre-launch: a fresh pillow surface designed to make
              your nightly routine feel cleaner, calmer, and easier.
            </p>
            <Link
              href="/launch"
              className="group bg-background text-foreground mt-8 inline-flex items-center gap-3 rounded-md py-3 pr-3 pl-4 font-medium transition-all duration-500 ease-out hover:rounded-[50px]"
            >
              <span>Join the launch list</span>
              <span className="bg-accent text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
                <ChevronRightIcon className="relative left-px h-4 w-4" />
              </span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-8 lg:justify-items-end">
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
            >
              <h4 className="text-background/45 mb-4 text-sm font-semibold tracking-wider uppercase">
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
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              <h4 className="text-background/45 mb-4 text-sm font-semibold tracking-wider uppercase">
                Connect
              </h4>
              <ul className="space-y-3">
                {connectLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-background/75 hover:text-background inline-block transition-all duration-300 hover:translate-x-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <div className="bg-background/10 my-16 h-px" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div {...fadeInUp}>
            <DozeWordmark size="footer" />
            <p className="text-background/55 mt-5 text-xs font-medium tracking-[0.24em] uppercase">
              Sleep clean
            </p>
            <p className="text-background/45 mt-8 text-sm">
              © {new Date().getFullYear()} DOZE. All rights reserved.
            </p>
          </motion.div>

          <div className="flex flex-col justify-between gap-8 lg:items-end lg:text-right">
            <motion.div
              className="space-y-3"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.1 }}
            >
              <p className="text-background/70 max-w-md leading-relaxed">
                Sleep clean. A simpler nightly reset for people who care what
                their skin rests on. Join the waitlist for launch updates.
              </p>
              <a
                href="mailto:dozesleepclean@gmail.com"
                className="block text-lg font-medium underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                dozesleepclean@gmail.com
              </a>
              <a
                href="tel:+14074055512"
                className="text-background/75 block text-base transition-opacity hover:opacity-70"
              >
                407-405-5512
              </a>
              <a
                href="https://www.instagram.com/dozesleepclean/"
                className="text-background/75 block text-base transition-opacity hover:opacity-70"
              >
                @dozesleepclean
              </a>
              <a
                href="https://www.tiktok.com/@sleepwithdoze"
                className="text-background/75 block text-base transition-opacity hover:opacity-70"
              >
                @sleepwithdoze
              </a>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 lg:justify-end"
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.2 }}
            >
              <a
                href="https://www.instagram.com/dozesleepclean/"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@sleepwithdoze"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="TikTok"
              >
                <Music2 className="h-4 w-4" />
              </a>
              <a
                href="mailto:dozesleepclean@gmail.com"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Email DOZE"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="tel:+14074055512"
                className="bg-background/10 text-background hover:bg-background hover:text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Call DOZE"
              >
                <Phone className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
