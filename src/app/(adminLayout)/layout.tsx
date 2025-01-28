import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "../globals.css";
import Header from "@/components/layout/sidebar/header";
import Provider from "@/lib/provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="w-full">
              <Header />
              {/* <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
            <div className="aspect-video rounded-xl bg-slate-100/50 dark:bg-slate-800/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-slate-100/50 md:min-h-min dark:bg-slate-800/50" />
        </div> */}
              {children}
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
