import { defineStore } from "pinia";

export const usePublicPostStore = defineStore("public-post-store", {
  state: () => {
    return {
      posts: [],
      postsPopular: [],
      post: {},
      isLoading: false,
      isSubmitting: false,
    };
  },
  actions: {
    async getPosts({ page, pageSize, category_id, sort }: any) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(
          `/api/v1/public/posts?${page ? `&page=${page}` : ""}${
            pageSize ? `&pageSize=${pageSize}` : ""
          }${category_id ? `&category_id=${category_id}` : ""}${
            sort ? `&sort=${sort}` : ""
          }`
        );
        // this.posts = data.data._value?.data;
        return data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    
  
    async getOnePost(slug: string) {
      try {
        this.isLoading = true;
        const data: any = await useCustomFetch(`/api/v1/public/posts/${slug}`);
        this.post = data.data._value?.data;
        this.isLoading = false;
        return data;
      } catch (error) {
        console.log(error);
      }
    },

   
    

   
    
    
  },
});
