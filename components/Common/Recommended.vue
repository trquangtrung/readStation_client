<template>
  <div class="bg-orange-200 w-1/2 rounded-lg h-fit">
    <div class="p-8">
      <div class="flex flex-col gap-5">
        <div class="text-4xl font-bold">{{ title?.title }}</div>
        <div>
          <p>{{ title?.description }}</p>
        </div>
        <div class="flex justify-end gap-2">
          <button
            @click="swiperPrevSlide"
            class="bg-white border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center -top-10"
          >
            <ArrowLeftOutlined />
          </button>
          <button
            @click="swiperNextSlide"
            class="bg-white border border-gray-300 rounded-full w-10 h-10 flex justify-center items-center -top-10"
          >
            <ArrowRightOutlined />
          </button>
        </div>
        <swiper
          :slidesPerView="4"
          :spaceBetween="1"
          :pagination="{
            clickable: true,
          }"
          :breakpoints="{
            '640': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '768': {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            '1924': {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }"
          class="mySwiper"
          @swiper="onSwiper"
          :loop="true"
          ref="swiperRef"
        >
          <swiper-slide v-for="(items, index) in data" :key="items?.id">
            <NuxtLink :to="`/products/${items?.book?.slug}-${items?.id}`">
              <img class="rounded-lg w-38 h-56" :src="items?.poster" alt="" />
            </NuxtLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
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
    return {
      swiperPrevSlide,
      swiperNextSlide,
      onSwiper,
    };
  },
  props: ["title", "data"],
};
</script>
<style scoped>
:deep(.swiper) {
  width: 100%;
  padding: 2px;
  cursor: pointer;
}

:deep(.swiper-slide) {
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
}

:deep(.swiper-slide img) {
  display: block;
  object-fit: cover;
}
</style>

<!-- <script setup>
import { ref } from 'vue';
const recomendedBooks = useHomeStore();
const feauturedRecommended = ref({})

const getDataRecomended = async () => {
    const response = await recomendedBooks.getRecomendedBooks();
    feauturedRecommended.value = response?.data?._rawValue?.data;
}
const feauturedLastest = ref({})    
const getDataLastest = async () => {
    try {
        const data = await recomendedBooks.getLastestBook();
        feauturedLastest.value = data?.data?._rawValue?.data
    } catch (error) {
        console.error(error)
    }
}

useAsyncData(async () => {
    await getDataRecomended();
    await getDataLastest();
})
</script> -->
