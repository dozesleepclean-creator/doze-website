"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  Mail,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useState, type ReactNode } from "react";

type SignupMode = "email" | "account";
type Notice = { type: "success" | "error"; message: string } | null;

const SUPABASE_URL = "https://ueplaqlwfkkjstwcgzpb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_XiWsoFzK8vk-mKRVSccGlw_9uE95XYP";

async function addToLaunchList({
  email,
  name,
  source,
}: {
  email: string;
  name?: string;
  source: SignupMode;
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
      source,
    }),
  });

  if (response.ok) return "added";
  if (response.status === 409) return "already";

  throw new Error("We could not add you to the launch list. Please try again.");
}

export default function LaunchPage(): ReactNode {
  const [mode, setMode] = useState<SignupMode>("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);

  const changeMode = (nextMode: SignupMode) => {
    setMode(nextMode);
    setNotice(null);
  };

  const handleEmailSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setNotice(null);

    try {
      const result = await addToLaunchList({ email, source: "email" });
      setNotice({
        type: "success",
        message:
          result === "already"
            ? "You’re already on the DOZE launch list."
            : "You’re on the list. We’ll keep you posted on the first DOZE drop.",
      });
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

  const handleAccountSignup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || password.length < 8 || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setNotice(null);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const authResponse = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
          data: { name: name.trim() },
        }),
      });

      const authData = (await authResponse.json()) as {
        access_token?: string;
        msg?: string;
        message?: string;
        error_description?: string;
        error?: string;
      };

      if (!authResponse.ok) {
        throw new Error(
          authData.msg ||
            authData.message ||
            authData.error_description ||
            authData.error ||
            "We could not create your account. Please try again."
        );
      }

      await addToLaunchList({
        email: normalizedEmail,
        name,
        source: "account",
      });

      setNotice({
        type: "success",
        message: authData.access_token
          ? "Your DOZE account is ready, and you’re on the launch list."
          : "Your DOZE account was created. Check your email to confirm it — you’re also on the launch list.",
      });
      setName("");
      setEmail("");
      setPassword("");
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
                onClick={() => changeMode("email")}
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
                onClick={() => changeMode("account")}
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
                  Enter your email to join the DOZE launch list.
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
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25 disabled:opacity-60"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-blue-deep px-5 py-4 font-medium text-white transition-all hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue-deep/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    <span>{isSubmitting ? "Joining..." : "Join the launch list"}</span>
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
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
                  Create an account for launch-list access now and a faster path to orders and account details later.
                </p>

                <form onSubmit={handleAccountSignup} className="mt-9 space-y-4">
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
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Your name"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25 disabled:opacity-60"
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
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@email.com"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="account-password"
                      className="mb-2 block text-xs font-medium tracking-[0.18em] uppercase text-brand-blue-deep/55"
                    >
                      Password
                    </label>
                    <input
                      id="account-password"
                      type="password"
                      required
                      minLength={8}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="At least 8 characters"
                      disabled={isSubmitting}
                      className="w-full rounded-2xl border border-border/70 bg-background px-4 py-4 text-base text-foreground outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue-soft/25 disabled:opacity-60"
                    />
                    <p className="mt-2 text-xs text-muted-foreground/70">
                      Your password is handled securely by Supabase Auth.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-blue-deep px-5 py-4 font-medium text-white transition-all hover:bg-brand-blue hover:shadow-lg hover:shadow-brand-blue-deep/10 disabled:cursor-wait disabled:opacity-60"
                  >
                    <span>{isSubmitting ? "Creating account..." : "Create DOZE account"}</span>
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
              </div>
            )}

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

            <p className="mt-8 text-center text-xs leading-relaxed text-muted-foreground/70">
              By joining, you’re asking DOZE to contact you about launch and product updates.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
