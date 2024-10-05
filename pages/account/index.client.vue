<template>
  <div class="">
    <div
      v-if="isSubmitting"
      class="absolute top-0 left-0 min-w-full min-h-[100vh] bg-black/40 z-[99999] cursor-default"
    >
      <a-spin size="large" class="absolute top-1/2 left-1/2" />
    </div>
    <div class="flex gap-6">
      <div class="w-1/2">
        <AccountManagerUpdate />
      </div>
      <div class="w-1/2">
        <AccountManagerSocial />
      </div>
    </div>
  </div>
</template>
