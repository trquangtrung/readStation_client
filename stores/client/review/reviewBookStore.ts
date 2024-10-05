import { defineStore } from "pinia";

export const useReviewBookClientStore = defineStore(
  "review-book-client-store",
  {
    state: () => {
      return {
        isLoading: false,
        isSubmitting: false,
      };
    },
    actions: {
      async createReviewBook(body: any) {
        try {
          this.isLoading = true;
          const data: any = await useCustomFetch(
            "/api/v1/account/book-reviews/create",
            {
              method: "POST",
              body: JSON.stringify(body),
            }
          );
          return data;
        } catch (error) {
          console.log("error", error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  }
);
