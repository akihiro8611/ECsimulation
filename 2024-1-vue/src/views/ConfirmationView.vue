<template>
  <div class="confirmation-customer-container">
    <div class="confirmation-information">
      <h2 class="confirmation-sub-title">お客様情報</h2>
      <div v-for="field in store.fields" :key="field.id" class="confirmation-form-box">
        <div class="confirmation-import-title-text">{{ field.label }} :  {{ field.value }}</div>
      </div>
    </div>
    <div class="confirmation-information">
      <div class="confirmation-payment-serect">
        <h2 class="confirmation-sub-title">お支払い情報</h2>
        <div v-if="store.selectedOption === 'bank'" class="confirmation-category-contents">
          <!-- bank の情報を表示 -->
          <div class="confirmation-bank-payment-information">
            <div v-for="field in store.bankFields" :key="field.id" class="confirmation-form-box">
              <div class="confirmation-import-title-text">{{ field.label }}</div>
              <div class="confirmation-import-out-text">{{ field.value }}</div>
              <div v-if="field.id === 1" class="confirmation-bank-type-select">
                <div v-for="bankType in store.bankTypes" :key="bankType.value">
                  <input type="radio" :id="bankType.value" :name="bankType.name" :value="bankType.value" v-model="bankType.checked">
                  <label :for="bankType.value">{{ bankType.label }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="store.selectedOption === 'credit'" class="confirmation-category-contents">
          <!-- credit の情報を表示 -->
          <div class="confirmation-credit-payment-information">
            <div v-for="field in store.creditFields" :key="field.id" class="confirmation-form-box">
              <div class="confirmation-import-title-text">{{ field.label }}</div>
              <div class="confirmation-import-out-text">{{ field.value }}</div>
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
    <div class="confirmation-cart-summary">
      <p class="confirmation-cart-total-count">購入点数: {{ totalItemCount }}個</p>
      <p class="confirmation-cart-total-price">合計価格: {{ totalCartPrice }}円</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useCartStore } from '/src/stores/cartStore';
import { useCustomerFormStore } from '@/stores/customerStore';

export default defineComponent({
  setup() {
    // カートストアとフォームストアを使用
    const cartStore = useCartStore();
    const cartItems = ref([]);
    const store = useCustomerFormStore();

    // コンポーネントがマウントされた時の処理
    onMounted(() => {
      // カートストアからカート内の商品情報を取得してcartItemsにセット
      cartItems.value = cartStore.getCartItems();
    });

    // カート内の商品の総数量を計算するcomputedプロパティ
    const totalItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    // カート内の商品の総価格を計算するcomputedプロパティ
    const totalCartPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
    });

    return {
      cartItems,
      store,
      totalItemCount,
      totalCartPrice,
    };
  },
});
</script>


<style>
.confirmation-customer-container{
  padding-top: 100px;
  display: flex;
  justify-content: center;
  
}
.confirmation-sub-title{
  font-size: 32px;
}
.confirmation-import-title-text{
  font-size: 24px;
}
.confirmation-information{
  width: calc(75%/2);
  border: 1px solid #000;
  padding: 20px;
}
.confirmation-information:last-of-type{
  margin-left: 40px;
}
.confirmation-form-box{
  margin-top: 12px;
}
.confirmation-item-box{
  width: 75%;
  height: 240px;
  display: flex;
  border-top:1px solid #000;
  gap: 100px;
  padding: 20px;
}
.confirmation-bank-type-select{
  display: flex;
  margin-top: 12px;
}
.confirmation-item-box:last-of-type {
  border-bottom:1px solid #000;
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
.confirmation-item-contener{
  display: inline-block;
  width: 100vw;
  max-width: 1280px;
  padding-left: 10%;
  margin-top: 40px;
}
.confirmation-item-count{
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.confirmation-cart-summary{
  text-align: right;
  margin: 20px 20% 40px auto;
  font-size: 36px;
}
@media screen and (max-width: 767px) {
  .confirmation-customer-container{
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;

  
  }
  .confirmation-sub-title{
    font-size: 24px;
  }
  .confirmation-import-title-text{
    font-size: 18px;
  }
  .confirmation-information{
    width: 80%;
    border: 1px solid #000;
    padding: 20px;
  }
  .confirmation-information:last-of-type{
    margin-left: 0;
    margin-top: 20px;
  }
  .confirmation-form-box{
    margin-top: 12px;
  }
  .confirmation-item-contener{
    display: inline-block;
    width: 100vw;
    padding-left: 10%;
    margin-top: 20px;
  }
  .item-contener-title{
    font-size: 24px;
  }
  .confirmation-item-box{
    width: 75%;
    height: 240px;
    display: flex;
    border-top:1px solid #000;
    gap: 100px;
    padding: 20px;
  }
  .confirmation-item-box:last-of-type {
    border-bottom:1px solid #000;
  }
  .confirmation-item-photo{
    height: 100%;
    object-fit: contain;
  }
  .confirmation-item-text-box{
    font-size: 24px;
  }
  .confirmation-item-title{
    font-size: 24px;
  }
  .confirmation-item-count{
    display: flex;
    flex-direction: column;
    justify-content: left;
  }
  .confirmation-cart-summary{
    text-align: right;
    margin: 20px 0;
    padding-right: 10%;
    font-size: 18px;
  }
}
</style>
