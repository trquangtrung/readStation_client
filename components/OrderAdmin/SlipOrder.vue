<template>
  <a-modal v-model:open="props.openModal" title="Cập nhật tình trạng sách" style="width: 500px" :footer="null"
    :onCancel="handleClose">
    <form @submit.prevent="onSubmit">
      <div class="mb-4 space-y-1" v-if="errors">
        <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-base">Tên sách</label>
        <a-input size="large" :value="props.data?.loan_order_detail?.book_details?.book?.title" readonly />
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-base">Tình trạng sách</label>
        <a-select show-search placeholder="Trạng thái" v-model:value="data.actual_return_condition" size="large"
          :options="options" :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur"
          @change="handleConditionChange"></a-select>
      </div>
      <div class="flex flex-col gap-2 mt-4">
        <label class="text-base">Chi tiết <span class="text-red-500">*</span></label>
        <a-textarea class="border border-gray-300 rounded-md p-2" v-model:value="data.condition" required></a-textarea>
      </div>
      <div>
        <div class="flex flex-col gap-2 mt-4"  v-if="isDisabled">
          <div class="flex gap-2 items-center">
            <label class="text-base">Lý do phạt</label>
            <a-popover v-model:open="visible" trigger="click" placement="topLeft">
              <template #content>
                <table style="
                  border-collapse: collapse;
                  width: 100%;
                  border: 1px solid black;
                ">
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      <strong> Tình trạng </strong>
                    </td>
                    <td style="padding-left: 8px; border: 1px solid black">
                      <strong> Mức phạt </strong>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Mất trang
                    </td>
                    <td style="padding-left: 8px; border: 1px solid black">
                      10.000đ/tờ
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Làm bẩn, viết vẽ bẩn lên sách
                    </td>
                    <td style="padding-left: 8px; border: 1px solid black">
                      2.000đ/tờ
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Làm bong bìa
                    </td>
                    <td style="padding-left: 8px; border: 1px solid black">
                      15.000đ/1 cuốn
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Làm rách sách
                    </td>
                    <td rowspan="3" style="padding-left: 8px; border: 1px solid black">
                      30.000đ/ sách
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Làm ướt sách
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-left: 8px; border: 1px solid black">
                      Bóc nhãn, phiếu ghi chú trên sách
                    </td>
                  </tr>
                </table>
              </template>

              <Icon icon="heroicons:eye" class="group-hover:text-[#212122] w-5 h-5" />
            </a-popover>
          </div>
          <a-select show-search placeholder="Lý do phạt" size="large" :options="penaltyReason"
            :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
        </div>
        <div v-if="data.penalty_reason == 1 || data.penalty_reason == 2" class="flex flex-col gap-2 mt-4">
          <label class="text-base">Số tờ hư hại</label>
          <a-input size="large" placeholder="Số tờ hư hại" v-model:value="page" number :min="1" />
        </div>
        <div class="flex flex-col gap-2 mt-4" v-if="isShowFineAmount || isDisabled ">
          <label class="text-base">Số tiền phạt</label>
          <a-input size="large" placeholder="Số tiền phạt" v-model:value="data.fine_amount" readonly />
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <a-button type="default" @click="handleClose">Hủy</a-button>
        <a-button type="primary" html-type="submit" :loading="returnHistoryStore.isSubmitting">Cập nhật</a-button>
      </div>
    </form>
  </a-modal>
</template>
<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";
const errors = ref({});
const visible = ref(false);
const route = useRoute();
const id = route.params.id;
const props = defineProps({
  openModal: Boolean,
  CloseModal: Function,
  data: Object,
});
const open = ref(props.openModal);
const returnHistoryStore = useReturnHistoryStore();
watch(
  () => props.openModal,
  (value) => {
    open.value = value;
  }
);
const handleClose = () => {
  open.value = false;
  props.CloseModal();
};
const options = ref([
  {
    value: "excellent",
    label: "Xuất sắc",
  },
  {
    value: "good",
    label: "Tốt",
  },
  {
    value: "fair",
    label: "Trung bình",
  },
  {
    value: "poor",
    label: "Kém",
  },
  {
    value: "damaged",
    label: "Hư hỏng",
  },
  {
    value: "lost",
    label: "Mất",
  },
]);
const penaltyReason = ref([
  {
    value: "1",
    label: "Mất trang",
  },
  {
    value: "2",
    label: "Làm bẩn, viết vẽ bẩn lên sách",
  },
  {
    value: "3",
    label: "Làm bong bìa",
  },
  {
    value: "4",
    label: "Làm rách sách",
  },
  {
    value: "5",
    label: "Làm ướt sách",
  },
  {
    value: "6",
    label: "Bóc nhãn, phiếu ghi chú trên sách",
  },
]);
const page = ref(1);
const data = ref({
  condition: "",
  fine_amount: 0,
  actual_return_condition: "",
  penalty_reason: "",
});
const onSubmit = async () => {
  try {
    const res = await returnHistoryStore.updateReturnHistory({
      id: props.data?.id,
      dataUpdateReturnHistory: data.value,
    });
    if (res.data._rawValue?.status == true) {
      message.success("Cập nhật sách thành công");
      handleClose();
      await returnHistoryStore.getOneReturnHistory(id);
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Cập nhật trả sách thất bại");
    console.error(error);
  }
};
const isDisabled = ref(false);
const isShowFineAmount = ref(false);
const handleConditionChange = (value) => {
  if (value === 'excellent' || value === 'good') {
    isDisabled.value = false;
    isShowFineAmount.value = false;
    data.value.penalty_reason = "";
    data.value.fine_amount = 0;
    data.value.condition = "";
  } else if (value === 'lost') {
    isDisabled.value = false;
    isShowFineAmount.value = true;
    data.value.fine_amount = props.data?.loan_order_detail?.deposit_fee;
    data.value.condition = "";
  } else {
    isDisabled.value = true;
    data.value.fine_amount = 0;
    data.value.condition = "";
  }
};
const handleChange = (value) => {
  data.value.penalty_reason = value;
  switch (value) {
    case "1":
      data.value.fine_amount = 10000 * page.value;
      break;
    case "2":
      data.value.fine_amount = 2000 * page.value;
      break;
    case "3":
      data.value.fine_amount = 15000;
      break;
    case "4":
      data.value.fine_amount = 30000;
      break;
    case "5":
      data.value.fine_amount = 30000;
      break;
    case "6":
      data.value.fine_amount = 30000;
      break;
    default:
      data.value.fine_amount = 0;
      break;
  }
  if (data.value.fine_amount > props.data?.loan_order_detail?.deposit_fee) {
    data.value.fine_amount = props.data?.loan_order_detail?.deposit_fee;
  }
};

watch(
  () => page.value,
  (value) => {
    if (data.value.penalty_reason == 1 || data.value.penalty_reason == 2) {
      handleChange(data.value.penalty_reason);
    }
  }
);

const handleBlur = () => {
  console.log("blur");
};
const handleFocus = () => {
  console.log("focus");
};
const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
