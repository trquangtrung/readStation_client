<template>
  <a-modal v-model:open="props.openModalAdd" title="Thêm nhà cung cấp" :footer="null" :onCancel="handleClose">
    <form @submit.prevent="onSubmit">
      <div class="bg-white py-2">
        <div class="mb-4 space-y-1" v-if="errors">
          <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
        </div>
        <div class="grid gap-4 my-3">
          <div class="space-y-4">
            <div class="flex flex-col gap-2">
              <label for="">Nhập tên nhà cung cấp  <span class="text-red-500">*</span></label>
              <a-input v-model:value="valueSupplier.name" size="large" type="text" class="border p-2 rounded-md" required
                placeholder="Nhập tên nhà cung cấp" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Số điện thoại  <span class="text-red-500">*</span></label>
              <a-input v-model:value="valueSupplier.phone" size="large" type="text" class="border p-2 rounded-md" required
                placeholder="Số điện thoại" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Email  <span class="text-red-500">*</span></label>
              <a-input v-model:value="valueSupplier.email" size="large" type="text" class="border p-2 rounded-md" required
                placeholder="Email" />
            </div>
            <div class="flex flex-col gap-2">
              <label for="">Địa chỉ nhà cung cấp  <span class="text-red-500">*</span></label>
              <a-input size="large" v-model:value="valueSupplier.address" type="text" class="border p-2 rounded-md" required
                placeholder="Địa chỉ cụ thể" />
            </div>
          </div>
        </div>
        <div class="flex justify-end items-end gap-2">
          <a-button @click="handleClose">Hủy</a-button>
          <a-button html-type="submit" :loading="supplierStore.isSubmitting"
            class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary mt-4 ">Thêm</a-button>
        </div>
      </div>
    </form>
  </a-modal>
</template>


<script setup>
import { ref } from 'vue';
const errors = ref({});
const supplierStore = useSupplierStore();
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
const handleClose = () => {
  props.openModal();
  errors.value = {};
};
const valueSupplier = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
});

const onSubmit = async () => {
  try {
    const res = await supplierStore.createSupplier(valueSupplier.value);

    if (res.data._rawValue?.status == true) {
      handleClose();
      message.success("Thêm nhà cung cấp thành công");
      await supplierStore.getAllSupplier({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm nhà cung cấp thất bại");
    console.log(error);
  }
};
const handleChangeWard = (ward) => {
  const selectedWard = wards.value.find((item) => item.value === ward);
  address.value.ward = selectedWard ? selectedWard.label : "";
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 4;
};
</script>