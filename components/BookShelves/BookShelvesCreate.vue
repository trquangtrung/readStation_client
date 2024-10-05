<template>
  <a-modal v-model:open="props.openModalAdd" title="Thêm kệ sách" :footer="null" :onCancel="handleClose">
    <form @submit.prevent="onSubmit" v-mode:valueCreateShelves>
      <div class="bg-white py-2">
        <div class="mb-4 space-y-1" v-if="errors">
          <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
        </div>
        <div class="grid gap-4 my-3">
          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <label for="">Mã kệ </label>
              <a-input type="text" class="border p-2 rounded-md" placeholder="Nhập mã kệ" size="large"
                v-model:value="valueCreateShelves.bookshelf_code" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Tên kệ <span class="text-red-500">*</span></label>
              <a-input type="text" class="border p-2 rounded-md" placeholder="Tên kệ" size="large"
                v-model:value="valueCreateShelves.name" required />
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Mô tả <span class="text-red-500">*</span></label>
              <a-textarea type="text" class="border p-2 rounded-md" placeholder="Mô tả" size="large" required
                v-model:value="valueCreateShelves.description" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-5">
            <div class="flex flex-col gap-2">
              <label for="">Tủ sách <span class="text-red-500">*</span></label>
              <a-select v-model:value="valueCreateShelves.bookcase_id" show-search placeholder="Mã tủ sách" required
                :options="optionsCase" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                size="large" @change="handleChange"></a-select>
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Danh mục <span class="text-red-500">*</span></label>
              <a-select v-model:value="valueCreateShelves.category_id" show-search placeholder="Mã danh mục" required
                :options="optionsCategory" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                size="large" @change="handleChange"></a-select>
            </div>
          </div>
        </div>
        <div class="flex justify-end items-end gap-2">
          <a-button @click="handleClose">Hủy</a-button>
          <a-button :loading="shelvesValue.isSubmitting" html-type="submit"
            class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary mt-4 ">Thêm</a-button>
        </div>
      </div>
    </form>
  </a-modal>
</template>


<script setup>
import { ref } from "vue";
const isLoading = ref(false);
const bookcaseValue = useBookcaseStore();
const optionsCase = ref({});
const errors = ref({});
const getDataCase = async () => {
  try {
    const data = await bookcaseValue.getAllBookcases({
      pageSize: 1000,
    });
    optionsCase.value = data?.data?._rawValue?.data?.bookcases.map((items) => {
      return {
        value: items.id,
        label: items.name,
      };
    });
    return data;
  } catch (error) {
    console.error(error);
  }
  return data;
}
const optionsCategory = ref([]);
const categoryValue = useCategoryStore();
const getDataCategory = async () => {
  try {
    isLoading.value = true;
    const data = await categoryValue.getAllCategory({ type: "book", pageSize: 1000 });
    optionsCategory.value = data.data._rawValue.data.categories.map((items) => {
      return {
        value: items.id,
        label: items.name,
      };
    })
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
useAsyncData(async () => {
  await getDataCase();
  await getDataCategory();
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
const shelvesValue = useShelvesStore();
const valueCreateShelves = ref({
  name: "",
  description: "",
  bookcase_id: "",
  bookshelf_code: "",
  category_id: "",
});
const onSubmit = async () => {
  try {
    const res = await shelvesValue.createShelves(valueCreateShelves.value);
    if (res) {
      valueCreateShelves.value = {
        description: "",
        bookcase_id: "",
        bookshelf_code: "",
        category_id: "",
      };

      if (res.data._rawValue?.status == true) {
        handleClose();
        message.success("Thêm kệ sách thành công");
        await shelvesValue.getAllShelves({});
      } else {
        errors.value = res.error.value.data.errors;
        message.error(res.error.value.data.message);
      }
    }
  } catch (error) {
    message.error("Thêm kệ sách thất bại");
    console.error(error);
  }
}
const handleClose = () => {
  props.openModal();
  errors.value = {};
};
</script>