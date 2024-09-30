<template>
    <div class="layout">
        <header-admin />
        <div class="container">
            <nav-bar @change-component="setComponent" />
            <main class="content">
                <!-- Nội dung chính sẽ được hiển thị tại đây -->

                <component :is="currentComponent" :productId="productId"></component>

            </main>
        </div>
    </div>
</template>
<script setup>
import HeaderAdmin from '@/components/Admin/HeaderAdmin.vue';
import NavBar from '@/components/Admin/NavBar.vue';
import ProductManagement from '@/components/Admin/ProductManagement.vue';
import CategoryManagement from '@/components/Admin/CategoryManagement.vue';
import EditProduct from '@/components/Admin/EditProduct.vue';
import OrderManagement from '@/components/Admin/OrderManagement.vue';
import Dashboard from '@/components/Admin/Dashboard.vue';
import UserManagement from '@/components/Admin/UserManagement.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import ResponseManagement from '@/components/Admin/ResponseManagement.vue';
import SubcribeManagement from '@/components/Admin/SubcribeManagement.vue';
const route = useRoute();
const productId = route.params.id;
const currentComponent = ref(EditProduct);
function setComponent(componentName) {
    if (componentName === 'ProductManagement') {
        currentComponent.value = ProductManagement;
    } else if (componentName === 'CategoryManagement') {
        currentComponent.value = CategoryManagement;
    } else if (componentName === 'OrderManagement') {
        currentComponent.value = OrderManagement;

    }
    else if (componentName === 'Dashboard') {
        currentComponent.value = Dashboard;
    }
    else if (componentName === 'UserManagement') {
        currentComponent.value = UserManagement;
    }
    else if (componentName === 'ResponseManagement') {
        currentComponent.value = ResponseManagement;
    }
    else if (componentName === 'SubcribeManagement') {
        currentComponent.value = SubcribeManagement;
    }
}

</script>
<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
}



.container {
    display: flex;
    flex: 1;
    max-width: 100%;
    padding: 0;
}

.sidebar {
    width: 20%;

    color: white;
    border-top: 0.5px solid #ccc;
    border-radius: 0px 0px 10px 10px;
}

.sidebar ul {
    list-style-type: none;
    padding-left: 0;

}

.sidebar li {
    padding: 15px 20px;
    text-align: center;
    cursor: pointer;
    border-radius: 10px;
}

.sidebar li:hover {
    background-color: #c17a74;
}

.content {
    flex: 1;
    padding: 20px;
    background-color: #f1f1f1;
    overflow-y: auto;
}


.product-list {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

.product-item {
    padding: 15px;
    margin-bottom: 10px;
    background-color: white;
    border: 1px solid #ddd;
    text-align: center;
    cursor: pointer;
}

.product-item:hover {
    background-color: #f0f0f0;
}
</style>