<template>
  <div>
    <div
      class="flex flex-col gap-2 py-4 md:flex-row md:items-center print:hidden"
    >
      <div class="grow">
        <h5 class="text-xl text-[#1e293b] font-bold">
          Tất cả bài viết đang xử lý
        </h5>
      </div>
    </div>

    <div class="bg-white min-h-[360px] w-full rounded-lg p-5 shadow-sm">
      <div class="flex justify-between pb-4">
        <div class="w-1/2 flex items-center gap-2">
          <div class="md:block hidden">
            <div class="flex">
              <a-input
                placeholder="Nhập tên bài viết để tìm kiếm"
                class="h-10 w-[400px]"
                v-model:value="valueSearch"
              >
                <template #prefix>
                  <SearchOutlined />
                </template>
              </a-input>
            </div>
          </div>
          <a-dropdown :trigger="['click']">
            <template #overlay>
              <a-menu class="">
                <a-menu-item
                  @click="
                    statusValue({ value: 'handle', label: 'Tất cả trạng thái' })
                  "
                  >Tất cả trạng thái</a-menu-item
                >

                <a-menu-item
                  @click="
                    statusValue({ value: 'wating_approve', label: 'Chờ duyệt' })
                  "
                  >Chờ duyệt</a-menu-item
                >
                <a-menu-item
                  @click="
                    statusValue({ value: 'approve_canceled', label: 'Từ chối' })
                  "
                  >Từ chối</a-menu-item
                >
              </a-menu>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{ queryStatus.label ? queryStatus.label : "Tất cả trạng thái" }}
              <DownOutlined />
            </a-button>
          </a-dropdown>

          <a-dropdown :trigger="['click']">
            <template #overlay>
              <div>
                <a-menu>
                  <a-menu-item>
                    <div
                      @click="
                        categoryValue({ id: null, label: ' Tất cả danh mục' })
                      "
                    >
                      Tất cả danh mục
                    </div>
                  </a-menu-item>
                  <a-menu-item
                    v-for="(items, index) in categoryStore?.categoriesAdmin
                      ?.categories"
                    :key="index"
                  >
                    <div
                      @click="
                        categoryValue({ id: items?.id, label: items?.name })
                      "
                    >
                      {{ items.name }}
                    </div>
                  </a-menu-item>
                </a-menu>
              </div>
            </template>
            <a-button size="large" class="flex gap-3 items-center">
              {{
                categoryQuery.label ? categoryQuery.label : " Tất cả danh mục"
              }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </div>
      </div>

      <a-table
        :columns="columns"
        :loading="postStore.isLoading"
        :data-source="postStore?.postsAdmin.posts"
        :pagination="false"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-if="column.key === 'name'">
            <a>
              {{ record.title }}
            </a>
          </template>
          <template v-if="column.key === 'category_id'">
            <span>
              {{ record.category.name }}
            </span>
          </template>
          <template v-if="column.key === 'user_id'">
            <span>
              {{ record.user.fullname }}
            </span>
          </template>
          <template v-if="column.key === 'view'">
            <span> {{ record.view }} lượt xem </span>
          </template>
          <template v-else-if="column.key === 'image'">
            <a-image
              class="rounded-md"
              :width="70"
              :height="70"
              :src="record.image"
            />
          </template>
          <template v-else-if="column.key === 'reason_cancel'">
            <span>
              {{ record.reason_cancel }}
            </span>
          </template>
          <template v-else-if="column.key === 'status'">
            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.WATING_APPROVE"
              class="bg-tag-bg-01 text-tag-text-01"
            >
              Chờ duyệt
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.DRAFT"
              class="bg-tag-bg-08 text-tag-text-08"
            >
              Bản nháp
            </a-tag>
            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.PUBLISHED"
              class="bg-tag-bg-09 text-tag-text-09"
            >
              Đang hoạt động
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.HIDDEN"
              class="bg-tag-bg-07 text-tag-text-07"
            >
              Đã ẩn
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.DELETED"
              class="bg-tag-bg-06 text-tag-text-06"
            >
              Đã xóa
            </a-tag>

            <a-tag
              :bordered="false"
              v-if="record.status === PostStatus.APPROVE_CANCELED"
              class="bg-tag-bg-11 text-tag-text-11"
            >
              Từ chối
            </a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <div class="flex text-[16px] gap-2">
              <a-tooltip placement="top" color="black">
                <template #title>
                  <span>Xem chi tiết</span>
                </template>
                <button
                  @click="showModalDetail(record.id)"
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center cursor-pointer justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="heroicons:eye"
                    class="group-hover:text-[#212122]"
                  />
                </button>
              </a-tooltip>
              <a-dropdown
                v-if="record.status !== PostStatus.APPROVE_CANCELED"
                :trigger="['click']"
                placement="bottom"
              >
                <button
                  class="group hover:bg-[#131313]/20 bg-[#e4e1e1] flex items-center justify-center w-8 h-8 rounded-md"
                >
                  <Icon
                    icon="humbleicons:dots-horizontal"
                    class="group-hover:text-[#131313]"
                  />
                </button>
                <template #overlay>
                  <a-menu class="space-y-1">
                    <a-menu-item key="2" class="p-4 hover:!bg-tag-bg-02">
                      <button
                        @click="showRecoverConfirm(record.id)"
                        class="flex items-center gap-2"
                      >
                        <Icon
                          icon="charm:circle-tick"
                          class="text-lg text-tag-text-02"
                        />
                        <span class="text-tag-text-02 font-bold"
                          >Chấp nhận</span
                        >
                      </button>
                    </a-menu-item>

                    <a-menu-item key="3" class="p-4 hover:!bg-tag-bg-06">
                      <button
                        @click="showCancelConfirm(record.id)"
                        class="flex items-center gap-2"
                        :isloading="postStore.isSubmitting"
                      >
                        <Icon
                          icon="ic:outline-cancel"
                          class="text-lg font-bold text-tag-text-06"
                        />
                        <span class="text-tag-text-06 font-bold">Từ chối</span>
                      </button>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </template>
        </template>
      </a-table>
      <PostAdminConfirm
        :openModalConfirm="openModalConfirm"
        :openModal="CloseModalConfirm"
        :status="status"
        :id="postAwaitId"
      />
      <PostAdminDetail
        :openModalDetail="openModalDetail"
        :openModal="CloseModalDetail"
        :postDetailId="postDetailId"
      />
      <div class="mt-4 flex justify-end">
        <a-pagination
        v-if="postStore?.postsAdmin?.totalResults > 10"
          v-model:current="current"
          :total="postStore?.postsAdmin?.totalResults"
          :pageSize="postStore?.postsAdmin?.pageSize"
          show-less-items
          pageSizeOptions
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Modal } from "ant-design-vue";
import { Icon } from "@iconify/vue";
import { PostStatus } from "~/types/admin/post";
import debounce from "lodash.debounce";
const postStore = usePostStore();
const openModalConfirm = ref(false);
const openModalDetail = ref(false);
const postAwaitId = ref("");
const postDetailId = ref();
const categoryStore = useCategoryStore();
const status = ref("");
const current = ref(1);
const valueSearch = ref("");
const categoryQuery = ref({
  id: "",
  label: "",
});
const queryStatus = ref({
  value: "handle",
  label: "",
});
const categoryValue = ({ id, label }) => {
  categoryQuery.value.id = id;
  categoryQuery.value.label = label;
};
const statusValue = ({ value, label }) => {
  queryStatus.value.value = value;
  queryStatus.value.label = label;
};
const onSearch = debounce(() => {
  current.value = 1;
  postStore.getAllPost({
    page: current.value,
    search: valueSearch.value,
    category_id: categoryQuery.value.id,
    status: queryStatus.value.value,
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await postStore.getAllPost({
      page: current.value,
      search: valueSearch.value,
      category_id: categoryQuery.value.id,
      status: queryStatus.value.value,
    });
  },
  {
    immediate: true,
    watch: [current, valueSearch, queryStatus.value],
  }
);
useAsyncData(async () => {
  await categoryStore.getAllCategory({
    type: "post",
  });
});

const onRecover = async (id) => {
  try {
    const res = await postStore.updatePost({
      id: id,
      post: { status: "published" },
    });
    if (res.data._rawValue?.status == true) {
      await postStore.getAllPost({
        page: current.value,
        status: queryStatus.value.value,
      });
      message.success("Duyệt bài viết thành công");
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Duyệt bài viết thất bại");
  }
};
const showRecoverConfirm = (id) => {
  Modal.confirm({
    title: "Ban có chắc chắn muốn duyệt bài viết này?",
    content: "Bài viết sẽ được duyệt và hiển thị trên tất cả bài viết",
    okText: "Duyệt",
    okType: "danger",
    cancelText: "Hủy",
    onOk() {
      onRecover(id);
    },
    onCancel() {
    },
  });
};

const showCancelConfirm = (id) => {
  openModalConfirm.value = true;
  postAwaitId.value = id;
  status.value = "approve_canceled";
};

const CloseModalConfirm = () => {
  openModalConfirm.value = false;
};

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
  },
  {
    title: "Tên bài viết",
    dataIndex: "title",
    key: "title",
    width: "250px",
  },
  {
    title: "Người đăng",
    dataIndex: "user_id",
    key: "user_id",
  },

  {
    title: "Danh mục",
    dataIndex: "category_id",
    key: "category_id",
  },
  {
    title: "Lượt xem",
    dataIndex: "view",
    key: "view",
  },
  {
    title: "Lý do từ chối",
    dataIndex: "reason_cancel",
    key: "reason_cancel",
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
const CloseModalDetail = () => {
  openModalDetail.value = false;
};
const showModalDetail = (id) => {
  openModalDetail.value = true;
  postDetailId.value = id;
};
useSeoMeta({
  title: "ReadStation | Bài viết đang xử lý",
  ogTitle: "ReadStation | Bài viết đang xử lý",
  description: "Bài viết đang xử lý",
  ogDescription: "Bài viết đang xử lý",
  ogImage: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
  twitterCard: "https://readstation.store/_nuxt/logo_header.DUGKFBsU.svg",
});
</script>
