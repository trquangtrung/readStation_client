<template>
  <div class="space-y-5">
    <Head>
      <Title>ReadStation | Xác thực HS/SV</Title>
    </Head>
    <h3 class="font-bold mb-5">Xác thực HS/SV</h3>
    <div
      class="flex flex-col space-y-5 items-center bg-white shadow-md rounded-md pb-10 min-h-[700px] pt-10"
    >
      <video
        ref="video"
        v-if="cameraOn"
        class="rounded-lg w-[1/2]"
        autoplay
        playsinline
      ></video>
      <img v-if="!cameraOn" src="assets/images/camera.png" alt="" />
      <a-button
        @click="toggleCamera"
        class="h-10 text-base !text-orange-500 border-orange-500"
      >
        {{ cameraOn ? "Tắt máy ảnh" : "Bật máy ảnh" }}
      </a-button>
      <button
        v-if="cameraOn"
        @click="capturePhoto"
        class="bg-tag-text-10 border-none text-white rounded-lg h-10 px-16"
      >
        Chụp ảnh
      </button>
      <div v-if="photos.length" class="flex space-x-10">
        <div v-for="(photo, index) in photos" :key="index" class="text-center">
          <p>{{ index === 0 ? "Hình mặt trước" : "Hình mặt sau" }}</p>
          <img :src="photo" class="rounded-lg w-[1/2]" />
          <button @click="deletePhoto(index)" class="text-tag-text-06">
            Xóa
          </button>
        </div>
      </div>
      <div v-if="Object.keys(errors).length" class="space-y-2 mb-4">
        <a-alert
          v-for="(error, index) in errors"
          :key="index"
          :message="error"
          type="error"
          show-icon
        />
      </div>
      <div v-if="showInputs">
        <form @submit.prevent="submitData">
          <div class="grid grid-cols-3 gap-4 text-center pb-5">
            <div class="col-start-2 text-lg font-semibold">
              Xác nhận lại thông tin của bạn
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="">Họ và Tên</label>
              <a-input
                type="text"
                class="border p-2 rounded-md h-10"
                placeholder="Họ và Tên"
                v-model:value="student_name"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for=""
                >Mã số học sinh/sinh viên</label
              >
              <a-input
                type="text"
                class="border p-2 rounded-md h-10"
                placeholder="Mã số học sinh/sinh viên"
                v-model:value="student_code"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="">Thời hạn thẻ</label>
              <a-input
                type="date"
                class="border p-2 rounded-md h-10"
                placeholder="Thời hạn thẻ"
                v-model:value="student_card_expired"
                required
              />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm font-semibold" for="">Trường</label>
              <a-input
                type="text"
                class="border p-2 rounded-md h-10"
                placeholder="Trường"
                v-model:value="place_of_study"
                required
              />
            </div>
          </div>
          <div class="flex justify-center items-center mt-4">
            <a-button
              class="text-white bg-rtprimary hover:!text-white border-none hover:bg-rtsecondary"
              size="large"
              html-type="submit"
            >
              Xác nhận
            </a-button>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="loading"
      class="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
    >
      <div class="spinner-border text-white" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { message } from "ant-design-vue";
import { useBaseStore } from "../../../stores/base/baseStore";
import { useRouter } from "vue-router";
import { useVerifyClientStore } from "../../../stores/client/verify/verifyClientStore";

export default defineComponent({
  data() {
    return {
      cameraOn: false,
      photos: [] as string[],
      stream: null as MediaStream | null,
      showInputs: false,
      student_name: "",
      student_code: "",
      student_card_expired: "",
      place_of_study: "",
      errors: {} as Record<string, string>,
      loading: false,
    };
  },
  methods: {
    validateStudentName() {
      const regex =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂÂĐĨŨƠàáâãèéêìíòóôõùúăâđĩũơưƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỲỴÝỶỸỳỵỷỹửữựạảấầẩẫậắằẳẵặẹẻẽềểếễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/;
      return regex.test(this.student_name);
    },
    validatePlaceOfStudy() {
      const regex =
        /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂÂĐĨŨƠàáâãèéêìíòóôõùúăâđĩũơưƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỲỴÝỶỸỳỵỷỹửữựạảấầẩẫậắằẳẵặẹẻẽềểếễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ\s]+$/;
        
      return regex.test(this.place_of_study);
    },
    validateStudentCode() {
      const regex = /^[a-zA-Z0-9]+$/;
      return regex.test(this.student_code);
    },
    async toggleCamera() {
      this.cameraOn = !this.cameraOn;
      if (this.cameraOn) {
        await this.startCamera();
      } else {
        this.stopCamera();
      }
    },
    async startCamera() {
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (this.$refs.video) {
          (this.$refs.video as HTMLVideoElement).srcObject = this.stream;
        }
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop());
        this.stream = null;
      }
    },
    capturePhoto() {
      if (this.photos.length < 2 && this.cameraOn) {
        const video = this.$refs.video as HTMLVideoElement;
        const canvas = document.createElement("canvas");
        if (video.videoWidth && video.videoHeight) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const photoData = canvas.toDataURL("image/png");
            this.photos.push(photoData);
            console.log(
              `Photo ${this.photos.length === 1 ? "front" : "back"} captured:`,
              photoData
            );
          }
          if (this.photos.length === 2) {
            this.showInputs = true;
          }
        }
      } else {
        message.error("Bạn chỉ có thể chụp tối đa 2 ảnh");
      }
    },
    deletePhoto(index: number) {
      this.photos.splice(index, 1);
      this.showInputs = false;
    },
    async submitData() {
      if (!this.validateStudentName()) {
        message.error("Họ và tên không được chứa số hoặc ký tự đặc biệt.");
        return;
      }
      if (!this.validatePlaceOfStudy()) {
        message.error("Trường không được chứa số hoặc ký tự đặc biệt.");
        return;
      }
      if (!this.validateStudentCode()) {
        message.error(
          "Mã số học sinh/sinh viên không được chứa ký tự đặc biệt."
        );
        return;
      }

      console.log("Họ và Tên:", this.student_name);
      console.log("Mã số học sinh/sinh viên:", this.student_code);
      console.log("Thời hạn thẻ:", this.student_card_expired);
      console.log("Trường:", this.place_of_study);
      console.log("Photos:", this.photos);

      if (this.photos.length !== 2) {
        message.error(
          "Hãy chụp lại ảnh mặt trước và mặt sau thẻ HS/SV của bạn"
        );
        return;
      }
      this.loading = true;
      try {
        const frontPhotoURL = await this.uploadPhoto(this.photos[0]);
        const backPhotoURL = await this.uploadPhoto(this.photos[1]);

        const payload = {
          verification_card_type: "student_card",
          verification_card_image: {
            front: frontPhotoURL.url,
            back: backPhotoURL.url,
          },
          verification_card_info: {
            student_name: this.student_name,
            student_code: this.student_code,
            student_card_expired: this.student_card_expired,
            place_of_study: this.place_of_study,
          },
        };

        const verifyClientStore = useVerifyClientStore();
        const res = await verifyClientStore.createVerify(payload);

        if (res.data._rawValue?.status === true) {
          message.success("Gửi xác thực thẻ HS/SV thành công");
          this.$router.push("./confirm-student");
        } else {
          this.errors = res.error.value.data.errors;
          message.error("Gửi xác thực HS/SV thất bại");
        }

        this.student_name = "";
        this.student_code = "";
        this.student_card_expired = "";
        this.place_of_study = "";
        this.photos = [];
        this.showInputs = false;
      } catch (error) {
        message.error(
          "Bạn đã gửi yêu cầu xác thực thẻ HS/SV rồi. Vui lòng chờ xác thực."
        );
      } finally {
        this.loading = false;
      }
    },
    async uploadPhoto(photoData: string): Promise<string> {
      const baseStore = useBaseStore();
      const file = this.DataURIToBlob(photoData);
      const formData = new FormData();
      formData.append("image", file);

      try {
        const dataUpload = await baseStore.uploadImg(formData);
        console.log("Upload success:", dataUpload.data._rawValue.data);
        return dataUpload.data._rawValue.data;
      } catch (error) {
        message.error("Upload ảnh thất bại");
        throw error;
      }
    },
    DataURIToBlob(dataURI: string) {
      const splitDataURI = dataURI.split(",");
      const byteString =
        splitDataURI[0].indexOf("base64") >= 0
          ? atob(splitDataURI[1])
          : decodeURI(splitDataURI[1]);
      const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

      const ia = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);

      return new Blob([ia], { type: mimeString });
    },
  },
  beforeUnmount() {
    this.stopCamera();
  },
  setup() {
    const router = useRouter();
    return { router };
  },
});
</script>

<style scoped>
img {
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
}
.spinner-border {
  width: 3rem;
  height: 3rem;
  border: 0.25em solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 0.25em solid #fff;
  animation: spinner-border 0.75s linear infinite;
}
@keyframes spinner-border {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
