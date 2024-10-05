<template>
    <div class="h-auto mx-auto container md:px-20 px-8">
        <div class="grid md:grid-cols-3 py-10 gap-16">
            <div class="md:col-span-2 grid md:grid-cols-3 space-x-5">
                <div class="text-right flex flex-col gap-6 md:col-span-2">
                    <div class="text-xl text-orange-500">Tác giả nổi bật</div>
                    <div class="flex flex-col gap-5">
                        <h1 class="text-4xl font-bold">{{ featureAuthor?.getauthorFeatured?.author?.author }}</h1>
                        <div class="text-[#999999]" v-html="featureAuthor?.getauthorFeatured?.author?.description"></div>
                    </div>
                    <div class="">
                        <NuxtLink :to="`/products?author=${featureAuthor?.getauthorFeatured?.author?.slug}`">
                            <a-button type="primary" class="w-1/2 h-11 rounded-lg text-white text-base">Xem thêm
                                sách</a-button>
                        </NuxtLink>
                    </div>
                </div>
                <div class="md:col-span-1">
                    <img class="h-96 rounded-lg" :src="featureAuthor?.getauthorFeatured?.author?.avatar" alt="">
                </div>
            </div>
            <div class="md:col-span-1">
                <div class="grid  grid-flow-col gap-10">
                    <CommonBook v-for="(books, index) in featureAuthor?.getauthorFeatured?.books"
                        :data=books :key="index" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const featureAuthor = useHomeStore();
useAsyncData(async () => {
    try {
        await featureAuthor.getAuthorFeatured()
    } catch (error) {
        console.error(error);
    }
});
</script>