import { defineStore } from "pinia";
export const useAuthorStore = defineStore("author-store", {
  state: () => {
    return {
      AuthorAdmin: [],
      getOneAuthorAdmin: [],
      isSubmitting: false,
      isLoading: false,
    };
  },
  actions: {
    // Admin
    async getAllAuthor({ page, pageSize, search, status }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/authors?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.AuthorAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async createAuthor(ValueAuthor: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(`/api/v1/admin/authors/create`, {
        method: "POST",
        body: JSON.stringify(ValueAuthor),
      });
      this.isSubmitting = false;
      return data;
    },
    async deleteAuthor(id: string) {
      const data: any = await useCustomFetch(
        `/api/v1/admin/authors/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      return data;
    },
    async updateAuthor({ id, valueAuthor }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/authors/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(valueAuthor),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async getAuthorById(id: string) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/authors/${id}`);
      this.getOneAuthorAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
  },
});
