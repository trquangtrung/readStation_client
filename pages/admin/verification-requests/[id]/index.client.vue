<template>
  <div class="space-y-2">
    <Head>
      <Title
        >ReadStation |
        {{
          verificationRequestsStore.oneVerificationRequest?.user_request
            ?.fullname
        }}</Title
      >
      <Meta
        name="description"
        :content="
          verificationRequestsStore.oneVerificationRequest?.user_request
        "
      />
      <Meta
        property="og:title"
        :content="`ReadStation | ${verificationRequestsStore.oneVerificationRequest?.user_request?.fullname}`"
      />
      <Meta
        property="og:description"
        :content="
          verificationRequestsStore.oneVerificationRequest?.user_request
            ?.fullname
        "
      />
    </Head>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Xác thực tài khoản</h5>
      </div>
    </div>

    <!-- Đây là phần code mẫu body -->
    <div class="bg-[white] rounded-lg h-auto w-full flex flex-col gap-3 p-5">
      <div class="flex justify-between">
        <div class="flex justify-start gap-3 items-center">
          <span class="text-2xl font-bold">Thông tin cá nhân</span>
        </div>
      </div>
      <div class="grid md:grid-cols-2 gap-5">
        <div class="md:col-span-1 space-y-3 border-r border-gray-200">
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Vai trò: </span>
            <span class="text-base col-span-2">
              <a-tag
                :bordered="false"
                v-if="
                  verificationRequestsStore.oneVerificationRequest?.user_request
                    ?.role?.name === UserRole.ADMIN
                "
                class="bg-tag-bg-04 text-tag-text-04"
              >
                Quản trị
              </a-tag>

              <a-tag
                :bordered="false"
                v-if="
                  verificationRequestsStore.oneVerificationRequest?.user_request
                    ?.role?.name === UserRole.USER
                "
                class="bg-tag-bg-02 text-tag-text-02"
              >
                Khách hàng
              </a-tag>

              <a-tag
                :bordered="false"
                v-if="
                  verificationRequestsStore.oneVerificationRequest?.user_request
                    ?.role?.name === UserRole.STUDENT
                "
                class="bg-tag-bg-01 text-tag-text-01"
              >
                Sinh viên
              </a-tag>
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Họ và tên: </span>
            <span class="text-base">{{
              verificationRequestsStore.oneVerificationRequest?.user_request
                ?.fullname
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Ngày sinh: </span>
            <span
              v-if="
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.dob
              "
              class="text-base"
            >
              {{
                dayjs(
                  verificationRequestsStore.oneVerificationRequest?.user_request
                    ?.dob
                ).format(" DD/MM/YYYY")
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Giới tính: </span>
            <span
              v-if="
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.gender
              "
              class="text-base"
            >
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.gender === "male"
                  ? "Nam"
                  : "Nữ"
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Số điên thoại: </span>
            <span
              v-if="
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.phone
              "
              class="text-base"
            >
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.phone
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Email: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.email
              }}
            </span>
          </div>
        </div>
        <div class="md:col-span-1 space-y-3">
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Công việc: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.job
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold"
              >Tỉnh/ Thành phố:
            </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.ward?.district?.province?.ProvinceName
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Quận/ Huyện: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.ward?.district?.DistrictName
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Phường/ Xã: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.ward?.WardName
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Đường: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.street
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Địa chỉ cụ thể: </span>
            <span class="text-base">
              {{
                verificationRequestsStore.oneVerificationRequest?.user_request
                  ?.address_detail
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold">Thời gian tạo: </span>
            <span
              v-if="
                verificationRequestsStore.oneVerificationRequest?.created_at
              "
              class="text-base"
            >
              {{
                dayjs(
                  verificationRequestsStore.oneVerificationRequest?.created_at
                ).format(" DD/MM/YYYY HH:mm:ss")
              }}
            </span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base col-span-1 font-bold"
              >Thời gian xử lý:
            </span>
            <span
              v-if="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_date
              "
              class="text-base"
            >
              {{
                dayjs(
                  verificationRequestsStore.oneVerificationRequest
                    ?.verification_date
                ).format(" DD/MM/YYYY HH:mm:ss")
              }}
            </span>
            <span v-else>Chưa xử lý</span>
          </div>
          <div
            v-if="
              verificationRequestsStore.oneVerificationRequest?.status ===
              'rejected'
            "
            class="grid grid-cols-3"
          >
            <span class="text-base col-span-1 font-bold">Lý do từ chối: </span>
            <span class="text-base">
              {{ verificationRequestsStore.oneVerificationRequest?.reason }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 py-5">
      <div
        v-if="
          verificationRequestsStore.oneVerificationRequest
            ?.verification_card_type === 'citizen_card'
        "
        class="text-xl text-[#1e293b] font-bold pb-4"
      >
        Thông tin căn cước
      </div>
      <div v-else class="text-xl text-[#1e293b] font-bold pb-4">
        Thông tin khách cung cấp
      </div>
      <div
        v-if="
          verificationRequestsStore.oneVerificationRequest
            ?.verification_card_type === 'citizen_card'
        "
        class="grid grid-cols-4 gap-4"
      >
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Họ tên khai sinh
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.citizen_name
              "
              class="w-full h-10"
              placeholder="Nhập họ tên khai sinh"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            CMT/CCCD
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.citizen_code
              "
              class="w-full h-10"
              placeholder="Nhập số CMT/CCCD"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Ngày cấp
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.date_of_issue
              "
              class="w-full h-10"
              type="date"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Nơi cấp
          </label>

          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.place_of_issue
              "
              class="w-full h-10"
              placeholder="Nhập nơi cấp"
              readonly
            />
          </div>
        </div>
      </div>
      <div v-else class="grid grid-cols-4 gap-4">
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Họ tên khai sinh
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.student_name
              "
              class="w-full h-10"
              placeholder="Nhập họ tên khai sinh"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Mã số sinh viên
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.student_code
              "
              class="w-full h-10"
              placeholder="Nhập số CMT/CCCD"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Thời hạn thẻ
          </label>
          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.student_card_expired
              "
              class="w-full h-10"
              type="date"
              readonly
            />
          </div>
        </div>
        <div class="pb-2">
          <label for="email" class="block text-sm font-bold text-gray-700">
            Trường
          </label>

          <div class="mt-1">
            <a-input
              :value="
                verificationRequestsStore.oneVerificationRequest
                  ?.verification_card_info?.place_of_study
              "
              class="w-full h-10"
              placeholder="Nhập nơi cấp"
              readonly
            />
          </div>
        </div>
      </div>
      <div class="pb-2 mt-5">
        <label class="block text-sm font-bold text-gray-700">
          Hình ảnh khách hàng cung cấp
        </label>
        <div class="flex gap-2 mt-1">
          <a-image
            :width="400"
            :src="
              verificationRequestsStore.oneVerificationRequest
                ?.verification_card_image?.front
            "
            alt=""
          />
          <a-image
            :width="400"
            :src="
              verificationRequestsStore.oneVerificationRequest
                ?.verification_card_image?.back
            "
            alt=""
          />
        </div>
      </div>

      <div class="flex justify-end items-end gap-2">
        <a-button
          @click="() => navigateTo('/admin/verification-requests')"
          html-type="button"
          class="mt-4"
          >Trở về</a-button
        >
        <div
          class="flex justify-end items-end gap-2"
          v-if="
            verificationRequestsStore.oneVerificationRequest?.status ===
            'pending'
          "
        >
          <a-button
            @click="showModalConfirm('rejected')"
            danger
            html-type="button"
            class="mt-4"
            >Từ chối</a-button
          >
          <a-button
            @click="showModalConfirm('approved')"
            type="primary"
            html-type="submit"
            class="mt-4"
            >Duyệt</a-button
          >
        </div>
      </div>
      <UserAdminConfirm
        :openModalConfirm="openModalConfirm"
        :openModal="CloseModalConfirm"
        :status="status"
        :id="verificationRequestsID"
      />
    </div>
  </div>
</template>
<script setup>
import dayjs from "dayjs";
import { UserRole } from "~/types/admin/user";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const openModalConfirm = ref(false);
const verificationRequestsStore = useVerificationRequestsStore();
const route = useRoute();
const verificationRequestsID = route.params.id;
useAsyncData(async () => {
  if (verificationRequestsID) {
    await verificationRequestsStore.getOneVerificationRequest(
      verificationRequestsID
    );
  }
});
const status = ref("");
const CloseModalConfirm = () => {
  openModalConfirm.value = false;
  status.value = "";
};
const showModalConfirm = (statusModal) => {
  openModalConfirm.value = true;
  status.value = statusModal;
};
</script>
