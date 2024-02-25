<template>
  <div class="customer-container">
    <h1 class="customer-container-title"></h1>
    <div class="customer-information">
      <div v-for="field in store.fields" :key="field.id" class="import-box">
        <div class="import-title-text">{{ field.label }}</div>
        <div class="import-out-text">{{ field.value }}</div>
      </div>
    </div>
    <div>
      <div class="payment-serect">
        <div v-if="store.selectedOption === 'bank'" class="category-contents">
          <!-- bank の情報を表示 -->
          <div class="bank-payment-information">
            <div v-for="field in store.bankFields" :key="field.id" class="payment-form-box">
              <div class="import-title-text">{{ field.label }}</div>
              <div class="import-out-text">{{ field.value }}</div>
              <div v-if="field.id === 1" class="bank-type-select">
                <div v-for="bankType in store.bankTypes" :key="bankType.value">
                  <input type="radio" :id="bankType.value" :name="bankType.name" :value="bankType.value" v-model="bankType.checked">
                  <label :for="bankType.value">{{ bankType.label }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="store.selectedOption === 'credit'" class="category-contents">
          <!-- credit の情報を表示 -->
          <div class="credit-payment-information">
            <div v-for="field in store.creditFields" :key="field.id" class="payment-form-box">
              <div class="import-title-text">{{ field.label }}</div>
              <div class="import-out-text">{{ field.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="confirmation-item-contener">
    <h1 class="item-contener-title">注文商品</h1>
    <div v-for="item in cartItems" :key="item.product.product_id" class="confirmation-item-box">
      <div class="confirmation-item-photo-box">
        <img :src="item.product.image" alt="" class="confirmation-item-photo">
      </div>
      <div class="confirmation-item-text-box">
        <h2 class="confirmation-item-title">{{ item.product.product_name }}</h2>
        <div class="confirmation-item-count-contents">
          <div class="confirmation-item-count">
            <span>数量: {{ item.quantity }}</span>
            <span>金額: {{ item.quantity*item.product.price }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, } from 'vue';
import { useCartStore } from '/src/stores/cartStore';
import { useCustomerFormStore } from '@/stores/customerStore';

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const cartItems = ref([]);
    const store = useCustomerFormStore();

    onMounted(() => {
      cartItems.value = cartStore.getCartItems();
    });

    return {
      cartItems,
      store,
    };
  },
});
</script>

<style>
.confirmation-item-contener{
  display: inline-block;
  width: 100vw;
  max-width: 1280px;
  margin-left: 100px;
}
.confirmation-item-box{
  width: 75%;
  height: 240px;
  display: flex;
  border-top:1px solid #000;
  gap: 100px;
  padding: 20px;
}
.confirmation-item-photo{
  height: 100%;
  object-fit: contain;
}
.confirmation-item-text-box{
  font-size: 32px;
}
.confirmation-item-title{
  font-size: 36px;
}
.confirmation-item-count{
  display: flex;
  flex-direction: column;
  justify-content: left;
}
</style>
