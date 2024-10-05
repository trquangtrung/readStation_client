<template>
  <div class="mt-8">
    <swiper :spaceBetween="30" :loop="true" :pagination="{
      clickable: true,
    }" :modules="modules" class="mySwiper">
      <swiper-slide>
        <img class="w-[1920px] h-[600px]" src="assets/images/0004.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-[1920px] h-[600px]" src="assets/images/0002.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-[1920px] h-[600px]" src="assets/images/0003.png" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-[1920px] h-[600px]" src="assets/images/0001.jpg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-[1920px] h-[600px]" src="assets/images/0005.jpg" alt="">
      </swiper-slide>
    </swiper>
  </div>

</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style scoped>
:deep(.swiper) {
  width: 100%;
  height: 100%;
}

:deep(.swiper-slide) {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

:deep(.swiper-slide img) {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>