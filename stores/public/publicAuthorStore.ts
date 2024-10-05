import { defineStore } from "pinia";
export const useAuthorPublicStore = defineStore("author-public-store", {
  state: () => {
    return {
      authorClient: [],
      isSubmitting: false,
      isLoading: false,
    };
  },
  actions: {
    async getAllAuthorClient({ page, pageSize }: any) {
      const data: any = await useCustomFetch(
        `/api/v1/public/authors?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }`
      );
      this.authorClient = data.data._value?.data;
      return data;
    },
  },
});
