<template>
  <div class="space-y-3">
    <span class="text-sm font-bold">Đánh giá chi tiết</span>
    <a-textarea
      v-model:value="review.review_text"
      placeholder="Nhập nội dung đánh giá sách của bạn"
      :rows="4"
    />
    <div class="text-end">
      <a-button
        @click="handleReviewBook"
        html-type="submit"
        :loading="reviewStore?.isSubmitting"
        class="h-10 bg-orange-500 !text-white border-none"
      >
        Đánh giá sách
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
const reviewStore = useReviewBookClientStore();
// review Book
const review = ref({
  review_text: "",
});
const handleReviewBook = async (id) => {
  alert(id);
  //   try {
  //     const res = await reviewStore.createReviewBook({
  //       loan_order_details_id: 2,
  //       review_text: review.value?.review_text,
  //       rating: 4,
  //     });
  //     if (res.data._rawValue?.status == true) {
  //       message.success("Thêm đánh giá thành công");
  //     } else {
  //       errors.value = res.error.value.data.errors;
  //       message.error("Thêm đánh giá thất bại");
  //     }
  //   } catch (error) {
  //     message.error("Thêm đánh giá thất bại");
  //   }
};
</script>
