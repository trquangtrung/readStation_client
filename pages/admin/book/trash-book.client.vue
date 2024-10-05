<template>

  <Head>
    <Title>ReadStation | Thùng rác sách</Title>
    <Meta name="description" content="Thùng rác sách" />
    <Meta property="og:title" content="ReadStation | Thùng rác sách" />
    <Meta property="og:description" content="Thùng rác sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả sách đã xóa</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <a-table :columns="columns" :data-source="allAdminBooks?.adminBooks?.books" :loading="allAdminBooks.isLoading"
        :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'author'">
            <span> Tác giả</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-if="column.key === 'author'">
            <div class="flex justify-start gap-4 items-center">
              <a-avatar :src="record?.author?.avatar" :size="40" />
              <span>
                {{ record.author?.author }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'category'">
            <span>
              {{ record.category?.name }}
            </span>
          </template>
          <template v-if="column.key === 'shelve'">
            <span>
              {{ record.shelve?.description }}
            </span>
          </template>

          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record.is_featured" />
            <IconMul v-else />
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
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="allAdminBooks?.adminBooks?.totalResults"
          :pageSize="allAdminBooks?.adminBooks?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const valueSearch = ref("");
const allAdminBooks = useBookStore();
const current = ref(1);
const getAllAdminBooks = async () => {
  try {
    const data: any = await allAdminBooks.getAdminBooks({
      page: current.value,
      search: valueSearch.value,
      status: "deleted",
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
useAsyncData(
  async () => {
    await getAllAdminBooks();
  },
  {
    immediate: true,
    watch: [current, valueSearch],
  }
);
const showRecoverConfirm = (id: string) => {
  Modal.confirm({
    title: "Bạn có muốn khôi phục sách này ?",
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
const onRecover = async (id: string) => {
  await allAdminBooks.updateBook({
    id: id,
    value: {
      status: "active",
    },
  });
  await allAdminBooks.getAdminBooks({
    page: current.value,
    search: valueSearch.value,
    status: "deleted",
  });
};
const columns = [
  {
    title: "Tên sách",
    dataIndex: "title",
    key: "title",
  },
  {
    name: "Tác giả",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Kệ sách",
    dataIndex: "shelve",
    key: "shelve",
  },
  {
    title: "Nổi bật",
    dataIndex: "is_featured",
    key: "is_featured",
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
