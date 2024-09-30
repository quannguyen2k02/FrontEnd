<template>
    <div class="col-lg-8 col-md-12">
        <div class="row">
            <div class="col-md-4 mb-5">
                <h5 class="font-weight-bold text-dark mb-4">Quick Links</h5>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Home</a>
                    <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Our Shop</a>
                    <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Shop Detail</a>
                    <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                    <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Checkout</a>
                    <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contact Us</a>
                </div>
            </div>
            <div class="col-md-4 mb-5">
                <h5 class="font-weight-bold text-dark mb-4">Quick Links</h5>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-dark mb-2" href="index.html"><i class="fa fa-angle-right mr-2"></i>Home</a>
                    <a class="text-dark mb-2" href="shop.html"><i class="fa fa-angle-right mr-2"></i>Our Shop</a>
                    <a class="text-dark mb-2" href="detail.html"><i class="fa fa-angle-right mr-2"></i>Shop Detail</a>
                    <a class="text-dark mb-2" href="cart.html"><i class="fa fa-angle-right mr-2"></i>Shopping Cart</a>
                    <a class="text-dark mb-2" href="checkout.html"><i class="fa fa-angle-right mr-2"></i>Checkout</a>
                    <a class="text-dark" href="contact.html"><i class="fa fa-angle-right mr-2"></i>Contact Us</a>
                </div>
            </div>
            <div class="col-md-4 mb-5">
                <h5 class="font-weight-bold text-dark mb-4">Đăng ký nhận thông tin</h5>
                <form @submit.prevent="subcribe">
                    <div class="form-group">
                        <input type="text" class="form-control border-0 py-4" v-model="Name" placeholder="Họ Tên"
                            required="required">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control border-0 py-4" v-model="Email" placeholder="Email"
                            required="required">
                    </div>
                    <div>
                        <button class="btn btn-primary btn-block border-0 py-3" type="submit">Đăng ký ngay</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
const Name = ref('');
const Email = ref('');
const subcribe = async () => {
    try {
        const response = await axios.post('https://localhost:7061/api/Subcribes', {
            email: Email.value,
            name: Name.value,
        });
        if (response.status === 201) {
            alert("Đăng ký thông tin thành công!");
        }
        else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    } catch (error) {
        console.error('Error', error);
    }
};

</script>

export default{
name:'LinkBar'
}