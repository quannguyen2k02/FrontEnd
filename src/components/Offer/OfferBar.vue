<template>
    <div class="container-fluid offer pt-5">
        <div class="row px-xl-5">
            <offer-item />
            <offer-item />

        </div>
    </div>
</template>
<script>
    import OfferItem from './OfferItem.vue';
    export default{
        name:'OfferBar',
        components:{
            OfferItem
        }
    }
</script>