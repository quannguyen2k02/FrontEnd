<template>
    <div class="container-fluid pt-5">
        <div class="row px-xl-5 pb-3">
            <category-item v-for="item in list.slice(0,6)" :key="item.Id" :title-category="item.title"  :image-category=item.image :category-id="item.id" />
            
            
        </div>
    </div>
</template>
<script setup>
  import CategoryItem from './CategoryItem.vue'
  import {reactive, onMounted} from 'vue'
  const list = reactive([]);
  async function fetchCategories() {
  try {
    const response = await fetch("https://localhost:7061/api/ProductCategories");
    const data = await response.json();
    list.push(...data);
  } catch (ex) {
    console.log("Lỗi khi gọi API", ex);
  }
}
onMounted(fetchCategories);
  
  </script>
  export default {
    name: 'CategoryBar',
    components: {
        CategoryItem
    }
  }