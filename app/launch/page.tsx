"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Instagram,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";

type Notice = { type: "success" | "error"; message: string } | null;

const SUPABASE_URL = "https://ueplaqlwfkkjstwcgzpb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_XiWsoFzK8vk-mKRVSccGlw_9uE95XYP";

async function addToLaunchList({
  email,
  name,
}: {
  email: string;
  name?: string;
}): Promise<"added" | "already"> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/launch_list`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      name: name?.trim() || null,
      source: "email",
    }),
  });

  if (response.ok) return "added";
  if (response.status === 409) return "already";

  throw new Error("We could not add you to the waitlist. Please try again.");
}

export default function LaunchPage(): ReactNode {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const handleSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setNotice(null);

    try {
      const result = await addToLaunchList({ email, name });
      setNotice({
        type: "success",
        message:
          result === "already"
            ? "You’re already on the DOZE waitlist. We’ll keep you posted."
            : "You’re in. We’ll keep you posted as DOZE gets closer to launch.",
      });
      setName("");
      setEmail("");
    } catch (error) {
      setNotice({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      id="main-content"
      className="bg-background min-h-screen px-6 pt-36 pb-24 md:pt-48 md:pb-32"
    >
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-brand-blue-deep/65 hover:text-brand-blue-deep mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors md:mb-14"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to DOZE
        </Link>

        <div className="border-border/60 bg-brand-ivory shadow-brand-blue-deep/5 grid overflow-hidden rounded-[2rem] border shadow-xl lg:grid-cols-[0.92fr_1.08fr]">
          <section className="bg-brand-blue px-7 py-12 text-white md:px-12 md:py-16 lg:min-h-[42rem] lg:px-14 lg:py-20">
            <p className="mb-5 text-xs font-medium tracking-[0.28em] text-white/65 uppercase">
              DOZE · Pre-launch
            </p>
            <h1
              className="max-w-lg text-5xl leading-[0.95] font-normal tracking-tight md:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Get in before the first drop.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/75">
              We’re finalizing the liner, packaging, and production now. Join
              the waitlist and be first to know when DOZE is ready.
            </p>

            <div className="mt-12 space-y-5 text-sm text-white/80 md:mt-16">
              {[
                "First-drop launch updates",
                "Early access when ordering opens",
                "Behind-the-scenes product progress",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="https://www.instagram.com/dozesleepclean/"
              target="_blank"
              rel="noreferrer"
              className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-white/75 transition hover:text-white"
            >
              <Instagram className="h-4 w-4" />
              Follow the build @dozesleepclean
            </a>
          </section>

          <section className="px-6 py-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <div className="bg-brand-blue-soft/20 text-brand-blue-deep mb-8 flex h-12 w-12 items-center justify-center rounded-full">
              <Mail className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <p className="text-brand-blue-deep/50 mb-3 text-xs font-medium tracking-[0.2em] uppercase">
              Early access
            </p>
            <h2
              className="text-brand-blue-deep text-3xl font-normal tracking-tight md:text-4xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Join the DOZE waitlist.
            </h2>
            <p className="text-muted-foreground mt-4 max-w-lg text-base leading-relaxed">
              No checkout yet and no pressure. Just launch updates while we
              finish building the product.
            </p>

            <form onSubmit={handleSignup} className="mt-9 space-y-4">
              <div>
                <label
                  htmlFor="launch-name"
                  className="text-brand-blue-deep/55 mb-2 block text-xs font-medium tracking-[0.18em] uppercase"
                >
                  First name{" "}
                  <span className="text-muted-foreground tracking-normal normal-case">
                    (optional)
                  </span>
                </label>
                <div className="relative">
                  <UserRound className="text-brand-blue-deep/35 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
                  <input
                    id="launch-name"
                    type="text"
                    autoComplete="given-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    className="border-border/70 bg-background text-foreground focus:border-brand-blue focus:ring-brand-blue-soft/25 w-full rounded-2xl border py-4 pr-4 pl-11 text-base transition outline-none focus:ring-2 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="launch-email"
                  className="text-brand-blue-deep/55 mb-2 block text-xs font-medium tracking-[0.18em] uppercase"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="text-brand-blue-deep/35 pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
                  <input
                    id="launch-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    disabled={isSubmitting}
                    className="border-border/70 bg-background text-foreground focus:border-brand-blue focus:ring-brand-blue-soft/25 w-full rounded-2xl border py-4 pr-4 pl-11 text-base transition outline-none focus:ring-2 disabled:opacity-60"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-blue-deep hover:bg-brand-blue hover:shadow-brand-blue-deep/10 flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 font-medium text-white transition-all hover:shadow-lg disabled:cursor-wait disabled:opacity-60"
              >
                <span>{isSubmitting ? "Joining..." : "Join the waitlist"}</span>
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            {notice && (
              <div
                role="status"
                className={`mt-6 rounded-2xl border px-4 py-4 text-sm leading-relaxed ${
                  notice.type === "success"
                    ? "border-brand-blue-soft/50 bg-brand-blue-soft/15 text-brand-blue-deep"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {notice.message}
              </div>
            )}

            <p className="text-muted-foreground/70 mt-8 text-center text-xs leading-relaxed">
              By joining, you’re asking DOZE to contact you about launch and
              product updates. You can unsubscribe anytime.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
