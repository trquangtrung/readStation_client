<template>
  <a-extract-style>
    <div>
      <IncClientAppHeader />
      <div class="min-h-[90vh] bg-[#f5f7fe]/50 dark:bg-[#0f172a] pt-24">
        <div class="md:px-20 px-8 md:container md:mx-auto md:py-10 py-5">
          <div class="flex gap-6">
            <div class="w-1/5">
              <IncAccountSideBar />
            </div>
            <div class="w-4/5">
              <slot />
            </div>
          </div>
        </div>
      </div>
      <IncClientAppFooter />
    </div>
  </a-extract-style>
</template>
