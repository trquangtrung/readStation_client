<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả bài viết đã xóa</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <a-table
        :columns="columns"
        :loading="postStore.isLoading"
        :data-source="postStore?.postsAdmin.posts"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-if="column.key === 'name'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-if="column.key === 'category_id'">
            <span>
              {{ record.category.name }}
            </span>
          </template>
          <template v-if="column.key === 'user_id'">
            <span>
              {{ record.user.fullname }}
            </span>
          </template>
          <template v-if="column.key === 'view'">
            <span> {{ record.view }} lượt xem </span>
          </template>
          <template v-else-if="column.key === 'image'">
            <a-image
              class="rounded-md"
              :width="70"
              :height="70"
              :src="record.image"
            />
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.WATING_APPROVE"
              class="bg-tag-bg-01 text-tag-text-01"
            >
              Chờ duyệt
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.DRAFT"
              class="bg-tag-bg-08 text-tag-text-08"
            >
              Bản nháp
            </a-tag>
            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.PUBLISHED"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Đang hoạt động
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.HIDDEN"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đã ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.APPROVE_CANCELED"
              class="bg-tag-bg-11 text-tag-text-11"
            >
              Từ chối
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
        v-if="postStore?.postsAdmin?.totalResults > 10"
          v-model:current="current"
          :total="postStore?.postsAdmin?.totalResults"
          :pageSize="postStore?.postsAdmin?.pageSize"
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
import { PostStatus } from "~/types/admin/post";
const postStore = usePostStore();
const generalPostStore = useGeneralPostStore();
const current = ref(1);
useAsyncData(
  async () => {
    await postStore.getAllPost({
      page: current.value,
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
    const res = await generalPostStore.updatePost({
      id: id,
      post: { status: "published" },
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục bài viết thành công");
      await postStore.getAllPost({
        page: current.value,
        status: "deleted",
      });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục bài viết thất bại");
  }
};
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn khôi phục bài viết này?",
    content: "Bài viết sẽ được khôi phục và hiển thị trên tất cả bài viết",
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
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên bài viết",
    dataIndex: "title",
    key: "title",
    width: "300px",
  },
  {
    title: "Tiêu đề",
    dataIndex: "summary",
    key: "summary",
    width: "200px",
  },
  {
    title: "Người đăng",
    dataIndex: "user_id",
    key: "user_id",
    width: "200px",
  },

  {
    title: "Danh mục",
    dataIndex: "category_id",
    key: "category_id",
  },
  {
    title: "Lượt xem",
    dataIndex: "view",
    key: "view",
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
    title: "ReadStation | Thùng rác bài viết",
    ogTitle: "ReadStation | Thùng rác bài viết",
    description: "Thùng rác bài viết",
    ogDescription: "Thùng rác bài viết",
    ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
    twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
