<template>
  <div class="space-y-5">
    <Head>
      <Title>ReadStation | Xác thực HS/SV</Title>
    </Head>
    <h3 class="font-bold mb-5">Xác thực HS/SV</h3>
    <div
      class="flex flex-col space-y-10 items-center bg-white shadow-md rounded-md pb-10"
    >
      <img
        class="w-auto h-[450px] object-fill"
        src="/assets/images/discount-student.png"
        alt=""
      />
      <div class="grid grid-cols-8 justify-items-center">
        <div class="col-start-2 col-span-6 text-center text-xl">
          Để hỗ trợ học sinh, sinh viên trong quá trình học tập. <br> ReadStation sẽ miễn phí hoàn toàn việc thuê sách thuộc danh mục giáo dục. 
          Các sách miễn phí bao gồm  tất cả các sách phục vụ học tập và nghiên cứu của học sinh, sinh viên.
        </div>
      </div>
      <NuxtLink to="/account/verify/camera-student">
        <a-button
          class="bg-orange-500 border-none !text-white rounded-lg h-10 px-32"
        >
          Xác thực ngay
        </a-button>
      </NuxtLink>
    </div>
  </div>
</template>
