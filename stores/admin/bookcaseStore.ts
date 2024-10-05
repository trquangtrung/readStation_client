import { defineStore } from "pinia";
export const useBookcaseStore = defineStore("bookcase-store", {
  state: () => {
    return {
      bookCaseAdmin: [],
      shelveOfBookcase: [],
      bookCase: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllBookcases({ page, pageSize, status, search }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/bookcases?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.isLoading = false;
      this.bookCaseAdmin = data.data._value?.data;
      return data;
    },
    async getOneBookcase(id: string) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/bookcases/${id}`);
      this.isLoading = false;
      this.bookCase = data.data._value?.data;
      return data;
    },
    async getShelveOfBookcase({ id, page, pageSize, search }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/bookcases/${id}/shelves?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}`
      );
      this.isLoading = false;
      this.shelveOfBookcase = data.data._value?.data;
      return data;
    },
    async createBookcase(bookcase: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(`/api/v1/admin/bookcases/create`, {
        method: "POST",
        body: JSON.stringify(bookcase),
      });
      this.isSubmitting = false;
    
      return data;
    },
    async deleteBookcase(id: string) {
      const data: any = await useCustomFetch(
        `/api/v1/admin/bookcases/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      return data;
    },
    async updateBookcase({ id, bookcase }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/bookcases/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(bookcase),
        }
      );
      this.isSubmitting = false;
      return data;
    },
  },
});
