<template>
    <div class="w-6 flex items-center">
        <a-dropdown :trigger="['click']" placement="bottom">
            <button class="ant-dropdown-link" @click.prevent>
               <DownOutlined/>
            </button>
            <template #overlay>
                <a-menu>
                    <a-menu-item key="0">
                        <div class="text-base flex justify-center w-40">
                            <h1>Quản lý tài khoản</h1>
                        </div>
                       
                    </a-menu-item>
                    <a-menu-item key="1" >
                        <div  class="text-base flex justify-center items-center w-40">
                            <h1>Đăng xuất</h1>
                        </div>
                    </a-menu-item>

                </a-menu>
            </template>
        </a-dropdown>
    </div>
</template>

<script setup lang="ts">
</script>
