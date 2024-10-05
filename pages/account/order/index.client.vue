<template>
  <div>

    <Head>
      <Title>ReadStation | Danh sách đơn hàng</Title>
      <Meta name="description" content="Danh sách đơn hàng" />
      <Meta property="og:title" content="ReadStation | Danh sách đơn hàng" />
      <Meta property="og:description" content="Danh sách đơn hàng" />
    </Head>
    <h2 class="text-sm font-bold pb-5">Danh sách đơn hàng</h2>
    <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300 p-5">
      <div class="relative w-2/4 md:block hidden mb-5">
        <div class="flex gap-3">
          <a-input v-model:value="searchValue" placeholder="Nhập mã đơn hàng để tìm kiếm" enter-button class="h-10"
            allow-clear>
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon class="text-gray-500" name="i-material-symbols-search" />
          </div>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu>
                <a-menu-item @click="statusValue({ value: '', label: 'Tất cả' })">
                  Tất cả
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({
                    value: 'wating_payment',
                    label: 'Chờ thanh toán',
                  })
                  ">
                  Chờ thanh toán
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'pending', label: 'Đang xử lý' })
                  ">
                  Đang xử lý
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'approved', label: 'Đã xác nhận' })
                  ">
                  Đã xác nhận
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({
                    value: 'ready_for_pickup',
                    label: 'Đơn hàng sẵn sàn',
                  })
                  ">
                  Đơn hàng sẵn sàng
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({
                    value: 'preparing_shipment',
                    label: 'Chuẩn bị giao hàng',
                  })
                  ">
                  Chuẩn bị giao hàng
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'in_transit', label: 'Đang giao' })
                  ">
                  Đang giao
                </a-menu-item>
                <a-menu-item @click="statusValue({ value: 'extended', label: 'Gia hạn' })">
                  Gia hạn
                </a-menu-item>
                <a-menu-item @click="statusValue({ value: 'active', label: 'Đang thuê' })">
                  Đang thuê
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({
                    value: 'returning',
                    label: ' Đang trả sách',
                  })
                  ">
                  Đang trả sách
                </a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'completed', label: 'Hoàn thành' })
                  ">
                  Hoàn thành
                </a-menu-item>
                <a-menu-item @click="statusValue({ value: 'canceled', label: 'Đã hủy' })">
                  Đã hủy
                </a-menu-item>
                <a-menu-item @click="statusValue({ value: 'overdue', label: 'Quá hạn' })">
                  Quá hạn
                </a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ filter.label ? filter.label : "Tất cả" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>

      <a-table :loading="orderStore?.isLoading" :columns="columns" :data-source="orderStore?.orders?.orders"
        :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Mã đơn hàng </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'order_code'">
            <span>
              {{ record?.order_code }}
            </span>
          </template>

          <template v-if="column.key === 'created_at'">
            <span>
              {{ $dayjs(record?.created_at).format("DD/MM/YYYY - HH:mm:ss") }}
            </span>
          </template>


          <!--  -->
          <template v-if="column.key === 'payment_method'">
            <span class="flex justify-center" v-if="record?.payment_method === 'online'">
              Chuyển khoản
            </span>
            <span class="flex justify-center" v-else-if="record?.payment_method === 'cash'">
              Tiền mặt
            </span>
          </template>
          <!--  -->
          <template v-if="column.key === 'status'">
            <span class="flex justify-center">
              <a-tag v-if="record?.status === 'wating_payment'"
                class="text-tag-text-01 bg-tag-bg-01 border-none py-1 px-3 rounded-lg">
                Chờ thanh toán
              </a-tag>
              <a-tag v-if="record?.status === 'pending'"
                class="text-tag-text-01 bg-tag-bg-01 border-none py-1 px-3 rounded-lg">
                Đang xử lý
              </a-tag>
              <a-tag v-else-if="record?.status === 'approved'"
                class="text-tag-text-02 bg-tag-bg-02 border-none py-1 px-3 rounded-lg">
                Đã xác nhận
              </a-tag>
              <a-tag v-else-if="
                record?.status === 'ready_for_pickup' &&
                record?.delivery_method === 'pickup'
              " class="text-tag-text-14 bg-tag-bg-14 border-none py-1 px-3 rounded-lg">
                Đơn hàng sẵn sàng
              </a-tag>
              <a-tag v-else-if="
                record?.status === 'preparing_shipment' &&
                record?.delivery_method === 'shipper'
              " class="text-tag-text-15 bg-tag-bg-15 border-none py-1 px-3 rounded-lg">
                Chờ giao hàng
              </a-tag>
              <a-tag v-else-if="record?.status === 'in_transit'"
                class="text-tag-text-03 bg-tag-bg-03 border-none py-1 px-3 rounded-lg">
                Đang giao
              </a-tag>
              <a-tag v-else-if="record?.status === 'extended'"
                class="text-tag-text-12 bg-tag-bg-12 border-none py-1 px-3 rounded-lg">
                Gia hạn
              </a-tag>
              <a-tag v-else-if="record?.status === 'active'"
                class="text-tag-text-04 bg-tag-bg-04 border-none py-1 px-3 rounded-lg">
                Đang thuê
              </a-tag>
              <a-tag v-else-if="record?.status === 'returning'"
                class="text-tag-text-13 bg-tag-bg-13 border-none py-1 px-3 rounded-lg">
                Đang trả sách
              </a-tag>
              <a-tag v-else-if="record?.status === 'completed'"
                class="text-tag-text-09 bg-tag-bg-09 border-none py-1 px-3 rounded-lg">
                Hoàn thành
              </a-tag>
              <a-tag v-else-if="record?.status === 'canceled'"
                class="text-tag-text-07 bg-tag-bg-07 border-none py-1 px-3 rounded-lg">
                Đã hủy
              </a-tag>
              <a-tag v-else-if="record?.status === 'overdue'"
                class="text-tag-text-06 bg-tag-bg-06 border-none py-1 px-3 rounded-lg">
                Quá hạn
              </a-tag>
            </span>
          </template>
          <template v-if="column.key === 'extension_dates'">
            <span class="flex justify-center">
              {{ record?.extension_dates }}
            </span>
          </template>
          <template v-if="column.key === 'total_deposit_fee'">
            <span class="flex justify-center">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record?.total_all_fee)
              }}
            </span>
          </template>
          <!--  -->
          <template v-if="column.key === 'max_extensions'">
            <span class="flex justify-center">
              {{ record?.current_extensions }} / {{ record?.max_extensions }}
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <div class="flex gap-2">
              <NuxtLink :to="`/account/order/${record.id}`">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] p-2 rounded-md flex items-center justify-center">
                    <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
                  </button>
                </a-tooltip>
              </NuxtLink>

              <a-tooltip placement="top">
                <template #title>
                  <span>Hủy</span>
                </template>
                <button @click="showCancelConfirm(record.id)" v-if="
                  record.status === 'pending' ||
                  record.status === 'wating_payment'
                " class="hover:bg-[#131313]/20 bg-[#e4e1e1] p-2 rounded-md flex items-center justify-center">
                  <UIcon class="group-hover:text-black" name="i-material-symbols-close-rounded" />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-between items-center">
        <span class="text-sm text-orange-600">
          Lưu ý: Tiền cọc thuê sách sẽ được hoàn trả 100% nếu không có phụ phí
          phát sinh</span>
        <a-pagination v-model:current="current" :total="orderStore?.orders?.totalResults"
          :pageSize="orderStore?.orders?.pageSize" show-less-items />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
import debounce from 'lodash.debounce'
const orderStore = useOrderClientStore();
const current = ref(1);
const filter = ref({
  value: "",
  label: "",
});
const searchValue = ref("");
const statusValue = ({ value, label }) => {
  filter.value.value = value;
  filter.value.label = label;
};
const onCancelOrder = async (id: any) => {
  await orderStore.cancelOrder(id);
  getDataOrder();
};
const showCancelConfirm = (id: any) => {
  Modal.confirm({
    title: "Bạn đang muốn hủy đơn hàng?",
    content: "Sau khi hủy sẽ không khôi phục lại được đơn hàng này",
    okText: "Đồng ý",
    okType: "danger",
    cancelText: "Hủy",
    width: "500px",
    onOk() {
      onCancelOrder(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const onSearch = debounce(() => {
  current.value = 1;
  getDataOrder();
}, 500);

watch(searchValue, onSearch);
// Get All Order
const getDataOrder = async () => {
  try {
    await orderStore.getAllOrder({
      page: current.value,
      status: filter.value.value,
      search: searchValue.value,
    });
  } catch (error) {
    console.error(error);
  }
};
useAsyncData(
  async () => {
    await getDataOrder();
  },
  {
    immediate: true,
    watch: [current, filter.value],
  }
);

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "order_code",
    key: "order_code",
  },
  {
    title: "Ngày đặt",
    dataIndex: "created_at",
    key: "created_at",
  },

  {
    title: "Phương thức thanh toán",
    key: "payment_method",
    dataIndex: "payment_method",
  },
  {
    title: "Trạng thái đơn",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Tiền cọc thuê sách",
    dataIndex: "total_deposit_fee",
    key: "total_deposit_fee",
  },
  {
    title: "Số lần gia hạn",
    key: "max_extensions",
    dataIndex: "max_extensions",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
