<template>
  <div>

    <Head>
      <Title>ReadStation | Thêm bài viết mới</Title>
      <Meta name="description" content="Thêm bài viết mới" />
      <Meta property="og:title" content="ReadStation | Thêm bài viết mới" />
      <Meta property="og:description" content="Thêm bài viết mới" />
    </Head>
    <div v-if="postStore?.isSubmitting"
      class="absolute top-0 left-0 min-w-full min-h-[100vh] bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <h2 class="font-bold pb-5">Bài viết mới</h2>
    <div class="w-2/3 w-full bg-white rounded-lg shadow-md shadow-gray-300 p-5 text-sm">
      <!-- thông báo lỗi -->
      <div v-if="errors" class="space-y-2 mb-4">
        <a-alert v-for="(error, index) in errors" :key="index" :message="error" type="error" show-icon />
      </div>
      <form :model="post" @submit.prevent="onSubmit" class="space-y-5">
        <div>
          <p class="pb-2">Ảnh bìa<span class="text-[red]"> *</span></p>

          <ClientOnly>
            <a-spin tip="Đang xử lý..." :spinning="baseStore.isSubmitting">
              <a-upload-dragger v-model:fileList="fileList" list-type="picture" name="image" :multiple="false"
                :action="(file) => uploadFile(file)" @change="handleChange" @drop="handleDrop"
                :before-upload="beforeUpload" :remove="(file) => deleteFile(file)">
                <p class="ant-upload-drag-icon">
                  <inbox-outlined></inbox-outlined>
                </p>
                <p class="ant-upload-text">Click hoặc kéo thả file vào đây</p>
                <p class="ant-upload-hint">Hoặc nhấn vào đây để chọn file</p>
              </a-upload-dragger>
            </a-spin>
          </ClientOnly>
        </div>
        <!--  -->
        <div>
          <p class="pb-2">Tên bài viết<span class="text-[red]"> *</span></p>
          <a-input type="text" v-model:value="post.title" placeholder="Tên bài viết" class="h-10" required />
        </div>
        <div>
          <p class="pb-2">Mô tả ngắn<span class="text-[red]"> *</span></p>
          <a-textarea v-model:value="post.summary" placeholder="Mô tả ngắn" :rows="4" required />
        </div>
        <div class="w-1/3 w-full">
          <p class="pb-2" for="">Danh mục <span class="text-[red]"> *</span></p>
          <a-select v-model:value="post.category" placeholder="Danh mục" class="w-1/3" size="large" :options="options">
          </a-select>
        </div>
        <div>
          <p class="pb-2" for="">
            Mô tả chi tiết<span class="text-[red]"> *</span>
          </p>
          <CommonCKEditor :value="post.content" @input="(event) => (post.content = event)" />
        </div>
        <div class="flex justify-end gap-2">
          <NuxtLink to="/account/post">
            <a-button class="h-10 text-base">Hủy</a-button>
          </NuxtLink>
          <a-button @click="saveAsDraft" :loading="isDraftLoading"
            class="h-10 text-base !text-orange-500 border-orange-500">
            Lưu nháp
          </a-button>
          <a-button @click="saveAsPublish" :loading="isPublishLoading"
            class="h-10 text-base bg-orange-500 border-none !text-white">
            Đăng bài
          </a-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" setup>
const fileList = ref([]);
const categoryStore = useCategoryPublicStore();
const postStore = useGeneralPostStore();
const options = ref([]);
const status = ref("published");
const errors = ref({});
const baseStore = useBaseStore();
const imageInfo = ref("");
const isDraftLoading = ref(false);
const isPublishLoading = ref(false);
const post = ref({
  category_id: "",
  title: "",
  content: "",
  summary: "",
  image: "",
});

// Get Category
useAsyncData(async () => {
  try {
    await categoryStore.getAllCategory({
      type: "post",
    });
    options.value = categoryStore?.categories?.categories.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  } catch (error) {
    console.log(error);
  }
});

// Handle Save Draft
const saveAsDraft = async () => {
  status.value = 'draft';
  isDraftLoading.value = true;
  try {
    await onSubmit();
  } finally {
    isDraftLoading.value = false;
  }
}
// Handle Save Publish
const saveAsPublish = async () => {
  status.value = 'published';
  isPublishLoading.value = true;
  try {
    await onSubmit();
  } finally {
    isPublishLoading.value = false;
  }
}

// Create post
const onSubmit = async () => {

  try {
    const res = await postStore.createPost({
      category_id: post.value?.category,
      title: post.value?.title,
      content: post.value?.content,
      summary: post.value?.summary,
      image: imageInfo.value?.url,
      status: status.value,
    });
    if (res.data._rawValue?.status == true) {
      message.success(status.value === 'draft' ? "Lưu nháp thành công" : "Thêm bài viết thành công");
      navigateTo("/account/post");
    } else {
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error(res.error.value.data.message);

  } finally {
    isDraftLoading.value = false;
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
<style scoped>
:deep(.ant-input) {
  resize: none;
}
</style>
