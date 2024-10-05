<template>
  <a-modal
    v-model:open="props.openModalAdd"
    title="Thêm danh mục bài viết"
    :footer="null"
    :onCancel="handleClose"
  >
    <form @submit.prevent="onSubmit">
      <div class="mb-4 space-y-1" v-if="errors">
        <a-alert
          v-for="(error, index) in errors"
          :message="error"
          type="error"
          show-icon
        />
      </div>
      <div class="bg-white py-2">
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Tên danh mục <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="category.name"
              class="w-full h-10"
              placeholder="Nhập tên danh mục"
              required

            />
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Nội dung
          </label>
          <div class="mt-1">
            <a-textarea
              :rows="6"
              v-model:value="category.description"
              placeholder="Nhập nội dung"
       
            />
          </div>
        </div>
        <div class="pt-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Hình danh mục bài viết
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
            :loading="categoryStore.isSubmitting"
            type="primary"
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
const categoryStore = useCategoryStore();
const fileList = ref([]);
const imageInfo = ref("");
const errors = ref({});
const baseStore = useBaseStore();
const category = ref({
  image: "",
  name: "",
  description: "",
  type: "post",
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
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${info.file.name} file upload failed.`);
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
  try {
    const res = await categoryStore.createCategory({
      image: imageInfo.value?.url,
      name: category.value.name,
      description: category.value.description,
      type: "post",
    });
    if (res.data._rawValue?.status == true) {
    
      await categoryStore.getAllCategory({
        type: "post",
      });
      category.value = {
        name: "",
        description: "",
        image: "",
      };
      if (fileList.value.length > 0) {
        fileList.value = [];
      }
      props.openModal();
      message.success("Thêm danh mục bài viết thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm danh mục bài viết thất bại");
  }
};

const handleClose = () => {
  props.openModal();
  if (fileList.value.length > 0) {
    fileList.value = [];
  }
  category.value = {
    name: "",
    description: "",
  };
  props.openModal();
  errors.value = {};
};
</script>
