<template>

  <Head>
    <Title>ReadStation | Quản lý kệ sách</Title>
    <Meta name="description" content="Quản lý kệ sách" />
    <Meta property="og:title" content="ReadStation | Quản lý kệ sách" />
    <Meta property="og:description" content="Quản lý kệ sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Tất cả kệ sách</h5>
      </div>
    </div>
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-2/3 flex items-center gap-2">
          <div class="relative w-1/2 md:block hidden">
            <div class="flex">
              <a-input placeholder="Nhập mã kệ để tìm kiếm" class="h-10" v-model:value="valueSearch">
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UIcon class="text-gray-500" name="i-material-symbols-search" />
            </div>
          </div>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item @click="statusValue({ value: '', label: 'Trạng thái' })">Tất cả trạng thái</a-menu-item>
                <a-menu-item @click="statusValue({ value: 'active', label: 'Hoạt động' })">Hoạt động</a-menu-item>
                <a-menu-item @click="
                  statusValue({ value: 'inactive', label: 'Không hoạt động' })
                  ">Không hoạt động</a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>

          <a-dropdown :trigger="['click']">
            <template #overlay>
              <div class="h-[300px] overflow-auto w-[190px]">
                <a-menu>
                  <a-menu-item>
                    <div @click="
                      categoryValue({ id: null, label: 'Tất cả danh mục' })
                      ">
                      Tất cả danh mục
                    </div>
                  </a-menu-item>
                  <a-menu-item v-for="(items, index) in categoryStore?.categoriesAdmin
                    ?.categories" :key="index">
                    <div @click="
                      categoryValue({ id: items?.id, label: items?.name })
                      ">
                      {{ items.name }}
                    </div>
                  </a-menu-item>
                </a-menu>
              </div>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{
                categoryQuery.label ? categoryQuery.label : "Tất cả danh mục"
              }}
              <DownOutlined />
            </a-button>
          </a-dropdown>

          <a-dropdown :trigger="['click']">
            <template #overlay>
              <div class="h-[300px] overflow-auto w-[190px]">
                <a-menu>
                  <a-menu-item>
                    <div @click="
                      bookcaseValue({ id: null, label: 'Tất cả tủ sách' })
                      ">
                      Tất cả tủ sách
                    </div>
                  </a-menu-item>
                  <a-menu-item v-for="(items, index) in bookcaseStore?.bookCaseAdmin
                    ?.bookcases" :key="index">
                    <div @click="
                      bookcaseValue({ id: items?.id, label: items?.name })
                      ">
                      {{ items.name }}
                    </div>
                  </a-menu-item>
                </a-menu>
              </div>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ bookcaseQuery.label ? bookcaseQuery.label : "Tất cả tủ sách" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
        <div class="">
          <a-button type="primary" size="large" @click="showModalAdd">Thêm kệ sách</a-button>
          <BookShelvesCreate :openModalAdd="openModalAdd" :openModal="CloseModalAdd" />
          <BookShelvesEdit :openModalEdit="openModalEdit" :openModal="CloseModalEdit" :shelvesId="shelvesId" />
        </div>
      </div>

      <a-table :columns="columns" :data-source="shelvesValue?.adminBookSheleves?.shelves"
        :loading="shelvesValue.isLoading" :pagination="false">
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'bookshelf_code'">
            <a>
              {{ record.bookshelf_code }}
            </a>
          </template>
          <template v-if="column.key === 'bookcase'">
            <a @click="() => navigateTo(`/admin/book-case/${record.bookcase.id}`)"> {{ record?.bookcase ?
              record?.bookcase.name : "Chưa được thêm vào tủ" }}</A>
          </template>
          <template v-if="column.key === 'books'">
            <span class="flex justify-start gap-2">
              {{ record.books.length }}
              <p>cuốn sách</p>
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <span>
              <a-tag :color="record.status === 'active' ? 'green' : 'volcano'" style="border: none">
                {{
                  record.status === "active"
                    ? "Đang hoạt động"
                    : "Không hoạt động"
                }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink :to="`book-shelves/${record.id}`">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <div>
                      <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
                    </div>
                  </button>
                </a-tooltip>
              </NuxtLink>
              <a-dropdown :trigger="['click']" placement="bottom">
                <button
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                  <UIcon class="group-hover:text-[#131313]" name="i-solar-menu-dots-bold" />
                </button>
                <template #overlay>
                  <a-menu class="space-y-1">
                    <NuxtLink>
                      <a-menu-item key="1" class="p-4 hover:!bg-tag-bg-02">
                        <button class="flex items-center gap-2" @click="showModalEdit(record?.id)">
                          <Icon icon="fluent:edit-48-regular" class="text-lg text-tag-text-02" />
                          <span class="text-tag-text-02 font-bold">Sửa</span>
                        </button>
                      </a-menu-item>
                    </NuxtLink>

                    <a-menu-item key="2" class="p-4">
                      <button @click="showDeleteConfirm(record?.id)" class="flex items-center gap-2">
                        <Icon icon="hugeicons:delete-01" class="text-lg text-tag-text-06" />
                        <span class="text-tag-text-06 font-bold">Xóa</span>
                      </button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="shelvesValue?.adminBookSheleves?.totalResults"
          :pageSize="shelvesValue?.adminBookSheleves?.pageSize" show-less-items />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { Modal } from "ant-design-vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import debounce from "lodash.debounce";
const openModalEdit = ref<boolean>(false);
const openModalAdd = ref<boolean>(false);
const shelvesId = ref<number>();
const errors = ref({});
const current = ref(1);
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const statusValue = ({ value, label }: any) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "16px",
  },
  spin: true,
});
const categoryStore = useCategoryStore();
const categoryQuery = ref({
  id: "",
  label: "",
});
useAsyncData(async () => {
  try {
    await categoryStore.getAllCategory({
      type: "book",
      pageSize: 1000,
    });
  } catch (error) {
    console.error(error);
  }
});
const categoryValue = ({ id, label }: any) => {
  categoryQuery.value.id = id;
  categoryQuery.value.label = label;
};
const bookcaseStore = useBookcaseStore();
const bookcaseQuery = ref({
  id: "",
  label: "",
});
useAsyncData(async () => {
  try {
    await bookcaseStore.getAllBookcases({
      pageSize: 1000,
    });
  } catch (error) {
    console.error(error);
  }
});
const bookcaseValue = ({ id, label }: any) => {
  bookcaseQuery.value.id = id;
  bookcaseQuery.value.label = label;
};
const shelvesValue = useShelvesStore();
const onSearch = debounce(() => {
  current.value = 1;
  getData();
}, 500);

watch(valueSearch, onSearch);
const getData = async () => {
  try {
    const data = await shelvesValue.getAllShelves({
      page: current.value,
      search: valueSearch.value,
      category_id: categoryQuery.value.id,
      bookcase_id: bookcaseQuery.value.id,
      status: queryStatus.value.value,
    });
    return data;
  } catch (error) {
    console.error(error);
  }
};
useAsyncData(
  async () => {
    await getData();
  },
  {
    immediate: true,
    watch: [
      current,
      categoryQuery.value,
      bookcaseQuery.value,
      queryStatus.value,
    ],
  }
);
const onDelete = async (id: string) => {
  try {
    const res = await shelvesValue.deleteShelves(id);
    if (res.data._rawValue?.status == true) {
      message.success(res.data._rawValue?.message);
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    console.error(error);
  }
  await getData();
};
const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: "Bạn có chắc xóa kệ này không?",
    okText: "Có",
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

const CloseModalAdd = () => {
  openModalAdd.value = false;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
const showModalAdd = () => {
  openModalAdd.value = true;
};
const showModalEdit = (id: number) => {
  openModalEdit.value = true;
  shelvesId.value = id;
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
    key: "bookcase",
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
