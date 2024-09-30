<template>
    <div class="col-lg-4 col-md-6 pb-1">
                <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                    <!-- <a href="" class="cat-img position-relative overflow-hidden mb-3">
                        <img class="img-fluid" :src="imageCategory" alt="Item">
                    </a> -->
                    <router-link 
                         :to="{ name: 'Shop', params: { id: categoryId } }" 
                         class="cat-img position-relative overflow-hidden mb-3">
                              <img class="img-fluid" :src="imageCategory" alt="Item">
                     </router-link>
                    <h5 class="font-weight-semi-bold m-0">{{ titleCategory }}</h5>
                </div>
            </div>
</template>
<script setup>
    defineProps({
  titleCategory: String,
  quantityCategory: Number,
  imageCategory:String,
  categoryId:Number,
})
</script>
export default {
    name: 'CategoryItem',
  }