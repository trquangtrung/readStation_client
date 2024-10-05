<template>
  <div class="space-y-5">
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          <h5 class="text-xl text-[#1e293b] font-bold">
            Chi tiết tủ sách {{ bookCaseStore.bookCase?.name }}
          </h5>
        </h5>
      </div>
    </div>
    <div class="bg-[white] h-24 rounded-lg">
      <div class="p-5 flex justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-xl font-bold">
            {{ bookCaseStore.bookCase?.name }}
          </h1>
          <p class="text-orange-400">
            {{ bookCaseStore.bookCase?.name }} -
            {{ bookCaseStore.bookCase?.shelves.length }} kệ sách -
            {{ bookCaseStore.bookCase?.books.length }} cuốn sách
          </p>
        </div>
        <div>
          <a-button @click="showModalEdit" size="large" type="primary"
            >Chỉnh sửa</a-button
          >
        </div>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="relative w-1/4 md:block hidden">
          <div class="flex">
            <a-input
              placeholder="Nhập tên kệ để tìm kiếm"
              class="h-10"
              v-model:value="valueSearch"
            >
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
          </div>
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <UIcon class="text-gray-500" name="i-material-symbols-search" />
          </div>
        </div>
        <div class="">
          <a-button size="large" type="primary" @click="showModalAdd"
            >Thêm Kệ</a-button
          >
          <BookCaseSearch
            :openModalAdd="openModalAdd"
            :openModal="CloseModalAdd"
          />
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="bookCaseStore?.shelveOfBookcase?.shelves"
        :loading="bookCaseStore.isLoading"
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'bookshelf_code'">
            <span> Mã kệ sách </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <NuxtLink :to="`/admin/book-shelves/${record.id}`">
              {{ record.name }}
            </NuxtLink>
          </template>
          <template v-if="column.key === 'bookshelf_code'">
            <NuxtLink :to="`/admin/book-shelves/${record.id}`">
              {{ record.bookshelf_code }}
            </NuxtLink>
          </template>
          <template v-if="column.key === 'books'">
            <span class="flex justify-start gap-2">
              {{ record.books.length }}
              <p>cuốn sách</p>
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === 'active'"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Đang hoạt động
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === 'inactive'"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === 'deleted'"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button
                  @click.prevent="showConfirm(record.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center cursor-pointer justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="hugeicons:delete-01"
                    class="group-hover:text-[#212122]"
                  />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination
          v-if="bookCaseStore?.shelveOfBookcase?.totalResults > 10"
          v-model:current="current"
          :total="bookCaseStore?.shelveOfBookcase?.totalResults"
          :pageSize="bookCaseStore?.shelveOfBookcase?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
      <BookCaseEdit
        :openModalEdit="openModalEdit"
        :openModal="CloseModalEdit"
        :bookCaseId="detailBookCaseId"
      />
    </div>
  </div>
</template>
<script setup>
import { Modal } from "ant-design-vue";
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const route = useRoute();
const open = ref(false);
const openModalEdit = ref(false);
const openModalAdd = ref(false);
const detailBookCaseId = route.params.id;
const bookCaseStore = useBookcaseStore();
const bookShelves = useShelvesStore();
const valueSearch = ref("");
const current = ref(1);
useAsyncData(async () => {
  if (detailBookCaseId) {
    await bookCaseStore.getOneBookcase(detailBookCaseId);
  }
});
const onSearch = debounce(() => {
  current.value = 1;
  bookCaseStore.getShelveOfBookcase({
    id: detailBookCaseId,
    page: current.value,
    search: valueSearch.value,
  });
}, 500);

watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await bookCaseStore.getShelveOfBookcase({
      id: detailBookCaseId,
      page: current.value,
      search: valueSearch.value,
    });
  },
  {
    immediate: true,
    watch: [current],
  }
);

const updateDetailCase = async (id) => {
  const idCase = {
    bookcase_id: null,
  };
  try {
    const res = await bookShelves.updateShelves({
      id: id,
      valueUpdateShelves: idCase,
    });
    if (res.data._rawValue?.status == true) {
      message.success("Xóa kệ sách thành công");
      await bookCaseStore.getOneBookcase(detailBookCaseId);
      await bookCaseStore.getShelveOfBookcase({
        id: detailBookCaseId,
        page: current.value,
        search: valueSearch.value,
      });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa kệ sách thất bại");
  }
};
const showConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc xóa kệ sách này ra khỏi kệ không?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      updateDetailCase(id);
    },
    onCancel() {},
  });
};
const showModalAdd = () => {
  openModalAdd.value = true;
};
const CloseModalAdd = () => {
  openModalAdd.value = false;
};
const showModalEdit = () => {
  openModalEdit.value = true;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
const columns = [
  {
    name: "Mã kệ",
    dataIndex: "bookshelf_code",
    key: "bookshelf_code",
  },
  {
    title: "Tên kệ sách",
    dataIndex: "name",
    key: "name",
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
useSeoMeta({
  title: "ReadStation | Chi tiết tủ sách",
  ogTitle: "ReadStation | Chi tiết tủ sách",
  description: "Chi tiết tủ sách",
  ogDescription: "Chi tiết tủ sách",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
