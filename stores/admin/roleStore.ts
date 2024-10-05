import { defineStore } from "pinia";

export const useRoleStore = defineStore("role-store", {
  state: () => {
    return {
      roleAdmin: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllRole() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/admin/roles`);
        this.roleAdmin = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
