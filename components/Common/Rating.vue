<template>
  <div class="flex items-center">
    <IconYellowStar v-for="i in Math.floor(props.rating)" :key="i" />
    <IconGrayStar v-for="i in 5 - Math.floor(props.rating)" :key="i" />
  </div>
</template>
<script setup>
const props = defineProps(["rating"]);
</script>
