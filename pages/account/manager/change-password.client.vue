<template>
  <div class="w-full w-2/3 bg-white rounded-lg shadow-md shadow-gray-300">

    <Head>
      <Title>ReadStation | Đổi mật khẩu</Title>
      <Meta name="description" content="Đổi mật khẩu" />
      <Meta property="og:title" content="ReadStation | Đổi mật khẩu" />
      <Meta property="og:description" content="Đổi mật khẩu" />
    </Head>
    <div v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-[100vw] min-h-full bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="border-b p-5">
      <h2 class="font-bold pb-[14px]">Đổi mật khẩu</h2>
      <p>Cập nhật lại mật khẩu của bạn</p>
    </div>
    <form @submit="onSubmit" class="flex flex-col items-center justify-end p-7">
      <div class="space-y-2">
        <a-alert v-if="resErrors" v-for="(error, index) in resErrors" :message="error" type="error" show-icon />
      </div>
      <div class="flex flex-col space-y-6 w-[400px]">
        <div>
          <label for="old_password" class="flex gap-1 text-sm font-medium text-gray-700 pb-2">
            Nhập mật khẩu cũ<span class="text-red-600">*</span>
          </label>
          <div>
            <a-input-password placeholder="Nhập mật khẩu cũ" class="mt-1 h-11"
              :status="errors.old_password ? 'error' : ''" id="old_password" v-bind="old_password" name="old_password"
              type="old_password" />
          </div>
          <small class="mt-2 text-red-500">
            {{ errors.old_password }}
          </small>
        </div>
        <div>
          <label for="new_password" class="flex gap-1 text-sm font-medium text-gray-700 pb-2">
            Nhập mật khẩu mới<span class="text-red-600">*</span>
          </label>
          <div>
            <a-input-password placeholder="Nhập mật khẩu mới" class="mt-1 h-11"
              :status="errors.new_password ? 'error' : ''" id="new_password" v-bind="new_password" name="new_password"
              type="new_password" />
          </div>
          <small class="mt-2 text-red-500">
            {{ errors.new_password }}
          </small>
        </div>
        <div>
          <label for="new_password_confirmation" class="flex gap-1 text-sm font-medium text-gray-700 pb-2">
            Xác nhận lại mật khẩu mới<span class="text-red-600">*</span>
          </label>
          <div>
            <a-input-password placeholder="Xác nhận lại mật khẩu mới" class="mt-1 h-11"
              :status="errors.new_password_confirmation ? 'error' : ''" id="new_password_confirmation"
              v-bind="new_password_confirmation" name="new_password_confirmation" type="new_password" />
          </div>
          <small class="mt-2 text-red-500">
            {{ errors.new_password_confirmation }}
          </small>
        </div>

        <div class="flex flex-col">
          <div class="text-end font-medium text-indigo-600">
            <NuxtLink to="/forgot-password" class="text-sm" type="button">
              Bạn quên mật khẩu?
            </NuxtLink>
          </div>
          <div class="flex items-center justify-between mt-3">
            <div class="w-full flex items-center justify-end gap-2">
              <a-button type="primary"
                class="bg-white border border-rtgray-50 !text-black h-10 hover:!bg-rtgray-50">Hủy</a-button>
              <a-button html-type="submit" class="!text-white bg-rtprimary hover:bg-rtsecondary border-none h-10"
                :loading="isSubmitting">Lưu thay đổi</a-button>
            </div>
          </div>
        </div>
      </div>
    </form>
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
    old_password: yup
      .string()
      .required("Trường này không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    new_password: yup
      .string()
      .required("Trường này không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    new_password_confirmation: yup
      .string()
      .required("Trường này không để trống")
      .oneOf([yup.ref("new_password"), null], "Mật khẩu không khớp!"),
  }),
});

// Define fields
const old_password = defineInputBinds("old_password");
const new_password = defineInputBinds("new_password");
const new_password_confirmation = defineInputBinds("new_password_confirmation");

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  // Submit to API
  try {
    isSubmitting.value = true;
    const resData = await authStore.changePassword(values);
    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Đổi mật khẩu thành công",
      });
      navigateTo("/account");
    } else {
      resErrors.value = resData.error.value.data?.errors;
      message.error({
        content: "Đổi mật khẩu không thành công",
      });
    }
  } catch (error) {
    // console.log(error);
    message.error({
      content: "Đổi mật khẩu không thành công",
    });
  } finally {
    isSubmitting.value = false;
  }
});
</script>
