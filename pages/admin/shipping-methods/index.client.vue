<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Tất cả phương thức vận chuyển
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập tên phương thức vẫn chuyển để tìm kiếm"
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
                  @click="statusValue({ value: 'active', label: 'Công khai' })"
                  >Công khai</a-menu-item
                >
                <a-menu-item
                  @click="statusValue({ value: 'inactive', label: 'Đang ẩn' })"
                  >Đang ẩn</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>

        <div class="">
          <a-button @click="showModalAdd" type="primary" size="large"
            >Thêm phương thức vận chuyển</a-button
          >
        </div>
      </div>
      <ShippingMethodsAdd
        :openModalAdd="openModalAdd"
        :openModal="CloseModalAdd"
      />
      <ShippingMethodsEdit
        :openModalEdit="openModalEdit"
        :openModal="CloseModalEdit"
        :shippingMethodId="shippingMethodId"
      />

      <a-table
        :columns="columns"
        :data-source="shippingMethodStore.shippingMethodsAdmin?.shippingMethods"
        :pagination="false"
        :loading="shippingMethodStore.isLoading"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'logo'">
            <a-image
              v-if="record.logo"
              class="rounded-md"
              :width="100"
              :height="100"
              :src="record.logo"
            />
            <span v-else></span>
          </template>
          <template v-if="column.key === 'location'">
            <ul>
              <li v-for="item in record.location" :key="item">
                {{ item }}
              </li>
            </ul>
          </template>
          <template v-if="column.key === 'method'">
            <span>
              {{ record.method }}
            </span>
          </template>
          <template v-if="column.key === 'fee'">
            <span>
              {{ record.fee }}
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === ShippingMethodsStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Công khai
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === ShippingMethodsStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === ShippingMethodsStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record.is_featured" />
            <IconMul v-else />
          </template>

          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top">
                <template #title>
                  <span>Sửa</span>
                </template>
                <button
                  @click="showModalEdit(record?.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon icon="fluent:edit-48-regular" class="text-lg" />
                </button>
              </a-tooltip>
              <a-tooltip placement="top">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button
                  @click="showDeleteConfirm(record?.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                  s
                >
                  <Icon icon="hugeicons:delete-01" class="text-lg" />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination
          v-if="shippingMethodStore?.shippingMethodsAdmin?.totalResults > 10"
          v-model:current="current"
          :total="shippingMethodStore?.shippingMethodsAdmin?.totalResults"
          :pageSize="shippingMethodStore?.shippingMethodsAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Modal } from "ant-design-vue";
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
import { ShippingMethodsStatus } from "~/types/admin/shippingMethods";
const openModalAdd = ref(false);
const openModalEdit = ref(false);
const shippingMethodId = ref();
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
  shippingMethodStore.getAllShippingMethods({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
  });
}, 500);

watch(valueSearch, onSearch);
const shippingMethodStore = useShippingMethodsStore();
useAsyncData(
  async () => {
    shippingMethodStore.getAllShippingMethods({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
    });
  },
  {
    immediate: true,
    watch: [current, queryStatus.value],
  }
);
const onDelete = async (id) => {
  try {
    const res = await shippingMethodStore.deleteShippingMethod(id);
    if (res.data._rawValue?.status == true) {
      message.success(res.data._rawValue?.message);
      await shippingMethodStore.getAllShippingMethods({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa phương thức vận chuyển thất bại");
  }
};

const showDeleteConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa phương thức vận chuyển này không?",

    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onDelete(id);
    },
    onCancel() {
    },
  });
};
const columns = [
  {
    title: "Tên phương thức vận chuyển",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Logo",
    dataIndex: "logo",
    key: "logo",
  },
  {
    title: "Khu vực",
    dataIndex: "location",
    key: "location",
  },

  {
    title: "Phí vận chuyển",
    dataIndex: "fee",
    key: "fee",
  },

  {
    title: "Ghi chú",
    dataIndex: "note",
    key: "note",
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

const CloseModalAdd = () => {
  openModalAdd.value = false;
};
const showModalAdd = () => {
  openModalAdd.value = true;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
const showModalEdit = (id) => {
  openModalEdit.value = true;
  shippingMethodId.value = id;
};
useSeoMeta({
  title: "ReadStation | Quản lý phương thức vận chuyển",
  ogTitle: "ReadStation | Quản lý phương thức vận chuyển",
  description: "Quản lý phương thức vận chuyển",
  ogDescription: "Quản lý phương thức vận chuyển",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
