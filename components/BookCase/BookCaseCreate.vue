<template>
  <a-modal
    v-model:open="props.openModalAdd"
    title="Thêm tủ sách"
    :footer="null"
    :onCancel="handleClose"
  >
    <form @submit.prevent="onSubmit" v-mode:valueCreateShelves>
      <div class="bg-white py-2">
        <div class="pb-4">
          <label for="">Mã tủ sách</label>
          <a-input
            v-model:value="bookCase.bookcase_code"
            type="text"
            class="border p-2 rounded-md"
            placeholder="Nhập mã tủ sách"
          />
        </div>
        <div class="pb-4">
          <label for="">Tên tủ sách <span class="text-red-500">*</span> </label>
          <a-input
            v-model:value="bookCase.name"
            type="text"
            class="border p-2 rounded-md"
            placeholder="Nhập tên tủ sách"
            required
          />
        </div>
        <div class="pb-4">
          <label for="">Mô tả</label>
          <a-textarea
            :rows="4"
            v-model:value="bookCase.description"
            type="text"
            class="border p-2 rounded-md"
            placeholder="Nhập mô tả tủ sách"
          />
        </div>
      </div>

      <div class="flex justify-end items-end gap-4">
        <a-button @click="handleClose" html-type="button" class="mt-4"
          >Hủy</a-button
        >
        <a-button
          :loading="bookcaseStore.isSubmitting"
          html-type="submit"
          class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary mt-4"
          >Thêm</a-button
        >
      </div>
    </form>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
const errors = ref({});
const bookcaseStore = useBookcaseStore();
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
const bookCase = ref({
  bookcase_code: "",
  description: "",
  name: "",
});
const onSubmit = async () => {
  errors.value = {};
  try {
    const res = await bookcaseStore.createBookcase({
      bookcase_code: bookCase.value.bookcase_code,
      description: bookCase.value.description,
      name: bookCase.value.name,
    });
    if (res.data._rawValue?.status == true) {
      await bookcaseStore.getAllBookcases({});
      bookCase.value = {
        bookcase_code: "",
        description: "",
        name: "",
      };
      props.openModal();
      message.success("Thêm tủ sách thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm tủ sách thất bại");
  }
};
const handleClose = () => {
  props.openModal();
  errors.value = {};
};
</script>
