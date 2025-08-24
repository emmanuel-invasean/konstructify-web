import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AppShell from "@/components/layouts/app-shell";

export default async function AppShellGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth.api.getSession({
    headers: (await headers()) as unknown as Headers,
  });

  if (!session?.session) {
    redirect("/sign-in");
  }

  return <AppShell>{children}</AppShell>;
}
