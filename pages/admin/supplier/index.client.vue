<template>

  <Head>
    <Title>ReadStation | Quản lý nhà cung cấp</Title>
    <Meta name="description" content="Quản lý  nhà cung cấp" />
    <Meta property="og:title" content="ReadStation | Quản lý  nhà cung cấp" />
    <Meta property="og:description" content="Quản lý  nhà cung cấp" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả nhà cung cấp</h5>
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="relative w-2/3 md:block hidden">
            <div class="flex">
              <a-input placeholder="Nhập nhà cung cấp để tìm kiếm" class="h-10" v-model:value="valueSearch">
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UIcon class="text-gray-500" name="i-material-symbols-search" />
            </div>
          </div>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item @click="
                  statusValue({ value: '', label: 'Tất cả trạng thái' })
                  ">Tất cả trạng thái</a-menu-item>
                <a-menu-item @click="statusValue({ value: 'active', label: 'Hoạt động' })">Hoạt động</a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'inactive', label: 'Không hoạt động' })
                  ">Không hoạt động</a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
        <div class="">
          <a-button @click="showModalAdd"
            class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary">Thêm nhà cung
            cấp</a-button>
          <SupplierCreate :openModalAdd="openModalAdd" :openModal="CloseModalAdd" />
          <SupplierEdit :openModalEdit="openModalEdit" :openModal="CloseModalEdit" :supplierId="supplierId" />
        </div>
      </div>
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
              <span>
                <a-tag :color="record.status === 'active' ? 'green' : 'volcano'" style="border: none">
                  {{
                    record.status === "active" ? "hoạt động" : "Không hoạt động"
                  }}
                </a-tag>
              </span>
            </template>

            <template v-else-if="column.key === 'action'">
              <div class="flex text-[16px] gap-2">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Sửa</span>
                  </template>
                  <button @click="showModalEdit(record?.id)"
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <Icon icon="fluent:edit-48-regular" class="text-lg" />
                  </button>
                </a-tooltip>
                <a-tooltip placement="top">
                  <template #title>
                    <span>Xóa</span>
                  </template>
                  <button @click="showDeleteConfirm(record?.id)"
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                    s>
                    <Icon icon="hugeicons:delete-01" class="text-lg" />
                  </button>
                </a-tooltip>
              </div>
            </template>
          </template>
        </a-table>
        <div class="mt-4 flex justify-end">
          <a-pagination v-model:current="current" :total="supplierStore?.SupplierAdmin?.totalResults"
            :pageSize="supplierStore?.SupplierAdmin?.pageSize" show-less-items pageSizeOptions />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { Modal, message } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import debounce from "lodash.debounce";
const errors = ref({});
const supplierStore = useSupplierStore();
const openModalEdit = ref<boolean>(false);
const openModalAdd = ref<boolean>(false);
const supplierId = ref<number>();
const current = ref(1);
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const statusValue = ({ value, label }: any) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "16px",
  },
  spin: true,
});
const onSearch = debounce(() => {
  current.value = 1;
  getData();
}, 500);

watch(valueSearch, onSearch);
const getData = async () => {
  await supplierStore.getAllSupplier({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
  });
};
useAsyncData(
  async () => {
    getData();
  },
  {
    immediate: true,
    watch: [queryStatus.value, current],
  }
);
const onDelete = async (id: string) => {
  const res = await supplierStore.deleteSupplier(id);
  if (res.data._rawValue?.status == true) {
    message.success(res.data._rawValue?.message);
    await getData();
  } else {
    errors.value = res.error.value.data.errors;
    message.error(res.error.value.data.message);
  }
};
const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: "Bạn có chắc xóa nhà cung cấp này không?",
    okText: "Có",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onDelete(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};

const CloseModalAdd = () => {
  openModalAdd.value = false;
};

const showModalAdd = () => {
  openModalAdd.value = true;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
const showModalEdit = (id: number) => {
  openModalEdit.value = true;
  supplierId.value = id;
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
