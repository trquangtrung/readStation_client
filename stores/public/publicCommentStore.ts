import { defineStore } from "pinia";

export const usePublicCommentStore = defineStore("public-comment-store", {
  state: () => {
    return {
      comment: [],

      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getComment({ page, pageSize, post_id }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/public/comments?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${post_id ? `&post_id=${post_id}` : ""}`
        );
        this.comment = data.data._value?.data;
        this.isLoading = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
