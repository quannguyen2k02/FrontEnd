<template>
    <div class="toolbar">
        <router-link to="/admin/addcategory">
            <button class="btn-add">Thêm</button>

        </router-link>

    </div>

    <table class="product-table">
        <thead>
            <tr>
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in list" :key="item.id" @click="editcategory(item.id)">
                <td>{{ item.id }}</td>
                <td>{{ item.userName }}</td>
                <td>{{ item.email }}</td>
            </tr>

        </tbody>
    </table>
</template>
<script setup>
import router from '@/router';
import { ref, onMounted } from 'vue'
const list = ref([]);
function editcategory(userId) {
    router.push({ name: 'detailuser', params: { id: userId } });
}

async function fetchProducts() {
    try {
        const response = await fetch(`https://localhost:7061/api/Users/GetAllUser`);
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