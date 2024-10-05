<template>
    <div class="p-5">
        <a-modal v-model:open="props.openHistoryExtend" :footer="null" width="70%" :onCancel="handleClose"
            title="Lịch sử gia hạn">
            <a-table :columns="columns" :data-source="orderStore?.getOneOrderAdmin?.data?.extensions"
                class="components-table-demo-nested pb-5" :expanded-row-keys="expandedRowKeys" rowKey="key"
                :pagination="false">
                <template #bodyCell="{ column, index }">
                    <template v-if="column.key === 'extensions'">
                        <span>Gia hạn lần {{ index + 1 }}</span>
                    </template>
                </template>

                <template #expandedRowRender="{ record }">
                    <a-table :columns="innerColumns" :data-source="record.extension_details" :pagination="false">
                        <template #bodyCell="{ column, index }">
                            <template v-if="column.key === 'title'">
                                <span>{{ record.extension_details[index]?.loan_order_detail?.book_details?.book?.title
                                    }}</span>
                            </template>
                            <template v-if="column.key === 'number_of_days'">
                                <span>{{ record.extension_details[index]?.number_of_days }} ngày</span>
                            </template>
                            <template v-if="column.key === 'extension_fee'">
                                <span>{{ new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(record.extension_details[index]?.extension_fee) }}</span>
                            </template>
                            <template v-if="column.key === 'created_at'">
                                <span>{{ $dayjs(record.extension_details[index]?.created_at).format("DD/MM/YYYY")
                                    }}</span>
                            </template>
                            <template v-if="column.key === 'new_due_date'">
                                <span>{{ $dayjs(record.extension_details[index]?.new_due_date).format("DD/MM/YYYY")
                                    }}</span>
                            </template>
                            <template v-if="column.key === 'approved_by'">
                                <span>{{ record.approved_by?.fullname }}</span>
                            </template>
                        </template>
                    </a-table>
                </template>
            </a-table>
        </a-modal>
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    openHistoryExtend: Boolean,
    closeHistoryExtend: Function
}); const route = useRoute();
const id = route.params.id;
const orderStore = useOrderStore();
const handleClose = () => {
    props.closeHistoryExtend();
}
useAsyncData(async () => {
    await orderStore.getOneOrder(id);

    expandedRowKeys.value = orderStore?.getOneOrderAdmin?.data?.extensions.map((ext: any, index: number) => ext.key);
});

const expandedRowKeys = ref<string[]>([]);

const columns = [
    { title: 'Lần gia hạn', dataIndex: 'extensions', key: 'extensions' },
];
const innerColumns = [
    {
        title: 'Tên sách',
        dataIndex: 'title',
        key: 'title',
        width: '250px',
    },
    {
        title: 'Số ngày gia hạn',
        key: 'number_of_days',
        dataIndex: 'number_of_days',
    },
    {
        title: 'Số tiền gia hạn',
        key: 'extension_fee',
        dataIndex: 'extension_fee',
    },
    {
        title: 'Ngày gia hạn',
        key: 'created_at',
        dataIndex: 'created_at',
    },
    {
        title: 'Ngày tới hạn',
        key: 'new_due_date',
        dataIndex: 'new_due_date',
    },
    {
        title: 'Người duyệt',
        key: 'approved_by',
        dataIndex: 'approved_by',
    }
];

</script>