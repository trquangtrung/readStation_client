<template>
  <a-modal
    v-model:open="open"
    width="70%"
    :footer="null"
    :onCancel="handleClose"
  >
    <div
      v-if="userStore.isLoading"
      class="flex justify-center items-center min-h-[50vh]"
    >
      <a-spin size="large" />
    </div>
    <div v-else class="space-y-5">
      <div class="flex justify-between gap-4">
        <div class="grow">
          <h1 class="font-bold text-xl">
            {{ userStore?.user?.fullname }}
          </h1>
        </div>
      </div>
      <div
        class="bg-[white] rounded-lg h-auto w-full flex flex-col gap-3 space-y-5"
      >
        <div class="grid md:grid-cols-2 gap-5">
          <div class="md:col-span-1 space-y-3 border-r border-gray-200">
            <div class="grid grid-cols-3">
              <span class="text-base col-span-1 font-bold">Vai trò: </span>
              <span class="text-base col-span-2">
                <a-tag
                  :bordered="false"
                  v-if="userStore?.user?.role?.name === UserRole.ADMIN"
                  class="bg-tag-bg-04 text-tag-text-04"
                >
                  Quản trị
                </a-tag>

                <a-tag
                  :bordered="false"
                  v-if="userStore?.user?.role?.name === UserRole.USER"
                  class="bg-tag-bg-02 text-tag-text-02"
                >
                  Khách hàng
                </a-tag>

                <a-tag
                  :bordered="false"
                  v-if="userStore?.user?.role?.name === UserRole.STUDENT"
                  class="bg-tag-bg-01 text-tag-text-01"
                >
                  Sinh viên
                </a-tag>
              </span>
            </div>
            <div class="grid grid-cols-3">
              <span class="text-base col-span-1 font-bold">Đăng nhập: </span>
              <span class="text-base">
                {{ userStore?.user?.google_id ? "Google" : "Thông thường" }}
              </span>
            </div>
            <div class="grid grid-cols-3">
              <span class="text-base col-span-1 font-bold">Ảnh đại diện: </span>
              <span class="text-base">
                <a-image
                  class="rounded-md"
                  width="60px"
                  height="60px"
                  :src="userStore?.user?.avatar"
                  alt="Ảnh đại diện"
                />
              </span>
            </div>
          </div>

          <div class="md:col-span-1 space-y-3">
            <div class="grid md:grid-cols-6 gap-5">
              <div class="col-span-4 space-y-3">
                <div class="grid grid-cols-5">
                  <span class="text-base col-span-3 font-bold"
                    >Xác thực tài khoản:
                  </span>
                  <span class="text-base col-span-2">
                    <IconTick v-if="userStore?.user?.citizen_identity_card" />
                    <IconMul v-else />
                  </span>
                </div>
                <div class="grid grid-cols-5">
                  <span class="text-base col-span-3 font-bold">Số dư: </span>
                  <span class="text-base col-span-2">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(userStore?.user?.balance_holding)
                    }}
                  </span>
                </div>

                <div class="grid grid-cols-5">
                  <span class="text-base col-span-3 font-bold"
                    >Trạng thái:
                  </span>
                  <span class="text-base col-span-2">
                    <a-tag
                      :bordered="false"
                      v-if="userStore?.user?.status === UserStatus.ACTIVE"
                      class="bg-tag-bg-09 text-tag-text-09"
                    >
                      Đang hoạt động
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else="userStore?.user?.status === UserStatus.INACTIVE"
                      class="bg-tag-bg-07 text-tag-text-07"
                    >
                      Đang ẩn
                    </a-tag>
                    <a-tag
                      :bordered="false"
                      v-else="record.status === UserStatus.BANNED"
                      class="bg-tag-bg-10 text-tag-text-10"
                    >
                      Vô hiệu hóa
                    </a-tag>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-5">
        <div
          class="md:col-span-1 space-y-3 md:border-r md:border-gray-200 md:pr-5"
        >
          <h1 class="text-2xl font-bold">Thông tin cá nhân</h1>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Họ và tên: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.fullname }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Ngày sinh: </span>
            <span v-if="userStore.user?.dob" class="text-base col-span-4"
              >{{ $dayjs(userStore.user?.dob).format("DD/MM/YYYY") }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Số điện thoại: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.phone }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Email: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.email }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Giới tính: </span>
            <span v-if="userStore.user?.gender" class="text-base col-span-4">
              {{ userStore.user?.gender === "male" ? "Nam" : "Nữ" }}
            </span>
            <span v-else></span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Công việc: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.job }}
            </span>
          </div>
        </div>

        <div class="md:col-span-1 space-y-3">
          <h1 class="text-2xl font-bold">Thông tin CMT/CCCD</h1>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">CMT/CCCD: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.citizen_identity_card?.citizen_code }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Họ tên: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.citizen_identity_card?.citizen_name }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Ngày cấp: </span>
            <span class="text-base col-span-3">
              {{
                userStore.user?.citizen_identity_card
                  ? $dayjs(
                      userStore.user?.citizen_identity_card?.date_of_issue
                    ).format(" DD/MM/YYYY ")
                  : ""
              }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Nơi cấp: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.citizen_identity_card?.place_of_issue }}
            </span>
          </div>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <div
          class="md:col-span-1 space-y-3 md:border-r md:border-gray-200 md:pr-5"
        >
          <h1 class="text-2xl font-bold">Địa chỉ</h1>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Tỉnh/Thành phố: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.province?.ProvinceName }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Quận/Huyện: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.district?.DistrictName }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Phường/Xã: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.ward?.WardName }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Đường: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.street }}
            </span>
          </div>
          <div class="grid grid-cols-6">
            <span class="text-base col-span-2 font-bold">Địa chỉ cụ thể: </span>
            <span class="text-base col-span-4">
              {{ userStore.user?.address_detail }}
            </span>
          </div>
        </div>

        <div class="md:col-span-1 space-y-3">
          <h1 class="text-2xl font-bold">Thông tin sinh viên</h1>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">ID sinh viên: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.student_id_card?.student_code }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Họ tên: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.student_id_card?.student_code }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Thời hạn thẻ: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.student_id_card?.student_card_expired }}
            </span>
          </div>
          <div class="grid grid-cols-4">
            <span class="text-base col-span-1 font-bold">Trường: </span>
            <span class="text-base col-span-3">
              {{ userStore.user?.student_id_card?.place_of_study }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup>
import { UserStatus } from "~/types/admin/user";
import { UserRole } from "~/types/admin/user";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const userStore = useUserStore();
const props = defineProps({
  userDetailId: String,
  openModalDetail: Boolean,
  openModal: Function,
});
const userDetailId = ref(props.userDetailId);
const open = ref(props.openModalDetail);
watch(
  () => props.openModalDetail,
  (newVal) => {
    open.value = newVal;
  }
);
watch(
  () => props.userDetailId,
  (newVal) => {
    userDetailId.value = newVal;
  }
);
useAsyncData(
  async () => {
    if (userDetailId.value) await userStore.getOneUser(userDetailId.value);
  },
  {
    watch: [userDetailId, open],
    initialCache: false,
  }
);
const handleClose = async () => {
  props.openModal();
};
</script>
