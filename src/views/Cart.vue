<template>
    <div class="container-fluid">
        <social-links />
        <nav-bar />
    </div>
    <div class="container-fluid">
        <div class="row border-top px-xl-5">
            <nav-category />
            <div class="col-lg-9">
                <nav-adv />
            </div>
        </div>
    </div>
    <div class="container-fluid bg-secondary mb-5">
        <div class="d-flex flex-column align-items-center justify-content-center" style="min-height: 300px">
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Giỏ hàng </h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Trang chủ</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Giỏ hàng</p>
            </div>
        </div>
    </div>

    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <div class="col-lg-8 table-responsive mb-5">
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
                    <tbody v-if="JSON.parse(Cookies.get('cart')).items.length > 0" class="align-middle">
                        <cart-item v-for="item in JSON.parse(Cookies.get('cart')).items" :key="item.productId"
                            :product-id="item.productId" :quantity-product="item.quantity" />
                    </tbody>
                    <tbody v-else>
                        <h1>Giỏ hàng của bạn trống!</h1>
                    </tbody>
                </table>
            </div>
            <div class="col-lg-4">

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
                        <router-link to="/checkout">
                            <button :disabled="isCartEmpty()" class="btn btn-block btn-primary my-3 py-3">Tiến hành
                                thanh
                                toán</button>

                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer-bar />
</template>
<script setup>
import Cookies from 'js-cookie';
import { onMounted, ref, watch } from 'vue'

import SocialLinks from '@/components/Link/SocialLinks.vue'
import NavBar from '@/components/Header/NavBar.vue';
import NavCategory from '@/components/NavBar/NavCategory.vue';
import NavAdv from '@/components/NavBar/NavAdv.vue';
import FooterBar from '@/components/Footer/FooterBar.vue';
import CartItem from '@/components/Cart/CartItem.vue';
const totalPrice = ref(0);
const isCartEmpty = () => {
    const cart = JSON.parse(Cookies.get('cart'));
    if (cart.items.length === 0) {
        return true;
    }
    return false;
}
const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { items: [] };
totalPrice.value = cart.items.reduce((accumulator, item) => {
    return accumulator + (item.priceSale * item.quantity);
}, 0);

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

</script>
export default {
name: 'Cart',
components: {
SocialLinks,
NavBar,
NavCategory,
NavAdv,
FooterBar,
CartItem
}
}