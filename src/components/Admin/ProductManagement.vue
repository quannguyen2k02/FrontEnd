<template>
    <div class="toolbar">
        <router-link to="/admin/addproduct">
            <button class="btn-add">Thêm</button>

        </router-link>

    </div>

    <table class="product-table">
        <thead>
            <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Tình trạng</th>
                <th>Giá gốc</th>
                <th>Giá sale</th>
                <th>Sản phẩm HOT</th>
            </tr>
        </thead>
        <tbody>

            <tr v-for="item in list" :key="item.id" @click="editProduct(item.id)">
                <td>{{ item.id }}</td>
                <td>{{ item.title }}</td>
                <td><img :src="item.image" alt="Sản phẩm 1"></td>
                <td>{{ item.status === 1 ? 'Còn hàng' : 'Hết hàng' }}</td>
                <td>{{ formatCurrency(item.price) }}</td>
                <td>{{ formatCurrency(item.priceSale) }}</td>
                <td>{{ item.isHot === true ? 'Có' : 'Không' }}</td>
            </tr>

        </tbody>
        <div class="col-12 pb-1">
            <nav aria-label="Page navigation">
                <!-- <ul class="pagination justify-content-center mb-3">
                                <li class="page-item disabled">
                                    <a class="page-link" href="#" aria-label="Previous">
                                        <span aria-hidden="true">«</span>
                                        <span class="sr-only">Previous</span>
                                    </a>
                                </li>
                                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                <li class="page-item"><a class="page-link" href="#">2</a></li>
                                <li class="page-item"><a class="page-link" href="#">3</a></li>
                                <li class="page-item">
                                    <a class="page-link" href="#" aria-label="Next">
                                        <span aria-hidden="true">»</span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                </li>
                            </ul> -->
                <ul class="pagination justify-content-center mb-3">
                    <li :class="['page-item', { disabled: currentPage === 1 }]">
                        <a class="page-link" href="#" aria-label="Previous"
                            @click.prevent="changePage(currentPage - 1)">
                            <span aria-hidden="true">«</span>
                            <span class="sr-only">Previous</span>
                        </a>
                    </li>

                    <li v-for="page in totalPages" :key="page" :class="['page-item', { active: currentPage === page }]">
                        <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                    </li>

                    <li :class="['page-item', { disabled: currentPage === totalPages }]">
                        <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(currentPage + 1)">
                            <span aria-hidden="true">»</span>
                            <span class="sr-only">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </table>

</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const list = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const pageSize = 8; // Số sản phẩm mỗi trang

async function fetchProducts(page = 1) {
    try {
        const response = await fetch(`https://localhost:7061/api/Products/GetAllProducts?pageNumber=${page}&pageSize=${pageSize}`);
        const data = await response.json();
        list.value = data.products;
        totalPages.value = data.totalPages;

        currentPage.value = page;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}


function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
        fetchProducts(page);
    }
}


function editProduct(productId) {
    router.push({ name: 'editproduct', params: { id: productId } });
}

onMounted(() => fetchProducts(currentPage.value));
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
</script>
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

.product-table tr:hover {
    cursor: pointer;
    background-color: #e4d6d6;
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
</style>