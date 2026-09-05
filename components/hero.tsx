"use client";

import { ChevronRight as ChevronRightIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import DitherCursor from "./dither-cursor";

const easeOut = [0.16, 1, 0.3, 1] as const;

const headlineFontStyles = {
  modern: {
    label: "Modern",
    fontFamily: "Arial, Helvetica, sans-serif",
    sleepWeight: 500,
    cleanWeight: 300,
    cleanStyle: "italic",
  },
  editorial: {
    label: "Editorial",
    fontFamily: 'Georgia, "Times New Roman", serif',
    sleepWeight: 400,
    cleanWeight: 400,
    cleanStyle: "italic",
  },
  soft: {
    label: "Soft Serif",
    fontFamily: '"Times New Roman", Times, serif',
    sleepWeight: 400,
    cleanWeight: 400,
    cleanStyle: "italic",
  },
  minimal: {
    label: "Minimal",
    fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
    sleepWeight: 500,
    cleanWeight: 300,
    cleanStyle: "normal",
  },
} as const;

type HeadlineFont = keyof typeof headlineFontStyles;

const headlineColors = [
  { label: "Deep blue", value: "#5f7597" },
  { label: "DOZE blue", value: "#7f95b5" },
  { label: "Soft blue", value: "#9fb3cc" },
  { label: "Taupe", value: "#7c746b" },
];

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

const desktopArcAngles = [-64, -32, 0, 32, 64];
const mobileArcAngles = [-60, -30, 0, 30, 60];
const cardRotations = [-6, -3, 0, 3, 6];

function getArcPoint(angle: number, radiusX: number, radiusY: number) {
  const radians = (angle * Math.PI) / 180;

  return {
    x: Math.sin(radians) * radiusX,
    y: -Math.cos(radians) * radiusY,
  };
}

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [activeFact, setActiveFact] = useState<number | null>(null);
  const [isHeadlinePickerOpen, setIsHeadlinePickerOpen] = useState(false);
  const [headlineFont, setHeadlineFont] = useState<HeadlineFont>("modern");
  const [sleepColor, setSleepColor] = useState("#5f7597");
  const [cleanColor, setCleanColor] = useState("#7f95b5");
  const opacityRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  const activeCard = activeFact === null ? null : cardData[activeFact];
  const headlineStyle = headlineFontStyles[headlineFont];

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

  const arcAngles = isMobile ? mobileArcAngles : desktopArcAngles;
  const radiusX = isMobile ? 600 : 900;
  const radiusY = isMobile ? 185 : 300;
  const arcSweep = isMobile ? 5 : 10;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-72"
    >
      {!isMobile && shouldRender && (
        <DitherCursor color="#7f95b5" opacity={opacity} />
      )}

      <div ref={headlineRef} className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="relative mb-5 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsHeadlinePickerOpen((open) => !open)}
            aria-expanded={isHeadlinePickerOpen}
            className="border-brand-blue-deep/15 bg-brand-ivory/90 text-brand-blue-deep hover:bg-brand-blue-soft/20 rounded-full border px-4 py-2 text-[0.65rem] font-medium tracking-[0.16em] uppercase shadow-sm backdrop-blur-sm transition-colors"
          >
            Customize Sleep Clean
          </button>

          <AnimatePresence>
            {isHeadlinePickerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: easeOut }}
                className="border-border/70 bg-brand-ivory absolute top-full z-40 mt-3 w-[min(92vw,34rem)] rounded-3xl border p-5 text-left shadow-xl shadow-brand-blue-deep/10 backdrop-blur-md md:p-6"
              >
                <div>
                  <p className="text-muted-foreground mb-2 text-[0.62rem] font-medium tracking-[0.18em] uppercase">
                    Font
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(Object.keys(headlineFontStyles) as HeadlineFont[]).map(
                      (font) => (
                        <button
                          key={font}
                          type="button"
                          onClick={() => setHeadlineFont(font)}
                          className={`rounded-full px-3.5 py-2 text-xs transition-all ${
                            headlineFont === font
                              ? "bg-brand-blue-deep text-white"
                              : "bg-brand-blue-soft/20 text-brand-blue-deep hover:bg-brand-blue-soft/35"
                          }`}
                        >
                          {headlineFontStyles[font].label}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground mb-2 text-[0.62rem] font-medium tracking-[0.18em] uppercase">
                      Sleep color
                    </p>
                    <div className="flex gap-2">
                      {headlineColors.map((color) => (
                        <button
                          key={`sleep-${color.value}`}
                          type="button"
                          onClick={() => setSleepColor(color.value)}
                          aria-label={`Sleep: ${color.label}`}
                          aria-pressed={sleepColor === color.value}
                          className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                            sleepColor === color.value
                              ? "border-brand-blue-deep scale-110"
                              : "border-brand-ivory ring-1 ring-border"
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-muted-foreground mb-2 text-[0.62rem] font-medium tracking-[0.18em] uppercase">
                      Clean color
                    </p>
                    <div className="flex gap-2">
                      {headlineColors.map((color) => (
                        <button
                          key={`clean-${color.value}`}
                          type="button"
                          onClick={() => setCleanColor(color.value)}
                          aria-label={`Clean: ${color.label}`}
                          aria-pressed={cleanColor === color.value}
                          className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                            cleanColor === color.value
                              ? "border-brand-blue-deep scale-110"
                              : "border-brand-ivory ring-1 ring-border"
                          }`}
                          style={{ backgroundColor: color.value }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
        >
          <span
            style={{
              color: sleepColor,
              fontFamily: headlineStyle.fontFamily,
              fontWeight: headlineStyle.sleepWeight,
            }}
          >
            Sleep
          </span>
          <span
            style={{
              color: cleanColor,
              fontFamily: headlineStyle.fontFamily,
              fontWeight: headlineStyle.cleanWeight,
              fontStyle: headlineStyle.cleanStyle,
            }}
          >
            Clean.
          </span>
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
        className="relative -mx-6 mt-10 w-screen overflow-hidden pb-10 pt-9 md:mt-12 md:pb-14"
      >
        <p className="text-muted-foreground mb-4 text-center text-[0.65rem] font-medium tracking-[0.2em] uppercase">
          Click a card to learn more
        </p>

        <div className="relative mx-auto h-[29rem] w-screen overflow-hidden md:h-[36rem]">
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[20rem] w-[74rem] max-w-none -translate-x-1/2 md:h-[28rem] md:w-[112rem]"
            viewBox="0 0 1792 360"
            fill="none"
          >
            <path
              d="M18 338C360 6 1432 6 1774 338"
              className="stroke-brand-blue-deep/12"
              strokeWidth="1.25"
              strokeDasharray="5 8"
            />
          </svg>

          {cardData.map((card, index) => {
            const baseAngle = arcAngles[index] ?? 0;
            const baseRotation = cardRotations[index] ?? 0;
            const phases = [-arcSweep, 0, arcSweep, 0, -arcSweep];
            const arcPoints = phases.map((phase) =>
              getArcPoint(baseAngle + phase, radiusX, radiusY)
            );
            const restingPoint = getArcPoint(baseAngle, radiusX, radiusY);

            return (
              <motion.button
                key={card.title}
                type="button"
                onClick={() => setActiveFact(index)}
                className="bg-brand-ivory border-border/60 absolute left-1/2 top-[13.5rem] w-[11.5rem] -translate-x-1/2 shrink-0 overflow-hidden rounded-2xl border p-2 text-left shadow-lg shadow-brand-blue-deep/10 sm:w-[12.5rem] md:top-[19rem] md:w-[14rem] lg:w-[14.25rem]"
                animate={
                  activeFact !== null
                    ? {
                        x: restingPoint.x,
                        y: restingPoint.y,
                        rotate: baseRotation,
                        scale: 1,
                      }
                    : {
                        x: arcPoints.map((point) => point.x),
                        y: arcPoints.map((point) => point.y),
                        rotate: [
                          baseRotation - 1,
                          baseRotation,
                          baseRotation + 1,
                          baseRotation,
                          baseRotation - 1,
                        ],
                        scale: 1,
                      }
                }
                transition={
                  activeFact !== null
                    ? { duration: 0.35, ease: easeOut }
                    : {
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                whileHover={{ rotate: 0, scale: 1.04, zIndex: 30 }}
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
                  <span
                    className="text-brand-blue-deep"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: "0.92rem",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.18,
                    }}
                  >
                    {card.title}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pb-24 pt-2 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <h2
          className="max-w-3xl text-3xl font-normal tracking-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Your nightly reset starts here.
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
        {activeFact !== null && activeCard && (
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
