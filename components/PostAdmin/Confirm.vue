<template>
  <a-modal
    v-model:open="props.openModalConfirm"
    :footer="null"
    :onCancel="handleClose"
  >
    <div>
      <div class="flex flex-col items-center bg-white py-2">
        <div class="py-2 text-center">
          <ExclamationCircleOutlined
            class="text-tag-text-06 mt-10 mb-5"
            style="font-size: 80px"
          />
          <span class="block text-2xl font-medium text-tag-text-06 my-2">
            Xác nhận từ chối bài viết
          </span>
          <span class="block text-base font-medium text-tag-text-07 my-2">
            Bạn có chắc chắn muốn từ chối bài viết này không?
          </span>

          <span for="email" class="block text-base font-medium mt-5 mb-2">
            <span class="text-tag-text-06">*</span> Lý do từ chối
          </span>
          <div class="mt-1">
            <a-textarea v-model:value="reason_cancel" class="w-full h-10" />
          </div>
        </div>
      </div>

      <div class="flex justify-end items-end gap-2">
        <a-button @click="handleClose" danger html-type="button" class="mt-4"
          >Hủy</a-button
        >
        <a-button
          @click="handleSubmit"
          type="primary"
          html-type="submit"
          class="mt-4"
          :loading="postStore.isSubmitting"
          >Xác nhận</a-button
        >
      </div>
    </div>
  </a-modal>
</template>
<script setup>
const reason_cancel = ref("");
const postStore = usePostStore();
const props = defineProps({
  openModalConfirm: Boolean,
  openModal: Function,
  status: String,
  id: String,
});
const open = ref(props.openModalConfirm);

watch(
  () => props.openModalConfirm,
  (newVal) => {
    open.value = newVal;
  }
);
const handleClose = () => {
  props.openModal();
  reason_cancel.value = "";
};

const handleSubmit = async () => {
  if (reason_cancel.value === "") {
    message.error("Vui lòng nhập lý do từ chối");
    return;
  }
  try {
    const res = await postStore.updatePost({
      id: props.id,
      post: {
        status: "approve_canceled",
        reason_cancel: reason_cancel.value,
      },
    });
    if (res.data._rawValue?.status == true) {
      await postStore.getAllPost({
        status: "handle",
      });
      handleClose();
      message.success("Từ chối viết thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Từ chối viết thất bại");
  }
};
</script>
