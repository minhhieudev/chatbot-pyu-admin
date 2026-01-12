import apiClient from "@/lib/apiClient";

export const AdmissionsService = {
  list: async (params = {}) => {
    const { data } = await apiClient.get("/admin/admissions", { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/admin/admissions/${id}`);
    return data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/admin/admissions", payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/admin/admissions/${id}`, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/admin/admissions/${id}`);
    return data;
  },
};
