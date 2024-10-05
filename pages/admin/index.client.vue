<template>
  <div class="space-y-5 pt-4">
    <div class="flex flex-col gap-2 md:flex-row md:items-center print:hidden">
      <div class="grow flex justify-between">
        <h5 class="text-xl text-[#1e293b] font-bold">Thông tin chung</h5>
        <!-- <a-space direction="vertical" :size="12">
          <a-range-picker v-model:value="value1" />
        </a-space> -->
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
    >
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm font-medium w-full p-4 gap-2">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-03 text-tag-text-03"
            >
              <Icon icon="ion:business-outline" class="text-lg w-10 h-10" />
            </a-tag>
            <div class="flex-1 text-tag-text-03">
              <p class="font-semibold text-base">Doanh thu</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>{{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(dashboardStore?.dashboardAdmin?.revenue)
                }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm font-medium w-full p-4 gap-2">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-04 text-tag-text-04"
            >
              <Icon icon="icon-park-outline:bill" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-04">
              <p class="font-semibold text-base">Phiếu nhập hàng</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.invoiceEnter
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
          <div class="flex items-center text-sm font-medium w-full p-4 gap-2">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-01 text-tag-text-01"
            >
              <Icon
                icon="solar:users-group-rounded-broken"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-01">
              <p class="font-semibold text-base">Tổng khách hàng</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  icon="svg-spinners:3-dots-scale"
                  v-if="isLoading"
                  class="text-3xl"
                />

                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.user
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
              class="flex items-center p-2 bg-tag-bg-03 text-tag-text-03"
            >
              <Icon icon="hugeicons:user-check-02" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-03">
              <p class="font-semibold text-base">Khách hàng đã xác thực</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.userVerified
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
              class="flex items-center p-2 bg-tag-bg-10 text-tag-text-10"
            >
              <Icon icon="streamline:shelf" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-10">
              <p class="font-semibold text-base">Số lượng tủ sách</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.bookcase
                    )
                  }}</span
                >
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
              class="flex items-center p-2 bg-tag-bg-11 text-tag-text-11"
            >
              <Icon icon="bi-bookshelf" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-11">
              <p class="font-semibold text-base">Số lượng kệ sách</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.shelve
                    )
                  }}</span
                >
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
              class="flex items-center p-2 bg-tag-bg-05 text-tag-text-05"
            >
              <Icon
                icon="solar:book-minimalistic-line-duotone"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-05">
              <p class="font-semibold text-base">Số lượng sách</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else
                  >{{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.book
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
              class="flex items-center p-2 bg-tag-bg-06 text-tag-text-06"
            >
              <Icon icon="hugeicons-quill-write-02" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-06">
              <p class="font-semibold text-base">Số lượng bài viết</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.post
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
              class="flex items-center p-2 bg-tag-bg-09 text-tag-text-09"
            >
              <Icon icon="solar:bill-check-outline" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-09">
              <p class="font-semibold text-base">Số phiếu trả</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      dashboardStore?.dashboardAdmin?.returnHistory
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3 gap-4">
      <HighchartHigh />
      <HighchartHigh1 />
    </div>
    <div class="w-full min-h-[360px] bg-[white] rounded-lg p-5">
      <div class="flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <div class="w-1/4 md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập thông tin cá nhân"
                class="h-10"
                v-model:value="valueSearch"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div>
          <!-- <div>
            <a-button type="primary" size="large">Thêm đơn hàng</a-button>
          </div> -->
        </div>

        <div class="flex gap-4 text-white">
          <a-button
            :class="[
              'flex justify-center items-center gap-2 h-10 border-none shadow-none',
              filter === '' ? 'bg-orange-500 !text-white' : '',
            ]"
            @click="handleCheckStatus('')"
          >
            <Icon icon="icon-park-outline:transaction-order" />
            <span>Đơn hàng gần đây</span>
          </a-button>

          <a-button
            :class="[
              'flex justify-center items-center gap-2 h-10 border-none shadow-none',
              filter === 'pending' ? 'bg-orange-500 !text-white' : '',
            ]"
            @click="handleCheckStatus('pending')"
          >
            <Icon icon="nonicons-loading-16" />
            <span>Đang xử lý</span>
          </a-button>
          <a-button
            :class="[
              'flex justify-center items-center gap-2  h-10 border-none shadow-none',
              filter === 'overdue' ? 'bg-orange-500 !text-white' : '',
            ]"
            @click="handleCheckStatus('overdue')"
          >
            <Icon icon="ph-warning-light" />
            <span>Quá hạn</span>
          </a-button>
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
                      :src="record.user.avatar"
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
                      ? $dayjs(record.created_at).format("DD/MM/YYYY HH:mm:ss")
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
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        class="bg-white w-full rounded-md space-y-2 p-5 relative min-h-[350px]"
      >
        <div class="text-xl font-semibold">Sách được thuê nhiều</div>
        <div class="max-h-[400px] overflow-auto pr-4">
          <div
            v-if="dashboardStore.dashboardBook.length === 0"
            class="flex justify-center flex-col items-center gap-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div>
              <Icon
                icon="uil:file-search-alt"
                class="text-[80px] text-gray-300"
              />
            </div>
            <h1 class="text-[#7b7b7b] font-semibold"></h1>
          </div>

          <DashboardBook
            v-for="book in dashboardStore.dashboardBook"
            :key="book.id"
            :dashboard="book"
          />
        </div>
      </div>

      <div class="bg-white w-full rounded-md space-y-2 p-5 relative">
        <div class="text-xl font-semibold space-y-2">Hóa đơn nhập hàng</div>
        <div class="max-h-[400px] overflow-auto pr-4">
          <div
            v-if="dashboardStore.dashboardInvoice.length === 0"
            class="flex justify-center flex-col items-center gap-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div>
              <Icon
                icon="uil:file-search-alt"
                class="text-[80px] text-gray-300"
              />
            </div>
            <h1 class="text-[#7b7b7b] font-semibold"></h1>
          </div>

          <DashboardBill
            v-for="bill in dashboardStore.dashboardInvoice"
            :key="bill.id"
            :dashboard="bill"
          />
        </div>
      </div>

      <div class="bg-white w-full rounded-md space-y-2 p-5 relative">
        <div class="flex justify-between items-end font-semibold">
          <div class="text-xl">Lịch sử giao dịch gần đây</div>
          <div
            v-if="transactionAdminStore.transactionAdmin.length === 0"
            class="flex justify-center flex-col items-center gap-2 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div>
              <Icon
                icon="uil:file-search-alt"
                class="text-[80px] text-gray-300"
              />
            </div>
            <h1 class="text-[#7b7b7b] font-semibold"></h1>
          </div>
          <NuxtLink to="/admin/history-transaction">
            <div class="underline text-sm cursor-pointer hover:text-orange-400">
              Xem tất cả
            </div>
          </NuxtLink>
        </div>
        <div class="max-h-[400px] overflow-auto pr-4">
          <TransactionHistory
            v-for="history in transactionAdminStore.transactionAdmin
              .transactions"
            :key="history.id"
            :transactions="history"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const dashboardStore = useDashboardStore();
const orderStore = useOrderStore();
const transactionAdminStore = useTransactionAdminStore();
const isLoading = ref(false);
const loading = ref(false);
const filter = ref("");
const valueSearch = ref("");
const current = ref(1);
useAsyncData(
  async () => {
    loading.value = true;
    await orderStore.getAllOrder({
      current: current.value,
      status: filter.value,
      search: valueSearch.value,
    });
    loading.value = false;
  },
  {
    immediate: true,
    watch: [filter, current, valueSearch],
  }
);
useAsyncData(async () => {
  isLoading.value = true;
  await dashboardStore.getAllDashboard();
  isLoading.value = false;
});

useAsyncData(async () => {
  await dashboardStore.getBookDashboard();
});

useAsyncData(async () => {
  await dashboardStore.getInvoiceDashboard();
});
useAsyncData(async () => {
  await transactionAdminStore.getAllTransaction({
    sort: "inMonth",
  });
});
const handleCheckStatus = (status) => {
  filter.value = status;
};

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
    title: "Thao tác",
    key: "action",
  },
];
useSeoMeta({
  title: "ReadStation | Dashboard",
  ogTitle: "ReadStation | Dashboard",
  description: "Dashboard",
  ogDescription: "Dashboard",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
