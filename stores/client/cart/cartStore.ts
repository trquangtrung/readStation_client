import { defineStore } from "pinia";

export const useCartStore = defineStore("cart-store", {
  state: () => ({
    rentNow: {},
    carts: [],
    shippingFee: 0,
  }),
  persist: {
    storage: localStorage,
  },
  actions: {
    updateNumberOfDays(id, quantity) {
      this.carts = this.carts.map((item) => {
        let fee = 0;
        if (item.price < 50000) {
          fee = 1000;
        } else if (item.price >= 50000 && item.price <= 100000) {
          fee = 2000;
        } else {
          fee = 4000;
        }
        if (item.id === id) {
          return {
            ...item,
            number_of_days: quantity,
            service_fee: quantity * fee,
          };
        } else {
          return item;
        }
      });
      this.rentNow = this.rentNow.map((item) => {
        let fee = 0;
        if (item.price < 50000) {
          fee = 1000;
        } else if (item.price >= 50000 && item.price <= 100000) {
          fee = 2000;
        } else {
          fee = 4000;
        }
        if (item.id === id) {
          return {
            ...item,
            number_of_days: quantity,
            service_fee: quantity * fee,
          };
        } else {
          return item;
        }
      });
    },
    addToRentNow(item) {
      const authStore = useAuthStore();
      let fee = 0;
      let deposit_fee = 0;

      if (item.price < 50000) {
        fee = 1000;
      } else if (item.price >= 50000 && item.price <= 100000) {
        fee = 2000;
      } else {
        fee = 4000;
      }
      //

      const isCheckVerify = authStore?.authUser?.user?.user_verified_at;
      if (isCheckVerify === null) {
        deposit_fee = (item.hire_percent / 100) * item.price;
      } else {
        deposit_fee = ((item.hire_percent - 20) / 100) * item.price;
      }
      this.rentNow = [
        {
          ...item,
          number_of_days: 5,
          service_fee: 5 * fee,
          deposit_fee: deposit_fee,
        },
      ];
    },
    addToCart(product) {
      let fee = 0;
      if (product.price < 50000) {
        fee = 1000;
      } else if (product.price >= 50000 && product.price <= 100000) {
        fee = 2000;
      } else {
        fee = 4000;
      }
      this.carts.push({
        ...product,
        number_of_days: 5,
        service_fee: 5 * fee,
      });
    },
    deleteItemCart(id) {
      this.carts = this.carts.filter((item) => item.id !== id);
    },
    addShipFee(fee) {
      this.shippingFee = fee;
    },
  },
});
