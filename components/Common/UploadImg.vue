<template>
  <ClientOnly>
    <a-spin tip="Đang xử lý..." :spinning="baseStore.isSubmitting">
      <a-upload-dragger
        v-model:fileList="fileList"
        list-type="picture"
        name="image"
        :multiple="false"
        :action="(file) => uploadFile(file)"
        @change="handleChangeUploadImg"
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
</template>
<script setup>
import { ref } from "vue";
import { message, Upload } from "ant-design-vue";
const fileList = ref([]);
const baseStore = useBaseStore();
const imageInfo = ref("");
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
    console.log("🚀 ~ uploadFile ~ error:", error);
  }
};
const handleChangeUploadImg = (info) => {
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

function handleDrop(e) {
  console.log(e);
}
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên file ảnh!");
  }
  return isImage || Upload.LIST_IGNORE;
};
</script>
