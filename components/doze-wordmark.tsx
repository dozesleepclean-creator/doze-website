import type { ReactNode } from "react";

export function DozeWordmark({
  size = "nav",
  className = "",
}: {
  size?: "nav" | "footer";
  className?: string;
}): ReactNode {
  const isFooter = size === "footer";
  const sizeClass = isFooter ? "text-6xl md:text-7xl" : "text-4xl";

  const zOneClass = isFooter
    ? "left-[1.15rem] top-[-0.15rem] text-[0.24em]"
    : "left-[0.72rem] top-[-0.08rem] text-[0.24em]";
  const zTwoClass = isFooter
    ? "left-[1.72rem] top-[-0.72rem] text-[0.20em]"
    : "left-[1.08rem] top-[-0.43rem] text-[0.20em]";
  const zThreeClass = isFooter
    ? "left-[2.25rem] top-[-1.25rem] text-[0.17em]"
    : "left-[1.42rem] top-[-0.76rem] text-[0.17em]";

  return (
    <span
      className={`inline-block font-normal tracking-[0.16em] ${sizeClass} ${className}`}
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      aria-label="DOZE"
    >
      do
      <span className="relative inline-block">
        z
        <span
          aria-hidden="true"
          className={`absolute leading-none tracking-normal ${zOneClass}`}
        >
          z
        </span>
        <span
          aria-hidden="true"
          className={`absolute leading-none tracking-normal ${zTwoClass}`}
        >
          z
        </span>
        <span
          aria-hidden="true"
          className={`absolute leading-none tracking-normal ${zThreeClass}`}
        >
          z
        </span>
      </span>
      e
    </span>
  );
}
