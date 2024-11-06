import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import CurrentPageBreadcrumb from "@/components/current-page-breadcrumb";
import Head from "next/head";
import DynamicBreadcrumbs from "@/components/dynamic-breadcrumb";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "IG Tracker",
  description: "",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  {/* <SidebarProvider>
    <AppSidebar />
    <SidebarTrigger className="-ml-1" />
  </SidebarProvider>
  {children} */}
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <div className="flex h-screen w-screen">
            <AppSidebar className="z-10" />
            <main className="flex-1 p-4">
              <header className="flex h-16 shrink-0 items-center gap-2 border-b mb-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                {/* <CurrentPageBreadcrumb /> */}
                <DynamicBreadcrumbs />
              </header>
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
