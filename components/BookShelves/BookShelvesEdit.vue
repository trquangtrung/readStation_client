<template>
  <a-modal v-model:open="props.openModalEdit" title="Sửa kệ sách" :footer="null" :onCancel="handleClose">
    <div class="bg-white py-2">
      <form @submit.prevent="updateShelves">
        <div class="mb-4 space-y-1" v-if="errors">
          <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
        </div>
        <div class="grid grid-row-3 gap-5">
          <div class="grid grid-row-2 gap-4">
            <div class="flex flex-col gap-2">
              <label>Mã kệ sách <span class="text-red-500">*</span></label>
              <a-input v-model:value="valueShelves.bookshelf_code" style="height: 40px;" size="large"
                placeholder="Nhập mã kệ sách" required />
            </div>
            <div class="flex flex-col gap-2">
              <label>Tên kệ <span class="text-red-500">*</span></label>
              <a-input v-model:value="valueShelves.name" style="height: 40px;" placeholder="Nhập tên kệ sách" required
                size="large" />
            </div>
            <div class="flex flex-col gap-2">
              <label>Mô tả <span class="text-red-500">*</span></label>
              <a-textarea v-model:value="valueShelves.description" placeholder="Nhập tên kệ sách" size="large" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label>Tủ sách</label>
              <a-input style="height: 40px;" placeholder="Nhập tên kệ sách" v-model:value="valueShelves.bookcase_id"
                size="large" readonly />
            </div>
            <div class="flex flex-col gap-2">
              <label>Danh mục</label>
              <a-input style="height: 40px;" placeholder="Nhập tên kệ sách" v-model:value="valueShelves.category_id"
                size="large" readonly />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <label>Trạng thái</label>
            <a-select v-model:value="valueShelves.status" show-search placeholder="Trạng thái" class="w-full"
              size="large" :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
              @change="handleChange"></a-select>
          </div>
          <div class="flex justify-end items-end gap-2">
            <a-button @click="handleClose">Hủy</a-button>
            <a-button type="primary" html-type="submit" :loading="shelvesStore.isSubmitting">Cập nhật</a-button>
          </div>
        </div>
      </form>


    </div>
  </a-modal>
</template>

<script setup>
const errors = ref({});
const props = defineProps({
  openModalEdit: Boolean,
  openModal: Function,
  shelvesId: Number,
});
const id = ref(props.shelvesId);
const open = ref(props.openModalEdit);
watch(
  () => props.openModalEdit,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.shelvesId,
  (newVal) => {
    id.value = newVal;
  }
);
const handleClose = () => {
  props.openModal();
};
const options = ref([
  {
    value: 'active',
    label: 'Hoạt động',
  },
  {
    value: 'inactive',
    label: 'Không hoạt động',
  },
  {
    value: 'deteled',
    label: 'Đã xóa',
  },
]);
const shelvesStore = useShelvesStore();
const valueShelves = ref({
  name: "",
  description: "",
  bookcase_id: "",
  bookshelf_code: "",
  category_id: "",
  status: "",
})


useAsyncData(async () => {
  try {
    if (id.value === undefined) return;
    const data = await shelvesStore.getOneShelves(id.value);
    valueShelves.value.name = data.data._value?.data?.name;
    valueShelves.value.description = data.data._value?.data?.description;
    valueShelves.value.bookshelf_code = data.data._value?.data?.bookshelf_code;
    valueShelves.value.bookcase_id = data.data._value?.data?.bookcase?.name;
    valueShelves.value.category_id = data.data._value?.data?.category?.name;
    valueShelves.value.status = data.data._value?.data?.status;
  } catch (error) {
    console.error(error);
  }
}, {
  watch: [id, open],
  initialCache: false,
})

const updateShelves = async () => {
  try {
    const valueUpdateShelves = {
      name: valueShelves.value?.name,
      description: valueShelves.value?.description,
      bookshelf_code: valueShelves.value?.bookshelf_code,
      status: valueShelves.value?.status,
    }
    const res = await shelvesStore.updateShelves({ id: id.value, valueUpdateShelves: valueUpdateShelves });
    if (res.data._rawValue?.status == true) {
      handleClose();
      message.success("Cập nhật kệ sách thành công");
      await shelvesStore.getAllShelves({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật kệ sách thất bại");
    console.error(error);
  }
}

</script>