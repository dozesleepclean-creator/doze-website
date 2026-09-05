"use client";

import { ChevronDown, ChevronRightIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    question: "What is DOZE?",
    answer:
      "DOZE is a disposable pillow liner designed to give you a fresh sleep surface without replacing and washing your pillowcase every single day.",
  },
  {
    question: "How often should I use a fresh liner?",
    answer:
      "DOZE is built around a simple nightly reset: use a fresh liner for the night, then replace it when you are ready for bed again.",
  },
  {
    question: "What does the liner feel like?",
    answer:
      "The liner is being developed with a soft, lightweight lyocell-based nonwoven material selected to feel comfortable against your face while you sleep.",
  },
  {
    question: "Can I travel with DOZE?",
    answer:
      "Yes. DOZE is designed to be easy to pack for hotels, dorms, weekend trips, and anywhere you want to keep your usual sleep routine with you.",
  },
  {
    question: "Is DOZE an acne treatment?",
    answer:
      "No. DOZE is a hygiene-focused sleep accessory, not a medical treatment. It is designed for people who want a fresh surface between their skin and pillow as part of their nightly routine.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}): ReactNode {
  return (
    <motion.div
      className="border-foreground/10 border-b last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: easeOut }}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between py-6 text-left"
      >
        <span
          className="text-foreground text-lg font-normal pr-8 md:text-xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          {faq.question}
        </span>
        <motion.div
          className="text-foreground/50 shrink-0"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: easeOut }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground pb-6 text-base leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ(): ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.5 });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-foreground px-6 py-16 md:py-32 rounded-4xl">
      <div className="mx-auto max-w-3xl">
        <motion.div
          ref={headerRef}
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          <p className="text-background/60 mb-3 text-xs font-medium tracking-[0.25em] uppercase">
            The details
          </p>
          <h2
            className="text-background text-3xl font-normal tracking-tight md:text-4xl lg:text-5xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Questions before you doze off?
          </h2>
        </motion.div>

        <motion.div
          className="bg-background rounded-2xl px-6 md:px-10 py-2"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: easeOut }}
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        >
          <p className="text-background/60 mb-6 text-base">
            Something else on your mind? We would love to hear from you.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-md bg-background py-3 pl-5 pr-3 font-medium text-foreground shadow-lg transition-all duration-500 ease-out hover:rounded-[50px]"
          >
            <span>Contact DOZE</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-background transition-all duration-300 group-hover:scale-110">
              <ChevronRightIcon className="h-4 w-4 relative left-px" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
