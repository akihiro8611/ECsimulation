<template>
  <main>
    <div class="cart-container">
      <h1 class="cart-title">カート一覧</h1>
      <div v-if="cartItems.length === 0">
        <p>カートにアイテムがありません。</p>
      </div>
      <div class="cart-item-wrapper">
        <div v-for="item in cartItems" :key="item.product.product_id" class="cart-item-box">
          <div class="cart-item-photo-box">
            <img :src="item.product.image" :alt="item.product.product_name" class="cart-item-photo">
          </div>
          <div class="cart-item-text-box">
            <h2 class="cart-item-title">{{ item.product.product_name }}</h2>
            <div class="cart-item-explanation">{{ item.product.description }}</div>
            <div class="cart-item-count-contents">
              <div class="item-count-box">
                <div class="item-count">
                  <button class="item-count-button" @click="decrement(item.product.product_id)">
                    <img src="../assets/uiw_minus-circle.png" alt="" class="item-count-icon">
                  </button>
                  {{ item.quantity }}
                  <button class="item-count-button" @click="increment(item.product.product_id)">
                    <img src="../assets/uiw_plus-circle.png" alt="" class="item-count-icon">
                  </button>
                </div>
                <div class="dust-box" @click="reset(item.product.product_id)">
                  <img src="../assets/Vector.png" alt="" class="item-count-icon">
                </div>
              </div>
            </div>
            <div class="cart-item-price">{{ item.product.price * item.quantity }}円</div>
            <div class="cart-item-product-id">{{ item.product.product_id }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-summary">
      <p class="cart-total-count">購入点数: {{ totalItemCount }}個</p>
      <p class="cart-total-price">合計価格: {{ totalCartPrice }}円</p>
    </div>
    <div class="cart-after-container">
      <button class="cart-next-link-box" @click="navigateToCustomerInfo">
        <div class="cart-next-link-text">
          <p>お客様情報の入力</p>
        </div>
      </button>
    </div>
  </main>
</template>


<script>
import { defineComponent, ref, onMounted, watch, computed, toRaw } from 'vue';
import { useCartStore } from '/src/stores/cartStore';
import { useItemCountStore } from '@/stores/counterStore';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const cartStore = useCartStore();
    const counterStore = useItemCountStore();
    const cartItems = ref([]);
    const router = useRouter();

    const increment = async (productId) => {
      const currentCounter = cartStore.getCounter(productId);
      await cartStore.addToCart({ productId, quantity: currentCounter + 1 });
    };

    const decrement = async (productId) => {
      const currentCounter = cartStore.getCounter(productId);
      if (currentCounter > 0) {
        await cartStore.addToCart({ productId, quantity: currentCounter - 1 });
      }
    };
    const getCounter = (productId) => {
      return cartStore.getCounter(productId);
    };
    const reset = (productId) => counterStore.reset(productId);

    onMounted(() => {
      cartItems.value = cartStore.getCartItems();
      console.log('Cart Items:', toRaw(cartItems.value));
    });

    watch(() => cartStore.cartItems, (newCartItems) => {
      cartItems.value = newCartItems;
    });

    const totalItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    const totalCartPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
    });

    const addToCart = async (productId) => {
      const selectedProduct = cartItems.value.find(item => item.product.product_id === productId);

      if (!selectedProduct) {
        console.error('Product not found with productId:', productId);
        return;
      }

      try {
        const quantity = cartStore.getCounter(productId);
        await cartStore.addToCart({ productId, quantity, product: toRaw(selectedProduct.product) });
        console.log('Added to cart:', toRaw(selectedProduct.product));
      } catch (error) {
        console.error('Error adding to cart:', error);
      }
    };

    const navigateToCustomerInfo = () => {
      router.push('/customer');
    };

    return {
      cartItems,
      getCounter,
      increment,
      decrement,
      reset,
      addToCart,
      navigateToCustomerInfo,
      totalItemCount,
      totalCartPrice,
    };
  },
});
</script>



<style lang="scss">
main {
  background: #fff;
  color: #333;
  padding-top: 72px;
}

.cart-container {
  padding: 112px 40px;
  display: flex;
  flex-direction: column;
}

.cart-title {
  font-size: 40px;
}

.cart-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-around;
  column-gap: 24px;
  row-gap: 36px;
  margin-top: 40px;
}

.cart-item-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: #D8D8D8;
  width: calc(75% / 3);
  aspect-ratio: 320/492;
  padding: 16px;
  font-size: 16px;
}

.cart-item-photo {
  width: 90%;
  aspect-ratio: 288/192;
  margin: 0 auto;
}
.cart-item-text-box {
  width: fit-content;
  padding: 20px 0px;
  flex-direction: column;
  align-items: flex-start;
}
.cart-item-title {
  font-size: 20px;
}
.cart-item-explanation {
  margin-top: 32px;
}
.cart-item-count-contents {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 16px;
}

.cart-item-count-box {
  display: flex;
  width: fit-content;
  padding: 4px 18px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background: #FFF;
}

.cart-item-count {
  display: flex;
  gap: 20px;
  background: none;
  border: none;
}

.cart-item-count-button {
  background: none;
  border: none;
  cursor: pointer;
}

.cart-item-count-icon {
  width: auto;
}

.cart-dust-box {
  width: auto;
  margin-left: 20px;
  cursor: pointer;
}

.cart-in-box {
  text-align: right;
}

.cart-in-button {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 1px solid #000;
  height: 40px;
  padding: 0 16px;
  font-size: 12px;
  cursor: pointer;
}

.cart-item-price {
  margin-top: 12px;
  text-align: right;
  font-size: 20px;
}
.cart-item-product-id {
  display: none;
}
.cart-summary {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
}

.cart-total-count {
  display: flex;
  font-size: 32px;
  justify-content: right;
}

.cart-total-price {
  display: flex;
  font-size: 36px;
  margin: 32px 0 0 auto;
  justify-content: right;
}

.cart-after-container {
  display: flex;
  background: none;
  border: none;
  margin-right: 40px;
  justify-content: flex-end;
}

.cart-next-link-box {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 5px solid #000;
  height: fit-content;
  padding: 18px 36px;
  font-size: 36px;
  margin-top: 20px;
}

.cart-summary {
  width: 320px;
  margin: 0 40px 0 auto;
}
.cart-total-count {
  display: flex;
  font-size: 32px;
  justify-content: right;
}

.cart-total-price {
  display: flex;
  font-size: 36px;
  margin: 32px 0 0 auto;
  justify-content: right;
}
.cart-after-container {
  display: flex;
  background: none;
  border: none;
  margin-right: 40px;
  justify-content: flex-end;
}
.cart-next-link-box {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 5px solid #000;
  height: fit-content;
  padding: 18px 36px;
  font-size: 36px;
  margin-top: 20px;
}

@media screen and (max-width: 767px) {
  .cart-container {
    padding: 112px 40px;
  }

  .cart-title {
    font-size: 20px;
    padding-bottom: 16px;
  }

  .cart-item-wrapper {
    column-gap: 18px;
    row-gap: 20px;
    margin-top: 20px;
    aspect-ratio: 165/263;
  }
  .cart-item-photo {
  width: 90%;
  aspect-ratio: 154/121;
  margin: 0 auto;
}
  .cart-item-box {
    width: calc(80% / 2);
    padding: 8px;
  }

  .cart-item-title {
    font-size: 12px;
  }

  .cart-item-count-contents {
    margin-top: 8px;
    gap: 8px;
  }

  .cart-item-count-box {
    width: 119px;
    padding: 0 12px;
  }

  .cart-item-count {
    gap: 12px;
  }

  .cart-item-count-button {
    cursor: pointer;
  }

  .cart-item-count-icon {
    width: 12px;
    height: 12px;
  }

  .dust-box {
    margin-left: 12px;
  }

  .cart-in-button {
    height: fit-content;
    padding: 0 12px;
    font-size: 12px;
  }

  .cart-item-price {
    font-size: 16px;
  }

  .cart-total-count {
    font-size: 16px;
  }

  .cart-total-price {
    font-size: 18px;
  }

  .cart-after-container {
    justify-content: center;
    margin: 0 auto;
  }

  .cart-next-link-box {
    width: fit-content;
    height: fit-content;
    padding: 12px 28px;
    font-size: 18px;
    margin: 20px 0;
    justify-content: center;
  }
}
</style>
../stores/cartStore