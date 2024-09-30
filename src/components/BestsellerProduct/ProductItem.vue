<template>
        <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100 height-200" :src="imageProduct" alt="ảnh">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">{{ titleProduct }}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>{{ formatCurrency(pricesaleProduct) }}</h6><h6 class="text-muted ml-2"><del>{{ formatCurrency(priceProduct) }}</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <router-link :to="{name:'Detail', params:{id: productId}}" :key="productId" class="btn btn-sm text-dark p-0">
                            <i class="fas fa-eye text-primary mr-1"></i>Chi tiết
                        </router-link>
                        <a @click="addToCart" class="btn btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Thêm vào giỏ hàng</a>
                    </div>
                </div>
    </div>
    
</template>
<script setup>
    import {ref} from 'vue'
    import Cookies from 'js-cookie';

    // Nhận thông tin sản phẩm từ props
const props = defineProps({
  titleProduct: String,
  priceProduct: Number,
  pricesaleProduct: Number,
  imageProduct: String,
  productId: Number
});
    const cart = ref({
        
        items: []
    });

    function addToCart(){
        const cartFromCookies = Cookies.get('cart');
        if(cartFromCookies){
            cart.value = JSON.parse(cartFromCookies);
        }
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        const existingProduct = cart.value.items.find(item=>item.productId===props.productId);
        if (existingProduct) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
            existingProduct.quantity += 1; // Tăng số lượng lên 1
        }
        else{
            //Nếu sản phẩm chưa tồn tại thì thêm vào giỏ hàng
            cart.value.items.push({
                productId:props.productId,
                quantity : 1,
                priceSale: props.pricesaleProduct,
                titleProduct:props.titleProduct
            })
        }
         // Cập nhật cookie với thông tin giỏ hàng mới
         Cookies.set('cart', JSON.stringify(cart.value), { expires: 1 }); // Cookie hết hạn sau 7 ngày
         // Thực hiện các hành động khác sau khi thêm vào giỏ hàng, như thông báo cho người dùng
        alert("Thêm vào giỏ thành công!");
        alert(Cookies.get('cart'))
    }


const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
export default {
    name: 'ProductItem',
  }
<style>
    .height-200{
        height: 200px;
    }
</style>