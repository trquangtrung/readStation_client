<template>
  <div class="bg-[url('assets/images/bg-404.svg')] w-full h-[100vh] bg-cover bg-no-repeat bg-center">

    <Head>
      <Title>ReadStation | Đặt lại mật khẩu</Title>
      <Meta name="description" content="Đặt lại mật khẩu" />
      <Meta property="og:title" content="ReadStation | Đặt lại mật khẩu" />
      <Meta property="og:description" content="Đặt lại mật khẩu" />
    </Head>

    <div class="md:py-10 flex justify-center items-center container min-h-[100vh]">
      <div v-if="isSubmitting"
        class="absolute top-0 left-0 min-w-[100vw] min-h-full bg-black/40 z-[99999] cursor-default">
        <a-spin size="large" class="absolute top-1/2 left-1/2" />
      </div>
      <div class="flex space-y-3 flex-col justify-center mx-auto bg-white shadow-cs_01 p-8 w-[400px] rounded-lg">
        <div>
          <NuxtLink to="/" class="mb-10 flex justify-center">
            <img src="../../assets/images/logo_header.svg" alt="" />
          </NuxtLink>
          <div>
            <h2 class="text-xl text-orange-400 font-bold">
              Đặt lại mật khẩu 🔒
            </h2>
            <p>
              cho tài khoản
              <span class="text-lg font-semibold">{{ email }}</span>
            </p>
          </div>
        </div>

        <form @submit="onSubmit" class="w-full space-y-6">
          <div class="space-y-2">
            <a-alert v-if="resErrors" v-for="(error, index) in resErrors" :message="error" type="error" show-icon />
          </div>
          <div>
            <label for="password" class="flex gap-1 text-sm font-medium text-gray-700">
              <span>Mật khẩu</span><span class="text-red-600">*</span>
            </label>
            <div>
              <a-input-password placeholder="Nhập mật khẩu mới" class="mt-1 h-11"
                :status="errors.password ? 'error' : ''" id="password" v-bind="password" name="password"
                type="password" />
            </div>
            <small class="mt-2 text-red-500">
              {{ errors.password }}
            </small>
          </div>
          <div>
            <label for="password_confirmation" class="flex gap-1 text-sm font-medium text-gray-700">
              <span>Xác nhận lại mật khẩu</span><span class="text-red-600">*</span>
            </label>
            <div>
              <a-input-password placeholder="Xác nhận lại mật khẩu mới" class="mt-1 h-11"
                :status="errors.password_confirmation ? 'error' : ''" id="password_confirmation"
                v-bind="password_confirmation" name="password_confirmation" type="password" />
            </div>
            <small class="mt-2 text-red-500">
              {{ errors.password_confirmation }}
            </small>
          </div>

          <a-button html-type="submit"
            class="w-full bg-rtprimary h-[45px] !text-white hover:bg-rtsecondary border-none text-base"
            :loading="isSubmitting">
            <span>Đặt lại mật khẩu mới</span>
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
import { ref, onMounted, watchEffect } from "vue";

const route = useRoute();
const email = ref("");
const token = ref("");

const authStore = useAuthStore();
const isSubmitting = ref(false);
const resErrors = ref({});

// Create the form
const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: yup.object().shape({
    password: yup
      .string()
      .required("Trường này không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    password_confirmation: yup
      .string()
      .required("Trường này không để trống")
      .oneOf([yup.ref("password"), null], "Mật khẩu không khớp!"),
  }),
});

// Define fields
const password = defineInputBinds("password");
const password_confirmation = defineInputBinds("password_confirmation");

onMounted(() => {
  const emailFromQuery = route.query.email;

  if (typeof emailFromQuery === "string") {
    email.value = emailFromQuery;
    console.log(email.value);
  } else {
    email.value = "";
    console.error("Invalid email parameter:", emailFromQuery);
  }
});

watchEffect(() => {
  const tokenFromQuery = route.query.token;

  if (typeof tokenFromQuery === "string") {
    token.value = tokenFromQuery;
    console.log(token.value);
  } else {
    token.value = "";
    console.error("Invalid token parameter:", tokenFromQuery);
  }
});

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  values = {
    password: password.value.value,
    password_confirmation: password_confirmation.value.value,
    email: email.value,
    token: token.value,
  };
  // Submit to API
  console.log("object", values);
  try {
    isSubmitting.value = true;
    const resData = await authStore.resetPassword({
      password: password.value.value,
      password_confirmation: password_confirmation.value.value,
      email: email.value,
      token: token.value,
    });
    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Đặt lại mật khẩu thành công",
      });
      navigateTo("/login");
    } else {
      resErrors.value = resData.error.value.data?.errors;
      message.error({
        content: "Đặt lại mật khẩu không thành công",
      });
    }
  } catch (error) {
    // console.log(error);
    message.error({
      content: "Đặt lại mật khẩu không thành công",
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
