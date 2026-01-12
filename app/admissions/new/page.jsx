"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AdmissionsService } from "@/services/admissions.service";
import { AdmissionForm } from "../_components/AdmissionForm";

export default function AdmissionsCreatePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (payload) => {
    setIsSaving(true);
    try {
      const created = await AdmissionsService.create(payload);
      const id = created?._id ?? created?.id;
      if (id) {
        router.push(`/admissions/${id}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <AdmissionForm
        title="Tạo bản ghi tuyển sinh"
        isSaving={isSaving}
        onSave={handleSave}
      />
    </div>
  );
}
