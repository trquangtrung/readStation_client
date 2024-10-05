import { defineStore } from "pinia";

export const useHomeStore = defineStore("home-store", {
  state: () => {
    return {
      categoryHome: [],
      getbookFeatured: [],
      getauthorFeatured: [],
      getRecommend: [],
      getLatest: [],
      getStatisticc: [],
      isLoading: false,
    };
  },
  actions: {
    async getFeauturedCategory() {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/public/home/get-feautured-category`
        );
        this.categoryHome = data.data._value?.data;
        this.isLoading = false;
        return data;
      } catch (error) {
        console.log("error", error);
      } finally {
        this.isLoading = false;
      }
    },
    async getBookFeatured() {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        "/api/v1/public/home/get-feautured-book"
      );
      this.getbookFeatured = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getAuthorFeatured() {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        "/api/v1/public/home/get-feautured-author"
      );
      this.getauthorFeatured = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getRecomendedBooks() {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        "/api/v1/public/home/get-recommend-book"
      );
      this.getRecommend = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getLastestBook() {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        "/api/v1/public/home/get-book-lastest"
      );
      this.getLatest = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
    async getStatistic() {
      this.isLoading = true;
      const data: any = await useCustomFetch(
        "/api/v1/public/home/get-statistic"
      );
      this.getStatisticc = data.data._value?.data;
      this.isLoading = false;
      return data;
    },
  },
});
