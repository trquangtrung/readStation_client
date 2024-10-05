<template>
  <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">
    <div class="h-auto flex justify-between items-center gap-9">
      <!-- Right -->
      <div class="w-3/5 h-full">
        <div class="flex flex-col gap-6">
          <div class="">
            <h1 class="text-2xl font-semibold">Xin chào,</h1>
          </div>
          <div class="">
            <p class="text-lg">Cập nhật tài khoản</p>
          </div>
          <div class="">
            <form action="" :model="updateIf" class="flex flex-col gap-4" @submit="onSubmit">
              <div>
                <a-input class="h-11" placeholder="Email" readonly />
              </div>
              <div class="flex justify-between gap-5">
                <div class="w-1/2">
                  <a-input class="h-11" placeholder="Họ và tên" v-model:value="updateIf.fullName" />
                </div>
                <div class="w-1/2">
                  <a-input class="h-11" placeholder="Số điện thoại" v-model:value="updateIf.phoneNumber" />
                </div>
              </div>
              <div class="flex w-full gap-3">
                <a-select v-model:value="valuePronvines" show-search placeholder="Tỉnh/Thành phố" class="w-1/3"
                  :options="provinces" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                  @change="handleChangeProvince">
                </a-select>
                <a-select v-model:value="valueDistricts" show-search placeholder="Quận/Huyện" class="w-1/3"
                  :options="districts" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
                  @change="handleChangeDistrict">
                </a-select>
                <a-select v-model:value="valueWards" show-search placeholder="Phường/Xã" class="w-1/3" :options="wards"
                  :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChangeWard">
                </a-select>
              </div>
              <div>
                <a-input class="h-11" v-model:value="address.street" placeholder="Đường" />
              </div>
              <div>
                <a-input class="h-11"
                  :value="`${address.street}, ${address.ward}, ${address.district}, ${address.province}`" readonly />
              </div>
              <div>
                <a-input class="h-11" placeholder="Mã giới thiệu" v-model:value="updateIf.referralCode" />
              </div>
              <div class="">
                <button type="submit" class="w-full bg-[#162D3A] h-11 rounded-lg text-lg text-white">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>

          <div class="">
            <span>Bằng việc tiếp tục, bạn đọc và đồng ý với
              <span class="border-b-2">điều khoản sử dụng</span> và
              <span class="border-b-2">Chính sách bảo mật thông tin cá nhân của </span>ReadStation</span>
          </div>
        </div>
      </div>
      <!-- Left -->
      <div class="w-2/5 bg-blue-500 h-full">
        <img class="w-full"
          src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books_23-2149334862.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1715212800&semt=sph"
          alt="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const isSubmitting = ref(false);
const baseStore = useBaseStore();
const authStore = useAuthStore();
const updateIf = ref({
  fullName: "",
  phoneNumber: "",
  get address() {
    return { ...address.value };
  },
  referralCode: "",
});

const address = ref({
  province: "",
  district: "",
  ward: "",
  street: "",
});
const onSubmit = (async () => {
  alert(JSON.stringify(updateIf.value));
  // try {
  //   isSubmitting.value = true;
  //   const resUpdateIf = await authStore.updateProfile(updateIf);
  //   if (resUpdateIf?.data?._rawValue?.status == true) {
  //     successToast("Cập nhật thành công", "Chuyển hướng đến trang chủ");
  //     navigateTo("/");
  //   } else {
  //     resErrors.value = resUpdateIf.error.value.data?.errors;
  //     errorToast("Đăng ký không thành công", "Vui lòng thử lại");
  //   }
  // } catch (error) {
  //   // console.log(error);
  //   errorToast("Cập nhật không thành công", "Vui lòng thử lại");
  // } finally {
  //   isSubmitting.value = false;
  // }
  
});

const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);

const valuePronvines = ref(undefined);
const valueDistricts = ref(undefined);
const valueWards = ref(undefined);

useAsyncData(async () => {
  const data = await baseStore.getProvinces();
  provinces.value = data.data._rawValue.data.map((item) => {
    return {
      value: item.ProvinceID,
      label: item.ProvinceName,
    };
  });
});

useAsyncData(
  async () => {
    const dataDistricts = await baseStore.getDistricts(valuePronvines._value);
    districts.value = dataDistricts.data._rawValue.data.map((item) => ({
      value: item.DistrictID,
      label: item.DistrictName,
    }));
  },
  {
    watch: valuePronvines,
  }
);

useAsyncData(
  async () => {
    const dataWards = await baseStore.getWards(valueDistricts._rawValue);
    wards.value = dataWards.data._rawValue.data.map((item) => ({
      value: item.WardCode,
      label: item.WardName,
    }));
  },
  {
    watch: valueDistricts,
  }
);

const handleChangeProvince = (province) => {
  const selectedProvince = provinces.value.find(
    (item) => item.value === province
  );
  address.value.province = selectedProvince ? selectedProvince.label : "";
};

const handleChangeDistrict = (district) => {
  const selectedDistrict = districts.value.find(
    (item) => item.value === district
  );
  address.value.district = selectedDistrict ? selectedDistrict.label : "";
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
