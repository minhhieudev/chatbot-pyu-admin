import apiClient from "@/lib/apiClient";

export const InstitutionInfoService = {
  list: async () => {
    const { data } = await apiClient.get("/admin/institution-info");
    return data;
  },
  getById: async (id) => {
    const { data } = await apiClient.get(`/admin/institution-info/${id}`);
    return data;
  },
  create: async (payload) => {
    const { data } = await apiClient.post("/admin/institution-info", payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await apiClient.put(`/admin/institution-info/${id}`, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await apiClient.delete(`/admin/institution-info/${id}`);
    return data;
  },
};
