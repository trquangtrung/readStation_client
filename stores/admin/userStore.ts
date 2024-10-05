import { defineStore } from "pinia";
export const useUserStore = defineStore("user-store", {
  state: () => {
    return {
      userAdmin: [],
      user: {},
      userDashboard: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  persist: true,
  actions: {
    async getUser({ page, pageSize, search, status, role_id }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/users?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${search ? `&search=${search}` : ""}${
            status ? `&status=${status}` : ""
          } ${role_id ? `&role_id=${role_id}` : ""}`
        );
        this.userAdmin = data.data._value?.data;

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getOneUser(id: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/users/get-one/${id}`
        );
        this.user = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getDashboardUser() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/admin/users/static`);
        this.userDashboard = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },

    async createUser(user: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(`/api/v1/admin/users/create`, {
          method: "POST",
          body: JSON.stringify(user),
        });
        this.isSubmitting = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

    async updateUser({ user, id }: any) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/users/update/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(user),
          }
        );
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSubmitting = false;
      }
    },
  },
});
