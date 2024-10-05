<template>
    <div>
        <MenuOutlined @click="showDrawer" class="text-2xl" />
        <a-drawer v-model:open="open" class="custom-class" placement="right" @after-open-change="afterOpenChange">
            <div class="flex flex-col gap-5">
                <ul class="flex flex-col gap-2 w-full">
                    <div class="border bg-gray-200 rounded-md h-10 flex items-center justify-around">
                        <li class="text-lg text-center hover:text-blue-300">Trang chủ</li>
                    </div>
                    <div class="border bg-gray-200 rounded-md h-10 flex items-center justify-around">
                        <li class="text-lg text-center hover:text-blue-300">Cửa hàng</li>
                    </div>
                    <div class="border bg-gray-200 rounded-md h-10 flex items-center justify-around">
                        <li class="text-lg text-center hover:text-blue-300">Blog</li>
                    </div>
                    <div class="border bg-gray-200 rounded-md h-10 flex items-center justify-around">
                        <li class="text-lg text-center hover:text-blue-300">Giới thiệu</li>
                    </div>
                    <div class="border bg-gray-200 rounded-md h-10 flex items-center justify-around">
                        <li class="text-lg text-center hover:text-blue-300">Liên hệ</li>
                    </div>

                </ul>
                <div class="border-t-2">
                </div>
                <div class="rounded-md flex justify-center items-center">
                    <div class="w-3/4 flex justify-start gap-5 items-center">
                        <!-- Logo -->
                        <div>
                            <img class="w-10"
                                src="https://freeiconshop.com/wp-content/uploads/edd/person-outline-filled.png" alt="">
                        </div>
                        <!-- Tài khoản -->
                        <div>
                            <h1 class="text-lg">Tài khoản</h1>
                        </div>
                    </div>
                    <!-- Icon Dropdown -->
                    <div class="1/4">
                       <AppMobieAccount/>
                    </div>
                </div>
            </div>

        </a-drawer>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const open = ref(false);
const afterOpenChange = bool => {
    console.log('open', bool);
};
const showDrawer = () => {
    open.value = true;
};
</script>