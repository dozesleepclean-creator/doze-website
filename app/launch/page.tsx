"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";

type SignupMode = "email" | "account";

export default function LaunchPage(): ReactNode {
  const [mode, setMode] = useState<SignupMode>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [emailStarted, setEmailStarted] = useState(false);

  const handleEmailSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;

    setEmailStarted(true);

    const subject = encodeURIComponent("DOZE Launch List Signup");
    const body = encodeURIComponent(
      `Please add ${email.trim()} to the DOZE launch list.`
    );

    window.location.href = `mailto:dozesleepclean@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-36 md:pb-32 md:pt-48">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-brand-blue-deep/65 hover:text-brand-blue-deep mb-10 inline-flex items-center gap-2 text-sm font-medium transition-colors md:mb-14"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to DOZE
        </Link>

        <div className="grid overflow-hidden rounded-[2rem] border border-border/60 bg-brand-ivory shadow-xl shadow-brand-blue-deep/5 lg:grid-cols-[0.92fr_1.08fr]">
          <section className="bg-brand-blue px-7 py-12 text-white md:px-12 md:py-16 lg:min-h-[42rem] lg:px-14 lg:py-20">
            <p className="mb-5 text-xs font-medium tracking-[0.28em] uppercase text-white/65">
              First access
            </p>
            <h1
              className="max-w-lg text-5xl font-normal leading-[0.95] tracking-tight md:text-6xl"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              Your fresh start begins here.
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/75">
              Join the DOZE launch list for first-drop updates, early access, and product news before launch day.
            </p>

            <div className="mt-12 space-y-5 text-sm text-white/80 md:mt-16">
              {[
                "First-drop launch updates",
                "Early access when DOZE goes live",
                "No unnecessary inbox clutter",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="px-6 py-10 md:px-12 md:py-14 lg:px-14 lg:py-16">
            <div className="mb-9 flex rounded-full bg-brand-blue-soft/15 p-1.5">
              <button
                type="button"
                onClick={() => setMode("email")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-all ${
                  mode === "email"
                    ? "bg-brand-ivory text-brand-blue-deep shadow-sm"
                    : "text-brand-blue-deep/55 hover:text-brand-blue-deep"
                }`}
              >
                Join with email
              </button>
              <button
                type="button"
                onClick={() => setMode("account")}
                className={`flex-1 rounded-full px-4 py-3 text-sm font-medium transition-all ${
                  mode === "account"
                    ? "bg-brand-ivory text-brand-blue-deep shadow-sm"
                    : "text-brand-blue-deep/55 hover:text-brand-blue-deep"
                }`}
              >
                Create account
              </button>
            </div>

            {mode === "email" ? (
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-soft/20 text-brand-blue-deep">
                  <Mail className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2
                  className="text-3xl font-normal tracking-tight text-brand-blue-deep md:text-4xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Just the updates.
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Enter your email and we’ll start a pre-filled message to DOZE so we can add you to the launch list.
                </p>

                <form onSubmit={handleEmailSignup} className="mt-9">
                  <label
                    htmlFor="launch-email"
                    className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-brand-blue-deep/55"
                  >
                    Email address
                  </label>
                  <input
                    id="launch-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@email.com"
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25"
                  />
                  <button
                    type="submit"
                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-blue-deep px-5 py-4 font-medium text-white transition-all hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue-deep/10"
                  >
                    Join the launch list
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                {emailStarted && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    Your email app should open with the DOZE signup message ready to send.
                  </p>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue-soft/20 text-brand-blue-deep">
                  <UserRound className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h2
                  className="text-3xl font-normal tracking-tight text-brand-blue-deep md:text-4xl"
                  style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  Your DOZE account.
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
                  Create an account for launch-list access now and, later, a faster path to orders and account details.
                </p>

                <div className="mt-9 space-y-4">
                  <div>
                    <label
                      htmlFor="account-name"
                      className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-brand-blue-deep/55"
                    >
                      Name
                    </label>
                    <input
                      id="account-name"
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="account-email"
                      className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-brand-blue-deep/55"
                    >
                      Email address
                    </label>
                    <input
                      id="account-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@email.com"
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25"
                    />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-brand-blue-soft/40 bg-brand-blue-soft/10 p-5">
                  <div className="flex gap-3">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue-deep" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Secure password/account creation will switch on once the DOZE authentication database is connected. We won’t fake or store passwords insecurely in the meantime.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled
                  className="mt-5 flex w-full cursor-not-allowed items-center justify-center gap-3 rounded-2xl bg-brand-blue-deep/35 px-5 py-4 font-medium text-white"
                >
                  Create DOZE account
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}

            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/70">
              By joining, you’re asking DOZE to contact you about launch and product updates.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
