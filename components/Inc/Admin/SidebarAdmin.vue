<template>
  <a-layout-sider
    v-model:collapsed="props.collapsed"
    :trigger="null"
    collapsible
    class="!fixed h-full !bg-white dark:!bg-[#132337] !border-r border-r-[#e2e8f0]"
    :class="props.collapsed ? 'w-[80px]' : '!min-w-[theme(padding.sidebar)]'"
  >
    <NuxtLink to="/">
      <div class="p-5">
        <img
          v-if="props.collapsed"
          src="/assets/images/logo_small.svg"
          alt="logo"
        />
        <img v-else src="/assets/images/logo_header.svg" alt="logo" />
      </div>
    </NuxtLink>

    <a-menu
      v-model:selectedKeys="selectedKeys"
      :theme="$colorMode.value === 'dark' ? 'dark' : 'light'"
      mode="inline"
      class="!border-0 dark:!bg-[#6c819b] dark:!text-white overflow-auto h-5/6"
      :class="props.collapsed ? 'w-[80px]' : '!min-w-[theme(padding.sidebar)]'"
    >
      <a-menu-item key="1" @click="navigateTo('/admin')">
        <Icon
          :class="props.collapsed && 'anticon anticon-desktop'"
          icon="hugeicons:dashboard-square-02"
          class="text-2xl"
        />
        <span class="font-bold">Dashboards</span>
      </a-menu-item>

      <a-menu-item
        key="545"
        @click="navigateTo('/admin/verification-requests')"
      >
        <Icon
          :class="props.collapsed && 'anticon anticon-desktop'"
          icon="hugeicons:user-check-02"
          class="text-2xl"
        />
        <span class="font-bold">Chờ xác thực</span>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="solar:users-group-rounded-broken"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý người dùng</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="4"
          @click="navigateTo('/admin/user')"
          >Tất cả người dùng</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="3"
          @click="navigateTo('/admin/user/create-user')"
          >Thêm người dùng</a-menu-item
        >
      </a-sub-menu>

      <a-sub-menu key="sub3">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="solar:box-minimalistic-outline"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý đơn hàng</span>
          </span>
        </template>
        <a-menu-item
          key="12"
          class="font-semibold"
          @click="navigateTo('/admin/product-manager')"
          >Tất cả đơn hàng</a-menu-item
        >
        <a-menu-item
          key="11"
          class="font-semibold"
          @click="navigateTo('/admin/product-manager/create-product')"
          >Thêm đơn hàng</a-menu-item
        >
        <a-menu-item
          key="61"
          class="font-semibold"
          @click="navigateTo('/admin/product-manager/book-return-slip')"
          >Phiếu trả sách</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="solar:book-minimalistic-line-duotone"
              class="text-2xl"
            />

            <span class="font-bold">Quản lý sách</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="9"
          @click="navigateTo('/admin/book')"
          >Tất cả sách</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="8"
          @click="navigateTo('/admin/book/create-book')"
          >Thêm sách</a-menu-item
        >
        <a-menu-item
          key="10"
          class="font-semibold"
          @click="navigateTo('/admin/book/reviewbook-manager')"
          >Quản lý đánh giá</a-menu-item
        >
        <a-menu-item key="59" @click="navigateTo('/admin/book/trash-book')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub5">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="hugeicons:quill-write-02"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý bài viết</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="40"
          @click="navigateTo('/admin/post')"
          >Tất cả bài viết</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="13"
          @click="navigateTo('/admin/post/add-post')"
          >Thêm bài viết</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="14"
          @click="navigateTo('/admin/post/post-await')"
          >Bài viết đang xử lý</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="111"
          @click="navigateTo('/admin/post/trash-post')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub40">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="fluent:comment-32-regular"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý bình luận</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="42"
          @click="navigateTo('/admin/comment')"
          >Tất cả bình luận</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub6">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="streamline:shelf"
              class="text-2xl"
            />

            <span class="font-bold">Quản lý tủ sách</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="17"
          @click="navigateTo('/admin/book-case')"
          >Tất cả tủ sách</a-menu-item
        >
        <a-menu-item
          key="16"
          class="font-semibold"
          @click="navigateTo('/admin/book-case/trash-bookcase')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub7">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="bi:bookshelf"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý kệ sách</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="19"
          @click="navigateTo('/admin/book-shelves')"
          >Tất cả kệ sách</a-menu-item
        >
        <a-menu-item
          key="18"
          class="font-semibold"
          @click="navigateTo('/admin/book-shelves/trash-bookshelves')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub8">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="iconamoon:category-light"
              class="text-2xl"
            />
            <span class="font-bold">Danh mục sản phẩm</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="20"
          @click="navigateTo('/admin/categoryBook')"
          >Tất cả danh mục sản phẩm</a-menu-item
        >
        <a-menu-item
          key="58"
          class="font-semibold"
          @click="navigateTo('/admin/categoryBook/trash-categoryProduct')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub55">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="iconamoon:category-light"
              class="text-2xl"
            />
            <span class="font-bold">Danh mục bài viết</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="77"
          @click="navigateTo('/admin/categoryPost')"
        >
          Tất cả danh mục bài viết</a-menu-item
        >

        <a-menu-item
          key="78"
          class="font-semibold"
          @click="navigateTo('/admin/categoryPost/trash-categoryPost')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub9">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="mingcute:user-star-line"
              class="text-2xl"
            />

            <span class="font-bold">Quản lý tác giả</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="63"
          @click="navigateTo('/admin/author')"
          >Tất cả tác giả</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="22"
          @click="navigateTo('/admin/author/add-author')"
          >Thêm tác giả</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="60"
          @click="navigateTo('/admin/author/trash-author')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub23">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="hugeicons:shipping-truck-01"
              class="text-2xl"
            />

            <span class="font-bold">Phương thức vận chuyển </span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="36"
          @click="navigateTo('/admin/shipping-methods')"
          >Tất cả pt vận chuyển</a-menu-item
        >
        <a-menu-item
          key="39"
          class="font-semibold"
          @click="navigateTo('/admin/shipping-methods/trash-shipping-methods')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>

      <a-sub-menu key="sub10">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="ion:business-outline"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý nhà xuất bản</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="49"
          @click="navigateTo('/admin/publishing-company')"
          >Tất cả nhà xuất bản</a-menu-item
        >

        <a-menu-item
          key="23"
          class="font-semibold"
          @click="
            navigateTo('/admin/publishing-company/trash-publishing-company')
          "
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub13">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="tabler:building-warehouse"
              class="text-2xl"
            />
            <span class="font-bold">Quản lý nhà cung cấp</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="37"
          @click="navigateTo('/admin/supplier')"
          >Tất cả nhà cung cấp</a-menu-item
        >
        <a-menu-item
          class="font-semibold"
          key="48"
          @click="navigateTo('/admin/supplier/trash-supplier')"
          >Thùng rác</a-menu-item
        >
      </a-sub-menu>
      <a-sub-menu key="sub11">
        <template #title>
          <span class="flex items-center gap-2">
            <Icon
              :class="props.collapsed && 'anticon anticon-desktop'"
              icon="icon-park-outline:bill"
              class="text-2xl"
            />
            <span class="font-bold">Phiếu nhập hàng</span>
          </span>
        </template>
        <a-menu-item
          class="font-semibold"
          key="28"
          @click="navigateTo('/admin/manager-bill')"
          >Tất cả phiếu nhập hàng</a-menu-item
        >
        <a-menu-item
          key="29"
          class="font-semibold"
          @click="navigateTo('/admin/manager-bill/create-bill')"
          >Thêm phiếu nhập hàng</a-menu-item
        >
      </a-sub-menu>

      <a-menu-item key="46" @click="navigateTo('/admin/history-transaction')">
        <Icon
          :class="props.collapsed && 'anticon anticon-desktop'"
          icon="hugeicons:bitcoin-transaction"
          class="text-2xl"
        />
        <span class="font-bold">Tất cả lịch sử giao dịch</span>
      </a-menu-item>
      <a-menu-item
        class="font-semibold"
        key="32"
        @click="navigateTo('/admin/image')"
      >
        <Icon
          :class="props.collapsed && 'anticon anticon-desktop'"
          icon="radix-icons:image"
          class="text-2xl"
        />
        <span class="font-bold">Quản lý ảnh</span>
      </a-menu-item>
      <a-menu-item
        class="font-semibold"
        key="33"
        @click="navigateTo('/admin/contact')"
      >
        <Icon
          :class="props.collapsed && 'anticon anticon-desktop'"
          icon="mdi:contact-outline"
          class="text-2xl"
        />
        <span class="font-bold">Quản lý liên hệ</span>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const props = defineProps<{
  collapsed: boolean;
}>();
const selectedKeys = ref<string[]>(["1"]);
</script>
<style scoped>
:deep(.ant-menu-title-content) {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
