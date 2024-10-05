import { defineStore } from "pinia";

export const usePublicCategoryStore = defineStore("public-category-store", {
  state: () => {
    return {
      categories: [],
      isSubmitting: false,
      isLoading: false,
    };
  },
  actions: {
    async getAllCategoryClient({ page, pageSize, type }: any) {
      const data: any = await useCustomFetch(
        `/api/v1/public/categories?type=${type}${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }`
      );
      console.log({ data });
      this.categories = data.data._value?.data;
      return data;
    },
  },
});
