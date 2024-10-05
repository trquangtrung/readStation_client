<template>
  <div class="flex flex-col space-y-6">
    <div>
      <div class="flex items-center gap-2 mb-5">
        <UIcon name="i-material-symbols-person-outline" />
        <h2 class="text-sm font-bold">Tài khoản</h2>
      </div>
      <div
        class="flex-col space-y-2 p-4 bg-white shadow-md shadow-gray-300 rounded-lg"
      >
        <div class="flex items-center justify-between border-b pb-2">
          <span class="font-semibold">Loại tài khoản</span>
          <div class="font-bold">
            <a-tag
              :bordered="false"
              color="purple"
              v-if="authStore?.authUser?.user?.role?.name === 'user'"
            >
              Khách hàng
            </a-tag>
            <a-tag
              :bordered="false"
              color="purple"
              v-else-if="authStore?.authUser?.user?.role?.name === 'student'"
            >
              HSSV
            </a-tag>
            <a-tag :bordered="false" color="purple" v-else> Quản lý </a-tag>
          </div>
        </div>
        <div class="flex items-center justify-between border-b pb-2">
          <span class="font-semibold">Xác thực</span>
          <span>
            <a-tag
              class="border-none"
              v-if="authStore?.authUser?.user?.user_verified_at === null"
              color="red"
            >
              Chưa xác thực
            </a-tag>
            <a-tag v-else class="border-none" color="green">Đã xác thực</a-tag>
          </span>
        </div>
        <div class="flex items-center justify-between">
          <span class="font-semibold">Ngày mở tài khoản</span>
          <span>
            {{
              $dayjs(authStore?.authUser?.user?.created_at).format("DD/MM/YYYY")
            }}
          </span>
        </div>
      </div>
    </div>
    <div class="">
      <div class="flex items-center gap-2 mb-3">
        <UIcon name="i-ph-users-bold" class="text-base" />
        <h2 class="text-sm font-bold">Kết nối tài khoản</h2>
      </div>
      <div class="bg-white rounded-lg shadow-md shadow-gray-300 p-4">
        <div class="flex items-center justify-between">
          <img
            src="../../../assets/images/icon-gg.png"
            class="w-[90px] h-[30px]"
            alt=""
          />
        </div>
        <div class="pt-4">
          <h2 class="font-semibold text-base">
            {{
              authStore?.authUser?.user?.google_id === null
                ? "Chưa kết nối"
                : "Đã kết nối"
            }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const state = reactive({
  mode: "light" as MenuMode,
  selectedKeys: ["1"],
  openKeys: ["sub1"],
});
const changeMode = (checked: boolean) => {
  state.mode = checked ? "light" : "vertical";
};
</script>
