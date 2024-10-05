<template>
  <a-modal
    v-model:open="open"
    width="70%"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="postStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>
    <div v-else class="space-y-5">
      <div class="flex justify-between gap-4">
        <div class="grow">
          <h1 class="font-bold text-2xl">Chi tiết bài viết &#x2018{{  postStore.post?.title }}&#x2019 </h1>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div
          class="md:col-span-1 space-y-3 md:border-r md:border-gray-200 md:pr-5"
        >
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Tiêu đề: </span>
            <span class="text-base col-span-3">{{
              postStore.post?.title
            }}</span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Danh mục: </span>
            <span class="text-base col-span-3">{{
              postStore.post?.category?.name
            }}</span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Trạng thái: </span>
            <span class="text-base col-span-3">
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.WATING_APPROVE"
                class="bg-tag-bg-01 text-tag-text-01"
              >
                Chờ duyệt
              </a-tag>
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.DRAFT"
                class="bg-tag-bg-08 text-tag-text-08"
              >
                Bản nháp
              </a-tag>
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.PUBLISHED"
                class="bg-tag-bg-09 text-tag-text-09"
              >
                Đang hoạt động
              </a-tag>
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.HIDDEN"
                class="bg-tag-bg-07 text-tag-text-07"
              >
                Đã ẩn
              </a-tag>
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.DELETED"
                class="bg-tag-bg-06 text-tag-text-06"
              >
                Đã xóa
              </a-tag>
              <a-tag
                :bordered="false"
                v-if="postStore.post?.status === PostStatus.APPROVE_CANCELED"
                class="bg-tag-bg-11 text-tag-text-11"
              >
                Từ chối
              </a-tag>
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Ảnh bìa: </span>
            <span class="text-base col-span-3">
              <a-image
                class="rounded-md !h-[160px] !w-full"
                :src="postStore.post?.image"
                alt="Ảnh đại diện"
              />
            </span>
          </div>
        </div>

        <div class="md:col-span-1 space-y-3 ">
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Người đăng: </span>
            <span class="text-base col-span-3">
              {{ postStore.post?.user?.fullname }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Lượt xem: </span>
            <span class="text-base col-span-3">
              {{ postStore.post?.view }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Ngày đăng: </span>
            <span class="text-base col-span-3">
              {{
                dayjs(postStore.post?.created_at).format(" DD/MM/YYYY HH:mm:ss")
              }}
            </span>
          </div>
          <div v-if="postStore.post?.status === 'approve_canceled'" class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Lý do từ chối: </span>
            <span class="text-base col-span-3">
              {{ postStore.post?.reason_cancel }}
            </span>
          </div>
        </div>
      </div>
      <div class="md:border-y md:border-gray-200 py-5">
        <h1 class="font-bold text-base">Mô tả ngắn</h1>
        <div>{{ postStore.post?.summary }}</div>
      </div>

      <div>
        <h1 class="font-bold text-base">Nội dung bài viết</h1>
        <div v-html="postStore.post?.content"></div>
      </div>
    </div>

    <div class="flex justify-end items-end gap-2">
      {{ props.status }}
      <a-button
        v-if="props.status === PostStatus.WATING_APPROVE"
        @click="handleClose"
        html-type="submit"
        class="mt-4"
        >Đóng</a-button
      >
    </div>
  </a-modal>
</template>
<script setup>
import { PostStatus } from "~/types/admin/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const postStore = useGeneralPostStore();

const props = defineProps({
  postDetailId: Number,
  openModalDetail: Boolean,
  openModal: Function,
});
const postDetailId = ref(props.postDetailId);
const open = ref(props.openModalDetail);
watch(
  () => props.openModalDetail,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.postDetailId,
  (newVal) => {
    postDetailId.value = newVal;
  }
);
useAsyncData(
  async () => {
    if (postDetailId.value) {
      await postStore.getOnePost(postDetailId.value);
    }
  },
  {
    watch: [postDetailId, open],
    initialCache: false,
  }
);
const handleClose = async () => {
  props.openModal();
};
</script>
