<template>
    <div>
        <NuxtLink href="product/1">
            <div class="p-5 border-2 rounded-lg overflow-hidden bg-white">
                <div class="flex flex-col gap-3">
                    <!-- Hình -->
                    <div>
                        <div class="overflow-hidden">
                            <img src="https://salt.tikicdn.com/cache/280x280/ts/product/0c/ff/1f/091c739d2cc4c1b2a3a9c5025930adcc.jpg.webp"
                                alt="" />
                        </div>
                        <div class="w-28 mt-3">
                            <img class=""
                                src="https://salt.tikicdn.com/ts/tka/69/cf/22/1be823299ae34c7ddcd922e73abd4909.png"
                                alt="" />
                        </div>
                    </div>
                    <!-- Content -->
                    <div class="h-auto flex">
                        <div class="text-left flex flex-col gap-2">
                            <div class=" uppercase text-[gray]">
                                Lâm Minh Chánh
                            </div>
                            <div class="">
                                <p class="line-clamp-2 ">
                                    Sách Tài Chính Cá Nhân Cho Người Việt Nam - Tặng
                                    Khóa học Online về Tài chính
                                </p>
                            </div>
                            <div class="flex justify-start items-center gap-2 ">
                                <h1>Giá bìa : </h1>
                                <span class="font-extrabold text-[#ff4c57]">200.000 VNĐ</span>
                            </div>
                        </div>
                    </div>
                    <!-- Đánh giá -->
                    <div class="border-t-2 border-gray-200">
                        <div class="flex justify-start items-center gap-4 mt-2">
                            <div>Đánh giá</div>
                            <div class="flex justify-center items-center gap-1">
                                <CommonStar rating="5"/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </NuxtLink>
    </div>
</template>
