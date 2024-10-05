<template>

  <Head>
    <Title>ReadStation | Đánh giá sách “{{ bookDetail.getOneBookDetailAdmin?.book?.title }}</Title>
    <Meta name="description" content="Đánh giá sách" />
    <Meta property="og:title" content="ReadStation | Đánh giá sách" />
    <Meta property="og:description" content="Đánh giá sách" />
  </Head>
  <div class="flex flex-col gap-5">
    <div class="flex flex-col gap-2 pt-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Đánh giá sách “{{ bookDetail.getOneBookDetailAdmin?.book?.title }} -
          Phiên bản năm {{ bookDetail.getOneBookDetailAdmin?.book_version }}”
        </h5>
      </div>
    </div>
    <div class="bg-[white] rounded-lg h-20 w-full">
      <div class="flex justify-between p-3">
        <div class="flex justify-start gap-5">
          <div>
            <button class="w-14 h-14 rounded-full bg-orange-200">
              <UIcon class="text-3xl text-orange-400 items-center" name="i-material-symbols-book-4" />
            </button>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-gray-500">Sách
              {{ bookDetail.getOneBookDetailAdmin?.book?.category?.name }}</span>
            <span class="text-lg font-bold">{{ bookDetail.getOneBookDetailAdmin?.book?.title }} - Phiên bản
              năm {{ bookDetail.getOneBookDetailAdmin?.book_version }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[white] rounded-lg h-auto w-full flex flex-col gap-3 p-5">
      <div class="">
        <div class="flex justify-start gap-3 items-center">
          <span class="text-base font-bold">Thông tin chung</span>
          <UIcon class="text-lg text-gray-500" name="i-material-symbols-draft-orders-outline-rounded" />
        </div>
      </div>
      <div class="border border-gray-100"></div>
      <div class="grid md:grid-cols-3 gap-5">
        <div class="md:col-span-1 space-y-2 border-r border-gray-200">
          <div class="grid grid-cols-3">
            <span class="font-bold text-base">Ảnh bìa: </span>
            <img class="rounded-lg" :src="bookDetail.getOneBookDetailAdmin?.poster" />
          </div>
          <div class="grid grid-cols-3">
            <span class="font-bold text-base">Tác giả: </span>
            <span class="text-base">{{
              bookDetail.getOneBookDetailAdmin?.book?.author?.author
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="font-bold text-base">Danh mục: </span>
            <span class="text-base">{{
              bookDetail.getOneBookDetailAdmin?.book?.category?.name
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="font-bold text-base">Tủ sách: </span>
            <span class="text-base">{{
              bookDetail.getOneBookDetailAdmin?.book?.shelve?.bookcase?.name
                ? bookDetail.getOneBookDetailAdmin?.book?.shelve?.bookcase?.name
                : ""
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="font-bold text-base">Kệ sách: </span>
            <span class="text-base">{{
              bookDetail.getOneBookDetailAdmin?.book?.shelve?.name
                ? bookDetail.getOneBookDetailAdmin?.book?.shelve?.name
                : ""
            }}</span>
          </div>
        </div>
        <div class="md:col-span-2 space-y-3">
          <div class="grid grid-cols-4">
            <span class="text-base font-bold col-span-1">Mô tả: </span>
            <span class="text-base col-span-3">
              {{
                bookDetail.getOneBookDetailAdmin?.book?.description_summary
              }}</span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base font-bold col-span-1">Mô tả chi tiết:</span>
            <span class="text-base col-span-3" v-html="bookDetail.getOneBookDetailAdmin?.book?.description">
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-[white] rounded-lg h-auto w-full flex flex-col gap-3 p-5">
      <div class="flex gap-2">
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
      <a-table :columns="columns" :data-source="bookDetailReview.adminGetOneBookReview?.bookReviews"
        :loading="bookDetailReview.isLoading" :pagination="false">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <div class="flex flex-col gap-1">
              <span>{{ record?.user?.fullname }}</span>
              <span>{{ record?.user?.phone }}</span>
              <span>{{ record?.user?.email }}</span>
            </div>
          </template>
          <template v-else-if="column.key === 'date'">
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
          <template v-if="column.key === 'review_text'">
            <span>{{ record?.review_text }}</span>
          </template>
          <template v-else-if="column.key === 'action'">
            <a-tooltip placement="top" color="black" v-if="record.status === 'active'">
              <template #title>
                <span>Ẩn</span>
              </template>
              <button @click="showHiddenConfirm(record.id)"
                class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md">
                <Icon icon="bitcoin-icons:hidden-filled" class="group-hover:text-[#212122]" />
              </button>
            </a-tooltip>
            <a-tooltip placement="top" color="black" v-else>
              <template #title>
                <span>Khôi phục</span>
              </template>
              <button @click="showRecoverConfirm(record.id)"
                class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md">
                <Icon icon="charm:tick" class="group-hover:text-[#212122]" />
              </button>
            </a-tooltip>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="bookDetailReview.adminGetOneBookReview?.totalResults"
          :pageSize="bookDetailReview.adminGetOneBookReview?.pageSize" show-less-items pageSizeOptions />
      </div>
      <div class="mt-4 flex justify-end">
        <a-button @click="() => $router.back()">Trở về</a-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const route = useRoute();
const current = ref(1);
const id = route.params.id;
const bookDetail = useBookDetailStore();
const bookDetailReview = useBookReviewStore();
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
};
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const sortValue = ({ value, label }) => {
  querySort.value.value = value;
  querySort.value.label = label;
};
// Book_detail
useAsyncData(async () => {
  try {
    await bookDetail.getOneBookDetail(id);
  } catch (error) {
    console.log(error);
  }
});
//Review_Book_Detail
useAsyncData(
  async () => {
    try {
      await bookDetailReview.getOneBookReview({
        book_details_id: id,
        page: current.value,
        rating: queryRating.value.value,
        status: queryStatus.value.value,
        sort: querySort.value.value,
      });
    } catch (error) {
      console.log(error);
    }
  },
  {
    watch: [current, queryRating.value, queryStatus.value, querySort.value],
  }
);
// An danh gia
const onHidden = async (bookReview_id) => {
  try {
    const res = await bookDetailReview.updateBookReviewStatus({
      id: bookReview_id,
      status: "inactive",
    });
    if (res.data._rawValue?.status == true) {
      message.success("Ẩn đánh giá thành công");
      await bookDetailReview.getOneBookReview({ book_details_id: id });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Ẩn đánh giá thất bại");
  }
};
const showHiddenConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn ẩn đánh giá này?",
    content: "Hành động này không thể hoàn tác",
    okText: "Ẩn",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onHidden(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
// Khoi phuc danh gia
const onRecover = async (bookReview_id) => {
  try {
    const res = await bookDetailReview.updateBookReviewStatus({
      id: bookReview_id,
      status: "active",
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục đánh giá thành công");
      await bookDetailReview.getOneBookReview({ book_details_id: id });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục đánh giá thất bại");
  }
};
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn khôi phục đánh giá này?",
    content: "Hành động này không thể hoàn tác",
    okText: "Khôi phục",
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
const columns = [
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
    dataIndex: "review_text",
    key: "review_text",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
</script>
