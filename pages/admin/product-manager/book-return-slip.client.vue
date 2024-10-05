<template>

  <Head>
    <Title>ReadStation | Phiếu trả sách</Title>
    <Meta name="description" content="Phiếu trả sách" />
    <Meta property="og:title" content="ReadStation | Phiếu trả sách" />
    <Meta property="og:description" content="Phiếu trả sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Phiếu trả sách</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex flex-col gap-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input placeholder="Nhập mã đơn hàng để tìm kiếm" class="h-10 w-[400px]" v-model:value="valueSearch">
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div>

          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item @click="
                  statusValue({ value: '', label: 'Tất cả trạng thái' })
                  ">Tất cả trạng thái</a-menu-item>
                <a-menu-item @click="statusValue({ value: 'completed ', label: 'Hoàn thành' })">Hoàn thành</a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'pending', label: 'Chờ xử lý' })
                  ">Chờ xử lý</a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
        <a-table :columns="columns" :data-source="returnHistoryStore?.ReturnHistoryAdmin?.returnHistory"
          :loading="returnHistoryStore?.isLoading" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'sku'">
              <span>{{
                record.loan_order_detail?.loan_order?.order_code
              }}</span>
            </template>
            <template v-if="column.key === 'loan_order_detail'">
              <div class="flex justify-start gap-4 items-center">
                <a-image :src="record.loan_order_detail?.loan_order?.user?.avatar" :width="40" :height="40"
                  class="rounded-full" />
                <div class="flex flex-col gap-1">
                  <span class="text-base">
                    {{ record.loan_order_detail?.loan_order?.user?.fullname }}
                  </span>
                  <span class="text-base">
                    {{
                      record.loan_order_detail?.loan_order?.user?.phone
                        ? record.loan_order_detail?.loan_order?.user?.phone
                        : ""
                    }}</span>
                </div>
              </div>
            </template>
            <template v-if="column.key === 'return_date'">
              <span>{{ $dayjs(record.return_date).format("DD/MM/YYYY") }}</span>
            </template>
            <template v-if="column.key === 'return_method'">
              <span v-if="record?.return_method === 'library'">Trả sách tại thư viện</span>
              <span v-if="record?.return_method === 'pickup'">Trả sách tại nhà</span>
            </template>
            <template v-if="column.key === 'processed_by'">
              <span>{{
                record?.processed_by?.fullname
                  ? record?.processed_by?.fullname
                  : "Chưa được xử lý"
              }}</span>
            </template>
            <template v-if="column.key === 'status'">
              <span v-if="record?.status === 'completed'">
                <a-tag :bordered="false" class="bg-tag-bg-05 text-tag-text-05">Hoàn thành</a-tag>
              </span>
              <span v-if="record?.status === 'pending'">
                <a-tag :bordered="false" class="bg-tag-bg-01 text-tag-text-01">Đang xử lý</a-tag>
              </span>
              <span v-if="record?.status === 'lost'">
                <a-tag :bordered="false" class="bg-tag-bg-06 text-tag-text-06">Đã Mất</a-tag>
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <NuxtLink class="hover:text-[black]" :to="`/admin/product-manager/slip/${record?.id}`">
                <a-tooltip placement="top" color="black">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center cursor-pointer justify-center w-8 h-8 rounded-md">
                    <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
                  </button>
                </a-tooltip>
              </NuxtLink>
            </template>
          </template>
        </a-table>
        <div class="mt-4 flex justify-end">
          <a-pagination v-model:current="current" :total="returnHistoryStore?.ReturnHistoryAdmin?.totalResults"
            :pageSize="returnHistoryStore?.ReturnHistoryAdmin?.pageSize" show-less-items />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const current = ref(1);
const valueSearch = ref("");
const returnHistoryStore = useReturnHistoryStore();
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
  returnHistoryStore.getAllReturnHistory({
    search: valueSearch.value,
    page: current.value,
    status: queryStatus.value.value,
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    try {
      await returnHistoryStore.getAllReturnHistory({
        search: valueSearch.value,
        page: current.value,
        status: queryStatus.value.value,
      });
    } catch (error) {
      console.error(error);
    }
  },
  {
    immediate: true,
    watch: [current, queryStatus.value],
  }
);

const columns = [
  {
    title: "Mã đơn hàng",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Thông tin cá nhân",
    dataIndex: "loan_order_detail",
    key: "loan_order_detail",
  },
  {
    title: "Ngày tạo phiếu",
    dataIndex: "return_date",
    key: "return_date",
  },
  {
    title: "Hình thức trả sách",
    dataIndex: "return_method",
    key: "return_method",
  },
  {
    title: "Người xử lý",
    dataIndex: "processed_by",
    key: "processed_by",
  },
  {
    title: "Trạng thái phiếu",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];
</script>
