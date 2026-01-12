"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/button";
import { Plus } from "lucide-react";

import { siteConfig } from "@/config/site";

const buildTitle = (pathname) => {
  const match = siteConfig.navigation.find(
    (item) => pathname === item.path || pathname.startsWith(item.path + "/")
  );
  return match?.label ?? "Bảng điều khiển";
};

export const AdminHeader = ({ onCreate }) => {
  const pathname = usePathname();
  const title = useMemo(() => buildTitle(pathname), [pathname]);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          {siteConfig.shortName}
        </p>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
      </div>
      {onCreate ? (
        <Button
          color="primary"
          startContent={<Plus className="h-4 w-4" />}
          onPress={onCreate}
          className="bg-emerald-600 text-white shadow-lg shadow-emerald-200"
        >
          Tạo mới
        </Button>
      ) : null}
    </header>
  );
};
