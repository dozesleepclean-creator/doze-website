"use client";

import { motion, useInView } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "1",
    title: "Unfold a fresh liner",
    description:
      "Keep DOZE by your bed and start the night with a fresh disposable liner ready to go.",
  },
  {
    number: "2",
    title: "Slip it over your pillow",
    description:
      "Create a fresh surface between your skin and your pillowcase in seconds — no extra laundry required.",
  },
  {
    number: "3",
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
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      className="bg-muted rounded-2xl border border-border/60 p-4 md:p-5"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: easeOut }}
    >
      <div className="px-3 pb-6 pt-3 md:px-4 md:pb-8 md:pt-4">
        <h3
          className="mb-3 text-xl font-normal tracking-tight md:text-2xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {step.title}
        </h3>
        <p className="text-muted-foreground text-base leading-relaxed">
          {step.description}
        </p>
      </div>

      <div className="border-border/60 flex min-h-[16rem] items-center justify-center rounded-[1.25rem] border bg-white/75 md:min-h-[18rem]">
        <span
          className="text-brand-blue-deep text-6xl font-normal leading-none md:text-7xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {step.number}
        </span>
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
            className="text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Fresh pillow. Three simple steps.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {steps.map((step, index) => (
            <StepCard key={step.title} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
