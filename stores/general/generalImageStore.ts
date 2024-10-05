import { defineStore } from "pinia";

export const useGeneralImageStore = defineStore("general-image-store", {
  state: () => {
    return {
      image: [],
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getAllImage() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/upload/images`);
        this.image = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteImage(publicId: string) {
      try {
        this.isSubmitting = true;
        const data: any = await useCustomFetch(
          `/api/v1/upload/images/delete/${publicId}`,
          {
            method: "DELETE",
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
