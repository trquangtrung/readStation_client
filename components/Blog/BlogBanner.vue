<template>
  <NuxtLink :to="`/post/${props.post?.slug}`">
    <div
      class="relative h-[450px] w-full overflow-hidden bg-cover bg-center bg-no-repeat rounded-xl"
      :style="`background-image: url(${props.post?.image});`"
    >
      <div
        class="absolute h-[200px] w-full bottom-0 left-0 backdrop-opacity-90  backdrop-blur-sm bg-black/60"
      ></div>
      <div class="absolute bottom-10 left-10 font-semibold text-4xl">
        <div
          class="text-rtprimary bg-rtprimary/20 text-sm w-fit mb-4 rounded-md px-2 h-7 flex items-center"
        >
          {{ props.post?.category?.name }}
        </div>

        <p class="text-white font-semibold text-4xl">
          {{ props.post?.title }}
        </p>
        
        <div class="mt-6">
          <div class="flex items-center text-base text-white gap-5">
            <div class="flex items-center gap-3">
              <div>
                <a-avatar class="w-10 h-10" :src="props.post?.user?.avatar" />
              </div>
              <p class="">{{ props.post?.user?.fullname }}</p>
            </div>
            <p>{{ $dayjs(props.post?.created_at).format("DD/MM/YYYY") }}</p>
            <div class="flex items-center gap-3">
          <div class="flex items-center gap-1">
            <Icon icon="basil:eye-outline" class="text-lg" />
            {{ props.post?.view }}
          </div>
          <div class="flex items-center gap-1">
            <Icon icon="fa6-regular:comment-dots" class="text-base" />
            {{ props.post?.countComments }}
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps(["post"]);
</script>
