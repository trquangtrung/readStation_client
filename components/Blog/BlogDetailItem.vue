<template>
  <div class="w-full h-full">
    <NuxtLink :to="`/post/${props.post?.slug}`">
      <div class="p-4 border border-gray-100 rounded-lg bg-white shadow-md">
        <div class="flex justify-center items-center mb-4">
          <img class="rounded-md w-[100%] h-[180px] object-cover"  :src="props.post?.image" alt="" />
        </div>

        <div
          class="text-rtprimary bg-rtprimary/20 text-sm w-fit h-7 mb-4 rounded-md px-2  flex items-center"
        >
          {{ props.post?.category?.name }}
        </div>
        <div class="text-black font-semibold text-lg line-clamp-2">
          {{ props.post?.title }}
        </div>
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
        <div class="flex items-center text-base text-[#97989F] gap-5 mt-6">
          <div class="flex items-center gap-5 text-sm font-medium">
            <div >
              <a-avatar class="w-10 h-10" :src="props.post?.user?.avatar" />
            </div>
            <p class="">{{ props.post?.user?.fullname }}</p>
            <p>{{ $dayjs(props.post?.created_at).format("DD/MM/YYYY") }}</p>
          </div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps(["post"]);
</script>
