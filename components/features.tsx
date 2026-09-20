"use client";

import Image from "next/image";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Feature {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

const features: Feature[] = [
  {
    number: "01",
    title: "A fresh surface, nightly",
    description:
      "Your pillow collects yesterday. DOZE gives you a simple way to start each night on a fresh disposable layer.",
    image: "/img/doze-feature-fresh.webp",
    imageAlt: "Open blue DOZE box with fresh disposable pillow liners on a sunlit bed",
    imagePosition: "center 54%",
  },
  {
    number: "02",
    title: "Soft enough for sleep",
    description:
      "Designed around a soft, lightweight feel so your cleaner bedtime routine still feels like bedtime.",
    image: "/img/doze-feature-soft.webp",
    imageAlt: "Soft white pillow and bedding in warm morning light",
    imagePosition: "center 46%",
  },
  {
    number: "03",
    title: "Made for home and away",
    description:
      "Keep your routine consistent in your dorm, apartment, hotel, or wherever you put your head down for the night.",
    image: "/img/doze-feature-travel.webp",
    imageAlt: "Blue DOZE box packed inside an open suitcase",
    imagePosition: "center 48%",
  },
];

function FeatureCard({
  feature,
  index,
}: {
  feature: Feature;
  index: number;
}): ReactNode {
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

      <div className="bg-brand-ivory border-border/60 relative min-h-64 w-full overflow-hidden rounded-xl border md:min-h-full">
        <Image
          src={feature.image}
          alt={feature.imageAlt}
          fill
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out hover:scale-[1.025]"
          style={{ objectPosition: feature.imagePosition ?? "center" }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent" />
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
            A cleaner bedtime routine, made simple.
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
