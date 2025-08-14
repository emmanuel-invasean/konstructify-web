import AppShell from "@/components/layouts/app-shell";

export default function AppShellGroupLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppShell>{children}</AppShell>;
}
