<template>
  <div>

    <Head>
      <Title>ReadStation | Thông tin chi tiết đơn hàng</Title>
      <Meta name="description" content="Chi tiết đơn hàng" />
      <Meta property="og:title" content="ReadStation | Chi tiết đơn hàng" />
      <Meta property="og:description" content="Chi tiết đơn hàng" />
    </Head>
    <div v-if="orderStore?.isLoading" class="fixed inset-0 bg-black/40 z-[99999] flex items-center justify-center">
      <a-spin size="large" />
    </div>
    <h2 class="font-bold pb-5">
      Chi tiết đơn hàng <span>{{ orderStore?.order?.order_code }}</span>
    </h2>
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5 mb-5 text-tag-text-06"
      v-if="orderStore?.order?.status === 'overdue'">
      <p>
        Read Station xin thông báo rằng thời hạn trả sách của bạn đã quá hạn. Do
        đó, chúng tôi sẽ tạm tính phí phạt cho đơn hàng này. Bạn có thể lựa chọn
        một trong hai phương án sau:
      </p>
      <div class="text-sm mt-2 pr-5">
        <p class="mb-2">1. Tiếp tục gia hạn thời gian thuê sách.</p>
        <p>2. Trả sách ngay để tránh thêm phí phạt.</p>
      </div>
    </div>
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5">
      <div>
        <h3 class="font-bold border-b border-rtgray-50 pb-5">
          Thông tin khách hàng
        </h3>
        <div class="flex py-5 text-sm">
          <div class="w-1/2 border-r border-rtgray-50 space-y-3">
            <div class="grid grid-cols-4">
              <span class="col-span-1 font-bold">Tên khách hàng:</span>
              <span class="col-span-3">
                {{ orderStore?.order?.user?.fullname }}
              </span>
            </div>
            <div class="grid grid-cols-4">
              <span class="col-span-1 font-bold">Email:</span>
              <span class="col-span-3">
                {{ orderStore?.order?.user?.email }}
              </span>
            </div>
            <div class="grid grid-cols-4">
              <span class="col-span-1 font-bold">Số điện thoại:</span>
              <span class="col-span-3">
                {{ orderStore?.order?.user?.phone }}
              </span>
            </div>
            <div class="grid grid-cols-4">
              <span class="col-span-1 font-bold">Vai trò:</span>
              <div class="font-bold">
                <a-tag :bordered="false" color="purple" v-if="authStore?.authUser?.user?.role?.name === 'user'">
                  Khách hàng
                </a-tag>
                <a-tag :bordered="false" color="purple" v-else-if="authStore?.authUser?.user?.role?.name === 'student'">
                  HSSV
                </a-tag>
                <a-tag :bordered="false" color="purple" v-else> Quản lý </a-tag>
              </div>
            </div>
          </div>
          <div class="w-1/2 pl-5 space-y-3">
            <div class="grid grid-cols-8">
              <span class="col-span-3 font-bold">Địa chỉ nhận sách:</span>
              <span class="col-span-5">
                {{ orderStore?.order?.user?.address_detail }}
              </span>
            </div>
            <div class="grid grid-cols-8">
              <span class="col-span-3 font-bold">Phương thức thanh toán:</span>
              <span class="col-span-5" v-if="orderStore?.order?.payment_method === 'online'">
                Chuyển khoản
              </span>
              <span class="col-span-2" v-else-if="orderStore?.order?.payment_method === 'cash'">
                Tiền mặt
              </span>
            </div>
          </div>
        </div>
      </div>
      <!--  -->

    </div>
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5 mt-5"
      v-if="orderStore?.order?.delivery_method === 'shipper'">
      <div>
        <h3 class="font-bold border-b border-rtgray-50 pb-5">
          Thông tin giao hàng
        </h3>
        <div class="py-5 text-sm">
          <div class="space-y-3">
            <div class="grid grid-cols-12">
              <span class="col-span-2 font-bold">Tên khách hàng:</span>
              <span class="col-span-10">
                {{ orderStore?.order?.delivery_info?.fullname }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-2 font-bold">Số điện thoại:</span>
              <span class="col-span-10">
                {{ orderStore?.order?.delivery_info?.phone }}
              </span>
            </div>

            <div class="grid grid-cols-12">
              <span class="col-span-2 font-bold">Địa chỉ giao hàng:</span>
              <span class="col-span-10">
                {{ orderStore?.order?.delivery_info?.address }}
              </span>
            </div>

          </div>

        </div>
      </div>
      <!--  -->

    </div>
    <!--  -->
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5 my-5">
      <div>
        <h3 class="border-b border-rtgray-50 pb-5 flex gap-5">
          <div class="flex gap-3">
            <span class="font-bold">Thông tin đơn hàng</span>
            <a-popover trigger="hover" placement="topLeft">
              <template #content>
                <span class="text-sm text-orange-600">
                  * Tiền cọc thuê sách sẽ được hoàn trả 100% nếu không có phụ
                  phí phát sinh
                </span>
              </template>
              <Icon class="text-orange-600" icon="ic:outline-info" />
            </a-popover>
          </div>

          <span class="flex justify-center">
            <a-tag v-if="orderStore?.order?.status === 'wating_payment'"
              class="text-tag-text-01 bg-tag-bg-01 border-none py-1 px-3 rounded-lg">
              Chờ thanh toán
            </a-tag>
            <a-tag v-if="orderStore?.order?.status === 'pending'"
              class="text-tag-text-01 bg-tag-bg-01 border-none py-1 px-3 rounded-lg">
              Đang xử lý
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'approved'"
              class="text-tag-text-02 bg-tag-bg-02 border-none py-1 px-3 rounded-lg">
              Đã xác nhận
            </a-tag>
            <a-tag v-else-if="
              orderStore?.order?.status === 'ready_for_pickup' &&
              orderStore?.order?.delivery_method === 'pickup'
            " class="text-tag-text-14 bg-tag-bg-14 border-none py-1 px-3 rounded-lg">
              Đơn hàng sẵn sàng
            </a-tag>
            <a-tag v-else-if="
              orderStore?.order?.status === 'preparing_shipment' &&
              orderStore?.order?.delivery_method === 'shipper'
            " class="text-tag-text-15 bg-tag-bg-15 border-none py-1 px-3 rounded-lg">
              Chờ giao hàng
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'in_transit'"
              class="text-tag-text-03 bg-tag-bg-03 border-none py-1 px-3 rounded-lg">
              Đang giao
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'extended'"
              class="text-tag-text-12 bg-tag-bg-12 border-none py-1 px-3 rounded-lg">
              Đang gia hạn
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'active'"
              class="text-tag-text-04 bg-tag-bg-04 border-none py-1 px-3 rounded-lg">
              Đang thuê
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'returning'"
              class="text-tag-text-13 bg-tag-bg-13 border-none py-1 px-3 rounded-lg">
              Đang trả sách
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'completed'"
              class="text-tag-text-09 bg-tag-bg-09 border-none py-1 px-3 rounded-lg">
              Hoàn thành
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'canceled'"
              class="text-tag-text-07 bg-tag-bg-07 border-none py-1 px-3 rounded-lg">
              Bị từ chối
            </a-tag>
            <a-tag v-else-if="orderStore?.order?.status === 'overdue'"
              class="text-tag-text-06 bg-tag-bg-06 border-none py-1 px-3 rounded-lg">
              Quá hạn
            </a-tag>
          </span>
        </h3>
        <div class="flex py-5 text-sm">
          <div class="w-1/2 border-r border-rtgray-50 space-y-3">
            <div class="grid grid-cols-8">
              <span class="col-span-3 font-bold">Số sách thuê:</span>
              <span class="col-span-5">
                {{ orderStore?.order?.loan_order_details?.length }}
              </span>
            </div>

            <div class="grid grid-cols-8">
              <span class="col-span-3 font-bold">Ngày thuê sách:</span>
              <span class="col-span-5">
                {{
                  $dayjs(orderStore?.order?.created_at).format(
                    "DD/MM/YYYY"
                  )
                }}
              </span>
            </div>

            <div class="grid grid-cols-8"
              v-if="!['wating_payment', 'pending', 'approved', 'ready_for_pickup'].includes(orderStore?.order?.status)">
              <span class="col-span-3 font-bold">Ngày nhận sách thực tế:</span>
              <span class="col-span-5">
                {{ orderStore?.order?.delivered_date ?
                  $dayjs(orderStore?.order?.delivered_date).format(
                    "DD/MM/YYYY"
                  ) : "Chưa có thông tin ngày nhận sách"
                }}
              </span>
            </div>
            <div class="grid grid-cols-8" v-if="orderStore?.order?.delivery_method === 'shipper'">
              <span class="col-span-3 font-bold">Ngày nhận sách dự kiến:</span>
              <span class="col-span-5">
                {{ orderStore?.order?.pickup_date ?
                  $dayjs(orderStore?.order?.pickup_date).format(
                    "DD/MM/YYYY"
                  ) : "Chưa có thông tin ngày nhận sách"
                }}
              </span>
            </div>



            <div class="grid grid-cols-8" v-if="
              orderStore?.order?.status === 'active' ||
              orderStore?.order?.status === 'overdue' ||
              orderStore?.order?.status === 'extended' ||
              orderStore?.order?.status === 'returning'
            ">
              <span class="col-span-3 font-bold">Số lần gia hạn:</span>
              <span class="col-span-5"> {{ orderStore?.order?.current_extensions }} / {{
                orderStore?.order?.max_extensions }} </span>
            </div>
            <div class="grid grid-cols-8">
              <span class="col-span-3 font-bold">Hình thức nhận sách:</span>
              <span class="col-span-5" v-if="orderStore?.order?.delivery_method === 'pickup'">
                Nhận sách tại thư viện
              </span>
              <span class="col-span-2" v-else-if="orderStore?.order?.delivery_method === 'shipper'">
                Nhận sách tại nhà
              </span>
            </div>
            <div class="grid grid-cols-8" v-if="orderStore?.order?.status === 'canceled'">
              <span class="col-span-3 font-bold">Lý do bị từ chối:</span>
              <span class="col-span-5">
                {{ orderStore?.order?.reason_cancel }}
              </span>
            </div>
          </div>
          <!--  -->
          <div class="w-1/2 pl-5 grid grid-cols-12">
            <div class="space-y-3 col-span-8">
              <div class="grid grid-cols-4">
                <span class="col-span-2 font-bold">Tổng tiền cọc thuê sách:</span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_deposit_fee)
                  }}
                </span>
              </div>
              <div class="grid grid-cols-4">
                <span class="col-span-2 font-bold">Phí vận chuyển:</span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_shipping_fee)
                  }}
                </span>
              </div>
              <div class="grid grid-cols-4">
                <span class="col-span-2 font-bold">Phí dịch vụ:</span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_service_fee)
                  }}
                </span>
              </div>

              <div class="grid grid-cols-4"
                v-if="orderStore?.order?.status === 'wating_payment' || orderStore?.order?.status === 'pending'">
                <span class="col-span-2 font-bold">
                  Số tiền cần thanh toán:
                </span>
                <span class="col-span-2 text-orange-400">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_all_fee + orderStore?.order?.total_shipping_fee)
                  }}
                </span>
              </div>
              <div class="grid grid-cols-4" v-else>
                <span class="col-span-2 font-bold">
                  Đã thanh toán:
                </span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_all_fee + orderStore?.order?.total_shipping_fee)
                  }}
                </span>
              </div>
              <!-- <div class="grid grid-cols-4"
                v-if="orderStore?.order?.status !== 'wating_payment' || orderStore?.order?.status !== 'pending' || orderStore?.order?.status !== 'approved' || orderStore?.order?.status !== 'ready_for_pickup' || orderStore?.order?.status !== 'preparing_shipment' || orderStore?.order?.status !== 'in_transit'"> -->
              <div class="grid grid-cols-4"
                v-if="!['wating_payment', 'pending', 'approved', 'ready_for_pickup', 'preparing_shipment', 'in_transit'].includes(orderStore?.order?.status)">
                <span class="col-span-2 font-bold">
                  Tổng phí gia hạn:
                </span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalExtensionFee())
                  }}
                </span>
              </div>
              <div class="grid grid-cols-4"
                v-if="!['wating_payment', 'pending', 'approved', 'ready_for_pickup', 'preparing_shipment', 'in_transit'].includes(orderStore?.order?.status)">
                <span class="col-span-2 font-bold">
                  Tổng phí phạt:
                </span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_fine_fee)
                  }}
                </span>
              </div>

              <div class="grid grid-cols-4"
                v-if="!['wating_payment', 'in_transit', 'pending', 'approved', 'ready_for_pickup'].includes(orderStore?.order?.status)">
                <span class="col-span-2 font-bold">
                  Số tiền hoàn trả lại:
                </span>
                <span class="col-span-2">
                  {{
                    new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(orderStore?.order?.total_return_fee)
                  }}
                </span>
              </div>
            </div>
            <a-button @click="showHistoryExtend" v-if="
              orderStore?.order?.status === 'active' ||
              orderStore?.order?.status === 'completed' ||
              orderStore?.order?.status === 'overdue' ||
              orderStore?.order?.status === 'returning' ||
              orderStore?.order?.status === 'extended'
            " class="text-sm text-orange-400 text-right col-span-4 border-none shadow-none">
              Lịch sử gia hạn
            </a-button>
          </div>
        </div>
      </div>

      <div class="flex justify-end pt-4 gap-2" v-if="
        orderStore?.order?.status === 'active' || orderStore?.order?.status === 'extended'
      ">

        <a-button @click="showReturnAll" class="h-10 border-orange-400 text-orange-400">
          Trả sách toàn bộ
        </a-button>

        <a-button @click="showExtendAll(orderStore?.order?.loan_order_details)"
          v-if="orderStore?.order?.current_extensions < 3" class="h-10 bg-orange-500 !text-white border-none">
          Gia hạn toàn bộ
        </a-button>

      </div>


    </div>
    <!--  -->
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5">
      <div>
        <div class="border-b border-rtgray-50 pb-3">
          <h3 class="font-bold mb-1">Thông tin sách thuê</h3>
          <span class="text-xs text-tag-text-06" v-if="
            orderStore?.order?.status === 'active' ||
            orderStore?.order?.status === 'returning' ||
            orderStore?.order?.status === 'overdue'
          ">
            Lưu ý:
            <ul>
              <li>- Thời gian gia hạn sẽ được cộng dồn</li>
              <li>
                - Gia hạn riêng lẻ từng sách sẽ tính là 1 lần gia hạn. Nếu bạn
                muốn gia hạn toàn bộ trong 1 lần hãy chọn “ Gia hạn toàn bộ ” ở
                trên
              </li>
            </ul>
          </span>
        </div>

        <form @submit.prevent="onSubmit" class="pt-5 pb-8 border-b border-rtgray-50"
          v-for="(order, index) in orderStore?.order?.loan_order_details" :key="index">
          <AccountOrderBookDetail :data="order" />
        </form>
      </div>
      <!--  -->

      <div class="flex justify-end pt-4 gap-2">
        <NuxtLink to="/account/order">
          <a-button class="h-10"> Trở về </a-button>
        </NuxtLink>
        <a-button class="h-10 !text-orange-400 border border-orange-400" v-if="
          orderStore?.order?.status === 'pending' ||
          orderStore?.order?.status === 'wating_payment'
        " @click="showCancelConfirm(orderStore?.order?.id)">
          Hủy thuê
        </a-button>
        <NuxtLink :to="`/account/order/checkout/payment/${orderStore?.order?.order_code}`">
          <a-button class="h-10 bg-orange-500 !text-white border-none"
            v-if="orderStore?.order?.status === 'wating_payment'">
            Thanh toán
          </a-button>

        </NuxtLink>
      </div>
    </div>

    <AccountOrderReturnAllBook :openReturnAll="openReturnAll" :closeReturnAll="closeReturnAll" />
    <AccountOrderHistoryExtendBook :openHistoryExtend="openHistoryExtend" :closeHistoryExtend="closeHistoryExtend" />
    <AccountOrderExtendAllBook :openExtendAll="openExtendAll" :closeExtendAll="closeExtendAll" :data="extendsionBooks"
      :id="id" />
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
const orderStore = useOrderClientStore();
const authStore = useAuthStore();
const route = useRoute();
const id = route.params.id;
const rating = ref<number>(5);
const errors = ref({});

const extendsionBooks = ref([])
const onCancelOrderDetail = async (id: any) => {
  await orderStore.cancelOrder(id);
};

// Phí gia hạn
const totalExtensionFee = () => {
  const extension = orderStore?.order?.extensions;
  return extension.reduce((acc, curr) => acc + curr.extension_fee || 0, 0)
}

const showCancelConfirm = (id: any) => {
  Modal.confirm({
    title: "Bạn đang muốn hủy đơn hàng?",
    content: "Sau khi hủy sẽ không khôi phục lại",
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onCancelOrderDetail(id);
      navigateTo("/account/order");
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

// Modal Return All
const openReturnAll = ref(false);
const showReturnAll = () => {
  openReturnAll.value = true;
};
const closeReturnAll = () => {
  openReturnAll.value = false;
};

// Modal History Extend
const openHistoryExtend = ref(false);
const showHistoryExtend = () => {
  openHistoryExtend.value = true;
};
const closeHistoryExtend = () => {
  openHistoryExtend.value = false;
};
// Modal Extend All
const openExtendAll = ref(false);
const showExtendAll = (books) => {
  openExtendAll.value = true;
  extendsionBooks.value = books;
};
const closeExtendAll = () => {
  openExtendAll.value = false;
};

useAsyncData(async () => {
  await orderStore.getOneOrder(id);
});
useAsyncData(async () => {
  await authStore.getProfile();
});
</script>
<style scoped>
:deep(.ant-input) {
  resize: none;
}
</style>
