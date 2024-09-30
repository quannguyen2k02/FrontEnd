<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Trang chủ</a>
        </div>
    </nav>

    <div class="container my-4">
        <div class="row">
            <!-- Tổng Doanh Thu -->
            <div class="col-md-4">
                <div class="card text-white bg-success">
                    <div class="card-body">
                        <h5 class="card-title">Tổng Doanh Thu</h5>
                        <h3>{{ formatCurrency(totalRevenue) }}</h3>
                    </div>
                </div>
            </div>

            <!-- Sản Phẩm Bán Chạy Nhất -->
            <div class="col-md-4">
                <div class="card text-white bg-primary">
                    <div class="card-body">
                        <h5 class="card-title">Sản Phẩm Bán Chạy Nhất</h5>
                        <h6>id: {{ idProduct }}</h6>
                        <h6>{{ productName }}</h6>
                        <img style="width: 100px;" :src=image>
                        <p>Đã bán: {{ quantity }} sản phẩm</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-secondary">
                    <div class="card-body">
                        <h5 class="card-title">Sản Phẩm Bán Chạy Nhất</h5>
                        <h6>id: {{ idProduct }}</h6>
                        <h6>{{ productName }}</h6>
                        <img style="width: 100px;" :src=image>
                        <p>Đã bán: {{ quantity }} sản phẩm</p>
                    </div>
                </div>
            </div>
            <!-- Doanh Thu Theo Tháng -->

        </div>

        <!-- Doanh Thu Theo Ngày Biểu Đồ -->
        <div class="row">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Doanh Thu Theo Ngày</h5>
                        <div class="chart-container">
                            <canvas id="dailyRevenueChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Doanh Thu Theo Tháng Biểu Đồ -->
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Doanh Thu Theo Tháng</h5>
                        <div class="chart-container">
                            <canvas id="monthlyRevenueChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const totalRevenue = ref(0);

const productName = ref('');
const image = ref('');
const quantity = ref(0);
const idProduct = ref(0);
async function fetchTotalAmount() {
    try {
        const response = await fetch(`https://localhost:7061/api/Dashboard/GetAllRevenue`);
        const data = await response.json();
        totalRevenue.value = data;

    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
async function fetchProduct() {
    try {
        const response = await fetch(`https://localhost:7061/api/Dashboard/TrendingProduct`);
        const data = await response.json();
        productName.value = data.product.title;
        image.value = data.product.image;
        quantity.value = data.totalQuantitySold;
        idProduct.value = data.product.id;
    } catch (ex) {
        console.log("Lỗi khi gọi API", ex);
    }
}
const fetchDailyRevenueData = async () => {
    try {
        const response = await fetch('https://localhost:7061/api/Dashboard/TotalSalesRevenueByDay');
        const data = await response.json();

        // Chuyển đổi dữ liệu API thành labels (Ngày/Tháng/Năm) và data (Doanh thu theo ngày)
        const labels = data.map(item => `${item.day}/${item.month}/${item.year}`);
        const revenueData = data.map(item => item.totalRevenue);

        renderRevenueChart(labels, revenueData);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const renderRevenueChart = (labels, revenueData) => {
    const ctx = document.getElementById('dailyRevenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,  // Ngày/Tháng/Năm
            datasets: [{
                label: 'Doanh Thu (VNĐ)',
                data: revenueData,  // Tổng doanh thu
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

const fetchRevenueData = async () => {
    try {
        const response = await fetch('https://localhost:7061/api/Dashboard/TotalSalesRevenueByMonth');
        const data = await response.json();

        // Chuyển đổi dữ liệu API thành labels (tháng) và data (doanh thu)
        const labels = data.map(item => `${item.month}/${item.year}`);
        const revenueData = data.map(item => item.totalRevenue);

        renderMonthlyRevenueChart(labels, revenueData);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const renderMonthlyRevenueChart = (labels, revenueData) => {
    const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,  // Tháng/Năm
            datasets: [{
                label: 'Doanh Thu (VNĐ)',
                data: revenueData,  // Tổng doanh thu
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};
onMounted(() => {
    fetchDailyRevenueData();
    fetchRevenueData();
    fetchTotalAmount();
    fetchProduct();
});
</script>