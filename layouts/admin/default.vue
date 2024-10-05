<template>
  <a-extract-style>
    <a-layout style="min-height: 100vh">
      <IncAdminSidebarAdmin :collapsed="collapsed" />
      <a-layout>
        <IncAdminAppHeader
          :collapsed="changeCollapsed"
          :collapsedValue="collapsed"
        />
        <a-layout-content
          class="p-4 pt-[4.375rem] !bg-[#f1f5f9] transition-all ease-linear"
          :class="
            collapsed
              ? 'p-4 pt-[4.375rem] pl-[calc(theme(padding.20)+theme(padding.4))]'
              : 'pt-[4.375rem] pl-[calc(theme(padding.sidebar)+theme(padding.4))]'
          "
        >
          <slot />
        </a-layout-content>
        <IncAdminAppFooter />
      </a-layout>
    </a-layout>
  </a-extract-style>
</template>

<script setup lang="ts">
const collapsed = ref<boolean>(false);

const changeCollapsed = () => {
  collapsed.value = !collapsed.value;
};
</script>
