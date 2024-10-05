import { defineStore } from "pinia";

export const useCategoryStore = defineStore("category-store", {
  state: () => {
    return {
      categoriesAdmin: [],
      isSubmitting: false,
      isLoading: false,
    };
  },
  actions: {
    async getAllCategory({ page, pageSize, search, status, type }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/categories?type=${type}${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.categoriesAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getOneCategory(id: number) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/categories/${id}`);
      this.isLoading = false;
      return data;
    },
    async createCategory(category: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/categories/create`,
        {
          method: "POST",
          body: JSON.stringify(category),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async deleteCategory(id: string) {
      const data: any = await useCustomFetch(
        `/api/v1/admin/categories/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      return data;
    },
    async updateCategory({ id, category }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/categories/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(category),
        }
      );
      this.isSubmitting = false;
      return data;
    },
  },
});
