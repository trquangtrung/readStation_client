<template>

  <Head>
    <Title>ReadStation | Tạo phiếu nhập hàng</Title>
    <Meta name="description" content="Tạo phiếu nhập hàng" />
    <Meta property="og:title" content="ReadStation | Tạo phiếu nhập hàng" />
    <Meta property="og:description" content="Tạo phiếu nhập hàng" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">Tạo phiếu nhập hàng</h5>
      </div>
    </div>
    <div class="mb-4 space-y-1" v-if="errors">
      <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
    </div>
    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <form @submit.prevent="createInvoiceEnter">
        <div class="flex flex-col gap-5">
          <div class="grid grid-cols-4 gap-4">
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold" for="">Tên phiếu nhập hàng <span
                  class="text-red-500">*</span></label>
              <a-input v-model:value="valueInvoiceEnter.invoice_name" type="text" placeholder="Tên phiếu nhập hàng"
                style="height: 40px" required />
            </div>
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold" for="">Nhà cung cấp <span class="text-red-500">*</span></label>
              <a-select v-model:value="valueInvoiceEnter.supplier_id" :options="options" size="large"
                placeholder="Công ty ABC" required></a-select>
            </div>
          </div>
          <div class="grid mt-5">
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold" for="">Mô tả <span class="text-red-500">*</span></label>
              <a-textarea required v-model:value="valueInvoiceEnter.invoice_description" rows="4"
                placeholder="Nhập mô tả" />
            </div>
          </div>
          <div>
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold">Tìm kiếm sản phẩm</label>
              <div class="flex">
                <a-dropdown :open="valueSearch != ''">
                  <a-input v-model:value="valueSearch" placeholder="Nhập tên sách để tìm kiếm" class="h-10" allow-clear
                    @click.prevent>
                    <template #prefix>
                      <SearchOutlined />
                    </template>
                  </a-input>
                  <template #overlay>
                    <a-menu class="overflow-auto max-h-[400px]">
                      <a-menu-item v-if="bookDetailStore.isLoading">
                        <div class="p-10 flex justify-center">
                          <a-spin />
                        </div>
                      </a-menu-item>
                      <a-menu-item v-else v-for="(items, index) in bookDetailStore
                        ?.getAllBookdetailAdmin?.books" :key="index">
                        <div class="grid grid-cols-5 gap-5 items-center"
                          v-if="bookDetailStore?.getAllBookdetailAdmin?.books" @click="pushBook(items?.id)">
                          <div>
                            <img class="rounded-lg w-20 h-28" :src="items?.poster" alt="" />
                          </div>
                          <div class="text-base font-medium">
                            {{ items?.book?.title }}
                          </div>
                          <div class="text-base font-medium">
                            {{ items?.book?.author?.author }}
                          </div>
                          <div class="text-base font-medium">Phiên bản {{ items?.book_version
                            }}</div>
                        </div>
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <div class="flex flex-col gap-3">
              <label class="text-base font-semibold">Sản phẩm đã nhập</label>
              <a-table :columns="columns" v-model:value="valueInvoiceEnter.invoice_enter_detail" :data-source="data"
                :pagination="false">
                <template #bodyCell="{ column, record }">
                  <template v-if="column.dataIndex === 'title'">
                    <div class="flex gap-4">
                      <a>{{ record?.title }}</a>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'book_version'">
                    <div class="flex gap-4">
                      <span>{{ record?.book_version }}</span>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'quantity'">
                    <div class="flex items-center gap-3">
                      <a-input-number v-model:value="record.quantity" :min="1" 
                        @change="handleQuantityChange(record)" />
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'price'">
                    <div class="flex gap-5 items-center">
                      <span>{{
                        new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(record?.price)
                      }}</span>
                    </div>
                  </template>
                  <template v-if="column.dataIndex === 'total'">
                    <span>{{
                      new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(record?.total)
                    }}</span>
                  </template>
                  <template v-if="column.dataIndex === 'action'">
                    <a-tooltip placement="top" color="red">
                      <template #title>
                        <span>Xóa</span>
                      </template>
                      <button @click.prevent="showConfimDelete(record?.id)"
                        class="group hover:bg-[red]/20 bg-[#e4e1e1] flex items-center justify-center cursor-pointer w-8 h-8 rounded-md">
                        <UIcon class="group-hover:text-[red]" name="i-material-symbols-delete-outline" />
                      </button>
                    </a-tooltip>
                  </template>
                </template>
              </a-table>
              <div class="mt-5 flex justify-end gap-2">
                <a-button class="border">Hủy</a-button>
                <a-button class="border border-orange-400 text-orange-500" html-type="submit"
                  :submitting="invoiceEnter.isSubmitting" @click="saveDraft">Lưu nháp</a-button>
                <a-button type="primary" html-type="submit" :submitting="invoiceEnter.isSubmitting"
                  @click="saveInvoice">Lưu phiếu
                  nhập hàng</a-button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { LoadingOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import { watch } from "vue";
import debounce from "lodash.debounce";
const invoiceEnter = useInvoiceEnterStore();
const data = ref([]);
const errors = ref({})
const indicator = h(LoadingOutlined, {
  style: {
    fontSize: "24px",
  },
  spin: true,
});
const valueSearch = ref("");
console.log(valueSearch);
const options = ref([]);
const supplierStore = useSupplierStore();
useAsyncData(async () => {
  try {
    await supplierStore.getAllSupplier({
      pageSize: 1000,
    });
    options.value = supplierStore?.SupplierAdmin?.suppliers.map((supplier) => ({
      value: supplier.id,
      label: supplier.name,
    }));
  } catch (error) {
    console.error(error);
  }
});
const bookDetailStore = useBookDetailStore();
const onSearchBook = debounce(() => {
  bookDetailStore.getAllBookDetail({
    search: valueSearch.value,
  });
}, 500);
watch(valueSearch, onSearchBook);
useAsyncData(
  async () => {
    try {
      await bookDetailStore.getAllBookDetail({
        search: valueSearch.value,
      });
    } catch (error) {
      console.error(error);
    }
  },
  {
    watch: [],
  }
);
// const showConfirm = (id) => {
//   Modal.confirm({
//     title: "Bạn có chắc muốn thêm sách này vào danh sách nhập hàng không ?",
//     okText: "Có",
//     okType: "danger",
//     cancelText: "Hủy",
//     onOk() {
//       const selectedBook = bookDetailStore?.getAllBookdetailAdmin?.books.find((book) => book?.id === id);
//       console.log(selectedBook?.id);
//       const existingBook = data.value.find(
//         (item) => item.id === selectedBook?.id
//       );
//       if (!existingBook) {
//         if (selectedBook) {
//           const newData = [...data.value];
//           newData.push({
//             id: selectedBook?.id,
//             title: selectedBook?.book?.title,
//             book_version: selectedBook?.book_version,
//             sku_origin: selectedBook?.sku_origin,
//             quantity: 1,
//             price: selectedBook?.price,
//             total: selectedBook.price,
//           });
//           data.value = newData;
//         }
//       } else {
//         message.error("Sách đã được thêm");
//       }
//       valueSearch.value = "";
//     },
//     onCancel() {
//       console.log("Cancel");
//     },
//     class: "test",
//   });
// };
const pushBook = id => {
  const selectedBook = bookDetailStore?.getAllBookdetailAdmin?.books.find((book) => book?.id === id);
      console.log(selectedBook?.id);
      const existingBook = data.value.find(
        (item) => item.id === selectedBook?.id
      );
      if (!existingBook) {
        if (selectedBook) {
          const newData = [...data.value];
          newData.push({
            id: selectedBook?.id,
            title: selectedBook?.book?.title,
            book_version: selectedBook?.book_version,
            sku_origin: selectedBook?.sku_origin,
            quantity: 1,
            price: selectedBook?.price,
            total: selectedBook.price,
          });
          data.value = newData;
        }
      } else {
        message.error("Sách đã được thêm");
      }
      valueSearch.value = "";
}
const calculateTotal = () => {
  // Tính tổng của tất cả các sản phẩm trong danh sách data
  const total = data.value.reduce((sum, item) => sum + item.total, 0);

  // Cập nhật trường total trong valueInvoiceEnter
  valueInvoiceEnter.value.total = total;
};
watch(data, (newValue) => {
  calculateTotal();
}, { deep: true });
const handleQuantityChange = (record) => {
  // Tìm sản phẩm trong danh sách data
  const updatedData = data.value.map((item) => {
    if (item.id === record.id) {
      return {
        ...item,
        quantity: record.quantity,
        total: record.quantity * item.price,
      };
    }
    return item;
  });
  data.value = updatedData;
  calculateTotal();
};
const saveDraft = () => {
  valueInvoiceEnter.value.status = "draft"; // Cập nhật trạng thái là draft
};

const saveInvoice = () => {
  valueInvoiceEnter.value.status = "active"; // Cập nhật trạng thái là active
};

const valueInvoiceEnter = ref({
  invoice_name: "",
  total: "",
  invoice_description: "",
  supplier_id: "",
  status: "",
  invoice_enter_detail: [
    {
      book_detail_id: "",
      book_price: "",
      book_quantity: "",
    },
  ],
});
const createInvoiceEnter = async () => {
  try {
    const dataPost = {
      invoice_name: valueInvoiceEnter.value.invoice_name,
      total: valueInvoiceEnter.value.total,
      invoice_description: valueInvoiceEnter.value.invoice_description,
      supplier_id: valueInvoiceEnter.value.supplier_id,
      status: valueInvoiceEnter.value.status,
      invoice_enter_detail: data.value.map((item) => ({
        book_detail_id: item.id,
        book_price: item.price,
        book_quantity: item.quantity,
      })),
    };
    const res = await invoiceEnter.createInvoiceEnter(dataPost);
    if (res.data._rawValue?.status == true) {
      message.success("Thêm phiếu nhập thành công");
      navigateTo("/admin/manager-bill");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Tạo hóa đơn thất bại");
  }
};
const showConfimDelete = (id) => {
  Modal.confirm({
    title: "Bạn có chắc loại bỏ sách này ra khỏi phiếu nhập hàng?",
    okText: "Có",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      deleteBook(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const deleteBook = (id) => {
  try {
    const newData = data.value.filter((item) => item.id !== id);
    data.value = newData;
  } catch (error) {
    message.error("Xóa sách thất bại");
    console.error(error);
  }
};
const columns = [
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Phiên bản",
    dataIndex: "book_version",
    key: "book_version",
  },
  {
    title: "Mã sản phẩm",
    dataIndex: "sku_origin",
    key: "sku_origin",
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
    width: 80,
  },
  {
    title: "Giá",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    width: 200,
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];
</script>
