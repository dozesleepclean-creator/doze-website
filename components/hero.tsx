"use client";

import { ChevronRight as ChevronRightIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import DitherCursor from "./dither-cursor";

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardData = [
  {
    title: "Naturally Soft",
    description:
      "Made with soft, breathable bamboo lyocell for a comfortable night's sleep.",
    position: "50% 0%",
  },
  {
    title: "A Fresh Surface, Nightly",
    description:
      "Enjoy a clean layer between your face and pillow every night.",
    position: "0% 100%",
  },
  {
    title: "Designed for Clearer Mornings",
    description:
      "Helps reduce contact with the oil, sweat, and buildup left behind on pillowcases.",
    position: "50% 100%",
  },
  {
    title: "Made with Plant-Based Fibers",
    description:
      "Crafted from responsibly sourced lyocell derived from bamboo and wood fibers.",
    position: "100% 0%",
  },
  {
    title: "Inspired by Real Skin Struggles",
    description:
      "DOZE was created to make sleeping cleaner feel simple—without doing laundry all the time.",
    position: "100% 100%",
  },
];

const cardRotations = [-4, 2, -1, 3, -3];
const cardOffsets = [18, 0, 12, 2, 20];
const cardFloatAmounts = [8, 10, 7, 9, 8];
const cardDurations = [6.5, 7.2, 6.8, 7.6, 6.9];

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [activeFact, setActiveFact] = useState<number | null>(null);
  const [isCardRowHovered, setIsCardRowHovered] = useState(false);
  const opacityRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const activeCard = activeFact === null ? null : cardData[activeFact];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setShouldRender(true);
      },
      { threshold: 0, rootMargin: "-10% 0px -10% 0px" }
    );

    observer.observe(headline);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const targetOpacity = isVisible ? 0.35 : 0;

    const animate = () => {
      const diff = targetOpacity - opacityRef.current;
      const step = diff * 0.02;

      if (Math.abs(diff) > 0.001) {
        opacityRef.current += step;
        setOpacity(opacityRef.current);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        opacityRef.current = targetOpacity;
        setOpacity(targetOpacity);
        if (targetOpacity === 0) setShouldRender(false);
      }
    };

    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-72"
    >
      {!isMobile && shouldRender && (
        <DitherCursor color="#7f95b5" opacity={opacity} />
      )}

      <div ref={headlineRef} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="text-muted-foreground mb-5 text-xs font-medium tracking-[0.28em] uppercase md:text-sm"
        >
          Disposable pillow liners
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
          className="mb-8 flex flex-wrap items-baseline justify-center gap-x-[0.18em] text-6xl leading-[0.92] tracking-[-0.065em] md:text-8xl lg:text-[7rem]"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <span className="text-brand-blue-deep font-bold">Sleep</span>
          <span className="text-brand-blue font-light italic">Clean.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: easeOut }}
          className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed tracking-tight md:text-2xl"
        >
          A fresh pillow surface every night — without extra laundry.
        </motion.p>

        <motion.a
          href="#shop"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
          className="bg-brand-blue hover:bg-brand-blue-deep mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium text-white shadow-lg shadow-brand-blue-deep/10 transition-colors"
        >
          Shop DOZE
        </motion.a>
      </div>

      <div
        id="shop"
        className="relative -mx-6 mt-10 w-screen overflow-hidden pb-12 pt-10 md:mt-12 md:pb-16"
      >
        <p className="text-muted-foreground mb-7 text-center text-[0.65rem] font-medium tracking-[0.2em] uppercase">
          Click a card to learn more
        </p>

        <div className="relative mx-auto max-w-[94rem] overflow-hidden py-8">
          <motion.div
            className="mx-auto flex w-max items-start gap-2 px-6 sm:gap-3 md:gap-4"
            animate={
              isCardRowHovered || activeFact !== null
                ? { x: 0 }
                : { x: [-54, 54, -54] }
            }
            transition={
              isCardRowHovered || activeFact !== null
                ? { duration: 0.35, ease: easeOut }
                : { duration: 18, repeat: Infinity, ease: "easeInOut" }
            }
            onMouseEnter={() => setIsCardRowHovered(true)}
            onMouseLeave={() => setIsCardRowHovered(false)}
          >
            {cardData.map((card, index) => {
              const baseRotation = cardRotations[index] ?? 0;
              const baseOffset = cardOffsets[index] ?? 0;
              const floatAmount = cardFloatAmounts[index] ?? 8;
              const duration = cardDurations[index] ?? 7;
              const direction = index % 2 === 0 ? 1 : -1;

              return (
                <motion.button
                  key={card.title}
                  type="button"
                  onClick={() => setActiveFact(index)}
                  className="bg-brand-ivory border-border/60 w-[12.75rem] shrink-0 overflow-hidden rounded-2xl border p-2 text-left shadow-lg shadow-brand-blue-deep/10 sm:w-[13.75rem] md:w-[14.75rem] lg:w-[15.5rem]"
                  animate={
                    isCardRowHovered || activeFact !== null
                      ? { y: baseOffset, rotate: baseRotation }
                      : {
                          y: [
                            baseOffset,
                            baseOffset - floatAmount,
                            baseOffset,
                          ],
                          rotate: [
                            baseRotation - 1.5 * direction,
                            baseRotation + 1.5 * direction,
                            baseRotation - 1.5 * direction,
                          ],
                        }
                  }
                  transition={
                    isCardRowHovered || activeFact !== null
                      ? { duration: 0.35, ease: easeOut }
                      : {
                          duration,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.18,
                        }
                  }
                  whileHover={{ y: baseOffset - 10, rotate: 0, scale: 1.035 }}
                  whileTap={{ scale: 0.985 }}
                  aria-label={`Learn more: ${card.title}`}
                >
                  <div
                    className="border-border/60 aspect-[4/3] w-full rounded-xl border bg-cover bg-no-repeat shadow-sm"
                    style={{
                      backgroundImage: 'url("/img/doze-carousel-sprite.webp")',
                      backgroundSize: "300% 200%",
                      backgroundPosition: card.position,
                    }}
                    role="img"
                    aria-label={card.title}
                  />
                  <div className="flex min-h-14 items-center justify-center px-2 py-3 text-center">
                    <span className="text-foreground text-[0.64rem] font-medium leading-snug tracking-[0.12em] uppercase md:text-[0.68rem]">
                      {card.title}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pb-24 pt-4 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <h2
          className="max-w-3xl text-3xl font-normal tracking-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          <span className="block">Clean sleep.</span>
          <span className="mt-1 block md:mt-2">Clearer mornings.</span>
        </h2>
        <motion.a
          href="#how-it-works"
          className="bg-foreground text-background group mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pl-5 pr-3 font-medium shadow-lg shadow-foreground/10 transition-all duration-500 ease-out hover:rounded-[50px] sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.2 }}
        >
          <span>See how DOZE works</span>
          <span className="bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110">
            <ChevronRightIcon className="relative left-px h-4 w-4" />
          </span>
        </motion.a>
      </motion.div>

      <AnimatePresence>
        {activeCard && (
          <motion.div
            className="bg-brand-blue-deep/20 fixed inset-0 z-[90] flex items-center justify-center px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActiveFact(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={activeCard.title}
              className="bg-brand-ivory border-border relative w-full max-w-md rounded-3xl border p-8 text-left shadow-2xl shadow-brand-blue-deep/20 md:p-10"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveFact(null)}
                className="text-brand-blue-deep/60 hover:text-brand-blue-deep hover:bg-brand-blue-soft/20 absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                aria-label="Close fact"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-muted-foreground mb-4 text-xs font-medium tracking-[0.24em] uppercase">
                DOZE fact {String(activeFact + 1).padStart(2, "0")}
              </p>
              <h3
                className="text-brand-blue-deep pr-8 text-3xl font-normal tracking-tight md:text-4xl"
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                {activeCard.title}
              </h3>
              <p className="text-muted-foreground mt-5 text-lg leading-relaxed">
                {activeCard.description}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
