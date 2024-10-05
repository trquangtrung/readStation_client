<template>
  <div class="ml-2 cursor-pointer">
    <a-dropdown :trigger="['click']" placement="bottomRight">
      <div class="flex justify-center items-center gap-3 text-base">
        <a-avatar size="large" :src="authStore.authUser?.user?.avatar" alt="" />
      </div>
      <template #overlay>
        <a-menu class="px-8 w-[250px]">
          <nuxt-link to="">
            <a-menu-item key="6">
              <span class="flex items-center gap-2">
                <div>
                  <a-avatar
                    class="w-10 h-10"
                    :src="authStore.authUser?.user?.avatar"
                    alt=""
                  />
                </div>
                <div>
                  <div class="block font-semibold text-15">
                    {{ authStore?.authUser?.user?.fullname }}
                  </div>
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
                      v-else-if="
                        authStore?.authUser?.user?.role?.name === 'student'
                      "
                    >
                      Sinh viên
                    </a-tag>
                    <a-tag :bordered="false" color="purple" v-else>
                      Quản lý
                    </a-tag>
                  </div>
                </div>
              </span>
            </a-menu-item>
          </nuxt-link>
          <div class="border-solid border border-gray-200 w-full my-2"></div>
          <nuxt-link to="/account">
            <a-menu-item key="1">
              <span class="flex items-center gap-2">
                <Icon icon="mingcute:user-security-line" class="text-xl" />
                <span class="font-semibold">Quản lý tài khoản </span>
              </span>
            </a-menu-item>
          </nuxt-link>
          <nuxt-link
            to="/admin"
            v-if="
              authStore.authUser?.user?.role?.name === 'admin' ||
              authStore.authUser?.user?.role?.name === 'manager'
            "
          >
            <a-menu-item key="11">
              <span class="flex items-center gap-2">
                <Icon icon="tabler:settings-code" class="text-xl" />
                <span class="font-semibold">Quản trị Website</span>
              </span></a-menu-item
            >
          </nuxt-link>
          <div class="border-solid border border-gray-200 w-full my-2"></div>
          <nuxt-link to="/account/order">
            <a-menu-item key="3"
              ><span class="flex items-center gap-2">
                <Icon icon="solar:box-minimalistic-outline" class="text-xl" />
                <span class="font-semibold">Quản lý đơn hàng</span>
              </span>
            </a-menu-item>
          </nuxt-link>
          <nuxt-link to="/account/balance">
            <a-menu-item key="4"
              ><span class="flex items-center gap-2">
                <Icon icon="f7:money-dollar-circle" class="text-xl" />
                <span class="font-semibold">Quản lý số dư</span>
              </span></a-menu-item
            >
          </nuxt-link>
          <div class="border-solid border border-gray-200 w-full my-2"></div>
          <a-menu-item key="5" @click="logout">
            <span class="flex items-center gap-2">
              <Icon icon="humbleicons:logout" class="text-xl" />
              <span class="font-semibold">Đăng xuất</span>
            </span>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const authStore = useAuthStore();
const logout = async () => {
  await authStore.logout();
};
</script>
