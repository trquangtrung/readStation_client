<template>
    <NuxtLink :to="`/products/${data?.book?.slug}-${data?.id}`">
        <button class="hover:relative hover:brightness-50 ">
            <img class="rounded-lg h-72 w-48" :src="data?.poster" alt="">
        </button>
    </NuxtLink>
</template>

<script>
export default {
    props: ["data"],
};
</script>
