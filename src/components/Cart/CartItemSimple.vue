<template>

    <tr id="11">
        <td class="align-middle">{{ props.orderCode }}</td>
        <td class="align-middle">{{ formatCurrency(props.amount) }}</td>
        <td class="align-middle">{{ getPaymentMethod(props.paymentMethod) }}</td>
        <td class="align-middle">{{ getStatusLabel(props.status) }}</td>
        <td class="align-middle">{{ props.createdDate }}</td>
        <td>
            <router-link :to="{ name: 'userorder', params: { id: props.orderId } }">Chi tiết</router-link>
        </td>
    </tr>



</template>
<script setup>
const props = defineProps({
    orderCode: String,
    paymentMethod: String,
    amount: Number,
    status: String,
    createdDate: String,
    orderId: Number
});
const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};


const getStatusLabel = (status) => {
    switch (status) {
        case 0:
            return 'Chưa xác nhận';
        case 1:
            return 'Đã xác nhận';
        case 2:
            return 'Đang vận chuyển';
        case 3:
            return 'Đã nhận hàng';
        case 4:
            return 'Hủy';
        default:
            return 'Không rõ tình trạng';
    }
};
const getPaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
        case 0:
            return 'Chưa thanh toán';
        case 1:
            return 'Thanh toán chuyển khoản';
        case 2:
            return 'Thanh toán khi nhận hàng';

        default:
            return 'Không rõ tình trạng';
    }
};
</script>