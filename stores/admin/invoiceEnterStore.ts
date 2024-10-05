import { defineStore } from "pinia";
export const useInvoiceEnterStore = defineStore("invoice-enter-store", {
  state: () => {
    return {
      isLoading: false,
      isSubmitting: false,
      getAllInvoiceEnterAdmin: [],
      getOneInvoiceEnterAdmin: {},
    };
  },
  actions: {
    async getAllInvoiceEnter({ page, pageSize, search, status }: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/admin/invoice-enters?${page ? `&page=${page}` : ""}${
          pageSize ? `&pageSize=${pageSize}` : ""
        }${search ? `&search=${search}` : ""}${
          status ? `&status=${status}` : ""
        }`
      );
      this.getAllInvoiceEnterAdmin = data.data._value?.data;;
      this.isLoading = false;
      return data;
    },
    async getOneInvoiceEnter(id: string) {
      this.isLoading = true;
      const data: any = await useCustomFetch(`/api/v1/admin/invoice-enters/${id}`);
      this.isLoading = false;
      this.getOneInvoiceEnterAdmin = data.data._value?.data;;
      return data;
    },
    async createInvoiceEnter(dataPost: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(`/api/v1/admin/invoice-enters/create`, {
        method: "POST",
        body: JSON.stringify(dataPost),
      });
      this.isSubmitting = false;
      return data;
    },
    async updateInvoiceEnter({ id, valueInvoiceEnter }: any) {
      const data: any = await useCustomFetch(
        `/api/v1/admin/invoice-enters/update/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(valueInvoiceEnter),
        }
      );
      return data;
    },
  },
});
