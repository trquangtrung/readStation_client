<template>
  <div>

    <a-modal v-model:open="props.openModalGive" :footer="null" width="50%" :onCancel="handleCloseGive">
      <div class="mt-5 space-y-5">
        <h3 class="font-bold text-base">
          Bạn muốn trả sách "{{ props.bookDetail?.book_details?.book?.title }}"
          ?
        </h3>
        <a-radio-group v-model:value="return_method" class="flex gap-5">
          <a-radio value="library" class="w-1/2 p-5 border rounded-lg">
            Trả sách trực tiếp tại thư viện
          </a-radio>
          <a-radio value="pickup" @click="renderInfor" class="w-1/2 p-5 border rounded-lg">
            Giao sách đến thư viện
          </a-radio>
        </a-radio-group>
        <div class="text-base grid grid-cols-12" v-if="return_method === 'library'">
          <p class="font-bold col-span-3">Địa chỉ thư viện:</p>
          <p class="col-span-9">
            Lô 42, đường số 3, Công viên phần mềm Quang Trung, phường Tân Chánh
            Hiệp, Quận 12, TP HCM
          </p>
        </div>
        <div class="grid grid-cols-12 px-5">
          <div class="col-span-3">
            <img :src="props.bookDetail?.book_details?.poster" alt=""
              class="w-[114px] h-[176px] shadow-lg shadow-gray-500" />
          </div>
          <div class="col-span-9 text-sm space-y-3">
            <div class="grid grid-cols-6">
              <span class="col-span-3 font-bold">Tên sách:</span>
              <span class="col-span-3">
                {{ props.bookDetail?.book_details?.book?.title }}
              </span>
            </div>
            <div class="grid grid-cols-6">
              <span class="col-span-3 font-bold">Tác giả:</span>
              <span class="col-span-3">
                {{ props.bookDetail?.book_details?.book?.author?.author }}
              </span>
            </div>
            <div class="grid grid-cols-6">
              <span class="col-span-3 font-bold">Ngày thuê sách:</span>
              <span class="col-span-3">
                {{
                  $dayjs(props.bookDetail?.loan_date).format(
                    "DD/MM/YYYY"
                  )
                }}
              </span>
            </div>
            <div class="grid grid-cols-6">
              <span class="col-span-3 font-bold">Ngày hết hạn:</span>
              <span class="col-span-3">
                {{
                  $dayjs(props.bookDetail?.current_due_date).format(
                    "DD/MM/YYYY"
                  )
                }}
              </span>
            </div>
          </div>
        </div>
        <form @submit.prevent="onSubmit">
          <div class="text-sm space-y-5" v-if="return_method === 'pickup'">
            <div class="flex gap-5">
              <div class="w-1/2">
                <label class="font-bold"> Tên của bạn </label>
                <div class="mt-2">
                  <a-input size="large" class="w-full" v-model:value="user.fullname" placeholder="Nhập họ tên"
                    required />
                </div>
              </div>
              <div class="w-1/2">
                <label class="font-bold"> Số điện thoại </label>
                <div class="mt-2">
                  <a-input size="large" class="w-full" v-model:value="user.phone" placeholder="Nhập số điện thoại"
                    required />
                </div>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="w-1/2">
                <label class="font-bold"> Tỉnh/ Thành phố </label>
                <div class="mt-2">
                  <a-select class="w-full" size="large" v-model:value="province_id" show-search
                    placeholder="Tỉnh/Thành phố" :options="optionsPronvines" 
                    @change="handleChangeProvince" :loading="baseStore.isLoading">
                  </a-select>
                </div>
              </div>
              <div class="w-1/2">
                <label class="font-bold"> Quận/ Huyện </label>
                <div class="mt-2">
                  <a-select class="w-full" size="large" v-model:value="district_id" show-search placeholder="Quận/Huyện"
                    :options="optionsDistricts" :filter-option="filterOption" 
                    @change="handleChangeDistrict" :disabled="!province_id" :loading="baseStore.isLoading">
                  </a-select>
                </div>
              </div>
            </div>
            <div class="flex gap-5">
              <div class="w-1/2">
                <label class="font-bold"> Phường/ Xã </label>
                <div class="mt-2">
                  <a-select class="w-full" size="large" v-model:value="ward_id" show-search placeholder="Phường/Xã"
                    :options="optionsWards" :filter-option="filterOption" 
                    @change="handleChangeWard" :disabled="!district_id" :loading="baseStore.isLoading">
                  </a-select>
                </div>
              </div>
              <div class="w-1/2">
                <label class="font-bold"> Đường </label>
                <div class="mt-2">
                  <a-input v-model:value="address.street" class="border p-2 rounded-lg" placeholder="Đường"
                    :disabled="!ward_id" />
                </div>
              </div>
            </div>
            <div class="">
              <label class="font-bold"> Địa chỉ lấy sách </label>
              <div class="mt-2">
                <a-input readonly
                  :value="`${address.street}, ${address.ward}, ${address.district}, ${address.province}`"
                  size="large" />
              </div>
            </div>

            <a-select placeholder="Chọn hình thức vận chuyển" size="large" v-model:value="shipping_method_id"
              style="width: 30%" @change="handleChange" :options="options">
            </a-select>

            <div class="flex gap-2">
              <label class="font-bold"> Phí vận chuyển: </label>
              <span class="text-orange-400">
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(shippingValue?.fee)
                }}
              </span>
            </div>

            <div class="flex gap-2">
              <label class="font-bold"> Khu vực vận chuyển: </label>
              <span class="text-orange-400">
                {{ shippingValue?.location.join(', ') }}
              </span>
            </div>
            <!--  -->
          </div>
          <p class="mt-5">
            Cảm ơn Quý khách đã sử dụng dịch vụ của Read Station. Bằng việc bấm
            chọn xác nhận bên dưới. Quý khách xin vui lòng mang sách đến thư
            viện trong vòng 24-48 giờ để hoàn tất quá trình trả sách. Cảm ơn Quý
            khách đã sử dụng dịch vụ của chúng tôi.
          </p>
          <p class="text-tag-text-06">
            Lưu ý quan trọng:
          <ul>
            <li>- Nếu sách được trả trong thời gian gia hạn, phí gia hạn sẽ không được hoàn lại.</li>
            <li>- Nếu quá 48 giờ kể từ khi xác nhận mà quý khách chưa hoàn tất việc trả sách, chúng tôi sẽ tính thêm phí
              quá hạn. Mong quý khách thông cảm và hợp tác để tránh các khoản phí không mong muốn.</li>
          </ul>

          </p>

          <div class="flex justify-end gap-2">
            <a-button class="h-10" @click="handleCloseGive"> Hủy </a-button>

            <a-button class="h-10 bg-orange-500 !text-white border-none" :loading="orderStore?.isSubmitting"
              html-type="submit">
              Xác nhận
            </a-button>
          </div>
        </form>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const orderStore = useOrderClientStore();
const baseStore = useBaseStore();
const shipping_method_id = ref();
const options = ref([]);
const cartStore = useCartStore();
const shippingValue = ref({});
const return_method = ref("library");
const shippingMethodStore = useShippingMethodPublicStore();
const shippingFee = ref(0);
const route = useRoute();
const id = route.params.id;

useAsyncData(async () => {
  await shippingMethodStore.getAllShipping();
  options.value = shippingMethodStore?.shippings.map((item) => ({
    value: item.id,
    label: item.method,
  }));

  if (options.value.length > 0) {
    shipping_method_id.value = options.value[0].value;
    shippingValue.value = shippingMethodStore?.shippings.find(
      (item) => item.id === shipping_method_id.value
    );
    cartStore.addShipFee(shippingValue.value.fee);
  }
});

const user = ref({
  fullname: "",
  phone: "",
});
const address = ref({
  province: "",
  district: "",
  ward: "",
  street: "",
});
const handleCloseGive = async () => {
  props.closeModalGive();
};

// phí vận chuyển
const calcShippingFee = () => {
  shippingFee.value =
    return_method.value === "library" ? 0 : cartStore.shippingFee;
};
watch(
  () => cartStore.shippingFee,
  () => {
    calcShippingFee();
  }
);

const province_id = ref(undefined);
const district_id = ref(undefined);
const ward_id = ref(undefined);

const optionsPronvines = ref([]);
const optionsDistricts = ref([]);
const optionsWards = ref([]);

const renderInfor = () => {
  user.value.fullname = authStore?.authUser?.user?.fullname;
  user.value.phone = authStore?.authUser?.user?.phone;
  address.value.province = authStore?.authUser?.user?.province?.ProvinceName;
  address.value.district = authStore?.authUser?.user?.district?.DistrictName;
  address.value.ward = authStore?.authUser?.user?.ward?.WardName;
  address.value.street = authStore?.authUser?.user?.street;
  province_id.value = authStore?.authUser?.user?.province?.id;
  district_id.value = authStore?.authUser?.user?.district?.id;
  ward_id.value = authStore?.authUser?.user?.ward?.id;
};

const onSubmit = async () => {
  await calcShippingFee();
  const pickup_info = {
    fullname: user.value.fullname,
    phone: user.value.phone,
    address:
      address.value.province &&
        address.value.district &&
        address.value.ward &&
        address.value.street
        ? `${address.value.street}, ${address.value.ward}, ${address.value.district}, ${address.value.province}`
        : null,
  };

  const pickupInfo = return_method.value === "library" ? null : pickup_info;
  // check name, phone
  const phonePattern = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const fullNamePattern = /^[a-zA-ZÀ-ỹ\s\(\)]+$/;
  if (return_method.value === "pickup" && !phonePattern.test(user.value.phone)) {
    message.error({
      content: "Số điện thoại không hợp lệ!",
    });
    return;
  }
  if (return_method.value === "pickup" && !fullNamePattern.test(user.value.fullname)) {
    message.error({
      content: "Họ tên không nhập số và ký tự đặc biệt!",
    });
    return;
  }
  // check address
  if (
    return_method.value === "pickup" &&
    (!pickup_info.phone || !pickup_info.address)
  ) {
    message.error({
      content: "Vui lòng điền đầy đủ thông tin giao hàng!",
    });
    return;
  }
  // check khu vực
  if (return_method.value === "pickup") {
    const locations = shippingMethodStore?.shippings?.filter(
      (item) => item.id === shipping_method_id.value
    )[0]?.location;

    if (!locations.includes(address.value.province)) {
      message.error("Hiện tại chưa có hình thức vận chuyển khu vực này !");
      return;
    }
  }

  const resData = await orderStore.returnBook({
    id: props.bookDetail?.id,
    body: {
      return_method: return_method.value,
      shipping_method_id: shipping_method_id.value,
      return_shipping_fee: shippingFee.value,
      pickup_info: pickupInfo,
    },
  });

  if (resData?.data?._rawValue?.status == true) {
    message.success({
      content: "Trả sách thành công",
    });
    handleCloseGive();
    orderStore.getOneOrder(id);
  } else {
    message.error({
      content: "Trả sách thất bại",
    });
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
const props = defineProps({
  openModalGive: Boolean,
  closeModalGive: Function,
  bookDetail: Object,
});
const open = ref(props.openModalGive);
const bookDetailId = ref(props.bookDetail?.id);
watch(
  () => props.openModalGive,
  (newValue) => {
    open.value = newValue;
  }
);
watch(
  () => props.bookDetail?.id,
  (newValue) => {
    bookDetailId.value = newValue;
  }
);

const handleChange = (value: string) => {
  shippingValue.value = shippingMethodStore?.shippings.filter(
    (item) => value === item.id
  )[0];
  cartStore.addShipFee(
    shippingMethodStore?.shippings.filter((item) => value === item.id)[0].fee
  );
};
</script>
<style scoped>
:deep(.ant-input) {
  resize: none;
}
</style>
