<template>

    <div class="col-lg-3 d-none d-lg-block">
      <a @click="changeShow" class="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse"  style="height: 65px; margin-top: -1px; padding: 0 30px;" aria-expanded="true">
            <h6 class="m-0">Danh mục</h6>
            <i class="fa fa-angle-down text-dark"></i>
        </a>
        <nav v-show="isCategoryVisible" class="position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light collapse show" id="navbar-vertical" style="width: calc(100% - 30px); z-index: 1;">
            <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
                
              <router-link
            v-for="item in list"
            :key="item.id"
            :to="{ name: 'Shop', params: { id: item.id } }"
            class="nav-item nav-link"
          >
            {{ item.title }}
          </router-link>
                <!-- <a v-for="item in list" :key="item.id" :href="item.id" class="nav-item nav-link">{{ item.title }}</a> -->
            </div>
        </nav>
    </div>
</template>
  <script setup >
  import { reactive, onMounted,ref } from 'vue';
  const list = reactive([]);
  const isCategoryVisible = ref(true)
  const changeShow = ()=>{
    isCategoryVisible.value = !isCategoryVisible.value
  }
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
    name: 'NavCategory'
  }