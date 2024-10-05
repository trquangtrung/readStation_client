<template>
    <a-modal v-model:open="props.openModal"
        :title="'Khách muốn gia hạn sách ' + (props.items?.book_details?.book?.title || '') + '? '"
        style="width: 800px;" :footer="null" :onCancel="handleClose">
        <form @submit.prevent="onSubmit">
            <div class="space-y-5 mt-5">
                <div class="flex justify-start pl-5 ">
                    <div>
                        <img class="w-36" :src="props.items?.book_details?.poster" alt="">
                    </div>
                    <div class="grid grid-cols-1 pl-12 space-y-3">
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Tên sách:</p>
                            <p class="text-base col-span-1">{{ props.items?.book_details?.book?.title }}</p>
                        </div>
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Tác giả:</p>
                            <p class="text-base col-span-1">{{ props?.items?.book_details?.book?.author?.author }}</p>
                        </div>
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Danh mục:</p>
                            <p class="text-base col-span-1">{{ props?.items?.book_details?.book?.category?.name }}</p>
                        </div>
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Ngày hết hạn cũ:</p>
                            <p class="text-base col-span-1">{{ items?.current_due_date ?
                                $dayjs(items?.current_due_date).format("DD/MM/YYYY") : '' }}</p>
                        </div>
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Chọn thêm ngày gia hạn:</p>
                            <div
                                v-if="props?.items?.book_details?.book?.category?.name === 'Sách giáo khoa' && orderStore?.getOneOrderAdmin?.data?.user?.role?.name === 'student'">
                                <a-input type="number" class="w-3/4" v-model:value="number_of_days" :min="1" :max="30"
                                    required />
                            </div>
                            <div v-else>
                                <a-input type="number" class="w-3/4" v-model:value="number_of_days" :min="1" :max="5"
                                    required />
                            </div>
                        </div>
                        <div class="grid grid-cols-3">
                            <p class="text-base font-bold col-span-2">Ngày hết hạn mới:</p>
                            <p class="text-base col-span-1">{{ items?.current_due_date ?
                                $dayjs(items?.current_due_date).add(number_of_days, 'day').format("DD/MM/YYYY") : '' }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="">
                    <h1 class="text-base">Bấm vào nút xác nhận bên dưới để hoàn tất việc gia hạn thời gian thuê sách
                    </h1>
                </div>
                <div class="">
                    <p class="text-base text-[red]">Thông tin khách cần trả sách đúng hạn để tránh các khoản phí phạt.
                        Nếu
                        có
                        bất kỳ thắc
                        mắc nào hoặc cần thêm thông tin, xin vui lòng liên hệ qua địa chỉ email của thư viện hoặc gọi
                        đến số
                        điện thoại 0987654321 để được hỗ trợ</p>
                </div>
                <div class="flex justify-end items-center gap-2">
                    <a-button @click="handleClose">Hủy</a-button>
                    <a-button type="primary" html-type="submit" :loading="orderStore.isSubmitting">Xác nhận</a-button>
                </div>
            </div>
        </form>

    </a-modal>
</template>
<script setup>
const props = defineProps({
    openModal: Boolean,
    CloseModal: Function,
    items: Object
})
const id = useRoute().params.id;
const open = ref(props.openModal);
watch(
    () => props.openModal,
    (newVal) => {
        open.value = newVal;
    }
);
watch(
    () => props.extensionBookId,
    (newVal) => {
        extensionBookId.value = newVal;
    }
);
const handleClose = () => {
    props.CloseModal();
};
const number_of_days = ref(1);
const orderStore = useOrderStore();
const onSubmit = async () => {
    try {
        const res = await orderStore.extensionOneBook({ id: props.items?.id, body: { number_of_days: number_of_days.value } });
        if (res.data._rawValue?.status == true) {
            message.success("Gia hạn sách thành công");
            handleClose();
            await orderStore.getOneOrder(id);
        } else {
            message.error(res.data._rawValue?.errors);
        }
    } catch (error) {
        message.error("Gia hạn thất bại");
        console.log(error)
    }

}
</script>