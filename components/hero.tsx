"use client";

import { ChevronRight as ChevronRightIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import DitherCursor from "./dither-cursor";
import RotatingCards, { type Card } from "./rotating-cards";

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardData = [
  { label: "DOZE identity", position: "0% 0%" },
  { label: "Nightly ritual", position: "50% 0%" },
  { label: "Liner texture", position: "100% 0%" },
  { label: "Fresh sleep surface", position: "0% 100%" },
  { label: "Deep sleep. Clean mornings.", position: "50% 100%" },
  { label: "30 liner box", position: "100% 100%" },
];

const carouselCards: Card[] = cardData.map((card, index) => ({
  id: index + 1,
  content: (
    <div className="flex h-full flex-col p-2">
      <div
        className="border-border/60 min-h-0 flex-1 rounded-t-lg rounded-b-[2.5rem] border bg-cover bg-no-repeat shadow-sm"
        style={{
          backgroundImage: 'url("/img/doze-carousel-sprite.webp")',
          backgroundSize: "300% 200%",
          backgroundPosition: card.position,
        }}
        role="img"
        aria-label={card.label}
      />
      <div className="px-2 pb-1 pt-3 text-center">
        <span className="text-foreground text-xs font-medium tracking-[0.12em] uppercase">
          {card.label}
        </span>
      </div>
    </div>
  ),
}));

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const opacityRef = useRef(0);
  const animationRef = useRef<number | null>(null);

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
        className="relative -mx-6 mt-4 h-100 w-screen overflow-hidden sm:h-125 md:h-137.5 lg:h-150 xl:h-175"
        style={{
          maskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 60%, transparent 100%)",
        }}
      >
        <div className="absolute left-1/2 top-25 -translate-x-1/2 sm:top-30 lg:top-35 xl:top-40">
          <div className="origin-top scale-[0.6] lg:scale-[0.7] xl:scale-100">
            <RotatingCards
              cards={carouselCards}
              radius={1000}
              cardClassName="rounded-xl bg-brand-ivory border border-border/60 shadow-sm"
              cardWidth={350}
              cardHeight={275}
              duration={110}
              pauseOnHover={true}
              autoPlay={true}
              initialRotation={-90}
              showTrackLine={true}
              trackLineOffset={25}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pb-24 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <h2
          className="max-w-3xl text-3xl font-normal tracking-tight md:text-5xl lg:text-6xl"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Clean sleep. Clearer mornings.
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
    </section>
  );
}
