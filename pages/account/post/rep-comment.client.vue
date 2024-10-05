<template>
  <div>

    <Head>
      <Title>ReadStation | Quản lý bình luận bài viết của bạn</Title>
      <Meta name="description" content="Quản lý bình luận bài viết của bạn" />
      <Meta property="og:title" content="ReadStation | Quản lý bình luận bài viết của bạn" />
      <Meta property="og:description" content="Quản lý bình luận bài viết của bạn" />
    </Head>
    <h3 class="font-bold">Bình luận bài viết của bạn</h3>

    <div class="p-5 bg-white mt-5 shadow-lg rounded-xl">
      <a-table :loading="commentStore?.isLoading" :columns="columns" :data-source="commentStore?.repcomment?.comments"
        :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <span>
              {{ record?.post?.title }}
            </span>
          </template>
          <!--  -->
          <template v-else-if="column.key === 'fullname'">
            <span>
              {{ record?.user?.fullname }}
            </span>
          </template>
          <!--  -->
          <template v-else-if="column.key === 'updated_at'">
            <span>
              {{ $dayjs(record?.updated_at).format("DD/MM/YYYY - HH:MM") }}
            </span>
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
        <a-pagination v-model:current="current" :total="commentStore?.repcomment?.totalResults"
          :pageSize="commentStore?.repcomment?.pageSize" />
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
  getDataRepComment();
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

// Get All
const getDataRepComment = async () => {
  await commentStore.getAllRepComment({
    page: current.value,
  });
};
useAsyncData(
  async () => {
    await getDataRepComment();
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
  },
  {
    title: "Nội dung bình luận",
    dataIndex: "content",
    key: "age",
  },
  {
    title: "Người bình luận",
    dataIndex: "fullname",
    key: "fullname",
  },
  {
    title: "Thời gian bình luận",
    key: "updated_at",
    dataIndex: "updated_at",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
