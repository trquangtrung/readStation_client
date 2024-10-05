<template>
  <a-modal
    v-model:open="props.openModal"
    :onCancel="handleClose"
    :footer="null"
  >
    <form @submit.prevent="onSubmit" class="space-y-4">
      <p class="font-bold">Đổi ảnh đại diện của bạn</p>

      <ClientOnly>
        <a-spin tip="Đang xử lý..." :spinning="baseStore.isSubmitting">
          <a-upload-dragger
            v-model:fileList="fileList"
            list-type="picture"
            name="image"
            :multiple="false"
            :action="(file) => uploadFile(file)"
            @change="handleChange"
            @drop="handleDrop"
            :before-upload="beforeUpload"
            :remove="(file) => deleteFile(file)"
          >
            <p class="ant-upload-drag-icon">
              <inbox-outlined></inbox-outlined>
            </p>
            <p class="ant-upload-text">Click hoặc kéo thả file vào đây</p>
            <p class="ant-upload-hint">Hoặc nhấn vào đây để chọn file</p>
          </a-upload-dragger>
        </a-spin>
      </ClientOnly>

      <div class="flex justify-end gap-2">
        <a-button class="h-10 text-base" @click="handleClose">Hủy</a-button>
        <a-button
          html-type="submit"
          :loading="authStore?.isSubmitting"
          class="h-10 text-base bg-orange-500 border-none !text-white"
        >
          Lưu
        </a-button>
      </div>
    </form>
  </a-modal>
</template>
<script lang="ts" setup>
const authStore = useAuthStore();
const fileList = ref([]);
const baseStore = useBaseStore();
const imageInfo = ref("");
const props = defineProps({
  openModal: Boolean,
  closeModal: Function,
});
const open = ref(props.openModal);
watch(
  () => props.openModal,
  (newValue) => {
    open.value = newValue;
  }
);
const handleClose = () => {
  props.closeModal();
};
// Create post
const onSubmit = async () => {
  
  if (!imageInfo.value?.url) {
    message.error(
      "Vui lòng chọn ảnh đại diện, hoặc ấn ' Hủy ' để quay trở lại!"
    );
    return;
  }
  const res = await authStore.updateProfile({
    avatar: imageInfo.value?.url,
  });

  if (res.data._rawValue?.status == true) {
    message.success("Đổi ảnh đại diện thành công");
    await authStore.getProfile();
    handleClose();
  } else {
    errors.value = res.error.value.data.errors;
    message.error("Đổi ảnh đại diện thất bại");
  }
};
// Upload Image
const uploadFile = async (file) => {
  if (fileList.value.length > 0) {
    fileList.value = [];
    await baseStore.deleteImg(imageInfo.value?.publicId);
  }
  const formData = new FormData();
  formData.append("image", file);
  try {
    const dataUpload = await baseStore.uploadImg(formData);
    imageInfo.value = dataUpload.data._rawValue.data;
  } catch (error) {
    message.error("Upload ảnh thất bại");
  }
};
const handleChange = (info) => {
  const status = info.file.status;
  if (status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (status === "done") {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
  }
};
const deleteFile = async (file) => {
  await baseStore.deleteImg(imageInfo.value?.publicId);
};
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên file ảnh!");
  }
  return isImage || Upload.LIST_IGNORE;
};
</script>
