<template>
  <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">
    <div>
      <div v-if="postStore.isLoading">
        <div class="flex justify-center my-10">
          <a-spin size="large" />
        </div>
      </div>
      <div v-else v-if="postStore.posts?.posts.length > 0">
        <div class="pb-12">
          <BlogBanner :post="postStore.posts?.posts[0]" />
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3">
          <BlogItem
            v-for="(post, index) in postStore.posts?.posts.slice(1)"
            :key="post.id || index"
            :post="post"
          />
        </div>
        <div
          v-if="postStore.posts?.totalPages > 1"
          class="flex justify-center items-center mt-8"
        >
          <div>
            <a-button @click="pageChange" type="primary">Xem thêm</a-button>
          </div>
        </div>
      </div>
      <div
        class="flex justify-center flex-col items-center gap-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
        v-if="postStore.posts?.posts.length === 0"
      >
        <Icon
          icon="icon-park-outline:emotion-unhappy"
          class="text-[200px] text-gray-300"
        />
        <p class="text-4xl font-bold">Chưa có bài viết</p>
        <p class="text-2xl font-semibold">
          Bạn hãy đóng góp bài viết cho chúng tôi nhé!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const page = ref(1);
const postStore = usePublicPostStore();
const pageChange = () => {
  page.value++;
};
useAsyncData(
  async () => {
    try {
      const data = await postStore.getPosts({
        page: 1,
        pageSize: 9 * page.value,
      });
      postStore.posts = data.data._value?.data;
    } catch (error) {
    }
  },
  {
    immediate: true,
    watch: [page],
  }
);

useSeoMeta({
  title: "ReadStation | Danh Sách Bài Viết",
  ogTitle: "ReadStation | Danh Sách Bài Viết",
  description: "Bài viết trên Read Station giúp bạn hiểu rõ hơn về sách, văn học và nhiều chủ đề khác. Hãy cùng khám phá những bài viết thú vị tại Read Station!",
  ogDescription:
    "Bài viết trên Read Station giúp bạn hiểu rõ hơn về sách, văn học và nhiều chủ đề khác. Hãy cùng khám phá những bài viết thú vị tại Read Station!",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
