<template>
    <div>
        <div class="h-auto mx-auto container md:px-20 px-8">
            <div class="flex justify-center gap-5">
                <CommonRecommended :title="valueRecomended[0]" :data="recomendedBooks?.getRecommend" />
                <CommonRecommended :title="valueRecomended[1]" :data="recomendedBooks?.getLatest" />
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue';
const recomendedBooks = useHomeStore();
const getDataRecomended = async () => {
    try {
        await recomendedBooks.getRecomendedBooks();
    } catch (error) {
        console.error(error)
    }
}
const getDataLastest = async () => {
    try {
        await recomendedBooks.getLastestBook();
    } catch (error) {
        console.error(error)
    }
}

useAsyncData(async () => {
    await getDataRecomended();
    await getDataLastest();
})
const valueRecomended = ref([
    {
        title: "Đề xuất cho bạn",
        description: "Một cuốn sách đề xuất với sức lôi cuốn sâu sắc và triết học, mở ra cánh cửa của tri thức và trí tưởng tượng.",
    },
    {
        title: "Phổ biến nhất năm nay",
        description: "Một cuốn sách đề xuất với sức lôi cuốn sâu sắc và triết học, mở ra cánh cửa của tri thức và trí tưởng tượng.",
    },
])


</script>
