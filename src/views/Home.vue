<template>
  <div>
    <social-links />
    <nav-bar />
    <NavBarr />
    <featured-bar />
    <CategoryBar />

    <bestseller-product />
    <subcribe-bar />
    <new-product />
    <footer-bar />
  </div>
</template>

<script>
import SocialLinks from '@/components/Link/SocialLinks.vue'
import NavBar from '@/components/Header/NavBar.vue'
import NavBarr from '@/components/NavBar/NavBarr.vue'
import FeaturedBar from '@/components/Featured/FeaturedBar.vue'
import CategoryBar from '@/components/CategoryBar/CategoryBar.vue'
import OfferBar from '@/components/Offer/OfferBar.vue'
import BestsellerProduct from '@/components/BestsellerProduct/BestsellerProduct.vue'
import SubcribeBar from '@/components/Subcribe/SubcribeBar.vue'
import NewProduct from '@/components/NewProduct/NewProduct.vue'
import FooterBar from '@/components/Footer/FooterBar.vue'
export default {
  name: 'Home',
  components: {
    SocialLinks,
    NavBar,
    NavBarr,
    FeaturedBar,
    CategoryBar,
    OfferBar,
    BestsellerProduct,
    SubcribeBar,
    NewProduct,
    FooterBar
  },

}
</script>

<style scoped>
/* Bạn có thể thêm các kiểu CSS tùy chỉnh tại đây */
</style>