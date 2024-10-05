<template>
  <div>
    <NuxtLink :to="`/products/${data?.book?.slug}-${data?.id}`">
      <div>
        <img
          class="rounded-lg w-44 h-64 hover:relative hover:brightness-50"
          :src="data?.poster"
          alt=""
        />
      </div>
    </NuxtLink>
    <div class="flex flex-col gap-1 mt-2">
      <NuxtLink
        :to="`/products/${data?.book?.slug}-${data?.id}`"
        class="text-xl font-bold hover:text-[#f65d4e] line-clamp-2" 
      >
        {{ data?.book?.title }}
      </NuxtLink>
      <div class="flex justify-start">
        <CommonStar rating="5" />
      </div>
      <div class="text-[#f65d4e] font-extrabold text-xl">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data?.price)
        }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["data"],
};
</script>
