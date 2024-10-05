<template>
  <div class="relative md:px-20 px-8 py-8">

    <Head>
      <Title>ReadStation | Đăng nhập</Title>
      <Meta name="description" content="Đăng nhập" />
      <Meta property="og:title" content="ReadStation | Đăng nhập" />
      <Meta property="og:description" content="Đăng nhập" />
    </Head>
    <div v-if="authStore?.isSubmitting"
      class="absolute top-0 left-0 min-w-full min-h-[100vh] bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="w-full h-full flex items-center justify-between">
      <div class="md:w-1/2 w-full min-h-[90vh] flex flex-col items-center justify-center">
        <div>
          <NuxtLink to="/">
            <div class="w-fit mx-auto">
              <img src="../../assets/images/logo_header.svg" class="w-[230px] justify-center" alt="" />
            </div>
          </NuxtLink>
          <div class="w-full mt-8">
            <h2 class="text-2xl font-extrabold text-gray-900">
              Chào mừng bạn 👋
            </h2>
            <p class="mt-2">Đăng nhập để bắt đầu trải nghiệm.</p>
          </div>

          <div class="bg-white mt-8">
            <form @submit="onSubmit">
              <div class="space-y-6">
                <div>
                  <a-alert v-if="resErrors" v-for="(error, index) in resErrors" :message="error" type="error" show-icon>
                    <template #action v-if="error[0] === 'Email chưa được xác thực'">
                      <a-button size="small" type="primary" @click="verifyEmail" html-type="button"
                        :loading="authStore?.isSubmitting">
                        Xác thực
                      </a-button>
                    </template>
                  </a-alert>
                </div>
                <div>
                  <label for="email" class="flex text-sm font-medium text-gray-700 gap-1">
                    <span>Email</span><span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <a-input class="w-[388px] h-[45px]" :status="errors.email ? 'error' : ''" id="email" v-bind="email"
                      name="email" type="email" placeholder="Nhập Email" />
                  </div>
                  <small class="my-2 text-red-500">
                    {{ errors.email }}
                  </small>
                </div>

                <div>
                  <label for="password" class="flex text-sm font-medium text-gray-700 gap-1">
                    <span> Mật khẩu</span>
                    <span class="text-red-600">*</span>
                  </label>
                  <div class="mt-1">
                    <a-input-password :status="errors.password ? 'error' : ''" id="password" v-bind="password"
                      name="password" type="password" placeholder="Nhập mật khẩu" class="w-[388px] h-[45px]" />
                  </div>

                  <small class="mt-2 text-red-500">
                    {{ errors.password }}
                  </small>
                </div>
              </div>

              <div class="float-end font-medium text-indigo-600 mt-4 mb-3">
                <NuxtLink to="/forgot-password" class="text-sm" type="button">
                  Bạn quên mật khẩu?
                </NuxtLink>
              </div>
              <div class="">
                <a-button html-type="submit" :loading="authStore?.isSubmitting"
                  class="w-full bg-rtprimary h-[45px] !text-white hover:bg-rtsecondary text-base border-none">
                  <span>Đăng nhập</span>
                </a-button>
                <div class="relative flex items-center justify-between text-center pt-5">
                  <hr class="solid w-[169px] border-t-2" />
                  <p class="">hoặc</p>
                  <hr class="solid w-[169px] border-t-2" />
                </div>

                <div class="pt-5 flex justify-center">
                  <GoogleSignInButton width="389px" style="text-align: center" @success="handleLoginSuccess"
                    @error="handleLoginError" :one-tap="!authStore.isLogged" />
                </div>
              </div>

              <div class="mt-6">
                <p class="text-center text-sm text-gray-600">
                  Bạn không có tài khoản?
                  <NuxtLink to="/register" class="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                    Đăng ký
                  </NuxtLink>
                </p>
              </div>
            </form>
            <div class="max-w-[388px] text-center pt-6">
              <span>
                Bằng việc đăng nhập, bạn đọc và đồng ý với
                <NuxtLink to="/privacy-policy"><span class="border-b-2">
                    điều khoản sử dụng
                  </span></NuxtLink>
                và
                <span class="border-b-2">
                  <NuxtLink to="/privacy-policy">
                    Chính sách bảo mật thông tin cá nhân của
                  </NuxtLink>
                </span>
                ReadStation
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2 h-full pr-20 py-8 md:block hidden fixed top-0 right-0">
        <img class="h-full w-full object-cover rounded-2xl" src="/assets/images/backgound-login.jpg" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const isSubmitting = ref(false);
const resErrors = ref({});

import { useForm } from "vee-validate";
import * as yup from "yup";
import {
  GoogleSignInButton,
  type CredentialResponse,
} from "vue3-google-signin";

const props = defineProps({
  name: String,
});

const verifyEmail = async () => {
  const resData = await authStore.resendOtp({
    email: email.value.value,
  });
  if (resData?.data?._rawValue?.status == true) {
    message.success({
      content: "Gửi mã OTP thành công",
    });
    navigateTo(`/verify-code?email=${email.value.value}`);
  } else {
    resErrors.value = resData.error.value.data?.errors;
    message.error({
      content: "Gửi mã OTP không thành công",
    });
  }
};

// Create the form
const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: {
    email: yup
      .string()
      .required("Trường này không được để trống")
      .email("Email không hợp lệ"),
    password: yup
      .string()
      .required("Trường này không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  },
});

// Define fields
const email = defineInputBinds("email");
const password = defineInputBinds("password");

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  // Submit to API
  try {
    isSubmitting.value = true;
    const resData = await authStore.login(values);

    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Đăng nhập thành công",
      });
      navigateTo("/");
    } else {
      resErrors.value = resData.error.value.data.errors;
      message.error({
        content: "Đăng nhập không thành công",
      });
    }
  } catch (error) {
    message.error({
      content: "Đăng nhập không thành công",
    });
  } finally {
    isSubmitting.value = false;
  }
});

// handle success event
const handleLoginSuccess = async (response: CredentialResponse) => {
  const { credential } = response;
  try {
    isSubmitting.value = true;
    const resData = await authStore.loginWithGoogle(credential);
    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Đăng nhập thành công",
      });
      navigateTo("/");
    } else {
      resErrors.value = resData.error.value.data.errors;
      message.error({
        content: "Đăng nhập không thành công",
      });
    }
  } catch (error) {
    message.error({
      content: "Đăng nhập không thành công",
    });
  } finally {
    isSubmitting.value = false;
  }
};

// handle an error event
const handleLoginError = () => {
  errorToast(
    "Đăng nhập không thành công",
    "Vui lòng thử lại bằng cách nhấn vào nút đăng nhập bên dưới"
  );
};
</script>
<style scoped>
:deep(.ant-input::placeholder) {
  text-align: left;
}
</style>
