<template>
  <a-layout-sider
    class="dark:!bg-[#132337] rounded-lg hidden md:block bg-[#f9f9f9] shadow-md shadow-gray-300 !min-w-full"
  >
    <div class="text-center">
      <div class="flex items-center justify-center pt-3 relative">
        <img
          class="rounded-full w-20 h-20"
          :src="authStore?.authUser?.user?.avatar"
          alt=""
        />
        <a-tooltip placement="top">
          <template #title>
            <span>Đổi ảnh đại diện</span>
          </template>
          <button
            @click="showModal"
            class="border-none absolute bottom-0 left-[calc(50%+25px)] -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
          >
            <div class="flex items-center">
              <CommonAddImg />
            </div>
          </button>
        </a-tooltip>
      </div>

      <div class="mt-[17px] mb-[23px]">
        <h2 class="font-bold px-5">
          {{ authStore?.authUser?.user?.fullname }}
        </h2>
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
    </div>
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :theme="$colorMode.value === 'dark' ? 'dark' : 'light'"
      mode="inline"
      class="dark:!bg-[#6c819b] dark:!text-white overflow-auto h-5/6 rounded-2xl"
    >
      <a-menu-item key="2" class="flex items-center gap-2">
        <NuxtLink to="/account" class="flex items-center gap-2 font-semibold">
          <Icon icon="mingcute:user-security-line" class="text-xl" />
          <span class="font-bold">Quản lý tài khoản</span>
        </NuxtLink>
      </a-menu-item>
      <a-sub-menu key="sub2">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon icon="hugeicons:quill-write-02" class="text-xl" />
            <span class="font-bold">Đóng góp bài viết</span>
          </span>
        </template>
        <a-menu-item key="4">
          <NuxtLink
            to="/account/post"
            class="flex items-center gap-2 font-semibold"
          >
            Bài viết của bạn
          </NuxtLink>
        </a-menu-item>

        <a-menu-item key="5">
          <NuxtLink
            to="/account/post/rep-comment"
            class="flex items-center gap-2 font-semibold"
          >
            Bình luận bài viết của bạn
          </NuxtLink>
        </a-menu-item>

        <a-menu-item key="6">
          <NuxtLink
            to="/account/post/your-comment"
            class="flex items-center gap-2 font-semibold"
          >
            Bài viết đã bình luận
          </NuxtLink>
        </a-menu-item>
      </a-sub-menu>
      <!--  -->
      <NuxtLink
        to="/admin"
        v-if="
          authStore.authUser?.user?.role?.name === 'admin' ||
          authStore.authUser?.user?.role?.name === 'manager'
        "
      >
        <a-menu-item key="7">
          <span class="flex items-center gap-2">
            <Icon icon="tabler:settings-code" class="text-xl" />
            <span class="font-bold">Quản trị Website</span>
          </span></a-menu-item
        >
      </NuxtLink>

      <a-sub-menu key="sub3">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon icon="f7:money-dollar-circle" class="text-xl" />
            <span class="font-bold">Quản lý số dư</span>
          </span>
        </template>
        <a-menu-item key="8">
          <NuxtLink to="/account/balance" class="flex items-center gap-2">
            Thông tin số dư
          </NuxtLink>
        </a-menu-item>

        <a-menu-item key="9">
          <NuxtLink
            to="/account/balance/transaction-history"
            class="flex items-center gap-2 font-semibold"
          >
            Lịch sử giao dịch
          </NuxtLink>
        </a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub4" v-if="!isAllVerified">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              icon="material-symbols:verified-user-outline"
              class="text-xl"
            />
            <span class="font-bold">Xác thực tài khoản</span>
          </span>
        </template>
        <a-menu-item key="10">
          <NuxtLink
            to="/account/verify/verify-account"
            class="flex items-center gap-2 font-semibold"
            v-if="
              !authStore.authUser?.user?.citizen_identity_card &&
              !authStore.authUser?.user?.isCheckCCCD
            "
          >
            Xác thực CMT/CCCD
          </NuxtLink>
          <NuxtLink
            to="/account/verify/confirm-account"
            class="flex items-center gap-2 font-semibold"
            v-if="authStore.authUser?.user?.isCheckCCCD"
          >
            Xác minh CMT/CCCD
          </NuxtLink>
        </a-menu-item>

        <a-menu-item key="11" v-if="!authStore.authUser?.user?.student_id_card">
          <NuxtLink
            to="/account/verify/verify-student"
            class="flex items-center gap-2 font-semibold"
            v-if="
              !authStore.authUser?.user?.student_id_card &&
              !authStore.authUser?.user?.isCheckStudent
            "
          >
            Xác thực HS/SV
          </NuxtLink>
          <NuxtLink
            to="/account/verify/confirm-student"
            class="flex items-center gap-2 font-semibold"
            v-if="authStore.authUser?.user?.isCheckStudent"
          >
            Xác minh HS/SV
          </NuxtLink>
        </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="12">
        <NuxtLink to="/account/order" class="flex items-center gap-2">
          <Icon icon="solar:box-minimalistic-outline" class="text-xl" />
          <span class="font-bold">Quản lý đơn hàng</span>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item key="13">
        <NuxtLink
          to="/account/manager/change-password"
          class="flex items-center gap-2"
        >
          <Icon icon="teenyicons:password-outline" class="text-xl" />
          <span class="font-bold">Đổi mật khẩu</span>
        </NuxtLink>
      </a-menu-item>

      <a-menu-item key="14" @click="logout">
        <NuxtLink to="/" class="flex items-center gap-2">
          <Icon icon="humbleicons:logout" class="text-xl" />
          <span class="font-bold">Đăng xuất</span>
        </NuxtLink>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
  <AvatarChangeAvatar :openModal="openModal" :closeModal="closeModal" />
</template>
<script setup lang="ts">
import { Icon } from "@iconify/vue";
const props = defineProps<{
  collapsed: boolean;
}>();
const selectedKeys = ref<string[]>(["2"]);
const openModal = ref(false);

//get API
const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};

const showModal = () => {
  openModal.value = true;
};
const closeModal = () => {
  openModal.value = false;
};
const isAllVerified = ref<boolean>(false);

if (
  authStore.authUser?.user?.citizen_identity_card &&
  authStore.authUser?.user?.student_id_card
) {
  isAllVerified.value = true;
}
</script>
<style scoped>
/* :deep(.ant-menu-item-only-child) {
  color: black;
  font-weight: 600;
} */
</style>
