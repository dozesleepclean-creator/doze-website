"use client";

import {
  ChevronRightIcon,
  Feather,
  Plane,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Feature {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    number: "01",
    title: "A fresh surface, nightly",
    description:
      "Your pillow collects yesterday. DOZE gives you a simple way to start each night on a fresh disposable layer.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "Soft enough for sleep",
    description:
      "Designed around a soft, lightweight feel so your cleaner bedtime routine still feels like bedtime.",
    icon: Feather,
  },
  {
    number: "03",
    title: "Made for home and away",
    description:
      "Keep your routine consistent in your dorm, apartment, hotel, or wherever you put your head down for the night.",
    icon: Plane,
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}): ReactNode {
  const Icon = feature.icon;

  return (
    <motion.div
      className="bg-muted grid grid-cols-1 gap-2 overflow-hidden rounded-2xl p-2 md:grid-cols-2 transition-colors duration-300 hover:bg-muted/80 border border-border/50"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: easeOut,
      }}
    >
      <div className="px-4 py-20 md:py-28">
        <span className="text-muted-foreground bg-foreground/5 mb-4 block w-fit rounded-md px-2 py-1 text-sm font-medium">
          {feature.number}
        </span>
        <h3
          className="mb-4 text-2xl font-normal tracking-tight md:text-3xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {feature.title}
        </h3>
        <p className="text-muted-foreground max-w-md text-sm leading-relaxed md:text-base">
          {feature.description}
        </p>
      </div>

      <div className="bg-brand-ivory border-border/60 relative flex min-h-64 w-full items-center justify-center overflow-hidden rounded-xl border md:min-h-full">
        <div className="bg-accent/40 absolute h-52 w-52 rounded-full blur-3xl" />
        <Icon className="text-foreground relative z-10 h-24 w-24 md:h-32 md:w-32" strokeWidth={0.8} />
      </div>
    </motion.div>
  );
}

export function Features(): ReactNode {
  return (
    <section className="bg-background px-6 py-16 md:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
        <motion.div
          className="lg:sticky lg:top-60 lg:w-96 lg:shrink-0"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.25em] uppercase">
            Why DOZE
          </p>
          <h2
            className="mb-4 text-2xl font-normal tracking-tight md:mb-6 md:text-3xl lg:text-4xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Cleaner-feeling sleep, without overthinking it.
          </h2>
          <p className="text-muted-foreground mb-6 max-w-sm text-base md:mb-8 md:text-lg">
            DOZE was made for people who care about what their skin rests on, but do not want another complicated step in their routine.
          </p>
          <a
            href="#how-it-works"
            className="bg-foreground group inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pr-3 pl-5 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px] sm:w-auto"
          >
            <span>How it works</span>
            <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
              <ChevronRightIcon className="relative left-px h-4 w-4" />
            </span>
          </a>
        </motion.div>

        <div className="flex min-w-0 flex-1 flex-col gap-6 md:gap-24">
          {features.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
