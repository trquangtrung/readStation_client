import { defineStore } from "pinia";

export const useShippingMethodsStore = defineStore("shippingMethods-store", {
  state: () => {
    return {
      shippingMethodsAdmin: [],
      shippingMethod: {},
      isSubmitting: false,
      isLoading: false,
    };
  },
  actions: {
    async getAllShippingMethods({ page, pageSize, search, status }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/shipping-methods?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${search ? `&search=${search}` : ""}${
            status ? `&status=${status}` : ""
          }`
        );
        this.shippingMethodsAdmin = data.data._value?.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getOneShippingMethod(id: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/shipping-methods/${id}`
        );
        this.shippingMethod = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async createShippingMethod(shippingMethod: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/shipping-methods/create`,
          {
            method: "POST",
            body: JSON.stringify(shippingMethod),
          }
        );
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async updateShippingMethod({ shippingMethod, id }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/shipping-methods/update/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(shippingMethod),
          }
        );
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteShippingMethod(id: any) {
      try {
        const data: any = await useCustomFetch(
          `/api/v1/admin/shipping-methods/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
