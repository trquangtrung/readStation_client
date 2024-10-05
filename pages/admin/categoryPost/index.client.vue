<template>
  <div>
    <div class="flex gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Danh mục bài viết</h5>
      </div>
    </div>

    <div class="bg-white min-h-[260px] w-full rounded-lg p-5">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập tên danh mục để tìm kiếm"
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
          <a-button
            class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary"
            @click="showModalAdd"
            size="large"
            >Thêm danh mục bài viết</a-button
          >

          <CategoryPostAdd
            :openModalAdd="openModalAdd"
            :openModal="CloseModalAdd"
          />
          <CategoryPostEdit
            :openModalEdit="openModalEdit"
            :openModal="CloseModalEdit"
            :categoryId="categoryId"
          />
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="categoryStore.categoriesAdmin?.categories"
        :loading="categoryStore.isLoading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'category'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'image'">
            <a-image
              v-if="record.image"
              class="rounded-md"
              :width="100"
              :height="100"
              :src="record.image"
            />
            <span v-else></span>
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === CategoryStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Công khai
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === CategoryStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === CategoryStatus.DELETED"
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
        v-if="categoryStore.categoriesAdmin?.totalResults > 10"
          v-model:current="current"
          :total="categoryStore.categoriesAdmin?.totalResults"
          :pageSize="categoryStore.categoriesAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import { Modal } from "ant-design-vue";
import { CategoryStatus } from "~/types/admin/category";
import debounce from "lodash.debounce";
const openModalEdit = ref(false);
const openModalAdd = ref(false);
const categoryId = ref();
const categoryStore = useCategoryStore();
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
  categoryStore.getAllCategory({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
    type: "post",
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await categoryStore.getAllCategory({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
      type: "post",
    });
  },
  {
    immediate: true,
    watch: [current, queryStatus.value],
  }
);

const onDelete = async (id) => {
  try {
    const res = await categoryStore.deleteCategory(id);
    if (res.data._rawValue?.status == true) {
      message.success(res.data._rawValue?.message);
      await categoryStore.getAllCategory({
        type: "post",
      });
    } else {
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục danh mục thất bại");
  }
};

const showDeleteConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa danh mục này?",

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
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên danh mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Nội dung",
    dataIndex: "description",
    key: "description",
    width: "400px",
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
  categoryId.value = id;
};
useSeoMeta({
  title: "ReadStation | Danh mục bài viết",
  ogTitle: "ReadStation | Danh mục bài viết",
  description: "Danh mục bài viết",
  ogDescription: "Danh mục bài viết",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
