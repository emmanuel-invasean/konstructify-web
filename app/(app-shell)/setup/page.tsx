import { Metadata } from "next";
import { OrganizationSetupForm } from "@/components/forms/organization-setup-form";
import { setupOrganization } from "@/lib/actions/organization-setup";

export const metadata: Metadata = {
  title: "Setup Organization — Konstructify",
};

export default async function SetupPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-2">
          <h1 className="font-display text-2xl leading-tight text-[var(--deep-navy)] sm:text-3xl">
            Setup Your Organization
          </h1>
          <p className="text-base text-[var(--charcoal)]/80">
            Create your organization, add your first team, and invite your
            colleagues.
          </p>
        </div>
        <OrganizationSetupForm setupAction={setupOrganization} />
      </div>
    </main>
  );
}
