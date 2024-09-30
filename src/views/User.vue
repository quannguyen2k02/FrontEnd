<template>
    <div class="container-fluid">
        <social-links />
        <nav-bar />
    </div>
    <div class="container-fluid">
        <div class="row border-top px-xl-5">
            <nav-category />
            <div class="col-lg-9">
                <h2 class="title-cart">Đơn hàng của bạn</h2>
                <div class="col-lg-12 table-responsive mb-5">
                    <table class="table table-bordered text-center mb-0">
                        <thead class="bg-secondary text-dark">
                            <tr>
                                <th>Mã đơn hàng</th>
                                <th>Tổng tiền</th>
                                <th>Phương thức thanh toán</th>
                                <th>Trạng thái</th>
                                <th>Ngày đặt</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                            <CartItemSimple v-for="item in orderData" :key="item.id" :amount="item.totalAmount"
                                :created-date="item.createdDate" :payment-method="item.typePayment"
                                :order-code="item.orderCode" :status="item.status" :orderId="item.id">
                            </CartItemSimple>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import SocialLinks from '@/components/Link/SocialLinks.vue';
import NavBar from '@/components/Header/NavBar.vue';
import NavCategory from '@/components/NavBar/NavCategory.vue';
import CartItemSimple from '@/components/Cart/CartItemSimple.vue';
import axios from 'axios';
import Cookies from 'js-cookie';

const orderData = ref(null);

const fetchOrders = async () => {
    try {
        const response = await axios.get('https://localhost:7061/api/Orders', {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        if (response.status === 200) {
            console.log(response.data);
            orderData.value = response.data; // Gán dữ liệu vào biến
        }
    } catch (error) {
        console.error('Failed to fetch orders:', error);
    }
};

// Gọi hàm fetchOrders khi component được mount
onMounted(fetchOrders);

</script>
export default {
name: 'User',
components: {
SocialLinks,
NavBar,
NavCategory,
CartItemSimple
}
}
<style>
.title-cart {
    padding: 15px;
}
</style>