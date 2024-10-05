<template>
  <div class="w-full space-y-4">
    <div class="bg-white w-full h-fit p-4 rounded-lg border border-rtgray-50">
      <div class="flex pb-1 gap-2">

        <div v-if="bookStore?.book?.book?.is_featured === true">
          <img class="w-full h-[20px]" src="../../../assets/images/icon-standing.svg" alt="" />
        </div>

        <div class="flex gap-2 text-sm font-normal">
          <p>Tác giả:</p>
          <p class="text-rtprimary">
            {{ bookStore?.book?.book?.author?.author }}
          </p>
        </div>
      </div>

      <div class="font-bold text-2xl pb-1">
        {{ bookStore?.book?.book?.title }} -
        {{ bookStore?.book?.cardboard === "soft" ? "Bìa mềm" : "Bìa cứng" }} -
        {{ bookStore?.book?.book_version }}
      </div>

      <div class="flex gap-5 text-sm mb-2">
        <div class="w-1/2">
          <div class="grid grid-cols-12">
            <span class="font-semibold col-span-4 mb-1">Danh mục: </span>
            <span class="col-span-8"> {{ bookStore?.book?.book?.category?.name }} </span>
          </div>

          <div class="grid grid-cols-12">
            <span class="font-semibold col-span-4 mb-1">Số lượng: </span>
            <span class="col-span-8"> {{ bookStore?.book?.stock }} </span>
          </div>
        </div>
        <div class="w-1/2">
          <div class="grid grid-cols-12">
            <span class="font-semibold col-span-4 mb-1">Tủ sách:</span>
            <span class="col-span-8">{{ bookStore?.book?.book?.shelve?.bookcase?.name || 'Chưa có thông tin' }}</span>
          </div>
          <div class="grid grid-cols-12">
            <span class="font-semibold col-span-4 mb-1">Kệ sách:</span>
            <span class="col-span-8">{{ bookStore?.book?.book?.shelve?.name || 'Chưa có thông tin' }}</span>
          </div>
        </div>
      </div>



      <div class="flex gap-3" v-if="bookStore?.book?.average_rate > 0">
        <p class="text-sm font-medium">
          {{ bookStore?.book?.average_rate }} sao
        </p>
        <CommonRating :rating="bookStore?.book?.average_rate" />
        <p class="text-[#787878] text-sm">
          ( {{ bookStore?.book?.rating_total }} đánh giá)
        </p>
      </div>
      <div class="flex gap-3" v-else>
        <CommonRating :rating="5" />
      </div>
      <div class="flex items-center gap-3 pt-2">
        <p class="font-bold text-2xl">
          {{
            new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(bookStore?.book?.price)
          }}
        </p>
      </div>
    </div>

    <div class="bg-white w-full h-fit p-4 rounded-lg border border-rtgray-50">
      <div class="font-bold text-base pb-3">
        <div> Thông tin chi tiết</div>
      </div>

      <div class="text-sm">
        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Mã hàng</p>
          <p class="w-1/2">{{ bookStore?.book?.sku_origin }}</p>
        </div>
        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Công ty phát hành</p>
          <p class="w-1/2">{{ bookStore?.book?.issuing_company }}</p>
        </div>
        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Loại bìa</p>
          <p class="w-1/2">
            {{ bookStore?.book?.cardboard === "soft" ? "Bìa mềm" : "Bìa cứng" }}
          </p>
        </div>

        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Nhà xuất bản</p>
          <p class="w-1/2">{{ bookStore?.book?.publishing_company?.name }}</p>
        </div>


        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Ngày xuất bản</p>
          <p class="w-1/2">{{ $dayjs(bookStore?.book?.publish_date).format("DD/MM/YYYY") }}</p>
        </div>
        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Kích thước</p>
          <p class="w-1/2">{{ bookStore?.book?.book_size }}</p>
        </div>
        <div class="flex border-b border-rtgray-50 p-2">
          <p class="w-1/2 text-rtgray-100">Số trang</p>
          <p class="w-1/2">{{ bookStore?.book?.total_page }} trang</p>
        </div>


      </div>
    </div>

    <div class="bg-white w-full h-fit p-4 rounded-lg border border-rtgray-50">
      <div class="font-semibold text-base pb-2">
        <div>Mô tả sản phẩm</div>
      </div>
      <div class="">
        <div class="relative" :class="!viewMore && 'line-clamp-6'" v-html="bookStore?.book?.book?.description"></div>
        <button @click="viewMore = !viewMore"
          class="flex justify-center items-center gap-2 text-orange-400 hover:text-orange-500 mx-auto text-sm font-normal pt-4">
          <span>{{ viewMore ? "Rút gọn" : "Xem thêm" }}</span>
          <UIcon name="i-material-symbols-keyboard-arrow-down-rounded" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';

const bookStore = useBookPublicStore();
const viewMore = ref(false);
</script>
