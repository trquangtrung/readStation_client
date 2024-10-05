<template>
  <div class="w-full">
    <div class="p-5 bg-white border border-rtgray-50 rounded-lg">
      <div class="flex flex-col items-center">
        <div class="mb-8 w-full h-[370px] flex justify-center">
          <a-image :height="370" :src="selectedImage" alt="Main Image"
            class="w-full h-full object-contain rounded-lg" />
        </div>

        <div class="w-full overflow-hidden">
          <swiper :slides-per-view="7" :space-between="7" @swiper="onSwiper" :loop="true" ref="swiperRef">
            <swiper-slide v-for="(image, index) in [bookStore.book?.poster, ...bookStore.book?.images,]" :key="index">
              <div class="h-[54px] w-[54px] p-[6px] cursor-pointer border border-rtgray-50 rounded-lg"
                @click="selectImage(image)">
                <img :src="image" alt="Thumbnail Image" class="rounded-lg w-full h-full object-contain" />
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";

import "swiper/css";
import "swiper/css/pagination";
import { ref } from "vue";
const bookStore = useBookPublicStore();
const selectedImage = ref(null);
// const visible = ref(false);

watchEffect(() => {
  if (bookStore?.book) {
    selectedImage.value = bookStore?.book?.poster;
  }
});

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

const selectImage = (image) => {
  selectedImage.value = image;
};
</script>

<style scoped>
:deep(.swiper) {
  width: 100%;
  height: 100%;
}

:deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
}
</style>
