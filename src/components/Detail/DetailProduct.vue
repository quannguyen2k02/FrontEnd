<template>
    <div class="container-fluid py-5">
        <div class="row px-xl-5">
            <div class="col-lg-5 pb-5">
                <div id="product-carousel" class="carousel slide" data-ride="carousel">
                    <div class=" border">
                        <div class="">
                            <img class="w-100 h-100" :src="imageProduct" alt="Image">
                        </div>

                    </div>

                </div>
            </div>

            <div class="col-lg-7 pb-5">
                <h3 class="font-weight-semi-bold">{{ titleProduct }}</h3>

                <h3 class="font-weight-semi-bold mb-4">{{ formatCurrency(priceProduct) }} </h3>
                <p class="mb-4">{{ detailProduct }}</p>


                <div class="d-flex align-items-center mb-4 pt-2">
                    <button @click="addToCart" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i>
                        Thêm vào giỏ
                        hàng</button>
                </div>

            </div>
        </div>
        <div class="row px-xl-5">
            <div class="col">

                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Chi tiết sản phẩm</h4>
                        <p>{{ descriptionProduct }}</p>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import Cookies from 'js-cookie';
import { ref, onMounted } from 'vue'
// Khai báo các biến dữ liệu
const imageProduct = ref('');
const titleProduct = ref('');
const priceProduct = ref('');
const detailProduct = ref('');
const descriptionProduct = ref('');
// Nhận `productId` từ `props`
const props = defineProps({
    productId: Number
});
async function fetchProduct() {
    try {
        const response = await fetch(`https://localhost:7061/api/Products/${props.productId}`);
        const data = await response.json();
        imageProduct.value = data.image;
        titleProduct.value = data.title;
        priceProduct.value = data.priceSale;
        detailProduct.value = data.detail;
        descriptionProduct.value = data.description;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
const cart = ref({

    items: []
});

function addToCart() {
    const cartFromCookies = Cookies.get('cart');
    if (cartFromCookies) {
        cart.value = JSON.parse(cartFromCookies);
    }
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
    const existingProduct = cart.value.items.find(item => item.productId === props.productId);
    if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        existingProduct.quantity += 1; // Tăng số lượng lên 1
    }
    else {
        //Nếu sản phẩm chưa tồn tại thì thêm vào giỏ hàng
        cart.value.items.push({
            productId: props.productId,
            quantity: 1,
            priceSale: props.pricesaleProduct,
            titleProduct: props.titleProduct
        })
    }
    // Cập nhật cookie với thông tin giỏ hàng mới
    Cookies.set('cart', JSON.stringify(cart.value), { expires: 1 }); // Cookie hết hạn sau 7 ngày
    // Thực hiện các hành động khác sau khi thêm vào giỏ hàng, như thông báo cho người dùng
    alert("Thêm vào giỏ thành công!");
    alert(Cookies.get('cart'))
}
onMounted(fetchProduct);

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
