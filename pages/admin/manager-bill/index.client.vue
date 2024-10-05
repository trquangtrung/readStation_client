<template>

  <Head>
    <Title>ReadStation | Quản lý phiếu nhập hàng</Title>
    <Meta name="description" content="Quản lý phiếu nhập hàng" />
    <Meta property="og:title" content="ReadStation | Quản lý phiếu nhập hàng" />
    <Meta property="og:description" content="Quản lý phiếu nhập hàng" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Tất cả phiếu nhập hàng
        </h5>
      </div>
    </div>

    <div class="w-full rounded-lg shadow-sm">
      <div class="flex justify-between gap-4">
        <div class="w-1/4 h-[600px] bg-white flex flex-col p-5 gap-5 rounded-lg">
          <div class="flex flex-col gap-4">
            <div class="flex flex-col">
              <h1 class="text-xl font-bold">Danh sách phiếu nhập hàng</h1>
            </div>
            <div class="flex items-center gap-2">
              <div class="relative grow">
                <div class="relative md:block hidden">
                  <div class="flex">
                    <a-input placeholder="Nhập tên phiếu nhập hàng để tìm kiếm" class="h-10">
                      <template #prefix>
                        <SearchOutlined />
                      </template>
                    </a-input>
                  </div>
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UIcon class="text-gray-500" name="i-material-symbols-search" />
                  </div>
                </div>
              </div>
              <button type="button"
                class="rounded-lg flex items-center justify-center size-[37.5px] p-0 text-orange-500 btn bg-orange-100 hover:text-white hover:bg-orange-600 focus:text-white focus:bg-orange-600 focus:ring focus:ring-orange-100 active:text-white active:bg-orange-600 active:ring active:ring-orange-100 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500 dark:hover:text-white dark:focus:bg-sky-500 dark:focus:text-white dark:active:bg-sky-500 dark:active:text-white dark:ring-sky-400/20">
                <div class="text-lg font-semibold flex items-center">
                  <UIcon name="i-material-symbols-format-list-bulleted-rounded" class="text-2xl" />
                </div>
              </button>
            </div>
          </div>
          <div v-if="isLoading" class="flex justify-center items-center min-h-[50vh]">
            <a-spin size="large" />
          </div>
          <div v-else class="h-full overflow-auto">
            <div v-for="(items, index) in inVoiceEnter?.getAllInvoiceEnterAdmin
              ?.envoiceEnters" :key="index">
              <button class="p-5 w-full hover:bg-gray-200 rounded-md" @click="id = items?.id">
                <div class="flex flex-col gap-1">
                  <div class="flex justify-between items-center">
                    <h1 class="text-base font-semibold">
                      #{{ items?.invoice_code }}
                    </h1>
                    <a-tag class="bg-tag-bg-09 text-tag-text-09" :bordered="false" v-if="items?.status === 'active'">Đã
                      lưu kho
                    </a-tag>
                    <a-tag class="bg-tag-bg-08 text-tag-text-08" :bordered="false" v-if="items?.status === 'draft'">Lưu
                      nháp
                    </a-tag>
                    <a-tag class="bg-tag-bg-07 text-tag-text-07" :bordered="false"
                      v-if="items?.status === 'canceled'">Đã hủy
                    </a-tag>
                  </div>
                  <div class="flex justify-between items-center">
                    <h1 class="text-base font-semibold text-left">
                      {{ items?.user?.fullname }}
                    </h1>
                  </div>
                  <div class="flex justify-between items-center">
                    <h1 class="text-base text-gray-500">
                      {{
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(items?.total)
                      }}
                    </h1>
                    <span class="text-base text-gray-500">{{
                      $dayjs(items?.invoice_date).format("DD/MM/YYYY")
                    }}</span>
                  </div>
                </div>
              </button>
              <a-divider class="my-2" />
            </div>
          </div>
        </div>

        <div class="w-3/4 bg-white h-auto rounded-lg">
          <div v-if="inVoiceEnter.isLoading" class="flex justify-center items-center min-h-[50vh]">
            <a-spin size="large" />
          </div>
          <div v-else class="flex flex-col p-5 gap-4" v-if="inVoiceEnter?.getOneInvoiceEnterAdmin?.id">
            <div class="flex justify-between">
              <div class="flex flex-col gap-5 md:items-center md:flex-row">
                <div class="grow">
                  <h6 class="mb-1 text-xl font-bold">
                    #{{ inVoiceEnter?.getOneInvoiceEnterAdmin?.invoice_code }}
                  </h6>
                  <ul class="flex items-center gap-3">
                    <li class="text-slate-500 dark:text-zink-200 text-sm">
                      Ngày tạo:
                      {{
                        $dayjs(
                          inVoiceEnter?.getOneInvoiceEnterAdmin?.invoice_date
                        ).format("DD/MM/YYYY")
                      }}
                    </li>
                  </ul>
                </div>
              </div>
              <div class="space-x-3" v-if="inVoiceEnter?.getOneInvoiceEnterAdmin?.status === 'draft'">
                <a-button @click="setStatus('canceled')">Hủy</a-button>
                <a-button type="primary" @click="setStatus('active')">Lưu kho</a-button>
              </div>
            </div>
            <div class="bg-gray-100 h-auto rounded-lg p-8 flex flex-col gap-3">
              <div class="grid grid-cols-1 gap-5 xl:grid-cols-12">
                <div class="text-center xl:col-span-2 ltr:xl:text-left rtl:xl:text-right">
                  <div
                    class="w-44 flex items-center justify-center mx-auto rounded-md size-16 bg-slate-100 dark:bg-zink-600 xl:mx-0">
                    <img src="../../../assets/images/logo_header.svg" alt="" class="w-full" />
                  </div>
                </div>
              </div>
              <div class="flex justify-between items-center gap-5 mt-5 px-6">
                <div class="flex flex-col gap-1 items-center">
                  <h1 class="text-sm font-bold">Tên hóa đơn</h1>
                  <span class="text-gray-500">{{
                    inVoiceEnter?.getOneInvoiceEnterAdmin?.invoice_name
                  }}</span>
                </div>
                <div class="flex flex-col gap-1 items-center">
                  <h1 class="text-sm font-bold">Nhà cung cấp</h1>
                  <span class="text-gray-500">{{
                    inVoiceEnter?.getOneInvoiceEnterAdmin?.supplier?.name
                  }}</span>
                </div>
                <div class="flex flex-col gap-1 items-center">
                  <span class="text-sm font-bold">Trạng thái</span>
                  <span v-if="
                    inVoiceEnter?.getOneInvoiceEnterAdmin?.status === 'active'
                  "
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-tag-bg-09 border-transparent text-tag-text-09 dark:bg-green-500/20 dark:border-transparent">Đã
                    lưu kho
                  </span>
                  <span v-if="
                    inVoiceEnter?.getOneInvoiceEnterAdmin?.status === 'draft'
                  "
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-tag-bg-08 border-transparent text-tag-text-08 dark:bg-green-500/20 dark:border-transparent">Lưu
                    nháp
                  </span>
                  <span v-if="
                    inVoiceEnter?.getOneInvoiceEnterAdmin?.status ===
                    'canceled'
                  "
                    class="px-2.5 py-0.5 inline-block text-xs font-medium rounded border bg-tag-bg-07 border-transparent text-tag-text-07 dark:bg-green-500/20 dark:border-transparent">Đã
                    hủy
                  </span>
                </div>
                <div class="flex flex-col gap-1 items-center">
                  <h1 class="text-sm font-bold">Tổng tiền</h1>
                  <span class="text-gray-500">
                    {{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(inVoiceEnter?.getOneInvoiceEnterAdmin?.total)
                    }}</span>
                </div>
              </div>
              <div class="grid grid-cols-1 gap-5 mt-8 md:grid-cols-2">
                <div>
                  <p class="mb-2 text-sm uppercase text-slate-500 dark:text-zink-200">
                    Địa chỉ nhận hàng
                  </p>
                  <h6 class="mb-1 text-base font-bold">Read Station</h6>
                  <p class="mb-1 text-slate-500 dark:text-zink-200">
                    Lô 42, đường số 3, Công viên phần mềm Quang Trung, phường
                    Tân Chánh Hiệp, quận 12, TP HCM
                  </p>
                  <p class="mb-1 text-slate-500 dark:text-zink-200">
                    090 166 0002 – 028 6686 6486
                  </p>
                </div>
                <div>
                  <p class="mb-2 text-sm uppercase text-slate-500 dark:text-zink-200">
                    Địa chỉ nhà cung cấp
                  </p>
                  <h6 class="mb-1 text-base font-bold">
                    {{ inVoiceEnter?.getOneInvoiceEnterAdmin?.supplier?.name }}
                  </h6>
                  <p class="mb-1 text-slate-500 dark:text-zink-200">
                    {{
                      inVoiceEnter?.getOneInvoiceEnterAdmin?.supplier?.address
                    }}
                  </p>
                  <p class="mb-1 text-slate-500 dark:text-zink-200">
                    {{ inVoiceEnter?.getOneInvoiceEnterAdmin?.supplier?.phone }}
                  </p>
                </div>
              </div>

              <div class="mt-6 overflow-x-auto">
                <table class="w-full whitespace-nowrap">
                  <thead class="">
                    <tr>
                      <th
                        class="w-full text-left pl-3 font-semibold text-slate-500 dark:text-zink-200 border-b border-slate-200 dark:border-zink-500">
                        Tên sách
                      </th>
                      <th
                        class="w-1/4 font-semibold text-slate-500 dark:text-zink-200 border-b border-slate-200 dark:border-zink-500">
                        Giá
                      </th>
                      <th
                        class="w-1/4 font-semibold text-slate-500 dark:text-zink-200 border-b border-slate-200 dark:border-zink-500">
                        Số lượng
                      </th>
                      <th
                        class="w-1/4 font-semibold text-slate-500 dark:text-zink-200 border-b border-slate-200 dark:border-zink-500">
                        Tổng cộng
                      </th>
                    </tr>
                  </thead>
                  <tbody v-for="(items, index) in inVoiceEnter
                    ?.getOneInvoiceEnterAdmin?.invoice_enter_details">
                    <tr>
                      <td class="px-3.5 py-2.5 text-left border-b border-slate-200 dark:border-zink-500">
                        <h6 class="mb-1 text-sm font-bold w-[400px] text-wrap">
                          {{ items?.book_detail?.book?.title }} - Phiên bản năm
                          {{ items?.book_detail?.book_version }}
                        </h6>
                      </td>
                      <td
                        class="px-3.5 py-2.5 text-center border-b border-slate-200 dark:border-zink-500 font-semibold">
                        {{
                          new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(items?.book_price)
                        }}
                      </td>
                      <td
                        class="px-3.5 py-2.5 text-center border-b border-slate-200 dark:border-zink-500 font-semibold">
                        {{ items?.book_quantity }}
                      </td>
                      <td
                        class="px-3.5 py-2.5 text-center border-b border-slate-200 dark:border-zink-500 font-semibold">
                        {{
                          new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(items?.book_price * items?.book_quantity)
                        }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody class="before:block before:h-3">
                    <tr>
                      <td colspan="2"></td>
                      <td class="font-bold text-base border-b border-slate-200 px-3.5 py-2.5 dark:border-zink-500">
                        Tổng tiền
                      </td>
                      <td class="font-bold text-base border-b border-slate-200 px-3.5 py-2.5 dark:border-zink-500">
                        {{
                          new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            inVoiceEnter?.getOneInvoiceEnterAdmin?.total
                          )
                        }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const inVoiceEnter = useInvoiceEnterStore();
const route = useRoute();
const query = route.query;
const id = ref(null);
const isLoading = ref(false);
console.log("🚀 ~ query.bill_id:", query.bill_id);

useAsyncData(async () => {
  isLoading.value = true;
  await inVoiceEnter.getAllInvoiceEnter({});
  isLoading.value = false;
});

useAsyncData(
  async () => {
    await inVoiceEnter.getOneInvoiceEnter(id.value);
    if (!id.value && query.bill_id === undefined) {
      id.value = inVoiceEnter?.getAllInvoiceEnterAdmin?.envoiceEnters[0]?.id;
    }
    if (!id.value && query.bill_id !== undefined) {
      id.value = query.bill_id;
    }
  },
  {
    immediate: true,
    watch: id,
  }
);
const setStatus = async (status) => {
  const res = await inVoiceEnter.updateInvoiceEnter({
    id: inVoiceEnter?.getOneInvoiceEnterAdmin?.id,
    valueInvoiceEnter: {
      status: status,
    },
  });
  if (res.data._rawValue?.status == true) {
    message.success("Cập nhật trạng thái phiêu nhập hàng thành công");
  } else {
    errors.value = res.error.value.data.errors;
    message.error("Cập nhật trạng thái phiêu nhập hàng thất bại");
  }
  await inVoiceEnter.getAllInvoiceEnter({});
};

// const total = computed(() => {
//   return inVoiceEnter?.getOneInvoiceEnterAdmin?.invoice_enter_details?.reduce(
//     (acc, item) => {
//       return acc + item.book_price * item.book_quantity;
//     },
//     0
//   );
// });
</script>
