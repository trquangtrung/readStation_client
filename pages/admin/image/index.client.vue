<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả hình ảnh</h5>
      </div>
  
    </div>
    <div
      v-if="generalImageStore.isLoading"
      class="flex justify-center items-center col-span-5 min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>
    <!-- Đây là phần code mẫu body -->
    <div
      v-else
      class="bg-white min-h-[360px] w-full rounded-lg p-5 gap-2 grid-cols-5 grid"
    >
      <div
        v-for="(image, index) in generalImageStore.image"
        :key="image.id || index"
        class="relative rounded-2xl overflow-hidden"
      >
        <a-button
          :loading="generalImageStore.isSubmitting"
          @click="onDelete(image.public_id)"
          class="flex items-center font-bold bg-red-10 text-tag-text-06 absolute top-5 right-5 cursor-pointer z-10"
        >
          <Icon
            v-if="!generalImageStore.isSubmitting"
            icon="hugeicons:delete-01"
          />
        </a-button>
        <a-image
          class="!w-[250px] !h-[200px] object-cover rounded-2xl"
          :src="image.url"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const generalImageStore = useGeneralImageStore();

useAsyncData(async () => {
  await generalImageStore.getAllImage({});
});
const onDelete = async (publicId) => {
  await generalImageStore.deleteImage(publicId);
  message.success("Xóa hình ảnh thành công");
  await generalImageStore.getAllImage({});
};
useSeoMeta({
    title: "ReadStation | Hình ảnh",
    ogTitle: "ReadStation | Hình ảnh",
    description: "Hình ảnh",
    ogDescription: "Hình ảnh",
    ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
    twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
