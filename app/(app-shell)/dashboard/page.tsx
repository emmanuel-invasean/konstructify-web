import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Dashboard — Konstructify",
};

export default async function DashboardPage() {
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
          Dashboard
        </h1>
        <p className="text-base text-[var(--charcoal)]/80">
          You are signed in.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardDescription className="font-semibold text-[var(--emerald)]">
                On-time tasks
              </CardDescription>
              <CardTitle className="font-display text-3xl">96%</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription className="font-semibold text-[var(--deep-navy)]">
                RFIs closed
              </CardDescription>
              <CardTitle className="font-display text-3xl">142</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription className="font-semibold text-[var(--signal-orange)]">
                Open issues
              </CardDescription>
              <CardTitle className="font-display text-3xl text-[var(--signal-orange)]">
                12
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      </section>
    </main>
  );
}
