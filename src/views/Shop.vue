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
            <h1 class="font-weight-semi-bold text-uppercase mb-3">Sản phẩm </h1>
            <div class="d-inline-flex">
                <p class="m-0"><a href="">Trang chủ</a></p>
                <p class="m-0 px-2">-</p>
                <p class="m-0">Sản phẩm</p>
            </div>
        </div>
    </div>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5">
            <!-- Shop Sidebar Start -->
            <div class="col-lg-3 col-md-12">
                <!-- Price Start -->
                <div class="border-bottom mb-4 pb-4">
                    <h5 class="font-weight-semi-bold mb-4">Filter by price</h5>
                    <form>
                        <div
                            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" checked="" id="price-all">
                            <label class="custom-control-label" for="price-all">All Price</label>

                        </div>
                        <div
                            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-1">
                            <label class="custom-control-label" for="price-1">$0 - $100</label>

                        </div>
                        <div
                            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-2">
                            <label class="custom-control-label" for="price-2">$100 - $200</label>

                        </div>
                        <div
                            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-3">
                            <label class="custom-control-label" for="price-3">$200 - $300</label>

                        </div>
                        <div
                            class="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                            <input type="checkbox" class="custom-control-input" id="price-4">
                            <label class="custom-control-label" for="price-4">$300 - $400</label>

                        </div>
                        <div class="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                            <input type="checkbox" class="custom-control-input" id="price-5">
                            <label class="custom-control-label" for="price-5">$400 - $500</label>

                        </div>
                    </form>
                </div>
                <!-- Price End -->

            </div>
            <!-- Shop Sidebar End -->


            <!-- Shop Product Start -->
            <div class="col-lg-9 col-md-12">
                <div class="row pb-3">
                    <div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                    <product-item v-for="item in list" :key="item.Id" :titleProduct="item.title"
                        :priceProduct="item.price" :pricesaleProduct="item.priceSale" :imageProduct="item.image"
                        :productId="item.id" />

                    <div class="col-12 pb-1">
                        <nav aria-label="Page navigation">
                            <!-- <ul class="pagination justify-content-center mb-3">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul> -->
                            <ul class="pagination justify-content-center mb-3">
                                <li :class="['page-item', { disabled: currentPage === 1 }]">
                                    <a class="page-link" href="#" aria-label="Previous"
                                        @click.prevent="changePage(currentPage - 1)">
                                        <span aria-hidden="true">«</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>

                                <li v-for="page in totalPages" :key="page"
                                    :class="['page-item', { active: currentPage === page }]">
                                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                                </li>

                                <li :class="['page-item', { disabled: currentPage === totalPages }]">
                                    <a class="page-link" href="#" aria-label="Next"
                                        @click.prevent="changePage(currentPage + 1)">
                                        <span aria-hidden="true">»</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- Shop Product End -->
        </div>
    </div>
    <footer-bar />
</template>
<script setup>
import SocialLinks from '@/components/Link/SocialLinks.vue'
import NavBar from '@/components/Header/NavBar.vue'
import NavCategory from '@/components/NavBar/NavCategory.vue'
import NavAdv from '@/components/NavBar/NavAdv.vue'
import FooterBar from '@/components/Footer/FooterBar.vue'
import ProductItem from '@/components/BestsellerProduct/ProductItem.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
// const list = reactive([]);
// const route = useRoute();
// const CategoryId = route.params.id;
// async function fetchProducts() {
//     try {
//         const response = await fetch(`https://localhost:7061/api/Products/ProductsByCategory/${CategoryId}`);
//         const data = await response.json();
//         list.push(...data);
//     } catch (ex) {
//         console.log("Lỗi khi gọi API", ex);
//     }
// }
// onMounted(fetchProducts);
const list = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 8; // Số sản phẩm mỗi trang

const route = useRoute();
const CategoryId = route.params.id;

async function fetchProducts(page = 1) {
    try {
        const response = await fetch(`https://localhost:7061/api/Products/ProductsByCategory/${CategoryId}?pageNumber=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        list.value = data.products;
        totalPages.value = data.totalPages;

        currentPage.value = page;
        console.log(data)
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        fetchProducts(page);
    }
}

onMounted(() => fetchProducts(currentPage.value));

</script>
export default {
name: 'Shop',
components: {
SocialLinks,
NavBar,
NavCategory,
NavAdv,
FooterBar,
ProductItem
}
}