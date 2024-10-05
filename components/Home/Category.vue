<template>
  <div class="h-auto mx-auto container md:px-20 px-8">
    <div class="px-5 py-7 flex flex-col gap-20">
      <div class="text-3xl font-bold">Thể loại</div>
      <div class="grid grid-cols-6 gap-10">
        <div class="group flex flex-col items-center cursor-pointer w-[200px]"
          v-for="(category, index) in getCategory?.categoryHome" :key="index">
          <NuxtLink style="display: contents;" :to="`/products?category=${category.slug}`">
            <div class="w-40 h-40 border items-center flex  justify-center  rounded-full relative bg-[##F6F6F6] group-hover:bg-orange-300">
              <div
                class="absolute flex justify-center left-4 items-center bottom-9 group-hover:-translate-y-4 transition-transform">
                <img class="w-32 h-38 border rounded-lg" :src="category?.image" alt="" />
              </div>
            </div>
            <div class="text-xl text-center mt-2 font-semibold">{{ category?.name }}</div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const getCategory = useHomeStore();
useAsyncData(async () => {
  try {
    await getCategory.getFeauturedCategory();
  } catch (error) {
    console.log(error);
  }
});
</script>
