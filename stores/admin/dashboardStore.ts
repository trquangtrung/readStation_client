import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard-store", {
  state: () => {
    return {
      dashboardAdmin: [],
      dashboardBook: [],
      dashboardInvoice: [],
      dashboradStaticUser: [],
      dashboradStaticColumnOrder: [],
      dashboradStatusOrder: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllDashboard() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/dashboard/statistic-admin`
        );
        this.dashboardAdmin = data.data._value?.data;

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getBookDashboard() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/dashboard/book-hire-top-by-month`
        );
        this.dashboardBook = data.data._value?.data;

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getInvoiceDashboard() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/dashboard/invoice-enter-by-month`
        );
        this.dashboardInvoice = data.data._value?.data;

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getStaticUser() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/dashboard/statistic-pie-user`
        );
        this.dashboradStaticUser = data.data._value?.data;

        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async getStaticColumnOrder({ sort }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/dashboard/statistic-column-order?sort=${sort}`
        );
        this.dashboradStaticColumnOrder = data.data._value?.data.dataChart;
        this.dashboradStatusOrder = data.data._value?.data.static;


        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
