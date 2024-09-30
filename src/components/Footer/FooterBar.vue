<template>
    <div class="container-fluid bg-secondary text-dark mt-5 pt-5">
        <div class="row px-xl-5 pt-5">
            <address-bar />
            <link-bar />
        </div>
        
    </div>
</template>

<script>
    import AddressBar from "./AddressBar.vue"
    import LinkBar from "./LinkBar.vue"

    export default{
        name:'FooterBar',
        components:{
            AddressBar,
            LinkBar
        }
    }
</script>