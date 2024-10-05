<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Tất cả tủ sách</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập mã tủ sách để tìm kiếm"
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
                  @click="
                    statusValue({ value: 'active', label: ' Đang hoạt động' })
                  "
                >
                  Đang hoạt động</a-menu-item
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
          <a-button size="large" type="primary" @click="showModalAdd"
            >Thêm tủ sách</a-button
          >
          <BookCaseCreate
            :openModalAdd="openModalAdd"
            :openModal="CloseModalAdd"
          />
          <BookCaseEdit
            :openModalEdit="openModalEdit"
            :openModal="CloseModalEdit"
            :bookCaseId="bookCaseId"
          />
        </div>
      </div>

      <a-table
        :columns="columns"
        :data-source="bookCaseStore?.bookCaseAdmin?.bookcases"
        :loading="bookCaseStore.isLoading"
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'bookcase_code'">
            <NuxtLink> Mã tủ sách </NuxtLink>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <span>
              {{ record.name }}
            </span>
          </template>
          <template v-if="column.key === 'shelves'">
            <span class="flex justify-start gap-2">
              {{ record.shelves.length }}
              <p>kệ</p>
            </span>
          </template>
          <template v-if="column.key === 'books'">
            <span class="flex justify-start gap-2">
              {{ record.books.length }}
              <p>cuốn sách</p>
            </span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === BookCaseStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Đang hoạt động
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === BookCaseStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === BookCaseStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink class="hover:text-black" :to="`book-case/${record.id}`">
                <a-tooltip placement="top" color="black">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center cursor-pointer justify-center w-8 h-8 rounded-md"
                  >
                    <Icon
                      icon="heroicons:eye"
                      class="group-hover:text-[#212122]"
                    />
                  </button>
                </a-tooltip>
              </NuxtLink>
              <a-dropdown :trigger="['click']" placement="bottom">
                <button
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <UIcon
                    class="group-hover:text-[#131313]"
                    name="i-solar-menu-dots-bold"
                  />
                </button>
                <template #overlay>
                  <a-menu class="space-y-1">
                    <a-menu-item key="2" class="p-4 hover:!bg-tag-bg-02">
                      <button
                        class="flex items-center gap-2"
                        @click="showModalEdit(record?.id)"
                      >
                        <Icon
                          icon="fluent:edit-48-regular"
                          class="text-lg text-tag-text-02"
                        />
                        <span class="text-tag-text-02 font-bold">Sửa</span>
                      </button>
                    </a-menu-item>

                    <a-menu-item key="3" class="p-4 hover:!bg-tag-bg-06">
                      <span>
                        <button
                          class="flex items-center gap-2"
                          @click="showDeleteConfirm(record?.id)"
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
          v-if="bookCaseStore?.bookCaseAdmin?.totalResults > 10"
          v-model:current="current"
          :total="bookCaseStore?.bookCaseAdmin?.totalResults"
          :pageSize="bookCaseStore?.bookCaseAdmin?.pageSize"
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
import { BookCaseStatus } from "~/types/admin/bookCase";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import debounce from "lodash.debounce";
const openModalEdit = ref(false);
const openModalAdd = ref(false);
const bookCaseStore = useBookcaseStore();
const bookCaseId = ref();
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
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "16px",
  },
  spin: true,
});

const onSearch = debounce(() => {
  current.value = 1;
  bookCaseStore.getAllBookcases({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
  });
}, 500);

watch(valueSearch, onSearch);
useAsyncData(
  async () => {
    await bookCaseStore.getAllBookcases({
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
    const res = await bookCaseStore.deleteBookcase(id);
    if (res.data._rawValue?.status == true) {
      message.success(res.data._rawValue?.message);
      await bookCaseStore.getAllBookcases({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa tủ sách thất bại");
  }
};

const showDeleteConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn xóa tủ sách này?",
    okText: "Xóa",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onDelete(id);
    },
    onCancel() {},
  });
};
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
  bookCaseId.value = id;
};
const columns = [
  {
    name: "Mã tủ",
    dataIndex: "bookcase_code",
    key: "bookcase_code",
  },
  {
    title: "Tên tủ sách",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Số lượng kệ",
    dataIndex: "shelves",
    key: "shelves",
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
  title: "ReadStation | Quản lý tủ sách",
  ogTitle: "ReadStation | Quản lý tủ sách",
  description: "Quản lý tủ sách",
  ogDescription: "Quản lý tủ sách",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
