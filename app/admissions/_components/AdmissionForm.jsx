"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { toast } from "sonner";
import { Check, Info, Plus, Save, Trash2, FileText, ChevronRight, LayoutGrid, FileCheck, Users, HelpCircle, Phone, ShieldCheck, Sparkles, Wallet, CalendarDays as CalendarDay, MoreHorizontal } from "lucide-react";

const STATUSES = [
  { key: "draft", label: "Bản nháp" },
  { key: "published", label: "Đã xuất bản" },
  { key: "archived", label: "Lưu trữ" },
  { key: "hidden", label: "Ẩn" },
];

const DEGREES = [
  { key: "ĐH", label: "Đại học" },
  { key: "CĐ", label: "Cao đẳng" },
  { key: "TC", label: "Trung cấp" },
];

const SYSTEMS = [
  { key: "Chính quy", label: "Chính quy" },
  { key: "VHVL", label: "Vừa học vừa làm" },
  { key: "Liên thông", label: "Liên thông" },
  { key: "VB2", label: "Văn bằng 2" },
];

const SECTION_LINKS = [
  { key: "general", label: "Thông tin chung (General)", icon: LayoutGrid },
  { key: "cutoff", label: "Điểm chuẩn (Cutoff)", icon: FileCheck },
  { key: "admitted", label: "Trúng tuyển (Admitted)", icon: Users },
  { key: "additional", label: "Hướng dẫn & Quy đổi (Additional)", icon: HelpCircle },
];

const SECTION_KEYS = new Set(SECTION_LINKS.map((item) => item.key));

const getSectionFromHash = () => {
  if (typeof window === "undefined") return "general";
  const hash = window.location.hash.replace("#", "");
  return SECTION_KEYS.has(hash) ? hash : "general";
};

const DEFAULT_GENERAL = [
  {
    label: "Điều kiện & Đối tượng tuyển sinh",
    type: "eligibility",
    tags: ["eligibility", "requirements", "audience"],
    content: "",
    attachments: [],
    icon: Users
  },
  {
    label: "Phương thức tuyển sinh",
    type: "methods",
    tags: ["admission_methods", "methods"],
    content: "",
    attachments: [],
    icon: LayoutGrid
  },
  {
    label: "Danh sách ngành tuyển sinh",
    type: "majors",
    tags: ["major", "quota", "method", "combos"],
    content: "",
    attachments: [],
    icon: FileText
  },
  {
    label: "Tổ hợp xét tuyển",
    type: "combos",
    tags: ["combos", "subject", "mapping"],
    content: "",
    attachments: [],
    icon: FileCheck
  },
  {
    label: "Quy định & Tiêu chí tuyển sinh",
    type: "rules",
    tags: ["rules", "priority", "conversion", "threshold", "certificate"],
    content: "",
    attachments: [],
    icon: ShieldCheck
  },
  {
    label: "Lịch xét tuyển",
    type: "timeline",
    tags: ["timeline", "round", "schedule"],
    content: "",
    attachments: [],
    icon: CalendarDay
  },
  {
    label: "Thi năng khiếu",
    type: "aptitude",
    tags: ["aptitude", "exam", "special"],
    content: "",
    attachments: [],
    icon: Sparkles
  },
  {
    label: "Lệ phí tuyển sinh",
    type: "fees",
    tags: ["fee", "cost"],
    content: "",
    attachments: [],
    icon: Wallet
  },
  {
    label: "Thông tin liên hệ",
    type: "contacts",
    tags: ["contact", "helpdesk", "support", "hotline"],
    content: "",
    attachments: [],
    icon: Phone
  },
  {
    label: "Thông tin khác",
    type: "others",
    tags: ["others", "news", "announcement"],
    content: "",
    attachments: [],
    icon: MoreHorizontal
  }
];

const buildAdmission = () => ({
  year: 2025,
  degree: "ĐH",
  system: "Chính quy",
  status: "draft",
  general: [...DEFAULT_GENERAL],
  cutoff: [],
  admitted: [],
  additional: [],
  attachments: [],
});

const mapTags = (value) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const FIXED_GENERAL_TYPES = new Set([
  "eligibility", "methods", "majors", "combos", "rules", "timeline", "aptitude", "fees", "contacts", "others"
]);

const ContentEditor = ({ item, onChange }) => {
  const isFixed = FIXED_GENERAL_TYPES.has(item.type);
  const tagsValue = useMemo(() => (item.tags ?? []).join(", "), [item.tags]);
  const Icon = item.icon || FileText;

  // ... rest of the helper functions ...
  const updateAttachment = (index, field, fieldValue) => {
    const next = [...item.attachments];
    next[index] = { ...next[index], [field]: fieldValue };
    onChange({ ...item, attachments: next });
  };

  const addAttachment = () => {
    onChange({
      ...item,
      attachments: [...(item.attachments ?? []), { type: "", name: "", url: "" }],
    });
  };

  const removeAttachment = (index) => {
    const next = item.attachments.filter((_, idx) => idx !== index);
    onChange({ ...item, attachments: next });
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-200">
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{item.label}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.type}</p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-600">
          Chỉnh sửa
        </span>
      </div>
      <div className="mt-4 space-y-4">
        {!isFixed && (
          <Input
            label="Tags (cách nhau bởi dấu phẩy)"
            variant="faded"
            size="sm"
            value={tagsValue}
            onValueChange={(next) => onChange({ ...item, tags: mapTags(next) })}
          />
        )}
        {isFixed && (
          <div className="rounded-xl bg-slate-50 px-3 py-2 border border-slate-100 italic">
            <p className="text-[10px] text-slate-400 font-medium uppercase">Tags (Mặc định)</p>
            <p className="text-xs text-slate-500">{tagsValue}</p>
          </div>
        )}
        <Textarea
          label="Nội dung chi tiết"
          variant="faded"
          placeholder="Nhập nội dung cho mục này..."
          minRows={6}
          value={item.content}
          onValueChange={(next) => onChange({ ...item, content: next })}
          classNames={{
            input: "text-sm",
          }}
        />
        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Tài liệu đính kèm ({item.attachments?.length || 0})
            </p>
            <Button
              size="xs"
              variant="flat"
              onPress={addAttachment}
              className="h-7 px-3 text-[10px] font-bold uppercase"
              startContent={<Plus className="h-3 w-3" />}
            >
              Thêm file
            </Button>
          </div>
          <div className="mt-3 space-y-2">
            {item.attachments?.length > 0 ? (
              item.attachments.map((attachment, index) => (
                <div
                  key={`${item.type}-attachment-${index}`}
                  className="group relative rounded-xl border border-slate-200 bg-white p-3 pt-4 transition-all hover:border-emerald-200"
                >
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    isIconOnly
                    className="absolute right-1 top-1 h-6 w-6"
                    onPress={() => removeAttachment(index)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      label="Loại"
                      size="sm"
                      variant="flat"
                      value={attachment.type}
                      onValueChange={(next) => updateAttachment(index, "type", next)}
                    />
                    <Input
                      label="Tên file"
                      size="sm"
                      variant="flat"
                      value={attachment.name}
                      onValueChange={(next) => updateAttachment(index, "name", next)}
                    />
                  </div>
                  <Input
                    label="URL tài liệu"
                    size="sm"
                    variant="flat"
                    className="mt-2"
                    value={attachment.url}
                    onValueChange={(next) => updateAttachment(index, "url", next)}
                  />
                </div>
              ))
            ) : (
              <p className="py-2 text-center text-[11px] text-slate-400 italic">Chưa có file đính kèm.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdmissionForm = ({
  initialData,
  isSaving,
  onSave,
  onDelete,
  title,
}) => {
  const [form, setForm] = useState(buildAdmission());
  const [activeSection, setActiveSection] = useState("general");

  useEffect(() => {
    if (initialData) {
      // Ensure general list has all items even if initialData is missing some
      const mergedGeneral = DEFAULT_GENERAL.map(defaultItem => {
        const existing = initialData.general?.find(i => i.type === defaultItem.type);
        return existing ? { ...defaultItem, ...existing } : defaultItem;
      });

      setForm({
        ...buildAdmission(),
        ...initialData,
        general: mergedGeneral,
      });
    }
  }, [initialData]);

  useEffect(() => {
    const update = () => setActiveSection(getSectionFromHash());
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const updateGeneralItem = (index, nextItem) => {
    const nextGeneral = [...form.general];
    nextGeneral[index] = nextItem;
    setForm(prev => ({ ...prev, general: nextGeneral }));
  };

  const addListItem = (field) => {
    setForm(prev => ({
      ...prev,
      [field]: [...prev[field], { label: "", content: "", tags: [], attachments: [] }]
    }));
  };

  const updateListItem = (field, index, nextValue) => {
    const next = [...form[field]];
    next[index] = nextValue;
    setForm(prev => ({ ...prev, [field]: next }));
  };

  const removeListItem = (field, index) => {
    const next = form[field].filter((_, idx) => idx !== index);
    setForm(prev => ({ ...prev, [field]: next }));
  };

  return (
    <div className="flex h-full flex-col gap-6 max-w-7xl mx-auto">
      {/* Header card */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-emerald-500 text-white shadow-lg shadow-emerald-200">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-emerald-500">
                Hệ thống quản lý
              </p>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{title}</h1>
            </div>
          </div>
          <div className="flex gap-3">
            {onDelete && (
              <Button
                color="danger"
                variant="flat"
                className="rounded-2xl font-bold px-6"
                startContent={<Trash2 className="h-4 w-4" />}
                onPress={onDelete}
              >
                Xóa
              </Button>
            )}
            <Button
              color="primary"
              className="rounded-2xl font-bold px-8 shadow-lg shadow-emerald-200 bg-emerald-600 hover:bg-emerald-700 h-12"
              startContent={<Save className="h-5 w-5" />}
              isLoading={isSaving}
              onPress={async () => {
                try {
                  await onSave?.(form);
                  toast.success("Đã lưu thay đổi thành công!");
                } catch (err) {
                  toast.error("Gặp lỗi khi lưu dữ liệu: " + err.message);
                }
              }}
            >
              Lưu thay đổi
            </Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input
            type="number"
            label="Năm học"
            variant="bordered"
            value={form.year}
            onValueChange={(val) => setForm(prev => ({ ...prev, year: parseInt(val) }))}
          />
          <Select
            label="Bậc đào tạo"
            variant="bordered"
            selectedKeys={[form.degree]}
            onSelectionChange={(keys) => setForm(prev => ({ ...prev, degree: Array.from(keys)[0] }))}
          >
            {DEGREES.map(d => <SelectItem key={d.key}>{d.label}</SelectItem>)}
          </Select>
          <Select
            label="Hệ đào tạo"
            variant="bordered"
            selectedKeys={[form.system]}
            onSelectionChange={(keys) => setForm(prev => ({ ...prev, system: Array.from(keys)[0] }))}
          >
            {SYSTEMS.map(s => <SelectItem key={s.key}>{s.label}</SelectItem>)}
          </Select>
          <Select
            label="Trạng thái"
            variant="bordered"
            selectedKeys={[form.status]}
            onSelectionChange={(keys) => setForm(prev => ({ ...prev, status: Array.from(keys)[0] }))}
          >
            {STATUSES.map(s => <SelectItem key={s.key}>{s.label}</SelectItem>)}
          </Select>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-4 z-40 rounded-[24px] border border-slate-200 bg-white/80 p-3 shadow-md backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {SECTION_LINKS.map((section) => {
            const Icon = section.icon;
            return (
              <a
                key={section.key}
                href={`#${section.key}`}
                onClick={() => setActiveSection(section.key)}
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all ${activeSection === section.key
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                  : "text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="space-y-6">
        {activeSection === "general" && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {form.general.map((item, index) => (
              <ContentEditor
                key={item.type}
                item={item}
                onChange={(next) => updateGeneralItem(index, next)}
              />
            ))}
          </div>
        )}

        {/* Other sections - Placeholder for now as requested "trước mắt cần làm chi tiết các mục cho general" */}
        {["cutoff", "admitted", "additional"].includes(activeSection) && (
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  {SECTION_LINKS.find(s => s.key === activeSection)?.label}
                </h3>
                <p className="text-sm text-slate-500 mt-1">Quản lý danh sách các mục cho phần này.</p>
              </div>
              <Button
                variant="flat"
                color="primary"
                startContent={<Plus className="h-4 w-4" />}
                onPress={() => addListItem(activeSection)}
              >
                Thêm mục mới
              </Button>
            </div>

            <div className="space-y-4">
              {form[activeSection]?.length > 0 ? (
                form[activeSection].map((item, index) => (
                  <div key={`${activeSection}-${index}`} className="group relative">
                    <ContentEditor
                      item={{ ...item, label: item.label || `Mục #${index + 1}` }}
                      onChange={(next) => updateListItem(activeSection, index, next)}
                    />
                    <Button
                      size="sm"
                      variant="flat"
                      color="danger"
                      className="mt-2"
                      startContent={<Trash2 className="h-4 w-4" />}
                      onPress={() => removeListItem(activeSection, index)}
                    >
                      Xóa mục này
                    </Button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/30">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-400">Chưa có dữ liệu nào cho phần này.</p>
                  <Button
                    variant="light"
                    color="primary"
                    className="mt-4 font-bold"
                    onPress={() => addListItem(activeSection)}
                  >
                    Bắt đầu thêm ngay
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export { buildAdmission };
