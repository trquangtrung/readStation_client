<template>
  <div class="bg-[url('assets/images/bg-404.svg')] w-full h-[100vh] bg-cover bg-no-repeat bg-center">

    <Head>
      <Title>ReadStation | Xác minh mã OTP</Title>
      <Meta name="description" content="Xác minh mã OTP" />
      <Meta property="og:title" content="ReadStation | Xác minh mã OTP" />
      <Meta property="og:description" content="Xác minh mã OTP" />
    </Head>

    <div v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-[100vw] min-h-full bg-black/40 z-[99999] cursor-default">
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="md:py-10 flex justify-center items-center mx-auto container min-h-[100vh]">
      <div class="flex space-y-3 flex-col justify-center items-center bg-white shadow-cs_01 p-8 w-[450px] rounded-lg">
        <div>
          <NuxtLink to="/" class="mb-10 flex justify-center">
            <img src="../../assets/images/logo_header.svg" alt="" />
          </NuxtLink>
          <div>
            <h2 class="text-xl text-orange-400 font-bold pb-2">Xác minh 💬</h2>
            <p>
              Chúng tôi đã gửi mã xác minh tới Email của bạn. Nhập mã từ Email
              vào trường bên dưới.
            </p>
          </div>
        </div>

        <form @submit="onSubmit" class="w-full space-y-6">
          <span>Nhập mã bảo mật gồm 6 chữ số của bạn</span>
          <div class="">
            <v-otp-input ref="otpInput" input-classes="otp-input"
              :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" inputType="letter-numeric"
              :num-inputs="6" v-model:value="bindValue" :should-auto-focus="true" :should-focus-order="true"
              
              :placeholder="['*', '*', '*', '*', '*', '*']" />
          </div>
          <a-button html-type="submit"
            class="w-full bg-rtprimary h-[45px] !text-white hover:bg-rtsecondary border-none text-base"
            :loading="isSubmitting">
            <span>Xác nhận</span>
          </a-button>
        </form>
        <div class="flex items-center gap-1 justify-center">
          <span>Không nhận được thư ?</span>
          <button @click="resendOtp" class="text-indigo-400 hover:text-indigo-900">
            Gửi lại
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import * as yup from "yup";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import VOtpInput from "vue3-otp-input";
const authStore = useAuthStore();
const isSubmitting = ref(false);
const resErrors = ref({});
const route = useRoute();
const email = ref("");
const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
const bindValue = ref("");

const clearInput = () => {
  otpInput.value?.clearInput();
};
const fillInput = (value: string) => {
  otpInput.value?.fillInput(value);
};
// Create the form
const { handleSubmit } = useForm({
  validationSchema: yup.object().shape({}),
});

onMounted(() => {
  const emailFromQuery = route.query.email;

  if (typeof emailFromQuery === "string") {
    email.value = emailFromQuery;
  } else {
    email.value = "";
  }
});

const resendOtp = async () => {
  try {
    isSubmitting.value = true;
    const resData = await authStore.resendOtp({
      email: email.value,
    });

    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Gửi mã OTP thành công",
      });
      navigateTo("/verify-code");
    } else {
      resErrors.value = resData.error.value.data?.errors;
      message.error({
        content: "Gửi mã OTP thất bại",
      });
    }
  } catch (error) {
    message.error({
      content: "Gửi mã OTP thất bại",
    });
  } finally {
    isSubmitting.value = false;
  }
};

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  const otpCode = bindValue.value;
  // Submit to API

  values = { otpCode, email: email.value };

  try {
    isSubmitting.value = true;
    const resData = await authStore.verifyEmail({
      otpCode,
      email: email.value,
    });
    if (!resData?.data?._rawValue) {
      message.error({
        content: "Mã OTP không được để trống",
      });
      return;
    }
    if (resData?.data?._rawValue?.status == true) {
      message.success({
        content: "Xác thực mã OTP thành công",
      });
      navigateTo("/login");
    } else {
      if (
        resData?.data?._rawValue?.message ===
        "Mã OTP đã hết hạn, vui lòng kiểm tra lại mã OTP"
      ) {
        message.error(resData?.data?._rawValue?.message);
        navigateTo("/");
      } else {
        otpInput.value?.clearInput();
        message.error(resData?.data?._rawValue?.message);
      }
    }
  } catch (error) {
    otpInput.value?.clearInput();
  } finally {
    isSubmitting.value = false;
  }
});
</script>
<style scope>
.otp-input {
  width: 50px;
  height: 50px;
  padding: 5px;
  margin: 0 7px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
