<template>
    <h1 class="title-form">Tạo đơn hàng</h1>
    <div class="container mt-5  ">
        <form class="form-add" @submit.prevent="order">
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Tên khách hàng:</label>
                <input type="text" id="productName" class="form-control" v-model="CustomerName" required />
            </div>
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Số điện thoại:</label>
                <input type="text" id="productDetail" class="form-control" v-model="PhoneNumber" required />
            </div>
            <div class="form-group mb-3">
                <label for="productDetail" class="form-label">Địa chỉ</label>
                <input id="productDescription" class="form-control" v-model="Address" required>
            </div>
            <div class="form-group mb-3">
                <label for="productDetail" class="form-label">Mã sản phẩm</label>
                <input class="form-control" v-model="ProductCode">
                <div class="toolbar">
                    <button @click="addProduct" type="button" class="btn">Thêm</button>

                </div>
                <!-- Hiển thị danh sách sản phẩm đã thêm -->
                <div v-if="productList.length > 0" class="form-group mb-3">

                    <table class="product-table">
                        <thead>
                            <tr>
                                <th>Mã sản phẩm</th>
                                <th>Tên sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Giá gốc</th>
                                <th>Giá sale</th>
                                <th>Số lượng</th>
                                <th>Tổng tiền</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(product, index) in productList" :key="index">
                                <td>{{ product.code }}</td>
                                <td>{{ product.name }}</td>
                                <td><img :src="product.image" alt="Sản phẩm 1"></td>

                                <td>{{ formatCurrency(product.price) }}</td>
                                <td>{{ formatCurrency(product.priceSale) }}</td>

                                <td>{{ product.quantity }}</td>
                                <td>{{ formatCurrency(product.quantity * product.priceSale) }}</td>
                                <td>
                                    <div style="display: flex;">
                                        <button @click="reduceQuantity(index)" type="button"
                                            class="btn btn-sm btn-primary">-</button> |
                                        <button @click="increaseQuantity(index)" type="button"
                                            class="btn btn-sm btn-primary">+</button>
                                    </div>
                                </td>
                            </tr>
                            <div class="total"><strong>Tổng tiền:{{ formatCurrency(totalAmount)
                                    }}</strong></div>
                        </tbody>
                    </table>

                </div>
                <!-- Phương thức thanh toán -->
                <label for="productDetail" class="form-label">Phương thức thanh toán</label>

                <div class="form-group mb-3">
                    <label><input type="radio" name="payment" value="cod" v-model="paymentMethod"> Thanh toán khi
                        nhận hàng
                        (COD)</label>
                </div>
                <div class="form-group mb-3">
                    <label><input type="radio" name="payment" value="momo" v-model="paymentMethod"> Thanh toán qua
                        MoMo</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Tạo đơn hàng</button>
        </form>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import router from '@/router';
import Cookies from 'js-cookie';
const ProductCode = ref('');
const CustomerName = ref('');
const PhoneNumber = ref('');
const Address = ref('');
const productList = ref([]);
const totalAmount = ref(0);
const paymentMethod = ref('');




// Hàm thêm sản phẩm vào danh sách
const addProduct = async () => {
    if (ProductCode.value) {
        try {
            // Giả sử bạn có một API để lấy thông tin sản phẩm theo mã sản phẩm
            const response = await axios.get(`https://localhost:7061/api/Products/${ProductCode.value}`);
            const product = response.data;

            // Kiểm tra nếu sản phẩm đã tồn tại trong danh sách
            const existingProduct = productList.value.find(p => p.code === ProductCode.value);
            if (existingProduct) {
                existingProduct.quantity++;
                totalAmount.value = productList.value.reduce((total, product) => {
                    return total + (product.quantity * product.priceSale);
                }, 0);
            } else {
                // Thêm sản phẩm mới vào danh sách với số lượng mặc định là 1
                productList.value.push({
                    code: ProductCode.value,
                    name: product.title,
                    quantity: 1,
                    priceSale: product.priceSale,
                    price: product.price,
                    image: product.image,

                });
                totalAmount.value = productList.value.reduce((total, product) => {
                    return total + (product.quantity * product.priceSale);
                }, 0);
            }

            // Xóa mã sản phẩm sau khi thêm
            ProductCode.value = '';
        } catch (error) {
            console.error('Không tìm thấy sản phẩm với mã này:', error);
        }
    }
};
//Thêm
const increaseQuantity = (index) => {
    productList.value[index].quantity++;
    totalAmount.value = productList.value.reduce((total, product) => {
        return total + (product.quantity * product.priceSale);
    }, 0);
};
const reduceQuantity = (index) => {
    productList.value[index].quantity--;
    totalAmount.value = productList.value.reduce((total, product) => {
        return total + (product.quantity * product.priceSale);
    }, 0);
}
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const order = async () => {
    try {
        const payment = paymentMethod.value;
        const productCodeQuantityList = productList.value.map(product => {
            return {
                productId: product.code,
                quantity: product.quantity
            };
        });
        if (payment == 'cod') {
            const response = await axios.post('https://localhost:7061/api/Orders',
                {
                    customerName: CustomerName.value,
                    phone: PhoneNumber.value,
                    address: Address.value,
                    email: "noname@example.com",
                    items: productCodeQuantityList
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

            if (response.status === 200) {
                alert("đặt hàng thành công");
            }
        }
        else if (payment == 'momo') {
            const response = await axios.post('https://localhost:7061/api/Orders/vnpay',
                {
                    customerName: CustomerName.value,
                    phone: PhoneNumber.value,
                    address: Address.value,
                    email: "noname@example.com",
                    items: productCodeQuantityList
                },
                {
                    headers: {
                        Authorization: `Bearer ${Cookies.get('token')}`
                    }
                });

            if (response.status === 200) {
                console.log(response.data)
                window.location.href = response.data;
            }
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert('Bạn cần phải đăng nhập!');
            router.push('/login');
        } else {
            console.error('Error logging in:', error);
            alert('Đã xảy ra lỗi. Vui lòng thử lại sau.');
        }
    }
};

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

.total {
    width: 130%;
    font-size: 20px;
    padding-top: 20px;
}

.form-label {
    font-size: 20px;
    font-weight: bold;

}
</style>