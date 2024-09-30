<template>
    <h1 class="title-form">Chỉnh sửa sản phẩm</h1>
    <div class="container mt-5  ">
        <form class="form-add" @submit.prevent="submitForm">
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Tên Sản Phẩm:</label>
                <input type="text" id="productName" class="form-control" v-model="productName" required />
            </div>
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Chi tiết sản phẩm:</label>
                <input type="text" id="productDetail" class="form-control" v-model="productDetail" required />
            </div>
            <div class="form-group mb-3">
                <label for="productDetail" class="form-label">Mô tả sản phẩm:</label>
                <textarea id="productDescription" class="form-control" v-model="productDescription" required></textarea>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="originalPrice" class="form-label">Giá Gốc:</label>
                        <input type="text" id="originalPrice" class="form-control" v-model="formattedOriginalPrice"
                            @input="formatNumber('originalPrice', $event)" required />
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="salePrice" class="form-label">Giá Giảm:</label>
                        <input type="text" id="salePrice" class="form-control" v-model="formattedSalePrice"
                            @input="formatNumber('salePrice', $event)" required />
                    </div>
                </div>
            </div>

            <div class="form-group mb-4">
                <label for="productImage" class="form-label">Ảnh Sản Phẩm:</label>
                <img style="width: 100px;" :src=image>
                <input type="file" id="productImage" class="form-control" @change="onImageSelected" />
            </div>

            <!-- Dropdownlist cho danh sách danh mục sản phẩm -->
            <div class="form-group mb-3">
                <label for="productCategory" class="form-label">Danh Mục Sản Phẩm:</label>
                <select id="productCategory" class="form-control" v-model="selectedCategory" required>

                    <option v-for="category in list" :key="category.id" :value="category.id">
                        {{ category.title }}
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="productCategory" class="form-label">Sản phẩm HOT</label>
                <select id="productCategory" class="form-control" v-model="selectedHot" required>
                    <option value=true>
                        Có
                    </option>
                    <option value=false>
                        Không
                    </option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="productCategory" class="form-label">Trạng thái</label>
                <select id="productCategory" class="form-control" v-model="status" required>
                    <option value=1>
                        Còn hàng
                    </option>
                    <option value=0>
                        Hết hàng
                    </option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Sửa sản phẩm</button>
        </form>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
const props = defineProps({
    productId: Number
});
const productName = ref('');
const productDetail = ref('');
const productDescription = ref('');
const originalPrice = ref(0);
const salePrice = ref(0);
const image = ref(null);
const formattedOriginalPrice = ref('');
const formattedSalePrice = ref('');
const list = ref([]);
const selectedCategory = ref(1);
const selectedHot = ref(true);
const status = ref();
function onImageSelected(event) {
    const file = event.target.files;
    if (file.length > 0) {
        image.value = file[0];
    }
}
//Hàm định dạng số tiền nhập vào
function formatNumber(priceType, event) {
    let value = event.target.value.replace(/\D/g, ''); // Xóa tất cả các ký tự không phải số
    value = new Intl.NumberFormat().format(value); // Định dạng phần nghìn

    if (priceType === 'originalPrice') {
        formattedOriginalPrice.value = value;
        originalPrice.value = Number(value.replace(/,/g, '')); // Lưu giá trị thực vào originalPrice mà không có dấu phẩy
    } else if (priceType === 'salePrice') {
        formattedSalePrice.value = value;
        salePrice.value = Number(value.replace(/,/g, '')); // Lưu giá trị thực vào salePrice mà không có dấu phẩy
    }

}
//Hiển thị
async function getProductById() {
    try {
        const response = await fetch(`https://localhost:7061/api/Products/${props.productId}`);
        const data = await response.json();
        console.log(data);
        productName.value = data.title;
        productDetail.value = data.detail;
        productDescription.value = data.description;
        formattedOriginalPrice.value = data.price;
        formattedSalePrice.value = data.priceSale;
        image.value = data.image;
        selectedCategory.value = data.productCategoryId;
        status.value = data.status;
        selectedHot.value = data.isHot;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
//Thêm
async function submitForm() {
    const formData = new FormData();
    formData.append('id', props.productId);
    formData.append('title', productName.value);
    formData.append('description', productDescription.value);
    formData.append('price', originalPrice.value);
    formData.append('priceSale', salePrice.value);
    formData.append('detail', productDetail.value);
    formData.append('productCategoryId', selectedCategory.value);
    formData.append('status', 1);
    formData.append('quantity', 10);
    formData.append('isHot', selectedHot.value);
    if (image.value) {
        formData.append('image', image.value);
    }
    try {
        const response = await axios.put('https://localhost:7061/api/Products', formData);

        if (response.status === 204) {
            alert("Sửa sản phẩm thành công!")
            window.location.reload();
        } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchProductCategory() {
    try {
        const response = await fetch(`https://localhost:7061/api/ProductCategories`);
        const data = await response.json();
        list.value = data;

    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
onMounted(() => {
    fetchProductCategory();
    getProductById();
});

</script>
<style scoped>
.add-product-form {
    max-width: 600px;
    margin: auto;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.btn-block {
    width: 100%;
}

textarea {
    resize: none;
}

.form-add {
    width: 100%;
}

.title-form {
    text-align: center;
}
</style>