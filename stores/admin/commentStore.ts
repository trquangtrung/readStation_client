import { defineStore } from "pinia";

export const useCommentStore = defineStore("comment-store", {
  state: () => {
    return {
      commentAdmin: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllComment({ page, pageSize, status }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/comments?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${status ? `&status=${status}` : ""}`
        );
        this.commentAdmin = data.data._value?.data;
        this.isLoading = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
