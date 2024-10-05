<template>

  <Head>
    <Title>ReadStation | Thùng rác nhà cung cấp</Title>
    <Meta name="description" content="Thùng rác nhà cung cấp" />
    <Meta property="og:title" content="ReadStation | Thùng rác nhà cung cấp" />
    <Meta property="og:description" content="Thùng rác nhà cung cấp" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">
          Tất cả nhà cung cấp đã xóa
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div>
        <a-table :columns="columns" :data-source="supplierStore?.SupplierAdmin?.suppliers"
          :loading="supplierStore.isLoading" :pagination="false">
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'name'">
              <a>
                {{ record.name }}
              </a>
            </template>
            <template v-if="column.key === 'email'">
              <a>
                {{ record.email }}
              </a>
            </template>
            <template v-if="column.key === 'status'">
              <a-tag :bordered="false" class="bg-tag-bg-06 text-tag-text-06">
                Đã xóa
              </a-tag>
            </template>
            <template v-else-if="column.key === 'action'">
              <div class="flex text-[16px] gap-2">
                <a-tooltip placement="top" color="black ">
                  <template #title>
                    <span>Khôi phục</span>
                  </template>
                  <button @click="showRecoverConfirm(record?.id)"
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <Icon icon="ic:round-settings-backup-restore" class="text-lg" />
                  </button>
                </a-tooltip>
              </div>
            </template>
          </template>
        </a-table>
      </div>
      <div class="mt-4 flex justify-end">
        <a-pagination v-if="supplierStore.getAllSupplier?.totalResults > 10" v-model:current="current"
          :total="supplierStore.getAllSupplier?.totalResults" :pageSize="supplierStore.getAllSupplier?.pageSize"
          show-less-items />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const supplierStore = useSupplierStore();
const current = ref(1);
useAsyncData(async () => {
  await supplierStore.getAllSupplier({
    page: current.value,
    status: "deleted",
  });
}, {
  immediate: true,
  watch: [current],
});
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có muốn khôi phục nhà cung cấp này ?",
    okText: "Có",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onRecover(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const onRecover = async (id) => {
  await supplierStore.updateSupplier({
    id: id,
    valueSupplier: {
      status: "active",
    },
  });
  await supplierStore.getAllSupplier({
    status: "deleted",
  });
};

const columns = [
  {
    title: "Tên nhà cùng cấp",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
    ellipsis: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Địa chỉ nhà cung cấp",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Trạng thái",
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
