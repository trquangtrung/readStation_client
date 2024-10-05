import { defineStore } from "pinia";

export const usePostStore = defineStore("post-store", {
  state: () => {
    return {
      postsAdmin: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllPost({
      page,
      pageSize,
      search,
      category_id,
      status,
      type,
    }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/posts?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${search ? `&search=${search}` : ""}${
            category_id ? `&category_id=${category_id}` : ""
          }${status ? `&status=${status}` : ""}${type ? `&type=${type}` : ""}`
        );
        this.postsAdmin = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async updatePost({ id, post }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/posts/update/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(post),
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
