<template>
    <div class="container-fluid bg-secondary my-5">
        <div class="row justify-content-md-center py-5 px-xl-5">
            <div class="col-md-6 col-12 py-5">
                <div class="text-center mb-2 pb-2">
                    <h2 class="section-title px-5 mb-3"><span class="bg-secondary px-2">Phản hồi </span></h2>
                    <p>Nếu bạn có vấn đề đừng ngần ngại chia sẻ tại đây.</p>
                </div>
                <form @submit.prevent="response">
                    <div class="input-group">
                        <input type="text" class="form-control border-white p-4" v-model="data"
                            placeholder="Nhập thông tin phản hồi">
                        <div class="input-group-append">
                            <button class="btn btn-primary px-4">Gửi</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';

const data = ref('');
const response = async () => {
    try {
        const response = await axios.post('https://localhost:7061/api/Response', {

            title: data.value
        });
        if (response.status === 201) {
            alert("Phản hồi thành công!");
        }
        else {
            alert("Có lỗi xảy ra. Vui lòng thử lại sau!");
        }
    } catch (error) {
        console.error('Error', error);
    }
};
</script>
export default {
name: 'SubcribeBar'
}