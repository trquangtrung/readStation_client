import { defineStore } from "pinia";

export const useTransactionStore = defineStore("transaction-store", {
  state: () => {
    return {
      transaction: [],
      balanceHoding: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getTransaction({ page, pageSize, sort }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/transactions?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${sort ? `&sort=${sort}` : ""}`
        );
        this.transaction = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getBalanceHoding() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/transactions/balance-holding`
        );
        this.balanceHoding = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
