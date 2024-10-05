<template>
  <a-modal
    v-model:open="props.openModalConfirm"
    :footer="null"
    :onCancel="handleClose"
  >
    <div>
      <div class="flex flex-col items-center bg-white py-2">
        <div v-if="props.status === 'approved'" class="py-2 text-center">
          <ExclamationCircleOutlined
            v-if="status === 'active'"
            class="text-tag-text-01 mt-10 mb-5"
            style="font-size: 80px"
          />
          <span class="block text-2xl font-medium text-tag-text-01 my-2">
            Xác thực tài khoản
          </span>
          <span
            for="email"
            class="block text-base font-medium text-tag-text-07 my-2"
          >
            Bạn có chắc chắn muốn xác thực tài khoản này?
          </span>
        </div>
        <div v-if="props.status === 'rejected'" class="py-2 text-center">
          <ExclamationCircleOutlined
            v-if="status === 'active'"
            class="text-tag-text-01 mt-10 mb-5"
            style="font-size: 80px"
          />
          <span class="block text-2xl font-medium text-tag-text-01 my-2">
            Từ chối xác thực tài khoản
          </span>
          <span class="block text-base font-medium text-tag-text-07 my-2">
            Bạn có chắc chắn muốn từ chối xác thực tài khoản này?
          </span>

          <span for="email" class="block text-base font-medium mt-5 mb-2">
            <span class="text-tag-text-06">*</span> Lý do từ chối
          </span>
          <div class="mt-1">
            <a-textarea v-model:value="reason" class="w-full h-10" />
          </div>
        </div>
      </div>

      <div class="flex justify-end items-end gap-2">
        <a-button @click="handleClose" danger html-type="button" class="mt-4"
          >Hủy</a-button
        >
        <a-button
          @click="handleSubmit"
          type="primary"
          html-type="submit"
          class="mt-4"
          :loading="verificationRequestsStore.isSubmitting"
          >Xác nhận</a-button
        >
      </div>
    </div>
  </a-modal>
</template>
<script setup>
const reason = ref("");
const verificationRequestsStore = useVerificationRequestsStore();
const props = defineProps({
  openModalConfirm: Boolean,
  openModal: Function,
  status: String,
  id: String,
});
const open = ref(props.openModalConfirm);

watch(
  () => props.openModalConfirm,
  (newVal) => {
    open.value = newVal;
  }
);
const handleClose = () => {
  props.openModal();
};

const handleSubmit = async () => {
  if (props.status === "rejected") {
    if (reason.value === "") {
      message.error("Vui lòng nhập lý do từ chối");
      return;
    }
    await verificationRequestsStore.updateVerificationRequestStatus({
      id: props.id,
      body: { status: "rejected", reason: reason.value },
    });
    message.success("Từ chối xác thực tài khoản thành công");
    handleClose();
  } else {
    await verificationRequestsStore.updateVerificationRequestStatus({
      id: props.id,
      body: { status: "approved" },
    });
    message.success("Xác thực tài khoản thành công");
  }
  navigateTo("/admin/verification-requests");
};
</script>
