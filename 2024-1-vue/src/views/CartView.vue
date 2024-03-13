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
              <div class="cart-item-count-box">
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
            </div>
            <!-- 各商品の値段とカウント数を掛け算した合計価格を表示 -->
            <div class="cart-item-price">{{ item.product.price*item.quantity }}円</div>
            <!-- 各商品の合計価格を表示 -->
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
import { ref, onMounted, computed } from 'vue';
import { useCartStore } from '/src/stores/cartStore';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const cartStore = useCartStore();
    const cartItems = ref([]);
    const router = useRouter();

    const fetchCartItems = () => {
      cartItems.value = cartStore.cartItems;
    };
    

    // このコンポーネントがマウントされた時にカートアイテムのリストを取得する
    onMounted(fetchCartItems);
    
    const navigateToCustomerInfo = () => {
      router.push('/customer');
    };

    const addToCart = async (productId) => {
      cartStore.addToCart(productId);
    };

    // カートの合計点数と合計価格を計算する
    const totalItemCount = computed(() => {
      return cartItems.value.reduce((total, item) => total + item.quantity, 0);
    });

    const totalCartPrice = computed(() => {
      return cartItems.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    });

    return {
      cartItems,
      addToCart,
      navigateToCustomerInfo,
      totalItemCount,
      totalCartPrice,
    };
  },
};
</script>





<style lang="scss">
main {
  background: #fff;
  color: #333;
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
  object-fit: contain;

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
  }
  .cart-item-photo {
  width: 90%;
  aspect-ratio: 154/121;
  margin: 0 auto;
}
  .cart-item-box {
    width: calc(80% / 2);
    padding: 8px;
    height: fit-content;
  }
  .cart-item-text-box{
    width: 90%;
  }
  .cart-item-title {
    font-size: 12px;
    font-size: 12px;
  }
  .cart-item-explanation{
    font-size: 8px;
    margin-top: 8px;
  }

  .cart-in-button {
    height: fit-content;
    padding: 0 12px;
    font-size: 12px;
  }

  .cart-item-price {
    font-size: 12px;
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