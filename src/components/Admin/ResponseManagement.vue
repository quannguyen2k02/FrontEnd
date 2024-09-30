<template>
    <div class="toolbar">


    </div>

    <table class="product-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Phản hồi</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
            </tr>

        </tbody>
    </table>
</template>
<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue'
const list = ref([]);


async function fetchProducts() {
    try {
        const response = await fetch(`https://localhost:7061/api/Response/GetAllResponse`);
        const data = await response.json();
        list.value = data;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}



onMounted(() => fetchProducts());</script>
<style scoped>
.product-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.product-table th,
.product-table td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: center;
}

.product-table th {
    background-color: #f2f2f2;
}

.product-table img {
    width: 50px;
    height: 50px;
    object-fit: cover;
}

.toolbar {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
}

.toolbar button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

.toolbar button:hover {
    background-color: #45a049;
}

.product-table tr:hover {
    cursor: pointer;
    background-color: #e4d6d6;
}
</style>