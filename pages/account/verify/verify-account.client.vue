<template>
  <div class="space-y-5">
    <Head>
      <Title>ReadStation | Xác thực CMT/CCCD</Title>
    </Head>
    <h3 class="font-bold mb-5">Xác thực CMT/CCCD</h3>
    <div
      class="flex flex-col space-y-10 items-center bg-white shadow-md rounded-md pb-10"
    >
      <img
        class="w-full h-[550px] object-fill"
        src="/assets/images/discount-account.png"
        alt=""
      />
      <div class="grid grid-cols-8 justify-items-center">
        <div class="col-start-2 col-span-6 text-center text-xl">
          Chương trình ưu đãi tại Read Station. Khi Quý khách xác thực chứng
          minh thư/ căn cước công dân (CMT/CCCD), Quý khách sẽ nhận được ưu đãi
          giảm ngay 20% phí cọc thuê sách.
        </div>
      </div>

      <NuxtLink to="/account/verify/camera-account">
        <a-button class="bg-orange-500 border-none !text-white rounded-lg h-10 px-32">
          Xác thực ngay
        </a-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const camera = ref();
</script>
