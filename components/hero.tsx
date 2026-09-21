"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronRight as ChevronRightIcon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import DitherCursor from "./dither-cursor";

const easeOut = [0.16, 1, 0.3, 1] as const;

const cardData = [
  {
    title: "Naturally Soft",
    description:
      "Made with soft, breathable bamboo lyocell for a comfortable night's sleep.",
    image: "/img/doze-naturally-soft.webp",
    position: "center",
  },
  {
    title: "A Fresh Surface, Nightly",
    description:
      "Enjoy a clean layer between your face and pillow every night.",
    image: "/img/doze-open-box.webp",
    position: "center",
  },
  {
    title: "Designed for Clearer Mornings",
    description:
      "Helps reduce contact with the oil, sweat, and buildup left behind on pillowcases.",
    image: "/img/doze-clear-morning.webp",
    position: "center",
  },
  {
    title: "Made with Plant-Based Fibers",
    description:
      "Crafted from responsibly sourced lyocell derived from bamboo and wood fibers.",
    position: "100% 0%",
  },
  {
    title: "Fresh Sleep, Wherever You Go",
    description:
      "A fresh pillow surface made easy at home, in hotels, and everywhere in between.",
    image: "/img/doze-travel-lake-como.webp",
    position: "center",
  },
];

export function Hero(): ReactNode {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [isMobile, setIsMobile] = useState(true);
  const [activeFact, setActiveFact] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
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

  const scrollToCard = (index: number) => {
    const normalizedIndex = (index + cardData.length) % cardData.length;
    const carousel = carouselRef.current;
    const card = cardRefs.current[normalizedIndex];

    if (carousel && card) {
      carousel.scrollTo({
        left: card.offsetLeft - (carousel.clientWidth - card.offsetWidth) / 2,
        behavior: "smooth",
      });
    }
    setActiveSlide(normalizedIndex);
  };

  const updateActiveSlide = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const carouselCenter = carousel.scrollLeft + carousel.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - carouselCenter);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveSlide(nearestIndex);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-dvh flex-col items-center justify-start overflow-hidden px-6 pt-40 sm:pt-72"
    >
      {!isMobile && shouldRender && (
        <DitherCursor color="#7f95b5" opacity={opacity} />
      )}

      <div
        ref={headlineRef}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
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
          <span className="text-brand-blue-deep font-semibold">Sleep</span>
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
          href="/launch"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
          className="bg-brand-blue hover:bg-brand-blue-deep shadow-brand-blue-deep/10 mt-8 inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-medium text-white shadow-lg transition-colors"
        >
          Join the waitlist
        </motion.a>
      </div>

      <div
        id="shop"
        className="relative -mx-6 mt-10 w-screen overflow-hidden pt-9 pb-12 md:mt-12 md:pb-16"
      >
        <p className="text-muted-foreground mb-6 text-center text-[0.65rem] font-medium tracking-[0.2em] uppercase">
          Swipe to explore
        </p>

        <div className="relative mx-auto w-full">
          <div
            ref={carouselRef}
            onScroll={updateActiveSlide}
            className="flex touch-pan-x snap-x snap-mandatory gap-5 overflow-x-auto px-[calc((100vw-min(82vw,20rem))/2)] pb-6 [scrollbar-width:none] md:gap-8 md:px-[calc((100vw-22rem)/2)] [&::-webkit-scrollbar]:hidden"
            aria-label="DOZE benefits"
          >
            {cardData.map((card, index) => (
              <motion.button
                ref={(node) => {
                  cardRefs.current[index] = node;
                }}
                key={card.title}
                type="button"
                onClick={() => setActiveFact(index)}
                className="bg-brand-ivory border-border/60 shadow-brand-blue-deep/10 w-[min(82vw,20rem)] shrink-0 snap-center overflow-hidden rounded-3xl border p-2.5 text-left shadow-xl md:w-[22rem]"
                animate={{
                  opacity: activeSlide === index ? 1 : 0.55,
                  scale: activeSlide === index ? 1 : 0.92,
                }}
                transition={{ duration: 0.3, ease: easeOut }}
                whileTap={{ scale: 0.98 }}
                aria-label={`Learn more: ${card.title}`}
                aria-current={activeSlide === index ? "true" : undefined}
              >
                <div
                  className="border-border/60 aspect-[4/3] w-full rounded-2xl border bg-cover bg-no-repeat shadow-sm"
                  style={{
                    backgroundImage: `url("${card.image ?? "/img/doze-carousel-sprite.webp"}")`,
                    backgroundSize: card.image ? "cover" : "300% 200%",
                    backgroundPosition: card.position,
                  }}
                  role="img"
                  aria-label={card.title}
                />
                <div className="flex min-h-20 items-center justify-center px-4 py-4 text-center">
                  <span
                    className="text-brand-blue-deep"
                    style={{
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontSize: "1.12rem",
                      fontWeight: 400,
                      letterSpacing: "-0.015em",
                      lineHeight: 1.2,
                    }}
                  >
                    {card.title}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-1 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => scrollToCard(activeSlide - 1)}
              className="border-brand-blue-deep/20 text-brand-blue-deep hover:bg-brand-blue-soft/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              aria-label="Previous benefit"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div
              className="flex items-center gap-2"
              aria-label="Choose a benefit"
            >
              {cardData.map((card, index) => (
                <button
                  key={card.title}
                  type="button"
                  onClick={() => scrollToCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSlide === index
                      ? "bg-brand-blue-deep w-6"
                      : "bg-brand-blue-deep/20 hover:bg-brand-blue-deep/40 w-2"
                  }`}
                  aria-label={`Show ${card.title}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToCard(activeSlide + 1)}
              className="border-brand-blue-deep/20 text-brand-blue-deep hover:bg-brand-blue-soft/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
              aria-label="Next benefit"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 pt-2 pb-24 text-center"
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
          className="bg-foreground text-background group shadow-foreground/10 mt-8 inline-flex w-full items-center justify-center gap-3 rounded-md py-3 pr-3 pl-5 font-medium shadow-lg transition-all duration-500 ease-out hover:rounded-[50px] sm:w-auto"
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
              className="bg-brand-ivory border-border shadow-brand-blue-deep/20 relative w-full max-w-md rounded-3xl border p-8 text-left shadow-2xl md:p-10"
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveFact(null)}
                className="text-brand-blue-deep/60 hover:text-brand-blue-deep hover:bg-brand-blue-soft/20 absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full transition-colors"
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
