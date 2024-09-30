<template>
    <h1 class="title-form">Chỉnh sửa danh mục</h1>
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
                <img style="width: 100px;" :src=image>
                <input type="file" id="productImage" class="form-control" @change="onImageSelected" />
            </div>
            <button type="submit" class="btn btn-primary btn-block">Sửa danh mục</button>
        </form>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';
const categoryName = ref('');
const categoryDescription = ref('');
const image = ref(null);
const props = defineProps({
    categoryId: Number
});
function onImageSelected(event) {
    const file = event.target.files;
    if (file.length > 0) {
        image.value = file[0];
    }
}
//Thêm
async function submitForm() {
    const formData = new FormData();
    formData.append('id', props.categoryId);
    formData.append('title', categoryName.value);
    formData.append('description', categoryDescription.value);
    if (image.value) {
        formData.append('image', image.value);
    }
    try {
        const response = await axios.put('https://localhost:7061/api/ProductCategories', formData);

        if (response.status === 204) {
            alert("Sửa danh mục thành công!")
            window.location.reload();
        } else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
//Hiển thị
async function getCategory() {
    try {
        const response = await fetch(`https://localhost:7061/api/ProductCategories/${props.categoryId}`);
        const data = await response.json();
        categoryName.value = data.title;
        categoryDescription.value = data.description;
        image.value = data.image;
        console.log(data)
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
onMounted(() => {
    getCategory();
});
</script>