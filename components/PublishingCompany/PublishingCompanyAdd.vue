<template>
  <a-modal
    v-model:open="props.openModalAdd"
    title="Thêm nhà xuất bản"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="publishingCompanyStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>

    <form @submit.prevent="onSubmit">
      <div class="bg-white py-2">
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Tên nhà xuất bản <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="publishingCompany.name"
              class="w-full h-10"
              placeholder="Nhập mã nhà xuất bản"
              required
            />
          </div>
        </div>

        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Mô tả
          </label>
          <div class="mt-1">
            <a-textarea
              :rows="6"
              v-model:value="publishingCompany.description"
              class="w-full h-10"
              placeholder="Nhập mã nhà xuất bản"
            />
          </div>
        </div>
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Logo nhà xuất bản
          </label>
          <div class="mt-1">
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
          </div>
        </div>

        <div class="flex justify-end items-end gap-2">
          <a-button @click="handleClose" danger html-type="button" class="mt-4"
            >Hủy</a-button
          >
          <a-button
            type="primary"
            :loading="publishingCompanyStore.isSubmitting"
            html-type="submit"
            class="mt-4"
            >Thêm</a-button
          >
        </div>
      </div>
    </form>
  </a-modal>
</template>
<script setup>
import { message, Upload } from "ant-design-vue";
const publishingCompanyStore = usePublishingCompanyStore();
const baseStore = useBaseStore();
const fileList = ref([]);
const imageInfo = ref("");
const errors = ref({});
const publishingCompany = ref({
  name: "",
  description: "",
  logo_company: "",
});
const props = defineProps({
  openModalAdd: Boolean,
  openModal: Function,
});
const open = ref(props.openModalAdd);

watch(
  () => props.openModalAdd,
  (newVal) => {
    open.value = newVal;
  }
);

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
  }
  if (status === "done") {
    message.success(`${info.file.name} Upload file thành công.`);
  } else if (status === "error") {
    message.error(`${info.file.name} Upload file thất bại.`);
  }
};
const deleteFile = async (file) => {
  await baseStore.deleteImg(imageInfo.value?.publicId);
};

function handleDrop(e) {
}
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên file ảnh!");
  }
  return isImage || Upload.LIST_IGNORE;
};

const onSubmit = async () => {
  errors.value = {};
  const data = {
    name: publishingCompany.value.name,
    description: publishingCompany.value.description,
    logo_company: imageInfo.value?.url,
  };
  try {
    const res = await publishingCompanyStore.createPublishingCompany(data);
    if (res.data._rawValue?.status == true) {
      publishingCompany.value = {
        name: "",
        description: "",
        logo_company: "",
      };
      if (fileList.value.length > 0) {
        fileList.value = [];
      }
      await publishingCompanyStore.getAllPublishingCompany({});
      handleClose();
      message.success("Thêm nhà xuất bản thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm nhà xuất bản thất bại");
  }
};

const handleClose = async () => {
  props.openModal();
  if (fileList.value.length > 0) {
    fileList.value = [];
    await baseStore.deleteImg(imageInfo.value?.publicId);
  }
  publishingCompany.value = {
    name: "",
    description: "",
    logo_company: "",
  };
  props.openModal();
  errors.value = {};
};
</script>
