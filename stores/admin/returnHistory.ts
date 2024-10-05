import { defineStore } from "pinia";
export const useReturnHistoryStore = defineStore("return-history-store", {
  state: () => {
    return {
      ReturnHistoryAdmin: [],
      ReturnLoanDetail: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllReturnHistory({ page, pageSize, search, status }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/return-histories?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.ReturnHistoryAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getOneReturnHistory(id: string) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/return-histories/${id}`
      );
      this.ReturnLoanDetail = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async updateReturnHistory({ id, dataUpdateReturnHistory }: any) {
      this.isSubmitting = true;
      const data = await useCustomFetch(
        `/api/v1/admin/return-histories/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(dataUpdateReturnHistory),
        }
      );
      this.isSubmitting = false;
      return data;
    },
  },
});
