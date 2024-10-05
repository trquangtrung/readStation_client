<template>
  <div>
    <Head>
      <Title>ReadStation | {{ postGeneralStore?.post.title }}</Title>
      <Meta name="description" :content="postGeneralStore.post?.summary" />
      <Meta
        property="og:title"
        :content="`ReadStation | ${postGeneralStore.post.title}`"
      />
      <Meta
        property="og:description"
        :content="postGeneralStore.post?.summary"
      />
    </Head>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Chỉnh sửa bài viết</h5>
      </div>
    </div>
    <div
      v-if="postGeneralStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>
    <div v-else class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <form @submit.prevent="updatePost">
        <div class="mb-4 space-y-1" v-if="errors">
          <a-alert
            v-for="(error, index) in errors"
            :message="error"
            type="error"
            show-icon
          />
        </div>
        <div class="flex flex-col gap-2 w-full pb-4">
          <label class="text-sm font-semibold" for=""
            >Thêm hình ảnh <span class="text-red-500">*</span></label
          >
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
                required
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
        <div class="flex flex-col gap-2 w-full pb-4">
          <label class="text-sm font-semibold" for=""
            >Tên bài viết <span class="text-red-500">*</span></label
          >
          <a-input
            v-model:value="post.title"
            size="large"
            type="text"
            class="border rounded-md"
            placeholder="Tên bài viết"
            required
          />
        </div>

        <div class="flex gap-5 pb-4">
          <div class="flex flex-col gap-2 w-1/3">
            <label class="text-sm font-semibold" for=""
              >Danh mục <span class="text-red-500">*</span></label
            >
            <a-select
              size="large"
              v-model:value="post.category_id"
              show-search
              placeholder="Danh mục"
              :options="options"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              required
            ></a-select>
          </div>
          <div class="flex flex-col gap-2 w-1/3">
            <label class="text-sm font-semibold" for=""
              >Trạng thái <span class="text-red-500">*</span></label
            >
            <a-select
              size="large"
              v-model:value="post.status"
              show-search
              placeholder="Trạng thái"
              :options="optionsStatus"
              :filter-option="filterOption"
              @focus="handleFocus"
              @blur="handleBlur"
              @change="handleChange"
              required
            ></a-select>
          </div>
        </div>
        <div class="flex flex-col gap-2 w-full pb-4">
          <label class="text-sm font-semibold" for=""
            >Nội dung ngắn <span class="text-red-500">*</span></label
          >
          <a-textarea
            placeholder="Nhập nội dung ngắn"
            v-model:value="post.summary"
            :rows="6"
            allow-clear
            required
          />
        </div>
        <div class="flex flex-col gap-2 f-full pb-4">
          <label class="text-sm font-semibold" for="">Nội dung</label>

          <ckeditor
            :editor="editor"
            :model-value="post.content"
            @update:model-value="updateValue"
            :config="editorConfiguration"
          />
        </div>

        <div class="flex justify-end gap-2 pt-4">
          <a-button @click="handClose" danger> Hủy</a-button>
          <a-button
            type="primary"
            html-type="submit"
            :loading="postGeneralStore.isSubmitting"
          >
            Cập nhật</a-button
          >
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
const route = useRoute();
const postID = route.params.id;
const categoryStore = useCategoryStore();
const errors = ref({});
const baseStore = useBaseStore();
const postGeneralStore = useGeneralPostStore();
const postStore = usePostStore();
const post = ref({
  title: "",
  category_id: "",
  status: "",
  image: "",
  content: "",
  summary: "",
});
const { $ckeditor } = useNuxtApp();
const editor = $ckeditor.classicEditor;
const options = ref([]);
const optionsStatus = ref([
  // { value: "wating_approve", label: "Chờ duyệt" },
  { value: "draft", label: "Nháp" },
  { value: "published", label: "Công khai" },
  { value: "hidden", label: "Ẩn" },
  // { value: "deleted", label: "Đã xóa" },
]);

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

const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Bạn chỉ có thể tải lên file ảnh!");
  }
  return isImage || Upload.LIST_IGNORE;
};
useAsyncData(async () => {
  const data = await categoryStore.getAllCategory({ type: "post" });
  options.value = data.data._value.data.categories.map((item) => {
    return {
      value: item.id,
      label: item.name,
    };
  });
});

useAsyncData(async () => {
  const data = await postGeneralStore.getOnePost(postID);
  post.value.title = data.data._value?.data?.title;
  post.value.category_id = data.data._value?.data?.category.name;
  post.value.status = data.data._value?.data?.status;
  post.value.image = data.data._value?.data?.image;
  post.value.content = data.data._value?.data?.content;
  post.value.summary = data.data._value?.data?.summary;
  fileList.value = post.value.image
    ? [
        {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: post.value.image,
        },
      ]
    : [];
});
const updatePost = async () => {
  try {
    const data = {
      title: post.value.title,
      category_id: post.value.category?.name,
      status: post.value.status,
      image: imageInfo.value?.url || post.value.image,
      content: post.value.content,
      summary: post.value.summary,
    };
    const res = await postGeneralStore.updatePost({ id: postID, post: data });
    if (res.data._rawValue?.status == true) {
      message.success("Cập nhật bài viết thành công");
      navigateTo(`/admin/post?page=${postStore?.postsAdmin?.page}`);
    } else {
      errors.value = res.error.value.data.errors;
      message.error("Cập nhật bài viết thất bại");
    }
  } catch (error) {
    message.error("Cập nhật bài viết thất bại");
  }
};

const handClose = () => {
  navigateTo("/admin/post");
};
const handleChange = (value) => {};
const handleBlur = () => {};
const handleFocus = () => {};
const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const updateValue = (newValue) => {
  post.value.content = newValue;
};
const editorConfiguration = {
  allowedContent: "p b i; a[!href] table",
  removePlugins: ["Title"],
  image: {
    toolbar: [
      "imageStyle:alignLeft",
      "imageStyle:alignCenter",
      "imageStyle:alignRight",
      "|",
      "imageResize",
      "|",
      "imageTextAlternative",
    ],
    styles: ["alignLeft", "alignCenter", "alignRight"],
    resizeOptions: [
      {
        name: "imageResize:original",
        label: "Original",
        value: null,
      },
      {
        name: "imageResize:50",
        label: "50%",
        value: "50",
      },
      {
        name: "imageResize:75",
        label: "75%",
        value: "75",
      },
    ],
  },
  toolbar: {
    items: [
      "heading",
      "fontFamily",
      "fontSize",
      "alignment",
      "bold",
      "italic",
      "underline",
      "highlight",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "link",
      "bulletedList",
      "numberedList",
      "subscript",
      "superscript",
      "|",
      "indent",
      "outdent",
      "specialCharacters",
      "removeFormat",
      "strikethrough",
      "horizontalLine",
      "|",
      // 'imageUpload',
      "imageInsert",
      "mediaEmbed",
      "|",
      "blockQuote",
      "insertTable",
      "undo",
      "redo",
      "exportPdf",
      "MathType",
      "ChemType",
    ],
    shouldNotGroupWhenFull: true,
  },
  mediaEmbed: {
    previewsInData: true,
  },
  table: {
    contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
  },
  language: "vi",
};
</script>
<style>
.ck-rounded-corners .ck.ck-editor__top .ck-sticky-panel .ck-toolbar,
.ck.ck-editor__top .ck-sticky-panel .ck-toolbar.ck-rounded-corners {
  border-radius: 8px !important;
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.ck-rounded-corners .ck.ck-editor__main > .ck-editor__editable,
.ck.ck-editor__main > .ck-editor__editable.ck-rounded-corners {
  border-radius: 8px !important;
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.ck-editor__editable {
  min-height: 16rem;
}
</style>
