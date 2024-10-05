<template>
  <div
    class="bg-white rounded-md overflow-hidden flex gap-7 p-4 flex-col relative"
  >
    <div class="text-lg font-bold">Thống kê người dùng</div>
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 z-[9999] -translate-y-1/2 ">
      <h4 class="font-bold text-xl text-center">Tất cả</h4>
      <h1 class="font-bold text-2xl text-center">{{ totalUser }}</h1>
    </div>
    <div class="flex-1">
      <highchart :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
const dashboardStore = useDashboardStore();
const totalUser = ref(0);
const chartOptions = ref({});
useAsyncData(async () => {
  await dashboardStore.getStaticUser({});
  totalUser.value = dashboardStore.dashboradStaticUser?.totalUser;
  chartOptions.value = {
    chart: {
      type: "pie",
      custom: {},
      events: {
        render() {
          const chart = this,
            series = chart.series[0];
          let customLabel = chart.options.chart.custom.label;

          if (!customLabel) {
            customLabel = chart.options.chart.custom.label = chart.renderer
              .label(
                "Tất cả<br/>" +
                  `<strong>${dashboardStore.dashboradStaticUser?.totalUser}</strong>`
              )
              .css({
                color: "#000",
                textAnchor: "middle",
              })
              .add();
          }

          const x = series.center[0] + chart.plotLeft,
            y =
              series.center[1] + chart.plotTop - customLabel.attr("height") / 2;

          customLabel.attr({
            x,
            y,
          });
          // Set font size based on chart diameter
          customLabel.css({
            fontSize: `${series.center[2] / 12}px`,
          });
        },
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.y}</b>",
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        allowPointSelect: true,
        cursor: "pointer",
        borderRadius: 8,

        showInLegend: false,
      },
    },
    series: [
      {
        name: "Số lượng",
        colorByPoint: true,
        innerSize: "65%",
        data: [
          {
            name: "Quản lý",
            y: dashboardStore.dashboradStaticUser?.totalManager,
            // color: "#007FFF",
          },
          {
            name: "Khách hàng",
            y: dashboardStore.dashboradStaticUser?.totalUserDefault,
          },
          {
            name: "Học sinh",
            y: dashboardStore.dashboradStaticUser?.totalStudent,
          },
        ],
      },
    ],
  };
});
</script>
