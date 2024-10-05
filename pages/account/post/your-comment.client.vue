<template>
  <div>

    <Head>
      <Title>ReadStation | Quản lý bài viết đã bình luận</Title>
      <Meta name="description" content="Quản lý bài viết đã bình luận" />
      <Meta property="og:title" content="ReadStation | Quản lý bài viết đã bình luận" />
      <Meta property="og:description" content="Quản lý bài viết đã bình luận" />
    </Head>
    <h3 class="font-bold">Bài viết đã bình luận</h3>

    <div class="p-5 bg-white mt-5 shadow-lg rounded-xl">
      <a-table :loading="commentStore?.isLoading" :columns="columns" :data-source="commentStore?.comments?.comments"
        :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Bài viết </span>
          </template>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <a>
              {{ record.post?.title }}
            </a>
          </template>
          <!--  -->
          <template v-if="column.key === 'created_at'">
            <a>
              {{ $dayjs(record.post?.created_at).format("DD/MM/YYYY - HH:MM") }}
            </a>
          </template>
          <!--  -->
          <template v-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink :to="`/post/${record?.post?.slug}`">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <div class="flex items-center">
                      <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
                    </div>
                  </button>
                </a-tooltip>
              </NuxtLink>
              <a-tooltip placement="top">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button @click="showDeleteConfirm(record.id)"
                  class="hover:bg-[#131313]/20 bg-[#e4e1e1] p-2 rounded-lg flex items-center justify-center">
                  <UIcon class="group-hover:text-black" name="i-material-symbols-close-rounded" />
                </button>
              </a-tooltip>
            </div>
          </template>
          <!--  -->
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="commentStore?.comments?.totalResults"
          :pageSize="commentStore?.comments?.pageSize" show-less-items />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
const commentStore = useCommentClientStore();
const generalCommentStore = useGeneralCommentStore();
const current = ref(1);
// Delete
const onDelete = async (id: any) => {
  await generalCommentStore.deleteComment(id);
  getData();
};
const showDeleteConfirm = (id: any) => {
  Modal.confirm({
    title: "Bạn đang muốn xóa bình luận?",
    content: "Sau khi xóa sẽ không khôi phục lại",
    okText: "Đồng ý",
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
// Get Data
const getData = async (id: any) => {
  await commentStore.getAllComment({
    page: current.value,
  });
};
useAsyncData(
  async () => {
    await getData();
  },
  {
    immediate: true,
    watch: [current],
  }
);

const columns = [
  {
    title: "Bài viết",
    dataIndex: "title",
    key: "title",
    width: "400px",
  },
  {
    title: "Nội dung bình luận",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Thời gian bình luận",
    key: "created_at",
    dataIndex: "created_at",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
