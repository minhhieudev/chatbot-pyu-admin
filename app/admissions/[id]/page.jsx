"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { AdmissionsService } from "@/services/admissions.service";
import { AdmissionForm } from "../_components/AdmissionForm";

export default function AdmissionsDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecord = async () => {
    if (!params?.id) return;
    setIsLoading(true);
    try {
      const record = await AdmissionsService.getById(params.id);
      setData(record);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecord();
  }, [params?.id]);

  const handleSave = async (payload) => {
    if (!params?.id) return;
    setIsSaving(true);
    try {
      await AdmissionsService.update(params.id, payload);
      await fetchRecord();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params?.id) return;
    setIsSaving(true);
    try {
      await AdmissionsService.remove(params.id);
      router.push("/admissions");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <AdmissionForm
        title={
          isLoading
            ? "Đang tải bản ghi..."
            : "Chỉnh sửa bản ghi tuyển sinh"
        }
        initialData={data}
        isSaving={isSaving}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
