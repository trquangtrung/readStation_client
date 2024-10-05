<template>

  <Head>
    <Title>ReadStation | Chi tiết kệ sách {{ bookShelves?.adminGetOneBookShelve.name }}</Title>
    <Meta name="description" content="Chi tiết kệ sách" />
    <Meta property="og:title" content="ReadStation | Chi tiết kệ sách" />
    <Meta property="og:description" content="Chi tiết kệ sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">
          Chi tiết {{ bookShelves?.adminGetOneBookShelve.name }}
        </h5>
      </div>
    </div>
    <div class="bg-[white] h-24 rounded-lg">
      <div class="p-5 flex justify-between">
        <div class="flex flex-col gap-2">
          <h1 class="text-xl font-bold">
            {{ bookShelves?.adminGetOneBookShelve.name }}
          </h1>
          <p class="text-orange-400">
            {{ bookShelves?.adminGetOneBookShelve.bookcase?.description }} -
            {{ bookShelves?.adminGetOneBookShelve.name }} -
            {{ bookShelves?.adminGetOneBookShelve?.book_details.length }} cuốn
            sách
          </p>
        </div>
        <div>
          <a-button class="flex justify-center items-center gap-1" type="primary"
            @click="showModalEdit(bookShelves?.adminGetOneBookShelve.id)" size="large">
            <UIcon class="text-lg text-white" name="i-material-symbols-edit" />
            <span class="text-white text-base">Chỉnh sửa</span>
          </a-button>
          <BookShelvesEdit :openModalEdit="openModalEdit" :openModal="CloseModalEdit" :shelvesId="idShevels" />
        </div>
      </div>
    </div>
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm mt-5">
      <div class="flex justify-between pb-4">
        <div class="relative w-1/4 md:block hidden">
          <div class="flex">
            <a-input placeholder="Nhập tên kệ để tìm kiếm" class="h-10" v-model:value="valueSearch">
              <template #prefix>
                <SearchOutlined />
              </template>
            </a-input>
          </div>
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UIcon class="text-gray-500" name="i-material-symbols-search" />
          </div>
        </div>
        <div class="">
          <a-button type="primary" @click="showModalAdd" size="large">Thêm sách</a-button>
          <CommonSearch :openModalAdd="openModalAdd" :openModal="CloseModalAdd" />
        </div>
      </div>
      <a-table :columns="columns" :data-source="bookShelves?.bookOfShelves?.books" :loading="bookShelves.isLoading">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <a>{{ record }}</a>
          </template>
          <template v-if="column.key === 'poster'">
            <div v-for="(items) in record?.book_detail">
              <a-image :src="items?.poster" :width="100" :height="140" />
            </div>
          </template>
          <template v-if="column.key === 'title'">
            <span class="flex justify-start gap-2">
              <p>{{ record?.title }}</p>
            </span>
          </template>
          <template v-if="column.key === 'book_version'" v-for="(items) in record?.book_detail">
            <span class="flex justify-start gap-2">
              <p>{{ items?.book_version }}</p>
            </span>
          </template>
          <template v-if="column.key === 'author'">
            <span class="flex justify-start gap-2">
              <p>{{ record?.author.author }}</p>
            </span>
          </template>
          <template v-if="column.key === 'price'">
            <span class="flex justify-start gap-2" v-for="(items) in record?.book_detail">
              <p>
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(items?.price)
                }}
              </p>
            </span>
          </template>
          <template v-if="column.key === 'category'">
            <span class="flex justify-start gap-2">
              <p>{{ record?.category.name }}</p>
            </span>
          </template>
          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record?.book?.is_featured" />
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
              <a-tooltip placement="top">
                <template #title>
                  <span>Xóa</span>
                </template>
                <button @click.prevent="showConfirm(record?.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                  <Icon icon="hugeicons:delete-01" class="text-lg" />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import debounce from 'lodash.debounce'
const route = useRoute();
const detailShelvesId = route.params.id;
const openModalAdd = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const idShevels = ref<number>();
const open = ref(false);
const showModal = () => {
  open.value = true;
};
const valueSearch = ref("");
const current = ref(1);
const bookShelves = useShelvesStore();
const bookStore = useBookStore();
useAsyncData(async () => {
  if (detailShelvesId === undefined) return
  try {
    await bookShelves.getOneShelves(detailShelvesId);
  } catch (error) {
    console.error(error);
  }
});
const onSearch = debounce(() => {
  current.value = 1;
  bookShelves.getBookOfShelves({
    id: detailShelvesId,
    page: current.value,
    search: valueSearch.value,
  });
}, 500);

watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await bookShelves.getBookOfShelves({
      id: detailShelvesId,
      page: current.value,
      search: valueSearch.value,
    });
  },
  {
    immediate: true,
    watch: [current],
  }
);


const updateDetailShelves = async (id) => {
  try {
    const idShelves = {
      shelve_id: null,
    };
    const res = await bookStore.updateBook({ id: id, value: idShelves });
    if (res.data._rawValue?.status == true) {
      message.success("Xóa sách ra khỏi kệ thành công");
      await bookShelves.getOneShelves(detailShelvesId);
      await bookShelves.getBookOfShelves({
        id: detailShelvesId,
        page: current.value,
        search: valueSearch.value,
      });
    } else {
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Xóa sách thất bại");
  }
};

const showConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc xóa sách này ra khỏi kệ không?",
    okText: "Có",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      updateDetailShelves(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const columns = [
  {
    title: "Ảnh bìa",
    dataIndex: "poster",
    key: "poster",
  },
  {
    title: "Tên sách",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Phiên bản",
    dataIndex: "book_version",
    key: "book_version",
  },
  {
    title: "Tác giả",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },

  {
    title: "Danh mục",
    dataIndex: "category",
    key: "category",
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
const showModalAdd = () => {
  openModalAdd.value = true;
};
const CloseModalAdd = () => {
  openModalAdd.value = false;
};
const showModalEdit = (id: any) => {
  idShevels.value = id;
  openModalEdit.value = true;
};
const CloseModalEdit = () => {
  openModalEdit.value = false;
};
</script>
