<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả bình luận</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <!-- <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập"
                class="h-10 w-[400px]"
                v-model:value="valueSearch"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div> -->

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
                  @click="
                    statusValue({ value: 'published', label: 'Công khai' })
                  "
                  >Công khai</a-menu-item
                >
                <a-menu-item
                  @click="statusValue({ value: 'banned', label: 'Bị chặn' })"
                  >Bị chặn</a-menu-item
                >
                <a-menu-item
                  @click="statusValue({ value: 'hidden', label: 'Đang ẩn' })"
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
        <!-- <NuxtLink to="/admin/book-case/add-bookcase" class="">
          <a-button type="primary">Thêm bình luận</a-button>
        </NuxtLink> -->
      </div>

      <a-table
        :columns="columns"
        :data-source="commentStore?.commentAdmin?.comments"
        :loading="commentStore.isLoading"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'post_id'">
            <NuxtLink :to="`/post/${record.post.slug}`">
              {{ record.post?.title }}
            </NuxtLink>
          </template>
          <template v-if="column.key === 'user_id'">
            <span>
              {{ record.user?.fullname }}
            </span>
          </template>
          <template v-if="column.key === 'content'">
            <span>
              {{ record.content }}
            </span>
          </template>
          <template v-if="column.key === 'get_parent_comment'">
            <span>
              {{ record.get_parent_comment?.content }}
            </span>
          </template>
          <template v-if="column.key === 'created_at'">
            <span>
              {{ dayjs(record.created_at).format("DD/MM/YYYY HH:mm:ss") }}
            </span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === CommentStatus.PUBLISHED"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Công khai
            </a-tag>
            <a-tag
              :bordered="false"
              v-if="record.status === CommentStatus.BANNED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Bị chặn
            </a-tag>
            <a-tag
              :bordered="false"
              v-if="record.status === CommentStatus.HIDDEN"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip
                v-if="record.status === CommentStatus.PUBLISHED"
                placement="top"
                color="black"
              >
                <template #title>
                  <span>Ẩn</span>
                </template>
                <button
                  @click="showRecoverConfirm(record?.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="bitcoin-icons:hidden-filled"
                    class="group-hover:text-[#212122]"
                  />
                </button>
              </a-tooltip>
              <a-tooltip v-else placement="top" color="black">
                <template #title>
                  <span>Công khai</span>
                </template>
                <button
                  @click="showPublishedConfirm(record?.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md"
                >
                  <Icon icon="charm:tick" class="group-hover:text-[#212122]" />
                </button>
              </a-tooltip>
              <a-tooltip placement="top" color="black">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button
                  @click="showDeleteConfirm(record?.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="hugeicons:delete-01"
                    class="group-hover:text-[#212122]"
                  />
                </button>
              </a-tooltip>

              <a-dropdown :trigger="['click']" placement="bottom">
                <template #overlay>
                  <a-menu class="space-y-1">
                    <a-menu-item
                      v-if="record.status === CommentStatus.PUBLISHED"
                      key="1"
                      class="p-4 hover:!bg-tag-bg-07"
                    >
                      <button
                        @click="showRecoverConfirm(record?.id)"
                        class="flex items-center gap-2"
                      >
                        <Icon
                          icon="bitcoin-icons:hidden-filled"
                          class="text-lg text-tag-text-07"
                        />
                        <span class="text-tag-text-07 font-bold">Ẩn</span>
                      </button>
                    </a-menu-item>
                    <a-menu-item v-else key="2" class="p-4 hover:!bg-tag-bg-09">
                      <button
                        @click="showPublishedConfirm(record?.id)"
                        class="flex items-center gap-2"
                      >
                        <Icon
                          icon="charm:tick"
                          class="text-lg text-tag-text-09"
                        />
                        <span class="text-tag-text-09 font-bold"
                          >Hoạt động</span
                        >
                      </button>
                    </a-menu-item>

                    <a-menu-item key="3" class="p-4 hover:!bg-tag-bg-06">
                      <span>
                        <button
                          @click="showDeleteConfirm(record?.id)"
                          class="flex items-center gap-2"
                        >
                          <Icon
                            icon="hugeicons:delete-01"
                            class="text-lg font-bold text-tag-text-06"
                          />
                          <span class="text-tag-text-06 font-bold">Xóa</span>
                        </button>
                      </span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination
        v-if="commentStore?.commentAdmin?.totalResults > 10"
          v-model:current="current"
          :total="commentStore?.commentAdmin?.totalResults"
          :pageSize="commentStore?.commentAdmin?.pageSize"
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
import { CommentStatus } from "~/types/admin/comment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const open = ref(false);
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
const commentStore = useCommentStore();
const commentGeneralStore = useGeneralCommentStore();
useAsyncData(
  async () => {
    await commentStore.getAllComment({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
    });
  },
  {
    immediate: true,
    watch: [current, valueSearch, queryStatus.value],
  }
);
const showDeleteConfirm = (comment_id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa bình luận này?",
    content: "Hành động này không thể hoàn tác",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onDelete(comment_id);
    },
    onCancel() {
    },
  });
};
const showPublishedConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn khôi phục bình luận này?",
    content: "Hành động này không thể hoàn tác",
    okText: "Khôi phục",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onPublishedDelete(id);
    },
    onCancel() {
    },
  });
};
const onPublishedDelete = async (id) => {
  try {
    const res = await commentGeneralStore.updateComment({
      comment_id: id,
      status: "published",
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục bình luận thành công");
      await commentStore.getAllComment({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục bình luận thất bại");
  }
};
const onDelete = async (id) => {
  try {
    const res = await commentGeneralStore.deleteComment(id);
    if (res.data._rawValue?.status == true) {
      message.success("Xóa bình luận thành công");
      await commentStore.getAllComment({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa bình luận thất bại");
  }
};

const onRecover = async (comment_id) => {
  try {
    const res = await commentGeneralStore.updateComment({
      comment_id: comment_id,
      status: "hidden",
    });
    if (res.data._rawValue?.status == true) {
      message.success("Ẩn bình luận thành công");
      await commentStore.getAllComment({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Ẩn bình luận thất bại");
  }
};
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn ẩn bình luận này?",
    content: "Hành động này không thể hoàn tác",
    okText: "Ẩn",
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
    title: "Tên bài viết",
    dataIndex: "post_id",
    key: "post_id",
    width: "300px",
  },
  {
    title: "Tên người viết",
    dataIndex: "user_id",
    key: "user_id",
  },

  {
    title: "Nội dung ",
    dataIndex: "get_parent_comment",
    key: "get_parent_comment",
  },
  {
    title: "Nội dung bình luận",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Thời gian bình luận",
    dataIndex: "created_at",
    key: "created_at",
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
  title: "ReadStation | Quản lý bình luận",
  ogTitle: "ReadStation | Quản lý bình luận",
  description: "Quản lý bình luận",
  ogDescription: "Quản lý bình luận",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
