<template>
  <div class="p-5">
    <a-modal v-model:open="props.openHistoryExtend" :footer="null" width="70%" @cancel="handleClose">
      <div class="border-b border-rtgray-50 pb-5">
        <span class="font-bold">Lịch sử gia hạn</span>
      </div>
      <a-table :columns="columns" :data-source="orderStore?.order?.extensions" class="components-table-demo-nested"
        :expanded-row-keys="expandedRowKeys" rowKey="key" :pagination="false">
        <template #bodyCell="{ column, index, record }">
          <div class="flex items-center gap-10">
            <template v-if="column.key === 'extensions'">
              <span>Gia hạn lần {{ index + 1 }}</span>
            </template>
            <div v-if="record?.status === 'pending'">
              <NuxtLink :to="record?.fee_transaction?.extra_info?.checkoutUrl">
                <a-tooltip placement="top">
                  <template #title>
                    <span class="text-xs">Thanh toán ngay</span>
                  </template>
                  <button
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <div class="flex items-center">
                      <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
                    </div>
                  </button>
                </a-tooltip>
              </NuxtLink>
            </div>
          </div>
        </template>

        <template #expandedRowRender="{ record }">
          <a-table :columns="innerColumns" :data-source="record.extension_details" :pagination="false">
            <template #bodyCell="{ column, index }">
              <template v-if="column.key === 'title'">
                <span>{{ record.extension_details[index]?.loan_order_detail?.book_details?.book?.title }}</span>
              </template>
              <template v-if="column.key === 'number_of_days'">
                <span>{{ record.extension_details[index]?.number_of_days }} ngày</span>
              </template>
              <template v-if="column.key === 'extension_fee'">
                <span>{{ new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record.extension_details[index]?.extension_fee) }}</span>
              </template>
              <template v-if="column.key === 'created_at'">
                <span>{{ $dayjs(record.extension_details[index]?.created_at).format("DD/MM/YYYY") }}</span>
              </template>
              <template v-if="column.key === 'new_due_date'">
                <span>{{ $dayjs(record.extension_details[index]?.new_due_date).format("DD/MM/YYYY") }}</span>
              </template>
              <template v-if="column.key === 'status'">
                <span>
                  <a-tag v-if="record?.status === 'pending'" class="text-tag-text-07 bg-tag-bg-07 border-none"> Chờ xử
                    lý </a-tag>
                  <a-tag v-if="record?.status === 'rejected'" class="text-tag-text-11 bg-tag-bg-11 border-none"> Thất
                    bại </a-tag>
                  <a-tag v-if="record?.status === 'approved'" class="text-tag-text-09 bg-tag-bg-09 border-none"> Thành
                    công </a-tag>
                </span>
              </template>
            </template>
          </a-table>
        </template>
      </a-table>

      <div class="flex justify-end gap-2 mt-4">
        <a-button class="h-10" @click="handleClose">Trở về</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
const orderStore = useOrderClientStore();
const route = useRoute();
const id = route.params.id;

const props = defineProps({
  openHistoryExtend: Boolean,
  closeHistoryExtend: Function,
});

const open = ref(props.openHistoryExtend);

const handleClose = () => {
  props.closeHistoryExtend();
};

useAsyncData(async () => {
  await orderStore.getOneOrder(id);
  expandedRowKeys.value = orderStore.order.extensions.map((ext: any, index: number) => ext.key);
});

const expandedRowKeys = ref<string[]>([]);

const columns = [
  { title: 'Lần gia hạn', dataIndex: 'extensions', key: 'extensions' },
];

const innerColumns = [
  {
    title: 'Tên sách',
    dataIndex: 'title',
    key: 'title',
    width: '250px',
  },
  {
    title: 'Số ngày gia hạn',
    key: 'number_of_days',
    dataIndex: 'number_of_days',
  },
  {
    title: 'Số tiền gia hạn',
    key: 'extension_fee',
    dataIndex: 'extension_fee',
  },
  {
    title: 'Ngày gia hạn',
    key: 'created_at',
    dataIndex: 'created_at',
  },
  {
    title: 'Ngày tới hạn',
    key: 'new_due_date',
    dataIndex: 'new_due_date',
  },
  {
    title: 'Trạng thái',
    key: 'status',
    dataIndex: 'status',
  },
];
</script>
