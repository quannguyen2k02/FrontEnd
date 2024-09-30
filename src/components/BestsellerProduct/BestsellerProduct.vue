<template>
    <div class="container-fluid pt-5">
        <div class="text-center mb-4">
            <h2 class="section-title px-5"><span class="px-2">Sản phẩm HOT</span></h2>
        </div>
        <div class="row px-xl-5 pb-3">
            <product-item v-for="item in list.slice(0,8)" :key="item.Id" :titleProduct="item.title" :priceProduct="item.price" :pricesaleProduct="item.priceSale" :imageProduct="item.image" :productId="item.id" />
            
        </div>
    </div>
</template>
<script setup>
    import ProductItem from './ProductItem.vue'
    import {reactive, onMounted} from 'vue'
    const list = reactive([]);
    async function fetchProducts() {
        try {
           const response = await fetch("https://localhost:7061/api/Products/HotProducts");
           const data = await response.json();
            list.push(...data);
            console.log(list);
        } catch (ex) {
            console.log("Lỗi khi gọi API", ex);
        }
    }
onMounted(fetchProducts);
</script>
export default{
    name:'BestsellerProduct',
    components: {
        ProductItem
    }
}