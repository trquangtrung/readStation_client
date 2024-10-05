<template>
  <div class="">
    <h1 class="text-xl text-[#1e293b] font-semibold pb-3">
      Danh sách đơn hàng
    </h1>
    <div class="bg-[#fff] p-4 rounded-xl">
      <div class="relative w-1/4 md:block hidden">
        <div class="flex">
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-blue-500"
            placeholder="Tìm kiếm..."
          />
        </div>
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <SearchOutlined class="text-gray-500" />
        </div>
      </div>

      <div class="flex gap-2 py-2">
        <a-button
          :type="selectedButton === 'all' ? 'primary' : 'default'"
          @click="selectButton('all')"
          >Tất cả đơn</a-button
        >
        <a-button
          :type="selectedButton === 'received' ? 'primary' : 'default'"
          @click="selectButton('received')"
          >Đã nhận</a-button
        >
        <a-button
          :type="selectedButton === 'pending' ? 'primary' : 'default'"
          @click="selectButton('pending')"
          >Chờ nhận đơn</a-button
        >
        <a-button
          :type="selectedButton === 'cancelled' ? 'primary' : 'default'"
          @click="selectButton('cancelled')"
          >Đã hủy</a-button
        >
      </div>

      <AccountTableOrder />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// Tạo một trạng thái để theo dõi button nào đang được chọn
const selectedButton = ref("all");

// Phương thức để thay đổi button được chọn
const selectButton = (button: string) => {
  selectedButton.value = button;
};
</script>

<style scoped>
/* Thêm kiểu nếu cần */
</style>
