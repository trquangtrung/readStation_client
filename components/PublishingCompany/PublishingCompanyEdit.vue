<template>
  <a-modal
    v-model:open="open"
    title="Sửa"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="publishingCompanyStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>

    <form v-else @submit.prevent="onUpdate">
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
            Tên nhà xuất bản <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="publishingCompany.name"
              class="w-[450px] h-[45px]"
              placeholder="Nhập tên nhà xuất bản"
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
              class="w-[450px] h-[45px]"
              placeholder="Nhập nội dung"
            />
          </div>
        </div>

        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Trạng thái
          </label>
          <div class="mt-1">
            <a-select
              class="w-full"
              size="large"
              ref="select"
              v-model:value="publishingCompany.status"
              @change="handleChange"
            >
              <a-select-option value="active">Hoạt động</a-select-option>
              <a-select-option value="inactive"
                >Không hoạt động</a-select-option
              >
            </a-select>
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
            >Cập nhật</a-button
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
const errors = ref({});
const imageInfo = ref("");
const publishingCompany = ref({
  name: "",
  description: "",
  logo_company: "",
  status: "",
});

const props = defineProps({
  publishingCompanyId: Number,
  openModalEdit: Boolean,
  openModal: Function,
});
const publishingCompanyId = ref(props.publishingCompanyId);
const open = ref(props.openModalEdit);
const handleChange = (value) => {
  category.value.status = value;
};

watch(
  () => props.openModalEdit,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.publishingCompanyId,
  (newVal) => {
    publishingCompanyId.value = newVal;
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
const handleChangeUploadImg = (info) => {
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
  await baseStore.deleteImg(file.url.split("/").pop().split(".")[0]);
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
useAsyncData(
  async () => {
    const data = await publishingCompanyStore.getOnePublishingCompany(
      publishingCompanyId.value
    );

    publishingCompany.value.name = data.data._value?.data?.name;
    publishingCompany.value.description = data.data._value?.data?.description;
    publishingCompany.value.logo_company = data.data._value?.data?.logo_company;
    publishingCompany.value.status = data.data._value?.data?.status;
    fileList.value = data.data._value?.data?.logo_company ? [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: data.data._value?.data?.logo_company,
      },
    ] : [];
  },
  {
    watch: [publishingCompanyId, open],
    initialCache: false,
  }
);

const onUpdate = async () => {
  errors.value = {};
  const data = {
    name: publishingCompany.value?.name,
    description: publishingCompany.value?.description,
    status: publishingCompany?.value?.status,
    logo_company: imageInfo.value?.url || publishingCompany.value?.logo_company,
  };

  try {
    const res = await publishingCompanyStore.updatePublishingCompany({
      id: publishingCompanyId.value,
      publishingCompany: data,
    });
    if (res.data._rawValue?.status == true) {
      await publishingCompanyStore.getAllPublishingCompany({
        page: publishingCompanyStore.publishingCompaniesAdmin.page,
      });
      handleClose();
      message.success("Cập nhật nhà xuất bản thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật nhà xuất bản thất bại");
  }
};

const handleClose = () => {
  props.openModal();
  errors.value = {};
};
</script>
