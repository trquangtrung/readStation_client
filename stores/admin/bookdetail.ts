import { defineStore } from "pinia";

export const useBookDetailStore = defineStore("bookdetail-store", {
  state() {
    return {
      isSubmitting: false,
      isLoading: false,
      getAllBookdetailAdmin: [],
      getOneBookDetailAdmin: [],
    };
  },
  actions: {
    async getAllBookDetail({
      page,
      pageSize,
      search,
      category_id,
      author_id,
      status,
    }: any) {
      this.isLoading = true;
      const data = await useCustomFetch(
        `/api/v1/admin/book-details?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          category_id ? `&category_id=${category_id}` : ""
        }${author_id ? `&author_id=${author_id}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.getAllBookdetailAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getOneBookDetail(id: string) {
      this.isLoading = true;
      const data = await useCustomFetch(`/api/v1/admin/book-details/${id}`);
      this.getOneBookDetailAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async createBookDetail(valueBookDetail: any) {
      this.isSubmitting = true;
      const data = await useCustomFetch(`/api/v1/admin/book-details/create`, {
        method: "POST",
        body: JSON.stringify(valueBookDetail),
      });
      this.isSubmitting = false;
      return data;
    },
    async updateBookDetail({ id, valueBookDetail }: any) {
      this.isSubmitting = true;
      const data = await useCustomFetch(
        `/api/v1/admin/book-details/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(valueBookDetail),
        }
      );
      this.isSubmitting = false;
      return data;
    },
  },
});
