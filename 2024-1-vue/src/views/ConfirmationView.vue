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
  <div v-for="item in cartItems" :key="item.product_id" class="cart-item-box">
    <div class="cart-item-photo-box">
      <img :src="item.image" alt="" class="cart-item-photo">
    </div>
    <div class="cart-item-text-box">
      <h2 class="cart-item-title">{{ item.product_name }}</h2>
      <div class="cart-item-explanation">{{ item.description }}</div>
      <div class="cart-item-count-contents">
        <div class="item-count-box">
          <div class="item-count">
            <!-- <span>数量: {{ getCounter(item.product_id) }}</span> -->
            <!-- ↑ここでエラーが出ている -->
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
