<template>
  <div class="space-y-5">
    <Head>
      <Title>ReadStation | Xác thực CMT/CCCD</Title>
    </Head>
    <h3 class="font-bold mb-5">Xác thực CMT/CCCD</h3>
    <div
      class="flex flex-col space-y-10 items-center bg-white shadow-md rounded-md pb-10 min-h-[400px]"
    >
      <img
        class="w-auto h-auto object-fill pt-10"
        src="/assets/images/confirm-account.png"
        alt=""
      />
      <div class="grid grid-cols-8 justify-items-center">
        <div class="col-start-2 col-span-6 text-center text-xl space-y-4">
          <div class="text-3xl font-semibold ">Hoàn tất quá trình xác thực</div>
          <div>Quá trình xác thực tài khoản của bạn đã hoàn tất.</div>
          <div>
            Chúng tôi sẽ cần 24-48 giờ để hoàn tất quy trình xác thực cuối cùng.
          </div>
          <div>
            Cám ơn bạn vì đã sử dụng dịch vụ của chúng tôi.
          </div>
        </div>
      </div>
      <NuxtLink to="/">
        <a-button
          class="bg-orange-500 border-none !text-white rounded-lg h-10 px-32"
        >
          Quay lại trang chủ
        </a-button>
      </NuxtLink>
    </div>
  </div>
</template>
