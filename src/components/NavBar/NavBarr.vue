<template>

    <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            <nav-category />
            <div class="col-lg-9">
                <nav-adv />
                <advertise-image />
            </div>
        </div>
    </div>
</template>
<script >
  import NavCategory from './NavCategory.vue'
  import NavAdv from './NavAdv.vue'
  import AdvertiseImage from './AdvertiseImage.vue'


  export default {
    name: 'NavBarr',
    components: {
        NavCategory,
        NavAdv,
        AdvertiseImage
    }
  }
  </script>