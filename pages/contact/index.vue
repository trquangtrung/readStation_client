<template>
  <div class="md:py-10 h-auto mx-auto md:px-20 px-8 container">
    <Head>
      <Title>ReadStation | Liên hệ</Title>
    </Head>
    <div class="flex">
      <div
        class="flex flex-col md:flex-row overflow-hidden space-x-8 md:space-x-8"
      >
        <div class="w-full md:w-1/2 bg-orange-50 md:p-16 rounded-3xl">
          <div class="pb-5 border-b-2 border-white">
            <div class="text-5xl font-bold">Read Station</div>
            <div class="text-2xl font-semibold pt-4">ReadStation.store</div>
          </div>
          <div class="text-lg py-4">
            <div class="flex flex-col space-y-3 text-[#99918a]">
              <div>
                Cửa hàng làm việc từ Thứ Hai đến Thứ Bảy, 08:00 sáng - 10:00 tối
              </div>
              <div class="flex items-center">
                <PhoneOutlined />
                <div class="px-2">090 166 0002 – 028 6686 6486</div>
              </div>
              <div class="flex items-center">
                <MailOutlined />
                <div class="px-2">Caodang@fpt.edu.vn</div>
              </div>
              <div class="flex items-center">
                <HomeOutlined />
                <div class="px-2">
                  Lô 42, đường số 3, Công viên phần mềm Quang Trung, phường Tân
                  Chánh Hiệp, quận 12, TP HCM
                </div>
              </div>
              <div>
                <div class="text-xl font-semibold text-black">Giờ mở cửa</div>
                <div class="text-[#99918a]">
                  <div>T2 – T6: 8H sáng — 10H tối</div>
                  <div>T7: 9H sáng — 10H tối</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="w-full md:w-1/2 p-6 flex flex-col justify-center items-center bg-white rounded-3xl border border-[#e6e6e6] md:p-20"
        >
          <h1 class="text-4xl font-bold pb-6">Read Station</h1>
          <h1 class="text-4xl font-bold pb-6">có thể giúp đỡ bạn điều gì?</h1>
          <form @submit.prevent="onSubmit" class="w-full max-w-lg space-y-8">
            <div>
              <input
                type="text"
                v-model="data.name"
                required
                placeholder="Tên của bạn"
                class="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <input
                type="email"
                required
                v-model="data.email"
                placeholder="E-mail của bạn"
                class="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <textarea
                v-model="data.content"
                required
                placeholder="Phản hồi của bạn"
                class="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 h-40 resize-none"
              ></textarea>
            </div>
            <div class="flex items-center justify-between">
              <a-button
                class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary"
                size="large"
                :loading="baseStore.isSubmitting"
                html-type="submit"
              >
                Gửi phản hồi
              </a-button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const baseStore = useBaseStore();
const data = ref({
  name: "",
  email: "",
  content: "",
});
const onSubmit = async () => {
  await baseStore.createContact(data.value);
  console.log(data.value);
  message.success("Gửi phản hồi thành công");
  navigateTo("/")
};
</script>

<style scoped></style>
