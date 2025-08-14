import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "default" | "inverse";
};

export function Logo({ className, variant = "default" }: LogoProps) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "focus-visible:ring-ring/50 flex items-center gap-2 rounded-md outline-none focus-visible:ring-2",
        className,
      )}
      aria-label="Go to dashboard"
    >
      <span
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-md font-semibold",
          variant === "inverse"
            ? "bg-white/10 text-white"
            : "bg-accent text-accent-foreground",
        )}
      >
        K
      </span>
      <span className="font-display text-base tracking-wide">Konstructify</span>
    </Link>
  );
}

export default Logo;
