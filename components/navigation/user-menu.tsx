"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User, LogOut } from "lucide-react";

type AuthUser = {
  name?: string;
  fullName?: string;
  email?: string;
};

function getAuthUser(data: unknown): AuthUser | undefined {
  if (data && typeof data === "object") {
    const fromRoot = (data as { user?: unknown }).user;
    if (fromRoot && typeof fromRoot === "object") {
      const u = fromRoot as Partial<AuthUser>;
      return {
        name: typeof u.name === "string" ? u.name : undefined,
        fullName: typeof u.fullName === "string" ? u.fullName : undefined,
        email: typeof u.email === "string" ? u.email : undefined,
      };
    }

    const maybeSession = (data as { session?: { user?: unknown } }).session;
    if (maybeSession && typeof maybeSession === "object") {
      const u = (maybeSession as { user?: unknown }).user;
      if (u && typeof u === "object") {
        const up = u as Partial<AuthUser>;
        return {
          name: typeof up.name === "string" ? up.name : undefined,
          fullName: typeof up.fullName === "string" ? up.fullName : undefined,
          email: typeof up.email === "string" ? up.email : undefined,
        };
      }
    }
  }
  return undefined;
}

export default function UserMenu() {
  const router = useRouter();
  const { data, isPending } = useSession();
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const user = getAuthUser(data);
  const name: string | undefined = user?.name || user?.fullName;
  const email: string | undefined = user?.email;

  function computeInitials(inputName?: string, inputEmail?: string): string {
    const n = typeof inputName === "string" ? inputName.trim() : "";
    if (n) {
      const parts = n.split(/\s+/);
      const first = parts[0]?.[0] || "";
      const last = parts[parts.length - 1]?.[0] || "";
      return (first + last).toUpperCase() || "U";
    }
    const e = typeof inputEmail === "string" ? inputEmail : "";
    return e[0]?.toUpperCase() || "U";
  }
  const initials = computeInitials(name, email);

  async function handleSignOut() {
    try {
      await signOut();
      router.replace("/sign-in");
    } catch {
      // no-op
    }
  }

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open) {
          // Remove focus ring after menu closes to avoid persistent outline
          triggerRef.current?.blur();
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:bg-muted relative h-8 w-8 rounded-full p-0 focus-visible:border-transparent focus-visible:ring-0"
          aria-label="User menu"
          ref={triggerRef}
        >
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-foreground font-semibold">
              {isPending ? (
                <Skeleton className="size-full rounded-full" />
              ) : (
                initials
              )}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 rounded-xl border p-2 shadow-lg"
        align="end"
        sideOffset={8}
      >
        {/* User Info */}
        {(name || email) && (
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              {name && (
                <p className="text-sm leading-none font-medium">{name}</p>
              )}
              {email && (
                <p className="text-muted-foreground text-xs leading-none">
                  {email}
                </p>
              )}
            </div>
          </DropdownMenuLabel>
        )}

        <DropdownMenuSeparator />

        {/* Profile Link */}
        <DropdownMenuItem
          asChild
          className="focus:bg-muted focus:text-foreground rounded-md"
        >
          <Link href="/profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="text-sm">Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Sign out */}
        <DropdownMenuItem
          className="focus:bg-muted focus:text-foreground rounded-md"
          onClick={handleSignOut}
        >
          <LogOut className="text-muted-foreground mr-2 h-4 w-4" />
          <span className="text-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
