import TopNav from "@/components/navigation/top-nav";
import SideNav from "@/components/navigation/side-nav";
import BottomNav from "@/components/navigation/bottom-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-theme min-h-screen">
      <TopNav />
      <div className="grid w-full grid-cols-1 sm:grid-cols-[14rem_minmax(0,1fr)]">
        <SideNav />
        <main className="pt-4 pb-16 sm:pt-6 sm:pb-6">
          <div className="mx-auto w-full px-4 sm:px-6">{children}</div>
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
