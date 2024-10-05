<template>
  <div class="bg-[url('assets/images/bg-404.svg')] w-full h-[100vh] bg-cover bg-no-repeat bg-center">

    <Head>
      <Title>ReadStation | Xác thực Email</Title>
      <Meta name="description" content="Xác thực Email" />
      <Meta property="og:title" content="ReadStation | Xác thực Email" />
      <Meta property="og:description" content="Xác thực Email" />
    </Head>
    <div v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-[100vw] min-h-full bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="md:py-10 flex justify-center items-center mx-auto container min-h-[100vh]">
      <div class="flex space-y-3 flex-col justify-center bg-white shadow-cs_01 p-8 w-[400px] rounded-lg">
        <div>
          <NuxtLink to="/" class="mb-10 flex justify-center">
            <img src="../../assets/images/logo_header.svg" alt="" />
          </NuxtLink>
          <div>
            <h2 class="text-xl text-orange-400 font-bold pb-2">
              Xác thực Email của bạn ✉️
            </h2>
            <p>Mã OTP đã được gửi đến Email của bạn.</p>
            <p>Vui lòng kiểm tra lại Email !</p>
          </div>
        </div>

        <form @submit="onSubmit" class="w-full space-y-6">
          <div class="flex items-center gap-1 justify-center">
            <span>Không nhận được thư ?</span>
            <a-button html-type="submit" class="text-indigo-400 hover:text-indigo-900 border-none"
              :loading="isSubmitting">
              Gửi lại
            </a-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref, onMounted } from "vue";

const authStore = useAuthStore();
const isSubmitting = ref(false);
const email = ref("");
const route = useRoute();

// Create the form
const { handleSubmit } = useForm({});

onMounted(() => {
  const emailFromQuery = route.query.email;

  if (typeof emailFromQuery === "string") {
    email.value = emailFromQuery;
  } else {
    email.value = "";
  }
});

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  // Submit to API

  values = { email: email.value };
  try {
    isSubmitting.value = true;
    const resData = await authStore.sendResetPassword({ email: email.value });

    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Gửi thông tin đổi mật khẩu thành công",
      });
      navigateTo("/verify-email");
    } else {
      resErrors.value = resData.error.value.data?.errors;
      message.error({
        content: "Gửi thông tin đổi mật khẩu không thành công",
      });
    }
  } catch (error) {
    message.error({
      content: "Gửi thông tin đổi mật khẩu không thành công",
    });
  } finally {
    isSubmitting.value = false;
  }
});
</script>
