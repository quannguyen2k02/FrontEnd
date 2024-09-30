<template>

    <header class="header bg-primary">
        <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="/" class="text-decoration-none">
                    <h1 class="m-0 display-5 font-weight-semi-bold font-30">
                        <span class=" font-weight-bold border px-3 mr-1">Q</span>Shopper
                    </h1>
                </a>

            </div>
            <div class="col-lg-6 col-6 text-left">
                <search-bar />
            </div>
            <div class="col-lg-3 col-6 text-right">

                <a href="" class="nav-item nav-link" @click="logout"><i class="fas fa-sign-out-alt text-white"></i></a>


            </div>
        </div>
    </header>


</template>
<script setup>
import router from '@/router';
import Cookies from 'js-cookie';

function logout() {
    Cookies.remove('token');
    router.push('/login');
    // Bạn có thể thêm hành động chuyển hướng hoặc tải lại trang
}</script>
<style scoped>
/* .header {
    height: 80px;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;

}

.header h1 {
    margin: 0;
    font-size: 24px;
    padding: 30px 0px;
} */
.font-30 {
    font-size: 30px;
}
</style>