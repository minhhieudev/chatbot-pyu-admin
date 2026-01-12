"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Save, RefreshCcw, Building2, History, Target, Phone, MapPin, Users, Globe, Image as ImageIcon, Video, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import clsx from "clsx";

const STATUSES = [
  { key: "draft", label: "Bản nháp" },
  { key: "published", label: "Công khai" },
  { key: "archived", label: "Lưu trữ" },
];

const STANDARD_SECTIONS = [
  { type: "overview", title: "Tổng quan", order: 1, icon: Building2 },
  { type: "history", title: "Lịch sử hình thành", order: 2, icon: History },
  { type: "mission", title: "Chức năng & Mục tiêu", order: 3, icon: Target },
  { type: "contact", title: "Địa chỉ & Liên hệ", order: 4, icon: Phone },
  { type: "facilities", title: "Cơ sở vật chất", order: 5, icon: MapPin },
  { type: "staff", title: "Đội ngũ", order: 6, icon: Users },
  { type: "cooperation", title: "Hợp tác & Phát triển", order: 7, icon: Globe },
];

const buildSection = (defaults = {}) => ({
  title: "",
  type: "",
  tags: [],
  content: "",
  attachments: [],
  order: 99,
  ...defaults,
});

const buildForm = () => ({
  category: "ThongTinTruong",
  content: "Thông tin chi tiết xem tại các mục con (sections).", // Default placeholder
  sections: STANDARD_SECTIONS.map(s => {
    // Create section but omit the icon property which is not for DB
    const { icon, ...rest } = s;
    return buildSection(rest);
  }),
  attachments: [],
  media: {
    images: [],
    videos: [],
  },
  status: "draft",
  tenant: "pyu",
});

const mapList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const SectionEditor = ({ section, onChange }) => {
  return (
    <div className="grid grid-cols-1 gap-6 animate-in fade-in zoom-in-95 duration-200">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-9">
          <Input
            label="Tiêu đề hiển thị"
            placeholder="Nhập tiêu đề mục..."
            value={section.title}
            onValueChange={(next) => onChange({ ...section, title: next })}
            variant="bordered"
            color="primary"
            classNames={{
              label: "text-blue-900/70 font-medium",
              inputWrapper: "border-slate-200 focus-within:border-blue-500 bg-white"
            }}
          />
        </div>
        <div className="md:col-span-3">
          <Input
            label="Thứ tự"
            type="number"
            value={String(section.order)}
            onValueChange={(next) => onChange({ ...section, order: Number(next) })}
            variant="bordered"
            color="primary"
          />
        </div>
      </div>

      <Textarea
        label="Nội dung chi tiết"
        placeholder={`Nhập thông tin giới thiệu cho phần ${section.title}...`}
        minRows={12}
        value={section.content}
        onValueChange={(next) => onChange({ ...section, content: next })}
        variant="faded"
        color="primary"
        classNames={{
          label: "text-blue-900/70 font-medium",
          input: "text-base leading-relaxed text-slate-700",
          inputWrapper: "bg-white border-slate-200 focus-within:ring-2 ring-blue-100"
        }}
      />
    </div>
  );
};

export const InstitutionInfoForm = ({
  initialData,
  isSaving,
  onSave,
  title,
}) => {
  const [form, setForm] = useState(buildForm());
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (initialData) {
      // Merge properties
      const mergedForm = {
        ...buildForm(),
        ...initialData,
        media: {
          ...buildForm().media,
          ...(initialData.media || {}),
        },
      };

      // Ensure all standard sections exist
      const currentSections = mergedForm.sections || [];
      const mergedSections = STANDARD_SECTIONS.map((std) => {
        const existing = currentSections.find((s) => s.type === std.type);
        if (existing) {
          return { ...existing, order: existing.order || std.order, title: existing.title || std.title };
        }
        const { icon, ...rest } = std;
        return buildSection(rest);
      });

      // Append any custom sections that might exist (if allowed, for now just replace with standard set or append?)
      // User requested "fixed" sections, so we prioritize the standard ones.
      // If there are other sections in DB not in standard, we could keep them at the end.
      const otherSections = currentSections.filter(
        (s) => !STANDARD_SECTIONS.find((std) => std.type === s.type)
      );

      mergedForm.sections = [...mergedSections, ...otherSections].sort((a, b) => a.order - b.order);

      setForm(mergedForm);
    }
  }, [initialData]);

  const updateSection = (type, nextSection) => {
    const index = form.sections.findIndex(s => s.type === type);
    if (index === -1) return;

    const next = [...form.sections];
    next[index] = nextSection;
    setForm((prev) => ({ ...prev, sections: next }));
  };

  const handleSave = async () => {
    // Ensure specific fields are preserved
    const payload = {
      ...form,
      // Force category if lost
      category: "ThongTinTruong"
    };

    try {
      await onSave?.(payload);
      toast.success("Cập nhật thông tin thành công!", {
        description: "Dữ liệu đã được lưu vào hệ thống."
      });
    } catch (error) {
      toast.error("Có lỗi xảy ra!", {
        description: "Không thể lưu dữ liệu. Vui lòng thử lại."
      });
    }
  };

  const currentSection = form.sections.find(s => s.type === activeTab);

  return (
    <div className="flex h-full flex-col gap-6 max-w-[1400px] mx-auto pb-20 px-4">
      {/* 1. Simplified Top Action Bar */}
      <div className="flex items-center justify-between sticky top-4 z-30 bg-white/80 backdrop-blur-lg p-3 rounded-2xl border border-slate-200/60 shadow-sm">
        <h2 className="text-lg font-bold text-slate-700 px-2 flex items-center gap-2">
          <span className="w-2 h-8 rounded-full bg-blue-600 block"></span>
          {title}
        </h2>

        <div className="flex gap-2">
          <Button
            variant="light"
            color="primary"
            size="sm"
            startContent={<RefreshCcw size={16} />}
            onPress={() => window.location.reload()}
          >
            Làm mới
          </Button>
          <Button
            color="primary"
            variant="shadow"
            size="md"
            startContent={<Save className="h-4 w-4" />}
            isLoading={isSaving}
            onPress={handleSave}
            className="bg-blue-600 font-semibold shadow-blue-500/20"
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">

        {/* Main Content Area */}
        <div className="xl:col-span-9 flex flex-col gap-6">

          {/* 2. TAB NAVIGATION */}
          <div className="bg-white rounded-[20px] p-2 border border-slate-100 shadow-sm overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {STANDARD_SECTIONS.map((section) => {
                const isActive = activeTab === section.type;
                const Icon = section.icon;
                return (
                  <button
                    key={section.type}
                    onClick={() => setActiveTab(section.type)}
                    className={clsx(
                      "flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold border",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm"
                        : "bg-transparent text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                    <span>{section.title}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* 3. ACTIVE SECTION EDITOR */}
          <div className="bg-white rounded-[24px] border border-slate-100 shadow-xl shadow-slate-200/50 p-6 min-h-[500px]">
            {currentSection ? (
              <SectionEditor
                key={currentSection.type}
                section={currentSection}
                onChange={(next) => updateSection(activeTab, next)}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Chọn một mục để chỉnh sửa
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar: Settings (Kept as requested, but cleaner) */}
        <div className="xl:col-span-3">
          <div className="sticky top-24 space-y-6">

            {/* Status Card */}
            <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider flex items-center gap-2">
                <CheckCircle2 size={14} /> Trạng thái
              </h3>

              <Select
                label="Chế độ hiển thị"
                selectedKeys={[form.status]}
                onSelectionChange={(keys) =>
                  setForm((prev) => ({ ...prev, status: Array.from(keys)[0] }))
                }
                variant="bordered"
                color="primary"
                classNames={{
                  trigger: "border-slate-200"
                }}
              >
                {STATUSES.map((option) => (
                  <SelectItem key={option.key}>{option.label}</SelectItem>
                ))}
              </Select>
            </div>

            {/* Media Card */}
            <div className="rounded-[24px] border border-slate-100 bg-white p-5 shadow-sm">
              <h3 className="text-xs font-bold uppercase text-slate-400 mb-4 tracking-wider flex items-center gap-2">
                <ImageIcon size={14} /> Thư viện
              </h3>
              <div className="space-y-4">
                <Input
                  label="Hình ảnh"
                  placeholder="https://..."
                  startContent={<ImageIcon size={16} className="text-slate-400" />}
                  value={form.media.images.join(", ")}
                  onValueChange={(next) =>
                    setForm((prev) => ({
                      ...prev,
                      media: { ...prev.media, images: mapList(next) },
                    }))
                  }
                  size="sm"
                  variant="bordered"
                  color="primary"
                />
                <Input
                  label="Video"
                  placeholder="https://..."
                  startContent={<Video size={16} className="text-slate-400" />}
                  value={form.media.videos.join(", ")}
                  onValueChange={(next) =>
                    setForm((prev) => ({
                      ...prev,
                      media: { ...prev.media, videos: mapList(next) },
                    }))
                  }
                  size="sm"
                  variant="bordered"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
