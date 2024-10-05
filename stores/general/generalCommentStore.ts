import { defineStore } from "pinia";

export const useGeneralCommentStore = defineStore("general-comment-store", {
  state: () => {
    return {
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async createComment(comment: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          "/api/v1/general/comments/create",
          {
            method: "POST",
            body: JSON.stringify(comment),
          }
        );
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(id: any) {
      try {
        const data: any = await useCustomFetch(
          `/api/v1/general/comments/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateComment({ comment_id, content, status }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/general/comments/update/${comment_id}`,
          {
            method: "PUT",
            body: {
              content: content,
              status: status ?? "published",
            },
          }
        );
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
