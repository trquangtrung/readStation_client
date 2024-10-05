<template>
  <div class="bg-[url('assets/images/bg-404.svg')] w-full h-[100vh] bg-cover bg-no-repeat bg-center">

    <Head>
      <Title>ReadStation | Quên mật khẩu</Title>
      <Meta name="description" content="Quên mật khẩu" />
      <Meta property="og:title" content="ReadStation | Quên mật khẩu" />
      <Meta property="og:description" content="Quên mật khẩu" />
    </Head>
    <div v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-full min-h-[100vh] bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="md:py-10 flex justify-center items-center mx-auto container min-h-[100vh]">
      <div class="flex space-y-3 flex-col justify-center items-center bg-white shadow-cs_01 p-8 w-[400px] rounded-lg">
        <div>
          <NuxtLink to="/" class="mb-10 flex justify-center">
            <img src="../../assets/images/logo_header.svg" alt="" />
          </NuxtLink>
          <div>
            <h2 class="text-xl text-orange-400 font-bold pb-2">
              Quên mật khẩu? 🔒
            </h2>
            <p>
              Nhập Email của bạn và chúng tôi sẽ gửi cho bạn hướng dẫn đặt lại
              mật khẩu
            </p>
          </div>
        </div>
        <form @submit="onSubmit" class="w-full space-y-6">
          <div class="space-y-2">
            <a-alert v-if="resErrors" v-for="(error, index) in resErrors" :message="error" type="error" show-icon />
          </div>
          <div>
            <label class="flex gap-1 text-sm font-medium text-gray-700">
              <span>Email</span><span class="text-red-600">*</span>
            </label>
            <div>
              <a-input placeholder="Nhập địa chỉ Email" class="mt-1 h-11" :status="errors.email ? 'error' : ''"
                id="email" v-bind="email" name="email" type="email" />
            </div>
            <small class="mt-2 text-red-500">
              {{ errors.email }}
            </small>
          </div>

          <a-button :loading="isSubmitting" html-type="submit"
            class="w-full bg-rtprimary h-[45px] !text-white hover:bg-rtsecondary border-none text-base">
            <span>Gửi</span>
          </a-button>
          <div class="text-center">
            <NuxtLink to="/login" class="flex items-center gap-1 justify-center text-indigo-400 hover:text-indigo-900">
              <UIcon name="i-ion-return-down-back-outline" />
              Quay lại trang đăng nhập
            </NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore();
const isSubmitting = ref(false);
const resErrors = ref({});

// Create the form
const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email không hợp lệ"),
  }),
});

// Define fields
const email = defineInputBinds("email");

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  // Submit to API
  try {
    isSubmitting.value = true;
    const resData = await authStore.sendResetPassword(values);
    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Gửi xác thực Email thành công",
      });

      navigateTo(`/verify-email?email=${email.value.value}`);
    } else {
      resErrors.value = resData.error.value.data?.errors;
      message.error({
        content: "Gửi xác thực Email không thành công",
      });
    }
  } catch (error) {
    
    message.error({
      content: "Gửi xác thực Email không thành công",
    });
  } finally {
    isSubmitting.value = false;
  }
});
</script>
<style scoped>
:deep(.ant-input::placeholder) {
  text-align: left;
}
</style>
