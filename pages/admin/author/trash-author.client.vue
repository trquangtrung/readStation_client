<template>

  <Head>
    <Title>ReadStation | Thùng rác tác giả</Title>
    <Meta name="description" content="Thùng rác tác giả" />
    <Meta property="og:title" content="ReadStation | Thùng rác tác giả" />
    <Meta property="og:description" content="Thùng rác tác giả" />
  </Head>
  <div>
    <div class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden">
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-semibold">
          Tất cả tác giả đã xóa
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <a-table :columns="columns" :data-source="AuthorStore?.AuthorAdmin?.authors" :loading="AuthorStore.isLoading"
        :pagination="false">
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Mã tác giả </span>
          </template>
        </template>

        <template #bodyCell="{ column, record, index }">
          <template v-if="column.key === 'avatar'">
            <div class="flex justify-start gap-4 items-center">
              <a-avatar :src="record.avatar" :size="80" />
              <span>
                {{ record.author }}
              </span>
            </div>
          </template>
          <template v-if="column.key === 'dob'">
            <span>
              {{ $dayjs(record.dob).format("DD/MM/YYYY") }}
            </span>
          </template>
          <template v-if="column.key === 'status'">
            <a-tag :bordered="false" class="bg-tag-bg-06 text-tag-text-06">
              Đã xóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'is_featured'">
            <IconTick v-if="record.is_featured" />
            <IconMul v-else />
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top" color="black ">
                <template #title>
                  <span>Khôi phục</span>
                </template>
                <button @click="showRecoverConfirm(record?.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md">
                  <Icon icon="ic:round-settings-backup-restore" class="text-lg" />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination v-model:current="current" :total="AuthorStore?.AuthorAdmin?.totalResults"
          :pageSize="AuthorStore?.AuthorAdmin?.pageSize" show-less-items pageSizeOptions />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const AuthorStore = useAuthorStore();
const current = ref(1);
useAsyncData(
  async () => {
    try {
      await AuthorStore.getAllAuthor({
        page: current.value,
        status: "deleted",
      });
    } catch (error) {
      console.error(error);
    }
  },
  {
    immediate: true,
    watch: [current],
  }
);
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có muốn khôi phục tác giả này ?",
    okText: "Có",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onRecover(id);
    },
    onCancel() {
      console.log("Cancel");
    },
  });
};
const onRecover = async (id) => {
  try {
    const res = await AuthorStore.updateAuthor({
      id: id,
      valueAuthor: {
        status: "active",
      },
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục tác giả thành công");
      await AuthorStore.getAllAuthor({
        page: current.value,
        status: "deleted",
      });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    console.error(error);
  }
};
const columns = [
  {
    title: "Tác giả",
    dataIndex: "avatar",
    key: "avatar",
  },
  {
    title: "Ngày, tháng, năm sinh",
    dataIndex: "dob",
    key: "dob",
  },
  {
    title: "Nổi bật",
    dataIndex: "is_featured",
    key: "is_featured",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
  },
];
</script>
