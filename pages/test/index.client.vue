<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <video ref="video" autoplay class="max-w-full"></video>
    <canvas ref="canvas" class="hidden"></canvas>
    <div class="mt-4">
      <button @click="capturePhoto" class="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Chụp ảnh</button>
      <button @click="stopCamera" class="bg-red-500 text-white px-4 py-2 rounded-md">Tắt camera</button>
    </div>
    <img v-if="photo" :src="photo" alt="Captured Photo" class="mt-4 max-w-full"/>
  </div>
</template>

<script>
export default {
  name: 'Camera',
  data() {
    return {
      stream: null,
      photo: null
    };
  },
  mounted() {
    this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        const videoElement = this.$refs.video;
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = this.stream;
      } catch (error) {
        console.error('Error accessing camera: ', error);
      }
    },
    stopCamera() {
      if (this.stream) {
        this.stream.getTracks().forEach(track => track.stop());
        this.stream = null;
      }
    },
    capturePhoto() {
      const videoElement = this.$refs.video;
      const canvasElement = this.$refs.canvas;
      const context = canvasElement.getContext('2d');
      canvasElement.width = videoElement.videoWidth;
      canvasElement.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
      this.photo = canvasElement.toDataURL('image/png');
    }
  },
  beforeDestroy() {
    this.stopCamera();
  }
}
</script>

<style scoped>
/* Tailwind CSS is used instead of custom scoped styles */
</style>
