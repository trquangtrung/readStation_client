<template>
  <div class="space-y-5">
    <h3 class="font-bold mb-5">Thông tin số dư</h3>

    <div
      class="flex items-center text-base h-[90px] bg-white shadow-md rounded-md p-5"
    >
      <div class="flex items-center text-sm font-medium gap-3">
        <a-tag
          :bordered="false"
          class="bg-tag-bg-03 text-tag-text-03 flex items-center p-1"
        >
          <UIcon class="text-lg w-10 h-10" name="i-solar-wallet-outline"
        /></a-tag>

        <div class="text-orange-400">
          <p class="font-bold text-base">Tiền cọc đang thuê sách</p>
          <p class="font-bold text-xl">
            <Icon
              v-if="isLoading"
              icon="svg-spinners:3-dots-scale"
              class="text-3xl"
            />
            <span v-else>
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(trangsactionStore?.balanceHoding)
              }}</span
            >
          </p>
        </div>
      </div>
    </div>
    <div class="w-full bg-white rounded-lg shadow-md shadow-gray-300 p-5">
      <span class="py-5 font-bold">Lịch sử giao dịch (30 ngày gần nhất)</span>
      <a-table
        :columns="columns"
        :data-source="trangsactionStore?.transaction?.transactions"
        class="mt-5"
        :pagination="false"
        :loading="trangsactionStore?.isLoading"
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
              v-if="record.status === 'holding'"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đang giữ
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
              v-if="record.status === 'failed'"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Thất bại
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
          v-if="trangsactionStore?.transaction?.totalResults > 10"
          v-model:current="current"
          :total="trangsactionStore?.transaction?.totalResults"
          :pageSize="trangsactionStore?.transaction?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const trangsactionStore = useTransactionStore();
const current = ref(1);
const isLoading = ref(false);
useAsyncData(
  async () => {
    isLoading.value = true;
    await trangsactionStore.getTransaction({
      page: current.value,
      sort: "inMonth",
    });
    isLoading.value = false;
  },
  {
    immediate: true,
    watch: current,
  }
);
useAsyncData(async () => {
  await trangsactionStore.getBalanceHoding({});
});
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
  title: "ReadStation | Quản lý số dư",
  ogTitle: "ReadStation | Quản lý số dư",
  description: "Quản lý số dư",
  ogDescription: "Quản lý số dư",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
