<template>
  <div class="fixed w-full backdrop-blur-sm z-50">
    <div class="mx-auto container md:px-20 px-8">
      <div class="h-50 pt-5">
        <div
          class="h-max bg-[white] w-full border-2 border-[#ffffffad] shadow-sm rounded-lg flex justify-between py-3 px-10"
        >
          <!-- Logo -->
          <NuxtLink to="/">
            <div class="flex items-center gap-1">
              <img class="h-10" src="/assets/images/logo_header.svg" alt="" />
            </div>
          </NuxtLink>

          <!-- Menu -->
          <div class="md:block hidden">
            <ul class="flex items-center py-[3px]">
              <li>
                <NuxtLink to="/products"
                  ><a-button
                    class="text-black text-base hover:-translate-y-1 transition-transform"
                    type="link"
                  >
                    Cửa hàng
                  </a-button>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/post"
                  ><a-button
                    class="text-black text-base hover:-translate-y-1 transition-transform"
                    type="link"
                  >
                    Blog
                  </a-button></NuxtLink
                >
              </li>
              <li>
                <NuxtLink to="/about-us"
                  ><a-button
                    class="text-black text-base hover:-translate-y-1 transition-transform"
                    type="link"
                  >
                    Giới thiệu
                  </a-button>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact"
                  ><a-button
                    class="text-black text-base hover:-translate-y-1 transition-transform"
                    type="link"
                  >
                    Liên hệ
                  </a-button>
                </NuxtLink>
              </li>
            </ul>
          </div>
          <!-- Search -->
          <div class="relative w-1/4 md:block hidden h-10">
            <a-input-search
              v-model:value="value"
              placeholder="Tìm kiếm... "
              enter-button="Tìm kiếm"
              @search="onSearch"
              class="flex items-center h-full"
            />
          </div>

          <!-- Cart && Account -->
          <div class="md:flex justify-center items-center hidden">
            <div class="flex justify-center items-center gap-2 mr-4">
              <!-- <div class="text-center">
                <CommonThemeSelect />
              </div> -->
              <CommonLogged v-if="authStore.isLogged" />
              <NuxtLink to="/login" v-else>
                <button class="w-32 hover:bg-gray-100 hover:rounded-xl h-10">
                  <div class="flex justify-center items-center gap-3 text-base">
                    <UIcon
                      class="text-xl"
                      name="i-material-symbols-mood-outline-rounded"
                    />
                    <h2>Tài khoản</h2>
                  </div>
                </button>
              </NuxtLink>
            </div>
            <div class="border-solid border border-gray-300 h-8"></div>
            <div class="ml-3">
              <NuxtLink to="/cart">
                <button
                  class="relative w-10 hover:bg-orange-200 hover:rounded-xl h-10"
                >
                  <div class="text-2xl flex justify-center items-center">
                    <UIcon
                      class="text-2xl"
                      name="i-material-symbols-shopping-bag-outline"
                    />
                  </div>
                  <ClientOnly>
                    <div
                      class="absolute top-0 right-0 bg-red-500 text-white w-4 h-4 rounded-full flex justify-center items-center text-xs"
                    >
                      {{ cartStore?.carts ? cartStore?.carts?.length : 0 }}
                    </div>
                  </ClientOnly>
                </button>
              </NuxtLink>
            </div>
          </div>
          <!-- Mobie Menu -->
          <div class="md:hidden block">
            <button>
              <AppMobieHeader />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import debounce from "lodash.debounce";
const authStore = useAuthStore();
const cartStore = useCartStore();
const bookStore = useBookPublicStore();
const route = useRoute();
const value = ref<string>(route.query.search ? route.query.search : "");

const onSearchDebounce = debounce(() => {
  if (window.location.pathname === "/products") {
    navigateTo({
      query: {
        search: value.value,
      },
    });
  }
}, 500);
watch(value, onSearchDebounce);

const onSearch = async (searchValue: string) => {
  if (!searchValue?.trim()) return;
  navigateTo("/products?search=" + searchValue);
};
</script>
<style scoped>
:deep(.ant-btn-primary) {
  box-shadow: initial;
}

:deep(.ant-input::placeholder) {
  text-align: left;
}
</style>
