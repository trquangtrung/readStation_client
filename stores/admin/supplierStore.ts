import { defineStore } from "pinia";
export const useSupplierStore = defineStore("supplier-store", {
  state: () => {
    return {
      SupplierAdmin: [],
      GetSupperById: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllSupplier({ page, pageSize, search, status }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/suppliers?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.SupplierAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async createSupplier(ValueSupplier: any) {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(`/api/v1/admin/suppliers/create`, {
            method: "POST",
            body: JSON.stringify(ValueSupplier),
        });
        this.isSubmitting = false;
        return data;
    },
    async deleteSupplier(id: string) {
        const data: any = await useCustomFetch(`/api/v1/admin/suppliers/delete/${id}`, {
            method: "DELETE",
        });
        return data;
    },
    async updateSupplier({ id, valueSupplier }: any) {
      this.isSubmitting = true;
        const data: any = await useCustomFetch(`/api/v1/admin/suppliers/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(valueSupplier),
        });
        this.isSubmitting = false;
        return data;
    },
    async getSupplierById(id: string) {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/admin/suppliers/${id}`);
        this.GetSupperById = data.data._value;
        this.isLoading = false;
        return data;
    }
  },
});
