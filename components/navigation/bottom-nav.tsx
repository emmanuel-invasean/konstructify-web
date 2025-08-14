"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FolderKanban, Users, Settings } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { label: "Home", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/projects", icon: FolderKanban },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="bg-background fixed inset-x-0 bottom-0 z-40 block border-t sm:hidden">
      <ul className="mx-auto grid max-w-[1200px] grid-cols-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <li key={item.href} className="flex">
              <Link
                href={item.href}
                className={cn(
                  "flex h-14 w-full flex-col items-center justify-center gap-1 text-xs outline-none",
                  "hover:bg-muted",
                  "focus-visible:ring-ring/50 focus-visible:ring-2",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-5" />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
