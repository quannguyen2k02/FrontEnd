<template>
    <div class="row align-items-center py-3 px-xl-5">
      <div class="col-lg-3 d-none d-lg-block">
        <a href="/" class="text-decoration-none">
          <h1 class="m-0 display-5 font-weight-semi-bold">
            <span class="text-primary font-weight-bold border px-3 mr-1">Q</span>Shopper
          </h1>
        </a>
        
      </div>
      <div class="col-lg-6 col-6 text-left">
        <search-bar />
      </div>
      <div class="col-lg-3 col-6 text-right">
        
        <a href="/cart" class="btn border">
          <i class="fas fa-shopping-cart text-primary"></i>
          <span class="badge"></span>
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import SearchBar from './SearchBar.vue'
  export default {
    name: 'NavBar',
    components: {
      SearchBar
    }
  }
  </script>
  
  <style scoped>
  /* Bạn có thể thêm các kiểu CSS tùy chỉnh tại đây */
  </style>