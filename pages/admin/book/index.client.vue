<template>

  <Head>
    <Title>ReadStation | Quản lý sách</Title>
    <Meta name="description" content="Quản lý sách" />
    <Meta property="og:title" content="ReadStation | Quản lý sách" />
    <Meta property="og:description" content="Quản lý sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tất cả sách</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-2/3 flex items-center gap-2">
          <div class="relative w-1/2 md:block hidden">
            <div class="flex">
              <a-input placeholder="Nhập tên sách để tìm kiếm" class="h-10" v-model:value="valueSearch">
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
              <div class="h-[300px] overflow-auto w-[170px]">
                <a-menu>
                  <a-menu-item>
                    <div @click="
                      authorValue({ id: null, label: 'Tất cả tác giả' })
                      ">
                      Tất cả tác giả
                    </div>
                  </a-menu-item>
                  <a-menu-item v-for="(items, index) in authorStore?.AuthorAdmin?.authors" :key="index">
                    <div @click="
                      authorValue({ id: items?.id, label: items?.author })
                      ">
                      {{ items.author }}
                    </div>
                  </a-menu-item>
                </a-menu>
              </div>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ authorQuery.label ? authorQuery.label : "Tất cả tác giả" }}
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
                      categoryValue({ id: items.id, label: items?.name })
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
        </div>
        <NuxtLink to="/admin/book/create-book">
          <a-button type="primary">Thêm sách</a-button>
        </NuxtLink>
      </div>
      <BookEdit :openModalBook="openModalBook" :openModal="CloseModal" :id="IdBook" />
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
            <span>
              <a-tag :color="record.status === 'active' ? 'green' : 'volcano'" style="border: none">
                {{
                  record.status === "active" ? "hoạt động" : "Không hoạt động"
                }}
              </a-tag>
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink :to="`book/${record.id}`">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Xem chi tiết</span>
                  </template>
                  <button
                    class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <Icon icon="heroicons:eye" class="group-hover:text-[#212122]" />
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
                        <button class="flex items-center gap-2" @click="showModal(record?.id)">
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
        <a-pagination v-model:current="current" :total="allAdminBooks?.adminBooks?.totalResults"
          :pageSize="allAdminBooks?.adminBooks?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>

  </div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const openModalBook = ref<boolean>(false);
const IdBook = ref<number>();
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const statusValue = ({ value, label }: any) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
  current.value = 1;
};
const allAdminBooks = useBookStore();
const categoryStore = useCategoryStore();
const categoryQuery = ref({
  id: "",
  label: "",
});

const onSearch = debounce(() => {
  current.value = 1;
  getAllAdminBooks();
}, 500);

watch(valueSearch, onSearch);
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
  current.value = 1;
};
const authorStore = useAuthorStore();
const authorQuery = ref({
  id: "",
  label: "",
});
useAsyncData(async () => {
  try {
    await authorStore.getAllAuthor({
      pageSize: 1000,
    });
  } catch (error) {
    console.error(error);
  }
});
const authorValue = ({ id, label }: any) => {
  authorQuery.value.id = id;
  authorQuery.value.label = label;
  current.value = 1;
};
const current = ref(1);
const getAllAdminBooks = async () => {
  try {
    const data: any = await allAdminBooks.getAdminBooks({
      page: current.value,
      search: valueSearch.value,
      category_id: categoryQuery.value.id,
      author_id: authorQuery.value.id,
      status: queryStatus.value.value,
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
    watch: [current, categoryQuery.value, authorQuery.value, queryStatus.value],
  }
);
const errors = ref({});
const onDelete = async (id: string) => {
  try {
    const res = await allAdminBooks.deleteBook(id);
    if (res.data._rawValue?.status == true) {
      message.success("Xóa sách thành công");
      getAllAdminBooks();
    } else {
      errors.value = res.error.value.data.errors;
      message.error("Xóa thất bại");
    }
  } catch (error) {
    console.error(error);
  }
};

const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: "Bạn có chắc xóa sách này không ?",
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

const confirm = (e: MouseEvent) => {
  console.log(e);
  message.success("Xóa thành công");
};

const cancel = (e: MouseEvent) => {
  console.log(e);
  message.error("Xóa thất bại");
};
const showModal = (id: number) => {
  openModalBook.value = true;
  IdBook.value = id;
};
const CloseModal = () => {
  openModalBook.value = false;
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
