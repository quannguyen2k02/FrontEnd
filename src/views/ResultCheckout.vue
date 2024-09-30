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
            <h1 v-if="success == 'True'" class="font-weight-semi-bold text-uppercase mb-3">Bạn đã thanh toán thành công!
            </h1>
            <h1 v-else class="font-weight-semi-bold text-uppercase mb-3">Thanh toán không thành công! </h1>
            <p class=" text-uppercase mb-3 mt-3">Mã đơn hàng: {{ orderId }} </p>

            <p class=" text-uppercase mb-3 mt-3">Mã giao dịch: {{ transactionId }} </p>

        </div>
    </div>

</template>
<script setup>

import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
const route = useRoute();

const orderId = ref('');
const success = ref('');
const transactionId = ref('');
onMounted(() => {
    orderId.value = route.query.orderId || 'N/A';
    success.value = route.query.success || 'N/A';
    transactionId.value = route.query.transactionId || 'N/A';
});
import SocialLinks from '@/components/Link/SocialLinks.vue'
import NavBar from '@/components/Header/NavBar.vue'
import NavCategory from '@/components/NavBar/NavCategory.vue'
import NavAdv from '@/components/NavBar/NavAdv.vue'
</script>