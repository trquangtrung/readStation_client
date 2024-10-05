<template>

  <Head>
    <Title>ReadStation | Quản lý tác giả</Title>
    <Meta name="description" content="Quản lý tác giả" />
    <Meta property="og:title" content="ReadStation | Quản lý tác giả" />
    <Meta property="og:description" content="Quản lý tác giả" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Tất cả tác giả</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="relative w-2/3 md:block hidden">
            <div class="flex">
              <a-input placeholder="Nhập tên tác giả để tìm kiếm" class="h-10" v-model:value="valueSearch">
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
              {{ queryStatus.label ? queryStatus.label : " Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
        <NuxtLink to="author/add-author">
          <div class="">
            <a-button type="primary">Thêm tác giả</a-button>
          </div>
        </NuxtLink>
      </div>

      <a-table :columns="columns" :data-source="AuthorStore?.AuthorAdmin?.authors" :loading="AuthorStore.isLoading"
        :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Mã tác giả </span>
          </template>
        </template>

        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'avatar'">
            <div class="flex justify-start gap-4 items-center">
              <a-image v-if="record.avatar" :src="record.avatar" :width="60" :height="60" class="rounded-full" />
              <span>
                {{ record.author }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'dob'">
            <span>
              {{ record.dob ? $dayjs(record.dob).format("DD/MM/YYYY") : "" }}
            </span>
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
          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record.is_featured" />
            <IconMul v-else />
          </template>

          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink :to="`author/${record.id}`">
                <a-tooltip placement="top">
                  <template #title>
                    <span>Sửa</span>
                  </template>
                  <button
                    class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                    <Icon icon="fluent:edit-48-regular" class="text-lg" />
                  </button>
                </a-tooltip>
              </NuxtLink>
              <a-tooltip placement="top">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button @click="showDeleteConfirm(record?.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                  s>
                  <Icon icon="hugeicons:delete-01" class="text-lg" />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="AuthorStore?.AuthorAdmin?.totalResults"
          :pageSize="AuthorStore?.AuthorAdmin?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const AuthorStore = useAuthorStore();
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
const onSearch = debounce(() => {
  current.value = 1;
  getDataAuthor();
}, 500);

watch(valueSearch, onSearch);

watch(current, () => {
  navigateTo({
    query: {
      page: current.value,
    },
  });
});

const getDataAuthor = async () => {
  try {
    await AuthorStore.getAllAuthor({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
    });
  } catch (error) {
    console.error(error);
  }
};
useAsyncData(
  async () => {
    await getDataAuthor();
  },
  {
    immediate: true,
    watch: [current, queryStatus.value],
  }
);

const onDelete = async (id: string) => {
  try {
    const res = await AuthorStore.deleteAuthor(id);
    if (res.data._rawValue?.status == true) {
      message.success("Xóa tác giả thành công");
      getDataAuthor();
    } else {
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};

const showDeleteConfirm = (id: string) => {
  Modal.confirm({
    title: "Bạn có chắc muốn xóa tác giả này không ?",
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
const columns = [
  {
    title: "Tác giả",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Ngày, tháng, năm sinh",
    dataIndex: "dob",
    key: "dob",
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

const openModalEdit = ref<boolean>(false);
const openModalDetail = ref<boolean>(false);
const showModalEdit = () => {
  openModalEdit.value = true;
};
</script>
