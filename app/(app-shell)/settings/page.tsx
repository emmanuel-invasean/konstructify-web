import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Konstructify",
};

export default function SettingsPage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto w-full space-y-6 px-6 py-12">
        <h1 className="font-display text-3xl leading-tight text-[var(--deep-navy)] md:text-4xl">
          Settings
        </h1>
        <p className="text-base text-[var(--charcoal)]/80">
          Manage your account settings.
        </p>
      </section>
    </main>
  );
}
