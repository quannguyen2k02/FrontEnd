<template>

    <h1 class="title-form">Thêm mới danh mục</h1>
    <div class="container mt-5  ">
        <form class="form-add" @submit.prevent="submitForm">
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Tên danh mục</label>
                <input type="text" id="productName" class="form-control" v-model="categoryName" required />
            </div>
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Mô tả:</label>
                <input type="text" id="productDetail" class="form-control" v-model="categoryDescription" required />
            </div>
            <div class="form-group mb-4">
                <label for="productImage" class="form-label">Ảnh danh mục:</label>
                <input type="file" id="productImage" class="form-control" @change="onImageSelected" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Thêm danh mục</button>
        </form>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref } from 'vue';
import router from '@/router';
const categoryName = ref('');
const image = ref(null);
const categoryDescription = ref('');
function onImageSelected(event) {
    const file = event.target.files;
    if (file.length > 0) {
        image.value = file[0];
    }
}

// Hàm submit form


const submitForm = async () => {
    const formData = new FormData();

    formData.append('Title', categoryName.value);
    formData.append('Description', categoryDescription.value);
    if (image.value) {
        formData.append('Image', image.value);
    }

    try {
        const response = await axios.post('https://localhost:7061/api/ProductCategories/AddCategory', formData);
        console.log('Success:', response.data);
        alert('Thêm danh mục sản phẩm thành công!');
    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi.');
    }
};
</script>