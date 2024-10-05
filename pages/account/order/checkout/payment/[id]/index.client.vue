<template>
  <div class="md:px-20 px-8 md:container  md:mx-auto md:py-10 py-5">
    <div class="grid grid-cols-4 gap-4">
      <div class="col-span-3 shadow-md bg-white rounded-md p-5 space-y-12">
        <div class="md:col-span-1 space-y-3">
          <!-- <div class="grid grid-cols-1"> -->
          <div class="flex place-content-between">
            <div>
              <div class="text-2xl col-span-1">Hóa đơn số</div>
              <div class="text-2xl col-span-1 font-bold">
                #{{ orderStore.order?.order_code }}
              </div>
            </div>
            <div>
              <div class="text-base grid grid-cols-6 text-right gap-2">
                <span class="text-base col-span-4">Ngày tạo hóa đơn:</span>
                <span class="text-base col-span-2">{{
                  $dayjs(orderStore.order?.created_at).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                }}</span>
              </div>
              <div class="text-base text-right col-span-1">
                <a-tag :bordered="false" class="bg-tag-bg-01 text-tag-text-01"
                  >Chờ thanh toán</a-tag
                >
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-4">
          <div class="grid grid-cols-12 col-span-1 gap-10">
            <div class="col-span-5 space-y-2">
              <div class="text-xl font-bold col-span-1">
                Nhà cung cấp dịch vụ:
              </div>
              <div class="space-y-1">
                <div class="text-base col-span-1">Thư viện Read Station</div>
                <div class="text-base col-span-1">
                  Tòa nhà QTSC9 (toà T), đường Tô Ký, phường Tân Chánh Hiệp,
                  quận 12, TP HCM.
                </div>
                <div class="flex gap-2 text-base col-span-1">
                  <div class="flex items-center">
                    <UIcon class="text-base" name="i-ph-phone-light" />
                  </div>
                  <span> 0901 660 002 - 0901 660 002 </span>
                </div>
                <div class="flex gap-2 text-base col-span-1">
                  <div class="flex items-center">
                    <UIcon class="text-base" name="i-octicon-mail-24" />
                  </div>
                  <span> caodang@fpt.edu.vn </span>
                </div>
              </div>
            </div>
            <div class="col-start-8 col-span-5 space-y-2">
              <div class="text-xl font-bold">Thông tin khách hàng:</div>

              <div class="space-y-1">
                <div class="text-base">
                  {{ orderStore.order?.user?.fullname }}
                </div>
                <div class="text-base">
                  {{ orderStore.order?.user?.phone }}
                </div>
                <div class="text-base">
                  {{ orderStore.order?.user?.address_detail }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-12">
            <div class="col-span-9 text-xl font-bold">Tên sách thuê</div>
            <div class="col-span-3 text-xl font-bold">Tiền cọc thuê sách</div>
          </div>
          <div
            class="grid grid-cols-12"
            v-for="(order, index) in orderStore.order?.loan_order_details"
            :key="order.id || index"
          >
            <div class="col-span-9 font-bold">
              {{ order.book_details?.book?.title }}
            </div>
            <div class="col-span-3 font-bold">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(order.deposit_fee)
              }}
            </div>
          </div>

          <div>
            <div class="grid grid-cols-12">
              <div class="col-start-8 col-span-2 font-bold">Tạm tính:</div>
              <div class="col-span-3 font-bold">
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(orderStore.order?.total_deposit_fee)
                }}
              </div>
            </div>
            <div class="grid grid-cols-12 text-tag-text-07">
              <div class="col-start-8 col-span-2">Phí dịch vụ:</div>
              <div class="col-span-3">
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(orderStore.order?.total_service_fee)
                }}
              </div>
            </div>
            <div class="grid grid-cols-12 text-tag-text-07">
              <div class="col-start-8 col-span-2 t">Phí vận chuyển:</div>
              <div class="col-span-3">
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(orderStore.order?.total_shipping_fee)
                }}
              </div>
            </div>
          </div>
          <div
            class="grid grid-cols-12 items-end text-orange-400 bg-orange-50 py-2 rounded-md"
          >
            <div class="col-start-8 col-span-2 font-bold">
              Tổng tiền cọc sách
            </div>
            <div class="col-span-3 font-bold text-2xl">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(orderStore.order?.total_all_fee)
              }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-1 bg-white space-y-5 h-fit rounded-md shadow-md p-5">
        <div>
          <div class="font-bold text-2xl">Số tiền cần thanh toán</div>
          <div
            class="font-bold text-xl text-orange-400 border-b border-rtgray-50 pb-2"
          >
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(orderStore.order?.total_all_fee)
            }}
          </div>
        </div>
        <div class="font-bold text-2xl space-y-5">
          <div>Hình thức thanh toán:</div>
          <a-select
            size="large"
            v-model:value="payment_portal"
            placeholder="Chọn hình thức thanh toán"
            style="width: 100%"
            @focus="handleFocus"
            @change="handleChange"
            @blur="handleBlur"
            :options="options"
            :disabled="orderStore.order?.transactions[0]?.extra_info"
          >
          </a-select>
          <!-- <div class="text-sm space-y-3">
            <div>   
              <span>Hình thức vận chuyển:</span>
              <span class="text-orange-500 float-right"> 2 </span>
            </div>
            <div>
              <span>Phí vận chuyển:</span>
              <span class="text-orange-500 font-bold float-right"> 1 </span>
            </div>
          </div> -->
        </div>
        <div class="text-center">
          <a-button
            type="primary"
            @click="onSubmit"
            size="large"
            class="w-full"
            :loading="orderStore.isSubmitting"
          >
            {{
              orderStore.order?.transactions[0]?.extra_info
                ? "Tiếp tục thanh toán"
                : "Thanh toán ngay"
            }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const orderStore = useOrderClientStore();
const payment_portal = ref("vnpay");
const route = useRoute();
const id = route.params.id;
useHead({
  title: "Thanh toán",
  meta: [
    {
      name: "description",
      content: "Thanh toán",
    },
  ],
});
useAsyncData(async () => {
  const res = await orderStore.getOneOrder(id);
  if (res.data._rawValue?.status == true) {
    if (res.data._rawValue.data.status != "wating_payment") {
      navigateTo("/account/order");
    }
  } else {
    console.log("fail");
  }
  payment_portal.value = orderStore.order?.transactions[0]?.portal;
});

const onSubmit = async () => {
  if (orderStore.order?.transactions[0]?.extra_info) {
    navigateTo(orderStore.order?.transactions[0]?.extra_info?.checkoutUrl, {
      external: true,
    });
  } else {
    if (!payment_portal.value) {
      return message.error("Vui lòng chọn hình thức thanh toán");
    }
    const data = await orderStore.getOrderPayment({
      id: orderStore.order.id,
      body: {
        payment_portal: payment_portal.value,
      },
    });
    navigateTo(data.data._rawValue.data.checkoutUrl, {
      external: true,
    });
  }
};
const options = ref([
  {
    value: "vnpay",
    label: "VN Pay",
  },
  {
    value: "payos",
    label: "PayOs",
  },
]);
const handleChange = (value) => {
  payment_portal.value = value;
};
const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input, option) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
const value = ref(undefined);
</script>
