import { defineStore } from "pinia";

export const useCategoryPublicStore = defineStore("category-public-store", {
  state: () => {
    return {
      categories: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllCategory({ page, pageSize, type }: any) {
      const data: any = await useCustomFetch(
        `/api/v1/public/categories?type=${type}${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }`
      );
      this.categories = data.data._value?.data;
      return data;
    },
  },
});
