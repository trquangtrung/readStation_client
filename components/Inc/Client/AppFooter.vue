<template>
  <div class="bg-[#f8f7fa] dark:bg-[#0f172a]">
    <div class="bg-[#282828] dark:bg-zink-700 overflow-hidden">
      <div class="mx-auto container md:px-20 px-8 py-14">
        <div class="flex justify-between md:flex-row flex-col">
          <!-- Logo -->
          <!-- <div class="w-1/2">
                            <img class="w-60" src="../../../assets/images/logo_footer.svg" alt="" />
                        </div> -->
          <div class="w-1/2 flex justify-start items-center">
            <img
              class="w-[170px]"
              src="../../../assets/images/Readstation.svg"
              alt=""
            />
          </div>
          <!-- ReadStation -->
          <div class="w-1/4 flex flex-col gap-3">
            <h1 class="text-xl font-medium uppercase text-white">
              ReadStation
            </h1>
            <ul class="flex flex-col gap-2">
              <Nuxt-link to="/rules">
                <li
                  class="text-white text-base hover:-translate-y-1 transition-transform hover:text-rtprimary"
                >
                  Điều khoản và dịch vụ
                </li>
              </Nuxt-link>
              <Nuxt-link to="/privacy-policy">
                <li
                  class="text-white text-base hover:-translate-y-1 transition-transform hover:text-rtprimary"
                >
                  Chính sách bảo mật
                </li>
              </Nuxt-link>
            </ul>
          </div>
          <!-- Phương Thức Thanh Toán -->
          <div class="w-1/4 flex flex-col gap-5">
            <h1 class="text-xl font-medium uppercase text-white">
              Phương Thức Thanh Toán
            </h1>
            <div class="flex justify-start gap-5 items-center">
              <img
                class="w-20 h-10 rounded-md hover:-translate-y-1 hover:scale-110 duration-300 bg-white p-2"
                src="/assets/images/PayOs.png"
                alt=""
              />

              <img
                class="w-20 h-10 rounded-md hover:-translate-y-1 hover:scale-110 duration-300 bg-white p-2"
                src="/assets/images/Logo-VNPAY-QR-1.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <a-layout-footer style="text-align: center" class="text-white">
        ©2024 Created by ReadStation
      </a-layout-footer>
    </div>
  </div>
</template>
