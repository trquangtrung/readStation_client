import { defineStore } from "pinia";

export const useCommentClientStore = defineStore("comment-client-store", {
  state: () => {
    return {
      comments: [],
      repcomment: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllComment({ page, pageSize, sort }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/comments/get-my-comments?${
            page ? `&page=${page}` : ""
          }${pageSize ? `&pageSize=${pageSize}` : ""}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        this.comments = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getAllRepComment({ page, pageSize, sort, post_id }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/comments/get-comments-my-post?${
            page ? `&page=${page}` : ""
          }${pageSize ? `&pageSize=${pageSize}` : ""}${
            sort ? `&sort=${sort}` : ""
          }${post_id ? `&post_id=${post_id}` : ""}`
        );
        this.repcomment = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
