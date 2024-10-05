<template>
  <div>
    <div class="flex gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Danh mục sản phẩm đã xóa
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[260px] w-full rounded-lg p-5">
      <a-table
        :columns="columns"
        :data-source="categoryStore.categoriesAdmin?.categories"
        :loading="categoryStore.isLoading"
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Name </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'image'">
            <a-image class="rounded-md" :width="100" :src="record.image" />
          </template>
          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record.is_featured" />
            <IconMul v-else />
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
              <a-tooltip placement="top" color="black ">
                <template #title>
                  <span>Khôi phục</span>
                </template>
                <button
                  @click="showRecoverConfirm(record.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="ic:round-settings-backup-restore"
                    class="text-lg"
                  />
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
const categoryStore = useCategoryStore();
const current = ref(1);
useAsyncData(
  async () => {
    await categoryStore.getAllCategory({
      page: current.value,
      type: "book",
      status: "deleted",
    });
  },
  {
    immediate: true,
    watch: [current],
  }
);

const onRecover = async (id) => {
  try {
    const res = await categoryStore.updateCategory({
      id: id,
      category: {
        status: "active",
      },
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục danh mục thành công");
      await categoryStore.getAllCategory({
        page: current.value,
        type: "book",
        status: "deleted",
      });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục danh mục thất bại");
  }
};

const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn khôi phục?",
    content:
      "Danh mục sẽ được khôi phục và hiển thị trên tất cả danh mục sản phẩm",
    okText: "Khôi phục",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onRecover(id);
    },
    onCancel() {
    },
  });
};

const columns = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Nội dung",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Nổi bật",
    dataIndex: "is_featured",
    key: "is_featured",
  },
  {
    title: "Slug",
    dataIndex: "slug",
    key: "slug",
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
useSeoMeta({
  title: "ReadStation | Thùng rác danh mục sản phẩm",
  ogTitle: "ReadStation | Thùng rác danh mục sản phẩm",
  description: "Thùng rác danh mục sản phẩm",
  ogDescription: "Thùng rác danh mục sản phẩm",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
