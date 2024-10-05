import { defineStore } from "pinia";

export const useBookPublicStore = defineStore("book-public-store", {
  state: () => {
    return {
      books: [],
      book: {},
      isLoading: true,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllBooks({
      page,
      pageSize,
      search,
      category_id,
      author_id,
      publishing_company_id,
      sort,
      rating,
    }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/public/books?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${search ? `&search=${search}` : ""}${
            category_id ? `&category_id=${category_id}` : ""
          }${author_id ? `&author_id=${author_id}` : ""}${
            publishing_company_id
              ? `&publishing_company_id=${publishing_company_id}`
              : ""
          }${sort ? `&sort=${sort}` : ""}${rating ? `&rating=${rating}` : ""}`
        );
        this.books = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getOneBook(slug: string) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/public/books/${slug}`);
        this.book = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
