import type { ReactNode } from "react";

export function DozeWordmark({
  size = "nav",
  className = "",
}: {
  size?: "nav" | "footer";
  className?: string;
}): ReactNode {
  const sizeClass = size === "footer" ? "text-6xl md:text-7xl" : "text-4xl";

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
          className="absolute left-[0.48em] top-[-0.18em] text-[0.26em] leading-none tracking-normal"
        >
          z
        </span>
        <span
          aria-hidden="true"
          className="absolute left-[0.70em] top-[-0.52em] text-[0.22em] leading-none tracking-normal"
        >
          z
        </span>
        <span
          aria-hidden="true"
          className="absolute left-[0.90em] top-[-0.84em] text-[0.18em] leading-none tracking-normal"
        >
          z
        </span>
      </span>
      e
    </span>
  );
}
