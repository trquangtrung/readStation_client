<template>
  <a-modal
    v-model:open="props.openModalEdit"
    title="Sửa"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="bookCaseStore.isLoading"
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
            Mã tủ sách
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="bookCase.bookcase_code"
              class="w-full"
              placeholder="Nhập mã tủ sách"
              size="large"
            />
          </div>
        </div>
        <div class="pb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">
            Tên tủ sách <span class="text-red-500">*</span>
          </label>
          <div class="mt-1">
            <a-input
              v-model:value="bookCase.name"
              size="large"
              class="w-full"
              placeholder="Nhập tên tủ sách"
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
              v-model:value="bookCase.description"
              :rows="6"
              class="w-full"
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
              ref="select"
              v-model:value="bookCase.status"
              class="w-full"
              size="large"
              @change="handleChange"
            >
              <a-select-option value="active">Hoạt động</a-select-option>
              <a-select-option value="inactive"
                >Đang ẩn</a-select-option
              >
            </a-select>
          </div>
        </div>

        <div class="flex justify-end items-end gap-2">
          <a-button @click="handleClose" html-type="button" class="mt-4"
            >Hủy</a-button
          >
          <a-button
            type="primary"
            html-type="submit"
            class="mt-4"
            :loading="bookCaseStore.isSubmitting"
            >Cập nhật</a-button
          >
        </div>
      </div>
    </form>
  </a-modal>
</template>
<script setup>
const bookCaseStore = useBookcaseStore();
const errors = ref({});
const bookCase = ref({
  bookcase_code: "",
  name: "",
  description: "",
  status: "",
});
const props = defineProps({
  openModalEdit: Boolean,
  openModal: Function,
  bookCaseId: Number,
});
const bookCaseId = ref(props.bookCaseId);
const open = ref(props.openModalEdit);
watch(
  () => props.openModalEdit,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.bookCaseId,
  (newVal) => {
    bookCaseId.value = newVal;
  }
);

useAsyncData(
  async () => {
    const data = await bookCaseStore.getOneBookcase(bookCaseId.value);

    bookCase.value.bookcase_code = data.data._value?.data?.bookcase_code;
    bookCase.value.name = data.data._value?.data?.name;
    bookCase.value.description = data.data._value?.data?.description;
    bookCase.value.status = data.data._value?.data?.status;
  },
  {
    watch: [bookCaseId],
    initialCache: false,
  }
);
const onUpdate = async () => {
  errors.value = {};
  const data = {
    bookcase_code: bookCase.value?.bookcase_code,
    name: bookCase.value?.name,
    description: bookCase.value?.description,
    status: bookCase.value?.status,
  };
  try {
    const res = await bookCaseStore.updateBookcase({
      id: bookCaseId.value,
      bookcase: data,
    });
    if (res.data._rawValue?.status == true) {
      await bookCaseStore.getOneBookcase(bookCaseId.value);
      await bookCaseStore.getAllBookcases({
        page: bookCaseStore.bookCaseAdmin.page,
      });
      props.openModal();
      message.success("Cập nhật tủ sách thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật tủ sách thất bại");
  }
};
const handleClose = () => {
  props.openModal();
  errors.value = {};
};
</script>
