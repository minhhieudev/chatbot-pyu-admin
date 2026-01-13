"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { RefreshCcw, Plus, ArrowRight, Calendar, FileText } from "lucide-react";
import { AdmissionsService } from "@/services/admissions.service";

const StatusBadge = ({ status }) => {
    const colors = {
        draft: "bg-slate-100 text-slate-600 border-slate-200",
        published: "bg-emerald-100 text-emerald-700 border-emerald-200",
        archived: "bg-amber-100 text-amber-700 border-amber-200",
        hidden: "bg-rose-100 text-rose-700 border-rose-200",
    };
    const color = colors[status] || colors.draft;
    return (
        <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${color}`}>
            {status}
        </span>
    );
};

export default function AdmissionsList({ defaultTab = "general" }) {
    const [records, setRecords] = useState([]);
    const [isBusy, setIsBusy] = useState(false);
    const getGroupCount = (group) => {
        if (Array.isArray(group)) return group.length;
        if (group?.sections && Array.isArray(group.sections)) return group.sections.length;
        return 0;
    };

    const fetchRecords = async () => {
        setIsBusy(true);
        try {
            const data = await AdmissionsService.list();
            setRecords(data ?? []);
        } finally {
            setIsBusy(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="rounded-[32px] border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-white p-8 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="h-6 w-1 bg-emerald-500 rounded-full"></div>
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-emerald-500">
                                Admission Portal
                            </p>
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Tuyển sinh - {defaultTab.toUpperCase()}</h1>
                        <p className="mt-2 text-sm text-slate-500 font-medium">
                            Quản lý các đợt tuyển sinh, nhắm mục tiêu vào phần <span className="text-emerald-600 font-bold">{defaultTab}</span>.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            variant="flat"
                            className="rounded-2xl font-bold bg-white/50 backdrop-blur-sm border border-emerald-100"
                            isLoading={isBusy}
                            onPress={fetchRecords}
                            startContent={<RefreshCcw className="h-4 w-4" />}
                        >
                            Làm mới
                        </Button>
                        <Link href={`/admissions/new#${defaultTab}`}>
                            <Button
                                color="primary"
                                className="rounded-2xl font-bold px-8 shadow-lg shadow-emerald-200 bg-emerald-600 hover:bg-emerald-700"
                                startContent={<Plus className="h-4 w-4" />}
                            >
                                Tạo mới
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                {records.length > 0 ? (
                    records.map((record) => (
                        <div
                            key={record._id ?? record.id}
                            className="group relative rounded-[32px] border border-slate-100 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-50"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500 transition-colors">
                                        <Calendar className="h-8 w-8" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">
                                            Năm {record.year}
                                        </h2>
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="font-bold text-emerald-600 text-sm">{record.degree}</span>
                                            <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                                            <span className="font-medium text-slate-500 text-sm">{record.system}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <StatusBadge status={record.status} />
                                    <Link href={`/admissions/${record._id ?? record.id}#${defaultTab}`}>
                                        <Button
                                            size="sm"
                                            variant="light"
                                            className="font-bold text-emerald-600 rounded-xl"
                                            endContent={<ArrowRight className="h-4 w-4" />}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className={`rounded-2xl p-4 border border-transparent transition-all ${defaultTab === 'general' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50'}`}>
                                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">General</p>
                                    <p className="text-lg font-black text-slate-700">
                                        {getGroupCount(record.general)} <span className="text-xs font-medium text-slate-400">mục</span>
                                    </p>
                                </div>
                                <div className={`rounded-2xl p-4 border border-transparent transition-all ${['cutoff', 'admitted'].includes(defaultTab) ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50'}`}>
                                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Kết quả</p>
                                    <p className="text-lg font-black text-slate-700">
                                        {getGroupCount(record.cutoff) + getGroupCount(record.admitted)} <span className="text-xs font-medium text-slate-400">mục</span>
                                    </p>
                                </div>
                                <div className={`rounded-2xl p-4 border border-transparent transition-all ${defaultTab === 'additional' ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50'}`}>
                                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Tài liệu</p>
                                    <p className="text-lg font-black text-slate-700">
                                        {getGroupCount(record.additional)} <span className="text-xs font-medium text-slate-400">files</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full rounded-[32px] border-2 border-dashed border-slate-100 bg-white p-12 text-center">
                        <div className="mx-auto h-20 w-20 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-400 mb-4">
                            <FileText className="h-10 w-10" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Chưa có dữ liệu tuyển sinh</h3>
                        <p className="text-slate-500 mt-2 max-w-sm mx-auto">Bắt đầu tạo đợt tuyển sinh mới để cập nhật thông tin cho thí sinh.</p>
                        <Link href="/admissions/new">
                            <Button
                                color="primary"
                                className="mt-6 rounded-2xl font-bold px-8 shadow-lg shadow-emerald-200"
                            >
                                Tạo bản ghi đầu tiên
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
