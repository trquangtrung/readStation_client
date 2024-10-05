import { defineStore } from "pinia";

export const useVerificationRequestsStore = defineStore(
  "verificationRequests-store",
  {
    state: () => {
      return {
        verificationRequestsAdmin: [],
        oneVerificationRequest: {},
        isSubmitting: false,
        isLoading: false,
      };
    },
    actions: {
      async getVerificationRequests({
        page,
        pageSize,
        verification_card_type,
        search,
        status,
      }: any) {
        try {
          this.isLoading = true;
          const data: any = await useCustomFetch(
            `/api/v1/admin/verification-requests?${
              page ? `&page=${page}` : ""
            }${pageSize ? `&pageSize=${pageSize}` : ""}${
              verification_card_type
                ? `&verification_card_type=${verification_card_type}`
                : ""
            }${status ? `&status=${status}` : ""} ${
              search ? `&search=${search}` : ""
            }`
          );
          this.verificationRequestsAdmin = data.data._value?.data;

          return data;
        } catch (error) {
          console.log(error);
        } finally {
          this.isLoading = false;
        }
      },
      async getOneVerificationRequest(id: any) {
        try {
          this.isSubmitting = true;
          const data: any = await useCustomFetch(
            `/api/v1/admin/verification-requests/${id}`
          );
          this.oneVerificationRequest = data.data._value?.data;
          return data;
        } catch (error) {
          console.log(error);
        } finally {
          this.isSubmitting = false;
        }
      },
      async updateVerificationRequestStatus({ id, body }: any) {
        try {
          this.isSubmitting = true;
          const data: any = await useCustomFetch(
            `/api/v1/admin/verification-requests/update/${id}`,
            {
              method: "PUT",
              body: JSON.stringify(body),
            }
          );
          this.isSubmitting = false;
          return data;
        } catch (error) {
          console.log(error);
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  }
);
