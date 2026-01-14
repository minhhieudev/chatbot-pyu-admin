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
    icon: Users
  },
  {
    label: "Phương thức tuyển sinh",
    type: "methods",
    tags: ["admission_methods", "methods"],
    content: "",
    icon: LayoutGrid
  },
  {
    label: "Danh sách ngành tuyển sinh",
    type: "majors",
    tags: ["major", "quota", "method", "combos"],
    content: "",
    icon: FileText
  },
  {
    label: "Tổ hợp xét tuyển",
    type: "combos",
    tags: ["combos", "subject", "mapping"],
    content: "",
    icon: FileCheck
  },
  {
    label: "Quy định & Tiêu chí tuyển sinh",
    type: "rules",
    tags: ["rules", "priority", "conversion", "threshold", "certificate"],
    content: "",
    icon: ShieldCheck
  },
  {
    label: "Lịch xét tuyển",
    type: "timeline",
    tags: ["timeline", "round", "schedule"],
    content: "",
    icon: CalendarDay
  },
  {
    label: "Thi năng khiếu",
    type: "aptitude",
    tags: ["aptitude", "exam", "special"],
    content: "",
    icon: Sparkles
  },
  {
    label: "Lệ phí tuyển sinh",
    type: "fees",
    tags: ["fee", "cost"],
    content: "",
    icon: Wallet
  },
  {
    label: "Thông tin liên hệ",
    type: "contacts",
    tags: ["contact", "helpdesk", "support", "hotline"],
    content: "",
    icon: Phone
  },
  {
    label: "Thông tin khác",
    type: "others",
    tags: ["others", "news", "announcement"],
    content: "",
    icon: MoreHorizontal
  }
];

const DEFAULT_CUTOFF = [
  {
    label: "Điểm chuẩn đợt 1",
    type: "round_1",
    tags: ["round_1", "main", "thpt", "dgnl", "ccqt"],
    content: "",
    icon: FileCheck
  },
  {
    label: "Điểm chuẩn đợt 2",
    type: "round_2",
    tags: ["round_2", "secondary", "thpt"],
    content: "",
    icon: FileCheck
  },
  {
    label: "Điểm chuẩn bổ sung",
    type: "supplementary",
    tags: ["supplementary", "additional", "thpt"],
    content: "",
    icon: FileCheck
  },
  {
    label: "Thông tin khác",
    type: "others",
    tags: ["others", "notes", "explanation"],
    content: "",
    icon: Info
  }
];

const DEFAULT_ADMITTED = [
  {
    label: "Thống kê trúng tuyển",
    type: "statistics",
    tags: ["statistics", "numbers", "overview"],
    content: "",
    icon: Users
  },
  {
    label: "Danh sách trúng tuyển theo ngành",
    type: "by_major",
    tags: ["major", "breakdown", "quota"],
    content: "",
    icon: FileText
  },
  {
    label: "Kết quả xét tuyển",
    type: "results",
    tags: ["results", "admission", "outcome"],
    content: "",
    icon: Check
  },
  {
    label: "Thông tin nhập học",
    type: "enrollment",
    tags: ["enrollment", "registration", "next_steps"],
    content: "",
    icon: CalendarDay
  },
  {
    label: "Thông tin khác",
    type: "others",
    tags: ["others", "notes", "announcements"],
    content: "",
    icon: MoreHorizontal
  }
];

const DEFAULT_ADDITIONAL = [
  {
    label: "Thông báo quan trọng",
    type: "announcements",
    tags: ["announcements", "important", "news"],
    content: "",
    icon: Info
  },
  {
    label: "Thay đổi chính sách",
    type: "policy_changes",
    tags: ["policy", "changes", "updates"],
    content: "",
    icon: ShieldCheck
  },
  {
    label: "Hỗ trợ kỹ thuật",
    type: "technical_support",
    tags: ["support", "technical", "help"],
    content: "",
    icon: HelpCircle
  },
  {
    label: "Thông tin bổ sung",
    type: "supplementary",
    tags: ["supplementary", "extra", "additional"],
    content: "",
    icon: FileText
  },
  {
    label: "Thông tin khác",
    type: "others",
    tags: ["others", "miscellaneous", "various"],
    content: "",
    icon: MoreHorizontal
  }
];

const buildSectionGroup = (sections) => ({
  sections,
  attachments: [],
});

const buildAdmission = () => ({
  year: 2025,
  degree: "ĐH",
  system: "Chính quy",
  status: "draft",
  general: buildSectionGroup([...DEFAULT_GENERAL]),
  cutoff: buildSectionGroup([...DEFAULT_CUTOFF]),
  admitted: buildSectionGroup([...DEFAULT_ADMITTED]),
  additional: buildSectionGroup([...DEFAULT_ADDITIONAL]),
  attachments: [],
});

const mapTags = (value) =>
  value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

const getSectionsFromGroup = (group) => {
  if (Array.isArray(group)) return group;
  if (group?.sections && Array.isArray(group.sections)) return group.sections;
  return [];
};

const mergeSections = (defaults, group) => {
  const existingSections = getSectionsFromGroup(group);
  const merged = defaults.map((defaultItem) => {
    const existing = existingSections.find((item) => item.type === defaultItem.type);
    return existing ? { ...defaultItem, ...existing } : defaultItem;
  });
  const extra = existingSections.filter(
    (item) => !defaults.some((defaultItem) => defaultItem.type === item.type)
  );
  return [...merged, ...extra];
};

const normalizeGroup = (group, defaults) => ({
  sections: mergeSections(defaults, group),
  attachments: Array.isArray(group?.attachments) ? group.attachments : [],
});

const FIXED_SECTION_TYPES = new Set([
  ...DEFAULT_GENERAL.map((item) => item.type),
  ...DEFAULT_CUTOFF.map((item) => item.type),
  ...DEFAULT_ADMITTED.map((item) => item.type),
  ...DEFAULT_ADDITIONAL.map((item) => item.type)
]);

const uploadFile = async (fileBlob) => {
  try {
    const formData = new FormData();
    formData.append('file', fileBlob);
    formData.append('upload_preset', 'e0rggou2');
    const safeName = fileBlob.name.replace(/[^a-zA-Z0-9.]/g, '_');
    formData.append('public_id', `chat-pyu/${safeName.split('.')[0]}`);
    const response = await fetch("https://api.cloudinary.com/v1_1/dpxcvonet/raw/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    return data;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
};

const ContentEditor = ({ item, onChange }) => {
  const isFixed = FIXED_SECTION_TYPES.has(item.type);
  const tagsValue = useMemo(() => (item.tags ?? []).join(", "), [item.tags]);
  const Icon = item.icon || FileText;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-blue-200">
      <div className="flex items-center justify-between border-b border-slate-50 pb-3">
        <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{item.label}</p>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">{item.type}</p>
          </div>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-600">
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
      </div>
    </div>
  );
};

const FileUpload = ({ attachments, onChange }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      toast.loading("Đang tải lên file...");
      const result = await uploadFile(file);
      const newAttachment = {
        name: file.name,
        url: result.secure_url,
        type: file.type,
      };
      onChange([...attachments, newAttachment]);
      toast.dismiss();
      toast.success("Tải lên thành công!");
    } catch (error) {
      toast.dismiss();
      toast.error("Lỗi tải lên: " + error.message);
    }
  };

  const removeAttachment = (index) => {
    const next = attachments.filter((_, idx) => idx !== index);
    onChange(next);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-slate-800">Tài liệu đính kèm ({attachments.length})</p>
        <label>
          <input
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            size="sm"
            variant="flat"
            as="span"
            startContent={<Plus className="h-4 w-4" />}
          >
            Thêm file
          </Button>
        </label>
      </div>
      <div className="space-y-2">
        {attachments.length > 0 ? (
          attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm font-medium text-slate-800">{attachment.name}</p>
                  <p className="text-xs text-slate-500">{attachment.type}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  as="a"
                  href={attachment.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Xem
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => removeAttachment(index)}
                >
                  Xóa
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-400 py-4">Chưa có file nào.</p>
        )}
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
      setForm({
        ...buildAdmission(),
        ...initialData,
        general: normalizeGroup(initialData.general, DEFAULT_GENERAL),
        cutoff: normalizeGroup(initialData.cutoff, DEFAULT_CUTOFF),
        admitted: normalizeGroup(initialData.admitted, DEFAULT_ADMITTED),
        additional: normalizeGroup(initialData.additional, DEFAULT_ADDITIONAL),
      });
    }
  }, [initialData]);

  useEffect(() => {
    const update = () => setActiveSection(getSectionFromHash());
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  const updateSectionItem = (groupKey, index, nextItem) => {
    setForm(prev => {
      const group = prev[groupKey] ?? buildSectionGroup([]);
      const nextSections = [...(group.sections ?? [])];
      nextSections[index] = nextItem;
      return { ...prev, [groupKey]: { ...group, sections: nextSections } };
    });
  };

  const addListItem = (groupKey) => {
    setForm(prev => {
      const group = prev[groupKey] ?? buildSectionGroup([]);
      const nextSections = [
        ...(group.sections ?? []),
        { label: "", content: "", tags: [] }
      ];
      return { ...prev, [groupKey]: { ...group, sections: nextSections } };
    });
  };

  const updateListItem = (groupKey, index, nextValue) => {
    setForm(prev => {
      const group = prev[groupKey] ?? buildSectionGroup([]);
      const nextSections = [...(group.sections ?? [])];
      nextSections[index] = nextValue;
      return { ...prev, [groupKey]: { ...group, sections: nextSections } };
    });
  };

  const removeListItem = (groupKey, index) => {
    setForm(prev => {
      const group = prev[groupKey] ?? buildSectionGroup([]);
      const nextSections = (group.sections ?? []).filter((_, idx) => idx !== index);
      return { ...prev, [groupKey]: { ...group, sections: nextSections } };
    });
  };

  const updateGroupAttachments = (groupKey, attachments) => {
    setForm(prev => ({
      ...prev,
      [groupKey]: { ...prev[groupKey], attachments }
    }));
  };

  return (
    <div className="flex h-full flex-col gap-6 max-w-7xl mx-auto">
      {/* Header card */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-[20px] bg-blue-500 text-white shadow-lg shadow-blue-200">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-blue-500">
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
              className="rounded-2xl font-bold px-8 shadow-lg shadow-blue-200 bg-blue-600 hover:bg-blue-700 h-12"
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
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
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
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {form.general.sections.map((item, index) => (
                <ContentEditor
                  key={item.type}
                  item={item}
                  onChange={(next) => updateSectionItem("general", index, next)}
                />
              ))}
            </div>
            <FileUpload
              attachments={form.general.attachments}
              onChange={(attachments) => updateGroupAttachments("general", attachments)}
            />
          </>
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
              {form[activeSection]?.sections?.length > 0 ? (
                form[activeSection].sections.map((item, index) => (
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
            <FileUpload
              attachments={form[activeSection].attachments}
              onChange={(attachments) => updateGroupAttachments(activeSection, attachments)}
            />
          </div>
        )}

      </div>
    </div>
  );
};

export { buildAdmission };
