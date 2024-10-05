<template>
  <NuxtLink
    class="hover:text-[black]"
    :to="`/admin/manager-bill?bill_id=${props.dashboard?.id}`"
  >
    <div
      class="space-y-1 cursor-pointer hover:bg-[#f1f1f1] p-2 hover:rounded-md"
    >
      <div class="flex justify-between items-center">
        <p>{{ props.dashboard?.invoice_code }}</p>
        <a-tag
          :bordered="false"
          v-if="props.dashboard?.status === 'active'"
          class="bg-tag-bg-09 text-tag-text-09"
        >
          Công khai
        </a-tag>
        <a-tag
          :bordered="false"
          v-else-if="props.dashboard?.status === 'canceled'"
          class="bg-tag-bg-06 text-tag-text-06"
        >
          Đã hủy
        </a-tag>
        <a-tag
          :bordered="false"
          v-else-if="props.dashboard?.status === 'draft'"
          class="bg-tag-bg-08 text-tag-text-08"
        >
          Bản nháp
        </a-tag>
      </div>
      <div class="flex justify-between items-center text-sm">
        <p>Người nhận: {{ props.dashboard?.user?.fullname }}</p>
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props.dashboard?.total)
        }}
      </div>
      <p>
        {{ dayjs(props.dashboard?.created_at).format(" DD/MM/YYYY - HH:mm") }}
      </p>
    </div>
    <hr class="my-2" />
  </NuxtLink>
</template>
<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const props = defineProps(["dashboard"]);
</script>
