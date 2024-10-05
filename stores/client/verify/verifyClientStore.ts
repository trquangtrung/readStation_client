import { defineStore } from "pinia";

export const useVerifyClientStore = defineStore("verify-client-store", {
  state: () => ({
    verify: [],
    isLoading: false,
    isSubmitting: false,
  }),
  actions: {
    async getAllPost({ page, pageSize, verification_card_type, status }: any) {
      const data: any = await useCustomFetch(
        `/api/v1/account/verification-requests?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${verification_card_type ? `&verification_card_type=${verification_card_type}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.verify = data.data._value?.data;
      
      return data;
    },
    async createVerify(body: any) {
      
      this.isSubmitting = true;
      const data: any = await useCustomFetch(`/api/v1/account/verification-requests/create`, {
        method: "POST",
        body: JSON.stringify(body),
      });
      this.isSubmitting = false;
      
      return data;
    },
  },
});
