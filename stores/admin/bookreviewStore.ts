import { defineStore } from "pinia";
export const useBookReviewStore = defineStore("book-review-store", {
  state: () => {
    return {
      isLoading: false,
      isSubmitting: false,
      adminBookReviews: [],
      adminGetOneBookReview: {},
    };
  },
  actions: {
    async getAllBookReviews({ page, pageSize, rating, status, sort, search }: any) {
      this.isLoading = true;
      const data = await useCustomFetch(
        `/api/v1/admin/book-reviews?${page ? `page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${rating ? `&rating=${rating}` : ""}${
          status ? `&status=${status}` : ""
        }${sort ? `&sort=${sort}` : ""}${search ? `&search=${search}` : ""}`
      );
      this.adminBookReviews = data?.data?._value?.data;
      this.isLoading = false;
      return data;
    },
    async getOneBookReview({
      book_details_id,
      page,
      pageSize,
      rating,
      status,
      sort,
    }: any) {
      this.isLoading = true;
      const data = await useCustomFetch(
        `/api/v1/admin/book-reviews/${book_details_id}?${
          page ? `&page=${page}` : ""
        }${pageSize ? `&pageSize=${pageSize}` : ""}${
          rating ? `&rating=${rating}` : ""
        }${status ? `&status=${status}` : ""}${sort ? `&sort=${sort}` : ""}`
      );
      this.adminGetOneBookReview = data?.data?._value?.data;
      this.isLoading = false;
      return data;
    },
    async updateBookReviewStatus({ id, status }: any) {
      this.isSubmitting = true;
      const data = await useCustomFetch(`/api/v1/admin/book-reviews/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      this.isSubmitting = false;
      return data;
    },
  },
});
