<template>
  <div>
    <div class="flex justify-between mb-5">
      <div class="flex items-center justify-between gap-2">
        <UIcon name="i-material-symbols-person-check-outline" />
        <h2 class="text-sm font-bold">Thông tin cơ bản</h2>
      </div>
      <div v-if="errors" class="space-y-2 mb-4">
        <a-alert v-for="(error, index) in errors" :key="index" :message="error" type="error" show-icon />
      </div>

      <p @click="handleChangeEditAcc" v-if="!isShow"
        class="flex gap-1 items-center justify-center border-0 cursor-pointer text-sm font-bold hover:font-medium">
        <UIcon name="i-solar-pen-2-linear" />
        <span>Chỉnh sửa</span>
      </p>
    </div>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col bg-white shadow-md shadow-gray-300 rounded-lg p-4">
        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Họ tên</span>
          <div class="w-1/2 text-left">
            <a-input size="large" id="fullname" type="text" v-model:value="user.fullname" name="fullname"
              v-if="isShow" />
            <span v-else class="w-full">
              {{ authStore?.authUser?.user?.fullname }}
            </span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Giới tính</span>
          <div class="w-1/2 text-left">
            <a-radio-group type="gender" v-bind="gender" name="gender" v-if="isShow" v-model:value="user.gender">
              <a-radio value="male">Nam</a-radio>
              <a-radio value="female">Nữ</a-radio>
            </a-radio-group>

            <span v-else>
              {{
                authStore?.authUser?.user?.gender === "female"
                  ? "Nữ"
                  : authStore?.authUser?.user?.gender === "male"
                    ? "Nam"
                    : ""
              }}
            </span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <div class="w-1/2 gap-1 h-8 flex items-center font-semibold">
            <span>Số điện thoại</span>
            <span class="text-red-600">*</span>
          </div>

          <div class="w-1/2 text-left">
            <a-input size="large" v-model:value="user.phone" name="phone" type="text" pattern="[0-9]*" v-if="isShow"
              required />
            <span v-else>{{ authStore?.authUser?.user?.phone }}</span>
          </div>
        </div>
        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Email</span>
          <div class="w-1/2 text-left">
            <a-input size="large" v-if="isShow" v-model:value="user.email" name="email" type="email" disabled />
            <span v-else>{{ authStore?.authUser?.user?.email }}</span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Ngày sinh</span>
          <a-form-item class="w-1/2 text-left mb-0">
            <a-input size="large" v-if="isShow" v-model:value="user.dob" name="dob" type="date" class="w-full"
              value-format="DD-MM-YYYY" placeholder="Chọn ngày, tháng, năm sinh" />
            <span v-else>
              {{
                authStore?.authUser?.user?.dob
                  ? $dayjs(authStore?.authUser?.user?.dob).format("DD/MM/YYYY")
                  : ""
              }}
            </span>
          </a-form-item>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Công việc</span>
          <div class="w-1/2 text-left">
            <a-input size="large" v-if="isShow" v-model:value="user.job" name="job" type="job" />
            <span v-else>{{ authStore?.authUser?.user?.job }}</span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Tỉnh/ Thành Phố</span>
          <div class="w-1/2 text-left">
            <a-select v-if="isShow" class="w-full" size="large" v-model:value="province_id" show-search
              placeholder="Tỉnh/Thành phố" :filter-option="filterOption" :options="optionsPronvines"
               @change="handleChangeProvince" :loading="baseStore.isLoading">
            </a-select>
            <span v-else>{{
              authStore?.authUser?.user?.province?.ProvinceName
            }}</span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Quận/ Huyện</span>
          <div class="w-1/2 text-left">
            <a-select v-if="isShow" class="w-full" size="large" v-model:value="district_id" show-search
              placeholder="Quận/Huyện" :options="optionsDistricts" :filter-option="filterOption" 
               @change="handleChangeDistrict" :disabled="!province_id" :loading="baseStore.isLoading">
            </a-select>
            <span v-else>{{
              authStore?.authUser?.user?.district?.DistrictName
            }}</span>
          </div>
        </div>

        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">Xã/ Phường/ Thị trấn</span>
          <div class="w-1/2 text-left">
            <a-select v-if="isShow" class="w-full" size="large" v-model:value="ward_id" show-search
              placeholder="Phường/Xã" :options="optionsWards" :filter-option="filterOption" 
               @change="handleChangeWard" :disabled="!district_id" :loading="baseStore.isLoading">
            </a-select>
            <span v-else>{{ authStore?.authUser?.user?.ward?.WardName }}</span>
          </div>
        </div>
        <!--  -->
        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold"> Đường </span>
          <div class="w-1/2 text-left">
            <a-input v-model:value="address.street" class="border p-2 rounded-lg" placeholder="Đường"
              :disabled="!ward_id" v-if="isShow" />
            <span v-else>{{ authStore?.authUser?.user?.street }}</span>
          </div>
        </div>
        <!--  -->
        <div class="border-b flex items-center justify-between py-4">
          <span class="w-1/2 h-8 flex items-center font-semibold">
            Địa chỉ cụ thể
          </span>
          <div class="w-1/2 text-left">
            <a-textarea readonly :value="formattedAddress" size="large" v-if="isShow" />
            <span v-else>{{ authStore?.authUser?.user?.address_detail }}</span>
          </div>
        </div>
        <div class="w-full flex items-center justify-end gap-2 pt-5" v-if="isShow">
          <a-button size="large" @click="handleCancel"> Hủy </a-button>

          <a-button type="primary" size="large" html-type="submit" :loading="authStore?.isSubmitting">
            Lưu thay đổi
          </a-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const baseStore = useBaseStore();
const isShow = ref(false);
const resErrors = ref({});
const data = ref(null);
const errors = ref({});
const user = ref({
  fullname: "",
  email: "",
  gender: "",
  phone: "",
  dob: "",
  job: "",
});

const address = ref({
  province: "",
  district: "",
  ward: "",
  street: "",
});

//get API
const ward_id = ref(undefined);
const district_id = ref(undefined);
const province_id = ref(undefined);
const optionsPronvines = ref([]);
const optionsDistricts = ref([]);
const optionsWards = ref([]);

const formattedAddress = computed(() => {
  const { province, district, ward, street } = address.value;
  if (province || district || ward) {
    return `${street || ""}, ${ward || ""}, ${district || ""}, ${province || ""
      }`;
  }
  return "";
});
// Submit handler
const onSubmit = async () => {
  try {
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
      email: user.value.email,
      phone: user.value.phone,
      gender: user.value.gender,
      dob: user.value.dob,
      job: user.value.job,
      province_id: province_id.value,
      district_id: district_id.value,
      ward_id: ward_id.value,
      street: address.value.street,
      address_detail: formattedAddress.value,
    });
    if (resData?.data?._rawValue?.status == true) {
      message.success("Chỉnh sửa thành công");
      await authStore.getProfile();
      isShow.value = false;
      data.value = resData?.data?._rawValue?.data;
    } else {
      resErrors.value = resData.error.value.data.errors;
      message.error("Chỉnh sửa thất bại");
    }
  } catch (error) {
    message.error("Chỉnh sửa thất bại");
  }
};

useAsyncData(async () => {
  await baseStore.getProvinces();
  optionsPronvines.value = baseStore.province.map((item) => {
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

const handleChangeEditAcc = () => {
  isShow.value = !isShow.value;
  if (isShow.value) {
    user.value.fullname = authStore?.authUser?.user?.fullname;
    user.value.gender = authStore?.authUser?.user?.gender;
    user.value.phone = authStore?.authUser?.user?.phone;
    user.value.email = authStore?.authUser?.user?.email;
    user.value.dob = authStore?.authUser?.user?.dob;
    user.value.job = authStore?.authUser?.user?.job;
    address.value.province = authStore?.authUser?.user?.province?.ProvinceName;
    address.value.district = authStore?.authUser?.user?.district?.DistrictName;
    address.value.ward = authStore?.authUser?.user?.ward?.WardName;
    address.value.street = authStore?.authUser?.user?.street;
    province_id.value = authStore?.authUser?.user?.province?.id;
    district_id.value = authStore?.authUser?.user?.district?.id;
    ward_id.value = authStore?.authUser?.user?.ward?.id;
  }
};
const handleCancel = () => {
  isShow.value = false;
};
useAsyncData(async () => {
  await authStore.getProfile();
});

const handleChangeProvince = (value) => {
  province_id.value = value;
  district_id.value = undefined;
  ward_id.value = undefined;
  address.value.street = "";
  address.value.district = "";
  address.value.ward = "";
  address.value.province = optionsPronvines.value.find(
    (item) => item.value === value
  ).label;
};
const handleChangeDistrict = (value) => {
  district_id.value = value;
  ward_id.value = undefined;
  address.value.street = "";
  address.value.ward = "";
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


const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<style scoped>
:deep(.ant-input) {
  resize: none;
}

:deep(.ant-form-item .ant-form-item-control-input-content) {
  color: black;
}
</style>
