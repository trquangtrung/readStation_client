<template>
  <div
    class="bg-[url('assets/images/bg-404.svg')] w-full h-[100vh] bg-cover bg-no-repeat bg-center"
  >
    <div class="md:py-10 h-auto mx-auto md:px-20 px-8 container">
      <div class="flex flex-col items-center justify-center space-y-4">
        <div>
          <img src="/assets/images/not-found.svg" alt="" />
        </div>
        <div class="text-base max-w-[620px] text-center flex flex-col">
          <span class="font-bold text-2xl">Không tìm thấy nội dung 😓</span>
          <p>URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.</p>
          <p>
            Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì
            dùng URL đã lưu.
          </p>
        </div>
        <NuxtLink to="/" class="pt-10">
          <a-button
            type="primary"
            class="h-10 bg-rtprimary hover:!bg-rtsecondary border-none flex items-center gap-1"
            >Trở về trang chủ
            <UIcon name="i-ic-twotone-refresh" class="text-base" />
          </a-button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
