<template>
  <div>
    <a-modal v-model:open="props.openModal" width="70%" :onCancel="handleClose" :footer="null">
      <div v-if="postStore.isLoading" class="flex justify-center items-center min-h-[50vh]">
        <a-spin size="large" />
      </div>
      <form @submit.prevent="onSubmit" class="p-4">
        <h2 class="font-bold text-base border-b border-rtgray-50 pb-5">
          Chi tiết bài viết “ {{ postStore?.post?.title }} “
        </h2>
        <div class="py-5 border-b border-rtgray-50">
          <div>
            <div class="flex">
              <div class="w-1/2 border-r border-rtgray-50 space-y-3">
                <div class="grid grid-cols-4">
                  <span class="font-bold col-span-1">Tiêu đề:</span>
                  <span class="col-span-3">
                    {{ postStore?.post?.title }}
                  </span>
                </div>
                <div class="grid grid-cols-4">
                  <span class="font-bold col-span-1">Danh mục:</span>
                  <span class="col-span-3">
                    {{ postStore?.post?.category?.name }}
                  </span>
                </div>
                <div class="grid grid-cols-4">
                  <span class="font-bold col-span-1">Trạng thái:</span>
                  <div class="col-span-3">
                    <a-tag v-if="postStore?.post?.status === 'published'"
                      class="text-tag-text-09 bg-tag-bg-09 border-none px-3 py-1">Công khai</a-tag>
                    <a-tag v-else-if="postStore?.post?.status === 'wating_approve'"
                      class="text-tag-text-01 bg-tag-bg-01 border-none px-3 py-1">Chờ phê duyệt</a-tag>
                    <a-tag v-else-if="postStore?.post?.status === 'draft'"
                      class="text-tag-text-08 bg-tag-bg-08 border-none px-3 py-1">Nháp</a-tag>
                    <a-tag v-else-if="postStore?.post?.status === 'hidden'"
                      class="text-tag-text-06 bg-tag-bg-06 border-none px-3 py-1">Đang ẩn</a-tag>
                    <a-tag v-else-if="postStore?.post?.status === 'approve_canceled'"
                      class="text-tag-text-11 bg-tag-bg-11 border-none"> Bị từ chối </a-tag>
                  </div>
                </div>
              </div>
              <div class="w-1/2 border-r border-rtgray-50 space-y-3 pl-5">
                <div class="grid grid-cols-4">
                  <span class="font-bold col-span-1">Lượt xem:</span>
                  <span class="col-span-3">
                    {{ postStore?.post?.view }}
                  </span>
                </div>
                <div class="grid grid-cols-4">
                  <span class="font-bold col-span-1">Ngày đăng:</span>
                  <span class="col-span-3">
                    {{
                      $dayjs(postStore?.post?.created_at).format("DD/MM/YYYY")
                    }}
                  </span>
                </div>
                <div class="grid grid-cols-4" v-if="postStore?.post?.status === 'approve_canceled'">
                  <span class="font-bold col-span-1">Lí do bị từ chối:</span>
                  <span class="col-span-3">
                    {{ postStore?.post?.reason_cancel }}
                  </span>
                </div>
              </div>
            </div>
            <div class="w-1/2 pt-3 grid grid-cols-4">
              <p class="font-bold text-sm col-span-1">Ảnh bìa:</p>
              <img :src="postStore?.post?.image" alt="" class="w-[350px] h-[160px] rounded-lg col-span-3" />
            </div>
          </div>
        </div>

        <div class="py-5 text-sm border-b border-rtgray-50">
          <p class="font-bold pb-2">Mô tả ngắn:</p>
          <p v-html="postStore?.post?.summary"></p>
        </div>
        <div class="py-5 text-sm">
          <p class="font-bold pb-2">Nội dung bài viết:</p>
          <p v-html="postStore?.post?.content"></p>
        </div>
        <div class="flex justify-end gap-2">
          <a-button @click="handleClose" class="h-10 rounded-lg">Đóng</a-button>
          <a-button v-if="postStore?.post?.status === 'wating_approve'" @click="status = 'draft'" html-type="submit"
            :loading="postStore?.isSubmitting" class="h-10 border-none rounded-lg bg-orange-500 !text-white">
            Lưu nháp
          </a-button>
          <a-button v-if="postStore?.post?.status === 'draft'" @click="status = 'wating_approve'" html-type="submit"
            :loading="postStore?.isSubmitting" class="h-10 border-none rounded-lg bg-orange-500 !text-white">
            Công khai
          </a-button>
          <a-button v-if="postStore?.post?.status === 'published'" @click="status = 'hidden'" html-type="submit"
            :loading="postStore?.isSubmitting" class="h-10 border-none rounded-lg bg-orange-500 !text-white">
            Ẩn bài viết
          </a-button>
          <a-button v-if="postStore?.post?.status === 'hidden'" @click="status = 'published'" html-type="submit"
            :loading="postStore?.isSubmitting" class="h-10 border-none rounded-lg bg-orange-500 !text-white">
            Công khai
          </a-button>
        </div>
      </form>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
const postStore = useGeneralPostStore();
const getAllPostStore = usePostClientStore();
const status = ref("published");
const errors = ref({});
const props = defineProps({
  openModal: Boolean,
  closeModal: Function,
  postDetailId: Number,
});

const onSubmit = async () => {
  const res = await postStore.updatePost({
    id: props.postDetailId,
    post: {
      status: status.value,
    },
  });
  if (res.data._rawValue?.status == true) {
    message.success("Thay đổi trạng thái thành công");
    await getAllPostStore.getAllPost({
      status: "client_post",
    });
    handleClose();
  } else {
    errors.value = res.error.value.data.errors;
    message.error("Thay đổi trạng thái thất bại");
  }
};

const open = ref(props.openModal);
const postDetailId = ref(props.postDetailId);
watch(
  () => props.openModal,
  (newValue) => {
    open.value = newValue;
  }
);
watch(
  () => props.postDetailId,
  (newValue) => {
    postDetailId.value = newValue;
  }
);
useAsyncData(
  async () => {
    if (props.postDetailId) {
      await postStore.getOnePost(props.postDetailId);
    }
  },
  {
    watch: [postDetailId, open],
    initialCache: false,
  }
);
const handleClose = async () => {
  props.closeModal();
};
</script>
