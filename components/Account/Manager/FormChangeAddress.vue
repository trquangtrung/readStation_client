<template>
  <div>
    <div v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-[100vw] min-h-full bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div>
      <a-modal v-model:open="props.openModalForm" title="Thay đổi thông tin giao hàng" width="40%" :footer="null"
        :onCancel="handleClose">
        <form @submit.prevent="onSubmit" v-if="handleChangeEdit">
          <div class="flex gap-2">
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Họ tên </label>
              <div class="mt-1">
                <a-input size="large" class="w-full" placeholder="Nhập họ tên" v-model:value="user.fullname" required />
              </div>
            </div>
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Số điện thoại </label>
              <div class="mt-1">
                <a-input type="text" size="large" class="w-full" placeholder="Nhập số điện thoại"
                  v-model:value="user.phone" required />
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Tỉnh/ Thành phố </label>
              <div class="mt-1">
                <a-select :filter-option="filterOption" v-model:value="province_id" :options="optionsProvines"
                   @change="handleChangeProvince" :loading="baseStore.isLoading"
                  class="w-full" size="large" show-search placeholder="Tỉnh/Thành phố">
                </a-select>
              </div>
            </div>
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Quận/ Huyện </label>
              <div class="mt-1">
                <a-select v-model:value="district_id" :options="optionsDistricts" :filter-option="filterOption"
                   @change="handleChangeDistrict" :disabled="!province_id"
                  :loading="baseStore.isLoading" class="w-full" size="large" show-search placeholder="Quận/ Huyện">
                </a-select>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Phường/ Xã/ Thị trấn </label>
              <div class="mt-1">
                <a-select v-model:value="ward_id" :options="optionsWards" :filter-option="filterOption"
                   @change="handleChangeWard" :disabled="!district_id"
                  :loading="baseStore.isLoading" class="w-full" size="large" show-search
                  placeholder="Xã/ Phường/ Thị trấn">
                </a-select>
              </div>
            </div>
            <div class="w-1/2 pb-4">
              <label class="text-sm font-bold"> Đường </label>
              <div class="mt-1">
                <a-input v-model:value="address.street" :disabled="!ward_id" size="large" class="w-full"
                  placeholder="Nhập đường" required />
              </div>
            </div>
          </div>
          <div>
            <label class="text-sm font-bold"> Địa chỉ cụ thể </label>
            <div class="mt-1">
              <a-textarea size="large"
                :value="`${address.street}, ${address.ward}, ${address.district}, ${address.province}`" />
            </div>
          </div>

          <div class="flex justify-end items-end gap-2">
            <a-button @click="handleClose" danger html-type="button" class="mt-4">Hủy</a-button>
            <a-button :loading="authStore?.isSubmitting" type="primary" html-type="submit" class="mt-4">
              Lưu
            </a-button>
          </div>
        </form>
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const baseStore = useBaseStore();
const user = ref({
  fullname: authStore?.authUser?.user?.fullname,
  phone: authStore?.authUser?.user?.phone,
});
const address = ref({
  province: "",
  district: "",
  ward: "",
  street: "",
});
const ward_id = ref(undefined);
const district_id = ref(undefined);
const province_id = ref(undefined);

const optionsProvines = ref([]);
const optionsDistricts = ref([]);
const optionsWards = ref([]);
// Display infor
const handleChangeEdit = () => {
  address.value.province = authStore?.authUser?.user?.province?.ProvinceName;
  address.value.district = authStore?.authUser?.user?.district?.DistrictName;
  address.value.ward = authStore?.authUser?.user?.ward?.WardName;
  address.value.street = authStore?.authUser?.user?.street;
  province_id.value = authStore?.authUser?.user?.province?.id;
  district_id.value = authStore?.authUser?.user?.district?.id;
  ward_id.value = authStore?.authUser?.user?.ward?.id;
};
// Update Profile
const onSubmit = async () => {
  const phonePattern = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const fullNamePattern = /^[a-zA-ZÀ-ỹ\s\(\)]+$/;
  if (!phonePattern.test(user.value.phone)) {
    message.error({
      content: "Số điện thoại không hợp lệ!",
    });
    return;
  }
  if (!fullNamePattern.test(user.value.fullname)) {
    message.error({
      content: "Họ tên không nhập số và ký tự đặc biệt!",
    });
    return;
  }
  const resData = await authStore.updateProfile({
    fullname: user.value.fullname,
    phone: user.value.phone,
    province_id: province_id.value,
    district_id: district_id.value,
    ward_id: ward_id.value,
    street: address.value.street,
    address_detail:
      address.value.province &&
        address.value.district &&
        address.value.ward &&
        address.value.street
        ? `${address.value.street}, ${address.value.ward}, ${address.value.district}, ${address.value.province}`
        : null,
  });

  if (resData?.data?._rawValue?.status == true) {
    await authStore.getProfile();
    message.success({
      content: "Chỉnh sửa thành công",
    });
    handleClose();

  } else {

    message.error({
      content: "Chỉnh sửa không thành công",
    });
  }
};

useAsyncData(async () => {
  await baseStore.getProvinces();
  optionsProvines.value = baseStore.province.map((item) => {
    return {
      value: item.id,
      label: item.ProvinceName,
    };
  });
});

useAsyncData(
  async () => {
    if (province_id.value) {
      await baseStore.getDistricts(province_id.value);
      optionsDistricts.value = baseStore.districts.map((item) => ({
        value: item.id,
        label: item.DistrictName,
      }));
    }
  },
  {
    immediate: true,
    watch: province_id,
  }
);

useAsyncData(
  async () => {
    if (district_id.value) {
      await baseStore.getWards(district_id.value);
      optionsWards.value = baseStore.ward.map((item) => ({
        value: item.id,
        label: item.WardName,
      }));
    }
  },
  {
    immediate: true,
    watch: district_id,
  }
);

const handleChangeProvince = (value) => {
  province_id.value = value;
  district_id.value = undefined;
  ward_id.value = undefined;
  address.value.street = "";
  address.value.province = optionsProvines.value.find(
    (item) => item.value === value
  ).label;
};
const handleChangeDistrict = (value) => {
  district_id.value = value;
  ward_id.value = undefined;
  address.value.street = "";
  address.value.district = optionsDistricts.value.find(
    (item) => item.value === value
  ).label;
};
const handleChangeWard = (value) => {
  ward_id.value = value;
  address.value.street = "";
  address.value.ward = optionsWards.value.find(
    (item) => item.value === value
  ).label;
};

const props = defineProps({
  openModalForm: Boolean,
  openModal: Function,
});
const open = ref(props.openModalForm);
watch(
  () => props.openModalForm,
  (newValue) => {
    open.value = newValue;
    if (newValue) {
      handleChangeEdit();
    }
  }
);
const handleClose = async () => {
  props.openModal();
};

const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<style scoped>
:deep(.ant-input) {
  resize: none;
}
</style>
