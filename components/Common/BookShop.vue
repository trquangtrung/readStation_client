<template>
  <div class="py-5 border-b">
    <div class="flex flex-col gap-5 px-5 border-x">
      <NuxtLink class="mx-auto" :to="`/products/${props?.book?.book?.slug}-${props?.book?.id}`">
        <img class="rounded-lg w-[180px] h-[284px] object-cover" :src="props?.book?.poster" alt="" />
      </NuxtLink>

      <div class="flex flex-col gap-1">
        <NuxtLink class="text-xl font-bold hover:text-[#f65d4e] line-clamp-1"
          :to="`/products/${props?.book?.book?.slug}-${props?.book?.id}`">
          {{ props?.book?.book?.title }}
        </NuxtLink>

        <div class="text-sm text-[#999999]">
          {{ props?.book?.book_version }}
        </div>
        <div class="flex justify-start">
          <CommonRating v-if="props?.book?.average_rate !== 0" :rating="props?.book?.average_rate" />
          <CommonRating v-else :rating="5"></CommonRating>
        </div>
        <NuxtLink :to="`/products?author=${props?.book?.book?.author?.slug}`"
          class="text-sm text-[#999999] hover:text-[#f65d4e]">
          {{ props?.book?.book?.author?.author }}
        </NuxtLink>

        <div class="text-orange-600 font-extrabold text-xl">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(props?.book?.price)
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["book"]);
const authorStore = useAuthorPublicStore();
useAsyncData(async () => {
  await authorStore.getAllAuthorClient();
});
</script>
