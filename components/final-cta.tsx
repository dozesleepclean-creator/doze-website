"use client";

import { ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import DitherCursor from "./dither-cursor";

const easeOut = [0.16, 1, 0.3, 1] as const;

export function FinalCTA(): ReactNode {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="px-6 py-24 md:py-36">
      <motion.div
        className="bg-accent relative mx-auto max-w-6xl overflow-hidden rounded-3xl px-6 py-12 text-center text-foreground md:rounded-4xl md:px-12 md:py-24"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        {!isMobile && (
          <DitherCursor
            color="#5f7597"
            radius={0.1}
            opacity={0.08}
            position="absolute"
          />
        )}

        <div className="relative z-10">
          <p className="mb-4 text-xs font-medium tracking-[0.28em] uppercase opacity-70">
            Sleep clean
          </p>
          <motion.h2
            className="mx-auto mb-6 max-w-3xl text-3xl font-normal tracking-tight md:text-4xl lg:text-6xl"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOut }}
          >
            Make fresh part of your bedtime.
          </motion.h2>

          <motion.p
            className="mx-auto mb-10 max-w-xl text-lg text-foreground/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
          >
            DOZE is building a simpler way to start every night on a fresh pillow surface. Be first to know when the first drop is ready.
          </motion.p>

          <motion.a
            href="mailto:hello@dozesleepclean.com?subject=DOZE%20Launch%20List"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-md bg-foreground py-3 pl-5 pr-3 font-medium text-background transition-all duration-500 ease-out hover:rounded-[50px] hover:shadow-lg sm:w-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
          >
            <span>Join the launch list</span>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-300 group-hover:scale-110">
              <ChevronRightIcon className="h-4 w-4 relative left-px" />
            </span>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
