<template>
  <div class="boddy">

    <div class="wrapper">
      <h2>Đăng ký</h2>
      <form @submit.prevent="register">

        <div class="input-box">
          <input type="text" placeholder="Email" required v-model="email">
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" required v-model="password">
        </div>
        <div class="input-box">
          <input type="password" placeholder="Nhập lại mật khẩu" required v-model="confirmPassword">
        </div>
        <p v-show="errorr" style="color: red;">Mật khẩu không trùng khớp</p>
        <p v-show="success" style="color: blue;">Đăng ký thành công</p>
        <div class="input-box button">
          <input type="Submit" value="Đăng ký ngay">
        </div>
        <p class="blue">{{ result }}</p>
        <div class="text">
          <h3>Bạn đã có tài khoản? <a href="/login">Đăng nhập ngay</a></h3>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';


// Khai báo biến phản ứng (reactive variables)
const email = ref('');
const password = ref('');
const success = ref(false);
const errorr = ref(false);
const confirmPassword = ref('');
const result = ref('');
// Lấy đối tượng router từ Vue Router
const router = useRouter();

// Hàm đăng ký
const register = async () => {
  try {
    const response = await axios.post('https://localhost:7061/api/Account/SignUp', {
      email: email.value,
      password: password.value,
      firstName: "a",
      lastName: "a",
      confirmPassword: confirmPassword.value
    });

    if (response.status === 200) {
      result.value = "Đăng ký thành công!";
      success.value = true;
      errorr.value = false;
      setTimeout(() => {
        router.push('/login'); // Điều hướng đến trang dashboard sau khi đăng nhập thành công

      }, 1000);
    } else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    errorr.value = true;

    console.error('Error logging in:', error);
  }
};
</script>
export default {
name: 'Register',

}
<style>
.blue {
  color: blue;
}
</style>