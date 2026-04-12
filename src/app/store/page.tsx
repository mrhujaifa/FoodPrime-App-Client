import Navbar from "@/components/layouts/Navbar";
import { AppSidebar } from "@/components/modules/store/components/StoreSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function StoreDashboard() {
  return (
    <>
      <Navbar></Navbar>
      <SidebarProvider className="mt-30">
        <AppSidebar className="mt-30" />
        <SidebarInset>
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
            {/* <SidebarTrigger className="-ml-1" /> */}
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="aspect-video h-12 w-full rounded-lg bg-muted/50"
              />
            ))}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
