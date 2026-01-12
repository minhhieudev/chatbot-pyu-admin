"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { InstitutionInfoService } from "@/services/institution-info.service";
import { InstitutionInfoForm } from "../_components/InstitutionInfoForm";

export default function InstitutionInfoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecord = async () => {
    if (!params?.id) return;
    setIsLoading(true);
    try {
      const record = await InstitutionInfoService.getById(params.id);
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
      await InstitutionInfoService.update(params.id, payload);
      await fetchRecord();
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!params?.id) return;
    setIsSaving(true);
    try {
      await InstitutionInfoService.remove(params.id);
      router.push("/institution-info");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6">
      <InstitutionInfoForm
        title={isLoading ? "Đang tải hồ sơ..." : "Chỉnh sửa hồ sơ trường"}
        initialData={data}
        isSaving={isSaving}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
}
