<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">
          Tất cả nhà xuất bản đã xóa
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <a-table
        :columns="columns"
        :loading="publishingCompanyStore.isLoading"
        :data-source="
          publishingCompanyStore?.publishingCompaniesAdmin?.publishing_companies
        "
        :pagination="false"
      >
        <template #headerCell="{ column }">
          <template v-if="column.key === 'name'">
            <span> Tên nhà xuất bản </span>
          </template>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.name }}
            </a>
          </template>
          <template v-else-if="column.key === 'logo_company'">
            <a-image
              class="rounded-md"
              :width="100"
              :src="record.logo_company"
            />
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.ACTIVE"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Công khai
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.INACTIVE"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đang ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PublishingCompanyStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top" color="black ">
                <template #title>
                  <span>Khôi phục</span>
                </template>
                <button
                  @click="showRecoverConfirm(record.id)"
                  class="group hover:bg-[#212122]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="ic:round-settings-backup-restore"
                    class="text-lg"
                  />
                </button>
              </a-tooltip>
            </div>
          </template>
        </template>
      </a-table>
      <div class="mt-4 flex justify-end">
        <a-pagination
        v-if="publishingCompanyStore?.publishingCompaniesAdmin?.totalResults > 10"
          v-model:current="current"
          :total="
            publishingCompanyStore?.publishingCompaniesAdmin?.totalResults
          "
          :pageSize="publishingCompanyStore?.publishingCompaniesAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Icon } from "@iconify/vue";
import { Modal } from "ant-design-vue";
import { PublishingCompanyStatus } from "~/types/admin/publishingCompany";

const publishingCompanyStore = usePublishingCompanyStore();
const current = ref(1);

useAsyncData(
  async () => {
    await publishingCompanyStore.getAllPublishingCompany({
      page: current.value,
      status: "deleted",
    });
  },
  {
    immediate: true,
    watch: [current],
  }
);

const onRecover = async (id) => {
  try {
    const res = await publishingCompanyStore.updatePublishingCompany({
      id: id,
      publishingCompany: { status: "active" },
    });
    if (res.data._rawValue?.status == true) {
      message.success("Khôi phục thành công");
      await publishingCompanyStore.getAllPublishingCompany({
        page: current.value,
        status: "deleted",
      });
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Khôi phục không thành công");
  }
};

const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có chắc chắn muốn khôi phục?",
    content:
      "Nhà xuất bản sẽ được khôi phục và hiển thị trên tất cả nhà xuất bản",
    okText: "Khôi phục",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onRecover(id);
    },
    onCancel() {
    },
  });
};

const columns = [
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Hình ảnh",
    dataIndex: "logo_company",
    key: "logo_company",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Trạng thái",
    key: "status",
    dataIndex: "status",
  },
  {
    title: "Thao tác",
    key: "action",
  },
];
useSeoMeta({
  title: "ReadStation | Thùng rác nhà xuất bản",
  ogTitle: "ReadStation | Thùng rác nhà xuất bản",
  description: "Thùng rác nhà xuất bản",
  ogDescription: "Thùng rác nhà xuất bản",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
