<template>
    <a-modal v-model:open="props.openModalBook" title="Sửa sách" :footer="null" :onCancel="handleClose"
        style="width: 1200px;">
        <form @submit.prevent="onSubmit">
            <div class="mb-4 space-y-1" v-if="errors">
                <a-alert v-for="(error, index) in errors" :message="error" type="error" show-icon />
            </div>
            <div class="flex flex-col gap-4 mt-5">
                <div class="grid grid-cols-4 gap-4">
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold">Tên sách</label>
                        <a-input class="border p-2 rounded-md h-10" v-model:value="dataGet.title" />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold">Tác giả</label>
                        <a-select v-model:value="dataGet.author" show-search size="large" placeholder="Mã tác giả"
                            :options="optionsAuthor" :filter-option="filterOption" @focus="handleFocus"
                            @blur="handleBlur" @change="handleChange" required></a-select>
                    </div>

                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold">Danh mục</label>
                        <a-select v-model:value="dataGet.category" show-search size="large" required
                            placeholder="Mã danh mục" :options="optionsCategory" :filter-option="filterOption"
                            @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
                    </div>
                    <div class="flex flex-col gap-2">
                        <label class="text-sm font-semibold">Kệ sách</label>
                        <a-select v-model:value="dataGet.shelve" show-search size="large" placeholder="Mã kệ sách"
                            :options="optionsShelve" :filter-option="filterOption" @focus="handleFocus"
                            @blur="handleBlur" @change="handleChange"></a-select>
                    </div>
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Mô tả <span class="text-red-500">*</span></label>
                    <a-textarea class="border p-2 rounded-md h-40" v-model:value="dataGet.description_summary"
                        required />
                </div>
                <div class="flex flex-col gap-2">
                    <label class="text-sm font-semibold" for="">Mô tả chi tiết <span
                            class="text-red-500">*</span></label>
                    <CommonCKEditor v-model:value="dataGet.description" required />
                </div>
            </div>
            <div class="flex justify-end items-end gap-2">
                <a-button @click="handleClose" html-type="button">Hủy</a-button>
                <a-button type="primary" html-type="submit" class="mt-4" :loading="bookStore.isSubmitting">Lưu thay
                    đổi</a-button>
            </div>
        </form>
    </a-modal>
</template>
<script setup>
const props = defineProps({
    openModalBook: Boolean,
    openModal: Function,
    id: Number,
});
const errors = ref({});
const bookID = ref(props.id);
watch(
    () => props.id,
    (newVal) => {
        bookID.value = newVal;
    }
);
const handleClose = () => {
    props.openModal();
};
const bookStore = useBookStore();
const dataGet = ref({
    title: '',
    author: '',
    category: '',
    shelve: '',
    description: '',
    description_summary: '',
})
useAsyncData(async () => {
    try {
        if (bookID.value === undefined) return;
        const data = await bookStore.getOneBookAdmin(bookID.value);
        dataGet.value.title = data?.data?._value?.data?.title;
        dataGet.value.author = data?.data?._value?.data?.author?.id;
        dataGet.value.category = data?.data?._value?.data?.category?.id;
        dataGet.value.shelve = data?.data?._value?.data?.shelve?.id;
        dataGet.value.description = data?.data?._value?.data?.description;
        dataGet.value.description_summary = data?.data?._value?.data?.description_summary;
    } catch (error) {
        console.error(error);
    }
}, {
    immediate: true,
    watch: [bookID, props.openModalBook],
});



const optionsAuthor = ref([]);
const authorValue = useAuthorStore();
const getDataAuthor = async () => {
    try {
        const data = await authorValue.getAllAuthor({
            pageSize: 1000,
        });
        optionsAuthor.value = data.data._rawValue.data.authors.map((author) => {
            return {
                value: author.id,
                label: author.author,
            };
        });
    } catch (error) {
        console.error(error);
    }
};

const optionsCategory = ref([]);
const categoryValue = useCategoryStore();
const getDataCategory = async () => {
    try {
        const data = await categoryValue.getAllCategory({ type: "book", pageSize: 1000 });
        optionsCategory.value = data.data._rawValue.data.categories.map(
            (category) => {
                return {
                    value: category.id,
                    label: category.name,
                };
            }
        );
    } catch (error) {
        console.error(error);
    }
};
const optionsShelve = ref([]);
const shelvesValue = useShelvesStore();
const getDataShelvesValue = async () => {
    try {
        const data = await shelvesValue.getAllShelves({
            pageSize: 1000,
        });
        optionsShelve.value = data.data._rawValue.data.shelves.map((shelve) => {
            return {
                value: shelve.id,
                label: shelve.description,
            };
        });
    } catch (error) {
        console.error(error);
    }
};
useAsyncData(async () => {
    await getDataAuthor();
    await getDataCategory();
    await getDataShelvesValue();
});
const onSubmit = async () => {
    try {
        const dataUpdate = {
            title: dataGet.value.title,
            author_id: dataGet.value.author,
            category_id: dataGet.value.category,
            shelve_id: dataGet.value.shelve,
            description: dataGet.value.description,
            description_summary: dataGet.value.description_summary,
        };
        const res = await bookStore.updateBook({ id: bookID.value, value: dataUpdate });
        if (res.data._rawValue?.status == true) {
            handleClose();
            message.success("Cập nhật sách thành công");
            await bookStore.getAdminBooks({});
            await bookStore.getOneBookAdmin(bookID.value)
        } else {
            errors.value = res.data._rawValue?.errors;
            message.error(res.error.value.data.message);
        }
    } catch (error) {
        console.error(error);
    }
};
</script>