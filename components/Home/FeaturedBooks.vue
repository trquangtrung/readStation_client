import dayjs from 'dayjs';
<template>
  <div class="bg-orange-100">
    <div class="px-5 py-7">
      <div class="flex justify-between gap-20 w-full h-auto mx-auto container md:px-20 px-8">
        <!-- left -->
        <div class="flex flex-col gap-10 w-1/2">
          <div class="flex flex-col justify-start gap-5">
            <h1 class="text-3xl font-bold">Sách đặc sắc</h1>
            <h1 class="text-balck">
              Sách này là một tác phẩm đặc sắc, kết hợp văn học và triết học một
              cách tinh tế. Tác giả đã tạo nên một thế giới đầy màu sắc và nhân
              vật sâu sắc, đưa độc giả vào cuộc phiêu lưu đầy ý nghĩa và suy tư.
              Đây không chỉ là một cuốn sách giải trí mà còn là một nguồn cảm
              hứng vô tận.
            </h1>
          </div>
          <div class="bg-white rounded-lg h-auto">
            <div class="p-5 w-full flex justify-center gap-10">
              <div class="w-1/2 pt-16">
                <NuxtLink
                  :to="`/products/${getFeauturedBooks?.getbookFeatured?.bookBanner?.book?.slug}-${getFeauturedBooks?.getbookFeatured?.bookBanner?.id}`">
                  <img class="rounded-xl" :src="getFeauturedBooks?.getbookFeatured?.bookBanner?.poster
                    " alt="" />
                </NuxtLink>
              </div>
              <div class="w-1/2 flex flex-col gap-5">
                <div class="flex justify-start gap-4">
                  <div class="w-16 h-14">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4XvFQkfMWEm-2hwoGI7UA8BT3jDzHHJJgR2HeIGECfpVdyZn"
                      alt="" />
                  </div>
                  <div class="flex flex-col gap-2">
                    <NuxtLink
                      :to="`/products/${getFeauturedBooks?.getbookFeatured?.bookBanner?.book?.slug}-${getFeauturedBooks?.getbookFeatured?.bookBanner?.id}`"
                      class="text-xl font-bold">
                      {{
                        getFeauturedBooks?.getbookFeatured?.bookBanner?.book
                          ?.title
                      }}
                    </NuxtLink>
                    <h1 class="text-violet-400">
                      {{
                        getFeauturedBooks?.getbookFeatured?.bookBanner?.book
                          ?.category?.name
                      }}
                    </h1>
                  </div>
                </div>
                <div class="flex flex-col gap-5">
                  <div>
                    <h1 class="text-xl font-bold">Mô tả</h1>
                  </div>
                  <div class="line-clamp-5"
                    v-html="getFeauturedBooks?.getbookFeatured?.bookBanner?.book?.description_summary"></div>
                  <!-- <button @click="viewMore = !viewMore"
                    class="flex justify-center items-center gap-2 text-orange-400 hover:text-orange-500 mx-auto text-sm font-normal pt-4">
                    <span>{{ viewMore ? "Rút gọn" : "Xem thêm" }}</span>
                  </button> -->
                  <div class="grid grid-cols-2 gap-1">
                    <h1 class="text-[gray]">Tác giả</h1>
                    <h1 class="text-[gray]">Xuất bản năm</h1>
                    <h1 class="font-bold">
                      {{
                        getFeauturedBooks?.getbookFeatured?.bookBanner?.book
                          ?.author?.author
                      }}
                    </h1>
                    <h1 class="font-bold">
                      {{
                        getFeauturedBooks?.getbookFeatured?.bookBanner
                          ?.publish_date
                          ? $dayjs(
                            getFeauturedBooks?.getbookFeatured?.bookBanner
                              ?.publish_date
                          ).format("DD/MM/YYYY")
                          : ""
                      }}
                    </h1>
                  </div>
                </div>
                <div class="flex justify-between items-center">
                  <h1 class="font-bold text-xl">
                    {{
                      getFeauturedBooks?.getbookFeatured?.book_detail?.price
                        ? new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          getFeauturedBooks?.getbookFeatured?.book_detail
                            ?.price
                        )
                        : ""
                    }}
                  </h1>
                  <a-button size="large" @click="() =>
                    navigateTo(
                      `/products/${getFeauturedBooks?.getbookFeatured?.bookBanner?.book?.slug}-${getFeauturedBooks?.getbookFeatured?.bookBanner?.id}`
                    )
                    " type="primary" class="w-1/2 rounded-lg text-white">Xem chi tiết</a-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Right -->
        <div class="w-1/2 grid grid-cols-3 gap-4">
          <div v-for="(data, index) in getFeauturedBooks?.getbookFeatured?.books">
            <CommonHomeFeaturedBooks :data="data" :key="index" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const getFeauturedBooks = useHomeStore();
const viewMore = ref(false);
useAsyncData(async () => {
  try {
    await getFeauturedBooks.getBookFeatured();
  } catch (error) {
    console.error(error);
  }
});
</script>
