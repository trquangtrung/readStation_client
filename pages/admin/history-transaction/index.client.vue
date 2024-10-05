<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl font-bold">Tất cả lịch sử giao dịch</h5>
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập mã giao dịch để tìm kiếm"
                class="h-10 w-[400px]"
                v-model:value="valueSearch"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="
                    statusValue({ value: '', label: 'Tất cả trạng thái' })
                  "
                  >Tất cả trạng thái</a-menu-item
                >
                <a-menu-item
                  @click="statusValue({ value: 'pending', label: ' Đang chờ' })"
                >
                  Đang chờ</a-menu-item
                >

                <a-menu-item
                  @click="
                    statusValue({ value: 'completed', label: 'Hoàn thành' })
                  "
                  >Hoàn thành</a-menu-item
                >

                <a-menu-item
                  @click="statusValue({ value: 'canceled', label: 'Đã hủy' })"
                  >Đã hủy</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="
                    transactionTypeValue({
                      value: '',
                      label: 'Tất cả loại giao dịch',
                    })
                  "
                  >Tất cả loại giao dịch</a-menu-item
                >
                <a-menu-item
                  @click="
                    transactionTypeValue({
                      value: 'payment',
                      label: ' Thanh toán',
                    })
                  "
                >
                  Thanh toán</a-menu-item
                >
                <a-menu-item
                  @click="
                    transactionTypeValue({
                      value: 'refund',
                      label: 'Hoàn tiền',
                    })
                  "
                  >Hoàn tiền</a-menu-item
                >
                <a-menu-item
                  @click="
                    transactionTypeValue({ value: 'extend', label: 'Gia hạn' })
                  "
                  >Gia hạn</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{
                queryTransactionType.label
                  ? queryTransactionType.label
                  : "Tất cả loại giao dịch"
              }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="
                    transactionMethodValue({
                      value: '',
                      label: 'Tất cả hình thức giao dịch',
                    })
                  "
                  >Tất cả hình thức giao dịch</a-menu-item
                >
                <a-menu-item
                  @click="
                    transactionMethodValue({
                      value: 'offline',
                      label: ' Tiền mặt',
                    })
                  "
                >
                  Tiền mặt</a-menu-item
                >
                <a-menu-item
                  @click="
                    transactionMethodValue({
                      value: 'online',
                      label: 'Chuyển khoản',
                    })
                  "
                  >Chuyển khoản</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{
                queryTransactionMethod.label
                  ? queryTransactionMethod.label
                  : "Tất cả hình thức giao dịch"
              }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>
      <a-table
        :columns="columns"
        :data-source="transactionAdminStore?.transactionAdmin?.transactions"
        class="mt-5"
        :pagination="false"
        :loading="transactionAdminStore?.isLoading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'amount'">
            <span>
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record?.amount)
              }}
            </span>
          </template>
          <template v-if="column.key === 'transaction_type'">
            <a-tag
              :bordered="false"
              v-if="record.transaction_type === 'payment'"
              class="text-tag-text-09 bg-tag-bg-09"
            >
              Thanh toán
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.transaction_type === 'refund'"
              class="text-tag-text-06 bg-tag-bg-06"
            >
              Hoàn tiền
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.transaction_type === 'extend'"
              class="text-tag-text-06 bg-tag-bg-06"
            >
              Gia hạn
            </a-tag>
          </template>

          <template v-if="column.key === 'transaction_method'">
            <span v-if="record.transaction_method === 'offline'">
              Tiền mặt
            </span>
            <span v-else-if="record.transaction_method === 'online'">
              Chuyển khoản
            </span>
          </template>

          <template v-if="column.key === 'created_at'">
            <span>
              {{ $dayjs(record?.created_at).format("DD/MM/YYYY - HH:MM") }}
            </span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === 'pending'"
              class="bg-tag-bg-01 text-tag-text-01"
            >
              Đang chờ
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === 'completed'"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Hoàn thành
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === 'canceled'"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đã hủy
            </a-tag>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination
        v-if="transactionAdminStore?.transactionAdmin?.totalResults > 10"
          v-model:current="current"
          :total="transactionAdminStore?.transactionAdmin?.totalResults"
          :pageSize="transactionAdminStore?.transactionAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import debounce from "lodash.debounce";
const transactionAdminStore = useTransactionAdminStore();
const current = ref(1);
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const queryTransactionType = ref({
  value: "",
  label: "",
});
const queryTransactionMethod = ref({
  value: "",
  label: "",
});
const transactionTypeValue = ({ value, label }) => {
  queryTransactionType.value.value = value;
  queryTransactionType.value.label = label;
};
const transactionMethodValue = ({ value, label }) => {
  queryTransactionMethod.value.value = value;
  queryTransactionMethod.value.label = label;
};
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const onSearch = debounce(() => {
  current.value = 1;
  transactionAdminStore.getAllTransaction({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
    transaction_type: queryTransactionType.value.value,
    transaction_method: queryTransactionMethod.value.value,
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await transactionAdminStore.getAllTransaction({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
      transaction_type: queryTransactionType.value.value,
      transaction_method: queryTransactionMethod.value.value,
    });
  },
  {
    immediate: true,
    watch: [
      current,
      queryStatus.value,
      queryTransactionType.value,
      queryTransactionMethod.value,
    ],
  }
);
const columns = [
  {
    title: "Mã giao dịch",
    dataIndex: "transaction_code",
    key: "transaction_code",
  },
  {
    title: "Số tiền",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Mô tả",
    key: "description",
    dataIndex: "description",
  },
  {
    title: "Loại giao dịch",
    dataIndex: "transaction_type",
    key: "transaction_type",
  },
  {
    title: "Hình thức ",
    dataIndex: "transaction_method",
    key: "transaction_method",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },

  {
    title: "Thời gian",
    key: "created_at",
    dataIndex: "created_at",
  },
];
useSeoMeta({
  title: "ReadStation | Lịch sử giao dịch",
  ogTitle: "ReadStation | Lịch sử giao dịch",
  description: "Lịch sử giao dịch",
  ogDescription: "Lịch sử giao dịch",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
