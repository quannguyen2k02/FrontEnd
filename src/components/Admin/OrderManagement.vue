<template>
    <div class="toolbar">
        <router-link to="/admin/addorder">
            <button class="btn-add">Thêm</button>

        </router-link>

        <select class="select" @change="handleSelectChange">
            <option value="all">Tất cả</option>
            <option value="unconfirmed">Chưa xác nhận</option>

            <option value="confirmed">Đã xác nhận</option>
            <option value="shipping">Đang vận chuyển</option>
            <option value="delivered">Giao thành công</option>
        </select>
    </div>


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
                    <div v-if="item.status == 0" style="background-color: red; border-radius: 10px; color: white;">{{
                        getStatusLabel(item.status) }}</div>
                    <div v-if="item.status == 1" style="background-color: blue; border-radius: 10px;color: white;">{{
                        getStatusLabel(item.status) }}</div>
                    <div v-if="item.status == 2" style="background-color: yellow; border-radius: 10px;color: black;">{{
                        getStatusLabel(item.status) }}</div>
                    <div v-if="item.status == 3" style="background-color: #4CAF50; border-radius: 10px;color: white;">{{
                        getStatusLabel(item.status) }}</div>
                    <div v-if="item.status == 4" style="background-color: black; border-radius: 10px;color: white;">{{
                        getStatusLabel(item.status) }}</div>
                </td>
                <td>{{ getPaymentMethod(item.typePayment) }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.createdDate }}</td>
            </tr>

        </tbody>

    </table>

</template>
<script setup>
import router from '@/router';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const list = ref([]);
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
async function fetchOrders() {
    try {
        const response = await fetch(`https://localhost:7061/api/Orders/GetAllOrders`);
        const data = await response.json();
        list.value = data;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}

//select

const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;

    let apiUrl = '';
    console.log(selectedValue);
    // Kiểm tra giá trị đã chọn để gọi API tương ứng
    switch (selectedValue) {
        case 'all':
            apiUrl = 'https://localhost:7061/api/Orders/GetAllOrders'; // API lấy tất cả đơn hàng
            break;
        case 'unconfirmed':
            apiUrl = 'https://localhost:7061/api/Orders/GetUnconfirmOrder'; // API lấy tất cả đơn hàng
            break;
        case 'confirmed':
            apiUrl = 'https://localhost:7061/api/Orders/GetConfirmedOrder'; // API cho đơn hàng đã xác nhận
            break;
        case 'shipping':
            apiUrl = 'https://localhost:7061/api/Orders/GetShippingOrder'; // API cho đơn hàng đang vận chuyển
            break;
        case 'delivered':
            apiUrl = 'https://localhost:7061/api/Orders/GetDeliveredOrder'; // API cho đơn hàng đã giao
            break;
    }
    // Gọi API và cập nhật danh sách
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        // Cập nhật dữ liệu vào list
        list.value = response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


function editOrder(orderId) {
    router.push({ name: 'editorder', params: { id: orderId } });
}

onMounted(() => fetchOrders());
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
<style scoped>
.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.product-table th,
.product-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
}

.product-table th {
    background-color: #f2f2f2;
}

.product-table tr:hover {
    cursor: pointer;
    background-color: #e4d6d6;
}

.product-table img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.toolbar {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.toolbar button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.toolbar button:hover {
    background-color: #45a049;
}

.select {
    border-radius: 4px;
}
</style>