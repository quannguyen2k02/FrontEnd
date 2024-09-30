<template>

    <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
        <a href="" class="text-decoration-none d-block d-lg-none">
            <h1 class="m-0 display-5 font-weight-semi-bold"><span
                    class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
        </a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
            <div class="navbar-nav mr-auto py-0">
                <a href="/" class="nav-item nav-link ">Trang chủ</a>
                <a href="/allproducts" class="nav-item nav-link">Shop</a>
                <a href="/shopdetail" class="nav-item nav-link">Shop detail</a>
                <div class="nav-item dropdown">
                    <a href="#" class="nav-link dropdown-toggle" @click.prevent="dropdown"
                        aria-expanded="false">Pages</a>
                    <div v-if="isDropdownVisible" class="dropdown-menu rounded-0 m-0">
                        <a href="/cart" class="dropdown-item">Shopping Cart</a>
                        <a href="/checkout" class="dropdown-item">Checkout</a>
                    </div>
                </div>
                <a href="/contact" class="nav-item nav-link">Liên hệ</a>
            </div>
            <div v-if="isLoggedIn" class="navbar-nav ml-auto py-0">
                <a href="/user" class="nav-item nav-link"> <i class="fas fa-user text-primary"></i>
                </a>
                <a href="" class="nav-item nav-link" @click="logout"><i
                        class="fas fa-sign-out-alt text-primary"></i></a>
            </div>
            <div v-else class="navbar-nav ml-auto py-0">
                <a href="/login" class="nav-item nav-link">Đăng nhập</a>
                <a href="/register" class="nav-item nav-link">Đăng kí</a>
            </div>
        </div>
    </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import Cookies from 'js-cookie';
// Trạng thái đăng nhập
const isLoggedIn = ref(false);
const isDropdownVisible = ref(false);

const dropdown = () => {
    isDropdownVisible.value = !isDropdownVisible.value;
}
onMounted(() => {
    // Kiểm tra xem token có tồn tại trong cookies không
    const token = Cookies.get('token');
    if (token) {
        isLoggedIn.value = true;
    } else {
        isLoggedIn.value = false;
    }
});

function logout() {
    Cookies.remove('token');
    isLoggedIn.value = false;
    // Bạn có thể thêm hành động chuyển hướng hoặc tải lại trang
}
</script>
export default {
name: 'NavAdv'
}