<template>

  <Head>
    <Title>ReadStation | Phiếu trả của đơn hàng
      {{
        returnHistoryStore?.ReturnLoanDetail?.loan_order_detail?.loan_order
          ?.order_code
      }}</Title>
    <Meta name="description" content="Phiếu trả của đơn hàng" />
    <Meta property="og:title" content="ReadStation | Phiếu trả của đơn hàng" />
    <Meta property="og:description" content="Phiếu trả của đơn hàng" />
  </Head>
  <h1 class="text-xl text-[#1e293b] font-bold p-3">
    Phiếu trả của đơn hàng
    {{
      returnHistoryStore?.ReturnLoanDetail?.loan_order_detail?.loan_order
        ?.order_code
    }}
  </h1>
  <div class="flex flex-col gap-5">
    <div class="w-full p-5 flex flex-col gap-4 bg-[white] rounded-lg">
      <h1 class="text-base font-bold">Thông tin khách hàng</h1>
      <div class="border border-gray-100"></div>
      <div class="grid md:grid-cols-5">
        <div class="md:col-span-2 space-y-3 border-gray-200">
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Tên khách hàng:</span>
            <span class="text-base col-span-2">
              {{
                returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                  ?.loan_order?.user?.fullname
              }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Email:</span>
            <span class="text-base col-span-2">
              {{
                returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                  ?.loan_order?.user?.email
              }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Số điện thoại:</span>
            <span class="text-base col-span-2">
              {{
                returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                  ?.loan_order?.user?.phone
              }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full p-5 flex flex-col gap-4 bg-[white] rounded-lg">
      <div class="flex justify-between items-center">
        <h1 class="text-base font-bold">Thông tin phiếu trả</h1>
        <div v-if="returnHistoryStore?.ReturnLoanDetail?.status === 'completed'">
          <span class="text-tag-text-05 bg-tag-bg-05 p-2 rounded-lg flex justify-center items-center">
            Hoàn thành</span>
        </div>
        <div v-if="returnHistoryStore?.ReturnLoanDetail?.status === 'lost'">
          <span class="text-tag-text-06 bg-tag-bg-06 p-2 rounded-lg flex justify-center items-center">
            Đã Mất</span>
        </div>
      </div>
      <div class="border border-gray-100"></div>
      <div class="grid md:grid-cols-5">
        <div class="md:col-span-2 space-y-3 border-r border-gray-200">
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Ngày khách trả sách:</span>
            <span class="text-base col-span-2">{{
              returnHistoryStore?.ReturnLoanDetail?.return_date ?
                $dayjs(returnHistoryStore?.ReturnLoanDetail?.return_date).format(
                  "DD/MM/YYYY - HH:mm"
                ) : ''
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Hình thức trả sách:</span>
            <span class="text-base col-span-2" v-if="
              returnHistoryStore?.ReturnLoanDetail?.return_method ===
              'library'
            ">
              Trả sách tại thư viện</span>
            <span class="text-base col-span-2" v-if="
              returnHistoryStore?.ReturnLoanDetail?.return_method === 'pickup'
            ">Trả sách tại nhà</span>
          </div>
          <div class="grid grid-cols-3" v-if="
            returnHistoryStore?.ReturnLoanDetail?.return_method === 'pickup'
          ">
            <span class="text-base font-bold col-span-1">Địa chỉ lấy sách:</span>
            <span class="text-base col-span-2">{{
              returnHistoryStore?.ReturnLoanDetail?.pickup_info?.address
            }}</span>
          </div>
          <div class="grid grid-cols-3" v-if="
            returnHistoryStore?.ReturnLoanDetail?.return_method === 'pickup'
          ">
            <span class="text-base font-bold col-span-1">Ngày lấy sách:</span>
            <span class="text-base col-span-2">{{
              returnHistoryStore?.ReturnLoanDetail?.pickup_date ?
                $dayjs(returnHistoryStore?.ReturnLoanDetail?.pickup_date).format(
                  "DD/MM/YYYY - HH:MM"
                ) : ''
            }}</span>
          </div>
          <div class="grid grid-cols-3">
            <span class="text-base font-bold col-span-1">Ngày trả sách đến TV:</span>
            <span class="text-base col-span-2">{{
              returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                ?.current_due_date ?
                $dayjs(
                  returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                    ?.current_due_date
                ).format("DD/MM/YYYY - HH:MM") : ''
            }}</span>
          </div>
        </div>
        <div class="md:col-span-2 space-y-3 ml-5">
          <div class="grid grid-cols-5">
            <span class="text-base font-bold col-span-2">Phí giao trả sách:</span>
            <span class="text-base col-span-3">
              {{
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(
                  returnHistoryStore?.ReturnLoanDetail?.return_shipping_fee
                )
              }}
            </span>
          </div>
          <div class="grid grid-cols-5">
            <span class="text-base font-bold col-span-2">Tình trạng sách:</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'excellent'">
              Xuất sắc</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'good'">
              Tốt</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'fair'">
              Trung bình</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'poor'">
              Kém</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'damaged'">
              Hư hỏng</span>
            <span class="text-base col-span-3"
              v-if="returnHistoryStore?.ReturnLoanDetail?.actual_return_condition === 'lost'">
              Mất</span>
          </div>
          <div class="grid grid-cols-5">
            <span class="text-base font-bold col-span-2">Mô tả tình trạng sách:</span>
            <span class="text-base col-span-3">
              {{ returnHistoryStore?.ReturnLoanDetail?.condition }}</span>
          </div>
          <div class="grid grid-cols-5">
            <span class="text-base font-bold col-span-2">Phí phạt:</span>
            <span class="text-base col-span-3"> {{
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(
                returnHistoryStore?.ReturnLoanDetail?.fine_amount
              )
            }}</span>
          </div>
          <div class="grid grid-cols-5">
            <span class="text-base font-bold col-span-2">Người xử lý:</span>
            <span class="text-base col-span-3">
              {{
                returnHistoryStore?.ReturnLoanDetail?.processed_by?.fullname
              }}</span>
          </div>
        </div>
        <div class="md:col-span-1 space-y-3 ml-5" v-if="returnHistoryStore?.ReturnLoanDetail?.status === 'pending'">
          <a-button @click="showSlip(returnHistoryStore?.ReturnLoanDetail)"
            class="border-orange-500 text-orange-500">Cập nhật tình trạng sách</a-button>
        </div>
      </div>
    </div>
    <OrderAdminSlipOrder :openModal="openModalSlip" :CloseModal="CloseSlip" :data="dataReturn" />
    <div class="w-full p-5 flex flex-col gap-4 bg-[white] rounded-lg">
      <h1 class="text-base font-bold">Thông tin sách</h1>
      <div>
        <div class="border-t-2 border-b-2 border-gray-200 p-5 space-y-3">
          <div class="flex gap-2 items-center">
            <h1 class="text-base font-bold">
              {{
                returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                  ?.book_details?.book?.title
              }}
              - Phiên bản năm
              {{
                returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                  ?.book_details?.book_version
              }}
            </h1>
          </div>
          <div class="flex gap-5">
            <img class="w-32 h-48" :src="returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
              ?.book_details?.poster
              " alt="" />
            <div class="grid md:grid-cols-3">
              <div class="md:col-span-2 space-y-3 border-r border-gray-200">
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold">Ngày trả dự kiến:</span>
                  <span v-if="
                    returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                      ?.current_due_date
                  " class="text-base">{{
                    $dayjs(
                      returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                        ?.current_due_date
                    ).format("DD/MM/YYYY - HH:MM")
                  }}</span>
                </div>
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold">Ngày trả thực tế:</span>
                  <span v-if="
                    returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                      ?.return_date
                  " class="text-base">{{
                    $dayjs(
                      returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                        ?.return_date
                    ).format("DD/MM/YYYY - HH:MM")
                  }}
                  </span>
                </div>
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold">Hình thức trả sách:</span>
                  <span class="text-base col-span-2" v-if="
                    returnHistoryStore?.ReturnLoanDetail?.return_method ===
                    'library'
                  ">
                    Trả sách tại thư viện</span>
                  <span class="text-base col-span-2" v-if="
                    returnHistoryStore?.ReturnLoanDetail?.return_method ===
                    'pickup'
                  ">Trả sách tại nhà</span>
                </div>
              </div>
              <div class="md:col-span-1 space-y-3 ml-5">
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold col-span-2">Tiền cọc sách:</span>
                  <span class="text-base col-span-1">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                          ?.deposit_fee
                      )
                    }}
                  </span>
                </div>
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold col-span-2">Phí dịch vụ:</span>
                  <span class="text-base col-span-1">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                          ?.service_fee
                      )
                    }}</span>
                </div>
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold col-span-2">Phí trễ hạn:</span>
                  <span class="text-base col-span-1">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        returnHistoryStore?.ReturnLoanDetail?.loan_order_detail
                          ?.fine_amount
                      )
                    }}</span>
                </div>
                <div class="grid grid-cols-3">
                  <span class="text-base font-bold col-span-2">Phí gia hạn:</span>
                  <span class="text-base col-span-1">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(
                        returnHistoryStore?.ReturnLoanDetail?.loan_order_detail?.extensions_details.reduce(
                          (acc, curr) => acc + parseFloat(curr.extension_fee),
                          0
                        )
                      )
                    }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end">
        <a-button @click="() => $router.back()">Trở về</a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const openModalSlip = ref<boolean>(false);
const route = useRoute();
const id = route.params.id;
const dataReturn = ref();
const showSlip = (data) => {
  dataReturn.value = data;
  openModalSlip.value = true;
};
const CloseSlip = () => {
  openModalSlip.value = false;
};
const returnHistoryStore = useReturnHistoryStore();
useAsyncData(async () => {
  try {
    await returnHistoryStore.getOneReturnHistory(id);
  } catch (error) {
    console.log(error);
  }
});
</script>
