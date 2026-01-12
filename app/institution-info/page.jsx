"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { RefreshCcw, Plus, ArrowRight } from "lucide-react";

import { InstitutionInfoService } from "@/services/institution-info.service";

const shortText = (text, length = 140) => {
  if (!text) return "Chưa cập nhật";
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export default function InstitutionInfoPage() {
  const [records, setRecords] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const fetchRecords = async () => {
    setIsBusy(true);
    try {
      const data = await InstitutionInfoService.list();
      setRecords(data ?? []);
    } finally {
      setIsBusy(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-6">
      <div className="rounded-[28px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
              Thông tin trường
            </p>
            <h1 className="text-3xl font-bold text-slate-900">Danh sách nội dung</h1>
            <p className="mt-2 text-sm text-slate-500">
              Quản lý mô tả chung, tài liệu đính kèm và các mục nội dung mở rộng.
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="flat"
              isLoading={isBusy}
              onPress={fetchRecords}
              startContent={<RefreshCcw className="h-4 w-4" />}
            >
              Tải lại
            </Button>
            <Button
              color="primary"
              startContent={<Plus className="h-4 w-4" />}
              as={Link}
              href="/institution-info/new"
            >
              Tạo mới
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {records.length > 0 ? (
          records.map((record) => (
            <div
              key={record._id ?? record.id}
              className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
                    {record.category}
                  </p>
                  <h2 className="text-xl font-bold text-slate-900">Thông tin trường</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    {shortText(record.content)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="flat"
                  as={Link}
                  href={`/institution-info/${record._id ?? record.id}`}
                  endContent={<ArrowRight className="h-4 w-4" />}
                >
                  Chi tiết
                </Button>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Tài liệu</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {record.attachments?.length || 0} file đính kèm
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Mục nội dung</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {record.sections?.length || 0} mục mở rộng
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[24px] border border-dashed border-emerald-200 bg-white p-6 text-sm text-slate-500">
            Chưa có bản ghi thông tin trường. Hãy tạo mới để nhập dữ liệu.
          </div>
        )}
      </div>
    </div>
  );
}
