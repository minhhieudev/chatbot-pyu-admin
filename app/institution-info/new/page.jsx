"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { InstitutionInfoService } from "@/services/institution-info.service";
import { InstitutionInfoForm } from "../_components/InstitutionInfoForm";

export default function InstitutionInfoCreatePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (payload) => {
    setIsSaving(true);
    try {
      const created = await InstitutionInfoService.create(payload);
      const id = created?._id ?? created?.id;
      if (id) {
        router.push(`/institution-info/${id}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <InstitutionInfoForm
        title="Tạo hồ sơ trường"
        isSaving={isSaving}
        onSave={handleSave}
      />
    </div>
  );
}
