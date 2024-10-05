<template>
  <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">

    <Head>
      <Title>ReadStation | {{ bookStore.book?.book?.title }}</Title>
      <Meta name="description" :content="bookStore.book?.book?.description_summary" />
      <Meta property="og:title" :content="`ReadStation | ${bookStore.book?.book?.title}`" />
      <Meta property="og:description" :content="bookStore.book?.book?.description_summary" />
      <Meta property="og:image" :content="bookStore.book?.poster" />
      <Meta property="twitter:card" :content="bookStore.book?.poster" />
    </Head>

    <div class="flex gap-6">
      <div class="w-2/6">
        <AccountProductImage :book="bookStore.book" />
      </div>
      <div class="w-4/6">
        <AccountProductDetailItem :book="bookStore.book" />
      </div>
      <div class="w-2/6">
        <AccountProductPayment :book="bookStore.book" />
      </div>
    </div>
    <div class="space-y-5 mt-5 bg-white h-auto border border-rtgray-50 overflow-hidden rounded-lg p-5">
      <h2 class="font-bold text-xl">Đánh giá</h2>
      <div>
        <p class="mb-3">Lọc theo</p>
        <div class="flex gap-4">

          <a-button :class="[
            'rounded-xl',
            arrange === 'desc' ? 'bg-orange-500 !text-white' : '',
          ]" @click="handleCheckSort('desc')">
            Mới nhất
          </a-button>
          <a-button :class="[
            'rounded-xl',
            arrange === 'asc' ? 'bg-orange-500 !text-white' : '',
          ]" @click="handleCheckSort('asc')">
            Cũ nhất
          </a-button>
          <a-button :class="[
            'rounded-xl',
            arrange === null && filter === '' ? 'bg-orange-500 !text-white' : '',
          ]" @click="handleCheckSort(null)">
            Tất cả
          </a-button>
          <a-button v-for="i in [5, 4, 3, 2, 1]" :key="i" @click="handleCheckRating(i)" :class="[
            'rounded-xl',
            filter === i ? 'bg-orange-500 !text-white' : '',
          ]">
            {{ i }} sao
          </a-button>
        </div>
        <div class="space-y-5 mt-5" v-for="review in detailReview?.reviews?.bookReviews" v-if="hasReviews">
          <div class="flex gap-5 pb-5 border-b border-rtgray-50">
            <div class="">
              <img :src="review?.user?.avatar" class="w-10 h-10 rounded-full" alt="" />
            </div>
            <div class="space-y-1">
              <p>{{ review?.user?.fullname }}</p>
              <p>
                <CommonRating :rating="review?.rating" />
              </p>
              <p>
                {{ review?.review_text }}
              </p>
            </div>
          </div>

        </div>

        <p class="text-center my-5 font-semibold" v-if="!hasReviews">
          Chưa có đánh giá.
        </p>

        <div class="flex justify-center mt-5" v-if="hasReviews">
          <a-pagination v-model:current="current" :total="detailReview?.reviews?.totalResults"
            :pageSize="detailReview?.reviews?.pageSize" show-less-items />
        </div>
      </div>




    </div>
    <div v-if="bookStore.books?.books?.length > 0">
      <h2 class="font-bold text-xl mt-5">Có thể bạn sẽ thích</h2>
      <div>
        <div v-if="bookStore.isLoading" class="flex justify-center my-5">
          <a-spin size="large" />
        </div>
        <div v-else class="relative">
          <swiper :slidesPerView="5" :spaceBetween="16" :pagination="{
            clickable: true,
          }" :modules="Pagination" class="mySwiper" @swiper="onSwiper" :loop="true" ref="swiperRef">
            <swiper-slide class="mt-10 w-full"
              v-for="(book, index) in bookStore.books?.books?.filter(item => item?.id !== bookStore.book?.id)"
              :key="book.id || index">

              <div class="flex flex-col gap-5 p-3 border rounded-lg">
                <NuxtLink :to="`/products/${book?.book?.slug}-${book?.id}`" class="mx-auto">
                  <img class="rounded-lg w-[180px] h-[284px] object-cover" :src="book?.poster" alt="" />
                </NuxtLink>

                <div class="flex flex-col gap-1">
                  <NuxtLink :to="`/products/${book?.book?.slug}-${book?.id}`"
                    class="text-xl font-bold hover:text-[#f65d4e] line-clamp-1">
                    {{ book?.book?.title }}
                  </NuxtLink>

                  <div class="text-sm text-[#999999]">
                    {{ book?.book_version }}
                  </div>
                  <div class="flex justify-start" v-if="book?.average_rate > 0">
                    <CommonRating :rating="book?.average_rate" />
                  </div>
                  <div class="flex justify-start" v-else>
                    <CommonRating :rating="5" />
                  </div>
                  <NuxtLink :to="`/products?author=${book?.book?.author?.slug}`"
                    class="text-sm text-[#999999] hover:text-[#f65d4e]">
                    {{ book?.book?.author?.author }}
                  </NuxtLink>
                  <div class="text-orange-600 font-extrabold text-xl">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(book?.price)
                    }}
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>
          <button @click="swiperPrevSlide"
            class="border absolute top-1/2 left-0 z-10 bg-white -translate-x-5 -translate-y-1/2 border-gray-300 rounded-full w-10 h-10 flex justify-center items-center">
            <ArrowLeftOutlined />
          </button>
          <button @click="swiperNextSlide"
            class="border absolute top-1/2 right-0 z-10 bg-white border-gray-300 translate-x-5 -translate-y-1/2 rounded-full w-10 h-10 flex justify-center items-center">
            <ArrowRightOutlined />
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
const bookStore = useBookPublicStore();
const detailReview = useBookDetailReviewStore();
const authorStore = useAuthorPublicStore();
const route = useRoute();
const slug = route.params.slug;
const parts = slug.split("-");
const lastPart = parts.pop();
const filter = ref("");
const arrange = ref("desc");
const current = ref(1);
const swiperInstance = ref();

// Get all author
useAsyncData(async () => {
  await authorStore.getAllAuthorClient();
});
//
const hasReviews = computed(() => detailReview?.reviews?.bookReviews.length > 0);

// Xử lý sắp xếp
const handleCheckSort = (sort) => {
  arrange.value = sort;
  filter.value = ""; // Đặt lại bộ lọc để hiển thị tất cả đánh giá
  current.value = 1; // Đặt lại trang về trang đầu tiên
  fetchReviews(); // Tải lại danh sách đánh giá với bộ lọc và sắp xếp mới

};

// Check rating
const handleCheckRating = (rating) => {
  filter.value = rating;
  current.value = 1; // Đặt lại trang về trang đầu tiên
  fetchReviews(); // Tải lại danh sách đánh giá với bộ lọc và sắp xếp mới
};
// Get One book
useAsyncData(async () => {
  try {
    await bookStore.getOneBook(slug as string);
    await bookStore.getAllBooks({
      category_id: bookStore.book.book?.category?.id
    });
  } catch (error) {
    console.error("error", error);
  }
});
function onSwiper(swiper) {
  swiperInstance.value = swiper;
}
const swiperNextSlide = () => {
  swiperInstance.value.slideNext();
};
const swiperPrevSlide = () => {
  swiperInstance.value.slidePrev();
};
// Lấy danh sách đánh giá dựa trên bộ lọc hiện tại, sắp xếp và trang
const fetchReviews = async () => {
  await detailReview.getAllReviewBook({
    book_details_id: lastPart,
    rating: filter.value,
    sort: arrange.value,
    page: current.value,
  });
};
// Lấy danh sách đánh giá khi trang được tải và khi bộ lọc thay đổi
useAsyncData(fetchReviews, {
  immediate: true,
  watch: [current, filter, arrange],
});
</script>
