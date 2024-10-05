import { defineStore } from "pinia";

export const usePostClientStore = defineStore("post-client-store", {
  state: () => {
    return {
      posts: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllPost({ page, pageSize, search, status, category_id }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/account/get-posts?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }${category_id ? `&category_id=${category_id}` : ""}`
      );

      this.posts = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
  },
});
