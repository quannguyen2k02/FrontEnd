<template>
    <h1 class="title-form">Chi tiết khách hàng</h1>
    <div class="container mt-5  ">
        <form class="form-add" @submit.prevent="">
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Id</label>
                <input type="text" disabled class="form-control" v-model="Id" required />
            </div>
            <div class="form-group mb-3">
                <label for="productName" class="form-label">UserName</label>
                <input type="text" disabled class="form-control" v-model="UserName" required />
            </div>
            <div class="form-group mb-4">
                <label for="productImage" class="form-label">Email</label>
                <img style="width: 100px;" :src=image>
                <input type="text" disabled class="form-control" v-model="Email" required />
            </div>
            <h2>Tổng số đơn hàng: {{ total }}</h2>
        </form>

        <table class="product-table">
            <thead>
                <tr>
                    <th>Mã đơn hàng</th>
                    <th>Họ tên</th>
                    <th>Giá tiền</th>
                    <th>Tình trạng</th>
                    <th>Phương thức thanh toán</th>
                    <th>Địa chỉ</th>
                    <th>Ngày tạo</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="item in list" :key="item.id" @click="editOrder(item.id)">
                    <td>{{ item.id }}</td>
                    <td>{{ item.customerName }}</td>
                    <td>{{ formatCurrency(item.totalAmount) }}</td>
                    <td>
                        <div v-if="item.status == 0" style="background-color: red; border-radius: 10px; color: white;">
                            {{
                                getStatusLabel(item.status) }}</div>
                        <div v-if="item.status == 1" style="background-color: blue; border-radius: 10px;color: white;">
                            {{
                                getStatusLabel(item.status) }}</div>
                        <div v-if="item.status == 2"
                            style="background-color: yellow; border-radius: 10px;color: black;">{{
                                getStatusLabel(item.status) }}</div>
                        <div v-if="item.status == 3"
                            style="background-color: #4CAF50; border-radius: 10px;color: white;">{{
                                getStatusLabel(item.status) }}</div>
                        <div v-if="item.status == 4" style="background-color: black; border-radius: 10px;color: white;">
                            {{
                                getStatusLabel(item.status) }}</div>
                    </td>
                    <td>{{ getPaymentMethod(item.typePayment) }}</td>
                    <td>{{ item.address }}</td>
                    <td>{{ item.createdDate }}</td>
                </tr>

            </tbody>
        </table>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';
const UserName = ref('');
const Email = ref('');

const props = defineProps({
    userId: Number
});
const Id = ref('');
const list = ref([]);
const total = ref(0);
//Hiển thị
async function getuser() {
    try {
        const response = await fetch(`https://localhost:7061/api/Users/GetUserById/${props.userId}`);
        const data = await response.json();
        UserName.value = data.userName;
        Email.value = data.email;
        Id.value = data.id;

    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
async function getorder() {
    try {
        const response = await fetch(`https://localhost:7061/api/Orders/GetOrderByCustomerId/${props.userId}`);
        const data = await response.json();
        list.value = data;
        total.value = list.value.length;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}

const getStatusLabel = (status) => {
    switch (status) {
        case 0:
            return 'Chưa xác nhận';
        case 1:
            return 'Đã xác nhận';
        case 2:
            return 'Đang vận chuyển';
        case 3:
            return 'Đã nhận hàng';
        case 4:
            return 'Hủy';
        default:
            return 'Không rõ tình trạng';
    }
};
const getPaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
        case 0:
            return 'Chưa thanh toán';
        case 1:
            return 'Thanh toán chuyển khoản';
        case 2:
            return 'Thanh toán khi nhận hàng';

        default:
            return 'Không rõ tình trạng';
    }
};
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
onMounted(() => {
    getuser();
    getorder();
});
</script>