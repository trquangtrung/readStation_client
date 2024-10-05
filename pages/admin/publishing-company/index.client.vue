<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Tất cả nhà xuất bản
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập tên nhà xuất bản để tìm kiếm"
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
                  @click="statusValue({ value: 'active', label: 'Hoạt động' })"
                  >Hoạt động</a-menu-item
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
          <a-button
            class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary"
            @click="showModalAdd"
            size="large"
            >Thêm nhà xuất bản</a-button
          >
        </div>
      </div>
      <PublishingCompanyAdd
        :openModalAdd="openModalAdd"
        :openModal="CloseModalAdd"
      />
      <PublishingCompanyEdit
        :openModalEdit="openModalEdit"
        :openModal="CloseModalEdit"
        :publishingCompanyId="publishingCompanyId"
      />
      <a-table
        :columns="columns"
        :loading="publishingCompanyStore.isLoading"
        :data-source="
          publishingCompanyStore?.publishingCompaniesAdmin?.publishing_companies
        "
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Tên nhà xuất bản </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <p>
              {{ record.name }}
            </p>
          </template>
          <template v-else-if="column.key === 'logo_company'">
            <a-image
              v-if="record.logo_company"
              class="rounded-md"
              :width="100"
              :src="record.logo_company"
            />
            <span v-else> </span>
          </template>
          <template v-else-if="column.key === 'description'">
            <p class="p-0">
              {{ record.description }}
            </p>
          </template>
          <template v-else-if="column.key === 'total_books'">
            <p class="p-0">
              {{ record.total_books }}
            </p>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Công khai
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>
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
        v-if="publishingCompanyStore?.publishingCompaniesAdmin?.totalResults > 10"
          v-model:current="current"
          :total="
            publishingCompanyStore?.publishingCompaniesAdmin?.totalResults
          "
          :pageSize="publishingCompanyStore?.publishingCompaniesAdmin?.pageSize"
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
import { PublishingCompanyStatus } from "~/types/admin/publishingCompany";
import debounce from "lodash.debounce";
const openModalEdit = ref(false);
const openModalAdd = ref(false);
const publishingCompanyId = ref(0);
const valueSearch = ref("");
const publishingCompanyStore = usePublishingCompanyStore();
const queryStatus = ref({
  value: "",
  label: "",
});

const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};

const current = ref(1);

const onSearch = debounce(() => {
  current.value = 1;
  publishingCompanyStore.getAllPublishingCompany({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await publishingCompanyStore.getAllPublishingCompany({
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
    const res = await publishingCompanyStore.deletePublishingCompany(id);
    if (res.data._rawValue?.status == true) {
      message.success(res.data._rawValue?.message);
      await publishingCompanyStore.getAllPublishingCompany({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa nhà xuất bản thất bại");
  }
};

const showDeleteConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa nhà xuất bản này không?",

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
    title: "Hình ảnh",
    dataIndex: "logo_company",
    key: "logo_company",
    width: "100px",
  },
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
    width: "150px",
  },
  {
    title: "Số lượng sách",
    dataIndex: "total_books",
    key: "total_books",
    width: "150px",
  },
  {
    title: "Thông tin",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];

const CloseModalAdd = () => {
  openModalAdd.value = false;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
const showModalAdd = () => {
  openModalAdd.value = true;
};
const showModalEdit = (id) => {
  openModalEdit.value = true;
  publishingCompanyId.value = id;
};
useSeoMeta({
  title: "ReadStation | Quản lý nhà xuất bản",
  ogTitle: "ReadStation | Quản lý nhà xuất bản",
  description: "Quản lý nhà xuất bản",
  ogDescription: "Quản lý nhà xuất bản",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
