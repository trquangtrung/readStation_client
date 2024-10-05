<template>
    <div>
        <HomeSliderBig />
        <HomeCategory/>
        <HomeFeaturedBooks />
        <HomeFeatureAuthor/>
        <HomeRecomended/>
        <HomeFourBox/>
    </div>
</template>

<script setup>
const data = ref(null);
const authStore = useAuthStore();
useAsyncData(async () => {
    isLoading.value = true;
    try {
        const response = await authStore.getProfile();
        data.value = response.data._rawValue.data;
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
    }
});
useSeoMeta({
    title: "ReadStation | Website Thuê Sách Trực Tuyến",
    ogTitle: "ReadStation | Website Thuê Sách Trực Tuyến",
    description: "Read Station là điểm đến lý tưởng cho những người yêu sách muốn tận hưởng sự đa dạng của thế giới văn học mà không cần phải chi tiêu lớn cho việc mua sách. Khách hàng có thể đăng ký thành viên và chọn lựa từ một kho sách phong phú, bao gồm các thể loại từ tiểu thuyết đến sách khoa học, lịch sử và tự truyện. Giá cả cho thuê cũng đa dạng, và cửa hàng thường cung cấp dịch vụ khách hàng tốt để hỗ trợ khách hàng trong việc chọn sách và đáp ứng nhu cầu đọc sách. ",
    ogDescription: "Read Station là điểm đến lý tưởng cho những người yêu sách muốn tận hưởng sự đa dạng của thế giới văn học mà không cần phải chi tiêu lớn cho việc mua sách. Khách hàng có thể đăng ký thành viên và chọn lựa từ một kho sách phong phú, bao gồm các thể loại từ tiểu thuyết đến sách khoa học, lịch sử và tự truyện. Giá cả cho thuê cũng đa dạng, và cửa hàng thường cung cấp dịch vụ khách hàng tốt để hỗ trợ khách hàng trong việc chọn sách và đáp ứng nhu cầu đọc sách.",
    ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
    twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
