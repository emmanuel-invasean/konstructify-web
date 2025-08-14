import Logo from "@/components/logo";
import UserMenu from "@/components/navigation/user-menu";

export default function TopNav() {
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--deep-navy)] text-white">
      <div className="flex h-14 w-full items-center justify-between px-6">
        <Logo variant="inverse" />
        <div className="flex items-center gap-2">
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
