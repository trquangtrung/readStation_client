<template>
    <Head>
    <Title>ReadStation | Thêm sách</Title>
    <Meta name="description" content="Thêm sách" />
    <Meta property="og:title" content="ReadStation | Thêm sách" />
    <Meta property="og:description" content="Thêm sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Thêm sách</h5>
      </div>
    </div>
    <div class="mb-4 space-y-1" v-if="errors">
      <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
    </div>
    <!-- Đây là phần code mẫu body -->
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5">
      <form :model="valuecreateBook" @submit.prevent="onSubmit">
        <div class="flex flex-col gap-10">
          <!-- Sách -->
          <div class="flex flex-col gap-4">
            <div class="text-xl font-bold">Sách</div>
            <div class="flex flex-col gap-5 border-b border-gray-200 pb-10">
              <div class="grid grid-rows-2 gap-5">
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Tác giả <span class="text-red-500">*</span></label>
                    <a-select v-model:value="valuecreateBook.author_id" show-search size="large"
                      placeholder="Mã tác giả" :options="optionsAuthor" :filter-option="filterOption"
                      @focus="handleFocus" @blur="handleBlur" @change="handleChange" required></a-select>
                  </div>
                  <div>
                    <div class="flex flex-col gap-2">
                      <label class="text-sm font-semibold" for="">Tên sách <span class="text-red-500">*</span></label>
                      <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Tên sách" required
                        v-model:value="valuecreateBook.title" />
                    </div>
                  </div>
                  <div>
                    <div class="flex flex-col gap-2">
                      <label class="text-sm font-semibold" for="">Tên gốc <span class="text-red-500">*</span></label>
                      <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Tên góc" required
                        v-model:value="valuecreateBook.original_title" />
                    </div>
                  </div>
                </div>
                <div class="grid grid-cols-3 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Danh mục <span class="text-red-500">*</span></label>
                    <a-select v-model:value="valuecreateBook.category_id" show-search size="large" required
                      placeholder="Mã danh mục" :options="optionsCategory" :filter-option="filterOption"
                      @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Kệ sách </label>
                    <a-select v-model:value="valuecreateBook.shelve_id" show-search size="large"
                      placeholder="Mã kệ sách" :options="optionsShelve" :filter-option="filterOption"
                      @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Sách nổi bật</label>
                    <a-checkbox v-model:checked="valuecreateBook.is_featured">Nổi bật</a-checkbox>
                  </div>
                </div>
              </div>
              <div class="flex w-full">
                <div class="flex flex-col gap-2 w-full">
                  <label class="text-sm font-semibold" for="">Mô tả <span class="text-red-500">*</span></label>
                  <a-textarea class="h-28" v-model:value="valuecreateBook.description_summary" placeholder="Mô tả ngắn"
                    required allow-clear />
                </div>
              </div>
              <div class="flex w-full">
                <div class="flex flex-col gap-2 w-full">
                  <label class="text-sm font-semibold" for="">Mô tả chi tiết <span class="text-red-500">*</span></label>
                  <CommonCKEditor :value="valuecreateBook.description" required
                    @input="(event) => (valuecreateBook.description = event)" />
                </div>
              </div>
            </div>
          </div>
          <!-- Sách chi tiết -->
          <div class="flex flex-col gap-4">
            <div class="text-xl font-bold">Sách chi tiết</div>
            <div class="flex flex-col gap-2">
              <div class="grid grid-rows-1">
                <div class="grid grid-cols-2 gap-10">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Poster <span class="text-red-500">*</span></label>
                    <ClientOnly>
                      <a-spin tip="Đang xử lý..." :spinning="baseStore.isSubmitting">
                        <a-upload-dragger v-model:fileList="fileList" list-type="picture" name="image" :multiple="false"
                          :action="(file) => uploadFile(file)" @change="handleChangeImage" @drop="handleDrop"
                          :before-upload="beforeUpload" :remove="(file) => deleteFile(file)">
                          <p class="ant-upload-drag-icon">
                            <inbox-outlined></inbox-outlined>
                          </p>
                          <p class="ant-upload-text">
                            Click hoặc kéo thả file vào đây
                          </p>
                          <p class="ant-upload-hint">
                            Hoặc nhấn vào đây để chọn file
                          </p>
                        </a-upload-dragger>
                      </a-spin>
                    </ClientOnly>
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Hình ảnh chi tiết</label>
                    <a-upload list-type="picture" :file-list="images" :action="uploadImages" :multiple="true"
                      :before-upload="beforeUpload" :on-change="handleChangeImages" :on-remove="deleteImage">
                      <a-button class="flex justify-between gap-3 items-center">
                        <upload-outlined />
                        <h1>Upload hình ảnh chi tiết</h1>
                      </a-button>
                    </a-upload>

                  </div>
                </div>
              </div>

              <div class="grid grid-rows-4 gap-5 my-5">
                <div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Sku</label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Mã sách"
                      v-model:value="valuecreateBook.book_detail.sku_origin" />
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Phiên bản sách <span
                        class="text-red-500">*</span></label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Phiên bản sách" required
                      v-model:value="valuecreateBook.book_detail.book_version" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Giá <span class="text-red-500">*</span></label>
                    <a-input type="number" class="border p-2 rounded-md h-10" placeholder="Giá" required
                      v-model:value="valuecreateBook.book_detail.price" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Phần trăm cọc <span
                        class="text-red-500">*</span></label>
                    <a-input type="number" class="border p-2 rounded-md h-10" placeholder="Phần trăm cọc" required
                      v-model:value="valuecreateBook.book_detail.hire_percent" :min="1" :max="100" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Số lượng <span class="text-red-500">*</span></label>
                    <a-input type="number" class="border p-2 rounded-md h-10" placeholder="Số lượng" required
                      v-model:value="valuecreateBook.book_detail.stock" />
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Ngày xuất bản <span
                        class="text-red-500">*</span></label>
                    <a-input type="date" class="border p-2 rounded-md h-10" placeholder="Ngày xuất bản" required
                      v-model:value="valuecreateBook.book_detail.publish_date" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Công ty phát hành <span
                        class="text-red-500">*</span></label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Công ty phát hành" required
                      v-model:value="valuecreateBook.book_detail.issuing_company
                        " />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Người biên dịch</label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Người biên dịch"
                      v-model:value="valuecreateBook.book_detail.translator" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Nhà xuất bản <span class="text-red-500">*</span></label>
                    <a-select v-model:value="valuecreateBook.book_detail.publishing_company_id" size="large" show-search
                      placeholder="Nhà xuất bản" :options="optionsPublishingcompany" :filter-option="filterOption"
                      @focus="handleFocus" @blur="handleBlur" required @change="handleChange"></a-select>
                  </div>
                </div>
                <div class="grid grid-cols-4 gap-4">
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Số trang <span class="text-red-500">*</span></label>
                    <a-input type="number" class="border p-2 rounded-md h-10" placeholder="Số trang" required
                      v-model:value="valuecreateBook.book_detail.total_page" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Ngôn ngữ <span class="text-red-500">*</span></label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Ngôn ngữ" required
                      v-model:value="valuecreateBook.book_detail.language" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Kích thước sách</label>
                    <a-input type="text" class="border p-2 rounded-md h-10" placeholder="Kích thước sách"
                      v-model:value="valuecreateBook.book_detail.book_size" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Loại bìa <span class="text-red-500">*</span></label>
                    <a-select v-model:value="valuecreateBook.book_detail.cardboard" show-search size="large" required
                      placeholder="Loại bìa" :options="optionsCardboard" :filter-option="filterOption"
                      @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end gap-2">
              <NuxtLink to="/admin/book">
                <a-button type="default">Hủy</a-button>
              </NuxtLink>
              <a-button type="primary" html-type="submit" :loading="createBook.isSubmitting">Thêm</a-button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const baseStore = useBaseStore();
const fileList = ref([]);
const imageInfo = ref("");
const isLoading = ref(false);
const errors = ref({});
const optionsShelve = ref([]);
const shelvesValue = useShelvesStore();
const getDataShelvesValue = async () => {
  try {
    const data = await shelvesValue.getAllShelves({
      pageSize: 1000,
    });
    optionsShelve.value = data.data._rawValue.data.shelves.map((shelve) => {
      return {
        value: shelve.id,
        label: shelve.description,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
const optionsCardboard = ref([
  {
    value: "soft",
    label: "Bìa mềm",
  },
  {
    value: "hard",
    label: "Bìa cứng",
  },
]);
const optionsPublishingcompany = ref([]);
const publishingcompanyValue = usePublishingCompanyStore();
const getDataPublishingcompanyValue = async () => {
  try {
    isLoading.value = true;
    const data = await publishingcompanyValue.getAllPublishingCompany({
      pageSize: 1000,
    });
    optionsPublishingcompany.value =
      data.data._rawValue.data.publishing_companies.map((publishingcompany) => {
        return {
          value: publishingcompany.id,
          label: publishingcompany.name,
        };
      });
  } catch (error) {
    console.error(error);
  }
};
const optionsCategory = ref([]);
const categoryValue = useCategoryStore();
const getDataCategory = async () => {
  try {
    isLoading.value = true;
    const data = await categoryValue.getAllCategory({ type: "book", pageSize: 1000, });
    optionsCategory.value = data.data._rawValue.data.categories.map(
      (category) => {
        return {
          value: category.id,
          label: category.name,
        };
      }
    );
  } catch (error) {
    console.error(error);
  }
};
const optionsAuthor = ref([]);
const authorValue = useAuthorStore();
const getDataAuthor = async () => {
  try {
    const data = await authorValue.getAllAuthor({
      pageSize: 1000,
    });
    optionsAuthor.value = data.data._rawValue.data.authors.map((author) => {
      return {
        value: author.id,
        label: author.author,
      };
    });
  } catch (error) {
    console.error(error);
  }
};
const createBook = useBookStore();
const valuecreateBook = ref({
  author_id: "",
  title: "",
  original_title: "",
  description_summary: "",
  description: "",
  is_featured: false,
  category_id: "",
  shelve_id: "",
  book_detail: [
    {
      poster: "",
      images: [
        "",
        "",
        "",
      ],
      sku_origin: "valuecreateBook.book_detail.sku_origin",
      book_version: "",
      price: "",
      hire_percent: "",
      stock: "",
      publish_date: "",
      issuing_company: "",
      translator: "",
      publishing_company_id: "",
      total_page: "",
      language: "",
      book_size: "",
      cardboard: "",
    },
  ],
});
// Upload poster
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
const handleChangeImage = (info) => {
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
const images = ref([]);
const imagesInfo = ref([]);

// Upload images
const uploadImages = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  try {
    const response = await baseStore.uploadImg(formData);
    const imageData = response.data._rawValue.data; // Giả sử server trả về dữ liệu như thế này
    // Thêm URL của hình ảnh vào danh sách imagesInfo
    imagesInfo.value = [...imagesInfo.value, imageData?.url]// Lưu URL vào imagesInfo
    console.log("imagesInfo", imagesInfo.value);
    return {
      url: imageData.url, // Return URL để `a-upload` có thể sử dụng
    };
  } catch (error) {
    message.error("Upload ảnh thất bại");
    return Upload.LIST_IGNORE; // Ngăn không cho thêm ảnh vào danh sách nếu upload thất bại
  }
};

// Watch imagesInfo for changes
watch(() => imagesInfo.value, (value) => {
});

// Handle change in images
const handleChangeImages = (info) => {
  const { file, fileList } = info;
  const status = file.status;

  if (status === "done") {
    message.success(`${file.name} file uploaded successfully.`);
  } else if (status === "error") {
    message.error(`${file.name} file upload failed.`);
  }

  // Update the images list
  images.value = fileList;
};

// Delete image
const deleteImage = async (file) => {
  const imageToDelete = imagesInfo.value.find(img => img.url === file.url);
  if (imageToDelete) {
    try {
      await baseStore.deleteImg(imageToDelete.publicId);
      imagesInfo.value = imagesInfo.value.filter(img => img.url !== file.url);
      message.success("File deleted successfully.");
    } catch (error) {
      message.error("Failed to delete file.");
    }
  }
};

const onSubmit = async () => {
  try {
    const res = await createBook.createBook({
      sku: valuecreateBook.value.sku,
      author_id: valuecreateBook.value.author_id,
      title: valuecreateBook.value.title,
      original_title: valuecreateBook.value.original_title,
      description_summary: valuecreateBook.value.description_summary,
      description: valuecreateBook.value.description,
      is_featured: valuecreateBook.value.is_featured,
      category_id: valuecreateBook.value.category_id,
      shelve_id: valuecreateBook.value.shelve_id,
      book_detail: [
        {
          sku_origin: null,
          poster: imageInfo.value?.url,
          images: imagesInfo.value,
          book_version: valuecreateBook.value.book_detail.book_version,
          price: valuecreateBook.value.book_detail.price,
          hire_percent: valuecreateBook.value.book_detail.hire_percent,
          stock: valuecreateBook.value.book_detail.stock,
          publish_date: valuecreateBook.value.book_detail.publish_date,
          issuing_company: valuecreateBook.value.book_detail.issuing_company,
          translator: valuecreateBook.value.book_detail.translator,
          publishing_company_id:
            valuecreateBook.value.book_detail.publishing_company_id,
          total_page: valuecreateBook.value.book_detail.total_page,
          language: valuecreateBook.value.book_detail.language,
          book_size: valuecreateBook.value.book_detail.book_size,
          cardboard: valuecreateBook.value.book_detail.cardboard,
        },
      ],
    });
    if (res.data._rawValue?.status == true) {
      message.success("Thêm sách thành công");
      navigateTo("/admin/book");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm thất bại");
  }
};

useAsyncData(async () => {
  await getDataAuthor();
  await getDataCategory();
  await getDataPublishingcompanyValue();
  await getDataShelvesValue();
});

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
<style scoped>
/* tile uploaded pictures */
.upload-list-inline :deep(.ant-upload-list-item) {
  float: left;
  width: 200px;
  margin-right: 8px;
}

.upload-list-inline [class*="-upload-list-rtl"] :deep(.ant-upload-list-item) {
  float: right;
}
</style>
