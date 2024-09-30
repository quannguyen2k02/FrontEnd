<template>
    <nav class="sidebar bg-primary">
        <ul>
            <li @click="changeComponent('Dashboard')"><i class="fa-solid fa-house text-white"></i> Trang chủ</li>
            <li @click="changeComponent('ProductManagement')"><i class="fa-solid fa-laptop text-white"></i> Quản lý sản
                phẩm
            </li>
            <li @click="changeComponent('CategoryManagement')"> <i class="fa-solid fa-folder text-white"></i> Quản lý
                danh
                mục</li>
            <li @click="changeComponent('OrderManagement')"><i class="fa-solid fa-cart-shopping text-white"></i> Quản lý
                đơn hàng</li>
            <li @click="changeComponent('UserManagement')"> <i class="fa-solid fa-users text-white"></i> Quản lý người
                dùng</li>
            <li @click="changeComponent('ResponseManagement')"> <i class="fa-solid fa-reply text-white"></i> Quản lý
                phản hồi</li>
            <li @click="changeComponent('SubcribeManagement')"> <i class="fa-solid fa-registered text-white"></i> Quản
                lý
                người đăng ký</li>
            <!-- Thêm các mục khác tại đây -->
        </ul>
    </nav>
</template>
<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(['change-component']);

function changeComponent(componentName) {
    emit('change-component', componentName);
}
</script>
<style scoped>
.sidebar {
    width: 20%;
    color: white;
    border-top: 0.5px solid #ccc;
    border-radius: 0px 0px 10px 10px;
}

.sidebar ul {
    list-style-type: none;
    padding-left: 0;

}

.sidebar li {
    padding: 15px 50px;

    cursor: pointer;
    border-radius: 10px;
}

.sidebar li:hover {
    background-color: #c17a74;
}
</style>