<template>
  <a-modal
    v-model:open="open"
    @ok="handleOk"
    :footer="null"
    :onCancel="handleClose"
  >
    <div class="p-5">
      <div class="text-base font-semibold mb-5">Thêm kệ</div>
      <a-dropdown :open="valueSearch ? true : false">
        <a-input
          v-model:value="valueSearch"
          placeholder="Nhập tên kệ để tìm kiếm"
          class="h-10"
          allow-clear
          @click.prevent
        >
          <template #prefix>
            <SearchOutlined />
          </template>
        </a-input>
        <template #overlay>
          <a-menu class="overflow-auto max-h-[400px]">
            <a-menu-item v-if="shelvesStore.isLoading">
              <div class="p-10 flex justify-center">
                <a-spin />
              </div>
            </a-menu-item>
            <a-menu-item
              v-else
              v-for="(items, index) in shelvesStore?.adminBookSheleves?.shelves"
              :key="index"
            >
              <div
                class="flex justify-start gap-5 items-center"
                v-if="shelvesStore?.adminBookSheleves?.shelves"
                @click="showConfirm(items.id)"
              >
                <div class="text-base font-medium">
                  {{ items?.bookshelf_code }} - {{ items?.name }}
                </div>
              </div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </a-modal>
</template>

<script setup>
import { ref } from "vue";
import { Modal } from "ant-design-vue";
import debounce from "lodash.debounce";
const route = useRoute();
const detailBookCaseId = route.params.id;
const current = ref(1);
const bookCaseStore = useBookcaseStore();
const shelvesStore = useShelvesStore();
const valueSearch = ref("");

const onSearch = debounce(() => {
  current.value = 1;
  shelvesStore.getAllShelves({
    search: valueSearch.value,
  });
}, 500);
watch(valueSearch, onSearch);

useAsyncData(
  async () => {
    await shelvesStore.getAllShelves({
      search: valueSearch.value,
    });
  },
  {
    immediate: true,
    watch: [current],
  }
);
const handleClose = () => {
  valueSearch.value = "";
  props.openModal();
};
const props = defineProps({
  openModalAdd: Boolean,
  openModal: Function,
});
const open = ref(props.openModalAdd);
watch(
  () => props.openModalAdd,
  (newVal) => {
    open.value = newVal;
  }
);
const showConfirm = (id) => {
  Modal.confirm({
    title: "Bạn có muốn thêm kệ sách này vào tủ không?",

    onOk() {
      updateDetailCase(id);
    },
    onCancel() {
    },
    class: "test",
  });
};
const updateDetailCase = async (id) => {
  const idCase = {
    bookcase_id: bookCaseStore?.bookCase?.id,
  };
  try {
    const res = await shelvesStore.updateShelves({
      id: id,
      valueUpdateShelves: idCase,
    });
    if (res.data._rawValue?.status == true) {
      handleClose();
      message.success("Thêm kệ sách thành công");
      await bookCaseStore.getOneBookcase(detailBookCaseId);
      await bookCaseStore.getShelveOfBookcase({
        id: detailBookCaseId,
      });
      
    } else {
      errors.value = res.error.value.data.errors;
      message.error(res.error.value.data.message);
    }
  } catch (error) {
    message.error("Thêm kệ sách thất bại");
  }
};
</script>
<style scoped>
.certain-category-search-dropdown .ant-select-dropdown-menu-item-group-title {
  color: #666;
  font-weight: bold;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item-group {
  border-bottom: 1px solid #f6f6f6;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item {
  padding-left: 16px;
}

.certain-category-search-dropdown .ant-select-dropdown-menu-item.show-all {
  text-align: center;
  cursor: default;
}

.certain-category-search-dropdown .ant-select-dropdown-menu {
  max-height: 300px;
}
</style>
