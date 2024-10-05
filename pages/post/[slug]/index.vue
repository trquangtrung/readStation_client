<template>
  <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">
    <Head>
      <Title>ReadStation | {{ postStore?.post?.title }}</Title>
      <Meta name="description" :content="postStore.post?.summary" />
      <Meta
        property="og:title"
        :content="`ReadStation | ${postStore.post?.title}`"
      />
      <Meta property="og:description" :content="postStore.post?.summary" />
      <Meta property="og:image" :content="postStore.post?.image" />
      <Meta property="twitter:card" :content="postStore.post?.image" />
    </Head>
    <div class="flex gap-[30px]">
      <div class="w-3/4">
        <div
          class="relative overflow-hidden h-[462px] w-full bg-cover bg-center bg-no-repeat rounded-xl"
          :style="`background-image: url(${postStore.post?.image});`"
        >
          <div
            class="absolute h-[188px] w-full bottom-0 left-0 backdrop-opacity-90 backdrop-blur-sm bg-black/60"
          ></div>
          <div class="absolute h-[166px] bottom-10 left-10 font-semibold p-5">
            <div
              class="flex justify-start items-center bg-[#F1ECFF] border border-gray-100 w-fit p-[5px] gap-3 mt-4 text-sm rounded-[20px]"
            >
              <div class="h-4 w-4 bg-rtprimary rounded-full"></div>
              <div class="text-rtprimary w-fit text-sm font-normal">
                {{ postStore.post?.category?.name }}
              </div>
            </div>
            <p class="text-white text-[27px] pt-2 font-bold">
              {{ postStore.post?.title }}
            </p>
            <div class="pt-4">
              <div
                class="flex items-center text-base text-white gap-5 text-[14px] font-normal"
              >
                <div class="flex items-center gap-3">
                  <p>
                    {{
                      $dayjs(postStore.post?.created_at).format("DD/MM/YYYY")
                    }}
                  </p>
                </div>
                <div class="h-1 w-1 bg-white rounded-full"></div>
                <p>{{ postStore.post?.view }} lượt xem</p>
                <div class="h-1 w-1 bg-white rounded-full"></div>
                <p>{{ postStore.post?.countComments }} bình luận</p>
              </div>
            </div>
          </div>
        </div>

        <div v-html="postStore.post?.summary" class="my-5 font-normal"></div>
        <div v-html="postStore.post?.content" class="my-5 font-normal"></div>
        <div
          class="flex justify-between items-center p-5 shadow-md bg-white w-full h-[70px] rounded-[10px] mb-5"
        >
          <div class="text-black font-semibold text-base">
            <p>Chia sẻ với mọi người!</p>
          </div>
          <div class="flex justify-items-end items-center text-white gap-4">
            <button @click="handleShareFacebook">
              <Icon icon="fa:facebook-square" class="text-4xl text-[#1877f2]" />
            </button>
            <button @click="handleShareTwitter">
              <Icon
                icon="fa6-brands:x-twitter"
                class="text-[42px] text-[black]"
              />
            </button>
            <button @click="handleSharePinterest">
              <Icon icon="uiw:pinterest" class="text-[42px] text-[red]" />
            </button>
          </div>
        </div>

        <div>
          <h2 class="font-bold text-[20px]">Bình luận</h2>
          <BlogComment />
        </div>
        <hr class="my-4" />

        <div v-if="postStore.posts?.posts?.length > 1">
          <div class="mb-5 font-bold text-[27px]">Bài viết liên quan</div>
          <div>
            <div v-if="postStore.isLoading" class="flex justify-center my-10">
              <a-spin size="large" />
            </div>

            <div v-else class="relative">
              <swiper
                :slidesPerView="3"
                :spaceBetween="16"
                :pagination="{
                  clickable: true,
                }"
                :modules="Pagination"
                class="mySwiper"
                @swiper="onSwiper"
                :loop="true"
                ref="swiperRef"
              >
                <swiper-slide
                  v-for="post in postStore.posts?.posts?.filter(
                    (item) => item.id !== postStore.post?.id
                  )"
                  :key="post.id"
                >
                  <BlogDetailItem :post="post" />
                </swiper-slide>
              </swiper>
              <button
                @click="swiperPrevSlide"
                class="border absolute top-1/2 left-0 z-10 bg-white -translate-x-5 -translate-y-1/2 border-gray-300 rounded-full w-10 h-10 flex justify-center items-center"
              >
                <ArrowLeftOutlined />
              </button>
              <button
                @click="swiperNextSlide"
                class="border absolute top-1/2 right-0 z-10 bg-white border-gray-300 translate-x-5 -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center"
              >
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="w-1/4 space-y-5">
        <div class="p-5 shadow-md w-full h-fit rounded-[10px]">
          <div class="flex mb-5">
            <div class="">
              <a-avatar
                class="h-[100px] w-full"
                :src="postStore.post?.user?.avatar"
                shape="square"
              ></a-avatar>
            </div>
          </div>
          <div class="text-black font-normal">
            <div class="text-xl">{{ postStore.post?.user?.fullname }}</div>
            <div class="text-sm w-2/3 pt-[10px]">
              {{ postStore.post?.user?.job }}
            </div>
            <hr class="my-[10px]" />
          </div>
          <div class="text-black text-sm font-normal">
            <p>
              {{ postStore.post?.user?.story }}
            </p>
          </div>
        </div>

        <div
          v-if="postStore.postsPopular?.posts.length > 1"
          class="rounded-lg shadow-md p-5"
        >
          <div class="border-b-2 font-semibold mb-2">Bài viết nổi bật</div>
          <div v-if="postStore.isLoading" class="flex justify-center my-10">
            <a-spin size="large" />
          </div>
          <div v-else class="space-y-4 h-[400px] overflow-auto pr-4">
            <NuxtLink
              v-for="post in postStore.postsPopular?.posts?.filter(
                (item) => item.id !== postStore.post?.id
              )"
              :key="post?.id"
              :to="`/post/${post?.slug}`"
              class="block hover:bg-orange-50 p-2 rounded-lg"
            >
              <div class="flex space-x-2">
                <img
                  :src="post?.image"
                  alt=""
                  class="w-12 h-12 rounded object-cover"
                />
                <div>
                  <div class="font-semibold">
                    {{ post?.title }}
                  </div>
                  <div class="text-sm text-gray-500">
                    <div>
                      {{ $dayjs(post?.created_at).format("DD/MM/YYYY") }}
                    </div>
                    <div class="line-clamp-2">
                      {{ post?.summary }}
                    </div>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Icon } from "@iconify/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const route = useRoute();
const slug = route.params.slug;
const postStore = usePublicPostStore();
const commentStore = usePublicCommentStore();
const swiperInstance = ref();

function onSwiper(swiper) {
  swiperInstance.value = swiper;
}
const swiperNextSlide = () => {
  swiperInstance.value.slideNext();
};
const swiperPrevSlide = () => {
  swiperInstance.value.slidePrev();
};
const post = ref({
  page: 1,
  pageSize: 10,
  category_id: null,
  sort: null,
});

useAsyncData(async () => {
  try {
    await postStore.getOnePost(slug);
    if (!postStore.post) {
      navigateTo("/404");
    }
  } catch (error) {}
  try {
    await commentStore.getComment({ post_id: postStore.post?.id });
  } catch (error) {}
  try {
    const data = await postStore.getPosts({
      page: 1,
      pageSize: 9,
      category_id: postStore.post.category.id,
    });
    postStore.posts = data.data._value?.data;
  } catch (error) {}
});
useAsyncData(async () => {
  try {
    const data = await postStore.getPosts({
      page: post.value.page,
      pageSize: post.value.pageSize,
      sort: "popular",
    });
    postStore.postsPopular = data.data._value?.data;
  } catch (error) {}
});

const handleShareFacebook = () => {
  window.open(
    `http://www.facebook.com/sharer/sharer.php?u=${window.location.href}`
  );
};

const handleShareTwitter = () => {
  window.open(
    `http://www.twitter.com/share?url=${window.location.href}&text=Cùng chia sẽ kiến thức hay với ReadStation&hashtags=ReadStation`
  );
};

const handleSharePinterest = () => {
  window.open(
    `http://pinterest.com/pin/create/link/?url=${window.location.href}&description=Cùng chia sẽ kiến thức hay với ReadStation`
  );
};
</script>
<style scoped>
:deep(.swiper) {
  width: 100%;
  padding: 2px;
}
:deep(.image-style-align-center) {
  margin: auto !important;
}
</style>
