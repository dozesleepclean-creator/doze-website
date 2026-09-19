import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Join the Waitlist | DOZE",
  description:
    "Join the DOZE waitlist for product updates and first access when ordering opens.",
};

export default function LaunchLayout({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return children;
}
