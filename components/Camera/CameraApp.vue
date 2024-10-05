<template>
  <div>
    <div class="flex flex-col space-y-5 items-center bg-white shadow-md rounded-md pb-10 min-h-[700px] pt-10">
      <video
        ref="video"
        v-if="cameraOn"
        class="rounded-lg w-[1/2]"
        autoplay
        playsinline
      ></video>
      <button @click="toggleCamera">
        {{ cameraOn ? "Tắt máy ảnh" : "Bật máy ảnh" }}
      </button>
      <button @click="capturePhoto" :disabled="!cameraOn">Chụp ảnh</button>
      <div v-if="photos.length" class="flex space-x-10">
        <div v-for="(photo, index) in photos" :key="index" class="text-center">
          <p>{{ index === 0 ? "Hình mặt trước" : "Hình mặt sau" }}</p>
          <img :src="photo" class="rounded-lg w-[1/2]" />
          <button @click="deletePhoto(index)" class="text-tag-text-06">
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cameraOn: false,
      photos: [],
      stream: null,
    };
  },
  methods: {
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
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.video.srcObject = this.stream;
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
        const video = this.$refs.video;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          this.photos.push(canvas.toDataURL("image/png"));
        }
      } else {
        alert("Bạn chỉ có thể chụp tối đa 2 ảnh và phải bật máy ảnh trước.");
      }
    },
    deletePhoto(index) {
      this.photos.splice(index, 1);
    },
  },
  beforeDestroy() {
    this.stopCamera();
  },
  beforeUnmount() {
    this.stopCamera();
  },
};
</script>

<style>
img {
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
}
</style>
