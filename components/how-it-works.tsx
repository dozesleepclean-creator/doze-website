"use client";

import { Moon, PackageOpen, Sun } from "lucide-react";
import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    icon: PackageOpen,
    title: "Unfold a fresh liner",
    description:
      "Keep DOZE by your bed and start the night with a fresh disposable liner ready to go.",
  },
  {
    number: "02",
    icon: Moon,
    title: "Slip it over your pillow",
    description:
      "Create a fresh surface between your skin and your pillowcase in seconds — no extra laundry required.",
  },
  {
    number: "03",
    icon: Sun,
    title: "Wake up. Reset. Repeat.",
    description:
      "Use it for the night, then replace it with a fresh liner when bedtime comes around again.",
  },
];

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      className="bg-muted grid overflow-hidden rounded-2xl border border-border/60 md:grid-cols-[1.05fr_0.95fr]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easeOut }}
    >
      <div className="flex min-h-[18rem] flex-col justify-center p-7 md:min-h-[24rem] md:p-10">
        <span className="text-muted-foreground mb-5 inline-flex w-fit rounded-md bg-background/40 px-2.5 py-1 text-sm font-medium tracking-[0.04em]">
          {step.number}
        </span>

        <h3
          className="text-brand-blue-deep mb-4 text-2xl font-normal tracking-tight md:text-3xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {step.title}
        </h3>

        <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
          {step.description}
        </p>
      </div>

      <div className="border-border/60 m-3 flex min-h-[17rem] items-center justify-center rounded-[1.25rem] border bg-white/75 md:m-4 md:min-h-[23rem]">
        <Icon
          className="text-brand-blue-deep h-20 w-20 md:h-24 md:w-24"
          strokeWidth={1.1}
        />
      </div>
    </motion.div>
  );
}

export function HowItWorks(): ReactNode {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  return (
    <section id="how-it-works" className="bg-background px-6 py-16 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={headerRef}
          className="mb-8 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="text-muted-foreground mb-3 text-xs font-medium tracking-[0.25em] uppercase">
            Your nightly reset
          </p>
          <h2
            className="text-brand-blue-deep text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Fresh pillow. Three simple steps.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
