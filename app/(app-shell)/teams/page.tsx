import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Teams — Konstructify",
};

export default async function TeamsPage() {
  const session = await auth.api.getSession({
    headers: headers() as unknown as Headers,
  });

  if (!session?.session) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-[var(--concrete-gray)]">
      <section className="mx-auto w-full space-y-6 px-6 py-12">
        <h1 className="font-display text-3xl leading-tight text-[var(--deep-navy)] md:text-4xl">
          Teams
        </h1>
        <p className="text-base text-[var(--charcoal)]/80">
          Organize your teams and members.
        </p>
      </section>
    </main>
  );
}
