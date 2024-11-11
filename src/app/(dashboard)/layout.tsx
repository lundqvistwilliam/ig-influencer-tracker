import { AppSidebar } from "@/components/app-sidebar";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";


export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen">
        <AppSidebar className="z-10" />
        <main className="flex-1 p-4">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b mb-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumbs />
          </header>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}