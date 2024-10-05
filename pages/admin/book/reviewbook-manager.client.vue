<template>

  <Head>
    <Title>ReadStation | Quản lý đánh giá sách</Title>
    <Meta name="description" content="Quản lý đánh giá sách" />
    <Meta property="og:title" content="ReadStation | Quản lý đánh giá sách" />
    <Meta property="og:description" content="Quản lý đánh giá sách" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">Quản lý đánh giá</h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="relative w-2/3 md:block hidden">
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
                <a-menu-item @click="fitlerRating({ value: '', label: 'Tất cả sao' })">Tất cả sao</a-menu-item>
                <a-menu-item>
                  <CommonRating @click="fitlerRating({ value: 5, label: '5 sao' })" :rating="5" />
                </a-menu-item>
                <a-menu-item>
                  <CommonRating @click="fitlerRating({ value: 4, label: '4 sao' })" :rating="4" />
                </a-menu-item>
                <a-menu-item>
                  <CommonRating @click="fitlerRating({ value: 3, label: '3 sao' })" :rating="3" />
                </a-menu-item>
                <a-menu-item>
                  <CommonRating @click="fitlerRating({ value: 2, label: '2 sao' })" :rating="2" />
                </a-menu-item>
                <a-menu-item>
                  <CommonRating @click="fitlerRating({ value: 1, label: '1 sao' })" :rating="1" />
                </a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryRating.label ? queryRating.label : "Tất cả sao" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
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
              {{ queryStatus.label ? queryStatus.label : "Trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item @click="sortValue({ value: 'desc', label: 'Mới nhất' })">Mới nhất</a-menu-item>
                <a-menu-item @click="sortValue({ value: 'asc', label: 'Cũ nhất' })">Cũ nhất</a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ querySort.label ? querySort.label : "Mới nhất" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>

      <a-table :columns="columns" :data-source="bookreviewStore?.adminBookReviews?.bookReviews"
        :loading="bookreviewStore.isLoading" :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'title'">
            <span>Tên sách</span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'title'">
            <span>{{ record?.book_detail?.book?.title }} - Phiên bản
              {{ record?.book_detail?.book_version }}</span>
          </template>
          <template v-if="column.key === 'user'">
            <div class="flex flex-col gap-1">
              <span>{{ record?.user?.fullname }}</span>
              <span>{{ record?.user?.phone }}</span>
              <span>{{ record?.user?.email }}</span>
            </div>
          </template>
          <template v-if="column.key === 'date'">
            <span>{{
              $dayjs(record?.review_date).format("DD/MM/YYYY - HH:MM")
                ? $dayjs(record?.review_date).format("DD/MM/YYYY - HH:MM")
                : ""
            }}</span>
          </template>
          <template v-if="column.key === 'rating'">
            <span>
              <CommonRating :rating="record.rating" />
            </span>
          </template>
          <template v-if="column.key === 'reivew_text'">
            <span>{{ record?.review_text }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <NuxtLink :to="`/admin/book/detailreview/${record?.book_detail?.id}`">
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
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="bookreviewStore?.adminBookReviews?.totalResults"
          :pageSize="bookreviewStore?.adminBookReviews?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import debounce from "lodash.debounce";
const bookreviewStore = useBookReviewStore();
const current = ref(1);
const valueSearch = ref("");
const queryRating = ref({
  value: "",
  label: "",
});
const queryStatus = ref({
  value: "",
  label: "",
});
const querySort = ref({
  value: "",
  label: "",
});
const fitlerRating = ({ value, label }) => {
  queryRating.value.value = value;
  queryRating.value.label = label;
  current.value = 1;
};
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
  current.value = 1;
};
const sortValue = ({ value, label }) => {
  querySort.value.value = value;
  querySort.value.label = label;
  current.value = 1;
};
const onSearch = debounce(() => {
  current.value = 1;
  bookreviewStore.getAllBookReviews({
    page: current.value,
    rating: queryRating.value?.value,
    status: queryStatus.value?.value,
    sort: querySort.value?.value,
    search: valueSearch.value,
  });
}, 500);

watch(valueSearch, onSearch);
useAsyncData(
  async () => {
    try {
      await bookreviewStore.getAllBookReviews({
        page: current.value,
        rating: queryRating.value?.value,
        status: queryStatus.value?.value,
        sort: querySort.value?.value,
        search: valueSearch.value,
      });
    } catch (error) {
      message.error("Lỗi tải dữ liệu");
    }
  },
  {
    immediate: true,
    watch: [current, queryRating.value, queryStatus.value, querySort.value],
  }
);
const columns = [
  {
    name: "Tên sách",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Người đánh giá",
    dataIndex: "user",
    key: "user",
  },
  {
    title: "Thời gian",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Số sao đánh giá",
    dataIndex: "rating",
    key: "rating",
  },
  {
    title: "Nội dung đánh giá",
    dataIndex: "reivew_text",
    key: "reivew_text",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];

const data = [
  {
    id: 1,
    title: "Doraemon tập 31 ",
    Assessor: "Trung Tran Quang",
    phone: "0123456789",
    email: "trung190579@gmail.com",
    date: "20/7/2024 - 11:00",
    rating: 5,
    dicription: "Sách rất hay",
  },
  {
    id: 2,
    title: "Trò Chơi Tâm Lý",
    Assessor: "Ton That An Khuong (FPL HCM)",
    phone: "0123456789",
    email: "khuongttaps26697@fpt.edu.vn",
    date: "19/07/2024 - 19:05",
    rating: 4,
    dicription: "Sách rất hay",
  },
];
</script>
