<template>
    <social-links />
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Thanh toán </h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Trang chủ</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Thanh toán</p>
            </div>
        </div>
    </div>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-6">

                <h5 class="font-weight-bold text-dark mb-4">Thông tin nhận hàng</h5>
                <form @submit.prevent="order">
                    <div class="form-group"><input type="text" class="form-control  py-4 border-input" placeholder="Họ"
                            required="required" v-model="lastName"></div>
                    <div class="form-group"><input type="text" class="form-control  py-4 border-input" placeholder="Tên"
                            required="required" v-model="firstName"></div>
                    <div class="form-group"><input type="email" class="form-control py-4 border-input"
                            placeholder="Email" v-model="email"></div>
                    <div class="form-group"><input type="text" class="form-control py-4 border-input"
                            placeholder="Địa chỉ" required="required" v-model="address"></div>
                    <div class="form-group"><input type="text" class="form-control py-4 border-input"
                            placeholder="Số điện thoại" required="required" v-model="phoneNumber"></div>
                    <!-- Phương thức thanh toán -->
                    <div class="form-group">
                        <label><input type="radio" name="payment" value="cod" v-model="paymentMethod"> Thanh toán khi
                            nhận hàng
                            (COD)</label>
                    </div>
                    <div class="form-group">
                        <label><input type="radio" name="payment" value="momo" v-model="paymentMethod"> Thanh toán qua
                            ngân hàng</label>
                    </div>
                    <button class="btn btn-block btn-primary my-3 py-3">Tiến hành thanh toán</button>

                </form>


            </div>
            <div class="col-lg-6 table-responsive mb-5">
                <table class="table table-bordered text-center mb-0">
                    <thead class="bg-secondary text-dark">
                        <tr>
                            <th>Sản phẩm</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                            <th>Xóa</th>
                        </tr>
                    </thead>
                    <tbody class="align-middle">
                        <cart-item v-for="item in JSON.parse(Cookies.get('cart')).items" :key="item.productId"
                            :product-id="item.productId" :quantity-product="item.quantity" />
                    </tbody>
                </table>
                <div class="card border-secondary mb-5">
                    <div class="card-header bg-secondary border-0">
                        <h4 class="font-weight-semi-bold m-0">Kiểm tra</h4>
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-3 pt-1">
                            <h6 class="font-weight-medium">Giá trị đơn hàng</h6>
                            <h6 class="font-weight-medium">{{ formatCurrency(totalPrice) }}</h6>
                        </div>
                        <div class="d-flex justify-content-between">
                            <h6 class="font-weight-medium">Phí Ship</h6>
                            <h6 class="font-weight-medium">0</h6>
                        </div>
                    </div>
                    <div class="card-footer border-secondary bg-transparent">
                        <div class="d-flex justify-content-between mt-2">
                            <h5 class="font-weight-bold">Tổng</h5>
                            <h5 class="font-weight-bold">{{ formatCurrency(totalPrice) }}</h5>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <footer-bar />

</template>
<script setup>
import Cookies from 'js-cookie';
import { ref } from 'vue'
import axios from 'axios';
import router from '@/router';

import SocialLinks from '@/components/Link/SocialLinks.vue'
import FooterBar from '@/components/Footer/FooterBar.vue';
import CartItem from '@/components/Cart/CartItem.vue';
const totalPrice = ref(0);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const address = ref('');
const phoneNumber = ref('');
const paymentMethod = ref('');
const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { items: [] };
totalPrice.value = cart.items.reduce((accumulator, item) => {
    return accumulator + (item.priceSale * item.quantity);
}, 0);
//


const updatedItems = cart.items.map(item => {
    return {
        productId: item.productId,
        quantity: item.quantity
    };
});

const order = async () => {
    try {
        const payment = paymentMethod.value;
        if (payment == 'cod') {
            const response = await axios.post('https://localhost:7061/api/Orders',
                {
                    customerName: firstName.value,
                    phone: phoneNumber.value,
                    address: address.value,
                    email: email.value,
                    items: updatedItems
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

            if (response.status === 200) {
                alert("đặt hàng thành công");
                Cookies.remove('cart')
            }
        }
        else if (payment == 'momo') {
            const response = await axios.post('https://localhost:7061/api/Orders/vnpay',
                {
                    customerName: firstName.value,
                    phone: phoneNumber.value,
                    address: address.value,
                    email: email.value,
                    items: updatedItems
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

            if (response.status === 200) {
                console.log(response.data)
                window.location.href = response.data;
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Bạn cần phải đăng nhập!');
            router.push('/login');
        } else {
            console.error('Error logging in:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    }
};


const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
export default {
name: 'Checkout',
components: {
SocialLinks,

FooterBar,
CartItem
}
}

<style type="text/css">
.border-input {
    border: 1px solid #ccc;
}
</style>