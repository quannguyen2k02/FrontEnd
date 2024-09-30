<template>
    <h1 class="title-form">Chỉnh sửa đơn hàng</h1>
    <div class="container mt-5  ">
        <form class="form-add" @submit.prevent="order">
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Tên khách hàng:</label>
                <input :disabled="status === 2 || status === 3 || status === 4" type="text" id="productName"
                    class="form-control" v-model="CustomerName" required />
            </div>
            <div class="form-group mb-3">
                <label for="productName" class="form-label">Số điện thoại:</label>
                <input :disabled="status === 2 || status === 3 || status === 4" type="text" id="productDetail"
                    class="form-control" v-model="PhoneNumber" required />
            </div>
            <div class="form-group mb-3">
                <label for="productDetail" class="form-label">Địa chỉ</label>
                <input :disabled="status === 2 || status === 3 || status === 4" id="productDescription"
                    class="form-control" v-model="Address" required>
            </div>
            <div class="form-group mb-3">
                <label for="productDetail" class="form-label">Sản phẩm</label>

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

                            </tr>
                            <div class="total"><strong>Tổng tiền:{{ formatCurrency(totalAmount)
                                    }}</strong></div>
                        </tbody>
                    </table>

                </div>
                <!-- Phương thức thanh toán -->
                <label for="productDetail" class="form-label">Phương thức thanh toán:{{ payment(paymentMethod)
                    }}</label>


            </div>
            <div class="form-group mb-3">
                <label for="productCategory" class="form-label">Trạng thái</label>
                <select :disabled="status === 2 || status === 3 || status === 4" id="productCategory"
                    class="form-control" v-model="status" required>
                    <option value=0>
                        Chưa xác nhận
                    </option>
                    <option value=1>
                        Đã xác nhận
                    </option>
                    <option value=2>
                        Đang vận chuyển
                    </option>
                    <option value=3>
                        Giao thành công
                    </option>
                    <option value=4>
                        Hủy
                    </option>
                </select>
            </div>
            <button :disabled="status === 2 || status === 3 || status === 4" type="submit"
                class="btn btn-primary btn-block">Cập nhật đơn hàng</button>
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
const paymentMethod = ref(0);
const status = ref(0);
const props = defineProps({
    orderId: Number
});
async function getOrder() {
    try {
        const response = await fetch(`https://localhost:7061/api/Orders/${props.orderId}`);
        const data = await response.json();
        CustomerName.value = data.customerName;
        PhoneNumber.value = data.phone;
        totalAmount.value = data.totalAmount;
        paymentMethod.value = data.typePayment;
        Address.value = data.address;
        status.value = data.status;
        console.log(status.value);
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
async function getOrderDetails() {
    try {
        const response = await fetch(`https://localhost:7061/api/OrderDetails/orderdetails/${props.orderId}`);
        const data = await response.json();
        data.forEach(product => {
            addProduct(product.productId, product.quantity); // Hiển thị tên sản phẩm
        });
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}

const payment = (paymentMethod) => {
    switch (paymentMethod) {
        case 0: return "Chưa thanh toán";
        case 1: return "Thanh toán chuyển khoản";
        case 2: return "Thanh toán khi nhận hàng";
        default: return "Lỗi";
    }
}
// Hàm thêm sản phẩm vào danh sách
const addProduct = async (productId, quantity) => {
    if (productId) {
        try {
            // Giả sử bạn có một API để lấy thông tin sản phẩm theo mã sản phẩm
            const response = await axios.get(`https://localhost:7061/api/Products/${productId}`);
            const product = response.data;
            // Thêm sản phẩm mới vào danh sách với số lượng mặc định là 1
            productList.value.push({
                code: productId,
                name: product.title,
                quantity: quantity,
                priceSale: product.priceSale,
                price: product.price,
                image: product.image,
            });
            totalAmount.value = productList.value.reduce((total, product) => {
                return total + (product.quantity * product.priceSale);
            }, 0);


            // Xóa mã sản phẩm sau khi thêm
        } catch (error) {
            console.error('Không tìm thấy sản phẩm với mã này:', error);
        }
    }
};


onMounted(() => {
    getOrder();
    getOrderDetails();
});


//Thêm

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const order = async () => {
    try {
        const productCodeQuantityList = productList.value.map(product => {
            return {
                productId: product.code,
                quantity: product.quantity
            };
        });
        const response = await axios.put(`https://localhost:7061/api/Orders/${props.orderId}?status=${status.value}`,
            {
                customerName: CustomerName.value,
                phone: PhoneNumber.value,
                address: Address.value,
                email: "",
                items: productCodeQuantityList
            },
            {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            });

        if (response.status === 200) {
            alert("Cập nhật thành công!");
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