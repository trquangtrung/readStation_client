import { defineStore } from "pinia";

export const useBaseStore = defineStore("base-store", {
  state: () => {
    return {
      districts: [],
      province: [],
      ward: [],
      isSubmitting: false,
      isLoading: false,
    };
  },

  actions: {
    async getProvinces() {
      this.isLoading = true;
      const data: any = await useCustomFetch("/api/v1/public/shiip/province");
      this.province = data.data._value.data;
      this.isLoading = false;
      return data;
    },
    async getDistricts(province_id: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/public/shiip/district?province_id=${province_id}`
      );
      this.districts = data.data._value.data;
      this.isLoading = false;
      return data;
    },
    async getWards(district_id: any) {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        `/api/v1/public/shiip/ward?district_id=${district_id}`
      );
      this.ward = data.data._value.data;
      this.isLoading = false;
      return data;
    },

    async uploadImg(file: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(`/api/v1/upload/images`, {
        method: "POST",
        body: file,
      });
      this.isSubmitting = false;
      return data;
    },
    async getImgs(file: any) {
      const data: any = await useCustomFetch(`/api/v1/upload/images`, {
        method: "GET",
        body: file,
      });
      return data;
    },
    async deleteImg(publicId: any) {
      this.isSubmitting = true;
      const data: any = await useCustomFetch(
        `/api/v1/upload/images/delete/${publicId}`,
        {
          method: "DELETE",
        }
      );
      this.isSubmitting = false;
      return data;
    },
    async createContact (data:any) {
      this.isSubmitting = true;
      const res: any = await useFetch(`https://n8n.readstation.store/webhook/a071caaa-c731-43d3-97b4-6e92a74380bb`, {
        method: "POST",
        body: data,
      });
      this.isSubmitting = false;
      return data;
    },
  },
});
