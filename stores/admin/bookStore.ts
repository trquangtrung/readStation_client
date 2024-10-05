import create from "@ant-design/icons-vue/lib/components/IconFont";
import { defineStore } from "pinia";

export const useBookStore = defineStore("book-store", {
  state: () => {
    return {
      adminBooks: [],
      OneBookAdmin: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    // async getAllBooks({
    //   page,
    //   pageSize,
    //   search,
    //   category_id,
    //   author_id,
    //   publishing_company_id,
    //   sort,
    //   rating,
    // }: any) {
    //   const data: any = await useCustomFetch(
    //     `/api/v1/books?${page ? `&page=${page}` : ""}${
    //       pageSize ? `&pageSize=${pageSize}` : ""
    //     }${search ? `&search=${search}` : ""}${
    //       category_id ? `&category_id=${category_id}` : ""
    //     }${author_id ? `&author_id=${author_id}` : ""}${
    //       publishing_company_id
    //         ? `&publishing_company_id=${publishing_company_id}`
    //         : ""
    //     }${sort ? `&sort=${sort}` : ""}${rating ? `&rating=${rating}` : ""}`
    //   );
    //   this.books = data.data._value?.data;
    //   return data;
    // },

    // async getOneBook(slug: string) {
    //   const data: any = await useCustomFetch(`/api/v1/books/get-one/${slug}`);
    //   this.book = data.data._value?.data;
    //   return data;
    // },

    // Admin
    async createBook(valuecreateBook: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        "/api/v1/admin/books/create-full",
        {
          method: "POST",
          body: JSON.stringify(valuecreateBook),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async getAdminBooks({
      page,
      pageSize,
      search,
      category_id,
      author_id,
      status,
    }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/books?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          category_id ? `&category_id=${category_id}` : ""
        }${author_id ? `&author_id=${author_id}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.adminBooks = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async deleteBook(id: string) {
      const data: any = await useCustomFetch(
        `/api/v1/admin/books/delete/${id}`,
        {
          method: "DELETE",
        }
      );
      return data;
    },
    async updateBook({ id, value }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/books/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(value),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async getOneBookAdmin(id: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/books/${id}`);
      this.OneBookAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
  },
});
