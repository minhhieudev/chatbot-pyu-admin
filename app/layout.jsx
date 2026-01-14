"use client";

import "@/styles/globals.css";
import clsx from "clsx";

import { AdminHeader } from "@/components/admin-header";
import { AdminSidebar } from "@/components/admin-sidebar";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="vi">
      <head>
        <title>PYU Admissions Admin</title>
      </head>
      <body className={clsx("min-h-screen bg-slate-100 text-slate-900 ")}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex gap-0 h-screen bg-slate-50">
            <AdminSidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <AdminHeader />
              <main className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
