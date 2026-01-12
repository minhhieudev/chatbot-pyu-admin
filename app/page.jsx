"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="p-8">
      <div className="rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-500">
          PYU Admissions
        </p>
        <h1 className="mt-2 text-3xl font-black text-slate-900">
          Quản trị dữ liệu tuyển sinh
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          Tập trung cập nhật các thông báo tuyển sinh, điểm chuẩn,
          danh sách trúng tuyển và các thông tin bổ sung theo từng năm.
        </p>
        <Link
          href="/admissions"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-200 transition hover:bg-emerald-500"
        >
          Mở trang Tuyển sinh
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
