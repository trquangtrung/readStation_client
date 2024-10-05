import { defineStore } from "pinia";

export const usePublishingCompanyPublicStore = defineStore(
  "publishing-public-store",
  {
    state: () => {
      return {
        publishingCompany: [],
        isSubmitting: false,
        isLoading: false,
      };
    },
    actions: {
      // client
      async getAllPublishingCompanyClient({ page, pageSize }: any) {
        const data: any = await useCustomFetch(
          `/api/v1/public/publishing-companies?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }`
        );
        this.publishingCompany = data.data._value?.data;
        return data;
      },
    },
  }
);
