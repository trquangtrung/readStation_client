<template>
  <a-modal
    v-model:open="props.openModalAdd"
    title="Thêm phương thức vận chuyển"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="shippingMethodStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>
    <div class="space-y-1" v-if="errors">
      <a-alert
        v-for="(error, index) in errors"
        :message="error"
        type="error"
        show-icon
      />
    </div>
    <form @submit.prevent="onSubmit">
      <div class="bg-white py-2">
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Tên phương thức vận chuyển <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="shippingMethod.method"
              size="large"
              placeholder="Nhập phương thức vận chuyển"
              required
            />
          </div>
        </div>

        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Khu vực <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-select
              size="large"
              v-model:value="selectedItems"
              mode="multiple"
              placeholder="Chọn khu vực"
              style="width: 100%"
              :options="filteredOptions.map((item) => ({ value: item }))"
              required
            ></a-select>
          </div>
        </div>
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Phí vận chuyển <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              number
              v-model:value="shippingMethod.fee"
              size="large"
              placeholder="Nhập phí vận chuyển"
              required
            />
          </div>
        </div>
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Ghi chú
          </label>
          <div class="mt-1">
            <a-textarea
              v-model:value="shippingMethod.note"
              size="large"
              placeholder="Nhập ghi chú"
            />
          </div>
        </div>
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Logo phương thức vận chuyển
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
            :loading="shippingMethodStore.isSubmitting"
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
const baseStore = useBaseStore();
const shippingMethodStore = useShippingMethodsStore();
const fileList = ref([]);
const imageInfo = ref("");
const errors = ref({});
const shippingMethod = ref({
  method: "",
  location: [" Hồ chí minh", "Hà nội"],
  fee: "",
  note: "",
  logo: "",
});
const OPTIONS = [
  "Lào Cai",
  "Hưng Yên",
  "Hòa Bình",
  "Sơn La",
  "Điện Biên",
  "Lai Châu",
  "Yên Bái",
  "Bình Định",
  "Ninh Thuận",
  "Phú Yên",
  "Kon Tum",
  "Bình Thuận",
  "Bạc Liêu",
  "Cà Mau",
  "Hậu Giang",
  "Bắc Ninh",
  "Bắc Giang",
  "Lạng Sơn",
  "Cao Bằng",
  "Bắc Kạn",
  "Thái Nguyên",
  "Quảng Nam",
  "Quảng Ngãi",
  "Đắk Nông",
  "Tây Ninh",
  "Bình Phước",
  "Quảng Trị",
  "Quảng Bình",
  "Hà Tĩnh",
  "Nghệ An",
  "Thanh Hóa",
  "Ninh Bình",
  "Hà Nam",
  "Nam Định",
  "Quảng Ninh",
  "Phú Thọ",
  "Tuyên Quang",
  "Hà Giang",
  "Thái Bình",
  "Hải Dương",
  "Hải Phòng",
  "Thừa Thiên Huế",
  "Vĩnh Phúc",
  "Cần Thơ",
  "Kiên Giang",
  "Sóc Trăng",
  "An Giang",
  "Đồng Tháp",
  "Vĩnh Long",
  "Trà Vinh",
  "Bến Tre",
  "Tiền Giang",
  "Long An",
  "Đắk Lắk",
  "Lâm Đồng",
  "Khánh Hòa",
  "Gia Lai",
  "Bà Rịa - Vũng Tàu",
  "Bình Dương",
  "Đồng Nai",
  "Đà Nẵng",
  "Hồ Chí Minh",
  "Hà Nội",
];
const selectedItems = ref([]);
const filteredOptions = computed(() =>
  OPTIONS.filter((o) => !selectedItems.value.includes(o))
);
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
    const res = await shippingMethodStore.createShippingMethod({
      method: shippingMethod.value.method,
      location: selectedItems.value,
      fee: shippingMethod.value.fee,
      note: shippingMethod.value.note,
      logo: imageInfo.value?.url,
    });
    if (res.data._rawValue?.status == true) {
      await shippingMethodStore.getAllShippingMethods({});
      props.openModal();
      message.success("Thêm phương thức vận chuyển thành công");
      shippingMethod.value = {
        method: "",
        location: [],
        fee: "",
        note: "",
        logo: "",
      };
      selectedItems.value = [];
      if (fileList.value.length > 0) {
        fileList.value = [];
      }
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm phương thức vận chuyển thất bại");
  }
};
const handleClose = async () => {
  props.openModal();
  if (fileList.value.length > 0) {
    fileList.value = [];
    await baseStore.deleteImg(imageInfo.value?.publicId);
  }
  shippingMethod.value = {
    method: "",
    location: selectedItems.value,
    fee: "",
    note: "",
    logo: "",
  };
  selectedItems.value = [];
  props.openModal();
  errors.value = {};
};
</script>
