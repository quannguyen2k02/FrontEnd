<template>
  <!-- <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
   </div> -->
  <div class="boddy">

    <div class="wrapper">
      <h2>Đăng nhập</h2>
      <form @submit.prevent="login">
        <div class="input-box">
          <input type="text" placeholder="Email" required v-model="email">
        </div>
        <div class="input-box">
          <input type="password" placeholder="Mật khẩu" required v-model="password">
        </div>

        <p v-show="errorr" style="color: red;">Sai tài khoản hoặc mật khẩu</p>
        <p v-show="success" style="color: blue;">Đăng nhập thành công</p>
        <div class="input-box button">
          <input type="Submit" value="Đăng nhập">
        </div>
        <div class="text">
          <h3>Bạn chưa có tài khoản? <a href="/register">Đăng ký ngay</a></h3>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';
import { nextTick } from 'vue';
import { jwtDecode } from 'jwt-decode';

// Khai báo biến phản ứng (reactive variables)
const email = ref('');
const password = ref('');
const errorr = ref(false);
// Lấy đối tượng router từ Vue Router
const router = useRouter();
const success = ref(false);
// Hàm đăng nhập
const login = async () => {
  try {
    const response = await axios.post('https://localhost:7061/api/Account/SignIn', {
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      success.value = true;
      errorr.value = false;
      const token = response.data;
      Cookies.set('token', token, { expires: 20 / (24 * 60) }); // Lưu JWT vào cookie, hết hạn sau 1 ngày

      await nextTick();
      const decodedToken = jwtDecode(token);
      const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      if (role === "Administrator") {
        setTimeout(() => {
          router.push('/admin');
        }, 1000);  // Trì hoãn 1 giây
      }
      else if (role === "Customer") {
        setTimeout(() => {
          router.push('/');
        }, 1000);  // Trì hoãn 1 giây
      }
    }
    else {
      alert('Login failed. Please check your credentials.');
    }
  } catch (error) {
    errorr.value = true;
    console.error('Error logging in:', error);
  }
};
</script>
export default {
name: 'Login',
components:{
SocialLinks
}
}

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.boddy {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #D19C97;
}

.wrapper {
  position: relative;
  max-width: 430px;
  width: 150%;
  background: #fff;
  padding: 34px;
  border-radius: 6px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}

.wrapper h2 {
  position: relative;
  font-size: 22px;
  font-weight: 600;
  color: #333;
}

.wrapper h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  width: 28px;
  border-radius: 12px;
  background: #4070f4;
}

.wrapper form {
  margin-top: 30px;
}

.wrapper form .input-box {
  height: 52px;
  margin: 18px 0;
}

form .input-box input {
  height: 100%;
  width: 100%;
  outline: none;
  padding: 0 15px;
  font-size: 17px;
  font-weight: 400;
  color: #333;
  border: 1.5px solid #C7BEBE;
  border-bottom-width: 2.5px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.input-box input:focus,
.input-box input:valid {
  border-color: #4070f4;
}

form .policy {
  display: flex;
  align-items: center;
}

form h3 {
  color: #707070;
  font-size: 14px;
  font-weight: 500;
  margin-left: 10px;
}

.input-box.button input {
  color: #fff;
  letter-spacing: 1px;
  border: none;
  background: #4070f4;
  cursor: pointer;
}

.input-box.button input:hover {
  background: #0e4bf1;
}

form .text h3 {
  color: #333;
  width: 100%;
  text-align: center;
}

form .text h3 a {
  color: #4070f4;
  text-decoration: none;
}

form .text h3 a:hover {
  text-decoration: underline;
}
</style>