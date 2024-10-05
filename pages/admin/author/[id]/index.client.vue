<template>
  <Head>
    <Title
      >ReadStation | Sửa tác giả {{ AuthorStore?.getOneAuthorAdmin?.author }}
    </Title>
    <Meta name="description" content="Sửa tác giả" />
    <Meta property="og:title" content="ReadStation | Sửa tác giả" />
    <Meta property="og:description" content="Sửa tác giả" />
  </Head>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Sửa tác giả</h5>
      </div>
    </div>
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <form @submit.prevent="putUpdateAuthor">
        <div class="grid grid-cols-6 gap-4">
          <div class="flex flex-col gap-3 col-start-1 col-end-3">
            <label class="text-sm font-semibold" for="">Avatar </label>
            <ClientOnly>
              <a-spin tip="Đang xử lý..." :spinning="baseStore.isSubmitting">
                <a-upload-dragger
                  v-model:fileList="fileList"
                  list-type="picture"
                  name="image"
                  :multiple="false"
                  required
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
          <div class="flex flex-col gap-2 col-end-9 col-span-1 pt-3">
            <a-tooltip placement="top" color="blue">
              <template #title>
                <span>Nổi bật</span>
              </template>
              <span
                class="group flex items-center justify-center cursor-pointer w-8 h-8 rounded-md"
              >
                <a-space direction="vertical">
                  <a-switch v-model:checked="valueAuthor.is_featured">
                    <template #checkedChildren><check-outlined /></template>
                    <template #unCheckedChildren><close-outlined /></template>
                  </a-switch>
                </a-space>
              </span>
            </a-tooltip>
          </div>
        </div>
        <div class="flex flex-col gap-5 mt-5">
          <div class="grid grid-cols-3 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for=""
                >Tên tác giả <span class="text-red-500">*</span></label
              >
              <a-input
                placeholder="Tên tác giả"
                class="border p-2 rounded-md"
                v-model:value="valueAuthor.author"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for=""
                >Ngày, tháng, năm sinh</label
              >
              <a-input
                placeholder="Ngày, tháng, năm sinh"
                class="border p-2 rounded-md"
                type="date"
                v-model:value="valueAuthor.dob"
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="">Trạng thái</label>
              <a-select
                size="large"
                v-model:value="valueAuthor.status"
                show-search
                placeholder="Trạng thái"
                :options="optionsStatus"
                :filter-option="filterOption"
                @focus="handleFocus"
                @blur="handleBlur"
                @change="handleChange"
              ></a-select>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-sm font-semibold" for="">Nội dung</label>
            <CommonCKEditor
              v-model:value="valueAuthor.description"
              @input="(event) => (ValueAuthor.description = event)"
            />
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <NuxtLink :to="`/admin/author`">
            <a-button html-type="submit">Hủy</a-button>
          </NuxtLink>
          <a-button
            type="primary"
            html-type="submit"
            :loading="AuthorStore.isSubmitting"
            >Cập nhật</a-button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const route = useRoute();
const authorID = route.params.id;
const AuthorStore = useAuthorStore();
const baseStore = useBaseStore();
// const checked = ref('')
const fileList = ref([]);
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
  await baseStore.deleteImg(file.url.split("/").pop().split(".")[0]);
};

const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên file ảnh!");
  }
  return isImage || Upload.LIST_IGNORE;
};

const optionsStatus = ref([
  {
    value: "active",
    label: "Hoạt động",
  },
  {
    value: "inactive",
    label: "Không hoạt động",
  },
]);
const valueAuthor = ref({
  avatar: "",
});
useAsyncData(async () => {
  try {
    const data = await AuthorStore.getAuthorById(authorID);
    valueAuthor.value = data.data._rawValue.data;
    fileList.value = [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: data.data._rawValue.data.avatar,
      },
    ];
  } catch (error) {
    console.log(error);
  }
});
const putUpdateAuthor = async () => {
  try {
    const updateValue = {
      author: valueAuthor.value.author,
      dob: valueAuthor.value.dob,
      status: valueAuthor.value.status,
      description: valueAuthor.value.description,
      is_featured: valueAuthor.value.is_featured,
      avatar: imageInfo.value?.url || valueAuthor.value.avatar,
    };
    const res = await AuthorStore.updateAuthor({
      id: authorID,
      valueAuthor: updateValue,
    });
    if (res.data._rawValue?.status == true) {
      message.success("Cập nhật tác giả thành công");
      navigateTo(`/admin/author?page=${AuthorStore?.AuthorAdmin?.page}`);
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật tác giả thất bại");
  }
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
