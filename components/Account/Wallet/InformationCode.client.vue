<template>
  <div>
    <a-modal
      v-model:open="props.openModal"
      :onCancel="handleClose"
      width="70%"
      :footer="null"
    >
      <h2 class="font-bold text-2xl uppercase text-center">Mã qr rút tiền</h2>
      <div class="text-center space-y-1 mt-5">
        <p>
          Cảm ơn Quý khách đã sử dụng dịch vụ của Read Station. Chúng tôi xin
          thông báo rằng yêu cầu rút tiền của Quý khách đã được xử lý thành
          công. Xin vui lòng đến thư viện trong vòng 24-48 giờ để nhận tiền. Khi
          đến thư viện, vui lòng mang theo giấy tờ tùy thân và thông báo này để
          thuận tiện cho việc xác minh và hoàn tất thủ tục.
        </p>
        <p>
          Nếu Quý khách có bất kỳ câu hỏi hoặc cần hỗ trợ thêm, xin vui lòng
          liên hệ với chúng tôi qua hộp thư của Read Station để được trợ giúp.
          Chúng tôi xin chân thành cảm ơn Quý khách vì đã tin tưởng và sử dụng
          dịch vụ của chúng tôi.
        </p>
      </div>
      <div class="space-y-3 mt-10 text-center">
        <img src="../../../assets/images/code.png" class="mx-auto" />
        <p class="font-bold text-xl">54A29C63F4</p>
      </div>
      <div class="text-xl mt-5 space-y-4">
        <div class="grid grid-cols-12">
          <span class="font-bold col-start-4 col-span-3">Tên khách hàng:</span>
          <span class="col-start-7 col-span-6"> Tôn Thất An Khương </span>
        </div>
        <!--  -->
        <div class="grid grid-cols-12">
          <span class="font-bold col-start-4 col-span-3">Số tiền:</span>
          <span class="col-start-7 col-span-6"> 100 000 </span>
        </div>
        <!--  -->
        <div class="grid grid-cols-12">
          <span class="font-bold col-start-4 col-span-3"
            >Địa chỉ thư viện:
          </span>
          <span class="col-start-7 col-span-6">
            Lô 42, đường số 3, Công viên phần mềm Quang Trung, phường Tân Chánh
            Hiệp, quận 12, TP HCM
          </span>
        </div>
        <!--  -->
        <div class="grid grid-cols-12">
          <span class="font-bold col-start-4 col-span-3">Giá trị đến:</span>
          <span class="col-start-7 col-span-6"> 20/12/2022 - 15:30 </span>
        </div>
      </div>
      <div class="flex justify-end gap-2 mt-10">
        <a-button @click="handleClose" class="h-10 rounded-lg">Trở về</a-button>
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  openModal: Boolean,
  closeModal: Function,
});
const open = ref(props.openModal);

const handleClose = async () => {
  props.closeModal();
};
</script>
