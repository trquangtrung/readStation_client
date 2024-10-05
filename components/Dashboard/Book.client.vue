<template>
  <NuxtLink
    class="hover:text-[black]"
    :to="
      props?.dashboard?.status === 'active'
        ? `/products/${props.dashboard?.book?.slug}-${props.dashboard?.id}`
        : ''
    "
  >
    <div
      class="flex justify-between  hover:bg-[#f1f1f1] p-2 hover:rounded-md cursor-not-allowed"
      :class="
        props?.dashboard?.status === 'active'
          ? 'cursor-pointer'
          : 'cursor-not-allowed bg-[#e9ecef] rounded-md opacity-50'
      "
    >
      <div class="flex justify-center items-start gap-2 w-3/5">
        <img
          class="min-w-20 h-20 object-cover rounded-md"
          :src="props?.dashboard?.poster"
          alt=""
        />
        <div>
          <p class="line-clamp-1">{{ props?.dashboard?.book?.title }}</p>
          <p class="line-clamp-1">
            {{ props?.dashboard?.book_version }} -
            <span> {{ props?.dashboard?.book?.author?.author }}</span>
          </p>
          <p class="flex items-center">
            <span>{{ props?.dashboard?.average_rate }}</span>
            <span><IconYellowStar /></span>
          </p>
        </div>
      </div>
      <p class="flex justify-end items-start w-2/5">
        {{ props?.dashboard?.hire_count }} lượt thuê
      </p>
    </div>
    <hr class="my-2" />
  </NuxtLink>
</template>
<script setup>
const props = defineProps(["dashboard"]);
</script>
