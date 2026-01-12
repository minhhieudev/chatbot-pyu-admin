"use client";

import "@/styles/globals.css";
import clsx from "clsx";
import { Space_Grotesk } from "next/font/google";

import { Providers } from "./providers";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdminHeader } from "@/components/admin-header";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="vi">
      <head>
        <title>PYU Admissions Admin</title>
      </head>
      <body
        className={clsx(
          spaceGrotesk.className,
          "min-h-screen bg-slate-100 text-slate-900 antialiased",
        )}
      >
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
