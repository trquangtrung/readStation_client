<template>

    <Head>
        <Title>ReadStation | Chi tiết sách {{ bookStore?.OneBookAdmin?.title }}</Title>
        <Meta name="description" content="Chi tiết sách" />
        <Meta property="og:title" content="ReadStation | Chi tiết sách" />
        <Meta property="og:description" content="Chi tiết sách" />
    </Head>
    <div>
        <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
            <div class="flex flex-col gap-5 w-full">
                <div class="bg-[white] rounded-lg h-20 w-full">
                    <div class="flex justify-between p-3">
                        <div class="flex justify-start gap-5">
                            <div>
                                <button class="w-14 h-14 rounded-full bg-orange-200">
                                    <UIcon class="text-3xl text-orange-400 items-center"
                                        name="i-material-symbols-book-4" />
                                </button>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-gray-500">Sách {{ bookStore?.OneBookAdmin?.category?.name }}</span>
                                <span class="text-lg font-bold">{{ bookStore?.OneBookAdmin?.title }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-[white] rounded-lg h-auto w-full flex flex-col gap-3 p-5">
                    <div class="flex justify-between">
                        <div class="flex justify-start gap-3 items-center">
                            <span class="text-base font-bold">Thông tin chung</span>
                            <UIcon class="text-lg text-gray-500"
                                name="i-material-symbols-draft-orders-outline-rounded" />
                        </div>
                        <div>
                            <a-button class="flex justify-center gap-2 items-center" type="primary" size="large"
                                @click="showModal(bookStore?.OneBookAdmin?.id)">
                                <UIcon class="text-lg text-white" name="i-material-symbols-edit" />
                                <span class="text-white">Chỉnh sửa</span>
                            </a-button>
                        </div>
                    </div>
                    <div class="border border-gray-100"></div>
                    <div class="grid md:grid-cols-3 gap-5">
                        <div class="md:col-span-1 space-y-2 border-r border-gray-200">
                            <div class="grid grid-cols-3">
                                <span class="font-bold text-base">Tên sách: </span>
                                <span class="text-base">{{ bookStore?.OneBookAdmin?.title }}</span>
                            </div>
                            <div class="grid grid-cols-3">
                                <span class="font-bold text-base">Tác giả: </span>
                                <span class="text-base">{{ bookStore?.OneBookAdmin?.author?.author }}</span>
                            </div>
                            <div class="grid grid-cols-3">
                                <span class="font-bold text-base">Danh mục: </span>
                                <span class="text-base">{{ bookStore?.OneBookAdmin?.category?.name }}</span>
                            </div>
                            <div class="grid grid-cols-3">
                                <span class="font-bold text-base">Tủ sách: </span>
                                <span class="text-base">{{ bookStore?.OneBookAdmin?.shelve?.bookcase?.name }}</span>
                            </div>
                            <div class="grid grid-cols-3">
                                <span class="font-bold text-base">Kệ sách: </span>
                                <span class="text-base">{{ bookStore?.OneBookAdmin?.shelve?.name }}</span>
                            </div>
                        </div>
                        <div class="md:col-span-2 space-y-3">
                            <div class="grid grid-cols-4">
                                <span class="text-base font-bold col-span-1">Mô tả: </span>
                                <span class="text-base col-span-3">{{ bookStore?.OneBookAdmin?.description_summary
                                    }}</span>
                            </div>
                            <div class="grid grid-cols-4">
                                <span class="text-base font-bold col-span-1">Mô tả chi tiết:</span>
                                <span class="text-base col-span-3" v-html="bookStore?.OneBookAdmin?.description"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <BookEdit :openModalBook="openModalBook" :openModal="CloseModal" :id="id_bookEdit" />
                <div>
                    <a-button class="flex justify-center items-center gap-2" type="primary" size="large"
                        @click="showModalAdd">
                        <UIcon class="text-lg text-white" name="i-material-symbols-add" />
                        <span class="text-white">Thêm phiên bản</span>
                    </a-button>
                </div>
                <BookDetailCreate :openModalAdd="openModalAdd" :openModal="CloseModalAdd" :book_id="bookID" />
                <!-- Phiên bản 2024 -->
                <div class="grid grid-cols-2 gap-5">
                    <div class="bg-[white] rounded-lg h-auto flex flex-col gap-3 p-4"
                        v-for="(items, index) in bookStore?.OneBookAdmin?.book_detail" :key="index">
                        <div class="flex justify-between">
                            <h1 class="text-base font-bold">Phiên bản {{ items.book_version }} - {{ items?.sku_origin }}
                            </h1>
                            <a-button @click="showModalEdit(items?.id)"
                                class="flex justify-center items-center gap-1 bg-[#344054]" type="primary" size="large">
                                <UIcon class="text-lg text-white" name="i-material-symbols-edit" />
                                <span class="text-white text-base">Chỉnh sửa</span>
                            </a-button>
                        </div>
                        <div class="border border-gray-200"></div>
                        <div class="grid grid-cols-2">
                            <div class="py-10 px-5">
                                <div class="flex justify-center items-center gap-4">
                                    <img class="w-28 h-44 object-cover" :src="items.poster" alt="">
                                    <div class="flex-flex-col items-start">
                                        <div class="p-2" v-for="(image, index) in items?.images.slice(0,3)" :key="index">
                                            <img class="w-12 h-20" :src="image" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="md:col-span-1 space-y-3 space-x-5 border-l border-gray-200">
                                <div></div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Số lượng: </span>
                                    <span class="text-base">{{ items?.stock }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Số lượng hư: </span>
                                    <span class="text-base">{{ items?.stock_broken }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Giá: </span>
                                    <span class="text-base"> {{
                                        new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(items?.price)
                                    }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Phần trăm cọc: </span>
                                    <span class="text-base"> {{
                                        items?.hire_percent
                                    }}%</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Loại bìa: </span>
                                    <span class="text-base" v-if="items?.cardboard === 'soft'">Bìa mềm</span>
                                    <span class="text-base" v-if="items?.cardboard === 'hard'">Bìa cứng</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Số trang: </span>
                                    <span class="text-base">{{ items?.total_page }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Kích thước: </span>
                                    <span class="text-base">{{ items?.book_size }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Ngôn ngữ: </span>
                                    <span class="text-base">{{ items?.language }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Người dịch: </span>
                                    <span class="text-base">{{ items?.translator }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Ngày phát hành: </span>
                                    <span class="text-base">{{ $dayjs(items?.publish_date).format("DD-MM-YYYY")
                                        }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Công ty phát hành: </span>
                                    <span class="text-base">{{ items?.issuing_company }}</span>
                                </div>
                                <div class="grid grid-cols-2 space-x-5">
                                    <span class="font-bold text-base">Đánh giá: </span>
                                    <span class="text-base">
                                        <CommonRating :rating="items?.reviews_avg ? items?.reviews_avg : 5" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BookDetailEdit :openModalEdit="openModalEdit" :openModal="CloseModalEdit"
                    :bookDetailId="itemBookDetail" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const bookStore = useBookStore();
const openModalAdd = ref<boolean>(false);
const openModalEdit = ref<boolean>(false);
const openModalBook = ref<boolean>(false);
const route = useRoute()
const bookID = route.params.id
const id_bookEdit = ref<number>();
const itemBookDetail = ref()
useAsyncData(async () => {
    try {
        if (bookID) {
            await bookStore.getOneBookAdmin(bookID);
        }
    } catch (error) {
        console.log(error);
    }
})
const showModal = (id: number) => {
    openModalBook.value = true;
    id_bookEdit.value = id;
};
const CloseModal = () => {
    openModalBook.value = false;
};
const showModalAdd = () => {
    openModalAdd.value = true;
};
const CloseModalAdd = () => {
    openModalAdd.value = false;
};
const showModalEdit = (id: any) => {
    itemBookDetail.value = id;
    openModalEdit.value = true;
};
const CloseModalEdit = () => {
    openModalEdit.value = false;
};
</script>