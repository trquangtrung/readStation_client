<template>
  <div>

    <div class="flex gap-3">
      <h3 class="font-bold">
        {{ order?.data?.book_details?.book?.title }} -
        {{ order?.data?.book_details?.book_version }}
      </h3>
      <div>
        <a-tag v-if="order?.data?.status === 'active'"
          class="text-tag-text-04 bg-tag-bg-04 border-none py-1 px-3 rounded-lg">
          Đang thuê
        </a-tag>
        <a-tag v-if="order?.data?.status === 'returning'"
          class="text-tag-text-13 bg-tag-bg-13 border-none py-1 px-3 rounded-lg">
          Đang trả sách
        </a-tag>
        <a-tag v-else-if="order?.data?.status === 'completed'"
          class="text-tag-text-05 bg-tag-bg-05 border-none py-1 px-3 rounded-lg">
          Đã trả sách
        </a-tag>
        <a-tag v-else-if="order?.data?.status === 'overdue'"
          class="text-tag-text-06 bg-tag-bg-06 border-none py-1 px-3 rounded-lg">
          Quá hạn
        </a-tag>
        <a-tag v-else-if="order?.data?.status === 'extended'"
          class="text-tag-text-12 bg-tag-bg-12 border-none py-1 px-3 rounded-lg">
          Đang gia hạn
        </a-tag>
      </div>
    </div>
    <div class="flex mt-3">
      <div class="w-1/2 grid grid-cols-12 border-r border-rtgray-50">
        <div class="col-span-4">
          <img :src="order?.data?.book_details?.poster" alt="" class="w-[114px] h-[176px] shadow-lg shadow-gray-500" />
        </div>
        <div class="col-span-8 text-sm space-y-3">
          <div class="grid grid-cols-6">
            <span class="col-span-3 font-bold">Tác giả:</span>
            <span class="col-span-3">
              {{ order?.data?.book_details?.book?.author?.author }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="col-span-3 font-bold">Danh mục:</span>
            <span class="col-span-3">
              {{ order?.data?.book_details?.book?.category?.name }}
            </span>
          </div>

          <div class="grid grid-cols-4" v-if="
            orderStore?.order?.status === 'extended' ||
            orderStore?.order?.status === 'active' ||
            orderStore?.order?.status === 'overdue' ||
            orderStore?.order?.status === 'returning'
          ">
            <span class="col-span-2 font-bold">Ngày hết hạn:</span>
            <span class="col-span-2">
              {{
                $dayjs(order?.data?.current_due_date).format(
                  "DD/MM/YYYY"
                )
              }}
            </span>
          </div>
          <div class="grid grid-cols-4" v-if="
            order?.data?.status === 'returning' ||
            order?.data?.status === 'completed'
          ">
            <span class="col-span-2 font-bold">Hình thức trả sách:</span>
            <div class="col-span-2" v-for="(items, index) in order?.data?.return_histories" :key="index">
              <span v-if="items?.return_method === 'library'">
                Giao trả sách trực tiếp đến thư viện
              </span>
              <span v-else-if="items?.return_method === 'pickup'">
                Giao sách đến thư viện
              </span>
            </div>
          </div>
          <div class="grid grid-cols-4" v-if="order?.data?.status === 'completed'">
            <span class="col-span-2 font-bold">Đánh giá:</span>

            <span class="col-span-2">
              <a-rate v-model:value="rating" :disabled="order.data.book_reviews.length > 0">
                <template #character>
                  <svg focusable="false" data-icon="star" width="1em" height="1em" fill="currentColor"
                    aria-hidden="true" viewBox="64 64 896 896">
                    <path
                      d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z">
                    </path>
                  </svg>
                </template>
              </a-rate>
            </span>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="w-1/2 space-y-3 pl-5 text-sm">
        <div class="grid grid-cols-8">
          <span class="col-span-2 font-bold">Tiền cọc sách:</span>
          <span class="col-span-6">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order?.data?.deposit_fee)
            }}
          </span>
        </div>
        <div class="grid grid-cols-8">
          <span class="col-span-2 font-bold">Phí dịch vụ:</span>
          <span class="col-span-6">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order?.data?.service_fee)
            }}
          </span>
        </div>
        <div class="grid grid-cols-8">
          <span class="col-span-2 font-bold">Phí phạt:</span>
          <span class="col-span-6">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(order?.data?.fine_amount)
            }}
          </span>
        </div>
        <!-- <div class="grid grid-cols-8">
          <span class="col-span-2 font-bold">Mô tả tình trạng:</span>
          <span class="col-span-6">
            {{
              order?.data?.return_histories[0]?.condition
            }}
          </span>
        </div> -->
        <div class="grid grid-cols-8"
          v-if="!['overdue', 'completed', 'returning', 'extended'].includes(order?.data?.status)">
          <span class="col-span-2 font-bold">Tổng tiền:</span>
          <span class="col-span-6">
            {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                order?.data?.deposit_fee + order?.data?.service_fee
              )
            }}
          </span>
        </div>

      </div>
    </div>

    <div class="mt-3 space-y-3" v-if="
      order?.data?.status === 'completed'

    ">

      <span class="text-sm font-bold">Đánh giá chi tiết:</span>
      <div v-if="order?.data?.book_reviews.length < 1" class="space-y-3">
        <a-textarea v-model:value="review" placeholder="Nhập nội dung đánh giá sách của bạn" :rows="4" required />

        <div class="text-end">
          <a-button @click="handleReviewBook(order?.data?.id)" html-type="submit"
            class="h-10 bg-orange-500 !text-white border-none">
            Gửi đánh giá
          </a-button>
        </div>
      </div>
      <p class="text-sm"> {{ order?.data?.book_reviews[0]?.review_text }}</p>

    </div>

    <div class="flex justify-end pt-4 gap-2">
      <div v-if="
        order?.data?.status === 'extended' || order?.data?.status === 'overdue' || order?.data?.status === 'active'"
        class="flex justify-end pt-4 gap-2">
        <a-button class="h-10" @click="showModalGive(order?.data)">
          Trả sách
        </a-button>

        <a-button v-if="orderStore?.order?.current_extensions < 3 && $dayjs(new Date()).format('YYYY-MM-DD') ===
          $dayjs(order?.data?.current_due_date).subtract(1, 'day').format('YYYY-MM-DD')"
          class="h-10 bg-orange-500 !text-white border-none" @click="showModalExtend(order?.data)">
          Gia hạn lần {{ order?.data?.extensions_details?.length + 1 }}
        </a-button>
      </div>
    </div>

    <AccountOrderExtendBook :openModalExtend="openModalExtend" :closeModalExtend="closeModalExtend"
      :extendsionBook="extendsionBook" />
    <AccountOrderGiveBook :openModalGive="openModalGive" :closeModalGive="closeModalGive" :bookDetail="bookDetail" />
  </div>
</template>
<script lang="ts" setup>
const orderStore = useOrderClientStore();
const order = defineProps(["data"]);
const errors = ref({});
const bookDetail = ref();
const extendsionBook = ref();
const rating = ref<number>(5);
const route = useRoute();
const idBook = route.params.id;
const loadingStates = ref({});
const reviewStore = useReviewBookClientStore();

const review = ref("");
watchEffect(() => {
  if (order?.data?.book_reviews?.length > 0) {
    const ratingArray = order.data.book_reviews.map((review) => review.rating);
    rating.value = ratingArray || 5;
  }
});
const handleReviewBook = async (id) => {

  if (!review.value.trim()) {
    message.error("Vui lòng nhập nội dung đánh giá!");
    return;
  }
  if (review.value.length < 10) {
    message.error("Nội dung đánh giá phải có ít nhất 10 ký tự!");
    return;
  }
  try {
    loadingStates.value[id] = true;
    const res = await reviewStore.createReviewBook({
      loan_order_details_id: id,
      review_text: review.value,
      rating: rating.value,
    });

    if (res.data._rawValue?.status == true) {
      navigateTo("/account/order/" + idBook);
      await orderStore.getOneOrder(idBook);
      message.success("Thêm đánh giá thành công");
    } else {
      message.error("Thêm đánh giá thất bại");
    }
  } catch (error) {
    message.error("Thêm đánh giá thất bại");
  } finally {
    loadingStates.value[id] = false;
  }
};
// Modal Extend
const openModalExtend = ref(false);
const showModalExtend = (order: any) => {
  openModalExtend.value = true;
  extendsionBook.value = order;

};
const closeModalExtend = () => {
  openModalExtend.value = false;
};

// Modal Give
const openModalGive = ref(false);
const showModalGive = (order: any) => {
  openModalGive.value = true;
  bookDetail.value = order;
};
const closeModalGive = () => {
  openModalGive.value = false;
};
</script>
