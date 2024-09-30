<template>
    <social-links />
    <nav-bar />
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
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Trang chủ</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Shop Detail </p>
            </div>
            <p class=" text-uppercase mb-3 mt-3">Trang thương mại chính thức của Nguyễn Anh Quân. Luôn tìm kiếm những
                sản phẩm vì game thủ.</p>

        </div>
    </div>

    <footer-bar />

</template>
<script setup>
import SocialLinks from '@/components/Link/SocialLinks.vue'
import NavBar from '@/components/Header/NavBar.vue'
import NavCategory from '@/components/NavBar/NavCategory.vue'
import NavAdv from '@/components/NavBar/NavAdv.vue'
import FooterBar from '@/components/Footer/FooterBar.vue'</script>