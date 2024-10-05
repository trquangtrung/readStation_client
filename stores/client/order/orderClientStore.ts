import { defineStore } from "pinia";

export const useOrderClientStore = defineStore("order-client-store", {
  state: () => {
    return {
      orders: [],
      order: {},
      cancel: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  persist: true,
  actions: {
    async getAllOrder({ page, pageSize, status, search }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch("/api/v1/account/orders", {
          params: {
            page: page || undefined,
            pageSize: pageSize || undefined,
            status: status || undefined,
            search: search || undefined,
          },
        });

        // const data: any = await useCustomFetch(
        //   `/api/v1/account/orders?${page ? `&page=${page}` : ""}${
        //     pageSize ? `&pageSize=${pageSize}` : ""
        //   }${status ? `&status=${status}` : ""}${
        //     search ? `&search=${search}` : ""
        //   }`
        // );
        this.orders = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getOneOrder(id: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/account/orders/${id}`);
        this.order = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async createOrder(body: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          "/api/v1/account/orders/create",
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async cancelOrder(id: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/cancel/${id}`,
          {
            method: "PUT",
          }
        );
        this.cancel = data.data._value?.data;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getOrderPayment({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/payment/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async updateOrderPayment({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const res: any = await useCustomFetch(
          `/api/v1/account/orders/update-payment/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        if (res.data._rawValue?.status == true) {
          console.log("res", res);
        } else {
          navigateTo("/404");
        }
        return res;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async returnBook({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/return-each-book/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async returnAllBook({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/return-all/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async extensionAllBook({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/extension-all/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
    async extensionBook({ id, body }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/account/orders/extension-each-book/${id}`,
          {
            method: "POST",
            body: JSON.stringify(body),
          }
        );
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
