"use client";

import clsx from "clsx";
import {
  BedDouble,
  BookOpen,
  Building2,
  CalendarDays,
  FileCheck2,
  Headset,
  Megaphone,
  Sparkles,
  University,
  Wallet,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { siteConfig } from "@/config/site";

const iconMap = {
  institution: Building2,
  programs: BookOpen,
  admissions: Megaphone,
  tuition: Wallet,
  campus: Warehouse,
  "student-life": Sparkles,
  application: FileCheck2,
  schedule: CalendarDays,
  housing: BedDouble,
  contact: Headset,
  default: University,
};

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center gap-3 border-b border-slate-200 px-6">
        <div className="relative h-10 w-10 overflow-hidden">
          <Image
            src="/logo-pyu.png"
            alt="PYU Logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-bold text-slate-900 uppercase tracking-tight">Đại học Phú Yên</p>
          <p className="text-xs font-semibold text-blue-600">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <p className="px-2 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">
          Cổng thông tin
        </p>
        <ul className="space-y-2">
          {siteConfig.navigation.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
            const Icon = iconMap[item.icon] ?? iconMap.default;
            return (
              <li key={item.id}>
                <Link
                  className={clsx(
                    "group flex items-center gap-3 rounded-[16px] px-3 py-3 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  href={item.path}
                >
                  <span
                    className={clsx(
                      "flex h-9 w-9 items-center justify-center rounded-xl transition-all",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 border border-slate-100 group-hover:border-blue-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="flex flex-col">
                    <span className={clsx("font-semibold", isActive ? "text-white" : "text-slate-700 group-hover:text-slate-900")}>
                      {item.label}
                    </span>
                    <span className={clsx("text-[10px] font-medium mt-0.5", isActive ? "text-blue-100" : "text-slate-400")}>
                      {item.subtitle}
                    </span>
                  </div>
                </Link>
                {item.children?.length ? (
                  <div className="ml-12 mt-2 space-y-1 border-l-2 border-slate-100 pl-4">
                    {item.children.map((child) => {
                      const childActive = pathname === child.path || pathname.startsWith(child.path + "/");
                      return (
                        <Link
                          key={child.id}
                          href={child.path}
                          className={clsx(
                            "block rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                            childActive
                              ? "bg-blue-50 text-blue-700"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                          )}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Area */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
            AD
          </div>
          <div>
            <p className="text-xs font-bold text-slate-700">Administrator</p>
            <p className="text-[10px] text-slate-500">System Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
