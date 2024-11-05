import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <SidebarProvider>
          <AppSidebar />
          <SidebarTrigger className="-ml-1" />
        </SidebarProvider>
        {children} */}
        <div className="flex h-screen">
          <SidebarProvider>
            <AppSidebar className="z-10" />
            <SidebarTrigger className="-ml-1" />
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarProvider>
        </div>
      </body>
    </html>
  );
}
