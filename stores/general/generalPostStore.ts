import { defineStore } from "pinia";

export const useGeneralPostStore = defineStore("general-post-store", {
  state: () => {
    return {
      post: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getOnePost(id: string) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/general/posts/${id}`);
        this.post = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async createPost(post: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch("/api/v1/general/posts/create", {
          method: "POST",
          body: JSON.stringify(post),
        });
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async deletePost(id: string) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/general/posts/delete/${id}`,
          {
            method: "DELETE",
          }
        );

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async updatePost({ id, post }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/general/posts/update/${id}`,
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
