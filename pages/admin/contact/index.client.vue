<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Phản hồi từ khách hàng
        </h5>
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5">
      <a-button
        size="large"
        class="float-right flex items-center gap-1"
        type="primary"
        @click="
          () =>
            navigateTo(
              'https://docs.google.com/spreadsheets/d/11SLmEnRGgS5R5Q5MyrHD6cINMlir7ihkVrqw5ZBkdkw/edit?usp=sharing',
              { open: '_blank' }
            )
        "
        ><span>Xem file</span>
        <Icon
          icon="heroicons-outline:external-link"
          width="1.2rem"
          height="1.2rem"
      /></a-button>
      <iframe
        class="w-full h-[500px]"
        src="https://docs.google.com/spreadsheets/d/e/2PACX-1vR8GXFT0LJe1mvNbP2E-5PxjJ7rtkrKvnD_REUeF2nEAv1N0mkF3F8IN61gtbUjaarpkjJG1V0ns10a/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
      ></iframe>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
useSeoMeta({
  title: "ReadStation | Phản hồi từ khách hàng",
  ogTitle: "ReadStation | Phản hồi từ khách hàng",
  description: "Phản hồi từ khách hàng",
  ogDescription: "Phản hồi từ khách hàng",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
