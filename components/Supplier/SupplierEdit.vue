<template>
  <a-modal v-model:open="props.openModalEdit" title="Sửa nhà cung cấp" :footer="null" :onCancel="handleClose">
    <div class="bg-white py-2">
      <form @submit.prevent="updateSupplier">
        <div class="bg-white py-2">
          <div class="mb-4 space-y-1" v-if="errors">
            <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
          </div>
          <div class="grid gap-4 my-3">
            <div class="space-y-4">
              <div class="flex flex-col gap-2">
                <label for="">Nhập tên nhà cung cấp <span class="text-red-500">*</span></label>
                <a-input v-model:value="valueSupplier.name" size="large" type="text" class="border p-2 rounded-md"
                  placeholder="Nhập tên nhà cung cấp" required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="">Số điện thoại <span class="text-red-500">*</span></label>
                <a-input v-model:value="valueSupplier.phone" size="large" type="text" class="border p-2 rounded-md"
                  placeholder="Số điện thoại" required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="">Email <span class="text-red-500">*</span></label>
                <a-input v-model:value="valueSupplier.email" size="large" type="text" class="border p-2 rounded-md"
                  placeholder="Email" required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="">Địa chỉ nhà cung cấp <span class="text-red-500">*</span></label>
                <a-input size="large" v-model:value="valueSupplier.address" type="text" class="border p-2 rounded-md"
                  placeholder="Địa chỉ cụ thể" required />
              </div>
              <div class="flex flex-col gap-2">
                <label>Trạng thái</label>
                <a-select v-model:value="valueSupplier.status" show-search placeholder="Trạng thái" class="w-full"
                  size="large" :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                  @change="handleChange"></a-select>
              </div>
            </div>
          </div>
          <div class="flex justify-end items-end gap-2">
            <a-button @click="handleClose">Hủy</a-button>
            <a-button html-type="submit" :loading="supplierStore.isSubmitting"
              class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary mt-4 ">Cập
              nhật</a-button>
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
  supplierId: Number,
});
const supplierId = ref(props.supplierId);
const open = ref(props.openModalEdit);
watch(
  () => props.openModalEdit,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.supplierId,
  (newVal) => {
    supplierId.value = newVal;
  }
);
const handleClose = () => {
  props.openModal();
  errors.value = {};
};
const options = ref([
  {
    value: "active",
    label: "Hoạt động",
  },
  {
    value: "inactive",
    label: "Không hoạt động",
  },
]);
const supplierStore = useSupplierStore();
const valueSupplier = ref({
  name: "",
  phone: "",
  email: "",
  address: "",
  status: "",
});

useAsyncData(
  async () => {
    try {
      const data = await supplierStore.getSupplierById(supplierId.value);
      valueSupplier.value.name = data.data._value?.data?.name;
      valueSupplier.value.phone = data.data._value?.data?.phone;
      valueSupplier.value.email = data.data._value?.data?.email;
      valueSupplier.value.address = data.data._value?.data?.address;
      valueSupplier.value.status = data.data._value?.data?.status;
    } catch (error) {
      console.error(error);
    }
  },
  {
    watch: [supplierId],
    initialCache: false,
  }
);
const updateSupplier = async () => {
  try {
    const valueUpdateSupplier = {
      name: valueSupplier.value?.name,
      phone: valueSupplier.value?.phone,
      email: valueSupplier.value?.email,
      address: valueSupplier.value?.address,
      status: valueSupplier.value?.status,
    };
    const res = await supplierStore.updateSupplier({
      id: supplierId.value,
      valueSupplier: valueUpdateSupplier,
    });
    if (res.data._rawValue?.status == true) {
      handleClose();
      message.success("Cập nhật nhà cung cấp thành công");
      await supplierStore.getAllSupplier({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật nhà cung cấp thất bại");
    console.log(error);
  }
};
</script>
