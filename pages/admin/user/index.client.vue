<template>
  <div class="space-y-5">
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Danh sách người dùng
        </h5>
      </div>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-04 text-tag-text-04"
            >
              <Icon
                icon="solar:users-group-rounded-outline"
                class="text-lg w-10 h-10"
              />
            </a-tag>

            <div class="flex-1 text-tag-text-04">
              <p class="font-bold text-base">Tất cả</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      userStore?.userDashboard?.totalUser
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-04 text-tag-text-04"
            >
              <Icon icon="la:users-cog" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-04">
              <p class="font-bold text-base">Quản trị viên</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      userStore?.userDashboard?.totalAdmin
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-02 text-tag-text-02"
            >
              <UIcon class="text-lg w-10 h-10" name="i-iconoir-user"
            /></a-tag>

            <div class="flex-1 text-tag-text-02">
              <p class="font-bold text-base">Khách hàng</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      userStore?.userDashboard?.totalGuest
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center text-base h-[90px] bg-white rounded-md">
          <div class="flex items-center text-sm w-full gap-2 font-medium p-4">
            <a-tag
              :bordered="false"
              class="flex items-center p-2 bg-tag-bg-01 text-tag-text-01"
            >
              <Icon icon="ph:student" class="text-lg w-10 h-10" />
            </a-tag>

            <div class="flex-1 text-tag-text-01">
              <p class="font-bold text-base">Sinh viên</p>
              <p class="font-bold text-2xl float-right">
                <Icon
                  v-if="isLoading"
                  icon="svg-spinners:3-dots-scale"
                  class="text-3xl"
                />
                <span v-else>
                  {{
                    new Intl.NumberFormat().format(
                      userStore?.userDashboard?.totalStudent
                    )
                  }}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5">
      <div class="flex justify-between pb-4">
        <div class="flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập thông tin liên hệ để tìm kiếm"
                class="h-10 w-[400px]"
                v-model:value="valueSearch"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div>

          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="
                    statusValue({ value: '', label: 'Tất cả trạng thái' })
                  "
                  >Tất cả trạng thái</a-menu-item
                >
                <a-menu-item
                  @click="
                    statusValue({ value: 'active', label: 'Đang hoạt động' })
                  "
                  >Đang hoạt động</a-menu-item
                >
                <a-menu-item
                  @click="statusValue({ value: 'inactive', label: 'Đã chặn' })"
                  >Đã chặn</a-menu-item
                >
                <a-menu-item
                  @click="
                    statusValue({ value: 'banned', label: 'Vô hiệu hóa' })
                  "
                  >Vô hiệu hóa</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="roleValue({ value: '', label: 'Tất cả vai trò' })"
                  >Tất cả vai trò</a-menu-item
                >

                <a-menu-item
                  v-for="role in roleStore.roleAdmin"
                  :key="role?.id"
                  @click="roleValue({ value: role?.id, label: role?.name })"
                >
                  <span v-if="role.name === 'user'"> Khách hàng</span>
                  <span v-if="role.name === 'student'">Sinh viên</span>
                  <span v-if="role.name === 'admin'"> Quản trị</span>
                </a-menu-item>
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryrole.label ? queryrole.label : "Tất cả vai trò" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>

        <NuxtLink to="/admin/user/create-user" class="">
          <a-button size="large" type="primary">Thêm người dùng</a-button>
        </NuxtLink>
      </div>
      <a-table
        :columns="columns"
        :data-source="userStore.userAdmin?.users"
        :loading="userStore.isLoading"
        :pagination="false"
      >
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'avatar'">
            <a-image
              class="rounded-full"
              :src="record.avatar.replace('=s96-c', '')"
              :width="60"
              :height="60"
            />
          </template>
          <template v-if="column.dataIndex === 'user_info'">
            <p class="p-0">
              {{ record.fullname }}
            </p>
            <p class="p-0">
              {{ record.email }}
            </p>
            <p class="p-0">
              {{ record.phone }}
            </p>
          </template>
          <template v-if="column.key === 'address'">
            <span>
              {{ record.address_detail }}
            </span>
          </template>
          <template v-else-if="column.key === 'role'">
            <a-tag
              :bordered="false"
              v-if="record.role.name === UserRole.ADMIN"
              class="bg-tag-bg-04 text-tag-text-04"
            >
              Quản trị
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.role.name === UserRole.USER"
              class="bg-tag-bg-02 text-tag-text-02"
            >
              Khách hàng
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.role.name === UserRole.STUDENT"
              class="bg-tag-bg-01 text-tag-text-01"
            >
              Sinh viên
            </a-tag>
          </template>
          <template v-else-if="column.key === 'google_id'">
            <IconTick v-if="record.google_id" />
            <IconMul v-else />
          </template>
          <template v-else-if="column.key === 'balance_holding'">
            <span>
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(record.balance_holding)
              }}
            </span>
          </template>
          <template v-else-if="column.key === 'citizen_identity_card'">
            <IconTick v-if="record.citizen_identity_card" />
            <IconMul v-else />
          </template>

          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === UserStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Đang hoạt động
            </a-tag>
            <a-tag
              :bordered="false"
              v-if="record.status === UserStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đã chặn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === UserStatus.BANNED"
              class="bg-tag-bg-10 text-tag-text-10"
            >
              Vô hiệu hóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top" color="black">
                <template #title>
                  <span>Xem chi tiết</span>
                </template>
                <button
                  @click="showModalDetail(record.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="heroicons:eye"
                    class="group-hover:text-[#212122]"
                  />
                </button>
              </a-tooltip>

              <a-dropdown :trigger="['click']" placement="bottom">
                <button
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="humbleicons:dots-horizontal"
                    class="group-hover:text-[#131313]"
                  />
                </button>
                <template #overlay>
                  <a-menu class="space-y-1">
                    <NuxtLink :to="`/admin/user/edit/${record.id}`">
                      <a-menu-item v-if="record.status !== UserStatus.BANNED " key="1" class="p-4 hover:!bg-tag-bg-02">
                        <button class="flex items-center gap-2">
                          <Icon
                            icon="fluent:edit-48-regular"
                            class="text-lg text-tag-text-02"
                          />
                          <span class="text-tag-text-02 font-bold">Sửa</span>
                        </button>
                      </a-menu-item>
                    </NuxtLink>

                    <a-menu-item
                      v-if="record.status === UserStatus.ACTIVE"
                      key="2"
                      class="p-4"
                    >
                      <button
                        @click="showBannedConfirm(record.id)"
                        class="flex items-center gap-2"
                      >
                        <Icon
                          icon="gridicons:block"
                          class="text-lg font-bold text-tag-text-06"
                        />
                        <span class="text-tag-text-06 font-bold"
                          >Vô hiệu hóa</span
                        >
                      </button>
                    </a-menu-item>
                    <a-menu-item v-else key="3" class="p-4">
                      <button
                        @click="showDeleteConfirm(record.id)"
                        class="flex items-center gap-2"
                      >
                        <Icon
                          icon="charm:tick"
                          class="text-lg font-bold text-tag-text-09"
                        />
                        <span class="text-tag-text-09 font-bold"
                          >Hoạt động</span
                        >
                      </button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
      <UserDashboardConfirm
        :openModalConfirm="openModalConfirm"
        :openModal="CloseModalConfirm"
        :status="status"
        :id="userDashboard"
      />
      <div class="mt-4 flex justify-end">
        <a-pagination
          v-if="userStore?.userAdmin?.totalResults > 10"
          v-model:current="current"
          :total="userStore?.userAdmin?.totalResults"
          :pageSize="userStore?.userAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>

      <UserAdminDetail
        :openModalDetail="openModalDetail"
        :openModal="CloseModalDetail"
        :userDetailId="userDetailId"
      />
    </div>
  </div>
</template>

<script setup>
import { UserStatus } from "~/types/admin/user";
import { UserRole } from "~/types/admin/user";
import { Icon } from "@iconify/vue";
import { Modal } from "ant-design-vue";
import debounce from "lodash.debounce";
const route = useRoute();
const current = ref(route.query.page ? parseInt(route.query.page) : 1);
const userStore = useUserStore();
const roleStore = useRoleStore();
const openModalConfirm = ref(false);
const userDetailId = ref();
const userDashboard = ref();
const openModalDetail = ref(false);
const isLoading = ref(false);
const status = ref("");
const queryrole = ref({
  value: "",
  label: "",
});
const valueSearch = ref("");
const queryStatus = ref({
  value: "",
  label: "",
});
const roleValue = ({ value, label }) => {
  queryrole.value.value = value;

  switch (label) {
    case "user":
      queryrole.value.label = "Khách hàng";
      break;
    case "admin":
      queryrole.value.label = "Quản trị";
      break;
    case "student":
      queryrole.value.label = "Sinh viên";
      break;

    default:
      queryrole.value.label = "Tất cả vai trò";
      break;
  }
};
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};

const onSearch = debounce(() => {
  current.value = 1;
  userStore.getUser({
    page: current.value,
    search: valueSearch.value,
    status: queryStatus.value.value,
    role_id: queryrole.value.value,
  });
}, 500);

watch(valueSearch, onSearch);

watch(current, () => {
  navigateTo({
    query: {
      page: current.value,
    },
  });
});

useAsyncData(
  async () => {
    await userStore.getUser({
      page: current.value,
      search: valueSearch.value,
      status: queryStatus.value.value,
      role_id: queryrole.value.value,
    });
  },
  {
    immediate: true,
    watch: [current, queryStatus.value, queryrole.value],
  }
);
useAsyncData(async () => {
  isLoading.value = true;
  await userStore.getDashboardUser({
    page: current.value,
  });
  isLoading.value = false;
});

useAsyncData(
  async () => {
    await roleStore.getAllRole({
      role_id: queryrole.value.value,
    });
  },

  {
    immediate: true,
    watch: [queryrole.value],
  }
);
const showDeleteConfirm = (id) => {
  Modal.confirm({
    title:
      "Bạn có chắn muốn khôi phục trạng thái hoạt động cho người dùng này không?",

    okText: "Hoạt động",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onActiveConfirm(id);
    },
    onCancel() {},
  });
};
const onActiveConfirm = async (id) => {
  try {
    const res = await userStore.updateUser({
      id: id,
      user: {
        status: "active",
      },
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục trạng thái người dùng thành công");
      await userStore.getUser({});
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục trạng thái người dùng thất bại");
  }
};
const showBannedConfirm = (id) => {
  openModalConfirm.value = true;
  userDashboard.value = id;
  status.value = "banned";
};
const CloseModalConfirm = () => {
  openModalConfirm.value = false;
};

const columns = [
  {
    title: "Ảnh đại diện",
    dataIndex: "avatar",
    key: "avatar",
    width: "120px",
  },
  {
    title: "Thông tin liên hệ",
    dataIndex: "user_info",
    key: "user_info",
    width: "200px",
  },
  {
    title: "Địa chỉ",
    dataIndex: "address",
    key: "address",
    width: "200px",
  },
  {
    title: "Số dư",
    dataIndex: "balance_holding",
    key: "balance_holding",
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Xác thực tài khoản",
    dataIndex: "citizen_identity_card",
    key: "citizen_identity_card",
  },
  {
    title: "Google",
    dataIndex: "google_id",
    key: "google_id",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];

const CloseModalDetail = () => {
  openModalDetail.value = false;
};
const showModalDetail = (id) => {
  openModalDetail.value = true;
  userDetailId.value = id;
};
useSeoMeta({
  title: "ReadStation | Danh Sách Người Dùng",
  ogTitle: "ReadStation | Danh Sách Người Dùng",
  description: "Danhs sách người dùng",
  ogDescription: "Danhs sách người dùng",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
