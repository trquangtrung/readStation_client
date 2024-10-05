import { defineStore } from "pinia";
export const useWalletClientStore = defineStore("wallet-client-store", {
  state() {
    return {
      statistic: {},
      paymentLink: "",
      cancelPayment: {},
      updateStatus: [],
      transactions: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllStatistic() {
      try {
        const data: any = await useCustomFetch(
          "/api/v1/account/wallet/statistic"
        );
        this.statistic = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAllTransaction({ page, pageSize, sort }: any) {
      try {
        const data: any = await useCustomFetch(
          `/api/v1/account/wallet/transaction-history?${
            page ? `&page=${page}` : ""
          }${pageSize ? `&pageSize=${pageSize}` : ""}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        this.transactions = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async createTransaction(body: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          "/api/v1/account/wallet/create-transaction",
          {
            method: "POST",
            body: body,
          }
        );
        return data;
      } catch (error) {
        message.error({
          content: "Ops! Vui lòng thử lại sau.",
        });
      } finally {
        this.isSubmitting = false;
      }
    },
    async getPaymentLink(transaction_code: any) {
      const data: any = await useCustomFetch(
        `/api/v1/account/wallet/get-payment-link/${transaction_code}?${
          transaction_code ? `&transaction_code=${transaction_code}` : ""
        }`
      );
      this.paymentLink = data.data._value?.data;
      return data;
    },
    async updateTransactionStatus(transaction_code: any) {
      const data: any = await useCustomFetch(
        `/api/v1/account/wallet/update-transaction-status/${transaction_code}?${
          transaction_code ? `&transaction_code=${transaction_code}` : ""
        }`
      );
      this.updateStatus = data.data._value?.data;
      return data;
    },
    async cancelTransaction(transaction_code: any) {
      const data: any = await useCustomFetch(
        `/api/v1/account/wallet/cancel-transaction/${transaction_code}?${
          transaction_code ? `&transaction_code=${transaction_code}` : ""
        }`,
        {
          method: "POST",
        }
      );
      this.cancelPayment = data.data._value?.data;
      return data;
    },
  },
});
