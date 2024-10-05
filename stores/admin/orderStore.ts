import { defineStore } from "pinia";
export const useOrderStore = defineStore("order-store", {
  state: () => {
    return {
      isLoading: false,
      isSubmitting: false,
      getAllOrderAdmin: [],
      getOneOrderAdmin: {},
      statistic: {},
    };
  },
  actions: {
    async statisticOrder() {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/orders/statistic`);
      this.statistic = data?.data?._value?.data;
      this.isLoading = false;
      return data;
    },
    async getAllOrder({ page, pageSize, search, status }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/orders?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.getAllOrderAdmin = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getOneOrder(id: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/orders/${id}`);
      this.getOneOrderAdmin = data.data._value;
      this.isLoading = false;
      return data;
    },
    async updateOrderStatus({ id, body }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/orders/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async creatOrder(valueOrder: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/orders/store-has-user`,
          {
            method: "POST",
            body: JSON.stringify(valueOrder),
          }
        );
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async retrunEachBook({ id, valueRetunEachBook }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/orders/return-each-book/${id}`,
        {
          method: "POST",
          body: JSON.stringify(valueRetunEachBook),
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async extensionAllBook({ id, days }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/orders/extension-all/${id}`,
        {
          body: JSON.stringify(days),
          method: "POST",
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async extensionOneBook({ id, body }: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/orders/extension-each-book/${id}`,
        {
          body: JSON.stringify(body),
          method: "POST",
        }
      );
      this.isSubmitting = false;
      return data;
    },
  },
});
