<template>
  <div class="bg-white rounded-md overflow-hidden col-span-2">
    <div class="flex justify-between items-center p-4 font-bold">
      <div class="text-lg">Thống kê đơn hàng doanh thu</div>
      <div>
        <a-tag
          :bordered="false"
          @click="filter = 'all'"
          :class="
            filter === 'all'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          Tất cả
        </a-tag>
        <a-tag
          :bordered="false"
          @click="filter = '1m'"
          :class="
            filter === '1m'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          1M
        </a-tag>
        <a-tag
          :bordered="false"
          @click="filter = '3m'"
          :class="
            filter === '3m'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          3M
        </a-tag>
        <a-tag
          :bordered="false"
          @click="filter = '6m'"
          :class="
            filter === '6m'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          6M
        </a-tag>
        <a-tag
          :bordered="false"
          @click="filter = '9m'"
          :class="
            filter === '9m'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          9M
        </a-tag>
        <a-tag
          :bordered="false"
          @click="filter = '1y'"
          :class="
            filter === '1y'
              ? 'bg-tag-bg-03 text-tag-text-03'
              : 'bg-tag-bg-07 text-tag-text-07'
          "
          class="cursor-pointer"
        >
          1Y
        </a-tag>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-4 bg-[#f9fbfc] border-dashed border-y">
      <div class="border-dashed border-r p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
          <span v-else>{{ dashboardStore.dashboradStatusOrder?.total }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Tổng đơn</p>
      </div>
      <div class="border-dashed border-r p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
         <span v-else> {{ dashboardStore.dashboradStatusOrder?.pending }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Đang xử lý</p>
      </div>
      <div class="border-dashed border-r p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
         <span v-else> {{ dashboardStore.dashboradStatusOrder?.active }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Đang thuê</p>
      </div>
      <div class="border-dashed border-r p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
        <span v-else>  {{ dashboardStore.dashboradStatusOrder?.overdue }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Quá hạn</p>
      </div>
      <div class="border-dashed border-r p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
         <span v-else> {{ dashboardStore.dashboradStatusOrder?.completed }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Hoàn thành</p>
      </div>
      <div class="p-4">
        <h3 class="text-center font-bold text-2xl text-[#495057]">
          <Icon
            v-if="isLoading"
            icon="svg-spinners:3-dots-scale"
            class=" block mx-auto text-3xl"
          />
          <span v-else>{{ dashboardStore.dashboradStatusOrder?.canceled }}</span>
        </h3>
        <p class="text-center font-bold text-[#878a99]">Đã hủy</p>
      </div>
    </div>

    <div class="mt-4">
      <highchart :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const dashboardStore = useDashboardStore();
const chartOptions = ref({});
const isLoading = ref(false);
const filter = ref("all");
useAsyncData(
  async () => {
    isLoading.value = true;
    await dashboardStore.getStaticColumnOrder({
      sort: filter.value,
    });
    chartOptions.value = {
      chart: {
        zooming: {
          type: "x",
        },
      },

      title: {
        text: "",
        align: "left",
      },
      xAxis: {
        categories: dashboardStore.dashboradStaticColumnOrder?.map((item) =>
          dayjs(item.date.split("T")[0]).format("DD/MM/YYYY")
        ),
      },
      yAxis: [
        {
          min: 0,
          title: {
            text: "Đơn hàng",
          },
        },
        {
          title: {
            text: "Doanh thu ",
          },
          opposite: true,
        },
      ],
      tooltip: {
        valueSuffix: " đơn",
      },
      plotOptions: {
        series: {
          borderRadius: "25%",
        },
      },
      series: [
        {
          type: "column",
          name: "Tổng đơn",
          data: dashboardStore.dashboradStaticColumnOrder?.map(
            (item) => item.total_orders
          ),
          color: "#007FFF",
        },
        {
          type: "column",
          name: "Hoàn thành",
          data: dashboardStore.dashboradStaticColumnOrder?.map(
            (item) => item.completed_orders
          ),
          color: "#389E0D",
        },
        {
          type: "column",
          name: "Hủy",
          data: dashboardStore.dashboradStaticColumnOrder?.map(
            (item) => item.canceled_orders
          ),
          color: "#F44336",
        },
        {
          type: "spline",
          step: "center",
          name: "Doanh thu",
          data: dashboardStore.dashboradStaticColumnOrder?.map(
            (item) => item.revenue
          ),
          yAxis: 1,
          tooltip: {
            valueSuffix: " đ",
          },
          marker: {
            lineWidth: 2,
            lineColor: "#2196F3",
            fillColor: "white",
          },
        },
      ],
    };
    isLoading.value = false;
  },
  {
    immediate: true,
    watch: filter,
  }
);
</script>
