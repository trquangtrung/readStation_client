<template>
  <div
    class="flex justify-between cursor-pointer hover:bg-[#f1f1f1] p-2 hover:rounded-md space-y-2"
  >
    <div class="flex justify-center items-start">
      <div >
        <p>
          #{{ props?.transactions?.transaction_code }}
        </p>
        <p>
          {{ props?.transactions?.user?.fullname }}
        </p>
        <p>
          {{
            dayjs(props?.transactions?.created_at).format(" DD/MM/YYYY  HH:mm:ss")
          }}
        </p>
        <p class="flex items-center">
          <span>{{ props?.dashboard?.average_rate }}</span>
        </p>
      </div>
    </div>
    <div class="space-y-2">
      <a-tag
        :bordered="false"
        v-if="props?.transactions?.status === 'pending'"
        class="flex items-start bg-tag-bg-01 text-tag-text-01"
      >
        Chờ xác nhận
      </a-tag>
      <a-tag
        :bordered="false"
        v-if="props?.transactions?.status === 'holding'"
        class="flex items-start bg-tag-bg-06 text-tag-text-06"
      >
        Đang giữ
      </a-tag>
      <a-tag
        :bordered="false"
        v-if="props?.transactions?.status === 'completed'"
        class="flex items-start bg-tag-bg-09 text-tag-text-09"
      >
        Hoàn thành
      </a-tag>
      <a-tag
        :bordered="false"
        v-if="props?.transactions?.status === 'failed'"
        class="flex items-start bg-tag-bg-07 text-tag-text-07"
      >
        Thất bại
      </a-tag>
      <a-tag
        :bordered="false"
        v-if="props?.transactions?.status === 'canceled'"
        class="flex items-start bg-tag-bg-07 text-tag-text-07"
      >
        Đã hủy
      </a-tag>
      <p class="flex items-start">
        {{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(props?.transactions?.amount)
        }}
      </p>
    </div>
  </div>
  <hr class="my-2" />
</template>
<script setup>
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const props = defineProps(["transactions"]);
</script>
