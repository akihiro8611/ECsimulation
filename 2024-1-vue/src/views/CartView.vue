<template>
  <main>
    <div class="cart-container">
      <h1 class="cart-title">カート一覧</h1>
      <div v-if="cartItems.length === 0">
        <p>カートにアイテムがありません。</p>
      </div>
      <div v-for="cartItem in cartItems" :key="cartItem.product_id">
      {{ cartItem.product_name }} - {{ cartItem.count }}
    </div>
      <div v-for="(item, index) in cartItems" :key="index" class="cart-item">
        <div class="cart-item-info">
          <h2 class="cart-item-title">{{ item.product_name }} - Count: {{ item.count }}</h2>
          <div class="cart-item-count-box">
            <div class="cart-item-count">
              <button class="cart-item-count-button" @click="decrementCount(index)">
                <img src="@/assets/uiw_minus-circle.png" alt="" class="item-count-icon">
              </button>
              {{ item.count }}
              <button class="cart-item-count-button" @click="incrementCount(index)">
                <img src="@/assets/uiw_plus-circle.png" alt="" class="item-count-icon">
              </button>
            </div>
            <div class="cart-dust-box" @click="resetCount(index)">
              <img src="@/assets/Vector.png" alt="" class="item-count-icon">
            </div>
          </div>
          <p class="cart-item-price">Price: {{ calculateTotalPrice(item) }}円</p>
          <p class="assigned-data">Assigned Data: {{ item.assignedData }}</p>
        </div>
      </div>
      <div class="cart-summary">
        <p class="cart-total-count">購入点数: {{ totalItemCount }}個</p>
        <p class="cart-total-price">合計価格: {{ totalCartPrice }}円</p>
      </div>
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
import { mapState } from 'vuex';

export default {
  props: {
    selectedItems: Array,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  watch: {
    selectedItems: {
      handler(newItems) {
        // カートに追加されたアイテムを更新
        this.cartItems = newItems.map(item => ({ ...item })); // コピーを作成して参照を切る
      },
      deep: true, // ネストされたプロパティも監視
    },
  },
  methods: {
    decrementCount(index) {
      if (this.cartItems[index].count > 0) {
        this.cartItems[index].count--;
      }
    },
    incrementCount(index) {
      this.cartItems[index].count++;
    },
    resetCount(index) {
      this.cartItems[index].count = 0;
    },
    calculateTotalPrice(item) {
      return item.price * item.count;
    },
    navigateToCustomerInfo() {
      this.$router.push('/customer');
    },
    async getProductDetails(productId) {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/macros/echo?user_content_key=7C1MftR6m-Kv9uoaIyk18SoYYZ2coUbOnXFTnkQ8s9rLcIQYLlikhm9NUmErReYWYgNTfGsKipjDkeHCt5LExCmLoRtslxPUm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJJ-uy9LF1llO5V8O0GJMB-fbgUSLsAjue8kBn1TtI6jGOBSuYA_2iviMEcIIRJK2z_BeVlFJ-EIVdRXs3b0Qip2WjtX8aMj9Q&lib=MN5OXOFv1NWXotatnO5YsB6CCTsAkJxEL"
        );

        const jsonData = await response.json();

        const productDetails = jsonData.find(item => item.product_id === productId);

        if (productDetails) {
          // 商品の詳細情報を指定された形式のオブジェクトに変換
          const formattedDetails = {
            product_id: productDetails.product_id,
            product_name: productDetails.product_name,
            description: productDetails.description,
            price: productDetails.price,
            image: productDetails.image,
            stock: productDetails.stock,
            category_id: productDetails.category_id,
          };

          return formattedDetails;
        } else {
          console.warn('該当する商品が見つかりません。');
          return null;
        }
      } catch (error) {
        console.error('商品の詳細情報を取得中にエラーが発生しました:', error);
        return null;
      }
    },
  },
  async mounted() {
    const cartItems = this.$store.state.cartItems;
    console.log('Cart items in CartView:', cartItems);
  },
  computed: {
    ...mapState(['cartItems']), // ストアの状態を computed プロパティにマッピング
  },
};
</script>
<style>
.cart-title {
  font-size: 40px;
  padding: 112px 40px;
}
.cart-item-container {
  display: flex;
  padding: 31px 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  align-self: stretch;
}

.cart-item-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 24px;
  row-gap: 36px;
  margin-top: 40px;

}

.cart-item-box {
  display: flex;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #D8D8D8;
  width: calc(75% / 3);
  margin-bottom: 20px;
  font-size: 16px;
}

.cart-item-photo-box {
  width: 288px;
  aspect-ratio: 288/192;
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
  width: 157px;
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

.cart-item-price {
  margin-top: 12px;
  text-align: right;
  font-size: 20px;
}

.cart-in-box {
  text-align: right;
}

.cart-in-button {
  background-color: #d9d9d9;
  border-radius: 40px;
  border: 1px solid #000;
  height: 48px;
  padding: 0 16px;
  font-size: 20px;
  cursor: pointer;
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
  .cart-item-container {
    display: flex;
    padding: 32px 0;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    align-self: stretch;
  }
  .cart-title {
  font-size: 20px;
  padding: 112px 40px;
  padding-bottom: 60px;
    }
    .cart-item-wrapper {
    column-gap: 18px;
    row-gap: 20px;
    margin-top: 20px;
    }
    .cart-item-box {
    padding: 8px;
    width: calc(80% / 2);
    margin-bottom: 20px;
    }
    .cart-item-title {
    font-size: 12px;
    }
    .cart-item-text-box {
    width: fit-content;
    }
    .cart-item-explanation {
    font-size: 8px;
    margin-top: 8px;
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
    .cart-item-product-id {
    display: none;
    }

    .cart-summary {
      margin: 0 auto;
    }
    .cart-total-count {
      display: flex;
      font-size: 16px;
      justify-content: right;
    }

    .cart-total-price {
      display: flex;
      font-size: 18px;
      margin: 16px 0 0 auto;
      justify-content: right;
    }
    .cart-after-container {
      justify-content: center;
      margin: 0 auto;
    }
    .cart-next-link-box {
      background-color: #d9d9d9;
      border-radius: 40px;
      border: 1px solid #000;
      width: fit-content;
      height: fit-content;
      padding: 12px 28px;
      font-size: 18px;
      margin: 20px 0;
      justify-content: center;
    }
  }
</style>