<template>
    <a-modal v-model:open="props.openModal" style="width: 500px;" :footer="null" :onCancel="handleClose">
        <div class="flex flex-col gap-2">
            <h1 class="text-base font-semibold">Lý do hủy đơn hàng</h1>
            <a-textarea v-model:value="reason_cancel" :rows="4" />
        </div>
        <div class="flex justify-end items-center gap-2 mt-5">
            <a-button type="primary" @click="handSend">Gửi</a-button>
        </div>
    </a-modal>
</template>

<script setup>
const props = defineProps({
    openModal: Boolean,
    CloseModal: Function,
    orderId: Number,
});
const open = ref(props.openModal);
watch(
    () => props.openModal,
    (newVal) => {
        open.value = newVal;
    }
);
const handleClose = () => {
    props.CloseModal();
};
const reason_cancel = ref("");
const orderStore = useOrderStore();
const handSend = async () => {
    try {
        const res = await orderStore.updateOrderStatus({
            id: props.orderId,
            body: {
                status: "canceled",
                reason_cancel: reason_cancel.value
            }
        })
        if (res.data._rawValue?.status == true) {
            message.success("Hủy đơn hàng thành công");
        } else {
            errors.value = res.data._rawValue?.errors;
            message.error(res.data._rawValue?.errors);
        }
    } catch (error) {
        message.error("Hủy thất bại");
        console.error(error);
    }
    handleClose();
};
</script>