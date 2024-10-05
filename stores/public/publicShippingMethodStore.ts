import { defineStore } from "pinia";

export const useShippingMethodPublicStore = defineStore(
  "public-shipping-store",
  {
    state: () => {
      return {
        shippings: [],
        isLoading: false,
        isSubmitting: false,
      };
    },
    actions: {
      async getAllShipping() {
        try {
          this.isLoading = true;
          const data: any = await useCustomFetch(
            `/api/v1/public/shipping-methods`
          );
          this.shippings = data.data._value?.data;
          return data;
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      },
    },
  }
);
