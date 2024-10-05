<template>

  <Head>
    <Title>ReadStation | Thùng rác kệ sách</Title>
    <Meta name="description" content="Thùng rác kệ sách" />
    <Meta property="og:title" content="ReadStation | Thùng rác kệ sách" />
    <Meta property="og:description" content="Thùng rác kệ sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Tất cả kệ sách đã xóa
        </h5>
      </div>
    </div>
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <a-table :columns="columns" :data-source="bookShelves?.adminBookSheleves?.shelves"
        :loading="bookShelves.isLoading">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'bookshelf_code'">
            <a>
              {{ record.bookshelf_code }}
            </a>
          </template>
          <template v-if="column.key === 'bookcase_id'">
            <a>
              {{ record.bookcase.description }}
            </a>
          </template>
          <template v-if="column.key === 'category_id'">
            <span>
              {{ record.category.name }}
            </span>
          </template>
          <template v-if="column.key === 'books'">
            <span class="flex justify-start gap-2">
              {{ record.books.length }}
              <p>cuốn sách</p>
            </span>
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
        <a-pagination v-model:current="current" :total="bookShelves.getAllShelves?.totalResults"
          :pageSize="bookShelves.getAllShelves?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const bookShelves = useShelvesStore();
const current = ref(1);
useAsyncData(async () => {
  try {
    await bookShelves.getAllShelves({
      page: current.value,
      status: "deleted",
    });
  } catch (error) {
    console.error(error);
  }
}, {
  immediate: true,
  watch: [current],
});
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có muốn khôi phục kệ sách này ?",
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
const onRecover = async (id) => {
  const res = await bookShelves.updateShelves({
    id: id,
    valueUpdateShelves: {
      status: "active",
    },
  });
  if (res.data._rawValue?.status == true) {
    message.success("Khôi phục kệ sách thành công");
    await bookShelves.getAllShelves({
      status: "deleted",
    });
  } else {
    errors.value = res.error.value.data.errors;
    message.error(res.error.value.data.message);
  }
};

const columns = [
  {
    title: "Mã kệ",
    dataIndex: "bookshelf_code",
    key: "bookshelf_code",
  },
  {
    title: "Tên kệ",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Thuộc tủ",
    dataIndex: "bookcase",
    key: "bookcase_id",
  },
  {
    title: "Số lượng sách",
    dataIndex: "books",
    key: "books",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
