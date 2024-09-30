<template>
  <tr :id=productId>
    <td class="align-middle"> {{ title }}</td>
    <td class="align-middle">{{ formatCurrency(priceSale) }}</td>
    <td class="align-middle">
      <div class="input-group quantity mx-auto" style="width: 100px;">
        <div class="input-group-btn">
          <button @click="subtractFromQuantity" class="btn btn-sm btn-primary btn-minus">
            <i class="fa fa-minus"></i>
          </button>
        </div>
        <input type="text" class="form-control form-control-sm bg-secondary text-center" v-model="quantity">
        <div class="input-group-btn">
          <button @click="addToQuantity" class="btn btn-sm btn-primary btn-plus">
            <i class="fa fa-plus"></i>
          </button>
        </div>
      </div>
    </td>
    <td class="align-middle">{{ formatCurrency(totalPrice) }}</td>
    <td class="align-middle"><button @click="removeFromCart" class="btn btn-sm btn-primary"><i
          class="fa fa-times"></i></button></td>
  </tr>
</template>
<script setup>
import { ref, onMounted, defineProps, defineEmits, watch } from 'vue'
import axios from 'axios';
import Cookies from 'js-cookie';

const props = defineProps({
  quantityProduct: Number,
  productId: Number
});

const emit = defineEmits(['updateTotalPrice']);

const product = ref({});
const title = ref('');
const priceSale = ref(0);
const totalPrice = ref(0);
const quantity = ref(props.quantityProduct);

const fetchProduct = async (productId) => {
  try {
    const response = await axios.get(`https://localhost:7061/api/Products/${productId}`);
    product.value = response.data;
    title.value = product.value.title;
    priceSale.value = product.value.priceSale;
    updateTotalPrice();
  } catch (error) {
    console.error('Error fetching product:', error);
  }
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const updateTotalPrice = () => {
  totalPrice.value = priceSale.value * quantity.value;

};

const addToQuantity = () => {
  quantity.value += 1;
  updateCart();

};

const subtractFromQuantity = () => {
  if (quantity.value > 1) {
    quantity.value -= 1;
    updateCart();
  }
};

const updateCart = () => {
  const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { items: [] };

  const existingProduct = cart.items.find(item => item.productId === props.productId);
  if (existingProduct) {
    existingProduct.quantity = quantity.value;
  }

  Cookies.set('cart', JSON.stringify(cart), { expires: 1 });
  updateTotalPrice();
  window.location.reload();

};

const removeFromCart = () => {
  let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : { items: [] };

  // Filter out the item to remove
  cart.items = cart.items.filter(item => item.productId !== props.productId);

  // Update the cookies
  Cookies.set('cart', JSON.stringify(cart), { expires: 1 });

  // Optionally, you might want to notify the parent component or refresh
  // For example:
  // emit('itemRemoved', props.productId);

  // Reload page if needed
  window.location.reload();
};

onMounted(() => {
  fetchProduct(props.productId);
});


</script>
