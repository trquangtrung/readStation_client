import { defineStore } from "pinia";

export const usePublishingCompanyStore = defineStore(
  "publishingCompany-store",
  {
    state: () => {
      return {
        publishingCompany: [],
        publishingCompaniesAdmin: [],
        isSubmitting: false,
        isLoading: false,
      };
    },
    actions: {
      async getAllPublishingCompany({ page, pageSize, search, status }: any) {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/publishing-companies?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${search ? `&search=${search}` : ""}${
            status ? `&status=${status}` : ""
          }`
        );
        this.publishingCompaniesAdmin = data.data._value?.data;
        this.isLoading = false;
        return data;
      },
      async getOnePublishingCompany(id: number) {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/publishing-companies/${id}`
        );
        this.isLoading = false;
        return data;
      },

      async createPublishingCompany(publishingCompany: any) {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/publishing-companies/create`,
          {
            method: "POST",
            body: JSON.stringify(publishingCompany),
          }
        );
        this.isSubmitting = false;
        return data;
      },
      async deletePublishingCompany(id: string) {
        const data: any = await useCustomFetch(
          `/api/v1/admin/publishing-companies/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        return data;
      },

      async updatePublishingCompany({ id, publishingCompany }: any) {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/admin/publishing-companies/update/${id}`,
          {
            method: "PUT",
            body: JSON.stringify(publishingCompany),
          }
        );
        this.isSubmitting = false;
        return data;
      },
    },
  }
);
