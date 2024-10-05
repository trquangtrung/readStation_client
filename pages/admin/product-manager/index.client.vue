<template>
  <div class="flex flex-col gap-5">
    <Head>
      <Title>ReadStation | Quản lý đơn hàng</Title>
      <Meta name="description" content="Quản lý đơn hàng" />
      <Meta property="og:title" content="ReadStation | Quản lý đơn hàng" />
      <Meta property="og:description" content="Quản lý đơn hàng" />
    </Head>
    <h1 class="text-xl text-[#1e293b] font-bold pb-3">Quản lý đơn hàng</h1>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-04 text-tag-text-04"
            >
              <Icon icon="solar:bill-list-outline" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-04">
              <p class="font-bold text-base">Tổng đơn</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.orders
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-04 text-tag-text-04"
            >
              <Icon
                icon="icon-park-outline:afferent"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-04">
              <p class="font-bold text-base">Đang thuê</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersHiring
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full font-medium p-4 gap-2">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-09 text-tag-text-05"
            >
              <Icon
                icon="teenyicons:tick-circle-outline"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-05">
              <p class="font-bold text-base">Hoàn thành</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersCompleted
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-06 text-tag-text-06"
            >
              <Icon icon="ph-warning-light" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-06">
              <p class="font-bold text-base">Quá hạn</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersOutOfDate
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-01 text-tag-text-01"
            >
              <Icon icon="ep-loading" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-01">
              <p class="font-bold text-base">Đang xử lý</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersPending
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-11 text-tag-text-11"
            >
              <Icon
                icon="clarity-shield-check-line"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-11">
              <p class="font-bold text-base">Đã xác nhận</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersApproved
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-03 text-tag-text-03"
            >
              <Icon
                icon="hugeicons-shipping-truck-02"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-03">
              <p class="font-bold text-base">Đang giao</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersWatingTakeBook
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-07 text-tag-text-07"
            >
              <Icon
                icon="material-symbols-light:cancel-outline"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-07">
              <p class="font-bold text-base">Đã hủy</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="orderStore.isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      orderStore?.statistic?.ordersCanceled
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid gird-row-2 w-full gap-5">
      <div class="w-full min-h-[360px] bg-[white] rounded-lg p-5">
        <div class="flex flex-col gap-5">
          <div class="flex justify-between items-center">
            <div class="w-1/2 flex items-center gap-2">
              <div class="relative w-2/3 md:block hidden">
                <div class="flex">
                  <a-input
                    placeholder="Nhập mã đơn hàng, tên khách hàng để tìm kiếm"
                    class="h-10"
                    v-model:value="valueSearch"
                    allow-clear
                  >
                    <template #prefix>
                      <SearchOutlined />
                    </template>
                  </a-input>
                </div>
                <div
                  class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
                >
                  <UIcon
                    class="text-gray-500"
                    name="i-material-symbols-search"
                  />
                </div>
              </div>
              <a-dropdown :trigger="['click']">
                <template #overlay>
                  <a-menu class="h-[300px] overflow-auto">
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: '', label: 'Tất cả trạng thái' })
                        "
                      >
                        Tất cả trạng thái
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: 'pending', label: 'Đang xử lý' })
                        "
                      >
                        Đang xử lý
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'approved',
                            label: 'Đã xác nhận',
                          })
                        "
                      >
                        Đã xác nhận
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'ready_for_pickup',
                            label: 'Đơn hàng sẵn sàn',
                          })
                        "
                      >
                        Đơn hàng sẵn sàng
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'preparing_shipment',
                            label: 'Chuẩn bị giao hàng',
                          })
                        "
                      >
                        Chuẩn bị giao hàng
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'in_transit',
                            label: 'Đang giao',
                          })
                        "
                      >
                        Đang giao
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: 'extended', label: 'Gia hạn' })
                        "
                      >
                        Gia hạn
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: 'active', label: 'Đang thuê' })
                        "
                      >
                        Đang thuê
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'returning',
                            label: ' Đang trả sách',
                          })
                        "
                      >
                        Đang trả sách
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({
                            value: 'completed',
                            label: 'Hoàn thành',
                          })
                        "
                      >
                        Hoàn thành
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: 'canceled', label: 'Đã hủy' })
                        "
                      >
                        Đã hủy
                      </div>
                    </a-menu-item>
                    <a-menu-item>
                      <div
                        @click="
                          statusValue({ value: 'overdue', label: 'Quá hạn' })
                        "
                      >
                        Quá hạn
                      </div>
                    </a-menu-item>
                  </a-menu>
                </template>
                <a-button size="large" class="flex gap-3 items-center">
                  {{
                    queryStatus.label ? queryStatus.label : "Tất cả trạng thái"
                  }}
                  <DownOutlined />
                </a-button>
              </a-dropdown>
            </div>
            <div>
              <NuxtLink :to="`/admin/product-manager/create-product`">
                <a-button type="primary" size="large">Thêm đơn hàng</a-button>
              </NuxtLink>
            </div>
          </div>
          <div>
            <a-table
              :columns="columns"
              :data-source="orderStore?.getAllOrderAdmin?.orders"
              :loading="orderStore.isLoading"
              :pagination="false"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'user'">
                  <div class="flex justify-start gap-2 items-center">
                    <div>
                      <a-image
                        v-if="record.user.avatar"
                        :src="record.user.avatar.replace('=s96-c', '')"
                        :width="40"
                        :height="40"
                        class="rounded-3xl"
                      />
                    </div>
                    <div class="flex flex-col">
                      <span>{{ record.user.fullname }}</span>
                      <span>{{ record.user.email }}</span>
                    </div>
                  </div>
                </template>
                <template v-else-if="column.dataIndex === 'order_details'">
                  <span>{{ record.loan_order_details.length }} quyển</span>
                </template>
                <template v-else-if="column.dataIndex === 'created_at'">
                  <span>
                    {{
                      record.created_at
                        ? $dayjs(record.created_at).format(
                            "DD/MM/YYYY HH:mm:ss"
                          )
                        : ""
                    }}
                  </span>
                </template>
                <template v-if="column.dataIndex === 'status'">
                  <span>
                    <a-tag
                      :bordered="false"
                      v-if="record.status === 'wating_payment'"
                      class="bg-tag-bg-01 text-tag-text-01"
                    >
                      Chờ thanh toán
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-if="record.status === 'pending'"
                      class="bg-tag-bg-01 text-tag-text-01"
                    >
                      Đang xử lý
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'approved'"
                      class="bg-tag-bg-02 text-tag-text-02"
                    >
                      Đã xác nhận
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'ready_for_pickup'"
                      class="bg-tag-bg-14 text-tag-text-14"
                    >
                      Đơn hàng sẵn sàng
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'preparing_shipment'"
                      class="bg-tag-bg-15 text-tag-text-15"
                    >
                      Chuẩn bị giao hàng
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'in_transit'"
                      class="bg-tag-bg-03 text-tag-text-03"
                    >
                      Đang giao
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'extended'"
                      class="bg-tag-bg-12 text-tag-text-12"
                    >
                      Gia hạn
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'active'"
                      class="bg-tag-bg-04 text-tag-text-04"
                    >
                      Đang thuê
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'returning'"
                      class="bg-tag-bg-13 text-tag-text-13"
                    >
                      Đang trả sách
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'completed'"
                      class="bg-tag-bg-05 text-tag-text-05"
                    >
                      Hoàn thành
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'canceled'"
                      class="bg-tag-bg-07 text-tag-text-07"
                    >
                      Đã hủy
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else-if="record.status === 'overdue'"
                      class="bg-tag-bg-06 text-tag-text-06"
                    >
                      Quá hạn
                    </a-tag>
                  </span>
                </template>
                <template v-else-if="column.dataIndex === 'payment_method'">
                  <div v-if="record.payment_method === 'cash'">
                    <span>Tiền mặt</span>
                  </div>
                  <div v-else-if="record.payment_method === 'online'">
                    <span>Chuyển khoản</span>
                  </div>
                </template>
                <template v-else-if="column.key === 'action'">
                  <div class="flex text-[16px] gap-2">
                    <NuxtLink :to="`/admin/product-manager/${record.id}`">
                      <a-tooltip placement="top">
                        <template #title>
                          <span>Xem chi tiết</span>
                        </template>
                        <button
                          class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                        >
                          <div>
                            <Icon
                              icon="solar:eye-outline"
                              class="group-hover:text-[#212122]"
                            />
                          </div>
                        </button>
                      </a-tooltip>
                    </NuxtLink>
                  </div>
                </template>
              </template>
            </a-table>
            <div class="mt-4 flex justify-end">
              <a-pagination
                v-model:current="current"
                :total="orderStore?.getAllOrderAdmin?.totalResults"
                :pageSize="orderStore?.getAllOrderAdmin?.pageSize"
                show-less-items
                pageSizeOptions
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const orderStore = useOrderStore();
const current = ref(1);
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const onSearch = debounce(() => {
  current.value = 1;
  orderStore.getAllOrder({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
  });
}, 500);

watch(valueSearch, onSearch);

watch(current, () => {
  navigateTo({
    query: {
      page: current.value,
    },
  });
});
useAsyncData(
  async () => {
    try {
      await orderStore.getAllOrder({
        page: current.value,
        search: valueSearch.value,
        status: queryStatus.value.value,
      });
    } catch (error) {}
  },
  {
    immediate: true,
    watch: [current, queryStatus.value],
  }
);
useAsyncData(async () => {
  try {
    await orderStore.statisticOrder();
  } catch (error) {
    console.error(error);
  }
});
const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "order_code",
    key: "order_code",
    width: 120,
  },
  {
    title: "Thông tin cá nhân",
    dataIndex: "user",
    key: "user",
    width: 300,
  },

  {
    title: "Số lượng sách",
    dataIndex: "order_details",
    key: "order_details",
  },
  {
    title: "Phương thức thanh toán",
    dataIndex: "payment_method",
    key: "payment_method",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Ngày tạo",
    dataIndex: "created_at",
    key: "created_at",
    width: 120,
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
