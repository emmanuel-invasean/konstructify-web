import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — Konstructify",
};

export default function DashboardPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full space-y-6 px-6 py-12">
        <h1 className="font-display text-3xl leading-tight text-[var(--deep-navy)] md:text-4xl">
          Dashboard
        </h1>
        <p className="text-base text-[var(--charcoal)]/80">
          You are signed in.
        </p>
      </section>
    </main>
  );
}
